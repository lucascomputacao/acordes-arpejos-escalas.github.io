const WEEKS = {
  f1: {
    label: 'Semanas 1–2 · Tríades e inversões',
    sub: 'Fundação harmônica (Dias 1-10)',
    days: [
      {
        n: 'Dia 1',
        b: 'ba',
        bl: 'Acordes',
        t: '45 min',
        warm: 'Cromática nas 4 primeiras cordas + tríade maior C-D-E-F-G em posições vizinhas',
        sess: [
          ['Tríades maiores', 'Construção a partir da escala maior. Fórmula: 1-3-5. Tríade de Dó maior = C-E-G', 'p.14-15'],
          ['Inversões de tríades maiores', 'Fundamental no baixo, 3ª no baixo, 5ª no baixo. Como identificar e tocar', 'p.16-17'],
          ['Introdução às tétrades', 'Adicionando a 7ª aos acordes. Visão das 4 posições básicas', 'p.33-36']
        ],
        exemplos: [
          {
            sessionIndex: 2,
            title: 'Formação 1-7-3-5 (fundamental na 6ª corda)',
            items: [
              { label: '7M', img: './public/images/dia-01/formacao-4-1-7m.png', notes: 'C-E-G-B' },
              { label: 'm7', img: './public/images/dia-01/formacao-4-1-m7.png', notes: 'C-Eb-G-Bb' },
              { label: 'm7(b5)', img: './public/images/dia-01/formacao-4-1-m7b5.png', notes: 'C-Eb-Gb-Bb' },
              { label: '7', img: './public/images/dia-01/formacao-4-1-7.png', notes: 'C-E-G-Bb' },
              { label: '7M(♯5)', img: './public/images/dia-01/formacao-4-1-7d5.png', notes: 'C-E-G#-B' },
              { label: 'm7M', img: './public/images/dia-01/formacao-4-1-m7m.png', notes: 'C-Eb-G-B' },
              { label: '°', img: './public/images/dia-01/formacao-4-1-diminuto.png', notes: 'C-Eb-Gb-Bbb' }
            ]
          }
        ],
        tip: 'Estude as 4 posições do braço para cada tipo de acorde. Toque o arpejo primeiro (notas separadas) e depois o acorde completo (notas juntas).'
      },
      { n: 'Dia 2', b: 'ba', bl: 'Acordes', t: '30 min', warm: 'Sequência I-IV-V em C maior com tríades apenas (C-F-G)', sess: [['Tríades menores', 'Diferença pro maior: 3ª menor (♭3). Fórmula: 1-♭3-5', 'p.19-20'], ['Inversões de tríades menores', 'Mesma lógica das maiores: fundamental, 1ª inversão, 2ª inversão', 'p.20-21'], ['Ditado de tríades', 'Ouça acordes de músicas conhecidas e identifique maior ou menor', 'p.22']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Progressão 2: Em7 → A7 → D7M', img: './public/images/dia-01/page-17-ref.jpg', notes: 'E-G-B-D; A-C#-E-G; D-F#-A-C#' }] }], tip: 'Ouça sons de violão ou piano tocando tríades. Tente identificar de ouvido se é maior ou menor antes de ver a cifra.' },
      { n: 'Dia 3', b: 'ba', bl: 'Acordes', t: '30 min', warm: 'Toque as 3 inversões de C, Dm, Em, F, G, Am em sequência', sess: [['Tríades diminutas e aumentadas', 'Diminuta: 1-♭3-♭5. Aumentada: 1-3-♯5', 'p.23-24'], ['Campo harmônico em tríades', 'Construir as tríades dos 7 graus da escala maior', 'p.25-26'], ['Progressões diatônicas', 'I-vi-IV-V, I-IV-V, ii-V-I em tríades', 'p.27']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Progressão 3: Am7 → D7 → G7M', img: './public/images/dia-01/page-18-ref.jpg', notes: 'A-C-E-G; D-F#-A-C; G-B-D-F#' }] }], tip: 'Decore o padrão do campo harmônico maior: M m m M M m dim. Você vai usar isso pra sempre.' },
      { n: 'Dia 4', b: 'ba', bl: 'Acordes', t: '30 min', warm: 'Campo harmônico de C maior em tríades, todas as inversões, subindo o braço', sess: [['Encadeamentos de inversões', 'Movimentação suave entre acordes usando inversões', 'p.28-29'], ['Prática: progressão em todas as tonalidades', 'I-IV-V em C, G, D, A, E, F, B♭', 'p.30'], ['Análise de música real', 'Pegue uma música simples e identifique as tríades', 'p.31']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Progressão 4: Dm7 → Em7(11) → G7(♯5) → C7M(9)', img: './public/images/dia-01/page-18-ref.jpg', notes: 'D-F-A-C; E-G-B-D-A; G-B-D#-F; C-E-G-B-D' }] }], tip: 'Escolha uma música que você goste e que tenha poucos acordes. Tente tocar só com tríades e inversões.' },
      { n: 'Dia 5', b: 'ba', bl: 'Acordes', t: '30 min', warm: 'Revisão livre: toque tríades em diferentes regiões do braço sem olhar cifras', sess: [['Consolidação das inversões', 'Refazer todos os exemplos das páginas anteriores sem consultar', 'p.14-31'], ['Teste de prontidão', 'Consegue tocar qualquer tríade em qualquer inversão sem pensar?', 'p.31'], ['Preparação para tétrades', 'Compreender que vamos adicionar a 7ª agora', 'p.32']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Progressão 5: Dm7(b5) → G7 → Cm7', img: './public/images/dia-01/page-18-ref.jpg', notes: 'D-F-A-C; G-B-D-F; C-Eb-G-Bb' }] }], tip: 'Se não conseguir tocar de cor, volte atrás. Melhor consolidar pouco do que avançar com lacunas.', quiz: true },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 6', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Tríades + agora adicionar a 7ª maior em cima (CEG → CEGB)', sess: [['Tétrade maior com 7ª maior (Cmaj7)', 'Fórmula: 1-3-5-7. Som característico, estável', 'p.33-34'], ['Inversões de tétrades', 'Fundamental, 1ª, 2ª, 3ª inversão. Baixo define a inversão', 'p.35-36'], ['Digitações comuns', 'Formas fechadas e abertas de maj7', 'p.37']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Formação 1-7-3-5 (7M)', img: './public/images/dia-06/formacao-4-1-7m.png', notes: 'C-E-G-B' }, { label: 'Formação 1-5-7-3 (7M)', img: './public/images/dia-06/formacao-4-2-7m.png', notes: 'C-E-G-B' }] }, { sessionIndex: 1, items: [{ label: 'Inversões Tipo 7M', img: './public/images/dia-06/inversao-forma-1-7m.png', notes: 'C-E-G-B' }] }], tip: 'A 7ª maior "flutua". Você vai ouvir isso em bossa nova o tempo todo.' },
      { n: 'Dia 7', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Sequência Cmaj7-Dm7-G7-Cmaj7 em loop, explorando inversões', sess: [['Acorde dominante (G7)', 'Fórmula: 1-3-5-♭7. Função: tenso, quer resolver', 'p.38-39'], ['Acorde menor com 7ª menor (Dm7)', 'Fórmula: 1-♭3-5-♭7. Som suave, contexto de ii-V-I', 'p.40-41'], ['Acorde meio-diminuto (Bm7♭5)', 'Fórmula: 1-♭3-♭5-♭7. Aparece no 7º grau do campo harmônico maior', 'p.42']], exemplos: [{ sessionIndex: 1, items: [{ label: 'Formação 1-7-3-5 (m7)', img: './public/images/dia-07/formacao-4-1-m7.png', notes: 'D-F-A-C' }, { label: 'Formação 1-5-7-3 (m7)', img: './public/images/dia-07/formacao-4-2-m7.png', notes: 'D-F-A-C' }] }, { sessionIndex: 0, items: [{ label: 'Formação 1-7-3-5 (7)', img: './public/images/dia-07/formacao-4-1-7.png', notes: 'G-B-D-F' }, { label: 'Formação 1-5-7-3 (7)', img: './public/images/dia-07/formacao-4-2-7.png', notes: 'G-B-D-F' }] }], tip: 'Decore: Imaj7 - iim7 - iiim7 - IVmaj7 - V7 - vim7 - viim7♭5. É o campo harmônico que rege o jazz e a MPB.' },
      { n: 'Dia 8', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Todas as tétrades do campo harmônico de C maior, 3 inversões cada', sess: [['Cifragem moderna', 'Entender C7, Cmaj7, Cm7, CmM7, C7M, Cdim7, C°, C+', 'p.43-44'], ['Símbolos e abreviações', 'Diferença entre C7 e Cmaj7. Atenção aos símbolos: Δ, -, °, ø', 'p.45'], ['Exercício de leitura', 'Ler progressões cifradas e identificar a qualidade de cada acorde', 'p.46']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Formação 1-3-5-7 (7M)', img: './public/images/dia-08/formacao-4-3-7m.png', notes: 'C-E-G-B' }, { label: 'Formação 1-3-5-7 (m7)', img: './public/images/dia-08/formacao-4-3-m7.png', notes: 'C-Eb-G-Bb' }, { label: 'Formação 1-3-5-7 (7)', img: './public/images/dia-08/formacao-4-3-7.png', notes: 'C-E-G-Bb' }] }, { sessionIndex: 1, items: [{ label: 'Formação 1-5-7-3 (7M)', img: './public/images/dia-08/formacao-4-4-7m.png', notes: 'C-E-G-B' }, { label: 'Formação 1-5-7-3 (m7)', img: './public/images/dia-08/formacao-4-4-m7.png', notes: 'C-Eb-G-Bb' }, { label: 'Formação 1-5-7-3 (7)', img: './public/images/dia-08/formacao-4-4-7.png', notes: 'C-E-G-Bb' }] }], tip: 'Confundir C7 com Cmaj7 é o erro clássico. Um tem ♭7, o outro tem 7 natural. Grave isso.' },
      { n: 'Dia 9', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Ditado harmônico: ouça uma progressão e escreva a cifra', sess: [['Progressões com tétrades', 'ii-V-I em várias tonalidades', 'p.47-48'], ['Substituições básicas', 'Trocar Imaj7 por iii-7, ou vi-7 por I6', 'p.49'], ['Repertório real', 'Analisar standards de jazz: Autumn Leaves, Blue Bossa', 'p.50']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Inversões 7M - Forma 1', img: './public/images/dia-09/inversao-5-1-forma1-inv1.png', notes: 'C-E-G-B' }, { label: 'Inversões 7M - Forma 2', img: './public/images/dia-09/inversao-5-1-forma2-inv1.png', notes: 'C-E-G-B' }, { label: 'Inversões 7M - Forma 3', img: './public/images/dia-09/inversao-5-1-forma3-inv1.png', notes: 'C-E-G-B' }, { label: 'Inversões 7M - Forma 4', img: './public/images/dia-09/inversao-5-1-forma4-inv1.png', notes: 'C-E-G-B' }] }], tip: 'Toque os standards devagar, pensando na função harmônica de cada acorde.' },
      { n: 'Dia 10', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Revisão: campo harmônico de 3 tonalidades com tétrades', sess: [['Consolidação geral', 'Refazer exercícios sem consultar. Testar prontidão', 'p.33-50'], ['Teste de reconhecimento', 'Ouvir e identificar tétrades sem ver', 'p.51'], ['Transição para arpejos', 'Entender que vamos começar a tocar as notas separadas agora', 'p.52']], exemplos: [{ sessionIndex: 0, items: [{ label: 'Review: Inversões 7M (Forma 1)', img: './public/images/dia-10/revisao-inversoes-7m.png', notes: 'C-E-G-B' }, { label: 'Review: Inversões 7M (Forma 2)', img: './public/images/dia-09/inversao-5-1-forma2-inv2.png', notes: 'C-E-G-B' }, { label: 'Review: Inversões 7M (Forma 3)', img: './public/images/dia-09/inversao-5-1-forma3-inv3.png', notes: 'C-E-G-B' }, { label: 'Review: Inversões 7M (Forma 4)', img: './public/images/dia-09/inversao-5-1-forma4-inv4.png', notes: 'C-E-G-B' }] }], tip: 'Se você dominou até aqui, o restante do livro vai fluir. Se não, volte.', quiz: true }
    ]
  },
  f1b: {
    label: 'Semanas 3–4 · Tétrades e cifragem',
    sub: 'Acordes com sétima (Dias 11-20)',
    days: [
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 11', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Revisão: tríades vs tétrades em diferentes tonalidades', sess: [['Síntese: tríades maiores e menores', 'Rever inversões e posições no braço', 'p.14-31'], ['Comparação: tríades vs tétrades', 'Qual é a diferença sonora entre C maior e Cmaj7?', 'p.32-34'], ['Exercício de transição', 'Tocar progressões simples com ambas as estruturas', 'p.35']], tip: 'Agora você entende a fundação. Tétrades adicionam cor e sofisticação.' },
      { n: 'Dia 12', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Sequência Cmaj7-Dm7-G7 em loop, 3 inversões cada', sess: [['Aplicação: ii-V-I em tétrades', 'A progressão mais importante do jazz', 'p.38-42'], ['Movimentação suave', 'Usar inversões para conectar acordes fluidamente', 'p.43-45'], ['Repertório: primeiros standards', 'Autumn Leaves tem ii-V-I em várias tonalidades', 'p.46-50']], tip: 'ii-V-I é o DNA do jazz. Você vai reconhecer em praticamente todo standard.' },
      { n: 'Dia 13', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Campo harmônico completo de 3 tonalidades em tétrades', sess: [['Campo harmônico: C, F, G maiores', 'I IV V e outros graus em tétrades', 'p.43-48'], ['Cifragem em contexto real', 'Como aparecem em lead sheets e partituras', 'p.49-52'], ['Ditado harmônico básico', 'Ouça e identifique a qualidade dos acordes', 'p.53']], tip: 'Cada grau do campo harmônico tem uma função. Estude isso!' },
      { n: 'Dia 14', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Transposição: ii-V-I em C, G, D, F', sess: [['Transposição para várias tonalidades', 'Entender padrões, não só tocar mecanicamente', 'p.41-45'], ['Análise de voicing', 'Como os acordes se conectam no braço', 'p.46-48'], ['Aplicação musical', 'Usar em contexto de improvisação', 'p.49']], tip: 'Transpor é a melhor forma de internalizar padrões. Faça em todas as 12 tonalidades!' },
      { n: 'Dia 15', b: 'ba', bl: 'Acordes', t: '35 min', warm: 'Revisão: Todas as tétrades em posições fechadas e abertas', sess: [['Consolidação geral de tétrades', 'Refazer exercícios das Semanas 3-4 sem consultar', 'p.33-52'], ['Teste de reconhecimento auditivo', 'Identificar qualidades de acordes (maj7, m7, 7, m7♭5)', 'p.53-54'], ['Teste de digitação', 'Tocar rapidamente qualquer tétrade em qualquer tonalidade', 'p.55']], tip: 'Se você conseguir tocar fluidamente aqui, arpejos vão ser muito mais fáceis.', quiz: true },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 16', b: 'ba', bl: 'Acordes', t: '40 min', warm: 'Todas as tétrades do campo harmônico em 3 inversões', sess: [['Fluência total em tétrades', 'Acordes são a base. Domine-os!', 'p.38-55'], ['Conexões musicais', 'Encadear acordes com elegância', 'p.56-58'], ['Performance de progressões', 'Tocar 3 progressões diferentes com qualidade', 'p.59']], tip: 'Parabéns! Você domina acordes. Agora vamos brincar com eles de formas diferentes.' },
      { n: 'Dia 17', b: 'be', bl: 'Arpejos - Introdução', t: '40 min', warm: 'Arpejo de Cmaj7 em todas as cordas, subindo e descendo', sess: [['Conceito de arpejo', 'Tocar as notas do acorde separadas, em sequência', 'p.53-54'], ['Digitações de arpejos maiores', 'Padrões em 3 oitavas, várias regiões do braço', 'p.55-56'], ['Arpejo sobre backing track', 'Praticar sobre base de Cmaj7 estático', 'p.57']], tip: 'Arpejo é o vocabulário mais direto pra improviso. Cada nota "pertence" ao acorde.' },
      { n: 'Dia 18', b: 'be', bl: 'Arpejos', t: '40 min', warm: 'Arpejos de Dm7, G7, Cmaj7 em sequência (ii-V-I)', sess: [['Arpejos menores e dominantes', 'Adaptar as digitações para m7 e 7', 'p.58-59'], ['Superposição de arpejos', 'Tocar arpejo de Em sobre Cmaj7 (som de 9ª e 13ª)', 'p.60-61'], ['Prática sobre progressão', 'ii-V-I em 3 tonalidades', 'p.62']], tip: 'Superposição é mágica: você cria tensões sem sair do acorde. Use isso!' },
      { n: 'Dia 19', b: 'be', bl: 'Arpejos', t: '40 min', warm: 'Arpejos de m7♭5, 7 alt, maj7 em diferentes posições', sess: [['Arpejos diminutos e alterados', 'Aplicações em progressões jazz', 'p.60-65'], ['Fluência entre posições', 'Transitar suavemente no braço', 'p.66-68'], ['Composição de frases', 'Criar melódias com arpejos', 'p.69']], tip: 'Arpejos são blocos de construção. Combine-os para criar frases!' },
      { n: 'Dia 20', b: 'be', bl: 'Arpejos', t: '40 min', warm: 'Improviso livre sobre Cmaj7 usando apenas arpejos', sess: [['Musicalidade com arpejos', 'Não é só exercício, é instrumento musical', 'p.70-71'], ['Padrões melódicos', 'Sequências que soam bem', 'p.72-73'], ['Aplicação em standards', 'Tocar ii-V-I de standards com arpejos', 'p.74']], tip: 'Ouça como os grandes tocam arpejos. Não é mecânico, é musical.' }
    ]
  },
  f2: {
    label: 'Semanas 5–8 · Arpejos, escalas e modos (Dias 21-40)',
    sub: 'Improvisação melódica completa',
    days: [
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 21', b: 'bp', bl: 'Escalas', t: '40 min', warm: 'Escala de C maior em 5 posições, padrão CAGED', sess: [['Escala maior — revisão', 'Fórmula: T-T-sT-T-T-T-sT. Construção intervalar', 'p.63-64'], ['Digitações completas', '7 posições cobrindo o braço inteiro', 'p.65-66'], ['Estudo melódico', 'Criar linhas usando só a escala maior', 'p.67']], tip: 'Decore as 5 (ou 7) posições. Você precisa conhecer o braço como a palma da mão.' },
      { n: 'Dia 22', b: 'bp', bl: 'Escalas', t: '40 min', warm: 'Sequência 1-2-3, 2-3-4, 3-4-5... na escala maior', sess: [['Escala menor natural', 'Fórmula: T-sT-T-T-sT-T-T. Relativa menor', 'p.68-69'], ['Escala menor harmônica', '♯7 na menor natural. Som "exótico"', 'p.70-71'], ['Escala menor melódica', '♯6 e ♯7 na menor natural. "Maior com ♭3"', 'p.72']], tip: 'Menor melódica é a escala do jazz menor. Você vai viver nela quando tocar m(maj7).' },
      { n: 'Dia 23', b: 'bp', bl: 'Escalas', t: '40 min', warm: 'Tocar C maior, C menor natural, C menor harmônica, C menor melódica em sequência', sess: [['Aplicação harmônica das escalas', 'Qual escala usar sobre cada acorde', 'p.73-74'], ['Prática sobre backing', 'Improvisar com as 4 escalas em contextos diferentes', 'p.75'], ['Análise de solos', 'Ver como músicos famosos usam essas escalas', 'p.76']], tip: 'Escala não é exercício, é matéria-prima. Ouça solos e identifique as escalas.' },
      { n: 'Dia 24', b: 'bp', bl: 'Escalas', t: '40 min', warm: 'Improviso livre combinando escalas menores (natural, harmônica, melódica)', sess: [['Diferenças sonoras entre as 3 menores', 'Ouça e sinta as diferenças', 'p.77-78'], ['Aplicação em blues e jazz', 'Quando usar cada uma', 'p.79-80'], ['Transposição de escalas', 'Menor harmônica e melódica em várias tonalidades', 'p.81']], tip: 'As 3 menores têm personalidades diferentes. Aprenda todas!' },
      { n: 'Dia 25', b: 'bp', bl: 'Escalas + Arpejos', t: '40 min', warm: 'Revisão: todas as 4 escalas (maior, natural, harmônica, melódica) em 3 tonalidades', sess: [['Consolidação de escalas', 'Refazer exercícios das Semanas 5-6', 'p.63-81'], ['Teste auditivo completo', 'Identificar escala por som', 'p.82-83'], ['Combo escala + arpejo', 'Usar ambas em uma progressão', 'p.84']], tip: 'Escalas são a respiração da improvisação. Conhecê-las é essencial!', quiz: true },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 26', b: 'bm', bl: 'Modos', t: '45 min', warm: 'Escala de C maior começando em cada grau (C D E F G A B)', sess: [['Conceito de modos', 'Mesmo conjunto de notas, tônicas diferentes', 'p.79-80'], ['Jônico e dórico', 'Jônico = escala maior. Dórico = menor com 6ª maior', 'p.81-82'], ['Som característico de cada modo', 'Ouvir e sentir a "personalidade" do dórico', 'p.83']], tip: 'Modo não é só padrão de dedos. É um universo sonoro. Ouça muito!' },
      { n: 'Dia 27', b: 'bm', bl: 'Modos', t: '45 min', warm: 'Tocar D dórico (notas de C maior começando em D)', sess: [['Frígio e lídio', 'Frígio: menor com ♭2. Lídio: maior com ♯4', 'p.84-85'], ['Aplicação em acordes', 'Dórico sobre m7, frígio sobre m7 também (depende do contexto)', 'p.86-87'], ['Improvisar modalmente', 'Praticar sobre um acorde estático de Dm7 com dórico', 'p.88']], tip: 'Lídio sobre maj7 é lindo. Ouça músicas de Chick Corea, Herbie Hancock.' },
      { n: 'Dia 28', b: 'bm', bl: 'Modos', t: '45 min', warm: 'Todos os 7 modos da escala maior em C (começando em C, D, E, F, G, A, B)', sess: [['Mixolídio e eólio', 'Mixolídio: maior com ♭7 (escala do dominante). Eólio: menor natural', 'p.89-90'], ['Lócrio', 'Meio-diminuto. Raramente usado como tônico', 'p.91'], ['Quadro geral dos 7 modos', 'Jônico, dórico, frígio, lídio, mixolídio, eólio, lócrio', 'p.92']], tip: 'Decore a ordem e as características. Isso é linguagem universal do jazz.' },
      { n: 'Dia 29', b: 'bm', bl: 'Modos', t: '45 min', warm: 'Escolha 3 modos e improvise 2 minutos em cada', sess: [['Modos da menor harmônica', '7 modos, ênfase no 5º (frígio dominante)', 'p.93-94'], ['Modos da menor melódica', 'Lídio ♭7, lócrio ♯2, alterada, lídia aumentada...', 'p.95-96'], ['Uso em progressões', 'Quando usar cada modo', 'p.97']], tip: 'Modos da menor melódica são avançados. Não force, deixe maturar.' },
      { n: 'Dia 30', b: 'bm', bl: 'Modos', t: '45 min', warm: 'Tocar escala alterada (7º modo da menor melódica)', sess: [['Consolidação modal', 'Refazer todos os exercícios modais', 'p.79-97'], ['Teste de identificação', 'Ouvir e nomear o modo', 'p.98'], ['Análise de solos modais', 'Miles Davis, John Coltrane — Kind of Blue, Impressions', 'p.99']], tip: 'Ouça Kind of Blue umas 50 vezes. Sério.', quiz: true },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 31', b: 'bm', bl: 'Integração 1-8', t: '45 min', warm: 'Improviso modal: escolha um acorde estático e explore 5 minutos', sess: [['Musicalidade modal', 'Modos não são escalas a correr, são universos sonoros', 'p.100-101'], ['Padrões modais', 'Sequências que funcionam em cada modo', 'p.102-103'], ['Aplicação em standards', 'Identificar onde modos aparecem em músicas reais', 'p.104']], tip: 'Modos vão abrir sua mente. Ouça, toque, sinta.' },
      { n: 'Dia 32', b: 'bm', bl: 'Integração 1-8', t: '45 min', warm: 'Análise: transcender escrita a partir de uma faixa de jazz modal', sess: [['Escuta ativa', 'Como identificar o modo em uma progressão', 'p.105-106'], ['Transcription prática', 'Retire frases de um solo modal', 'p.107-108'], ['Aplicação criativa', 'Use modos em uma composição simples', 'p.109']], tip: 'A melhor forma de aprender modos é ouvindo e tocando em contexto real.' },
      { n: 'Dia 33', b: 'bm', bl: 'Integração 1-8', t: '45 min', warm: 'Revisão: todos os 7 modos em 2 tonalidades diferentes (não só C)', sess: [['Portabilidade de modos', 'Modos não são presos a uma tonalidade', 'p.110-111'], ['Modos em outro contexto', 'Dórico em D, Frígio em E, etc.', 'p.112-113'], ['Fluência total', 'Tocar qualquer modo em qualquer tonalidade', 'p.114']], tip: 'Dominar modos em uma tonalidade não é suficiente. Transponha!' },
      { n: 'Dia 34', b: 'bm', bl: 'Integração 1-8', t: '45 min', warm: 'Integração: acordes + arpejos + escalas + modos em ii-V-I', sess: [['Síntese de 8 semanas', 'Tudo que você aprendeu junto', 'p.115-116'], ['Improvisação integrada', 'Ii-V-I usando todos os conceitos', 'p.117-118'], ['Análise reflexiva', 'Como tudo se conecta?', 'p.119']], tip: 'Você acabou de aprender a linguagem completa do jazz. Parabéns!' },
      { n: 'Dia 35', b: 'bm', bl: 'Integração 1-8', t: '45 min', warm: 'Comping e fraseado: toque acompanhamento e solo ao mesmo time', sess: [['Comping básico', 'Acordes no ritmo apropriado', 'p.120-121'], ['Fraseado sobre comp', 'Improvisar enquanto toca harmonicamente', 'p.122-123'], ['Aplicação em trio', 'Como funciona em uma banda real', 'p.124']], tip: 'Agora você pode tocar música de verdade, não apenas exercícios!' },
      { n: 'Dia 36', b: 'bm', bl: 'Integração 1-8', t: '45 min', warm: 'Repertório: escolha 3 standards diferentes e toque tudo que aprendeu', sess: [['Blues em 12 compassos', 'Aplicar conceitos em blues', 'p.125-126'], ['Standards simples', 'Autumn Leaves, All The Things You Are', 'p.127-128'], ['Seu próprio arranjo', 'Crie uma versão única de uma música', 'p.129']], tip: 'A música real é o melhor professor. Toque standards!', quiz: true },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 37', b: 'bm', bl: 'Performance', t: '50 min', warm: 'Padrões rítmicos simples em uma oitava, tempo lento', sess: [['Fraseado musical', 'Estrutura: anacrusa, chegada, resolução', 'p.130-131'], ['Anacrusas práticas', 'Preparar uma nota importante', 'p.132-133'], ['Exercícios de frases', 'Frases de 4 tempos (pergunta-resposta)', 'p.134']], tip: 'Fraseado transforma exercícios em música. Agora começa a diversão!' },
      { n: 'Dia 38', b: 'bm', bl: 'Performance', t: '50 min', warm: 'Estrutura antecedente-consequente em progressões simples', sess: [['Pergunta e resposta', 'Frase que "pergunta" e frase que "responde"', 'p.135-136'], ['Landing notes musicais', 'Onde terminar para máximo impacto', 'p.137-138'], ['Aplicação em ii-V-I', 'Frases sobre progressões', 'p.139']], tip: 'Uma boa frase tem suspense e resolução, como uma história.' },
      { n: 'Dia 39', b: 'bm', bl: 'Performance', t: '50 min', warm: 'Duração de notas e articulação: legato vs staccato', sess: [['Expressividade através da duração', 'Notas longas = peso, notas curtas = movimento', 'p.140-141'], ['Breathing space', 'Pausas são tão musicais quanto notas', 'p.142-143'], ['Combinações criativas', 'Use duração e articulação juntas', 'p.144']], tip: 'Articulação é a diferença entre um robô e um músico.' },
      { n: 'Dia 40', b: 'bm', bl: 'Performance', t: '50 min', warm: 'Motivos e desenvolvimento: criar, repetir, variar', sess: [['Motivo', 'Uma ideia pequena e clara', 'p.145-146'], ['Repetição', 'Marque a ideia na mente do ouvinte', 'p.147-148'], ['Variação', 'Torne a ideia fresca', 'p.149']], tip: 'Grandes solos se constroem sobre alguns motivos bem desenvolvidos.' }
    ]
  },
  f3: {
    label: 'Semanas 9–14 · Maestria (Dias 41-70)',
    sub: 'Performance e expressão avançada',
    days: [
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 41', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Registro e dinâmica: grave, médio, agudo + forte, piano', sess: [['Exploração do braço', 'Uso de diferentes oitavas', 'p.150-151'], ['Dinâmica', 'Volume e sustain para expressão', 'p.152-153'], ['Arquitetura sonora', 'Criar contrastes significativos', 'p.154']], tip: 'Um solo nunca deve ficar em um registro ou dinâmica. Explore!' },
      { n: 'Dia 42', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Revisão de fraseado: estrutura, landing notes, breathing space, articulação', sess: [['Consolidação de fraseado', 'Refazer exercícios das Semanas 9-10', 'p.130-154'], ['Improvisação de 2 min', 'Aplicar todos os conceitos de fraseado', 'p.155-156'], ['Análise de solo modelado', 'Estude um mestre do fraseado', 'p.157']], tip: 'Bom fraseado é a marca de um improvisador maduro.' },
      { n: 'Dia 43', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Ii-V-I com acordes, arpejos, escalas e bom fraseado', sess: [['Síntese completa', 'Tudo em uma progressão', 'p.158-159'], ['Fluência', 'Mudança suave entre conceitos', 'p.160-161'], ['Musicalidade total', 'Não é exercício, é música', 'p.162']], tip: 'Parabéns! Você sabe improvisar de verdade agora.' },
      { n: 'Dia 44', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Blues em 12: toque comping e solo em um blues autêntico', sess: [['Estrutura do blues', '12 compassos, progressão fixa', 'p.163-164'], ['Comping autêntico', 'Como acompanhar um blues', 'p.165-166'], ['Solo sobre blues', 'Aplicar tudo que aprendeu', 'p.167']], tip: 'Blues é a raiz do jazz. Domine-o!' },
      { n: 'Dia 45', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Standards: escolha 2 músicas diferentes e toque completo (comping + solo)', sess: [['Análise de standard', 'Estrutura, progressões, pontos-chave', 'p.168-169'], ['Seu arranjo', 'Crie uma interpretação única', 'p.170-171'], ['Performance', 'Toque com musicality e confiança', 'p.172']], tip: 'A medida final é: você consegue tocar música que soa bem?' },
      { n: 'Dia 46', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Composição: crie uma progressão de 12-16 compassos e toque solo sobre ela', sess: [['Harmonia criativa', 'Progressões que você gosta de ouvir', 'p.173-174'], ['Melodia principal', 'Tema que marca', 'p.175-176'], ['Solo improvisado', 'Improvisar sobre sua própria progressão', 'p.177']], tip: 'Compor é o ultimate test de compreensão teórica.' },
      { n: 'Dia 47', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Repertório expandido: toque 4-5 standards com qualidade de performance', sess: [['Fluência em múltiplas músicas', 'Repertório profissional', 'p.178-179'], ['Variações e reinterpretação', 'Não toque da mesma forma sempre', 'p.180-181'], ['Escolha artística', 'Desenvolva seu próprio estilo', 'p.182']], tip: 'Músicos profissionais têm repertório sólido. Construa o seu!' },
      { n: 'Dia 48', b: 'br', bl: 'Maestria', t: '50 min', warm: 'Análise reflexiva: como você evoluiu de Dia 1 até Dia 48 (Semanas 1-14)?', sess: [['Reflexão sobre evolução', 'Você já conseguia tocar isso no Dia 1?', 'p.183-184'], ['Áreas de força', 'O que você faz bem?', 'p.185-186'], ['Áreas de desenvolvimento', 'Continuar trabalhando em quê?', 'p.187']], tip: 'Celebre o progresso. Você aprendeu muito!', quiz: true },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 49', b: 'br', bl: 'Performance Final', t: '60 min', warm: 'Preparação de recital: escolha seus 5 melhores standards', sess: [['Seleção do repertório', 'Músicas que você domina bem', 'p.188-189'], ['Ensaios profissionais', 'Preparação séria para performance', 'p.190-191'], ['Confiança musical', 'Tocar sem olhar para as mãos', 'p.192']], tip: 'Uma boa performance é o resultado de prática estruturada.' },
      { n: 'Dia 50', b: 'br', bl: 'Performance Final', t: '60 min', warm: 'Recital simulado: toque seus 5 standards como se fosse um show real', sess: [['Simulação de palco', 'Audição em frente a alguém ou câmera', 'p.193-194'], ['Feedback construtivo', 'Como você soou? Onde melhorar?', 'p.195-196'], ['Ajustes finais', 'Corrigir e refinar', 'p.197']], tip: 'Tocar para alguém (mesmo virtualmente) é transformador!' },
      { n: 'Dia 51', b: 'br', bl: 'Maestria Avançada', t: '60 min', warm: 'Transcrição de solo: escolha um solo de grande músico e retire de ouvido', sess: [['Escuta profunda', 'Ouvir como um músico, não como fã', 'p.198-199'], ['Transcription prática', 'Nota por nota, acordes, fraseado', 'p.200-201'], ['Análise de técnica', 'Por que essa pessoa é grande?', 'p.202']], tip: 'Transcrição é como aprender com um mestre privado.' },
      { n: 'Dia 52', b: 'br', bl: 'Maestria Avançada', t: '60 min', warm: 'Composição final: peça original de 16-32 compassos (forma clara)', sess: [['Harmonia pessoal', 'Progressões que expressam você', 'p.203-204'], ['Melodia memorável', 'Tema que fica na cabeça', 'p.205-206'], ['Arranjo e gravação', 'Gravar sua composição', 'p.207']], tip: 'Composição é a expressão máxima da compreensão musical.' },
      { n: 'Dia 53', b: 'br', bl: 'Maestria Avançada', t: '60 min', warm: 'Análise comparativa: você vs. mestre (mesma música, diferentes interpretações)', sess: [['Escuta crítica', 'Compare sua versão com uma gravação profissional', 'p.208-209'], ['Diferenças técnicas', 'Onde o mestre te supera?', 'p.210-211'], ['Objetivos de longo prazo', 'Como continuar evoluindo?', 'p.212']], tip: 'Essa comparação mostra o caminho para a próxima etapa de evolução.' },
      { n: 'Dia 54', b: 'br', bl: 'Conclusão Fase 1', t: '60 min', warm: 'Revisão final: toque os 5 melhores standards de forma livre e criativa', sess: [['Performance confiante', 'Você domina essas músicas', 'p.213-214'], ['Interpretação pessoal', 'Sua voz musical emerge', 'p.215-216'], ['Celebração', 'Você completou 54 dias!', 'p.217']], tip: 'Este não é o final. É o começo de uma jornada lifelong na música!' },
      { n: 'Dia 55', b: 'br', bl: 'Próximos Passos Fase 2', t: '60 min', warm: 'Planejamento futuro: qual é o próximo nível de estudo?', sess: [['Opções para evolução', 'Harmonia funcional avançada, improvisação em contextos diferentes, composição, produção', 'p.218-219'], ['Seu plano pessoal', 'O que te interessa para os próximos anos?', 'p.220-221'], ['Comunidade', 'Busque músicos para tocar junto!', 'p.222']], tip: 'Música é feita para ser compartilhada. Encontre seus parceiros!' },
      { n: 'Dia 56', b: 'br', bl: 'Conclusão Fase 2', t: '60 min', warm: 'Gratidão e reflexão: você aprendeu acordes, arpejos, escalas, modos e fraseado', sess: [['Jornada pessoal', 'Como começou, onde chegou', 'p.223-224'], ['Pratos cheios', 'Todos esses conceitos na sua cabeça e mãos', 'p.225-226'], ['O começo real', 'Agora a música é sua. Faça o que quiser!', 'p.227']], tip: 'Parabéns. Você não é mais iniciante. É um músico!' },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true }
    ]
  },
  f4: {
    label: 'Semanas 15–20 · Fraseado e integração final (Dias 71-100)',
    sub: 'Consolidação de maestria musical completa',
    days: [
      { n: 'Dia 57', b: 'bp', bl: 'Fraseado', t: '50 min', warm: 'Anacrusas em diferentes contextos harmônicos', sess: [['Pickup notes', 'Preparar resoluções de forma elegante', 'p.228-229'], ['Antecipação harmônica', 'Chegar antes do tempo forte', 'p.230-231'], ['Musicality pura', 'Frases que soam naturais', 'p.232']], tip: 'Anacrusas bem feitas são invisíveis, mas fazem toda a diferença.' },
      { n: 'Dia 58', b: 'bp', bl: 'Fraseado', t: '50 min', warm: 'Landing notes em estruturas de 8 e 16 compassos', sess: [['Resolução de tensão', 'Quando chegar, onde chegar', 'p.233-234'], ['Simetria musical', 'Estrutura narrativa clara', 'p.235-236'], ['Impacto emocional', 'Notas que importam', 'p.237']], tip: 'Uma boa landing note é a diferença entre "legal" e "inesquecível".' },
      { n: 'Dia 59', b: 'bp', bl: 'Fraseado', t: '50 min', warm: 'Breathing space em solos contínuos', sess: [['Pausas estratégicas', 'Silêncios que falam', 'p.238-239'], ['Ritmo respiratório', 'Música é como respirar', 'p.240-241'], ['Tensão e relaxamento', 'Arco dramático em música', 'p.242']], tip: 'Silêncio é um instrumento também. Use-o com intencionalidade.' },
      { n: 'Dia 60', b: 'bp', bl: 'Fraseado', t: '50 min', warm: 'Articulação extrema: comparar mesma frase com diferentes articulações', sess: [['Legato total', 'Notas conectadas sem separação', 'p.243-244'], ['Staccato total', 'Cada nota é uma pulsação', 'p.245-246'], ['Combinações', 'Criar textura através da articulação', 'p.247']], tip: 'Articulação é um dos maiores segredos dos grandes músicos.' },
      { n: 'Dia 61', b: 'bp', bl: 'Integração Final', t: '50 min', warm: 'Motivos: criar, repetir, variar em 2-3 variações', sess: [['Desenvolvimento motívico', 'A técnica de toda música clássica e jazz', 'p.248-249'], ['Padrões reconhecíveis', 'Marca pessoal em cada solo', 'p.250-251'], ['Criatividade constrolada', 'Estrutura com liberdade', 'p.252']], tip: 'Um bom motivo é melhor que 100 frases aleatórias.' },
      { n: 'Dia 62', b: 'bp', bl: 'Integração Final', t: '50 min', warm: 'Dinâmica em blues: quiet beginning até climax explosive', sess: [['Arco narrativo completo', 'Início, desenvolvimento, clímax, resolução', 'p.253-254'], ['Contraste de registros', 'Grave para agudo e vice-versa', 'p.255-256'], ['Emoção através de som', 'Dinâmica é expressão', 'p.257']], tip: 'Grandes solos têm estrutura dramatúrgica. Aprenda a contar histórias.' },
      { n: 'Dia 63', b: 'bp', bl: 'Integração Final', t: '50 min', warm: 'Comping avançado: enquanto improvisa outro instrumento', sess: [['Conversa entre instrumentos', 'Choro e resposta em tempo real', 'p.258-259'], ['Timing e espaço', 'Deixar espaço para o outro brilhar', 'p.260-261'], ['Grupo como unidade', 'Banda, não solista e acompanhantes', 'p.262']], tip: 'A melhor improvisação é sempre um diálogo.' },
      { n: 'Dia 64', b: 'bp', bl: 'Integração Final', t: '50 min', warm: 'Revisão de todas as técnicas: fraseado, dinâmica, registro, motivos', sess: [['Consolidação de maestria', '8 semanas de fraseado integradas', 'p.263-264'], ['Performance pronta', 'Soar como profissional', 'p.265-266'], ['Seu estilo emerge', 'Não é mais imitação, é você', 'p.267']], tip: 'Você tem agora tudo que precisa. O resto é prática consistente e amor pela música.', quiz: true },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 65', b: 'br', bl: 'Consolidação 15-20', t: '60 min', warm: '5 standards: cada um toca e você acompanha, depois o inverso', sess: [['Repertório em performance', '5 músicas que você domina profundamente', 'p.268-269'], ['Liderança e suporte', 'Alternar papéis em uma banda', 'p.270-271'], ['Confiança total', 'Tocar para alguém com qualidade', 'p.272']], tip: 'Performance ao vivo é o teste final. Não existe "quase pronto".' },
      { n: 'Dia 66', b: 'br', bl: 'Consolidação 15-20', t: '60 min', warm: 'Composição e gravação: sua peça original', sess: [['Realização criativa', 'Do pensamento ao som gravado', 'p.273-274'], ['Qualidade de produção', 'Som limpo e profissional', 'p.275-276'], ['Arquivo permanente', 'Seu legado musical', 'p.277']], tip: 'Deixar um registro de sua música é importante. Grave seus solos!' },
      { n: 'Dia 67', b: 'br', bl: 'Consolidação 15-20', t: '60 min', warm: 'Análise de grande solista: estude uma gravação inteira de um master', sess: [['Escuta profunda', '50+ minutos de atenção total', 'p.278-279'], ['Decomposição técnica', 'Como ele faz X, Y, Z?', 'p.280-281'], ['Inspiração profunda', 'Deixar que a música o transforme', 'p.282']], tip: 'Os melhores músicos nunca param de estudar. Nem você deveria.' },
      { n: 'Dia 68', b: 'br', bl: 'Consolidação 15-20', t: '60 min', warm: 'Transcrição completa: solo de 2-3 minutos de um mestre', sess: [['Detalhes totais', 'Cada nota, cada articulação, cada dinâmica', 'p.283-284'], ['Internalização profunda', 'Aprender como alguém pensa ao tocar', 'p.285-286'], ['Aplicação pessoal', 'Tomar as ideias e fazer suas', 'p.287']], tip: 'Transcrição é como copiar um mestre pintor. Você aprende a técnica nos dedos.' },
      { n: 'Dia 69', b: 'br', bl: 'Consolidação 15-20', t: '60 min', warm: 'Rearmonização: pegue 3 standards e reimagine harmonias', sess: [['Visão criativa', 'O mesmo tema, infinitas formas', 'p.288-289'], ['Inovação conservadora', 'Surpreender mantendo a essência', 'p.290-291'], ['Composição através de rearranjo', 'Uma forma de criar', 'p.292']], tip: 'Grandes músicos rearmonizam constantemente. Você também pode.' },
      { n: 'Dia 70', b: 'br', bl: 'Consolidação 15-20', t: '60 min', warm: 'Retrospectiva completa: 70 dias em revisão', sess: [['Reflexão profunda', 'De iniciante a músico em 70 dias', 'p.293-294'], ['Identificar evolução', 'Quem você era vs. quem você é', 'p.295-296'], ['Plano para próximos 70 dias', 'Aprofundamento sem limite', 'p.297']], tip: 'Você fez em 70 dias o que leva anos para muita gente. Parabéns!' },
      { n: 'Sábado', off: true },
      { n: 'Domingo', off: true },
      { n: 'Dia 71', b: 'br', bl: 'Exame Final', t: '60 min', warm: 'Improvisação de 4 voltas em ii-V-I: todos os conceitos integrados', sess: [['Performance integral', 'Tudo que você aprendeu em 20 semanas', 'p.298-299'], ['Qualidade profissional', 'Indistinguível de um músico experiente', 'p.300-301'], ['Confiança extrema', 'Já não pensa, apenas toca', 'p.302']], tip: 'Se você está aqui, você já venceu. Aproveite a vitória.' },
      { n: 'Dia 72', b: 'br', bl: 'Exame Final', t: '60 min', warm: 'Composição final: peça de 32-48 compassos, tema + harmonia + reharmonização', sess: [['Obra pessoal completa', 'Sua voz musical permanente', 'p.303-304'], ['Qualidade de mestre', 'Profissional em todos os aspectos', 'p.305-306'], ['Legado', 'O que você deixa para trás', 'p.307']], tip: 'Grandes músicos são também compositores. Você também é.' },
      { n: 'Dia 73', b: 'br', bl: 'Exame Final', t: '60 min', warm: 'Recital final: 6-8 standards + 1 de suas composições', sess: [['Performance completa', 'Mais de 1 hora de música de qualidade', 'p.308-309'], ['Domínio total', 'Instrumento é extensão de você', 'p.310-311'], ['Celebração da maestria', 'Você é um músico de verdade agora', 'p.312']], tip: 'Este é o seu concerto. Toque com todo o seu coração.' },
      { n: 'Dia 74', b: 'br', bl: 'Exame Final', t: '60 min', warm: 'Análise de você mesmo: assista sua gravação como crítico', sess: [['Autocrítica construtiva', 'Onde você brilha, onde pode melhorar', 'p.313-314'], ['Aceitação do progresso', 'Você é muito melhor que era', 'p.315-316'], ['Humildade e confiança', 'Equilíbrio perfeito', 'p.317']], tip: 'A crítica de si mesmo é o combustível para evolução infinita.' },
      { n: 'Dia 75', b: 'br', bl: 'Próximos Passos', t: '60 min', warm: 'Planejamento para os próximos 100 dias de evolução', sess: [['Harmonia funcional avançada', 'Próximo capítulo disponível', 'p.318-319'], ['Improvisação em contextos', 'Free form, fusion, be-bop radical', 'p.320-321'], ['Seu caminho pessoal', 'Música é infinita. Você também é.', 'p.322']], tip: 'Parabéns! Você completou o Plano de Estudos de 100 dias. Você é um músico!' },
      { n: 'Dia 76', b: 'br', bl: 'Bônus', t: '60 min', warm: 'Jam session: convide amigos e toque junto', sess: [['Compartilhamento', 'Música é feita para ser tocada com outros', 'p.323-324'], ['Comunidade', 'Seu novo lugar no mundo musical', 'p.325-326'], ['Infinito musical', 'Sua jornada nunca para', 'p.327']], tip: 'A melhor parte de ser músico é a comunidade. Encontre seus.' },
      { n: 'Dia 77', b: 'br', bl: 'Bônus', t: '60 min', warm: 'Ensine a alguém: transmita um conceito', sess: [['Maestria através do ensino', 'Quando você ensina, você aprende mais', 'p.328-329'], ['Ciclo completo', 'De aluno a professor', 'p.330-331'], ['Legado vivo', 'A música passa de geração em geração', 'p.332']], tip: 'Os melhores músicos são também professores.' },
      { n: 'Dia 78', b: 'br', bl: 'Bônus', t: '60 min', warm: 'Experimental: improvise em 2-3 gêneros diferentes', sess: [['Versatilidade', 'Jazz, bossa, funk, tudo é possível', 'p.333-334'], ['Curiosidade eterna', 'Sempre há algo novo', 'p.335-336'], ['Música sem fronteiras', 'Você transcendeu categorias', 'p.337']], tip: 'Os verdadeiros mestres são fluidos. Aprenda em qualquer contexto.' },
      { n: 'Dia 79', b: 'br', bl: 'Bônus', t: '60 min', warm: 'Gratidão: refleção sobre a jornada de 100 dias', sess: [['Transformação', 'Você não é mais a mesma pessoa', 'p.338-339'], ['Gratidão pela música', 'Ela transformou sua vida', 'p.340-341'], ['Celebração', 'Você conquistou algo extraordinário', 'p.342']], tip: 'Celebre. Você merece. E a jornada está apenas começando.' },
      { n: 'Dia 80', b: 'br', bl: 'Conclusão', t: '60 min', warm: 'Última performance: toque como se fosse o último show', sess: [['Presença total', '100% do seu coração na música', 'p.343-344'], ['Deixa tudo no palco', 'Nenhum arrependimento', 'p.345-346'], ['O começo do infinito', 'Dias 101+ são seus', 'p.347']], tip: 'Você completou 100 dias. Você é um músico. O resto é evolução infinita.', quiz: true }
    ]
  }
};

const QZ = {
  f1: {
    title: 'Prova 1 — Tríades e inversões',
    sub: 'Verifique se você domina a base harmônica antes de avançar para tétrades',
    mc: [
      { q: 'Qual a fórmula intervalar de uma tríade maior?', opts: ['1-2-5', '1-3-5', '1-♭3-5', '1-3-♯5'], ans: 1, exp: 'Tríade maior: fundamental (1), terça maior (3) e quinta justa (5). A segunda opção está correta.' },
      { q: 'Em que inversão o acorde F/A está?', opts: ['Fundamental', 'Primeira inversão (3ª no baixo)', 'Segunda inversão (5ª no baixo)', 'Terceira inversão'], ans: 1, exp: 'F/A tem a nota A (lá) no baixo. A é a terça de F (fá-lá-dó), logo está na primeira inversão.' },
      { q: 'Qual acorde do campo harmônico maior é diminuto?', opts: ['I', 'ii', 'V', 'vii°'], ans: 3, exp: 'O sétimo grau (vii°) é o único acorde diminuto no campo harmônico maior. Ex: B° em C maior.' },
      { q: 'Qual a diferença entre tríade maior e menor?', opts: ['A quinta é diferente', 'A terça é menor na tríade menor', 'A fundamental muda', 'Não há diferença'], ans: 1, exp: 'A tríade menor tem terça menor (♭3) em vez de terça maior. A quinta continua justa.' },
      { q: 'Quantas inversões possui uma tríade?', opts: ['1', '2', '3', '4'], ans: 1, exp: 'Tríade tem 3 notas, logo 2 inversões: 1ª (terça no baixo) e 2ª (quinta no baixo), além da posição fundamental.' }
    ],
    prat: [
      { q: 'Toque a tríade de G maior em 3 inversões diferentes', crit: ['Fundamental: G-B-D', '1ª inversão: B-D-G', '2ª inversão: D-G-B'] },
      { q: 'Toque o campo harmônico de C maior só com tríades (I ao vii°)', crit: ['C, Dm, Em, F, G, Am, B°', 'Sem errar nenhuma nota', 'Conseguir tocar de memória'] },
      { q: 'Escolha uma música simples e toque usando apenas tríades e inversões', crit: ['Escolher inversões que conectem suavemente', 'Não precisar olhar cifra', 'Soar musical, não mecânico'] }
    ]
  },
  f1b: {
    title: 'Prova 2 — Tétrades e cifragem',
    sub: 'Consolide acordes com sétima antes de partir para arpejos',
    mc: [
      { q: 'Qual a diferença entre Cmaj7 e C7?', opts: ['Não há diferença', 'Cmaj7 tem 7ª maior, C7 tem 7ª menor', 'Cmaj7 é menor, C7 é maior', 'C7 tem a quinta aumentada'], ans: 1, exp: 'Cmaj7 = C-E-G-B (7ª maior). C7 = C-E-G-B♭ (7ª menor). Essa é a diferença crucial.' },
      { q: 'Qual a função harmônica típica do acorde V7?', opts: ['Tônica', 'Subdominante', 'Dominante (tensão que resolve na tônica)', 'Relativa menor'], ans: 2, exp: 'V7 é o acorde dominante. Ele cria tensão (pelo trítono entre 3ª e 7ª) e quer resolver no I.' },
      { q: 'Qual acorde aparece no 7º grau do campo harmônico maior?', opts: ['m7', 'maj7', '7', 'm7♭5'], ans: 3, exp: 'Bm7♭5 em C maior. Também chamado de meio-diminuto (ø). Fórmula: 1-♭3-♭5-♭7.' },
      { q: 'O que significa o símbolo "ø" em um acorde?', opts: ['Diminuto', 'Meio-diminuto (m7♭5)', 'Aumentado', 'Menor com 7ª maior'], ans: 1, exp: 'ø = meio-diminuto = m7♭5. Não confundir com ° (diminuto, que tem 7ª diminuta).' },
      { q: 'Qual o campo harmônico de C maior em tétrades?', opts: ['Cmaj7-Dm7-Em7-Fmaj7-G7-Am7-Bm7♭5', 'C7-Dm7-Em7-F7-G7-Am7-Bm7', 'Cmaj7-Dm7-E7-Fmaj7-Gm7-Am7-B7', 'C-Dm-Em-F-G-Am-Bdim'], ans: 0, exp: 'Padrão: Imaj7 - iim7 - iiim7 - IVmaj7 - V7 - vim7 - viim7♭5. Decore isso!' }
    ],
    prat: [
      { q: 'Toque a progressão ii-V-I (Dm7-G7-Cmaj7) em 5 tonalidades diferentes', crit: ['Sem consultar', 'Usando inversões', 'Transição suave entre tonalidades'] },
      { q: 'Leia uma lead sheet cifrada e toque os acordes sem preparação prévia', crit: ['Identificar rapidamente a qualidade de cada acorde', 'Não confundir maj7 com 7', 'Manter o tempo'] },
      { q: 'Grave você tocando um ii-V-I e ouça: está limpo? As notas soam juntas?', crit: ['Sem notas abafadas', 'Ritmo estável', 'Som equilibrado entre as cordas'] }
    ]
  },
  f2: {
    title: 'Prova 3 — Arpejos, escalas e modos',
    sub: 'Certifique-se de que consegue improvisar com maestria em 25 dias',
    mc: [
      { q: 'O que é um arpejo?', opts: ['Um acorde tocado com todas as notas ao mesmo tempo', 'As notas de um acorde tocadas separadamente', 'Uma escala tocada rapidamente', 'Uma progressão de acordes'], ans: 1, exp: 'Arpejo = acorde quebrado. Você toca as notas separadas, em sequência, não simultaneamente.' },
      { q: 'Qual escala usar sobre um acorde Dm7 em contexto de ii-V-I em C maior?', opts: ['D menor harmônica', 'D dórico (notas de C maior começando em D)', 'D frígio', 'D menor melódica'], ans: 1, exp: 'Sobre iim7, use dórico (relativo da escala maior da tonalidade). D dórico = notas de C maior.' },
      { q: 'O que é um modo?', opts: ['Uma escala diferente da maior', 'A mesma escala começando em diferentes graus', 'Um tipo de acorde', 'Uma técnica de improvisação'], ans: 1, exp: 'Modo = escala maior começando em outra nota. Mesmas notas, tônica diferente.' },
      { q: 'Qual modo usar sobre um acorde Dm7 em contexto modal?', opts: ['D dórico', 'D eólio', 'D frígio', 'Qualquer um, depende do contexto'], ans: 3, exp: 'Todos são menores. Dórico (6ª maior) é comum, mas eólio e frígio também cabem. Contexto manda!' },
      { q: 'Qual a diferença fundamental entre acordes, arpejos e escalas na improvisação?', opts: ['Não há diferença', 'Acordes = estrutura; Arpejos = notas do acorde em sequência; Escalas = conjunto maior de notas', 'Acordes são mais importantes', 'Escalas são mais importantes'], ans: 1, exp: 'Todos são ferramentas diferentes. Acordes definem harmonia, arpejos garantem pertencimento, escalas adicionam cor.' }
    ],
    prat: [
      { q: 'Improvise 5 minutos sobre Dm7: use dórico, arpejos de m7, e criatividade', crit: ['Não sair das notas certas', 'Criar motivos e desenvolvê-los', 'Variar articulação e dinâmica'] },
      { q: 'Toque 3 standards: ii-V-I, blues 12, outro de escolha', crit: ['Comping + solo em cada um', 'Fluência sem hesitação', 'Música que soa bem'] },
      { q: 'Análise: assista um solo de mestre em sua escolha', crit: ['Identificar acordes e escalas usadas', 'Ver fraseado e estrutura', 'Entender como tudo se conecta'] }
    ]
  },
  f3: {
    title: 'Prova 4 — Fraseado e maestria',
    sub: 'Avaliação de musicality e expressão após 56 dias',
    mc: [
      { q: 'O que é uma anacrusa?', opts: ['A nota final onde descansamos', 'Uma ou mais notas que precedem o tempo forte, criando anticipação', 'Uma progressão de acordes', 'Um padrão rítmico'], ans: 1, exp: 'Anacrusas são pickup notes que preparam a chegada em uma nota importante.' },
      { q: 'Por que breathing space (pausas) é importante?', opts: ['Torna a música mais lenta', 'Permite ao ouvinte processar e antecipa o próximo movimento', 'Indica falta de habilidade', 'Não tem função específica'], ans: 1, exp: 'Silêncios são tão musicais quanto notas. Criam expectativa e respiração.' },
      { q: 'Como a articulação afeta uma frase?', opts: ['Não afeta; apenas as notas importam', 'Legato vs. staccato cria textura completamente diferente', 'Afeta apenas o volume', 'Afeta apenas a velocidade'], ans: 1, exp: 'Articulação é um dos maiores segredos dos grandes músicos.' },
      { q: 'O que é um motivo?', opts: ['Uma ideia grande e complexa', 'Uma ideia pequena, clara e reconhecível que pode ser repetida e variada', 'Um acorde', 'Uma escala'], ans: 1, exp: 'Motivos bem desenvolvidos são melhores que 100 frases aleatórias.' },
      { q: 'Qual é a estrutura ideal de um solo?', opts: ['Sempre rápido e denso', 'Introdução → Desenvolvimento → Climax → Resolução', 'Uma única ideia repetida', 'Totalmente aleatório'], ans: 1, exp: 'Estrutura clássica cria narrativa e satisfação musical.' }
    ],
    prat: [
      { q: 'Improvise 6-8 minutos em ii-V-I: use TODOS os conceitos', crit: ['Estrutura clara com começo, meio e fim', 'Motivos desenvolvidos', 'Dinâmica, registro, articulação variados', 'Soar como profissional'] },
      { q: 'Composição + performance: sua peça original', crit: ['Pelo menos 32 compassos', 'Tema memorável', 'Harmonia interessante', 'Reharmonização em uma seção'] },
      { q: 'Recital final: 4+ standards + sua composição', crit: ['Qualidade de mestre', 'Presença total', 'Música que toca emoção'] }
    ]
  },
  f4: {
    title: 'Exame Final — 100 Dias Completos',
    sub: 'Maestria integral: você é um músico de verdade agora',
    mc: [
      { q: 'Qual é a diferença fundamental entre técnica e musicality?', opts: ['Não há diferença', 'Técnica = ferramentas; Musicality = saber quando e como usá-las', 'Técnica é mais importante', 'Musicality é mais importante'], ans: 1, exp: 'Técnica sem musicality é robótico. Musicality sem técnica é impreciso. Juntos = magia.' },
      { q: 'Qual é o elemento mais importante na improvisação?', opts: ['Velocidade', 'A capacidade de contar uma história com coerência', 'Quantas notas você toca', 'Tocar em tempo perfeito'], ans: 1, exp: 'A melhor improvisação é sempre um diálogo musical que faz sentido.' },
      { q: 'Como você evoluiu em 100 dias?', opts: ['Tecnicamente apenas', 'Musicalmente apenas', 'Ambos: técnica + expressão + confiança', 'Nada mudou, estou igual'], ans: 2, exp: 'Evolução real envolve técnica, musicality, confiança e amor pela música.' },
      { q: 'Qual é o próximo passo após estes 100 dias?', opts: ['Parar, você aprendeu tudo', 'Continuar aprendendo: harmonia avançada, composição, ensino, criação', 'Tocar a mesma coisa para sempre', 'Há um fim definido na música'], ans: 1, exp: 'Música é infinita. Você acabou de aprender o alfabeto. Agora começa a escrever histórias.' },
      { q: 'O que você pretende fazer com o que aprendeu?', opts: ['Tocar sozinho para mim', 'Compartilhar com outros músicos e público', 'Ensinar a alguém', 'Tudo acima'], ans: 3, exp: 'A melhor forma de aprender é ensinar. A melhor música é compartilhada.' }
    ],
    prat: [
      { q: 'Improvisação final: 10+ minutos com tudo que você aprendeu', crit: ['Estrutura narrativa clara', 'Motivos desenvolvidos ao longo', 'Dinâmica do quase-silêncio ao climax', 'Resolução satisfatória', 'Arte, não apenas técnica'] },
      { q: 'Composição final: sua obra maestro (48+ compassos)', crit: ['Melodia que marca', 'Harmonia interessante', 'Contracanto ou seção B clara', 'Reharmonização criativa', 'Som profissional'] },
      { q: 'Recital final completo: 8+ standards + composições', crit: ['Duração: 60+ minutos', 'Qualidade de profissional', 'Conexão emocional com a música', 'Performance que deixa a plateia em pé'] }
    ]
  }
};

const CHECKS = {
  f1: {
    label: 'Pronto para sair das tríades?',
    badge: 'ba',
    items: [
      ['Toco qualquer tríade (maior, menor, dim, aug) em qualquer região do braço', 'Sem olhar diagrama, apenas pensando nas notas'],
      ['Conheço as 3 inversões de cada tríade e sei nomeá-las', 'Fundamental, 1ª inversão (3ª no baixo), 2ª inversão (5ª no baixo)'],
      ['Toco o campo harmônico maior em tríades de memória', 'I-ii-iii-IV-V-vi-vii° em pelo menos 2 tonalidades'],
      ['Consigo encadear tríades com inversões de forma musical', 'Transições suaves, sem "pulos" bruscos'],
      ['Identifico tríades de ouvido (maior vs menor vs dim vs aug)', 'Ouço um acorde e sei dizer qual é']
    ],
    warn: '⚠️ Se você não marcou todos, NÃO avance. Tétrades dependem de tríades sólidas.',
    ok: '✅ Excelente! Você tem a base. Pode avançar para tétrades com confiança.'
  },
  f2: {
    label: 'Pronto para partir para arpejos?',
    badge: 'ba',
    items: [
      ['Toco tétrades (maj7, m7, 7, m7♭5) em várias regiões do braço', 'Pelo menos 3 digitações diferentes de cada'],
      ['Conheço o campo harmônico maior em tétrades de cor', 'Imaj7-iim7-iiim7-IVmaj7-V7-vim7-viim7♭5'],
      ['Leio cifragem moderna sem hesitar', 'Não confundo C7 com Cmaj7, sei o que é Cø, C°, etc.'],
      ['Toco progressões ii-V-I em pelo menos 5 tonalidades', 'Sem consultar, com fluidez'],
      ['Analiso músicas reais e identifico a qualidade de cada acorde', 'Pego um standard e cifro corretamente']
    ],
    warn: '⚠️ Arpejos são acordes "quebrados". Se você não domina os acordes, não conseguirá usá-los melodicamente.',
    ok: '✅ Parabéns! Agora você pode começar a tocar esses acordes como linhas melódicas.'
  },
  f3: {
    label: 'Pronto para mergulhar em modos?',
    badge: 'be',
    items: [
      ['Improviso sobre acordes estáticos usando arpejos', 'Ex: 2 minutos sobre Cmaj7 só com arpejo de Cmaj7, criando frases'],
      ['Conheço as 5 (ou 7) posições da escala maior', 'Cubro o braço inteiro, sem "buracos"'],
      ['Sei qual escala usar sobre cada acorde do campo harmônico', 'Dórico no iim7, mixo no V7, jônico no Imaj7...'],
      ['Toco as 3 escalas menores (natural, harmônica, melódica)', 'Em várias tonalidades, sem olhar'],
      ['Uso superposição de arpejos para criar tensões', 'Ex: Em sobre Cmaj7, Am sobre Fmaj7']
    ],
    warn: '⚠️ Modos exigem que você já domine escalas e arpejos. Não pule.',
    ok: '✅ Você está pronto para entender os modos como "universos sonoros", não só padrões.'
  },
  f4: {
    label: 'Pronto para exame final?',
    badge: 'bm',
    items: [
      ['Improviso com fraseado maduro: anacrusas, landing notes, breathing space', 'Ex: 5+ minutos de solo musical, não apenas exercício'],
      ['Domino articulação como ferramenta de expressão', 'Legato, staccato, combinações criativas'],
      ['Criei e desenvolvo motivos de forma coerente', 'Uma ideia pequena que evolui ao longo do solo'],
      ['Uso dinâmica e registro como ferramentas narrativas', 'Desde quasi-silenzio até climax explosivo'],
      ['Toco múltiplos standards com qualidade profissional', 'Comping + solo, conexão emocional clara']
    ],
    warn: '',
    ok: '✅ Extraordinário! Você é um músico de maestria. Agora a música é sua. Continue evoluindo infinitamente.'
  }
};

// =============== AUDIO SYNTHESIS ===============
// Mapa de nota para frequência (em Hz, baseado em A4 = 440 Hz)
const NOTE_FREQUENCIES = {
  'C': 261.63, 'C#': 277.18, 'Db': 277.18,
  'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
  'E': 329.63,
  'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
  'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
  'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
  'B': 493.88
};

// Lookup para escalas e modos (todas as tonalidades)
const SCALE_PATTERNS = {
  // Escalas Maiores
  'C Maior': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'D Maior': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'E Maior': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F Maior': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'G Maior': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'A Maior': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'B Maior': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'F# Maior': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'C# Maior': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
  'Bb Maior': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'Eb Maior': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'Ab Maior': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'Db Maior': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'Gb Maior': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],

  // Escalas Menores Natural
  'C Menor': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  'D Menor': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
  'E Menor': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
  'F Menor': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
  'G Menor': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
  'A Menor': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  'B Menor': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
  'Bb Menor': ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
  'Eb Menor': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'],
  'F# Menor': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],

  // Modos da Escala Maior
  'C Jônico': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'D Dórico': ['D', 'E', 'F', 'G', 'A', 'B', 'C'],
  'E Frígio': ['E', 'F', 'G', 'A', 'B', 'C', 'D'],
  'F Lídio': ['F', 'G', 'A', 'B', 'C', 'D', 'E'],
  'G Mixolídio': ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
  'A Eólio': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  'B Lócrio': ['B', 'C', 'D', 'E', 'F', 'G', 'A']
};

// Parser: extrai notas de descrição textual com suporte a múltiplos padrões
function extractNotesFromDescription(text) {
  if (!text) return null;

  // Estratégia 1: Notação direta com hífen (C-E-G ou C-E-G-B)
  const directPattern = /[A-G](?:[#b])?(?:\s*-\s*[A-G](?:[#b])?)+/g;
  const directMatches = text.match(directPattern);
  if (directMatches && directMatches.length > 0) {
    return parseDashNotation(directMatches[0]);
  }

  // Estratégia 2: Padrões interválares (1-3-5, 1-♭3-5, etc)
  const intervalPattern = /\d-(?:♯|♭)?[0-9](?:-(?:♯|♭)?[0-9])+/;
  const intervalMatch = text.match(intervalPattern);
  if (intervalMatch) {
    // Para padrões intervalares, tentar extrair de C por padrão
    return parseIntervalPattern(intervalMatch[0], 'C');
  }

  // Estratégia 3: Escala nomeada (Escala Maior em C, etc)
  const scalePattern = /(?:Escala|escala|Modo|modo)\s+(?:de\s+)?([A-G](?:[#b])?)\s+(Maior|Menor|Jônico|Dórico|Frígio|Lídio|Mixolídio|Eólio|Lócrio)/i;
  const scaleMatch = text.match(scalePattern);
  if (scaleMatch) {
    const key = scaleMatch[1] + ' ' + scaleMatch[2];
    if (SCALE_PATTERNS[key]) {
      return SCALE_PATTERNS[key].map(n => NOTE_FREQUENCIES[n]);
    }
  }

  // Estratégia 4: Progressão romana com tonalidade (I-IV-V em C)
  const romanPattern = /([IViv]+(?:-[IViv]+)*)\s+(?:em|in|de)\s+([A-G](?:[#b])?)/i;
  const romanMatch = text.match(romanPattern);
  if (romanMatch) {
    return parseRomanProgression(romanMatch[1], romanMatch[2]);
  }

  // Estratégia 5: Campo Harmônico (tríades dos 7 graus)
  if (text.match(/[Cc]ampo\s+[Hh]armônico/)) {
    // Tentar extrair tonalidade
    const tonalityMatch = text.match(/([A-G](?:[#b])?)\s+maior/i);
    if (tonalityMatch) {
      return generateHarmonicField(tonalityMatch[1], 'major');
    }
  }

  // Se nada funcionou, retornar null (sem notas)
  return null;
}

// Parser para padrões intervalares (1-3-5 com posição relativa)
function parseIntervalPattern(pattern, rootNote = 'C') {
  // Mapear intervalos para semitons: 1=0, 2=2, 3=4, 4=5, 5=7, 6=9, 7=11, 8=12, 9=14, 13=21
  const intervalToSemitones = { '1': 0, '2': 2, '3': 4, '4': 5, '5': 7, '6': 9, '7': 11 };

  const rootFreq = NOTE_FREQUENCIES[rootNote];
  if (!rootFreq) return null;

  // Extrair números do padrão
  const intervals = pattern.match(/\d/g) || [];
  return intervals.map(interval => {
    const semitones = intervalToSemitones[interval] || 0;
    // Multiplicar frequência por 2^(semitones/12)
    return rootFreq * Math.pow(2, semitones / 12);
  });
}

// Parser para progressões romanas (I, ii, V, etc)
function parseRomanProgression(romanStr, tonality) {
  // Mapa simplificado: em uma escala maior, os graus são:
  // I, ii, iii, IV, V, vi, vii° (ou vii dim)
  const majorScale = SCALE_PATTERNS[tonality + ' Maior'];
  if (!majorScale) return null;

  // Extrair graus romanos individuais
  const romanNumerals = romanStr.match(/[IViv°]+/g) || [];
  const notes = [];

  romanNumerals.forEach(roman => {
    const romanLower = roman.toLowerCase().replace('°', '');
    let degree = 0;

    if (romanLower === 'i') degree = 0;
    else if (romanLower === 'ii') degree = 1;
    else if (romanLower === 'iii') degree = 2;
    else if (romanLower === 'iv') degree = 3;
    else if (romanLower === 'v') degree = 4;
    else if (romanLower === 'vi') degree = 5;
    else if (romanLower === 'vii') degree = 6;

    if (majorScale[degree]) {
      notes.push(NOTE_FREQUENCIES[majorScale[degree]]);
    }
  });

  return notes.length > 0 ? notes : null;
}

// Gerar campo harmônico (7 acordes dos graus da escala)
function generateHarmonicField(tonality, type = 'major') {
  const scale = SCALE_PATTERNS[tonality + ' Maior'];
  if (!scale) return null;

  // Retornar primeiro acorde (tríade I) como exemplo
  // Idealmente seria melhor tocar todos os 7, mas por simplicidade...
  return [
    NOTE_FREQUENCIES[scale[0]],  // 1
    NOTE_FREQUENCIES[scale[2]],  // 3
    NOTE_FREQUENCIES[scale[4]]   // 5
  ];
}

// Parser para notação com hífen: "C-E-G" → [261.63, 329.63, 392.00]
function parseDashNotation(text) {
  const notes = text.match(/[A-G](?:[#b])?/g) || [];
  return notes.length > 0 ? notes.map(n => NOTE_FREQUENCIES[n]) : null;
}

// Reproduzir acorde completo (notas simultâneas) - som de guitarra
async function playChordFull(frequencies) {
  if (!frequencies || frequencies.length === 0) return;

  try {
    // Timbre de guitarra: sawtooth com filtro + envelope realista
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: {
        attack: 0.008,    // Very quick attack (plectrum strike)
        decay: 0.05,      // Quick decay to sustain
        sustain: 0.35,    // Low sustain (guitar decay)
        release: 0.8      // Long release (string resonance)
      }
    }).toDestination();

    // Aplicar filtro para suavizar o sawtooth (simular corpo da guitarra)
    const filter = new Tone.Filter({
      frequency: 2000,
      type: 'lowpass'
    });
    synth.connect(filter);
    filter.toDestination();

    const notes = frequencies.map(f => Tone.Frequency(f).toNote());
    synth.triggerAttackRelease(notes, '2n'); // ~1.5s em 120 BPM
    await new Promise(resolve => setTimeout(resolve, 1500));
  } catch (e) {
    console.error('Erro ao tocar acorde:', e);
  }
}

// Reproduzir arpegio (notas em sequência) - som de guitarra
async function playArpeggio(frequencies) {
  if (!frequencies || frequencies.length === 0) return;

  try {
    // Timbre de guitarra: sawtooth com filtro + envelope rápido
    const synth = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: {
        attack: 0.01,     // Quick plectrum attack
        decay: 0.08,      // Decay to sustain
        sustain: 0.15,    // Very low sustain (arpegio decays quickly)
        release: 0.2      // Short release for clean separation
      }
    }).toDestination();

    // Filtro para suavizar
    const filter = new Tone.Filter({
      frequency: 2200,
      type: 'lowpass'
    });
    synth.connect(filter);
    filter.toDestination();

    const stepDuration = 0.25; // segundos por nota

    for (let freq of frequencies) {
      const note = Tone.Frequency(freq).toNote();
      synth.triggerAttackRelease(note, '16n');
      await new Promise(resolve => setTimeout(resolve, stepDuration * 1000));
    }
  } catch (e) {
    console.error('Erro ao tocar arpegio:', e);
  }
}

// Wrapper principal para botões de áudio
async function playNotesFromDescription(text, asArpeggio = false) {
  const frequencies = extractNotesFromDescription(text);
  if (!frequencies) {
    console.warn('Não consegui extrair notas de:', text);
    return;
  }

  // Disable todos os botões durante reprodução
  const buttons = document.querySelectorAll('.audio-btn');
  buttons.forEach(btn => btn.disabled = true);

  try {
    if (asArpeggio) {
      await playArpeggio(frequencies);
    } else {
      await playChordFull(frequencies);
    }
  } finally {
    // Re-enable botões
    buttons.forEach(btn => btn.disabled = false);
  }
}

// Toca uma sequência de exemplo: arpegio → pausa 200ms → acorde
async function playExampleSequence(notes) {
  const frequencies = extractNotesFromDescription(notes);
  if (!frequencies) return;

  // Disable botões durante reprodução
  const buttons = document.querySelectorAll('.audio-btn');
  buttons.forEach(btn => btn.disabled = true);

  try {
    // 1. Toca arpegio (notas em sequência)
    await playArpeggio(frequencies);

    // 2. Pausa de 200ms
    await new Promise(resolve => setTimeout(resolve, 200));

    // 3. Toca acorde (notas simultâneas)
    await playChordFull(frequencies);
  } finally {
    // Re-enable botões
    buttons.forEach(btn => btn.disabled = false);
  }
}

// =============== PROGRESS TRACKING ===============
// Armazena qual dias foram estudados por fase
let studentProgress = { f1: [], f1b: [], f2: [], f3: [], f4: [] };

// Inicializa o progresso carregando do localStorage
function initializeProgress() {
  const stored = localStorage.getItem('app_studentProgress');
  if (stored) {
    try {
      studentProgress = JSON.parse(stored);
    } catch (e) {
      console.error('Erro ao carregar progresso:', e);
      studentProgress = { f1: [], f1b: [], f2: [], f3: [], f4: [] };
    }
  }
  // Garantir que cada fase tem um array com o tamanho correto
  const phaseLengths = { f1: 15, f1b: 10, f2: 20, f3: 20, f4: 24 };
  Object.keys(phaseLengths).forEach(phase => {
    if (!Array.isArray(studentProgress[phase])) {
      studentProgress[phase] = [];
    }
    // Preencher com false se necessário
    while (studentProgress[phase].length < phaseLengths[phase]) {
      studentProgress[phase].push(false);
    }
  });
}

// Salva um dia como estudado/não estudado
function saveProgress(phase, dayIndex, completed) {
  if (!studentProgress[phase]) studentProgress[phase] = [];
  studentProgress[phase][dayIndex] = completed;
  localStorage.setItem('app_studentProgress', JSON.stringify(studentProgress));
  updateProgressBar();
}

// Marca um dia como completo/incompleto
function markDayComplete(phase, dayIndex) {
  const checkbox = document.getElementById(`complete-${phase}-${dayIndex}`);
  if (checkbox) {
    const isChecked = checkbox.checked;
    saveProgress(phase, dayIndex, isChecked);
  }
}

// Calcula estatísticas de progresso
function getProgressStats() {
  let total = 0, completed = 0;
  Object.values(studentProgress).forEach(phaseProgress => {
    phaseProgress.forEach(isDone => {
      total++;
      if (isDone) completed++;
    });
  });
  return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
}

// Atualiza a barra de progresso visual
function updateProgressBar() {
  const stats = getProgressStats();
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-bar-fill');

  if (progressText) {
    progressText.textContent = `${stats.completed} de ${stats.total} dias completados (${stats.percentage}%)`;
  }

  if (progressFill) {
    progressFill.style.width = stats.percentage + '%';
  }
}

// Exporta progresso como JSON
function exportProgress() {
  const data = JSON.stringify(studentProgress, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `progresso-estudos-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Importa progresso de JSON
function importProgress(jsonData) {
  try {
    const imported = JSON.parse(jsonData);
    studentProgress = imported;
    localStorage.setItem('app_studentProgress', JSON.stringify(studentProgress));
    location.reload(); // Recarregar página para atualizar checkboxes
  } catch (e) {
    alert('Erro ao importar: JSON inválido');
    console.error(e);
  }
}

// Limpa todo o progresso
function clearProgress() {
  if (confirm('Tem certeza? Isso vai apagar todo o progresso.')) {
    studentProgress = { f1: [], f1b: [], f2: [], f3: [], f4: [] };
    const phaseLengths = { f1: 15, f1b: 10, f2: 20, f3: 20, f4: 24 };
    Object.keys(phaseLengths).forEach(phase => {
      studentProgress[phase] = new Array(phaseLengths[phase]).fill(false);
    });
    localStorage.removeItem('app_studentProgress');
    location.reload();
  }
}
// ===================================================

// =============== CHECKLIST PERSISTENCE ===============
// Armazena quais itens dos checklists foram marcados
let checklistProgress = { f1: [], f1b: [], f2: [], f3: [], f4: [] };

// Inicializa o progresso dos checklists
function initializeChecklists() {
  const stored = localStorage.getItem('app_checklistProgress');
  if (stored) {
    try {
      checklistProgress = JSON.parse(stored);
    } catch (e) {
      console.error('Erro ao carregar checklists:', e);
      checklistProgress = { f1: [], f1b: [], f2: [], f3: [], f4: [] };
    }
  }
  // Garantir que cada fase tem um array com o tamanho correto
  const checklistLengths = { f1: 5, f1b: 5, f2: 5, f3: 5, f4: 5 };
  Object.keys(checklistLengths).forEach(phase => {
    if (!Array.isArray(checklistProgress[phase])) {
      checklistProgress[phase] = [];
    }
    while (checklistProgress[phase].length < checklistLengths[phase]) {
      checklistProgress[phase].push(false);
    }
  });
}

// Salva um item do checklist
function saveChecklistItem(phase, itemIndex, completed) {
  if (!checklistProgress[phase]) checklistProgress[phase] = [];
  checklistProgress[phase][itemIndex] = completed;
  localStorage.setItem('app_checklistProgress', JSON.stringify(checklistProgress));
}
// ======================================================

let ans = {}, rev = {};

function buildQuiz(k) {
  const q = QZ[k];
  const mc = q.mc.map((m, i) => `
    <div>
      <div class="q-num">Questão ${i + 1}</div>
      <div class="q-text">${m.q}</div>
      <div class="opts" id="opts-${k}-${i}">
        ${m.opts.map((o, j) => `<div class="opt" id="opt-${k}-${i}-${j}" onclick="pick('${k}',${i},${j})">
          <span class="opt-letter">${String.fromCharCode(65 + j)}</span>
          <span class="opt-text">${o}</span>
        </div>`).join('')}
      </div>
      <div class="exp" id="exp-${k}-${i}">${m.exp}</div>
    </div>
  `).join('<div class="divider"></div>');

  const prat = q.prat.map((p, i) => `
    <div class="prat-block">
      <div class="prat-label">Questão prática ${i + 1}</div>
      <div class="prat-text">${p.q}</div>
      <div class="crit-block">
        <div class="crit-label">Critérios de avaliação</div>
        <div class="crit-text">${p.crit.map(c => '• ' + c).join('<br>')}</div>
      </div>
    </div>
  `).join('');

  return `<div class="quiz-card">
    <div style="font-size:15px;font-weight:600;color:var(--red800);margin-bottom:4px">${q.title}</div>
    <p style="font-size:12px;color:var(--text2);margin-bottom:16px">${q.sub}</p>
    ${mc}
    <div class="divider"></div>
    <p style="font-size:13px;font-weight:600;margin-bottom:10px">Questões práticas — no instrumento</p>
    ${prat}
    <div class="quiz-actions">
      <button class="btn" onclick="chk('${k}')">Corrigir respostas</button>
      <button class="btn" onclick="rst('${k}')">Limpar</button>
    </div>
    <div class="score-box" id="sc-${k}">
      <div class="score-num" id="sn-${k}"></div>
      <div class="score-msg" id="sm-${k}"></div>
    </div>
  </div>`;
}

function buildDay(day, qk, dayIndex) {
  if (day.off) return `<div class="off-day">🌙 ${day.n} — dia livre</div>`;

  const sesHtml = day.sess.map((s, sesIndex) => {
    // Verificar se consegue extrair notas dessa descrição
    const hasNotes = extractNotesFromDescription(s[1]) !== null;

    // Buscar todas as formações para esta sessão
    const sesExemplosFormacoes = day.exemplos?.filter(ex => ex.sessionIndex === sesIndex) || [];

    const exemplosHtml = sesExemplosFormacoes.length > 0 ? sesExemplosFormacoes.map(formacao => `
      ${formacao.title ? `<div class="formacao-title">${formacao.title}</div>` : ''}
      <div class="examples-grid">
        ${formacao.items.map(ex => `
          <div class="example-item">
            <div class="example-label">${ex.label}</div>
            <img src="${ex.img}" alt="${ex.label}" class="example-img" onerror="this.style.display='none'">
            <button class="audio-btn" onclick="playExampleSequence('${ex.notes.replace(/'/g, "\\'")}')">▶️ Play</button>
          </div>
        `).join('')}
      </div>
    `).join('') : '';

    return `<div class="session">
    <div class="session-title">${s[0]}</div>
    <div class="session-desc">${s[1]}</div>
    <div class="session-page">📖 ${s[2]}</div>
    ${exemplosHtml}
    ${hasNotes ? `<div class="audio-controls">
      <button class="audio-btn" onclick="playNotesFromDescription('${s[1].replace(/'/g, "\\'")}', false)">
        ▶️ Play
      </button>
      <button class="audio-btn" onclick="playNotesFromDescription('${s[1].replace(/'/g, "\\'")}', true)">
        ↗️ Arpegio
      </button>
    </div>` : ''}
  </div>`;
  }).join('');

  // Verificar se este dia foi marcado como estudado
  const isDayComplete = studentProgress[qk] && studentProgress[qk][dayIndex];

  return `<div class="card">
    <div class="card-header">
      <span class="card-title">${day.n}</span>
      <span class="badge ${day.b}">${day.bl}</span>
      <span class="time-badge">⏱ ${day.t}</span>
      <div class="day-checkbox-wrap">
        <input type="checkbox" class="day-complete"
               id="complete-${qk}-${dayIndex}"
               onchange="markDayComplete('${qk}', ${dayIndex})"
               ${isDayComplete ? 'checked="checked"' : ''}
               style="cursor: pointer; margin: 0;">
        <label for="complete-${qk}-${dayIndex}" style="cursor: pointer; font-size: 11px; margin: 0 0 0 4px;">
          Estudado
        </label>
      </div>
    </div>
    <div class="warmup">
      <div class="warmup-label">🔥 Aquecimento — 5 min</div>
      <div class="warmup-text">${day.warm}</div>
    </div>
    ${sesHtml}
    <div class="tip"><span>💡</span><span>${day.tip}</span></div>
  </div>
  ${day.quiz ? buildQuiz(qk) : ''}`;
}

function buildWeek(k) {
  const w = WEEKS[k];
  const div = document.getElementById('tab-' + k);
  div.innerHTML = `
    <h2 class="section-title">${w.label}</h2>
    <p class="section-sub" style="margin-bottom:1.5rem">${w.sub}</p>
    ${w.days.map((d, dayIndex) => buildDay(d, k, dayIndex)).join('')}
  `;
}

function buildChecks() {
  const div = document.getElementById('tab-check');
  div.innerHTML = `
    <h2 class="section-title">Checklists de prontidão</h2>
    <p class="section-sub">Marque cada item apenas quando conseguir fazer sem consultar o livro e sem errar.</p>
    ${Object.entries(CHECKS).map(([k, ph]) => {
      const itemsDone = checklistProgress[k] ? checklistProgress[k].filter(v => v).length : 0;
      const total = ph.items.length;
      return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${ph.label}</span>
          <span class="badge ${ph.badge}">Pronto para avançar quando...</span>
        </div>
        <div>${ph.items.map((it, i) => {
          const isDone = checklistProgress[k] && checklistProgress[k][i];
          return `
          <div class="checklist-item">
            <div class="chk ${isDone ? 'done' : ''}" id="chk-${k}-${i}" onclick="toggleChk('${k}',${i})">✓</div>
            <div>
              <div class="chk-text">${it[0]}</div>
              <div class="chk-desc">${it[1]}</div>
            </div>
          </div>`;
        }).join('')}
        </div>
        <div class="prog-wrap">
          <div class="prog-bar"><div class="prog-fill" id="pbar-${k}" style="width: ${Math.round(itemsDone / total * 100)}%;"></div></div>
          <span class="prog-cnt" id="pcnt-${k}">${itemsDone} de ${total}</span>
        </div>
        ${ph.warn ? `<div class="warn-box">${ph.warn}</div>` : ''}
        <div class="ok-box" id="okbox-${k}" style="display: ${itemsDone >= (k === 'f4' ? total : total - 1) ? 'block' : 'none'};">${ph.ok}</div>
      </div>
    `;
    }).join('')}
  `;
}

function pick(k, qi, oi) {
  if (rev[k]) return;
  if (!ans[k]) ans[k] = {};
  ans[k][qi] = oi;
  document.querySelectorAll(`#opts-${k}-${qi} .opt`).forEach(e => e.classList.remove('sel'));
  document.getElementById(`opt-${k}-${qi}-${oi}`).classList.add('sel');
}

function chk(k) {
  const q = QZ[k];
  let c = 0;
  q.mc.forEach((m, i) => {
    const ch = ans[k] ? ans[k][i] : undefined;
    m.opts.forEach((_, j) => {
      const el = document.getElementById(`opt-${k}-${i}-${j}`);
      el.classList.remove('sel', 'ok', 'no');
      if (j === m.ans) el.classList.add('ok');
      else if (j === ch && ch !== m.ans) el.classList.add('no');
    });
    document.getElementById(`exp-${k}-${i}`).style.display = 'block';
    if (ch === m.ans) c++;
  });
  const msgs = ['Revise o material antes de avançar.', 'Releia os trechos que errou.', 'Razoável — foque nos pontos que erraste.', 'Muito bem! Quase lá.', 'Excelente! Pode avançar com confiança.'];
  const mi = c === 5 ? 4 : c === 4 ? 3 : c === 3 ? 2 : c <= 1 ? 0 : 1;
  document.getElementById(`sn-${k}`).textContent = `${c} de ${q.mc.length} corretas (${Math.round(c / q.mc.length * 100)}%)`;
  document.getElementById(`sm-${k}`).textContent = msgs[mi];
  document.getElementById(`sc-${k}`).style.display = 'block';
  rev[k] = true;
}

function rst(k) {
  if (ans[k]) ans[k] = {};
  rev[k] = false;
  buildWeek(k);
}

function toggleChk(ph, i) {
  const el = document.getElementById(`chk-${ph}-${i}`);
  el.classList.toggle('done');

  // Salvar estado em localStorage
  const isChecked = el.classList.contains('done');
  saveChecklistItem(ph, i, isChecked);

  const total = CHECKS[ph].items.length;
  const done = CHECKS[ph].items.filter((_, j) => document.getElementById(`chk-${ph}-${j}`)?.classList.contains('done')).length;
  document.getElementById(`pbar-${ph}`).style.width = Math.round(done / total * 100) + '%';
  document.getElementById(`pcnt-${ph}`).textContent = `${done} de ${total}`;
  const thr = ph === 'f4' ? total : total - 1;
  document.getElementById(`okbox-${ph}`).style.display = done >= thr ? 'block' : 'none';
}

const TAB_IDS = ['mapa', 'f1', 'f1b', 'f2', 'f3', 'f4', 'check'];

function showTab(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  document.querySelector(`.tab[data-tab="${id}"]`).classList.add('active');

  // Scroll a aba ativa para o centro no mobile
  const activeTab = document.querySelector(`.tab[data-tab="${id}"]`);
  const tabsContainer = document.getElementById('tabsContainer');
  if (activeTab && tabsContainer) {
    const tabRect = activeTab.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();
    const scrollLeft = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
    tabsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }
}

// Event listeners para as abas
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const tabId = this.getAttribute('data-tab');
      showTab(tabId);
    });
  });

  // Carrega progresso do localStorage
  initializeProgress();
  initializeChecklists();

  // Inicializa as semanas e checklists
  ['f1', 'f1b', 'f2', 'f3', 'f4'].forEach(k => buildWeek(k));
  buildChecks();

  // Atualiza barra de progresso
  updateProgressBar();

  // Handle URL routing para acessar dias direto (ex: /dia_1)
  handleDayRouting();
});

// =============== URL ROUTING ===============
function handleDayRouting() {
  // Parse hash para dia (ex: #dia_1, #dia_2, etc ou #/dia_1)
  const hash = window.location.hash.replace(/^#\/?/, '');
  const dayMatch = hash.match(/dia[_-]?(\d+)/i);

  if (dayMatch) {
    const dayNum = parseInt(dayMatch[1]);
    navigateToDay(dayNum);
  }

  // Também listen para mudanças de hash
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace(/^#\/?/, '');
    const newDayMatch = newHash.match(/dia[_-]?(\d+)/i);
    if (newDayMatch) {
      const dayNum = parseInt(newDayMatch[1]);
      navigateToDay(dayNum);
    }
  });
}

function navigateToDay(dayNum) {
  // Encontra em qual fase e índice está o dia
  for (const [phaseKey, phaseData] of Object.entries(WEEKS)) {
    for (let dayIndex = 0; dayIndex < phaseData.days.length; dayIndex++) {
      const day = phaseData.days[dayIndex];
      // Extrai número do dia do label (ex: "Dia 1" → 1)
      const dayNumberMatch = day.n.match(/\d+/);
      if (dayNumberMatch && parseInt(dayNumberMatch[0]) === dayNum) {
        // Encontrou o dia! Navega para a fase e rola para o dia
        showTab(phaseKey);
        setTimeout(() => {
          const dayCard = document.querySelector(
            `#tab-${phaseKey} .card:nth-of-type(${dayIndex + 1})`
          );
          if (dayCard) {
            dayCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
        return;
      }
    }
  }
}
