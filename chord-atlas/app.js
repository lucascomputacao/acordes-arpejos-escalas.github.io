// Hash routing for GitHub Pages friendly deep links.
// Examples:
//   #/arpeggios/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24&lang=en
//   #/chords/tetrade-maior-7m?root=F&minFret=5&maxFret=12&lang=pt
let routeIsApplying = false;
let routeHasInitialized = false;
const CATEGORY_TO_SLUG = { 'Acordes':'chords', 'Arpejos':'arpeggios', 'Escalas':'scales', 'Modos':'modes', 'Campos Harmônicos':'harmonic-fields' };
const SLUG_TO_CATEGORY = Object.fromEntries(Object.entries(CATEGORY_TO_SLUG).map(([k,v]) => [v,k]));
function slugify(value){
  return String(value || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/#/g,'sharp')
    .replace(/\+/g,'plus')
    .replace(/\(/g,'').replace(/\)/g,'')
    .replace(/[^a-zA-Z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'')
    .toLowerCase();
}
function structureFromSlug(category, slug){
  const keys = Object.keys(LIBRARY[category] || {});
  return keys.find(k => slugify(k) === slug) || keys[0];
}
function checkedValues(selector){
  return [...document.querySelectorAll(selector)]
    .filter(input => input.checked)
    .map(input => input.value);
}
function setCheckedValues(selector, values){
  if(!Array.isArray(values)) return;
  const wanted = new Set(values);
  document.querySelectorAll(selector).forEach(input => {
    input.checked = wanted.has(input.value);
  });
}
function splitRouteList(value){
  if(value === null) return null;
  if(value === '') return [];
  return value.split('|').map(x => x.trim()).filter(Boolean);
}
function routeState(){
  const structure = selectedStructure();
  const params = new URLSearchParams();
  params.set('root', document.getElementById('root')?.value || 'C');
  params.set('minFret', document.getElementById('minFret')?.value || '0');
  params.set('maxFret', document.getElementById('maxFret')?.value || '24');
  params.set('lang', currentLang || 'en');

  const stringGroups = checkedValues('#stringGroups input');
  const voicings = checkedValues('#voicings input');
  params.set('stringGroups', stringGroups.join('|'));
  params.set('voicings', voicings.join('|'));

  const vlRootA = document.getElementById('vlRootA')?.value;
  const vlStructA = document.getElementById('vlStructA')?.value;
  const vlRootB = document.getElementById('vlRootB')?.value;
  const vlStructB = document.getElementById('vlStructB')?.value;
  if(vlRootA) params.set('vlRootA', vlRootA);
  if(vlStructA) params.set('vlStructA', vlStructA);
  if(vlRootB) params.set('vlRootB', vlRootB);
  if(vlStructB) params.set('vlStructB', vlStructB);

  return `#/${CATEGORY_TO_SLUG[currentCategory] || slugify(currentCategory)}/${slugify(structure)}?${params.toString()}`;
}
function writeRoute(){
  if(routeIsApplying || !routeHasInitialized) return;
  const next = routeState();
  if(location.hash !== next) history.replaceState(null, '', next);
}
function readRoute(){
  const raw = (location.hash || '').replace(/^#\/?/, '');
  if(!raw) return null;
  const [pathPart, queryPart=''] = raw.split('?');
  const [catSlug, structSlug] = pathPart.split('/').filter(Boolean);
  const category = SLUG_TO_CATEGORY[catSlug] || currentCategory || 'Acordes';
  const structure = structSlug ? structureFromSlug(category, structSlug) : Object.keys(LIBRARY[category] || {})[0];
  const params = new URLSearchParams(queryPart);
  return {
    category,
    structure,
    root: params.get('root') || 'C',
    minFret: params.get('minFret') || '0',
    maxFret: params.get('maxFret') || '24',
    lang: params.get('lang') || 'en',
    stringGroups: splitRouteList(params.get('stringGroups')),
    voicings: splitRouteList(params.get('voicings')),
    vlRootA: params.get('vlRootA'),
    vlStructA: params.get('vlStructA'),
    vlRootB: params.get('vlRootB'),
    vlStructB: params.get('vlStructB')
  };
}
function applyRouteFromHash(){
  const route = readRoute();
  if(!route) return false;
  routeIsApplying = true;
  currentCategory = route.category;
  currentLang = route.lang === 'pt' ? 'pt' : 'en';
  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = tr(el.dataset.i18n));
  document.getElementById('lang-pt').classList.toggle('active', currentLang === 'pt');
  document.getElementById('lang-en').classList.toggle('active', currentLang === 'en');
  populateTabs();
  populateStructures();
  if(route.structure && LIBRARY[currentCategory] && LIBRARY[currentCategory][route.structure]) document.getElementById('structure').value = route.structure;
  if(route.root && NOTES.includes(route.root)) document.getElementById('root').value = route.root;
  document.getElementById('minFret').value = route.minFret;
  document.getElementById('maxFret').value = route.maxFret;
  populateStringGroups();
  if(route.stringGroups !== null) setCheckedValues('#stringGroups input', route.stringGroups);
  populateVoicings();
  if(route.voicings !== null) setCheckedValues('#voicings input', route.voicings);
  renderScaleSuggestions();
  renderTensions();
  renderCompatibleChords();
  populateVoiceLeadingControls();
  if(route.vlRootA && NOTES.includes(route.vlRootA)) document.getElementById('vlRootA').value = route.vlRootA;
  if(route.vlRootB && NOTES.includes(route.vlRootB)) document.getElementById('vlRootB').value = route.vlRootB;
  if(route.vlStructA && LIBRARY['Acordes'][route.vlStructA]) document.getElementById('vlStructA').value = route.vlStructA;
  if(route.vlStructB && LIBRARY['Acordes'][route.vlStructB]) document.getElementById('vlStructB').value = route.vlStructB;
  render();
  renderVoiceLeading();
  routeIsApplying = false;
  return true;
}


function initMobileDrawer(){
  const openBtn=document.getElementById('mobileMenuButton');
  const closeBtn=document.getElementById('mobileCloseButton');
  const overlay=document.getElementById('sidebarOverlay');
  const sidebar=document.getElementById('sidebar');
  if(!openBtn||!closeBtn||!overlay||!sidebar) return;
  const setOpen=(open)=>{
    document.body.classList.toggle('sidebar-open',open);
    openBtn.setAttribute('aria-expanded',String(open));
    overlay.setAttribute('aria-hidden',String(!open));
  };
  openBtn.addEventListener('click',()=>setOpen(true));
  closeBtn.addEventListener('click',()=>setOpen(false));
  overlay.addEventListener('click',()=>setOpen(false));
  document.addEventListener('keydown',(event)=>{if(event.key==='Escape')setOpen(false);});
  sidebar.addEventListener('click',(event)=>{
    const target=event.target;
    if(window.matchMedia('(max-width: 980px)').matches && target && target.matches('button:not(#mobileCloseButton), select')){
      // Keep drawer open for controls; close only when users trigger render/export/navigation is not required.
    }
  });
}

function tensionKey(){let name=suggestionKey(); return name;}
function renderTensions(){const box=document.getElementById('availableTensions'); if(!box)return; const data=(currentCategory==='Acordes'||currentCategory==='Arpejos')?TENSION_DATA[tensionKey()]:null; if(!data){box.innerHTML=`<div class="status">${tr('noTensions')}</div>`;return} const block=(title,arr)=>arr&&arr.length?`<div class="tension-title">${title}</div><div class="tension-grid">${arr.map(x=>`<span class="tension-chip">${x}</span>`).join('')}</div>`:''; box.innerHTML=block(tr('stableTensions'),data.stable)+block(tr('contextTensions'),data.context)+block(tr('avoidTensions'),data.avoid)+`<div class="tension-note">${currentLang==='pt'?data.pt:data.en}</div>`;}

function suggestionKey(){let name=selectedStructure(); if(name.startsWith('Arpejo ')){name=name.replace('Arpejo tríade maior','Tríade maior').replace('Arpejo tríade menor','Tríade menor').replace('Arpejo tétrade maior 7M','Tétrade maior 7M').replace('Arpejo tétrade menor 7','Tétrade menor 7').replace('Arpejo dominante 7','Tétrade dominante 7').replace('Arpejo meio-diminuto','Tétrade meio-diminuta m7(b5)').replace('Arpejo diminuto','Tétrade diminuta dim7')} return name;}
function renderScaleSuggestions(){const box=document.getElementById('scaleSuggestions'); if(!box)return; const arr=(currentCategory==='Acordes'||currentCategory==='Arpejos')?(SCALE_SUGGESTIONS[suggestionKey()]||[]):[]; if(!arr.length){box.innerHTML=`<div class="status">${tr('noScaleSuggestions')}</div>`;return} box.innerHTML=arr.map((s,i)=>`<button class="suggestion" type="button" data-idx="${i}"><strong>${dn(s.name)} <span class="pill">${dn(s.cat)}</span></strong><span>${currentLang==='pt'?s.whyPt:s.whyEn}</span></button>`).join(''); box.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>applyScaleSuggestion(arr[i]));}
function applyScaleSuggestion(sug){currentCategory=sug.cat; populateTabs(); populateStructures(); document.getElementById('structure').value=sug.name; populateStringGroups(); populateVoicings(); renderScaleSuggestions(); renderTensions(); renderCompatibleChords(); autoRender();}

function renderCompatibleChords(){const box=document.getElementById('compatibleChords'); if(!box)return; const arr=(currentCategory==='Escalas'||currentCategory==='Modos')?(COMPATIBLE_CHORDS[selectedStructure()]||[]):[]; if(!arr.length){box.innerHTML=`<div class="status">${tr('noCompatibleChords')}</div>`;return} box.innerHTML=`<div class="compat-title">${tr('worksOver')}</div><div class="compat-list">`+arr.map((c,i)=>`<button class="compat-item" type="button" data-idx="${i}"><strong>${dn(c.name)}</strong><span>${currentLang==='pt'?c.whyPt:c.whyEn}</span></button>`).join('')+`</div>`; box.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>applyCompatibleChord(arr[i]));}
function applyCompatibleChord(chord){currentCategory='Acordes'; populateTabs(); populateStructures(); document.getElementById('structure').value=chord.name; populateStringGroups(); populateVoicings(); renderScaleSuggestions(); renderTensions(); renderCompatibleChords(); autoRender();}

function selectedStructure(){return document.getElementById('structure').value} function formula(){return LIBRARY[currentCategory][selectedStructure()]}
function currentStringGroups(size){return [...document.querySelectorAll('#stringGroups input:checked')].map(x=>x.value.split('-').map(Number)).filter(g=>g.length===size)}
function populateTabs(){document.getElementById('tabs').innerHTML=Object.keys(LIBRARY).map(c=>`<button class="tab ${c===currentCategory?'active':''}" data-cat="${c}">${dn(c)}</button>`).join('');document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{currentCategory=b.dataset.cat;populateStructures();populateStringGroups();populateVoicings();populateTabs();renderScaleSuggestions();renderTensions();renderCompatibleChords();autoRender()})}
function populateStructures(){const s=document.getElementById('structure');const previous=s.value;const keys=Object.keys(LIBRARY[currentCategory]);s.innerHTML=keys.map(k=>`<option value="${k}">${dn(k)}</option>`).join('');if(keys.includes(previous))s.value=previous;renderScaleSuggestions();renderTensions();renderCompatibleChords()}
function populateStringGroups(){const f=formula();const size=(currentCategory==='Escalas'||currentCategory==='Modos'||currentCategory==='Arpejos'||currentCategory==='Campos Harmônicos')?6:Math.min(4,Math.max(3,f.length)); const sets=stringSetsForSize(size);document.getElementById('stringGroups').innerHTML=sets.map(g=>`<label><input type="checkbox" value="${g.join('-')}" checked> ${g.join('-')}</label>`).join('');document.querySelectorAll('#stringGroups input').forEach(x=>x.onchange=autoRender)}
function populateVoicings(){let groups;if(currentCategory==='Campos Harmônicos'){groups=[{name:'pattern',items:[tr('fieldMap')]}];}else if(currentCategory==='Arpejos'&&hasBookArpeggioPattern(selectedStructure())){groups=[{name:'bookPatterns',items:BOOK_ARPEGGIO_PATTERNS[selectedStructure()].map(p=>p.name)}];}else{groups=getVoicingGroups(formula());}document.getElementById('voicings').innerHTML=groups.map(g=>`<div class="group-title">${tr(g.name)}</div><div class="checkgrid">${g.items.map(v=>`<label><input type="checkbox" value="${v}" checked> ${v}</label>`).join('')}</div>`).join('');document.querySelectorAll('#voicings input').forEach(x=>x.onchange=autoRender)}
function toggleAll(sel,val){document.querySelectorAll(sel).forEach(x=>x.checked=val);autoRender()} function setRegion(a,b){document.getElementById('minFret').value=a;document.getElementById('maxFret').value=b;autoRender()} function autoRender(){writeRoute();clearTimeout(renderTimer);renderTimer=setTimeout(render,80)}
function populateVoiceLeadingControls(){
  ['vlRootA','vlRootB'].forEach((id,i)=>{const el=document.getElementById(id); if(!el)return; const old=el.value; el.innerHTML=NOTES.map(n=>`<option>${n}</option>`).join(''); el.value=old|| (i===0?'C':'F');});
  ['vlStructA','vlStructB'].forEach((id,i)=>{const el=document.getElementById(id); if(!el)return; const old=el.value; const keys=Object.keys(LIBRARY['Acordes']); el.innerHTML=keys.map(k=>`<option value="${k}">${dn(k)}</option>`).join(''); el.value= old && keys.includes(old) ? old : (i===0?'Tétrade maior 7M':'Tétrade menor 7');});
}
function generateAllChordVoicings(root,structure){
  const f=LIBRARY['Acordes'][structure];
  const minF=Math.max(0,parseInt(document.getElementById('minFret').value||0));
  const maxF=Math.min(24,Math.max(minF+1,parseInt(document.getElementById('maxFret').value||24)));
  let voices=[]; getVoicingGroups(f).forEach(g=>voices=voices.concat(g.items)); voices=uniq(voices);
  let items=[];
  voices.forEach(v=>{ items=items.concat(generateVoicing(root,f,v,minF,maxF).map(x=>({...x,root,structure,voice:v}))); });
  return items.slice(0,80);
}
function pairScore(a,b){
  const sa=a.positions.map(p=>p.string).join('-'), sb=b.positions.map(p=>p.string).join('-');
  const len=Math.min(a.positions.length,b.positions.length);
  let score= sa===sb ? 0 : 12;
  for(let i=0;i<len;i++) score+=Math.abs(a.positions[i].fret-b.positions[i].fret)+Math.abs(a.positions[i].string-b.positions[i].string)*0.5;
  score+=Math.abs(a.baseFret-b.baseFret)*0.5;
  return Math.round(score*10)/10;
}
function renderVoiceLeading(){
  const out=document.getElementById('voiceLeadingOutput'); if(!out)return;
  const ra=document.getElementById('vlRootA').value, rb=document.getElementById('vlRootB').value, sa=document.getElementById('vlStructA').value, sb=document.getElementById('vlStructB').value;
  const A=generateAllChordVoicings(ra,sa), B=generateAllChordVoicings(rb,sb);
  const pairs=[];
  A.forEach(a=>B.forEach(b=>{ if(a.positions.length===b.positions.length) pairs.push({a,b,score:pairScore(a,b)}); }));
  pairs.sort((x,y)=>x.score-y.score||x.a.baseFret-y.a.baseFret||x.b.baseFret-y.b.baseFret);
  const top=pairs.slice(0,8);
  if(!top.length){out.innerHTML=`<section class="section"><h2>${tr('voiceLeading')}</h2><div class="empty">${tr('noVoiceLeading')}</div></section>`;return}
  const sec=document.createElement('section'); sec.className='section'; sec.innerHTML=`<h2>${tr('closestMoves')}: ${ra} ${dn(sa)} → ${rb} ${dn(sb)}</h2>`;
  const grid=document.createElement('div'); grid.className='vl-grid';
  top.forEach(p=>{const el=document.createElement('div'); el.className='vl-pair'; el.innerHTML=`<div class="vl-pair-head">${p.a.voice} → ${p.b.voice}</div><div class="vl-diagrams"><div class="card"><div class="title">${ra}</div><div class="meta">${dn(sa)} · ${tr('fret')} ${p.a.baseFret}</div>${svgDiagram(p.a,false)}</div><div class="card"><div class="title">${rb}</div><div class="meta">${dn(sb)} · ${tr('fret')} ${p.b.baseFret}</div>${svgDiagram(p.b,false)}</div></div><div class="vl-score">${tr('movement')}: ${p.score}</div>`; grid.appendChild(el);});
  sec.appendChild(grid); out.innerHTML=''; out.appendChild(sec);
}

function applyLang(){document.documentElement.lang=currentLang==='pt'?'pt-BR':'en';document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=tr(el.dataset.i18n));document.getElementById('lang-pt').classList.toggle('active',currentLang==='pt');document.getElementById('lang-en').classList.toggle('active',currentLang==='en');populateTabs();populateStructures();populateVoicings();renderScaleSuggestions();renderTensions();renderCompatibleChords();populateVoiceLeadingControls();render();renderVoiceLeading();writeRoute()}
function init(){currentLang='en';initMobileDrawer();document.getElementById('root').innerHTML=NOTES.map(n=>`<option>${n}</option>`).join('');populateTabs();populateStructures();populateStringGroups();populateVoicings();populateVoiceLeadingControls();renderScaleSuggestions();renderTensions();renderCompatibleChords();['root','structure','minFret','maxFret'].forEach(id=>{document.getElementById(id).addEventListener('change',()=>{if(id==='structure'){populateStringGroups();populateVoicings();renderScaleSuggestions();renderTensions();renderCompatibleChords()}autoRender()});document.getElementById(id).addEventListener('input',()=>{autoRender();renderVoiceLeading()})});['vlRootA','vlRootB','vlStructA','vlStructB'].forEach(id=>document.getElementById(id).addEventListener('change',()=>{writeRoute();renderVoiceLeading()}));document.getElementById('lang-pt').onclick=()=>{currentLang='pt';applyLang()};document.getElementById('lang-en').onclick=()=>{currentLang='en';applyLang()};if(!applyRouteFromHash()) applyLang();routeHasInitialized=true;writeRoute();window.addEventListener('hashchange',applyRouteFromHash)} init();
