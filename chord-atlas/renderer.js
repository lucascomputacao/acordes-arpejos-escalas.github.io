
const INTERVAL_COLORS={
  'T':'#2563eb','8':'#2563eb',
  'b2':'#ef4444','2':'#f97316',
  'b3':'#8b5cf6','3':'#16a34a',
  '4':'#0ea5a4','#4':'#eab308','b5':'#eab308',
  '5':'#06b6d4','#5':'#ec4899','b6':'#ec4899',
  '6':'#14b8a6','bb7':'#64748b','b7':'#7c3aed','7':'#f59e0b','7M':'#f59e0b'
};
function intervalColor(iv){return INTERVAL_COLORS[iv]||'#0f172a'}
function intervalTextColor(iv){return iv==='T'||iv==='8'?'#ffffff':'#ffffff'}
function isAllIntervalsFormula(formulaIntervals){return Array.isArray(formulaIntervals) && formulaIntervals.length>3;}
function generateVoicing(root,f,voice,minF,maxF){
  const ints=voice.split('-');
  const targets=intervalMap(root,f);
  const sets=currentStringGroups(ints.length);
  let results=[];
  for(const set of sets){
    const choices=set.map((str,i)=>{
      let arr=[],target=targets[ints[i]];
      for(let fret=minF;fret<=maxF;fret++) if(noteAt(str,fret)===target) arr.push({string:str,fret,label:ints[i]});
      return arr;
    });
    function rec(i,acc){
      if(i===choices.length){
        let frets=acc.map(x=>x.fret).filter(x=>x>0);
        let span=frets.length?Math.max(...frets)-Math.min(...frets):0;
        let base=frets.length?Math.min(...frets):1;
        if(span<=5) results.push({positions:acc,baseFret:base,span,voicing:voice,strings:set});
        return;
      }
      choices[i].forEach(c=>rec(i+1,acc.concat(c)));
    }
    rec(0,[]);
  }
  let seen=new Set();
  return results.sort((a,b)=>a.baseFret-b.baseFret||a.span-b.span).filter(r=>{
    let k=r.positions.map(p=>p.string+':'+p.fret+':'+p.label).join('|');
    if(seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0,16);
}

function generateScale(root,f,minF,maxF){
  const noteSet=new Set(f.map(iv=>noteFor(root,iv)));
  let byNote={}; f.forEach(iv=>byNote[noteFor(root,iv)]=iv);
  let groups=[];
  const checked=[...document.querySelectorAll('#stringGroups input:checked')].map(x=>x.value.split('-').map(Number));
  const strings=checked[0]||STRINGS;
  for(let start=minF;start<=Math.max(minF,maxF-3);start+=4){
    let end=Math.min(start+4,maxF),positions=[];
    strings.forEach(str=>{
      for(let fret=start;fret<=end;fret++){
        let n=noteAt(str,fret);
        if(noteSet.has(n)) positions.push({string:str,fret,label:byNote[n]});
      }
    });
    groups.push({positions,baseFret:Math.max(1,start),voicing:`${tr('pattern')} ${start}-${end}`});
  }
  return groups.slice(0,8);
}

function svgDiagram(item,scale=false){
  const base=item.baseFret||1,start=base<=1?0:base,fretCount=scale?5:4,w=142,h=150,x0=24,y0=24,sw=18,fh=22;
  const active=new Map(item.positions.map(p=>[p.string+':'+p.fret,p]));
  let s=`<svg class="diagram" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s+=`<rect width="${w}" height="${h}" fill="white"/>`;
  for(let i=0;i<6;i++){
    let str=STRINGS[i],x=x0+i*sw,mark='x';
    if(active.has(str+':0')) mark='o';
    else if(item.positions.some(p=>p.string===str)) mark='';
    if(mark) s+=`<text x="${x}" y="16" text-anchor="middle" font-size="15" font-weight="bold">${mark}</text>`;
  }
  for(let i=0;i<6;i++){let x=x0+i*sw;s+=`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+fretCount*fh}" stroke="#111" stroke-width="1.5"/>`;}
  for(let f=0;f<=fretCount;f++){let y=y0+f*fh;s+=`<line x1="${x0}" y1="${y}" x2="${x0+5*sw}" y2="${y}" stroke="#111" stroke-width="${f===0&&start===0?4:1.5}"/>`;}
  if(start>1) s+=`<text x="8" y="${y0+fh*.75}" font-size="12" font-weight="bold">${start}</text>`;
  for(const p of item.positions){
    if(p.fret===0) continue;
    let idx=STRINGS.indexOf(p.string),off=p.fret-start;
    if(off<0||off>=fretCount) continue;
    let x=x0+idx*sw,y=y0+off*fh+fh/2,fill=p.label==='T'?'white':'#111',tf=p.label==='T'?'#111':'white';
    s+=`<circle cx="${x}" cy="${y}" r="8.5" fill="${fill}" stroke="#111" stroke-width="2"/>`;
    s+=`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="10" font-weight="bold" fill="${tf}">${p.label}</text>`;
  }
  return s+'</svg>';
}

function svgHorizontalArpeggio(item){
  const positions=(item.positions||[]).slice().sort((a,b)=>b.string-a.string||a.fret-b.fret);
  const minPos=Math.min(...positions.map(p=>p.fret));
  const maxPos=Math.max(...positions.map(p=>p.fret));
  const start=Math.max(0, minPos===0 ? 0 : minPos-1);
  const end=Math.min(24, Math.max(maxPos, start+4));
  const frets=end-start;
  const cell=28, x0=48, y0=26, rowGap=20, h=148, w=x0+(frets*cell)+30;
  const strings=[1,2,3,4,5,6];
  const byPos=new Map(positions.map(p=>[`${p.string}:${p.fret}`,p]));
  let s=`<svg class="horizontal-arpeggio" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s+=`<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="#ffffff"/>`;
  s+=`<rect x="${x0}" y="${y0}" width="${frets*cell}" height="${rowGap*5}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>`;

  for(let f=start; f<=end; f++){
    const x=x0+(f-start)*cell;
    const isNut=f===0;
    s+=`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+rowGap*5}" stroke="${isNut?'#0f172a':'#94a3b8'}" stroke-width="${isNut?5:2}"/>`;
    if(f<end){
      const label=f+1;
      s+=`<text x="${x+cell/2}" y="${y0+rowGap*5+24}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#64748b">${label}</text>`;
    }
  }

  strings.forEach((str,row)=>{
    const y=y0+row*rowGap;
    s+=`<line x1="${x0}" y1="${y}" x2="${x0+frets*cell}" y2="${y}" stroke="#334155" stroke-width="${str===1||str===6?2.4:1.8}"/>`;
    s+=`<text x="${x0-28}" y="${y+5}" text-anchor="middle" font-size="9.5" font-weight="800" fill="#334155">${STRING_TUNING[str]}</text>`;
  });

  for(const p of positions){
    const row=strings.indexOf(p.string);
    if(row<0) continue;
    let x;
    if(p.fret===0){
      if(start!==0) continue;
      x=x0-18;
    }else{
      if(p.fret<=start || p.fret>end) continue;
      x=x0+(p.fret-start-0.5)*cell;
    }
    const y=y0+row*rowGap;
    const root=p.label==='T';
    const fill=root?'#ffffff':'#0f172a';
    const stroke=root?'#0f172a':'#0f172a';
    const text=root?'#0f172a':'#ffffff';
    s+=`<circle cx="${x}" cy="${y}" r="8.2" fill="${fill}" stroke="${stroke}" stroke-width="1.9"/>`;
    s+=`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="7.5" font-weight="900" fill="${text}">${p.label}</text>`;
  }
  return s+'</svg>';
}


function svgIntervalMap(root,name,formulaIntervals,minF,maxF){
  const selectedStrings=[...document.querySelectorAll('#stringGroups input:checked')]
    .flatMap(x=>x.value.split('-').map(Number));
  const strings=uniq(selectedStrings.length?selectedStrings:STRINGS).sort((a,b)=>a-b);
  const start=Math.max(0,minF), end=Math.min(24,maxF);
  const fretCount=Math.max(1,end-start);
  const cell=Math.max(18, Math.min(30, 720 / Math.max(1,fretCount)));
  const x0=54, y0=30, rowGap=22, h=y0+(rowGap*(strings.length-1))+54, w=x0+fretCount*cell+42;
  const isAll=isAllIntervalsFormula(formulaIntervals);
  const intervalsToShow=isAll?formulaIntervals.filter(iv=>iv!=='8'):['T', (formulaIntervals[1] || 'T')];
  const rootNote=noteFor(root,'T');
  const targetNote=noteFor(root,formulaIntervals[1] || 'T');
  const noteToInterval={};
  intervalsToShow.forEach(iv=>{ noteToInterval[noteFor(root,iv)] = iv; });
  let s=`<svg class="interval-map-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s+=`<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#fff"/>`;
  s+=`<rect x="${x0}" y="${y0}" width="${fretCount*cell}" height="${rowGap*(strings.length-1)}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>`;
  for(let f=start; f<=end; f++){
    const x=x0+(f-start)*cell;
    const isNut=f===0;
    s+=`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+rowGap*(strings.length-1)}" stroke="${isNut?'#0f172a':'#94a3b8'}" stroke-width="${isNut?4:1.5}"/>`;
    if(f<end){const label=f+1;s+=`<text x="${x+cell/2}" y="${y0+rowGap*(strings.length-1)+24}" text-anchor="middle" font-size="9" font-weight="800" fill="#64748b">${label}</text>`;}
  }
  strings.forEach((str,row)=>{
    const y=y0+row*rowGap;
    s+=`<line x1="${x0}" y1="${y}" x2="${x0+fretCount*cell}" y2="${y}" stroke="#334155" stroke-width="${str===1||str===6?2.2:1.5}"/>`;
    s+=`<text x="${x0-30}" y="${y+4}" text-anchor="middle" font-size="9" font-weight="900" fill="#334155">${STRING_TUNING[str]}</text>`;
  });
  strings.forEach((str,row)=>{
    const y=y0+row*rowGap;
    for(let fret=start; fret<=end; fret++){
      const n=noteAt(str,fret);
      let label=null, rootDot=false;
      if(n===rootNote){label='T'; rootDot=true;}
      else if(isAll){label=noteToInterval[n] || null;}
      else if(n===targetNote && (formulaIntervals[1] || 'T')!=='T' && (formulaIntervals[1] || 'T')!=='8'){label=(formulaIntervals[1] || 'T');}
      if(!label) continue;
      let x;
      if(fret===0){if(start!==0) continue; x=x0-16;}
      else {if(fret<=start) continue; x=x0+(fret-start-0.5)*cell;}
      const fill=intervalColor(label);
      const text=intervalTextColor(label);
      const stroke=label==='T'?'#1e3a8a':'rgba(15,23,42,.34)';
      s+=`<circle cx="${x}" cy="${y}" r="7.8" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>`;
      s+=`<text x="${x}" y="${y+3}" text-anchor="middle" font-size="6.8" font-weight="900" fill="${text}">${label}</text>`;
    }
  });
  return s+'</svg>';
}

function renderIntervals(root,name,f,minF,maxF,out){
  const isAll=isAllIntervalsFormula(f);
  const interval=f[1] || 'T';
  const rootNote=noteFor(root,'T');
  const targetNote=noteFor(root,interval);
  const section=document.createElement('section');
  section.className='section interval-section';
  section.innerHTML=`<h2>${root} — ${dn(name)}</h2><div class="field-info">${tr('intervalInfo')}</div>`;
  const summary=document.createElement('div');
  summary.className='interval-summary';
  summary.innerHTML=isAll
    ? `<div><strong>${tr('rootNote')}</strong><span class="interval-chip" style="--interval-color:${intervalColor('T')}">${rootNote} · T</span></div><div><strong>${tr('targetInterval')}</strong><span class="interval-chip" style="--interval-color:${intervalColor('T')}">${dn('Todos os intervalos')}</span></div><div><strong>${tr('intervalNotes')}</strong>${f.filter(iv=>iv!=='8').map(iv=>`<span class="interval-chip" style="--interval-color:${intervalColor(iv)}">${iv}</span>`).join('')}</div>`
    : `<div><strong>${tr('rootNote')}</strong><span class="interval-chip" style="--interval-color:${intervalColor('T')}">${rootNote} · T</span></div><div><strong>${tr('targetInterval')}</strong><span class="interval-chip" style="--interval-color:${intervalColor(interval)}">${interval}</span></div><div><strong>${tr('targetNote')}</strong><span class="interval-chip" style="--interval-color:${intervalColor(interval)}">${targetNote}</span></div>`;
  section.appendChild(summary);
  const map=document.createElement('div');
  map.className='field-map-card interval-map-card';
  map.innerHTML=`<h3>${tr('intervalMap')} (${minF}-${maxF})</h3>${svgIntervalMap(root,name,f,minF,maxF)}`;
  section.appendChild(map);
  out.appendChild(section);
  document.getElementById('status').textContent=`1 ${tr('diagrams')}`;
}

function functionName(code){
  if(code==='T') return currentLang==='pt' ? 'Tônica' : 'Tonic';
  if(code==='S') return currentLang==='pt' ? 'Subdominante' : 'Subdominant';
  if(code==='D') return currentLang==='pt' ? 'Dominante' : 'Dominant';
  return code;
}

function svgHarmonicField(root,fieldName,minF,maxF){
  const data=fieldData(root,fieldName);
  const start=Math.max(0,minF), end=Math.min(24,maxF);
  const fretCount=Math.max(1,end-start);
  const cell=Math.max(18, Math.min(30, 650 / Math.max(1,fretCount)));
  const x0=52, y0=28, rowGap=20, h=158, w=x0+fretCount*cell+38;
  const strings=[1,2,3,4,5,6];
  let s=`<svg class="field-map-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s+=`<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#fff"/>`;
  s+=`<rect x="${x0}" y="${y0}" width="${fretCount*cell}" height="${rowGap*5}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>`;
  for(let f=start; f<=end; f++){
    const x=x0+(f-start)*cell;
    const isNut=f===0;
    s+=`<line x1="${x}" y1="${y0}" x2="${x}" y2="${y0+rowGap*5}" stroke="${isNut?'#0f172a':'#94a3b8'}" stroke-width="${isNut?4:1.5}"/>`;
    if(f<end){ const lab=f+1; s+=`<text x="${x+cell/2}" y="${y0+rowGap*5+23}" text-anchor="middle" font-size="9" font-weight="800" fill="#64748b">${lab}</text>`; }
  }
  strings.forEach((str,row)=>{
    const y=y0+row*rowGap;
    s+=`<line x1="${x0}" y1="${y}" x2="${x0+fretCount*cell}" y2="${y}" stroke="#334155" stroke-width="${str===1||str===6?2.1:1.5}"/>`;
    s+=`<text x="${x0-28}" y="${y+4}" text-anchor="middle" font-size="9" font-weight="900" fill="#334155">${STRING_TUNING[str]}</text>`;
  });
  for(let str of strings){
    const row=strings.indexOf(str), y=y0+row*rowGap;
    for(let fret=start; fret<=end; fret++){
      const note=noteAt(str,fret), deg=fieldDegreeForNote(root,fieldName,note);
      if(!deg) continue;
      let x;
      if(fret===0){ if(start!==0) continue; x=x0-16; }
      else { if(fret<=start) continue; x=x0+(fret-start-0.5)*cell; }
      const label=deg.degree.replace('°','º');
      const isRoot=deg.index===0;
      s+=`<circle cx="${x}" cy="${y}" r="7.2" fill="${isRoot?'#fff':deg.color}" stroke="${deg.color}" stroke-width="1.8"/>`;
      s+=`<text x="${x}" y="${y+3}" text-anchor="middle" font-size="6.5" font-weight="900" fill="${isRoot?deg.color:'#fff'}">${label}</text>`;
    }
  }
  return s+'</svg>';
}

function renderHarmonicField(root,name,minF,maxF,out){
  const data=fieldData(root,name);
  const section=document.createElement('section');
  section.className='section harmonic-field-section';
  section.innerHTML=`<h2>${root} — ${dn(name)}</h2><div class="field-info">${tr('fieldInfo')}</div>`;
  const cards=document.createElement('div');
  cards.className='field-degree-cards';
  data.chords.forEach((c)=>{
    const el=document.createElement('div');
    el.className='field-degree-card';
    el.style.setProperty('--degree-color',c.color);
    el.innerHTML=`<div class="field-degree">${c.degree}</div><div class="field-chord">${c.root}${c.quality}</div><div class="field-function">${functionName(c.function)} (${c.function})</div><div class="field-notes">${c.notes.join(' - ')}</div>`;
    cards.appendChild(el);
  });
  section.appendChild(cards);
  const map=document.createElement('div');
  map.className='field-map-card';
  map.innerHTML=`<h3>${tr('fieldMap')} (${minF}-${maxF})</h3>${svgHarmonicField(root,name,minF,maxF)}`;
  section.appendChild(map);
  const table=document.createElement('div');
  table.className='field-table-wrap';
  table.innerHTML=`<h3>${tr('diatonicChords')}</h3><table class="field-table"><thead><tr><th>${tr('degree')}</th><th>${tr('chord')}</th><th>${tr('functionLabel')}</th><th>${tr('chordNotes')}</th><th>${tr('intervalFormula')}</th></tr></thead><tbody>${data.chords.map(c=>`<tr><td><span class="degree-pill" style="--degree-color:${c.color}">${c.degree}</span></td><td><strong>${c.root}${c.quality}</strong></td><td>${functionName(c.function)} (${c.function})</td><td>${c.notes.join(' - ')}</td><td>${c.formula.join(' - ')}</td></tr>`).join('')}</tbody></table>`;
  section.appendChild(table);
  out.appendChild(section);
  document.getElementById('status').textContent=`${data.chords.length} ${tr('diagrams')}`;
}

function makeSectionCloseable(section){
  if(!section || section.querySelector('.section-close')) return section;
  section.classList.add('closeable-section');
  const btn=document.createElement('button');
  btn.type='button';
  btn.className='section-close';
  btn.setAttribute('aria-label', currentLang === 'pt' ? 'Fechar visualização' : 'Close view');
  btn.innerHTML='&times;';
  btn.addEventListener('click',()=>{
    section.remove();
    const remaining=document.querySelectorAll('#output .section, #voiceLeadingOutput .section').length;
    if(!remaining){
      const status=document.getElementById('status');
      if(status) status.textContent='0 '+tr('diagrams');
    }
  });
  section.appendChild(btn);
  return section;
}



function noteNameToPc(name){
  const base={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  if(!name) return 0;
  const letter=name[0].toUpperCase();
  let pc=base[letter] ?? 0;
  const acc=name.slice(1);
  for(const ch of acc){
    if(ch==='#' || ch==='♯') pc+=1;
    if(ch==='b' || ch==='♭') pc-=1;
  }
  return (pc%12+12)%12;
}
function parseChordSymbol(symbol){
  const match=String(symbol||'').match(/^([A-Ga-g])([#♯b♭]?)(.*)$/);
  if(!match) return null;
  return {root:(match[1].toUpperCase()+match[2].replace('♯','#').replace('♭','b')), suffix:match[3]||''};
}
function transposeRootName(rootName, semitones){
  const pc=(noteNameToPc(rootName)+semitones+1200)%12;
  return NOTES[pc];
}
function transposeChordSymbol(symbol, semitones){
  const parsed=parseChordSymbol(symbol);
  if(!parsed) return symbol;
  return transposeRootName(parsed.root,semitones)+parsed.suffix;
}
function transposeLeadingChordText(text, semitones){
  return String(text||'').replace(/^([A-Ga-g])([#♯b♭]?)(.*)$/,(m,l,acc,rest)=>transposeRootName(l.toUpperCase()+acc.replace('♯','#').replace('♭','b'),semitones)+rest);
}
function transposeSuperimpositionRow(row, root){
  const shift=(pc(root)-pc('C')+12)%12;
  return [
    transposeChordSymbol(row[0],shift),
    transposeLeadingChordText(row[1],shift),
    row[2]||''
  ];
}

function renderArpeggioSuperimpositionBlock(root,name,out){
  const data=SUPERIMPOSITION_DATA[name];
  if(!data) return 0;
  const rows=(data.rows||[]).map(row=>transposeSuperimpositionRow(row,root));
  const baseExample=transposeLeadingChordText(data.baseExample||'',(pc(root)-pc('C')+12)%12);
  const sec=document.createElement('section');
  sec.className='section superimposition-section superimposition-accordion-section';

  const tableRows=rows.map((r,idx)=>`<tr class="${idx===0?'selected-row':''}"><td class="super-arp"><strong>${r[0]}</strong></td><td><strong>${r[1]}</strong></td><td>${(r[2]||'—').split(',').map(x=>x.trim()).filter(Boolean).map(x=>`<span class="tension-chip super-chip">${x}</span>`).join('')||'<span class="muted">—</span>'}</td></tr>`).join('');

  const mobileCards=rows.map((r,idx)=>{
    const tensions=(r[2]||'—').split(',').map(x=>x.trim()).filter(Boolean).map(x=>`<span class="tension-chip super-chip">${x}</span>`).join('')||'<span class="muted">—</span>';
    return `<article class="super-mobile-card ${idx===0?'selected-row':''}">
      <div class="super-mobile-card-head">
        <strong>${r[0]}</strong>
      </div>
      <div class="super-mobile-card-row"><span>${tr('result')}</span><strong>${r[1]}</strong></div>
      <div class="super-mobile-card-row"><span>${tr('addedTensions')}</span><div>${tensions}</div></div>
    </article>`;
  }).join('');

  sec.innerHTML=`
    <details class="super-accordion">
      <summary class="super-accordion-summary">
        <span class="super-accordion-title">${dn('Superposição de Arpejos')} — ${dn(name)}</span>
        <span class="super-accordion-meta">${rows.length} ${tr('superimpositions')}</span>
      </summary>
      <div class="superimposition-layout">
        <div class="super-summary">
          <div class="super-base-box">${baseExample}</div>
          <div>
            <div class="compat-title">${tr('baseChord')}</div>
            <div class="super-base-name">${baseExample}</div>
            <div class="tension-note">${tr('superimpositionInfo')}</div>
          </div>
        </div>
        <div class="super-table-wrap">
          <table class="super-table">
            <thead><tr><th>${tr('superimposedArpeggio')}</th><th>${tr('result')}</th><th>${tr('addedTensions')}</th></tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
          <div class="super-mobile-list">${mobileCards}</div>
        </div>
      </div>
    </details>
  `;
  makeSectionCloseable(sec);
  out.appendChild(sec);
  return rows.length;
}

function renderArpeggioSuperimposition(root,name,out){
  out.innerHTML='';
  const rootOptions=(typeof NOTES!=='undefined'?NOTES:['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'])
    .map(n=>`<option value="${n}" ${n===root?'selected':''}>${n}</option>`)
    .join('');
  const control=document.createElement('section');
  control.className='section superimposition-control-section';
  control.innerHTML=`
    <div class="super-control-header">
      <div>
        <h2>${dn('Superposição de Arpejos')}</h2>
        <div class="tension-note">${tr('superimpositionInfo')}</div>
      </div>
      <div class="super-root-control">
        <label for="superRoot">${tr('root')}</label>
        <select id="superRoot" onchange="setSuperimpositionRoot(this.value)">${rootOptions}</select>
      </div>
    </div>
  `;
  out.appendChild(control);
  const order=['Acorde tipo 7M','Acorde tipo m7','Acorde tipo m7(b5)','Acorde tipo m7M','Acorde tipo 7M(#5)','Acorde tipo °','Acorde tipo 7'];
  let total=0;
  order.forEach(key=>{ if(SUPERIMPOSITION_DATA[key]) total+=renderArpeggioSuperimpositionBlock(root,key,out); });
  Object.keys(SUPERIMPOSITION_DATA).forEach(key=>{ if(!order.includes(key)) total+=renderArpeggioSuperimpositionBlock(root,key,out); });
  if(!total) out.innerHTML=`<div class="empty">${tr('noPositions')}</div>`;
  document.getElementById('status').textContent=`${total} ${tr('superimpositions')}`;
}



function compactTabForDisplay(line){
  const source=(line && Array.isArray(line.tab)) ? line.tab : [];
  if(source.length < 7) return source;
  const stringRows=source.slice(1).filter(row=>/^\s*[eBGDAE]\|/.test(row));
  if(stringRows.length < 6) return source;
  const parsed=stringRows.map(row=>{
    const pipe=row.indexOf('|');
    const label=row.slice(0,pipe+1);
    const parts=row.slice(pipe+1).split('|');
    if(parts[parts.length-1]==='') parts.pop();
    return {label,parts};
  });
  const barCount=Math.max(...parsed.map(r=>r.parts.length), (line.chords||[]).length, 1);
  const compressedByBar=[];
  const widths=[];
  const isNoteChar=ch=>ch && ch!=='-' && ch!==' ';

  for(let b=0;b<barCount;b++){
    const raw=parsed.map(r=>r.parts[b] || '');
    const maxLen=Math.max(1,...raw.map(x=>x.length));
    const padded=raw.map(x=>x.padEnd(maxLen,'-'));
    const noteCols=new Set();
    padded.forEach(seg=>{
      for(let i=0;i<seg.length;i++) if(isNoteChar(seg[i])) noteCols.add(i);
    });
    let keep=[];
    if(noteCols.size===0){
      keep=[0,1,2,3].filter(i=>i<maxLen);
    }else{
      const notes=[...noteCols].sort((a,b)=>a-b);
      const edgeGap=0;
      const gapCap=1;
      for(let i=Math.max(0,notes[0]-edgeGap); i<notes[0]; i++) keep.push(i);
      for(let n=0;n<notes.length;n++){
        const col=notes[n];
        if(!keep.includes(col)) keep.push(col);
        const next=notes[n+1];
        if(next===undefined) continue;
        for(let i=col+1; i<next; i++){
          if(noteCols.has(i)) continue;
          const distanceFromLeft=i-(col+1);
          const distanceFromRight=(next-1)-i;
          if(distanceFromLeft < Math.ceil(gapCap/2) || distanceFromRight < Math.floor(gapCap/2)) keep.push(i);
        }
      }
      for(let i=notes[notes.length-1]+1; i<=Math.min(maxLen-1,notes[notes.length-1]+edgeGap); i++) keep.push(i);
      keep=[...new Set(keep)].sort((a,b)=>a-b);
    }
    const segments=padded.map(seg=>keep.map(i=>seg[i]||'-').join(''));
    compressedByBar.push(segments);
    const chord=(line.chords && line.chords[b]) || '';
    widths.push(Math.max(segments[0]?.length||0, chord.length, 4));
  }

  const header='  '+Array.from({length:barCount},(_,i)=>{
    const chord=(line.chords && line.chords[i]) || '';
    return chord.padEnd(widths[i],' ');
  }).join('|')+'|';

  const output=[header];
  parsed.forEach((row,rowIdx)=>{
    const body=Array.from({length:barCount},(_,b)=>compressedByBar[b][rowIdx].padEnd(widths[b],'-')).join('|');
    output.push(row.label+body+'|');
  });
  return output;
}

function renderTabExercises(root,name,out){
  out.innerHTML='';
  const ex=TAB_EXERCISES[name] || TAB_EXERCISES[Object.keys(TAB_EXERCISES)[0]];
  if(!ex){out.innerHTML=`<div class="empty">${tr('noPositions')}</div>`;return;}
  const sec=document.createElement('section');
  sec.className='section exercise-section';
  const title=currentLang==='pt'?ex.name:ex.nameEn;
  const subtitle=currentLang==='pt'?ex.subtitlePt:ex.subtitleEn;
  sec.innerHTML=`
    <h2>${title}</h2>
    <div class="exercise-intro">${subtitle}</div>
    <div class="exercise-toolbar">
      <span class="exercise-badge">IIm7</span>
      <span class="exercise-arrow">→</span>
      <span class="exercise-badge">V7</span>
      <span class="exercise-arrow">→</span>
      <span class="exercise-badge">I7M</span>
      <span class="exercise-note">${tr('tablatureOnly')}</span>
    </div>
  `;
  const list=document.createElement('div');
  list.className='exercise-list';

  const block=document.createElement('article');
  block.className='exercise-tab-card exercise-tab-full';
  const allLines=ex.lines.map(line=>compactTabForDisplay(line).join('\n')).join('\n');
  block.innerHTML=`
    <div class="exercise-card-head">
      <strong>${title}</strong>
      <span>${ex.lines.length} ${tr('exercises')}</span>
    </div>
    <pre class="tab-pre tab-pre-full">${allLines}</pre>
  `;
  list.appendChild(block);
  sec.appendChild(list);
  makeSectionCloseable(sec);
  out.appendChild(sec);
  document.getElementById('status').textContent=`${ex.lines.length} ${tr('exercises')}`;
}

function render(){
  let root=document.getElementById('root').value,
      name=selectedStructure(),
      f=formula(),
      minF=Math.max(0,parseInt(document.getElementById('minFret').value||0)),
      maxF=Math.min(24,Math.max(minF+1,parseInt(document.getElementById('maxFret').value||24))),
      voices=[...document.querySelectorAll('#voicings input:checked')].map(x=>x.value),
      out=document.getElementById('output');
  out.innerHTML='';
  if(currentCategory==='Intervalos'){
    renderIntervals(root,name,f,minF,maxF,out);
    renderVoiceLeading();
    return;
  }
  if(currentCategory==='Campos Harmônicos'){
    renderHarmonicField(root,name,minF,maxF,out);
    renderVoiceLeading();
    return;
  }
  if(currentCategory==='Superposição de Arpejos'){
    renderArpeggioSuperimposition(root,name,out);
    renderVoiceLeading();
    return;
  }
  if(currentCategory==='Exercícios'){
    renderTabExercises(root,name,out);
    renderVoiceLeading();
    return;
  }
  if(!voices.length||![...document.querySelectorAll('#stringGroups input:checked')].length){
    out.innerHTML=`<div class="empty">${tr('emptySelection')}</div>`;
    document.getElementById('status').textContent='0 '+tr('diagrams');
    return;
  }
  let rendered=0;

  if(currentCategory==='Arpejos'&&hasBookArpeggioPattern(name)){
    let items=generateBookArpeggio(root,name,f,minF,maxF,voices);
    items.forEach(it=>{
      let sec=document.createElement('section');
      sec.className='section arpeggio-section';
      sec.innerHTML=`<h2>${root} — ${dn(name)} — <span class="voicing-label">${it.voicing}</span></h2>`;
      let grid=document.createElement('div');
      grid.className='fretboard-grid';
      let card=document.createElement('div');
      card.className='card horizontal-card';
      const minNote=Math.min(...it.positions.map(p=>p.fret));
      const maxNote=Math.max(...it.positions.map(p=>p.fret));
      card.innerHTML=`<div class="title">${root}</div><div class="meta">${it.voicing} · ${tr('fret')} ${minNote}-${maxNote}</div>${svgHorizontalArpeggio(it)}`;
      grid.appendChild(card);
      rendered++;
      sec.appendChild(grid);
      makeSectionCloseable(sec);
      out.appendChild(sec);
    });
  }else{
    voices.forEach(v=>{
      let isScale=currentCategory==='Escalas'||currentCategory==='Modos'||v==='Desenho por região'||v==='Pattern by region';
      let items=isScale?generateScale(root,f,minF,maxF):generateVoicing(root,f,v,minF,maxF);
      if(!items.length) return;
      let sec=document.createElement('section');
      sec.className='section';
      sec.innerHTML=`<h2>${root} — ${dn(name)} — <span class="voicing-label">${v}</span></h2>`;
      let grid=document.createElement('div');
      grid.className='grid';
      items.forEach(it=>{
        let card=document.createElement('div');
        card.className='card';
        card.innerHTML=`<div class="title">${root}</div><div class="meta">${it.voicing} · ${tr('fret')} ${it.baseFret}</div>${svgDiagram(it,isScale)}`;
        grid.appendChild(card);
        rendered++;
      });
      sec.appendChild(grid);
      makeSectionCloseable(sec);
      out.appendChild(sec);
    });
  }
  if(!rendered) out.innerHTML=`<div class="empty">${tr('noPositions')}</div>`;
  document.getElementById('status').textContent=`${rendered} ${tr('diagrams')}`;
  renderVoiceLeading();
}

function exportCSS(){return `
*{box-sizing:border-box} body{margin:0;background:white;color:#111;font-family:Arial,Helvetica,sans-serif}.export-page{width:1400px;background:white;color:#111;padding:28px 34px}.section{margin-top:28px;border-top:2px solid #111;padding-top:14px;break-inside:avoid}.section h2{text-align:center;margin:0 0 14px;font-size:20px;text-transform:uppercase;letter-spacing:.03em}.voicing-label{text-transform:none!important}.grid{display:grid;grid-template-columns:repeat(6,145px);gap:18px 22px;align-items:start;justify-content:start}.fretboard-grid{display:block}.card{text-align:center;width:145px;break-inside:avoid}.horizontal-card{width:100%;overflow:visible}.title{font-size:18px;font-weight:bold;margin-bottom:4px}.meta{font-size:12px;color:#666;min-height:15px;margin-bottom:10px}svg.diagram{width:142px!important;height:160px!important;display:block;overflow:visible}svg.horizontal-arpeggio{width:100%!important;max-width:720px!important;height:auto!important;display:block;margin:0 auto;overflow:visible}svg text{font-family:Arial,Helvetica,sans-serif}.empty{text-align:center;padding:30px;border:1px dashed #111;color:#666}.section-close{display:none!important}
`;}
function exportMarkup(){const clone=document.getElementById('output').cloneNode(true);return `<div xmlns="http://www.w3.org/1999/xhtml" class="export-page"><style>${exportCSS()}</style>${clone.innerHTML}</div>`;}
function exportSVG(){const w=1400;const h=Math.max(900,document.getElementById('output').scrollHeight+120);const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="white"/><foreignObject x="0" y="0" width="${w}" height="${h}">${exportMarkup()}</foreignObject></svg>`;downloadFile('gerador-harmonico.svg','image/svg+xml;charset=utf-8',svg);}
function exportPNG(){const w=1400;const h=Math.max(900,document.getElementById('output').scrollHeight+120);const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="white"/><foreignObject x="0" y="0" width="${w}" height="${h}">${exportMarkup()}</foreignObject></svg>`;const img=new Image();const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));img.onload=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);URL.revokeObjectURL(url);c.toBlob(b=>downloadBlob('gerador-harmonico.png',b),'image/png')};img.onerror=()=>{URL.revokeObjectURL(url);alert(tr('exportFailed'));};img.src=url;}
function downloadFile(name,type,text){downloadBlob(name,new Blob([text],{type}))} function downloadBlob(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
