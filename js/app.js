const WEEKS={s1:{label:'Semanas 1–2 · Tríades e inversões',sub:'Fundação harmônica',days:[{n:'Dia 1',b:'ba',bl:'Acordes',t:'30 min',warm:'Cromática nas 4 primeiras cordas + tríade maior C-D-E-F-G em posições vizinhas',sess:[['Tríades maiores','Construção a partir da escala maior. Fórmula: 1-3-5. Tríade de Dó maior = C-E-G','p.14-15'],['Inversões de tríades maiores','Fundamental no baixo, 3ª no baixo, 5ª no baixo. Como identificar e tocar','p.16-17'],['Digitações em cordas adjacentes','Formas nas cordas 6-5-4, 5-4-3, 4-3-2, 3-2-1','p.18']],tip:'Use um diapasão em branco para marcar as notas de cada tríade. Enxergue o "triângulo" do acorde no braço.'},{n:'Dia 2',b:'ba',bl:'Acordes',t:'30 min',warm:'Sequência I-IV-V em C maior com tríades apenas (C-F-G)',sess:[['Tríades menores','Diferença pro maior: 3ª menor (♭3). Fórmula: 1-♭3-5','p.19-20'],['Inversões de tríades menores','Mesma lógica das maiores: fundamental, 1ª inversão, 2ª inversão','p.20-21'],['Ditado de tríades','Ouça acordes de músicas conhecidas e identifique maior ou menor','p.22']],tip:'Ouça sons de violão ou piano tocando tríades. Tente identificar de ouvido se é maior ou menor antes de ver a cifra.'},{n:'Dia 3',b:'ba',bl:'Acordes',t:'30 min',warm:'Toque as 3 inversões de C, Dm, Em, F, G, Am em sequência',sess:[['Tríades diminutas e aumentadas','Diminuta: 1-♭3-♭5. Aumentada: 1-3-♯5','p.23-24'],['Campo harmônico em tríades','Construir as tríades dos 7 graus da escala maior','p.25-26'],['Progressões diatônicas','I-vi-IV-V, I-IV-V, ii-V-I em tríades','p.27']],tip:'Decore o padrão do campo harmônico maior: M m m M M m dim. Você vai usar isso pra sempre.'},{n:'Dia 4',b:'ba',bl:'Acordes',t:'30 min',warm:'Campo harmônico de C maior em tríades, todas as inversões, subindo o braço',sess:[['Encadeamentos de inversões','Movimentação suave entre acordes usando inversões','p.28-29'],['Prática: progressão em todas as tonalidades','I-IV-V em C, G, D, A, E, F, B♭','p.30'],['Análise de música real','Pegue uma música simples e identifique as tríades','p.31']],tip:'Escolha uma música que você goste e que tenha poucos acordes. Tente tocar só com tríades e inversões.'},{n:'Dia 5',b:'ba',bl:'Acordes',t:'30 min',warm:'Revisão livre: toque tríades em diferentes regiões do braço sem olhar cifras',sess:[['Consolidação das inversões','Refazer todos os exemplos das páginas anteriores sem consultar','p.14-31'],['Teste de prontidão','Consegue tocar qualquer tríade em qualquer inversão sem pensar?','p.31'],['Preparação para tétrades','Compreender que vamos adicionar a 7ª agora','p.32']],tip:'Se não conseguir tocar de cor, volte atrás. Melhor consolidar pouco do que avançar com lacunas.',quiz:true}]},s2:{label:'Semanas 3–4 · Tétrades e cifragem',sub:'Acordes com sétima',days:[{n:'Dia 6',b:'ba',bl:'Acordes',t:'35 min',warm:'Tríades + agora adicionar a 7ª maior em cima (CEG → CEGB)',sess:[['Tétrade maior com 7ª maior (Cmaj7)','Fórmula: 1-3-5-7. Som característico, estável','p.33-34'],['Inversões de tétrades','Fundamental, 1ª, 2ª, 3ª inversão. Baixo define a inversão','p.35-36'],['Digitações comuns','Formas fechadas e abertas de maj7','p.37']],tip:'A 7ª maior "flutua". Você vai ouvir isso em bossa nova o tempo todo.'},{n:'Dia 7',b:'ba',bl:'Acordes',t:'35 min',warm:'Sequência Cmaj7-Dm7-G7-Cmaj7 em loop, explorando inversões',sess:[['Acorde dominante (G7)','Fórmula: 1-3-5-♭7. Função: tenso, quer resolver','p.38-39'],['Acorde menor com 7ª menor (Dm7)','Fórmula: 1-♭3-5-♭7. Som suave, contexto de ii-V-I','p.40-41'],['Acorde meio-diminuto (Bm7♭5)','Fórmula: 1-♭3-♭5-♭7. Aparece no 7º grau do campo harmônico maior','p.42']],tip:'Decore: Imaj7 - iim7 - iiim7 - IVmaj7 - V7 - vim7 - viim7♭5. É o campo harmônico que rege o jazz e a MPB.'},{n:'Dia 8',b:'ba',bl:'Acordes',t:'35 min',warm:'Todas as tétrades do campo harmônico de C maior, 3 inversões cada',sess:[['Cifragem moderna','Entender C7, Cmaj7, Cm7, CmM7, C7M, Cdim7, C°, C+','p.43-44'],['Símbolos e abreviações','Diferença entre C7 e Cmaj7. Atenção aos símbolos: Δ, -, °, ø','p.45'],['Exercício de leitura','Ler progressões cifradas e identificar a qualidade de cada acorde','p.46']],tip:'Confundir C7 com Cmaj7 é o erro clássico. Um tem ♭7, o outro tem 7 natural. Grave isso.'},{n:'Dia 9',b:'ba',bl:'Acordes',t:'35 min',warm:'Ditado harmônico: ouça uma progressão e escreva a cifra',sess:[['Progressões com tétrades','ii-V-I em várias tonalidades','p.47-48'],['Substituições básicas','Trocar Imaj7 por iii-7, ou vi-7 por I6','p.49'],['Repertório real','Analisar standards de jazz: Autumn Leaves, Blue Bossa','p.50']],tip:'Toque os standards devagar, pensando na função harmônica de cada acorde.'},{n:'Dia 10',b:'ba',bl:'Acordes',t:'35 min',warm:'Revisão: campo harmônico de 3 tonalidades com tétrades',sess:[['Consolidação geral','Refazer exercícios sem consultar. Testar prontidão','p.33-50'],['Teste de reconhecimento','Ouvir e identificar tétrades sem ver','p.51'],['Transição para arpejos','Entender que vamos começar a tocar as notas separadas agora','p.52']],tip:'Se você dominou até aqui, o restante do livro vai fluir. Se não, volte.',quiz:true}]},s3:{label:'Semanas 5–8 · Arpejos e escalas',sub:'Improvisação melódica',days:[{n:'Dia 11',b:'be',bl:'Arpejos',t:'40 min',warm:'Arpejo de Cmaj7 em todas as cordas, subindo e descendo',sess:[['Conceito de arpejo','Tocar as notas do acorde separadas, em sequência','p.53-54'],['Digitações de arpejos maiores','Padrões em 3 oitavas, várias regiões do braço','p.55-56'],['Arpejo sobre backing track','Praticar sobre base de Cmaj7 estático','p.57']],tip:'Arpejo é o vocabulário mais direto pra improviso. Cada nota "pertence" ao acorde.'},{n:'Dia 12',b:'be',bl:'Arpejos',t:'40 min',warm:'Arpejos de Dm7, G7, Cmaj7 em sequência (ii-V-I)',sess:[['Arpejos menores e dominantes','Adaptar as digitações para m7 e 7','p.58-59'],['Superposição de arpejos','Tocar arpejo de Em sobre Cmaj7 (som de 9ª e 13ª)','p.60-61'],['Prática sobre progressão','ii-V-I em 3 tonalidades','p.62']],tip:'Superposição é mágica: você cria tensões sem sair do acorde. Use isso!'},{n:'Dia 13',off:true},{n:'Dia 14',b:'bp',bl:'Escalas',t:'40 min',warm:'Escala de C maior em 5 posições, padrão CAGED',sess:[['Escala maior — revisão','Fórmula: T-T-sT-T-T-T-sT. Construção intervalar','p.63-64'],['Digitações completas','7 posições cobrindo o braço inteiro','p.65-66'],['Estudo melódico','Criar linhas usando só a escala maior','p.67']],tip:'Decore as 5 (ou 7) posições. Você precisa conhecer o braço como a palma da mão.'},{n:'Dia 15',b:'bp',bl:'Escalas',t:'40 min',warm:'Sequência 1-2-3, 2-3-4, 3-4-5... na escala maior',sess:[['Escala menor natural','Fórmula: T-sT-T-T-sT-T-T. Relativa menor','p.68-69'],['Escala menor harmônica','♯7 na menor natural. Som "exótico"','p.70-71'],['Escala menor melódica','♯6 e ♯7 na menor natural. "Maior com ♭3"','p.72']],tip:'Menor melódica é a escala do jazz menor. Você vai viver nela quando tocar m(maj7).'},{n:'Dia 16',b:'bp',bl:'Escalas',t:'40 min',warm:'Tocar C maior, C menor natural, C menor harmônica, C menor melódica em sequência',sess:[['Aplicação harmônica das escalas','Qual escala usar sobre cada acorde','p.73-74'],['Prática sobre backing','Improvisar com as 4 escalas em contextos diferentes','p.75'],['Análise de solos','Ver como músicos famosos usam essas escalas','p.76']],tip:'Escala não é exercício, é matéria-prima. Ouça solos e identifique as escalas.'},{n:'Dia 17',b:'bp',bl:'Escalas',t:'40 min',warm:'Livre: crie uma melodia curta com cada uma das 4 escalas',sess:[['Consolidação','Refazer exemplos sem consultar','p.63-76'],['Teste auditivo','Identificar escala por som','p.77'],['Preparação para modos','Entender que modos são "rotações" da escala maior','p.78']],tip:'Se não conseguir ouvir a diferença entre as escalas, volte e ouça mais.',quiz:true}]},s4:{label:'Semanas 9–14 · Modos e aplicação',sub:'Pensamento modal',days:[{n:'Dia 18',b:'bm',bl:'Modos',t:'45 min',warm:'Escala de C maior começando em cada grau (C D E F G A B)',sess:[['Conceito de modos','Mesmo conjunto de notas, tônicas diferentes','p.79-80'],['Jônico e dórico','Jônico = escala maior. Dórico = menor com 6ª maior','p.81-82'],['Som característico de cada modo','Ouvir e sentir a "personalidade" do dórico','p.83']],tip:'Modo não é só padrão de dedos. É um universo sonoro. Ouça muito!'},{n:'Dia 19',b:'bm',bl:'Modos',t:'45 min',warm:'Tocar D dórico (notas de C maior começando em D)',sess:[['Frígio e lídio','Frígio: menor com ♭2. Lídio: maior com ♯4','p.84-85'],['Aplicação em acordes','Dórico sobre m7, frígio sobre m7 também (depende do contexto)','p.86-87'],['Improvisar modalmente','Praticar sobre um acorde estático de Dm7 com dórico','p.88']],tip:'Lídio sobre maj7 é lindo. Ouça músicas de Chick Corea, Herbie Hancock.'},{n:'Dia 20',off:true},{n:'Dia 21',b:'bm',bl:'Modos',t:'45 min',warm:'Todos os 7 modos da escala maior em C (começando em C, D, E, F, G, A, B)',sess:[['Mixolídio e eólio','Mixolídio: maior com ♭7 (escala do dominante). Eólio: menor natural','p.89-90'],['Lócrio','Meio-diminuto. Raramente usado como tônico','p.91'],['Quadro geral dos 7 modos','Jônico, dórico, frígio, lídio, mixolídio, eólio, lócrio','p.92']],tip:'Decore a ordem e as características. Isso é linguagem universal do jazz.'},{n:'Dia 22',b:'bm',bl:'Modos',t:'45 min',warm:'Escolha 3 modos e improvise 2 minutos em cada',sess:[['Modos da menor harmônica','7 modos, ênfase no 5º (frígio dominante)','p.93-94'],['Modos da menor melódica','Lídio ♭7, lócrio ♯2, alterada, lídia aumentada...','p.95-96'],['Uso em progressões','Quando usar cada modo','p.97']],tip:'Modos da menor melódica são avançados. Não force, deixe maturar.'},{n:'Dia 23',b:'bm',bl:'Modos',t:'45 min',warm:'Tocar escala alterada (7º modo da menor melódica)',sess:[['Consolidação modal','Refazer todos os exercícios modais','p.79-97'],['Teste de identificação','Ouvir e nomear o modo','p.98'],['Análise de solos modais','Miles Davis, John Coltrane — Kind of Blue, Impressions','p.99']],tip:'Ouça Kind of Blue umas 50 vezes. Sério.',quiz:true},{n:'Dia 24',off:true}]},s5:{label:'Semanas 15–20 · Revisão e integração',sub:'Consolidação total',days:[{n:'Dia 25',b:'br',bl:'Revisão',t:'50 min',warm:'Livre: escolha 3 conceitos do livro e pratique',sess:[['Progressões de jazz','ii-V-I em todas as tonalidades, com arpejos e escalas','p.100-101'],['Análise de standards','Autumn Leaves, All The Things You Are','p.102-103'],['Transcrição de solos','Escolha um solo curto e transcreva','p.104']],tip:'Transcrição é a melhor forma de aprender. Tire de ouvido, sem tabs.'},{n:'Dia 26',b:'br',bl:'Revisão',t:'50 min',warm:'Tocar todas as tétrades de uma tonalidade com arpejos',sess:[['Superposição avançada','Arpejos dissonantes sobre acordes estáticos','p.105-106'],['Substituição tritonal','Trocar V7 por ♭II7','p.107-108'],['Rearmonização básica','Adicionar acordes de passagem','p.109']],tip:'Rearmonização vem depois de dominar o básico. Não pule etapas.'},{n:'Dia 27',off:true},{n:'Dia 28',b:'br',bl:'Revisão',t:'50 min',warm:'Improvisação livre sobre backing de jazz',sess:[['Aplicação em repertório','Tocar 5 músicas aplicando tudo','p.110-111'],['Gravação e autoavaliação','Grave sua improvisação e ouça criticamente','p.112'],['Identificação de pontos fracos','O que ainda trava? Volte naquilo','p.113']],tip:'Seja honesto na autoavaliação. Melhor voltar agora do que fingir que sabe.'},{n:'Dia 29',b:'br',bl:'Revisão',t:'50 min',warm:'Revisão de tudo: acordes, arpejos, escalas, modos',sess:[['Integração total','Tocar uma progressão usando todos os conceitos','p.114-115'],['Criação de linhas','Compor uma melodia aplicando arpejos + escalas + modos','p.116'],['Teste final de prontidão','Você domina o conteúdo do livro?','p.117']],tip:'Se chegou até aqui com consistência, você evoluiu MUITO. Parabéns!'},{n:'Dia 30',b:'br',bl:'Revisão',t:'60 min',warm:'Toque sua música favorita aplicando tudo que aprendeu',sess:[['Prova final','Questionário teórico-prático completo','p.118-119'],['Repertório de encerramento','Toque 3 músicas de cor, com improvisação','p.120'],['Planejamento futuro','O que vem depois? Harmonia funcional? Improvisação avançada?','p.121']],tip:'O livro acaba, mas o estudo não. Continue tocando, ouvindo, transcrevendo.',quiz:true}]}};

const QZ={s1:{title:'Prova 1 — Tríades e inversões',sub:'Verifique se você domina a base harmônica antes de avançar para tétrades',mc:[{q:'Qual a fórmula intervalar de uma tríade maior?',opts:['1-2-5','1-3-5','1-♭3-5','1-3-♯5'],ans:1,exp:'Tríade maior: fundamental (1), terça maior (3) e quinta justa (5). A segunda opção está correta.'},{q:'Em que inversão o acorde F/A está?',opts:['Fundamental','Primeira inversão (3ª no baixo)','Segunda inversão (5ª no baixo)','Terceira inversão'],ans:1,exp:'F/A tem a nota A (lá) no baixo. A é a terça de F (fá-lá-dó), logo está na primeira inversão.'},{q:'Qual acorde do campo harmônico maior é diminuto?',opts:['I','ii','V','vii°'],ans:3,exp:'O sétimo grau (vii°) é o único acorde diminuto no campo harmônico maior. Ex: B° em C maior.'},{q:'Qual a diferença entre tríade maior e menor?',opts:['A quinta é diferente','A terça é menor na tríade menor','A fundamental muda','Não há diferença'],ans:1,exp:'A tríade menor tem terça menor (♭3) em vez de terça maior. A quinta continua justa.'},{q:'Quantas inversões possui uma tríade?',opts:['1','2','3','4'],ans:1,exp:'Tríade tem 3 notas, logo 2 inversões: 1ª (terça no baixo) e 2ª (quinta no baixo), além da posição fundamental.'}],prat:[{q:'Toque a tríade de G maior em 3 inversões diferentes',crit:['Fundamental: G-B-D','1ª inversão: B-D-G','2ª inversão: D-G-B']},{q:'Toque o campo harmônico de C maior só com tríades (I ao vii°)',crit:['C, Dm, Em, F, G, Am, B°','Sem errar nenhuma nota','Conseguir tocar de memória']},{q:'Escolha uma música simples e toque usando apenas tríades e inversões',crit:['Escolher inversões que conectem suavemente','Não precisar olhar cifra','Soar musical, não mecânico']}]},s2:{title:'Prova 2 — Tétrades e cifragem',sub:'Consolide acordes com sétima antes de partir para arpejos',mc:[{q:'Qual a diferença entre Cmaj7 e C7?',opts:['Não há diferença','Cmaj7 tem 7ª maior, C7 tem 7ª menor','Cmaj7 é menor, C7 é maior','C7 tem a quinta aumentada'],ans:1,exp:'Cmaj7 = C-E-G-B (7ª maior). C7 = C-E-G-B♭ (7ª menor). Essa é a diferença crucial.'},{q:'Qual a função harmônica típica do acorde V7?',opts:['Tônica','Subdominante','Dominante (tensão que resolve na tônica)','Relativa menor'],ans:2,exp:'V7 é o acorde dominante. Ele cria tensão (pelo trítono entre 3ª e 7ª) e quer resolver no I.'},{q:'Qual acorde aparece no 7º grau do campo harmônico maior?',opts:['m7','maj7','7','m7♭5'],ans:3,exp:'Bm7♭5 em C maior. Também chamado de meio-diminuto (ø). Fórmula: 1-♭3-♭5-♭7.'},{q:'O que significa o símbolo "ø" em um acorde?',opts:['Diminuto','Meio-diminuto (m7♭5)','Aumentado','Menor com 7ª maior'],ans:1,exp:'ø = meio-diminuto = m7♭5. Não confundir com ° (diminuto, que tem 7ª diminuta).'},{q:'Qual o campo harmônico de C maior em tétrades?',opts:['Cmaj7-Dm7-Em7-Fmaj7-G7-Am7-Bm7♭5','C7-Dm7-Em7-F7-G7-Am7-Bm7','Cmaj7-Dm7-E7-Fmaj7-Gm7-Am7-B7','C-Dm-Em-F-G-Am-Bdim'],ans:0,exp:'Padrão: Imaj7 - iim7 - iiim7 - IVmaj7 - V7 - vim7 - viim7♭5. Decore isso!'}],prat:[{q:'Toque a progressão ii-V-I (Dm7-G7-Cmaj7) em 5 tonalidades diferentes',crit:['Sem consultar','Usando inversões','Transição suave entre tonalidades']},{q:'Leia uma lead sheet cifrada e toque os acordes sem preparação prévia',crit:['Identificar rapidamente a qualidade de cada acorde','Não confundir maj7 com 7','Manter o tempo']},{q:'Grave você tocando um ii-V-I e ouça: está limpo? As notas soam juntas?',crit:['Sem notas abafadas','Ritmo estável','Som equilibrado entre as cordas']}]},s3:{title:'Prova 3 — Arpejos e escalas básicas',sub:'Certifique-se de que consegue improvisar sobre acordes com arpejos e escalas',mc:[{q:'O que é um arpejo?',opts:['Um acorde tocado com todas as notas ao mesmo tempo','As notas de um acorde tocadas separadamente','Uma escala tocada rapidamente','Uma progressão de acordes'],ans:1,exp:'Arpejo = acorde quebrado. Você toca as notas separadas, em sequência, não simultaneamente.'},{q:'Qual escala usar sobre um acorde Dm7 em contexto de ii-V-I em C maior?',opts:['D menor harmônica','D dórico (notas de C maior começando em D)','D frígio','D menor melódica'],ans:1,exp:'Sobre iim7, use dórico (relativo da escala maior da tonalidade). D dórico = notas de C maior.'},{q:'Qual a fórmula da escala menor harmônica?',opts:['T-sT-T-T-sT-T-T','T-T-sT-T-T-T-sT','T-sT-T-T-sT-T+sT-sT','1-2-♭3-4-5-♭6-7'],ans:3,exp:'Menor harmônica = menor natural com ♯7. Fórmula: 1-2-♭3-4-5-♭6-7. Intervalo de 1 tom e meio entre ♭6 e 7.'},{q:'O que significa "superposição de arpejos"?',opts:['Tocar dois arpejos ao mesmo tempo','Tocar um arpejo diferente do acorde de base para criar tensões','Tocar arpejos em oitavas diferentes','Substituir acordes por arpejos'],ans:1,exp:'Ex: tocar arpejo de Em sobre Cmaj7 cria as tensões 9ª (E) e 13ª (A). É uma técnica de cor harmônica.'},{q:'Quantas posições (digitações) da escala maior você deve conhecer?',opts:['1','3','5 ou 7','12'],ans:2,exp:'Padrão CAGED dá 5 posições. Sistema 3NPS dá 7. O importante é cobrir o braço inteiro.'}],prat:[{q:'Improvise sobre uma base de Cmaj7 usando APENAS o arpejo de Cmaj7',crit:['Não sair das notas do acorde','Criar frases musicais (não só subir e descer)','Variar o ritmo']},{q:'Toque as 5 posições da escala de G maior cobrindo todo o braço',crit:['Sem gaps (buracos) entre as posições','Memorizadas, sem olhar diagrama','Fluência ao transitar entre posições']},{q:'Sobre uma base de ii-V-I em C, improvise usando arpejos + escala maior',crit:['Arpejo de Dm7 sobre Dm7, G7 sobre G7, Cmaj7 sobre Cmaj7','Conectar as frases','Resolver no Cmaj7 de forma convincente']}]},s4:{title:'Prova 4 — Modos e aplicação modal',sub:'Domine o pensamento modal antes de partir para a revisão final',mc:[{q:'O que é um modo?',opts:['Uma escala diferente da maior','Uma escala maior começando em graus diferentes','Um tipo de acorde','Uma técnica de improvisação'],ans:1,exp:'Modo = escala maior (ou outra escala-mãe) começando em outra nota. Mesmas notas, tônica diferente.'},{q:'Qual modo usar sobre um acorde Dm7 em contexto modal (não ii-V-I)?',opts:['D dórico','D eólio','D frígio','Qualquer um, depende da vibe'],ans:3,exp:'Todos são menores. Dórico (6ª maior) é o mais comum, mas eólio e frígio também cabem. Contexto manda!'},{q:'Qual o modo do 4º grau da escala maior?',opts:['Jônico','Dórico','Lídio','Mixolídio'],ans:2,exp:'Ordem: jônico (I), dórico (II), frígio (III), lídio (IV), mixolídio (V), eólio (VI), lócrio (VII).'},{q:'Qual a nota característica do modo lídio?',opts:['♭3','♯4','♭7','7'],ans:1,exp:'Lídio = maior com ♯4. Som "flutuante", muito usado em acordes maj7 e composições modais.'},{q:'Qual escala é o 7º modo da menor melódica?',opts:['Lídio ♭7','Alterada (super lócrio)','Dórico ♭2','Mixolídio ♭13'],ans:1,exp:'Escala alterada = 7º modo da menor melódica. Todas as tensões alteradas: ♭9, ♯9, ♯11, ♭13. Usada sobre dominantes alterados.'}],prat:[{q:'Improvise 2 minutos sobre um Dm7 estático usando D dórico',crit:['Enfatizar a 6ª maior (nota B) que caracteriza o dórico','Criar frases, não escalas mecânicas','Variar registro (grave, médio, agudo)']},{q:'Toque os 7 modos da escala de C maior (C jônico, D dórico, E frígio...)',crit:['Nomear cada modo corretamente','Tocar em pelo menos 2 posições diferentes','Ouvir a "personalidade" de cada um']},{q:'Analise um solo de Miles Davis (Kind of Blue) e identifique os modos usados',crit:['Conseguir nomear o modo de cada seção','Perceber quando ele muda de centro tonal','Entender a relação modo-acorde']}]},s5:{title:'Exame Final — 20 Semanas Completas',sub:'Avaliação integral: você domina acordes, arpejos, escalas, modos, fraseado e integração?',mc:[{q:'Qual é a diferença fundamental entre um acorde maior (Cmaj7) e um acorde menor (Cm7)?',opts:['Não há diferença; são apenas nomes','A terça do acorde: maior (4 semitons) vs. menor (3 semitons)','O acorde menor sempre é usado em música triste','A diferença é apenas rítmica'],ans:1,exp:'A terça determina se um acorde é maior ou menor. Esta é a distinção fundamental.'},{q:'Em um improviso rápido em uma progressão ii-V-I, qual ferramenta geralmente oferece mais fluência?',opts:['Acordes (são mais fáceis de pensar)','Arpejos ou escalas que permitem movimento contínuo','Qual não importa; resultado é sempre o mesmo','Nenhuma funciona em tempo rápido'],ans:1,exp:'Tempo rápido requer continuidade. Escalas e arpejos permitem isso melhor que mudanças de acorde.'},{q:'Qual modo menor você usaria para um acorde Cm7♭5 (half-diminished)?',opts:['Menor natural','Menor harmônica','Dórico (que é um menor com ♭3 e ♭7, ♮6)','Qualquer um funciona igualmente'],ans:2,exp:'Cm7♭5 é um acorde Dórico. Dórico é o ii em uma progressão e oferece as cores corretas.'},{q:'O que define uma frase musical bem-estruturada?',opts:['Apenas quantidade de notas','Anacrusas, landing notes, respiration, e estrutura clara de pergunta-resposta','Sempre começar em registro alto','Não há critério específico'],ans:1,exp:'Boa estrutura de frase tem os elementos mencionados e cria uma narrativa clara.'},{q:'Em uma análise de um solo de jazz, o que você está tentando descobrir?',opts:['Apenas as notas altas (registros agudos)','Como o improvisador estrutura ideias, usa ferramentas, cria narrativa e mantém coerência musical','A velocidade (BPM) do solo','Quantas vezes ele toca a fundamental do acorde'],ans:1,exp:'Análise efetiva revela processo de pensamento e técnicas musicais.'},{q:'Qual é a estrutura ideal de um solo completo de jazz?',opts:['Sempre rápido e denso','Introdução → Desenvolvimento → Climax → Resolução','Uma única ideia repetida 12 vezes','Não há estrutura padrão; totalmente aleatório'],ans:1,exp:'Estrutura clássica cria narrativa e satisfação musical.'},{q:'Por que breathing space (pausas) é importante em fraseado?',opts:['Torna a música mais lenta','Permite ao ouvinte processar e antecipa o próximo movimento','Indica falta de habilidade','Não tem função específica'],ans:1,exp:'Silêncios são tão musicais quanto notas. Criam expectativa e respiração.'},{q:'Em uma reharmonização de um ii-V-I simples, qual técnica adiciona complexity?',opts:['Remover acordes','Adicionar secondary dominants (ex: V/ii antes do ii)','Sempre usar o mesmo acorde','Ignorar a harmonia original'],ans:1,exp:'Secondary dominants enriquecem harmonia mantendo clareza funcional.'},{q:'Qual é a diferença entre praticar consciente vs. automático?',opts:['Não há diferença','Consciente = pensar em teoria; Automático = reflexos desenvolvidos permitem focar em musicality','Automático é sempre melhor','Consciente é sempre melhor'],ans:1,exp:'Objetivo é internalizar teoria para que se torne automática, liberando mente para musicality.'},{q:'Ao final de 20 semanas, qual é o teste definitivo de seu progresso?',opts:['Quantas escalas você consegue tocar','Se você soa bem musicalmente; se a teoria se tornou parte invisível da sua expressão','Velocidade em BPM','Perfeição técnica sem erros'],ans:1,exp:'Teste final é simples: você faz música que é bonita e expressiva? Se sim, você aprendeu o essencial.'}],prat:[{q:'Improvisar solo de MÍNIMO 4 voltas demonstrando competência em acordes, arpejos, escalas, modos',crit:['Estrutura clara (intro → desenvolvimento → climax → resolução)','Fraseado maturo (anacrusas, landing notes, breathing space)','Motivos que são desenvolvidos e variados','Escolhas harmônicas conscientes','Musicality que supera técnica pura']},{q:'Compor peça original de MÍNIMO 48 compassos com melodia, harmonia, contracanto e reharmonização',crit:['Melodia principal clara e memorável','Harmonia coerente sem progressões aleatórias','Contracanto ou segunda linha harmônica','Uso de reharmonização em pelo menos uma seção','Forma clara (ABA, AABA, ou similar)']},{q:'Análise reflexiva escrita: Como você evoluiu de Dia 1 até Dia 100? Qual é o próximo passo?',crit:['Reflexão honesta sobre evolução','Identificação de áreas onde se sente confiante','Plano específico para próximos estudos','Entendimento de como teoria se tornou automática']}]}};;

const CHECKS={f1:{label:'Pronto para sair das tríades?',badge:'ba',items:[['Toco qualquer tríade (maior, menor, dim, aug) em qualquer região do braço','Sem olhar diagrama, apenas pensando nas notas'],['Conheço as 3 inversões de cada tríade e sei nomeá-las','Fundamental, 1ª inversão (3ª no baixo), 2ª inversão (5ª no baixo)'],['Toco o campo harmônico maior em tríades de memória','I-ii-iii-IV-V-vi-vii° em pelo menos 2 tonalidades'],['Consigo encadear tríades com inversões de forma musical','Transições suaves, sem "pulos" bruscos'],['Identifico tríades de ouvido (maior vs menor vs dim vs aug)','Ouço um acorde e sei dizer qual é']],warn:'⚠️ Se você não marcou todos, NÃO avance. Tétrades dependem de tríades sólidas.',ok:'✅ Excelente! Você tem a base. Pode avançar para tétrades com confiança.'},f2:{label:'Pronto para partir para arpejos?',badge:'ba',items:[['Toco tétrades (maj7, m7, 7, m7♭5) em várias regiões do braço','Pelo menos 3 digitações diferentes de cada'],['Conheço o campo harmônico maior em tétrades de cor','Imaj7-iim7-iiim7-IVmaj7-V7-vim7-viim7♭5'],['Leio cifragem moderna sem hesitar','Não confundo C7 com Cmaj7, sei o que é Cø, C°, etc.'],['Toco progressões ii-V-I em pelo menos 5 tonalidades','Sem consultar, com fluidez'],['Analiso músicas reais e identifico a qualidade de cada acorde','Pego um standard e cifro corretamente']],warn:'⚠️ Arpejos são acordes "quebrados". Se você não domina os acordes, não conseguirá usá-los melodicamente.',ok:'✅ Parabéns! Agora você pode começar a tocar esses acordes como linhas melódicas.'},f3:{label:'Pronto para mergulhar em modos?',badge:'be',items:[['Improviso sobre acordes estáticos usando arpejos','Ex: 2 minutos sobre Cmaj7 só com arpejo de Cmaj7, criando frases'],['Conheço as 5 (ou 7) posições da escala maior','Cubro o braço inteiro, sem "buracos"'],['Sei qual escala usar sobre cada acorde do campo harmônico','Dórico no iim7, mixo no V7, jônico no Imaj7...'],['Toco as 3 escalas menores (natural, harmônica, melódica)','Em várias tonalidades, sem olhar'],['Uso superposição de arpejos para criar tensões','Ex: Em sobre Cmaj7, Am sobre Fmaj7']],warn:'⚠️ Modos exigem que você já domine escalas e arpejos. Não pule.',ok:'✅ Você está pronto para entender os modos como "universos sonoros", não só padrões.'},f4:{label:'Pronto para integração final?',badge:'bm',items:[['Nomeio e toco os 7 modos da escala maior','Jônico, dórico, frígio, lídio, mixo, eólio, lócrio'],['Sei qual modo usar sobre cada acorde em contexto modal','Dórico ou eólio sobre m7? Depende da vibe!'],['Conheço os modos da menor harmônica e menor melódica','Pelo menos os principais: frígio dominante, alterada, lídio ♭7...'],['Improviso modalmente sobre um acorde estático','Ex: Dm7 por 5 minutos, explorando dórico sem sair'],['Analiso solos modais (Miles Davis, Coltrane) e identifico os modos','Ouço e reconheço: "isso é dórico", "isso é mixo"...'],['Aplico modos em repertório real','Toco standards e escolho conscientemente qual modo usar']],warn:'',ok:'✅ Perfeito! Você domina o livro. Agora é aplicar em música de verdade e continuar evoluindo.'}};

let ans={},rev={};

function buildQuiz(k){
  const q=QZ[k];
  const mc=q.mc.map((m,i)=>`
    <div>
      <div class="q-num">Questão ${i+1}</div>
      <div class="q-text">${m.q}</div>
      <div class="opts" id="opts-${k}-${i}">
        ${m.opts.map((o,j)=>`<div class="opt" id="opt-${k}-${i}-${j}" onclick="pick('${k}',${i},${j})">
          <span class="opt-letter">${String.fromCharCode(65+j)}</span>
          <span class="opt-text">${o}</span>
        </div>`).join('')}
      </div>
      <div class="exp" id="exp-${k}-${i}">${m.exp}</div>
    </div>
  `).join('<div class="divider"></div>');
  const prat=q.prat.map((p,i)=>`
    <div class="prat-block">
      <div class="prat-label">Questão prática ${i+1}</div>
      <div class="prat-text">${p.q}</div>
      <div class="crit-block">
        <div class="crit-label">Critérios de avaliação</div>
        <div class="crit-text">${p.crit.map(c=>'• '+c).join('<br>')}</div>
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

function buildDay(day, qk){
  if(day.off) return `<div class="off-day">🌙 ${day.n} — dia livre</div>`;
  const sesHtml=day.sess.map(s=>`<div class="session">
    <div class="session-title">${s[0]}</div>
    <div class="session-desc">${s[1]}</div>
    <div class="session-page">📖 ${s[2]}</div>
  </div>`).join('');
  return `<div class="card">
    <div class="card-header">
      <span class="card-title">${day.n}</span>
      <span class="badge ${day.b}">${day.bl}</span>
      <span class="time-badge">⏱ ${day.t}</span>
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

function buildWeek(k){
  const w=WEEKS[k];
  const div=document.getElementById('tab-'+k);
  div.innerHTML=`
    <h2 class="section-title">${w.label}</h2>
    <p class="section-sub" style="margin-bottom:1.5rem">${w.sub} &nbsp;·&nbsp; Sábado e domingo livres</p>
    ${w.days.map(d=>buildDay(d,k)).join('')}
  `;
}

function buildChecks(){
  const div=document.getElementById('tab-check');
  div.innerHTML=`
    <h2 class="section-title">Checklists de prontidão</h2>
    <p class="section-sub">Marque cada item apenas quando conseguir fazer sem consultar o livro e sem errar.</p>
    ${Object.entries(CHECKS).map(([k,ph])=>`
      <div class="card">
        <div class="card-header">
          <span class="card-title">${ph.label}</span>
          <span class="badge ${ph.badge}">Pronto para avançar quando...</span>
        </div>
        <div>${ph.items.map((it,i)=>`
          <div class="checklist-item">
            <div class="chk" id="chk-${k}-${i}" onclick="toggleChk('${k}',${i})">✓</div>
            <div>
              <div class="chk-text">${it[0]}</div>
              <div class="chk-desc">${it[1]}</div>
            </div>
          </div>`).join('')}
        </div>
        <div class="prog-wrap">
          <div class="prog-bar"><div class="prog-fill" id="pbar-${k}"></div></div>
          <span class="prog-cnt" id="pcnt-${k}">0 de ${ph.items.length}</span>
        </div>
        ${ph.warn?`<div class="warn-box">${ph.warn}</div>`:''}
        <div class="ok-box" id="okbox-${k}">${ph.ok}</div>
      </div>
    `).join('')}
  `;
}

function pick(k,qi,oi){
  if(rev[k])return;
  if(!ans[k])ans[k]={};
  ans[k][qi]=oi;
  document.querySelectorAll(`#opts-${k}-${qi} .opt`).forEach(e=>e.classList.remove('sel'));
  document.getElementById(`opt-${k}-${qi}-${oi}`).classList.add('sel');
}

function chk(k){
  const q=QZ[k]; let c=0;
  q.mc.forEach((m,i)=>{
    const ch=ans[k]?ans[k][i]:undefined;
    m.opts.forEach((_,j)=>{
      const el=document.getElementById(`opt-${k}-${i}-${j}`);
      el.classList.remove('sel','ok','no');
      if(j===m.ans)el.classList.add('ok');
      else if(j===ch&&ch!==m.ans)el.classList.add('no');
    });
    document.getElementById(`exp-${k}-${i}`).style.display='block';
    if(ch===m.ans)c++;
  });
  const msgs=['Revise o material antes de avançar.','Releia os trechos que errou.','Razoável — foque nos pontos que erraste.','Muito bem! Quase lá.','Excelente! Pode avançar com confiança.'];
  const mi=c===5?4:c===4?3:c===3?2:c<=1?0:1;
  document.getElementById(`sn-${k}`).textContent=`${c} de ${q.mc.length} corretas (${Math.round(c/q.mc.length*100)}%)`;
  document.getElementById(`sm-${k}`).textContent=msgs[mi];
  document.getElementById(`sc-${k}`).style.display='block';
  rev[k]=true;
}

function rst(k){
  if(ans[k])ans[k]={};
  rev[k]=false;
  buildWeek(k);
}

function toggleChk(ph,i){
  const el=document.getElementById(`chk-${ph}-${i}`);
  el.classList.toggle('done');
  const total=CHECKS[ph].items.length;
  const done=CHECKS[ph].items.filter((_,j)=>document.getElementById(`chk-${ph}-${j}`)?.classList.contains('done')).length;
  document.getElementById(`pbar-${ph}`).style.width=Math.round(done/total*100)+'%';
  document.getElementById(`pcnt-${ph}`).textContent=`${done} de ${total}`;
  const thr=ph==='f4'?total:total-1;
  document.getElementById(`okbox-${ph}`).style.display=done>=thr?'block':'none';
}

const TAB_IDS=['mapa','f1','f1b','f2','f3','f4','check'];

function showTab(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  document.querySelector(`.tab[data-tab="${id}"]`).classList.add('active');

  // Scroll a aba ativa para o centro no mobile
  const activeTab = document.querySelector(`.tab[data-tab="${id}"]`);
  const tabsContainer = document.getElementById('tabsContainer');
  if(activeTab && tabsContainer) {
    const tabRect = activeTab.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();
    const scrollLeft = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
    tabsContainer.scrollTo({left: scrollLeft, behavior: 'smooth'});
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

  // Inicializa as semanas e checklists
  ['f1','f1b','f2','f3','f4'].forEach(k=>buildWeek(k));
  buildChecks();
});
