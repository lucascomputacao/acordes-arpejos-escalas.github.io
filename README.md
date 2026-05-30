# Acordes, Arpejos e Escalas | Chords, Arpeggios and Scales

Um projeto abrangente de aprendizado de música interativo, baseado no livro _"Acordes, Arpejos e Escalas"_ de Nelson Faria (Lumiar Editora).

A comprehensive interactive music learning project based on the book _"Chords, Arpeggios and Scales"_ by Nelson Faria (Lumiar Editora).

🎸 **[Explore o Chord Atlas](./chord-atlas/)** | **[Explore Chord Atlas](./chord-atlas/)** — Ferramenta interativa para explorar acordes, arpejos, escalas e modos na guitarra. | Interactive tool to explore chords, arpeggios, scales and modes on guitar.

---

## 📋 Visão Geral | Overview

### Português 🇧🇷

Este repositório contém:

1. **Plano de Estudos Personalizado** (`index.html`) — Um aplicativo web com 20 semanas de estudo estruturado cobrindo acordes, escalas, arpejos e fraseado
2. **Chord Atlas** (`chord-atlas/`) — Uma ferramenta educacional interativa para exploração avançada de acordes, arpejos, escalas, modos e campos harmônicos

### English 🇺🇸

This repository contains:

1. **Personalized Study Plan** (`index.html`) — A web application with 20 weeks of structured study covering chords, scales, arpeggios and phrasing
2. **Chord Atlas** (`chord-atlas/`) — An interactive educational tool for advanced exploration of chords, arpeggios, scales, modes and harmonic fields

---

## 🎯 Componentes Principais | Main Components

### 1. Plano de Estudos | Study Plan (`index.html`)

#### Português

Um programa de 20 semanas com 5 dias de estudo semanal, aproximadamente 30 minutos por sessão.

**Fases:**
- **Fase 1: Acordes** — Fundamentação em tríades e tétrades
  - Parte A: Acordes básicos (maiores, menores, dominantes, diminutos)
  - Parte B: Acordes com extensões (sexta, nona, décima primeira)
- **Fase 2: Escalas** — Modos e campos harmônicos
- **Fase 3: Arpejos** — Padrões e técnicas
- **Fase 4: Fraseado** — Aplicação musical prática

**Recursos:**
- Progress tracking (0-100 dias)
- Checklists de conclusão para cada fase
- Diagramas visuais de acordes em SVG
- Síntese de áudio interativa (Tone.js)
- Responsivo para desktop e mobile

#### English

A 20-week program with 5 study days per week, approximately 30 minutes per session.

**Phases:**
- **Phase 1: Chords** — Foundation in triads and tetrads
  - Part A: Basic chords (major, minor, dominant, diminished)
  - Part B: Chords with extensions (sixth, ninth, eleventh)
- **Phase 2: Scales** — Modes and harmonic fields
- **Phase 3: Arpeggios** — Patterns and techniques
- **Phase 4: Phrasing** — Practical musical application

**Features:**
- Progress tracking (0-100 days)
- Completion checklists for each phase
- Visual chord diagrams in SVG
- Interactive audio synthesis (Tone.js)
- Responsive for desktop and mobile

---

### 2. Chord Atlas (`chord-atlas/`)

#### Português

Uma ferramenta de educação musical avançada e interativa.

**Características principais:**
- 13 tipos de acordes
- 11 padrões de arpejos com 5 posições regionais
- 11+ escalas e modos (diatônicos, harmônicos, melódicos)
- 4 campos harmônicos (Maior, Menor Natural, Menor Harmônico, Menor Melódico)
- Análise de voice leading para transições suaves
- Sugestões de escala/acorde compatíveis
- Diagramas interativos SVG clicáveis
- Playback de áudio com Tone.js ou samples
- Suporte bilingue (Português e Inglês)
- Deep linking via hash URL para compartilhamento
- Exportação em SVG, PNG e impressão

**[Leia a documentação completa do Chord Atlas](./chord-atlas/README.md)**

#### English

An advanced and interactive music education tool.

**Key Features:**
- 13 chord types
- 11 arpeggio patterns with 5 regional positions
- 11+ scales and modes (diatonic, harmonic, melodic)
- 4 harmonic fields (Major, Natural Minor, Harmonic Minor, Melodic Minor)
- Voice leading analysis for smooth transitions
- Compatible scale/chord suggestions
- Interactive clickable SVG diagrams
- Audio playback with Tone.js or samples
- Bilingual support (Portuguese and English)
- Deep linking via hash URL for sharing
- Export to SVG, PNG and print

**[Read the complete Chord Atlas documentation](./chord-atlas/README.md)**

---

## 🚀 Como Começar | Getting Started

### Requisitos | Requirements
- Navegador moderno com suporte a Web Audio API (Chrome, Firefox, Safari, Edge)
- Node.js (apenas para testes)

| Portuguese | English |
|-----------|---------|
| Navegador moderno com suporte a Web Audio API (Chrome, Firefox, Safari, Edge) | Modern browser with Web Audio API support (Chrome, Firefox, Safari, Edge) |
| Node.js (apenas para testes) | Node.js (only for testing) |

### Instalação | Installation

```bash
# Clone o repositório | Clone the repository
git clone https://github.com/lucascomputacao/acordes-arpejos-escalas.git
cd acordes-arpejos-escalas

# Instale dependências (opcional, apenas para testes) | Install dependencies (optional, only for testing)
npm install
```

### Usar Localmente | Use Locally

#### Opção 1: Plano de Estudos | Option 1: Study Plan
```bash
# Abra em seu navegador | Open in your browser
open index.html
# ou | or simply open index.html in your favorite browser
```

#### Opção 2: Chord Atlas
```bash
# Navegue até o diretório | Navigate to the directory
cd chord-atlas

# Abra em seu navegador | Open in your browser
open index.html
```

#### Opção 3: Servir localmente com Python | Option 3: Serve locally with Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Depois acesse | Then access: http://localhost:8000
```

---

## 📁 Estrutura do Projeto | Project Structure

```
acordes-arpejos-escalas/
├── index.html                    # Plano de estudos personalizado | Study plan
├── css/
│   └── styles.css               # Estilos do plano de estudos | Study plan styles
├── js/                          # Scripts JavaScript do plano | Study plan scripts
│
├── chord-atlas/                 # Ferramenta interativa avançada | Advanced interactive tool
│   ├── index.html               # Entrada do Chord Atlas | Chord Atlas entry
│   ├── app.js                   # Roteamento e gerenciamento de estado | Routing & state management
│   ├── music-engine.js          # Biblioteca de acordes/escalas/arpejos | Chord/scale/arpeggio library
│   ├── renderer.js              # Geração de diagramas SVG | SVG diagram generation
│   ├── i18n.js                  # Internacionalização (PT/EN) | Internationalization (PT/EN)
│   ├── styles.css               # Estilos do Chord Atlas | Chord Atlas styles
│   ├── audio-engine.js          # Interface de áudio abstrata | Abstract audio interface
│   ├── audio-engine-tonejs.js   # Motor de síntese Tone.js | Tone.js synthesis engine
│   ├── audio-engine-samples.js  # Motor de samples de guitarra | Guitar sample engine
│   ├── diagram-audio.js         # Integração clique-para-reproduzir | Click-to-play integration
│   ├── interactive-fretboard.js # Manipulador de interação | Interaction handler
│   ├── samples/                 # Arquivos de áudio de guitarra | Guitar audio files
│   ├── tests/                   # Suite de testes abrangente | Comprehensive test suite
│   └── README.md                # Documentação completa | Complete documentation
│
├── images/                      # Imagens do projeto | Project images
├── public/                      # Arquivos públicos | Public files
├── scripts/                     # Scripts utilitários | Utility scripts
├── generate-chords.html/.js     # Gerador de acordes | Chord generator
├── generate_svg_chords.py       # Gerador de acordes em SVG | SVG chord generator
├── package.json                 # Metadados do projeto | Project metadata
└── README.md                    # Este arquivo | This file
```

---

## 🧪 Testes | Testing

### Português

Execute os testes automatizados:

```bash
npm test
```

A suite de testes cobre:
- Geração de arpejos e posicionamento
- Cálculos de campos harmônicos
- Acurácia de diagramas SVG
- Agendamento de áudio
- Filtragem de inversões
- Consistência da biblioteca

Ou abra `chord-atlas/test.html` no navegador para ver a saída dos testes.

### English

Run automated tests:

```bash
npm test
```

The test suite covers:
- Arpeggio generation and positioning
- Harmonic field calculations
- SVG diagram accuracy
- Audio scheduling
- Inversion filtering
- Library consistency

Or open `chord-atlas/test.html` in your browser to see test output.

---

## 🌍 Internacionalização | Internationalization

### Português

Ambos os componentes suportam:
- 🇧🇷 **Português**
- 🇺🇸 **English**

Alterne o idioma usando os botões de idioma no topo da interface.

### English

Both components support:
- 🇧🇷 **Portuguese**
- 🇺🇸 **English**

Toggle language using the language buttons at the top of the interface.

---

## 📚 Tecnologias Utilizadas | Technologies Used

### Frontend
- **HTML5** — Estrutura semântica | Semantic structure
- **CSS3** — Estilos responsivos | Responsive styles
- **JavaScript (Vanilla)** — Sem dependências externas (exceto Tone.js para áudio) | No external dependencies (except Tone.js for audio)
- **SVG** — Diagramas escaláveis e impressíveis | Scalable and printable diagrams

### Bibliotecas | Libraries
- **Tone.js** — Síntese de áudio em navegador | Browser audio synthesis
- **SVGuitar** — Geração de diagramas de guitarra | Guitar diagram generation

### Build & Deploy
- **npm** — Gerenciamento de dependências | Dependency management
- **GitHub Pages** — Hospedagem estática | Static hosting
- **Deep linking** — Hash URL para bookmarking | Hash URL for bookmarking

---

## 💾 Recursos do Plano de Estudos | Study Plan Features

### Progresso | Progress
- Rastreamento visual de 0-100 dias | Visual tracking of 0-100 days
- Barra de progresso animada | Animated progress bar
- Estatísticas de aulas | Lesson statistics

### Fases de Estudo | Study Phases

#### Fase 1: Acordes | Phase 1: Chords (Semanas 1-6 | Weeks 1-6)
- Acordes básicos maiores/menores | Basic major/minor chords
- Dominantes e diminutos | Dominants and diminished
- Acordes com extensões | Extended chords

#### Fase 2: Escalas | Phase 2: Scales (Semanas 7-11 | Weeks 7-11)
- Escalas maiores | Major scales
- Escalas menores (natural, harmônica, melódica) | Minor scales (natural, harmonic, melodic)
- Modos gregos | Greek modes

#### Fase 3: Arpejos | Phase 3: Arpeggios (Semanas 12-17 | Weeks 12-17)
- Padrões e técnicas | Patterns and techniques
- Voice leading | Voice leading
- Combinações progressivas | Progressive combinations

#### Fase 4: Fraseado | Phase 4: Phrasing (Semanas 18-20 | Weeks 18-20)
- Aplicação musical | Musical application
- Improvisação | Improvisation
- Estudos práticos | Practical studies

### Verificação de Aprendizado | Learning Verification
- 5 avaliações estruturadas | 5 structured assessments
- Checklists por fase | Checklists per phase
- Tabulaturas de exercícios | Exercise tablatures

---

## 🎸 Recursos do Chord Atlas | Chord Atlas Features

### Exploração Interativa | Interactive Exploration
- **Seletor de raiz | Root selector** — C até B (cromático | chromatic)
- **Filtro de estrutura | Structure filter** — Acordes, arpejos, escalas, modos | Chords, arpeggios, scales, modes
- **Intervalo de trastes | Fret range** — Foco em regiões específicas (0-24 trastes | 0-24 frets)
- **Grupos de cordas | String groups** — 2-6 cordas | 2-6 strings
- **Inversões | Inversions** — Todas, apenas raiz, ou selecionadas | All, root only, or selected

### Voice Leading
- Encontre as voicings mais próximas entre dois acordes | Find closest voicings between two chords
- Minimize movimento de dedos | Minimize finger movement
- Visualize mapeamento de intervalos | Visualize interval mapping

### Análise de Acordes | Chord Analysis
- **Extensões disponíveis | Available extensions** — 9ª, 11ª, 13ª | 9th, 11th, 13th
- **Acordes compatíveis | Compatible chords** — Substituições e variações | Substitutions and variations
- **Sugestões de escala | Scale suggestions** — Por que funciona com o acorde selecionado | Why it works with selected chord

### Exportação & Impressão | Export & Print
- **SVG** — Para edição vetorial | For vector editing
- **PNG** — Para compartilhamento | For sharing
- **Print-friendly** — Para criar folhas de prática | To create practice sheets

---

## 🔗 Deep Linking

### Português

O Chord Atlas suporta deep linking via hash URL para compartilhamento e bookmarking:

```
#/category/structure?root=ROOT&minFret=N&maxFret=N&lang=LANG&...
```

**Exemplos:**
- `#/acordes/tetrade-maior-7m?root=F&minFret=5&maxFret=12&lang=pt`
- `#/arpejos/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24`
- `#/escalas/escala-menor-natural?lang=pt&stringGroups=3-4-5-6`

### English

Chord Atlas supports deep linking via hash URL for sharing and bookmarking:

```
#/category/structure?root=ROOT&minFret=N&maxFret=N&lang=LANG&...
```

**Examples:**
- `#/chords/tetrad-major-7m?root=F&minFret=5&maxFret=12&lang=en`
- `#/arpeggios/arpeggio-minor-7-tetrad?root=C&minFret=0&maxFret=24`
- `#/scales/scale-natural-minor?lang=en&stringGroups=3-4-5-6`

---

## 🎵 Motores de Áudio | Audio Engines

### Tone.js (Padrão | Default)
- Síntese em navegador | Browser synthesis
- Funciona offline | Works offline
- Sem necessidade de arquivos de sample | No sample files needed

### Audio Samples
- Samples gravados de guitarra | Recorded guitar samples
- Som mais autêntico | More authentic sound
- Pode ser togglado na interface | Can be toggled in interface

---

## 📖 Documentação Adicional | Additional Documentation

- **[Chord Atlas README](./chord-atlas/README.md)** — Documentação detalhada da ferramenta interativa | Detailed documentation of the interactive tool
- **[Interactive Fretboard Guide](./chord-atlas/INTERACTIVE_FRETBOARD.md)** — Guia avançado de interação | Advanced interaction guide
- **Comentários no código | Code comments** — Explicações técnicas detalhadas | Detailed technical explanations

---

## 🛠️ Customização | Customization

### Adicionar Novos Acordes | Adding New Chords
Edite `chord-atlas/music-engine.js` e adicione à biblioteca | Edit `chord-atlas/music-engine.js` and add to library:

```javascript
LIBRARY['Acordes']['Meu Acorde'] = ['T', '3', '5', 'b7'];
// or
LIBRARY['Chords']['My Chord'] = ['T', '3', '5', 'b7'];
```

### Personalizar Cores | Customize Colors
Edite `chord-atlas/styles.css` para ajustar | Edit `chord-atlas/styles.css` to adjust:
- Cores de notas (raiz vs. tones) | Note colors (root vs. chord tones)
- Cores do braço de guitarra | Fretboard colors
- Temas claros/escuros | Light/dark themes

### Adicionar Novos Idiomas | Add New Languages
Edite `chord-atlas/i18n.js` e adicione traduções ao objeto `I18N` | Edit `chord-atlas/i18n.js` and add translations to `I18N` object.

---

## 🚢 Deploy

### GitHub Pages

#### Português
```bash
# Push para branch gh-pages
git push origin main:gh-pages

# Ou configure em Settings > Pages > Deploy from a branch
```

#### English
```bash
# Push to gh-pages branch
git push origin main:gh-pages

# Or configure in Settings > Pages > Deploy from a branch
```

**Deep linking funciona automaticamente via roteamento por hash | Deep linking works automatically via hash routing.**

### Auto-hospedagem | Self-Hosting
Copie todos os arquivos para um servidor web estático. Não requer build ou código servidor. | Copy all files to a static web server. Requires no build or server-side code.

---

## 📋 Checklist de Recursos | Feature Checklist

- [x] Plano de 20 semanas estruturado | 20-week structured plan
- [x] 13 tipos de acordes | 13 chord types
- [x] 11+ escalas e modos | 11+ scales and modes
- [x] Voice leading analysis | Voice leading analysis
- [x] Síntese de áudio interativa | Interactive audio synthesis
- [x] Suporte bilingue (PT/EN) | Bilingual support (PT/EN)
- [x] Responsivo (desktop/mobile) | Responsive (desktop/mobile)
- [x] Deep linking e bookmarking | Deep linking and bookmarking
- [x] Exportação SVG/PNG | SVG/PNG export
- [x] Print-friendly | Print-friendly
- [x] Suite de testes abrangente | Comprehensive test suite
- [x] Documentação detalhada | Detailed documentation

---

## 🐛 Problemas Conhecidos | Known Issues

- Audio playback requer navegador moderno com Web Audio API | Audio playback requires modern browser with Web Audio API
- Motores de sample requerem arquivos .wav ou .mp3 no diretório `samples/` | Sample engines require .wav or .mp3 files in `samples/` directory
- Dispositivos mobile podem requerer tap-to-start para contexto de áudio | Mobile devices may require tap-to-start for audio context

---

## 🤝 Contribuindo | Contributing

### Português
Para melhorar este projeto:

1. **Reporte bugs** — Descreva a categoria, estrutura e comportamento esperado
2. **Sugira features** — Novos acordes, escalas, exercícios ou melhorias de UI
3. **Melhore traduções** — Adicione novos idiomas
4. **Adicione testes** — Expanda a suite de testes em `tests/`

### English
To improve this project:

1. **Report bugs** — Describe the category, structure, and expected behavior
2. **Suggest features** — New chords, scales, exercises, or UI improvements
3. **Improve translations** — Add new languages
4. **Add tests** — Expand the test suite in `tests/`

---

## 📄 Licença | License

Este projeto é para fins educacionais. Use livremente para aprender e ensinar teoria musical e técnicas de guitarra. | This project is for educational purposes. Use freely to learn and teach music theory and guitar techniques.

---

## 👤 Autor | Author

Desenvolvido por **Lucas Borges** para músicos, estudantes e educadores. | Developed by **Lucas Borges** for musicians, students, and educators.

**Agradecimentos especiais** à comunidade de teoria musical e aos criadores do Tone.js por ferramentas de síntese excelentes. | **Special thanks** to the music theory community and Tone.js creators for excellent synthesis tools.

---

## 💡 Dicas & Truques | Tips & Tricks

### Português
1. **Estreite o intervalo de trastes** (ex: 5-12) para focar em uma região específica
2. **Filtre grupos de cordas** para encontrar voicings para técnicas específicas
3. **Use voice leading** para praticar transições suaves em progressões jazz
4. **Combine escalas + acordes** alternando abas para entender a relação
5. **Deep link e bookmark** suas explorações favoritas
6. **Exporte diagramas** para criar materiais de prática personalizados

### English
1. **Narrow the fret range** (e.g., 5-12) to focus on a specific region
2. **Filter string groups** to find voicings for specific techniques
3. **Use voice leading** to practice smooth transitions in jazz progressions
4. **Combine scales + chords** by toggling tabs to understand the relationship
5. **Deep link and bookmark** your favorite explorations
6. **Export diagrams** to create custom practice materials

---

## 🎓 Usos Educacionais | Educational Use

### Português
Chord Atlas foi projetado para:

- Estudantes de guitarra aprendendo teoria e navegação do braço
- Músicos jazz entendendo voicings e voice leading
- Compositores explorando possibilidades harmônicas
- Professores demonstrando acordes, escalas e progressões
- Trabalho de transcrição entendendo que notas foram tocadas

### English
Chord Atlas was designed for:

- Guitar students learning music theory and fretboard navigation
- Jazz musicians understanding voicings and voice leading
- Composers exploring harmonic possibilities
- Teachers demonstrating chords, scales, and progressions
- Transcription work understanding what notes were played

**Comece: Abra `index.html` ou `chord-atlas/index.html` e explore! | Start: Open `index.html` or `chord-atlas/index.html` and explore!**

---

## 📞 Suporte | Support

### Português
Para dúvidas ou problemas:

1. Leia a documentação neste README
2. Revise `chord-atlas/README.md` para tópicos avançados
3. Explore os arquivos de teste para entender comportamento esperado
4. Inspecione o console do navegador para mensagens de erro

### English
For questions or issues:

1. Read the documentation in this README
2. Review `chord-atlas/README.md` for advanced topics
3. Explore test files to understand expected behavior
4. Inspect the browser console for error messages

---

## 🔗 Links Úteis | Useful Links

- **[GitHub Repository](https://github.com/lucascomputacao/acordes-arpejos-escalas)**
- **[Chord Atlas Live](https://lucascomputacao.github.io/acordes-arpejos-escalas/chord-atlas/)**
- **Livro Original | Original Book:** "Acordes, Arpejos e Escalas" — Nelson Faria (Lumiar Editora)

---

**Aproveite a exploração da teoria musical com Chord Atlas! 🎸 | Enjoy exploring music theory with Chord Atlas! 🎸**
