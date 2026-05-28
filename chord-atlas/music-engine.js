const INTERVALS={'T':0,'1':0,'b2':1,'2':2,'#2':3,'b3':3,'3':4,'4':5,'#4':6,'b5':6,'5':7,'#5':8,'b6':8,'6':9,'bb7':9,'b7':10,'7':11,'7M':11};
const LIBRARY={'Acordes':{'Tríade maior':['T','3','5'],'Tríade menor':['T','b3','5'],'Tríade aumentada':['T','3','#5'],'Tríade diminuta':['T','b3','b5'],'Tétrade maior 7M':['T','3','5','7M'],'Tétrade menor 7':['T','b3','5','b7'],'Tétrade dominante 7':['T','3','5','b7'],'Tétrade meio-diminuta m7(b5)':['T','b3','b5','b7'],'Tétrade diminuta dim7':['T','b3','b5','bb7'],'Menor com sétima maior m(7M)':['T','b3','5','7M'],'Maior com sexta 6':['T','3','5','6'],'Menor com sexta m6':['T','b3','5','6'],'Suspenso sus4':['T','4','5']},'Arpejos':{'Arpejo tríade maior':['T','3','5'],'Arpejo tríade menor':['T','b3','5'],'Arpejo tríade aumentada':['T','3','#5'],'Arpejo tríade diminuta':['T','b3','b5'],'Arpejo tétrade maior 7M':['T','3','5','7M'],'Arpejo tétrade menor 7':['T','b3','5','b7'],'Arpejo dominante 7':['T','3','5','b7'],'Arpejo meio-diminuto':['T','b3','b5','b7'],'Arpejo diminuto':['T','b3','b5','bb7']},'Escalas':{'Escala maior':['T','2','3','4','5','6','7'],'Escala menor natural':['T','2','b3','4','5','b6','b7'],'Escala menor harmônica':['T','2','b3','4','5','b6','7'],'Escala menor melódica':['T','2','b3','4','5','6','7'],'Pentatonic/root maior':['T','2','3','5','6'],'Pentatonic/root menor':['T','b3','4','5','b7'],'Blues maior':['T','2','b3','3','5','6'],'Blues menor':['T','b3','4','b5','5','b7'],'Escala diminuta':['T','2','b3','4','b5','b6','6','7'],'Diminuta dominante':['T','b2','b3','3','b5','5','6','b7'],'Tons inteiros':['T','2','3','#4','#5','b7']},'Modos':{'Modo jônico':['T','2','3','4','5','6','7'],'Modo dórico':['T','2','b3','4','5','6','b7'],'Modo frígio':['T','b2','b3','4','5','b6','b7'],'Modo lídio':['T','2','3','#4','5','6','7'],'Modo mixolídio':['T','2','3','4','5','6','b7'],'Modo eólio':['T','2','b3','4','5','b6','b7'],'Modo lócrio':['T','b2','b3','4','b5','b6','b7'],'Superlócrio / alterada':['T','b2','#2','3','b5','#5','b7']},'Campos Harmônicos':{'Campo maior (jônico)':['T','2','3','4','5','6','7'],'Campo menor natural (eólio)':['T','2','b3','4','5','b6','b7']}};

const SCALE_SUGGESTIONS={
  'Tríade maior':[
    {cat:'Modos',name:'Modo jônico',whyPt:'som maior estável',whyEn:'stable major sound'},
    {cat:'Modos',name:'Modo lídio',whyPt:'#4 como cor moderna',whyEn:'#4 as a modern color'},
    {cat:'Escalas',name:'Pentatonic/root maior',whyPt:'opção simples e melódica',whyEn:'simple melodic option'}
  ],
  'Tríade menor':[
    {cat:'Modos',name:'Modo eólio',whyPt:'menor natural',whyEn:'natural minor'},
    {cat:'Modos',name:'Modo dórico',whyPt:'menor com 6 maior',whyEn:'minor with major 6'},
    {cat:'Escalas',name:'Pentatonic/root menor',whyPt:'opção direta para fraseado',whyEn:'direct phrasing option'}
  ],
  'Tríade diminuta':[
    {cat:'Modos',name:'Modo lócrio',whyPt:'contém b3 e b5',whyEn:'contains b3 and b5'},
    {cat:'Escalas',name:'Escala diminuta',whyPt:'simétrica sobre diminutos',whyEn:'symmetric diminished sound'}
  ],
  'Tríade aumentada':[
    {cat:'Escalas',name:'Tons inteiros',whyPt:'contém 3 e #5',whyEn:'contains 3 and #5'},
    {cat:'Modos',name:'Superlócrio / alterada',whyPt:'cor alterada dominante',whyEn:'altered dominant color'}
  ],
  'Tétrade maior 7M':[
    {cat:'Modos',name:'Modo jônico',whyPt:'7M diatonic/root',whyEn:'diatonic major 7'},
    {cat:'Modos',name:'Modo lídio',whyPt:'7M com #4',whyEn:'major 7 with #4'},
    {cat:'Escalas',name:'Escala maior',whyPt:'base diatonic/root',whyEn:'diatonic base'}
  ],
  'Tétrade menor 7':[
    {cat:'Modos',name:'Modo dórico',whyPt:'m7 com 6 maior',whyEn:'m7 with major 6'},
    {cat:'Modos',name:'Modo eólio',whyPt:'m7 com b6',whyEn:'m7 with b6'},
    {cat:'Escalas',name:'Pentatonic/root menor',whyPt:'fraseado menor',whyEn:'minor phrasing'}
  ],
  'Tétrade dominante 7':[
    {cat:'Modos',name:'Modo mixolídio',whyPt:'dominante básico',whyEn:'basic dominant sound'},
    {cat:'Escalas',name:'Blues maior',whyPt:'cor blues dominante',whyEn:'dominant blues color'},
    {cat:'Modos',name:'Superlócrio / alterada',whyPt:'dominante alterado',whyEn:'altered dominant'}
  ],
  'Tétrade meio-diminuta m7(b5)':[
    {cat:'Modos',name:'Modo lócrio',whyPt:'m7(b5) diatônico',whyEn:'diatonic m7(b5)'},
    {cat:'Modos',name:'Superlócrio / alterada',whyPt:'tensões alteradas possíveis',whyEn:'possible altered tensions'}
  ],
  'Tétrade diminuta dim7':[
    {cat:'Escalas',name:'Escala diminuta',whyPt:'simetria diminuta',whyEn:'diminished symmetry'}
  ],
  'Menor com sétima maior m(7M)':[
    {cat:'Escalas',name:'Escala menor melódica',whyPt:'contém b3 e 7M',whyEn:'contains b3 and major 7'},
    {cat:'Escalas',name:'Escala menor harmônica',whyPt:'cor menor harmônica',whyEn:'harmonic minor color'}
  ],
  'Maior com sexta 6':[
    {cat:'Modos',name:'Modo jônico',whyPt:'maior com 6',whyEn:'major with 6'},
    {cat:'Escalas',name:'Pentatonic/root maior',whyPt:'contém 6',whyEn:'contains 6'}
  ],
  'Menor com sexta m6':[
    {cat:'Modos',name:'Modo dórico',whyPt:'b3 com 6 maior',whyEn:'b3 with major 6'},
    {cat:'Escalas',name:'Escala menor melódica',whyPt:'menor com 6 e 7M',whyEn:'minor with 6 and major 7'}
  ],
  'Suspenso sus4':[
    {cat:'Modos',name:'Modo mixolídio',whyPt:'sus dominante comum',whyEn:'common dominant sus'},
    {cat:'Modos',name:'Modo dórico',whyPt:'cor sus menor/modal',whyEn:'minor/modal sus color'}
  ]
};


const COMPATIBLE_CHORDS={
  'Escala maior':[
    {name:'Tétrade maior 7M',whyPt:'som maior diatônico / I grau',whyEn:'diatonic major sound / I chord'},
    {name:'Maior com sexta 6',whyPt:'cor maior com sexta',whyEn:'major 6 color'},
    {name:'Tríade maior',whyPt:'base maior simples',whyEn:'simple major base'}
  ],
  'Escala menor natural':[
    {name:'Tétrade menor 7',whyPt:'menor natural / eólio',whyEn:'natural minor / Aeolian'},
    {name:'Tríade menor',whyPt:'base menor simples',whyEn:'simple minor base'}
  ],
  'Escala menor harmônica':[
    {name:'Menor com sétima maior m(7M)',whyPt:'contém b3 e 7M',whyEn:'contains b3 and maj7'},
    {name:'Tétrade diminuta dim7',whyPt:'boa relação com função dominante/diminuta',whyEn:'strong dominant/diminished-function relation'},
    {name:'Tétrade dominante 7',whyPt:'pode gerar dominante com b9/b13 por contexto',whyEn:'can imply dominant b9/b13 colors by context'}
  ],
  'Escala menor melódica':[
    {name:'Menor com sétima maior m(7M)',whyPt:'som menor melódico direto',whyEn:'direct melodic minor sound'},
    {name:'Menor com sexta m6',whyPt:'menor com sexta maior',whyEn:'minor with major 6'},
    {name:'Tétrade dominante 7',whyPt:'fonte de dominantes alterados quando deslocada',whyEn:'source for altered dominants when displaced'}
  ],
  'Pentatonic/root maior':[
    {name:'Tríade maior',whyPt:'fraseado maior direto',whyEn:'direct major phrasing'},
    {name:'Maior com sexta 6',whyPt:'contém 6 e evita a 4',whyEn:'contains 6 and avoids the 4th'}
  ],
  'Pentatonic/root menor':[
    {name:'Tríade menor',whyPt:'fraseado menor direto',whyEn:'direct minor phrasing'},
    {name:'Tétrade menor 7',whyPt:'contém b3, 5 e b7',whyEn:'contains b3, 5 and b7'}
  ],
  'Blues maior':[
    {name:'Tríade maior',whyPt:'cor blues maior',whyEn:'major blues color'},
    {name:'Tétrade dominante 7',whyPt:'funciona como cor dominante/blues',whyEn:'works as dominant/blues color'}
  ],
  'Blues menor':[
    {name:'Tríade menor',whyPt:'cor blues menor',whyEn:'minor blues color'},
    {name:'Tétrade menor 7',whyPt:'fraseado m7/blues',whyEn:'m7/blues phrasing'},
    {name:'Tétrade dominante 7',whyPt:'uso blues sobre dominante',whyEn:'blues usage over dominant'}
  ],
  'Escala diminuta':[
    {name:'Tétrade diminuta dim7',whyPt:'simetria diminuta',whyEn:'diminished symmetry'},
    {name:'Tríade diminuta',whyPt:'contém b3 e b5',whyEn:'contains b3 and b5'}
  ],
  'Diminuta dominante':[
    {name:'Tétrade dominante 7',whyPt:'dominante com b9/#9/#11/13',whyEn:'dominant with b9/#9/#11/13'},
    {name:'Tétrade diminuta dim7',whyPt:'material diminuto aplicado a dominante',whyEn:'diminished material applied to dominant'}
  ],
  'Tons inteiros':[
    {name:'Tríade aumentada',whyPt:'contém 3 e #5',whyEn:'contains 3 and #5'},
    {name:'Tétrade dominante 7',whyPt:'dominante com #5/#11',whyEn:'dominant with #5/#11'}
  ],
  'Modo jônico':[
    {name:'Tétrade maior 7M',whyPt:'I grau maior diatônico',whyEn:'diatonic I major chord'},
    {name:'Maior com sexta 6',whyPt:'maior com 6/9',whyEn:'major 6/9 color'},
    {name:'Tríade maior',whyPt:'base maior',whyEn:'major base'}
  ],
  'Modo dórico':[
    {name:'Tétrade menor 7',whyPt:'m7 com 6 maior',whyEn:'m7 with major 6'},
    {name:'Menor com sexta m6',whyPt:'menor com 6',whyEn:'minor with 6'},
    {name:'Tríade menor',whyPt:'base menor modal',whyEn:'modal minor base'}
  ],
  'Modo frígio':[
    {name:'Tétrade menor 7',whyPt:'m7 com b9/b6 por contexto',whyEn:'m7 with contextual b9/b6'},
    {name:'Tríade menor',whyPt:'base menor com b2',whyEn:'minor base with b2'}
  ],
  'Modo lídio':[
    {name:'Tétrade maior 7M',whyPt:'maj7 com #11',whyEn:'maj7 with #11'},
    {name:'Maior com sexta 6',whyPt:'6/9 com #11',whyEn:'6/9 with #11'},
    {name:'Tríade maior',whyPt:'maior com cor lídia',whyEn:'major with Lydian color'}
  ],
  'Modo mixolídio':[
    {name:'Tétrade dominante 7',whyPt:'dominante básico',whyEn:'basic dominant'},
    {name:'Suspenso sus4',whyPt:'sus dominante/modal',whyEn:'dominant/modal sus'},
    {name:'Tríade maior',whyPt:'maior com b7 no contexto',whyEn:'major with contextual b7'}
  ],
  'Modo eólio':[
    {name:'Tétrade menor 7',whyPt:'m7 com b6',whyEn:'m7 with b6'},
    {name:'Tríade menor',whyPt:'menor natural',whyEn:'natural minor'}
  ],
  'Modo lócrio':[
    {name:'Tétrade meio-diminuta m7(b5)',whyPt:'m7(b5) diatônico',whyEn:'diatonic m7(b5)'},
    {name:'Tríade diminuta',whyPt:'contém b3 e b5',whyEn:'contains b3 and b5'}
  ],
  'Superlócrio / alterada':[
    {name:'Tétrade dominante 7',whyPt:'dominante alterado',whyEn:'altered dominant'},
    {name:'Tríade aumentada',whyPt:'cor aumentada/alterada',whyEn:'augmented/altered color'}
  ]
};

const TENSION_DATA={
  'Tríade maior':{stable:['6','9'],context:['7M','#11','13'],avoid:['4/11'],pt:'Funciona como acorde maior. 4/11 costuma gerar atrito com a third maior; #11 é uma cor lídia mais estável.',en:'Works as a major chord. 4/11 usually clashes with the major third; #11 is the more stable Lydian color.'},
  'Tríade menor':{stable:['9','11'],context:['6','b7','7M'],avoid:['b9'],pt:'Funciona como acorde menor. 9 e 11 são cores comuns; 6, b7 ou 7M dependem do modo escolhido.',en:'Works as a minor chord. 9 and 11 are common colors; 6, b7 or maj7 depend on the chosen mode.'},
  'Tríade aumentada':{stable:['7M','#11'],context:['9','b7'],avoid:['5 natural'],pt:'A fifth aumentada já define a cor. Use tensões simétricas ou derivadas de tons inteiros com cuidado.',en:'The augmented fifth already defines the color. Use symmetrical or whole-tone-derived tensions carefully.'},
  'Tríade diminuta':{stable:['b7','bb7'],context:['b9','11'],avoid:['5 natural'],pt:'A tríade diminuta pode apontar para dominante ou diminuto; as tensões dependem da função.',en:'A diminished triad may imply dominant or diminished function; tensions depend on function.'},
  'Tétrade maior 7M':{stable:['9','#11','13'],context:['6'],avoid:['4/11'],pt:'Em acordes maiores com 7M, 9, #11 e 13 são as cores mais estáveis. 11 natural conflita com a third.',en:'On maj7 chords, 9, #11 and 13 are the most stable colors. Natural 11 clashes with the third.'},
  'Tétrade menor 7':{stable:['9','11'],context:['13','b13'],avoid:['b9'],pt:'Para m7, 9 e 11 são seguras. 13 sugere dórico; b13 sugere eólio/frígio.',en:'For m7, 9 and 11 are safe. 13 suggests Dorian; b13 suggests Aeolian/Phrygian.'},
  'Tétrade dominante 7':{stable:['9','13'],context:['b9','#9','#11','b13'],avoid:['7M'],pt:'Dominantes aceitam muitas alterações. 9 e 13 são estáveis; b9, #9, #11 e b13 dependem da resolução.',en:'Dominants accept many alterations. 9 and 13 are stable; b9, #9, #11 and b13 depend on resolution.'},
  'Tétrade meio-diminuta m7(b5)':{stable:['11','b13'],context:['b9','9'],avoid:['13 natural'],pt:'m7(b5) combina bem com 11 e b13. A nona pode mudar conforme lócrio ou lócrio 9.',en:'m7(b5) pairs well with 11 and b13. The ninth changes with Locrian vs Locrian natural 9 contexts.'},
  'Tétrade diminuta dim7':{stable:['9','11','b13'],context:['b9','3 dim'],avoid:['5 natural'],pt:'Acordes diminutos são simétricos; as tensões são melhor tratadas como cores de passagem ou função dominante.',en:'Diminished chords are symmetrical; tensions are best treated as passing colors or dominant-function colors.'},
  'Menor com sétima maior m(7M)':{stable:['9','11','13'],context:['b13'],avoid:['b9'],pt:'m(7M) aparece muito na menor melódica. 9, 11 e 13 reforçam essa sonoridade.',en:'m(maj7) is common in melodic minor. 9, 11 and 13 reinforce that sound.'},
  'Maior com sexta 6':{stable:['9','#11'],context:['7M'],avoid:['4/11'],pt:'Acorde maior com sexta recebe bem 9 e #11. A 7M muda a sonoridade para maj7/6.',en:'Major 6 chords take 9 and #11 well. Maj7 changes the sonority toward maj7/6.'},
  'Menor com sexta m6':{stable:['9','11'],context:['7M'],avoid:['b9'],pt:'m6 normalmente aponta para menor melódica ou dórico. 9 e 11 são boas extensões.',en:'m6 often points to melodic minor or Dorian. 9 and 11 are good extensions.'},
  'Suspenso sus4':{stable:['9','b7'],context:['13'],avoid:['3 natural'],pt:'Em sus4, a third fica suspensa. 9, b7 e 13 são cores frequentes.',en:'In sus4, the third is suspended. 9, b7 and 13 are common colors.'}
};


const HARMONIC_FIELDS={
  'Campo maior (jônico)':{
    scale:'Escala maior', mode:'Modo jônico', formula:['T','2','3','4','5','6','7'],
    degrees:['I','ii','iii','IV','V','vi','vii°'],
    functions:['T','S','S','S','D','S','D'],
    qualities:['maj7','m7','m7','maj7','7','m7','m7(b5)'],
    chordFormulas:[['T','3','5','7M'],['T','b3','5','b7'],['T','b3','5','b7'],['T','3','5','7M'],['T','3','5','b7'],['T','b3','5','b7'],['T','b3','b5','b7']]
  },
  'Campo menor natural (eólio)':{
    scale:'Escala menor natural', mode:'Modo eólio', formula:['T','2','b3','4','5','b6','b7'],
    degrees:['i','ii°','bIII','iv','v','bVI','bVII'],
    functions:['T','S','T','S','D','S','D'],
    qualities:['m7','m7(b5)','maj7','m7','m7','maj7','7'],
    chordFormulas:[['T','b3','5','b7'],['T','b3','b5','b7'],['T','3','5','7M'],['T','b3','5','b7'],['T','b3','5','b7'],['T','3','5','7M'],['T','3','5','b7']]
  }
};
const FIELD_COLORS=['#2563eb','#0ea5a4','#16a34a','#8b5cf6','#f97316','#ca8a04','#ef4444'];
function fieldData(root,fieldName){
  const f=HARMONIC_FIELDS[fieldName]||HARMONIC_FIELDS['Campo maior (jônico)'];
  const roots=f.formula.map(iv=>noteFor(root,iv));
  return {...f, roots, chords:roots.map((r,i)=>({root:r, degree:f.degrees[i], function:f.functions[i], quality:f.qualities[i], formula:f.chordFormulas[i], notes:f.chordFormulas[i].map(iv=>noteFor(r,iv)), color:FIELD_COLORS[i%FIELD_COLORS.length]}))};
}
function fieldDegreeForNote(root,fieldName,note){
  const data=fieldData(root,fieldName);
  const idx=data.roots.indexOf(note);
  return idx>=0?{index:idx, degree:data.degrees[idx], function:data.functions[idx], color:data.chords[idx].color}:null;
}

function pc(n){return NOTES.indexOf(n)} function noteFor(root,iv){return NOTES[(pc(root)+INTERVALS[iv])%12]} function noteAt(s,f){return NOTES[(pc(STRING_TUNING[s])+f)%12]} function rotate(a,n){return a.slice(n).concat(a.slice(0,n))} function uniq(a){return [...new Set(a)]}
function getVoicingGroups(f){ if(currentCategory==='Escalas'||currentCategory==='Modos') return [{name:'pattern',items:['Desenho por região']}]; const groups=[]; if(f.length===3){const [t,a,b]=f;groups.push({name:'standard',items:uniq([[t,a,b],[t,b,a],[a,b,t],[a,t,b],[b,t,a],[b,a,t]].map(x=>x.join('-')))});} if(f.length===4){const [t,third,fifth,sev]=f;let std=[];[[t,sev,third,fifth],[t,fifth,sev,third],[t,third,fifth,sev],[t,fifth,third,sev]].forEach(x=>{for(let i=0;i<4;i++)std.push(rotate(x,i).join('-'))});groups.push({name:'standard',items:uniq(std)});let drop=[];[f,rotate(f,1),rotate(f,2),rotate(f,3)].forEach(closed=>{const d=[closed[2],closed[0],closed[1],closed[3]];drop.push(d.join('-'))});groups.push({name:'drop2',items:uniq(drop)});groups.push({name:'shell',items:uniq([[t,third,sev],[t,sev,third],[third,sev,t],[sev,third,t]].map(x=>x.join('-')))});} return groups; }
function stringSetsForSize(size){let sets=[]; for(let i=0;i<=STRINGS.length-size;i++)sets.push(STRINGS.slice(i,i+size)); return sets;}
function intervalMap(root,f){let m={};f.forEach(iv=>m[iv]=noteFor(root,iv));return m}

// Book-style arpeggio patterns.
// Coordinates are generic fret-window formulas, not fixed C notes.
// The first fret in each pattern is shifted by the selected root.
const BOOK_ARPEGGIO_PATTERNS = {
  'Arpejo tríade maior': [
    {
      name: 'Position 1',
      baseForC: 0,
      // Major triad arpeggio - book-style position 1.
      // This pattern has been checked against the horizontal fretboard version.
      offsets: [
        {string:6, fret:3, interval:'5'},
        {string:5, fret:3, interval:'T'},
        {string:4, fret:2, interval:'3'},
        {string:4, fret:5, interval:'5'},
        {string:3, fret:5, interval:'T'},
        {string:2, fret:5, interval:'3'},
        {string:1, fret:3, interval:'5'}
      ]
    },
    {
      name: 'Position 2',
      baseForC: 5,
      // Major triad arpeggio - book-style position 2.
      // Removed the extra G-string note at the final column.
      offsets: [
        {string:6, fret:3, interval:'T'},
        {string:5, fret:2, interval:'3'},
        {string:4, fret:0, interval:'5'},
        {string:4, fret:3, interval:'b7'},
        {string:3, fret:0, interval:'T'},
        {string:2, fret:0, interval:'3'},
        {string:2, fret:3, interval:'5'},
        {string:1, fret:3, interval:'T'}
      ]
    },
    {
      name: 'Position 3',
      baseForC: 8,
      // Major triad arpeggio - book-style position 3.
      // The A-string third at fret 7 stays fixed.
      // The remaining notes were moved one fret/column left so the tonic lands on fret 8.
      offsets: [
        {string:6, fret:0, interval:'T'},
        {string:5, fret:-1, interval:'3'},
        {string:5, fret:2, interval:'5'},
        {string:4, fret:2, interval:'T'},
        {string:3, fret:1, interval:'3'},
        {string:2, fret:0, interval:'5'},
        {string:1, fret:0, interval:'T'}
      ]
    },
    {
      name: 'Position 4',
      baseForC: 10,
      // Major triad arpeggio - book-style position 4.
      // Removed the D-string third at fret 14 and added the G-string third at fret 9.
      offsets: [
        {string:6, fret:2, interval:'3'},
        {string:5, fret:0, interval:'5'},
        {string:4, fret:0, interval:'T'},
        {string:3, fret:-1, interval:'3'},
        {string:3, fret:2, interval:'5'},
        {string:2, fret:3, interval:'T'},
        {string:1, fret:2, interval:'3'}
      ]
    },
    {
      name: 'Position 5',
      baseForC: 0,
      // Major triad arpeggio - book-style position 5.
      // Removed the B-string note at fret 5.
      // Open-string major thirds stay at fret 0.
      // Notes inside the fretboard window were moved one column left.
      offsets: [
        {string:6, fret:0, interval:'3'},
        {string:6, fret:3, interval:'5'},
        {string:5, fret:3, interval:'T'},
        {string:4, fret:2, interval:'3'},
        {string:3, fret:0, interval:'5'},
        {string:2, fret:1, interval:'T'},
        {string:1, fret:0, interval:'3'},
        {string:1, fret:3, interval:'5'}
      ]
    }
  ],
  'Arpejo tétrade maior 7M': [
    {
      name: 'Position 1',
      baseForC: 0,
      // Major 7 arpeggio - book-style regional position 1.
      // Formula: T-3-5-7M. Root notes are white; all other chord tones are black.
      offsets: [
        {string:6, fret:3, interval:'5'},
        {string:5, fret:2, interval:'7M'},
        {string:5, fret:3, interval:'T'},
        {string:4, fret:2, interval:'3'},
        {string:4, fret:5, interval:'5'},
        {string:3, fret:4, interval:'7M'},
        {string:3, fret:5, interval:'T'},
        {string:2, fret:5, interval:'3'},
        {string:1, fret:3, interval:'5'}
      ]
    },
    {
      name: 'Position 2',
      baseForC: 5,
      // Major 7 arpeggio - Position 2 corrected from user markup.
      // Removed the right-edge G-string 3 and D-string 7M; added left-side 7M and 3.
      offsets: [
        {string:6, fret:2, interval:'7M'},
        {string:6, fret:3, interval:'T'},
        {string:5, fret:2, interval:'3'},
        {string:4, fret:0, interval:'5'},
        {string:3, fret:-1, interval:'7M'},
        {string:3, fret:0, interval:'T'},
        {string:2, fret:0, interval:'3'},
        {string:2, fret:3, interval:'5'},
        {string:1, fret:2, interval:'7M'},
        {string:1, fret:3, interval:'T'}
      ]
    },
    {
      name: 'Position 3',
      baseForC: 8,
      // Major 7 arpeggio - Position 3 corrected from user markup.
      // Removed the right-edge notes and added the left-side tones from the book pattern.
      offsets: [
        {string:6, fret:-1, interval:'7M'},
        {string:6, fret:0, interval:'T'},
        {string:5, fret:-1, interval:'3'},
        {string:5, fret:2, interval:'5'},
        {string:4, fret:1, interval:'7M'},
        {string:4, fret:2, interval:'T'},
        {string:3, fret:1, interval:'3'},
        {string:2, fret:0, interval:'5'},
        {string:1, fret:-1, interval:'7M'},
        {string:1, fret:0, interval:'T'}
      ]
    },
    {
      name: 'Position 4',
      baseForC: 8,
      // Major 7 arpeggio - book-style regional position 4.
      // Rebuilt from the reference diagram: no open-position notes; region is 8-13 in C.
      offsets: [
        {string:6, fret:4, interval:'3'},
        {string:5, fret:2, interval:'5'},
        {string:4, fret:1, interval:'7M'},
        {string:4, fret:2, interval:'T'},
        {string:3, fret:1, interval:'3'},
        {string:3, fret:4, interval:'5'},
        {string:2, fret:4, interval:'7M'},
        {string:2, fret:5, interval:'T'},
        {string:1, fret:4, interval:'3'}
      ]
    },
    {
      name: 'Position 5',
      baseForC: 0,
      // Major 7 arpeggio - Position 5 corrected from user markup.
      // Removed the G-string 7M at fret 4 and added the open B-string 7M.
      offsets: [
        {string:6, fret:0, interval:'3'},
        {string:6, fret:3, interval:'5'},
        {string:5, fret:2, interval:'7M'},
        {string:5, fret:3, interval:'T'},
        {string:4, fret:2, interval:'3'},
        {string:3, fret:0, interval:'5'},
        {string:2, fret:0, interval:'7M'},
        {string:2, fret:1, interval:'T'},
        {string:1, fret:0, interval:'3'},
        {string:1, fret:3, interval:'5'}
      ]
    }
  ],
  'Arpejo tríade menor': [
    {
      name: 'Position 1',
      baseForC: 0,
      // Minor triad arpeggio inferred from the corrected major-triad position 1.
      // T and 5 stay in the same places; every 3 is lowered one fret and relabeled b3.
      // Checked against the supplied book screenshot for minor triad - position 1.
      // Shape for C minor: G-C-Eb-G-C-Eb-G across the regional window.
      offsets: [
        {string:6, fret:3, interval:'5'},   // low E string - G
        {string:5, fret:3, interval:'T'},   // A string - C
        {string:5, fret:6, interval:'b3'},  // A string - Eb
        {string:4, fret:5, interval:'5'},   // D string - G
        {string:3, fret:5, interval:'T'},   // G string - C
        {string:2, fret:4, interval:'b3'},  // B string - Eb
        {string:1, fret:3, interval:'5'}    // high E string - G
      ]
    },
    {
      name: 'Position 2',
      baseForC: 5,
      // Minor triad arpeggio inferred from corrected major-triad position 2.
      offsets: [
        {string:6, fret:3, interval:'T'},
        {string:5, fret:1, interval:'b3'},
        {string:4, fret:0, interval:'5'},
        {string:4, fret:3, interval:'b7'},
        {string:3, fret:0, interval:'T'},
        {string:3, fret:3, interval:'b3'},
        {string:2, fret:3, interval:'5'},
        {string:1, fret:3, interval:'T'}
      ]
    },
    {
      name: 'Position 3',
      baseForC: 8,
      // Minor triad arpeggio - Position 3 corrected from the supplied reference.
      // Removed the A-string b3 below the region and added the two b3 notes on both E strings.
      offsets: [
        {string:6, fret:0, interval:'T'},
        {string:6, fret:3, interval:'b3'},
        {string:5, fret:2, interval:'5'},
        {string:4, fret:2, interval:'T'},
        {string:3, fret:0, interval:'b3'},
        {string:2, fret:0, interval:'5'},
        {string:1, fret:0, interval:'T'},
        {string:1, fret:3, interval:'b3'}
      ]
    },
    {
      name: 'Position 4',
      baseForC: 10,
      // Minor triad arpeggio - Position 4 corrected from the supplied markup.
      // Removed the low G-string b3 and added the D-string b3 at the right edge of the region.
      offsets: [
        {string:6, fret:1, interval:'b3'},
        {string:5, fret:0, interval:'5'},
        {string:4, fret:0, interval:'T'},
        {string:4, fret:3, interval:'b3'},
        {string:3, fret:2, interval:'5'},
        {string:2, fret:3, interval:'T'},
        {string:1, fret:1, interval:'b3'}
      ]
    },
    {
      name: 'Position 5',
      baseForC: 0,
      // Minor triad arpeggio - Position 5 corrected from the supplied markup.
      // Removed the b3 notes on both E strings at the left edge and added the B-string b3 on the right edge.
      offsets: [
        {string:6, fret:3, interval:'5'},
        {string:5, fret:3, interval:'T'},
        {string:4, fret:1, interval:'b3'},
        {string:3, fret:0, interval:'5'},
        {string:2, fret:1, interval:'T'},
        {string:2, fret:4, interval:'b3'},
        {string:1, fret:3, interval:'5'}
      ]
    }
  ],
  'Arpejo tétrade menor 7': [
    {
      name: 'Position 1',
      baseForC: 0,
      // Minor seventh arpeggio - book-style position 1.
      // Formula: T-b3-5-b7. Added on top of the current known-good project base.
      // This is the corrected first position from the user's markup: removed the
      // left-edge A-string b7 and D-string b3; added the right-edge b7/b3/b7 tones.
      offsets: [
        {string:6, fret:3, interval:'5'},
        {string:6, fret:6, interval:'b7'},
        {string:5, fret:3, interval:'T'},
        {string:5, fret:6, interval:'b3'},
        {string:4, fret:5, interval:'5'},
        {string:3, fret:3, interval:'b7'},
        {string:3, fret:5, interval:'T'},
        {string:2, fret:4, interval:'b3'},
        {string:1, fret:3, interval:'5'},
        {string:1, fret:6, interval:'b7'}
      ]
    },
    {
      name: 'Position 2',
      baseForC: 5,
      // Minor seventh arpeggio - book-style position 2.
      // Added from the supplied reference diagram. Formula: T-b3-5-b7.
      offsets: [
        {string:6, fret:1, interval:'b7'},
        {string:6, fret:3, interval:'T'},
        {string:5, fret:1, interval:'b3'},
        {string:4, fret:0, interval:'5'},
        {string:4, fret:3, interval:'b7'},
        {string:3, fret:0, interval:'T'},
        {string:3, fret:3, interval:'b3'},
        {string:2, fret:3, interval:'5'},
        {string:1, fret:1, interval:'b7'},
        {string:1, fret:3, interval:'T'}
      ]
    },
    {
      name: 'Position 3',
      baseForC: 5,
      // Minor seventh arpeggio - book-style position 3.
      // User correction: A-string fifth stays at fret 10; removed the extra right-edge note.
      // Formula: T-b3-5-b7.
      offsets: [
        {string:6, fret:3, interval:'T'},
        {string:6, fret:6, interval:'b3'},
        {string:5, fret:5, interval:'5'},
        {string:4, fret:3, interval:'b7'},
        {string:4, fret:5, interval:'T'},
        {string:3, fret:3, interval:'b3'},
        {string:2, fret:3, interval:'5'},
        {string:2, fret:6, interval:'b7'},
        {string:1, fret:3, interval:'T'},
        {string:1, fret:6, interval:'b3'}
      ]
    }
  ],
  'Arpejo tríade aumentada': [
    {
      name: 'Position 1',
      baseForC: 0,
      // Augmented triad arpeggio from the book-style single movable shape.
      // Formula: T-3-#5. This is symmetrical, so one shape covers the cycle.
      offsets: [
        {string:6, fret:0, interval:'3'},
        {string:6, fret:4, interval:'#5'},
        {string:5, fret:3, interval:'T'},
        {string:4, fret:2, interval:'3'},
        {string:3, fret:1, interval:'#5'},
        {string:2, fret:1, interval:'T'},
        {string:1, fret:0, interval:'3'},
        {string:1, fret:4, interval:'#5'}
      ]
    }
  ],
  'Arpejo tríade diminuta': [
    {
      name: 'Position 1',
      baseForC: 0,
      // Diminished triad arpeggio - Position 1 corrected from user markup.
      // Removed the marked B-string and D-string notes.
      // Reinterpreted the remaining tones so the arpeggio starts on the tonic:
      // previous b5 positions become T, previous T positions become b5,
      // and the marked b3 notes were added on both E strings and the G string.
      offsets: [
        {string:1, fret:2, interval:'T'},
        {string:1, fret:5, interval:'b3'},
        {string:3, fret:2, interval:'b3'},
        {string:3, fret:5, interval:'b5'},
        {string:4, fret:4, interval:'T'},
        {string:5, fret:3, interval:'b5'},
        {string:6, fret:2, interval:'T'},
        {string:6, fret:5, interval:'b3'}
      ]
    },
    {
      name: 'Position 2',
      baseForC: 4,
      // Diminished triad arpeggio from the book diagram, position 2.
      // Same T-b3-b5 material in the next region of the neck.
      offsets: [
        {string:1, fret:4, interval:'T'},
        {string:2, fret:3, interval:'b5'},
        {string:3, fret:1, interval:'T'},
        {string:3, fret:4, interval:'b3'},
        {string:5, fret:2, interval:'b3'},
        {string:5, fret:5, interval:'b5'},
        {string:6, fret:4, interval:'T'}
      ]
    }
  ]
};

function intervalForNote(root, note, formulaIntervals){
  for(const iv of formulaIntervals){
    if(noteFor(root, iv) === note) return iv;
  }
  return '';
}

function generateBookArpeggio(root, structureName, formulaIntervals, minF, maxF, selectedPatternNames){
  const patterns = BOOK_ARPEGGIO_PATTERNS[structureName];
  if(!patterns) return [];
  const rawShift = pc(root) - pc('C');
  const selected = new Set(selectedPatternNames || patterns.map(p => p.name));
  const items = [];

  patterns.forEach(pattern => {
    if(!selected.has(pattern.name)) return;

    const minOffset = Math.min(...pattern.offsets.map(p => p.fret));
    const maxOffset = Math.max(...pattern.offsets.map(p => p.fret));
    const candidates = [];
    for(let octave=-2; octave<=3; octave++){
      const baseFret = pattern.baseForC + rawShift + (12 * octave);
      const low = baseFret + minOffset;
      const high = baseFret + maxOffset;
      const overlapsRegion = high >= minF && low <= maxF;
      const insideInstrument = low >= 0 && high <= 24;
      if(overlapsRegion && insideInstrument) candidates.push(baseFret);
    }
    if(!candidates.length) return;

    const baseFret = candidates.sort((a,b)=>Math.abs(a-minF)-Math.abs(b-minF))[0];
    const positions = pattern.offsets
      .map(p => {
        const fret = baseFret + p.fret;
        const note = noteAt(p.string, fret);
        const explicitInterval = p.interval || p.label;
        return {
          string: p.string,
          fret,
          note,
          label: explicitInterval || intervalForNote(root, note, formulaIntervals)
        };
      })
      .filter(p => p.fret >= 0 && p.fret <= 24 && formulaIntervals.includes(p.label));

    const visible = positions.some(p => p.fret >= minF && p.fret <= maxF);
    if(visible && positions.length >= 6){
      items.push({
        positions,
        baseFret,
        span: Math.max(...positions.map(p => p.fret)) - Math.min(...positions.map(p => p.fret)),
        voicing: pattern.name,
        strings: STRINGS,
        isArpeggioPattern: true
      });
    }
  });

  return items;
}

function hasBookArpeggioPattern(structureName){
  return !!BOOK_ARPEGGIO_PATTERNS[structureName];
}
