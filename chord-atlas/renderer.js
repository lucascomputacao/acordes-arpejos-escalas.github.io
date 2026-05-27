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

function render(){
  let root=document.getElementById('root').value,
      name=selectedStructure(),
      f=formula(),
      minF=Math.max(0,parseInt(document.getElementById('minFret').value||0)),
      maxF=Math.min(24,Math.max(minF+1,parseInt(document.getElementById('maxFret').value||24))),
      voices=[...document.querySelectorAll('#voicings input:checked')].map(x=>x.value),
      out=document.getElementById('output');
  out.innerHTML='';
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
      out.appendChild(sec);
    });
  }
  if(!rendered) out.innerHTML=`<div class="empty">${tr('noPositions')}</div>`;
  document.getElementById('status').textContent=`${rendered} ${tr('diagrams')}`;
  renderVoiceLeading();
}

function exportCSS(){return `
*{box-sizing:border-box} body{margin:0;background:white;color:#111;font-family:Arial,Helvetica,sans-serif}.export-page{width:1400px;background:white;color:#111;padding:28px 34px}.section{margin-top:28px;border-top:2px solid #111;padding-top:14px;break-inside:avoid}.section h2{text-align:center;margin:0 0 14px;font-size:20px;text-transform:uppercase;letter-spacing:.03em}.voicing-label{text-transform:none!important}.grid{display:grid;grid-template-columns:repeat(6,145px);gap:18px 22px;align-items:start;justify-content:start}.fretboard-grid{display:block}.card{text-align:center;width:145px;break-inside:avoid}.horizontal-card{width:100%;overflow:visible}.title{font-size:18px;font-weight:bold;margin-bottom:4px}.meta{font-size:12px;color:#666;min-height:15px;margin-bottom:10px}svg.diagram{width:142px!important;height:160px!important;display:block;overflow:visible}svg.horizontal-arpeggio{width:100%!important;max-width:720px!important;height:auto!important;display:block;margin:0 auto;overflow:visible}svg text{font-family:Arial,Helvetica,sans-serif}.empty{text-align:center;padding:30px;border:1px dashed #111;color:#666}
`;}
function exportMarkup(){const clone=document.getElementById('output').cloneNode(true);return `<div xmlns="http://www.w3.org/1999/xhtml" class="export-page"><style>${exportCSS()}</style>${clone.innerHTML}</div>`;}
function exportSVG(){const w=1400;const h=Math.max(900,document.getElementById('output').scrollHeight+120);const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="white"/><foreignObject x="0" y="0" width="${w}" height="${h}">${exportMarkup()}</foreignObject></svg>`;downloadFile('gerador-harmonico.svg','image/svg+xml;charset=utf-8',svg);}
function exportPNG(){const w=1400;const h=Math.max(900,document.getElementById('output').scrollHeight+120);const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="white"/><foreignObject x="0" y="0" width="${w}" height="${h}">${exportMarkup()}</foreignObject></svg>`;const img=new Image();const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));img.onload=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);URL.revokeObjectURL(url);c.toBlob(b=>downloadBlob('gerador-harmonico.png',b),'image/png')};img.onerror=()=>{URL.revokeObjectURL(url);alert(tr('exportFailed'));};img.src=url;}
function downloadFile(name,type,text){downloadBlob(name,new Blob([text],{type}))} function downloadBlob(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
