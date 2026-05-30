# Chord Atlas | Atlas de Acordes

Uma ferramenta interativa abrangente de aprendizado de guitarra para explorar acordes, arpejos, escalas, modos e relacionamentos harmônicos no braço.

A comprehensive, interactive guitar learning tool for exploring chords, arpeggios, scales, modes, and harmonic relationships on the fretboard.

**Demo Ao Vivo | Live Demo:** Abra `index.html` em um navegador moderno | Open `index.html` in a modern web browser.

---

## 📖 Visão Geral | Overview

### Português 🇧🇷

Chord Atlas é uma aplicação de educação musical rica em recursos, projetada para guitarristas que querem compreender:

- **Voicings de acordes** em diferentes grupos de cordas e intervalos de trastes
- **Padrões de arpejos** com cinco posições regionais por estrutura
- **Escalas e modos** (Jônico, Dórico, Frígio, Lídio, Mixolídio, Eólio, Lócrio, Alterado, etc.)
- **Campos harmônicos** (Maior, Menor Natural, Menor Harmônico, Menor Melódico)
- **Voice leading** entre diferentes voicings de acordes para transições suaves
- **Compatibilidade escala/acorde** com sugestões assistidas por IA
- **Modos gregos, modos menores melódicos, escalas simétricas, e campos de estudo pentatônicos/hexatônicos/bebop/quartal**

Todos os voicings são renderizados como diagramas de braço interativos em SVG com notas clicáveis que produzem áudio através de sons de guitarra sintetizados ou amostrados.

### English 🇺🇸

Chord Atlas is a feature-rich music education application designed for guitarists who want to understand:

- **Chord voicings** across different string groups and fret ranges
- **Arpeggio patterns** with five regional positions per structure
- **Scales and modes** (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, Altered, etc.)
- **Harmonic fields** (Major, Natural Minor, Harmonic Minor, Melodic Minor)
- **Voice leading** between different chord voicings for smooth transitions
- **Scale/chord compatibility** with AI-assisted suggestions
- **Greek modes, melodic minor modes, symmetric scales, and pentatonic/hexatonic/bebop/quartal study fields**

All voicings are rendered as interactive SVG fretboard diagrams with clickable notes that produce audio via synthesized or sampled guitar sounds.

---

## ✨ Características | Features

### Diagramas Interativos | Interactive Diagrams
- **Visualização dinâmica do braço** com notas raiz (pontos brancos) e notas de acorde (pontos pretos) | **Dynamic fretboard visualization** with root notes (white dots) and chord tones (black dots)
- **Intervalo de trastes ajustável** para ampliar regiões específicas (0-12, 5-12, 0-24 trastes) | **Adjustable fret range** to zoom into specific regions (0-12, 5-12, 0-24 frets)
- **Seleção de grupo de cordas** para filtrar por número de cordas | **String group selection** to filter by number of strings
- **Filtros de voicing** para mostrar posições ou formas específicas | **Voicing filters** to show specific positions or shapes
- **Áudio clique-para-reproduzir** para cada nota e reprodução completa de arpejos | **Click-to-play audio** for each note and full arpeggio playback

### Conteúdo Musical | Musical Content
- **13 tipos de acordes** (maior, menor, dominante, diminuto, suspenso, sexta, etc.) | **13 chord types** (major, minor, dominant, diminished, suspended, sixth chords, etc.)
- **11 formas de arpejos** com layouts de cinco posições regionais | **11 arpeggio shapes** with five-position regional layouts
- **Múltiplas escalas e modos** com variantes diatônicas, harmônicas e melódicas | **Multiple scales and modes** with diatonic, harmonic, and melodic variants
- **4 modos de campo harmônico** para compreender progressões de acordes | **4 harmonic field modes** for understanding chord progressions
- **Sugestões de escala** baseadas no acorde selecionado (por que funciona com sua estrutura) | **Scale suggestions** based on selected chord (why it works with your structure)
- **Análise de tensão** mostrando extensões de acordes disponíveis (9, 11, 13) | **Tension analysis** showing available chord extensions (9, 11, 13)
- **Localizador de acordes compatíveis** para explorar substituições e variações | **Compatible chord finder** to explore substitutions and variations

### Análise de Voice Leading | Voice Leading Analysis
- Encontre os voicings mais próximos ao fazer transição entre dois acordes | Find the closest voicings when transitioning between two chords
- Minimize o movimento dos dedos para voice leading suave | Minimize finger movement for smooth voice leading
- Compreenda relacionamentos de intervalos entre vozes | Understand interval relationships between voices

### Superposição de Arpejos | Arpeggio Superimposition
- Estude técnicas avançadas de empilhamento e substituição de arpejos | Study advanced arpeggio stacking and substitution techniques
- Veja estudos de arpejos apenas em tablatura (progressões IIm7 - V7 - I7M) | View tablature-only arpeggio studies (IIm7 - V7 - I7M progressions)

### Exercícios | Exercises
- Seção de exercícios dedicada com estudos de arpejos do mundo real | Dedicated exercise section with real-world arpeggio studies
- Formato apenas em tablatura para prática focada | Tab-only format for focused practice

### Internacionalização | Internationalization
- **Suporte bilíngue:** Português e Inglês | **Bilingual support:** Portuguese and English
- Alterne o idioma no topo da interface | Toggle language at the top of the interface
- Todos os rótulos, sugestões e descrições traduzidos | All labels, suggestions, and descriptions translated

### Exportação & Impressão | Export & Print
- **Exportar como SVG** para edição vetorial ou incorporação na web | **Export as SVG** for vector editing or web embedding
- **Exportar como PNG** para compartilhamento ou documentação | **Export as PNG** for sharing or documentation
- **Layout amigável à impressão** para criar folhas de prática | **Print-friendly layout** for creating practice sheets

### Design Responsivo | Responsive Design
- **Navegação em gaveta amigável ao móvel** para telas pequenas | **Mobile-friendly drawer navigation** for small screens
- **Seleção rápida flutuante** para raiz e estrutura (sempre acessível) | **Floating quick-select** for root and structure (always accessible)
- **Barra lateral completa de controles do desktop** com filtragem avançada | **Full desktop controls sidebar** with advanced filtering

### Compatível com GitHub Pages | GitHub Pages Compatible
- **Deep linking via URLs com hash** para estado compartilhável | **Deep linking via hash URLs** for shareable state
- Todas as configurações preservadas na URL para bookmarking ou compartilhamento de links | All settings preserved in the URL for bookmarking or sharing links
- Exemplo: `#/arpejos/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24&lang=pt` | Example: `#/arpeggios/arpeggio-minor-7-tetrad?root=C&minFret=0&maxFret=24&lang=en`

---

## 🚀 Como Usar | How to Use

### Começando | Getting Started

#### Português
1. **Abra o aplicativo:** Abra `index.html` em seu navegador
2. **Selecione uma nota raiz** (C, C#, D, etc.) no seletor de raiz
3. **Escolha uma estrutura** (acorde, arpejos, escala, modo ou campo harmônico)
4. **Ajuste o intervalo de trastes** para focar em uma região específica
5. **Alterne os grupos de cordas** para mostrar/ocultar cordas
6. **Selecione voicings** para filtrar quais posições exibir

#### English
1. **Open the app:** Open `index.html` in your browser
2. **Select a root note** (C, C#, D, etc.) from the root selector
3. **Pick a structure** (chord, arpeggio, scale, mode, or harmonic field)
4. **Adjust the fret range** to focus on a specific region
5. **Toggle string groups** to show/hide strings
6. **Select voicings** to filter which positions to display

### Controles | Controls

| Controle | Português | Control | English |
|---------|-----------|---------|---------|
| **Root** | Escolha o centro tonal (cromático: C a B) | **Root** | Choose the tonal center (chromatic: C to B) |
| **Structure** | Selecione o acorde, arpejos, escala ou campo para explorar | **Structure** | Select the chord, arpeggio, scale, or field to explore |
| **Fret Range** | Ajuste os trastes inicial e final (0-24) | **Fret Range** | Adjust start and end frets (0-24) |
| **String Groups** | Alterne formas de 2-cordas, 3-cordas, 4-cordas, 5-cordas, 6-cordas | **String Groups** | Toggle 2-string, 3-string, 4-string, 5-string, 6-string shapes |
| **Voicings** | Filtre para posições específicas ou mostre tudo | **Voicings** | Filter to specific positions or show all |
| **Scale Suggestions** | Sugestões de IA para escalas/modos que funcionam com o acorde selecionado | **Scale Suggestions** | AI suggestions for scales/modes that work with the selected chord |
| **Available Tensions** | Extensões disponíveis (9, 11, 13) | **Available Tensions** | Extensions available (9, 11, 13) |
| **Compatible Chords** | Voicings alternativos e substituições de acordes | **Compatible Chords** | Alternative voicings and chord substitutions |
| **Voice Leading** | Encontre transições suaves entre dois acordes | **Voice Leading** | Find smooth transitions between two chords |

### Reprodução de Áudio | Audio Playback

#### Português
Clique em qualquer nota no braço para reproduzir. Clique no botão de reprodução em um diagrama para ouvir o arpejos ou acorde completo.

**Motores de áudio:**
- **Tone.js (padrão):** Síntese em navegador com timbre realista de guitarra
- **Amostras de áudio:** Amostras de guitarra gravadas para tom autêntico
- Selecione seu motor preferido ao inicializar

#### English
Click any note on the fretboard to play it. Click the play button on a diagram to hear the entire arpeggio or chord.

**Audio engines:**
- **Tone.js (default):** Browser-based synthesis with realistic guitar timbre
- **Audio samples:** Recorded guitar samples for authentic tone
- Select your preferred engine when initializing

### Voice Leading

#### Português
1. Selecione "Do acorde" (raiz + estrutura)
2. Selecione "Para o acorde" (raiz + estrutura)
3. Clique em "Encontre voicings mais próximos"
4. Veja os dois voicings lado a lado com mapeamentos de intervalos

#### English
1. Select "From chord" (root + structure)
2. Select "To chord" (root + structure)
3. Click "Find closest voicings"
4. View the two voicings side-by-side with interval mappings

### Deep Linking

#### Português
Todo o estado do aplicativo é codificado no hash da URL para compartilhamento fácil:

#### English
All app state is encoded in the URL hash for easy sharing:

```
#/category/structure?root=ROOT&minFret=N&maxFret=N&lang=LANG&stringGroups=A|B|C&voicings=X|Y|Z&vlRootA=...&vlStructA=...
```

**Exemplos | Examples:**
- `#/acordes/tetrade-maior-7m?root=F&minFret=5&maxFret=12&lang=pt`
- `#/arpejos/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24`
- `#/escalas/escala-menor-natural?lang=pt&stringGroups=3-4-5-6`

---

## 📁 Estrutura do Projeto | Project Structure

```
chord-atlas/
├── index.html                    # Página HTML principal | Main HTML entry point
├── app.js                        # Roteamento, gerenciamento de estado | Router, state management
├── music-engine.js               # Biblioteca de acordes/escalas/arpejos | Chord/scale/arpeggio library
├── renderer.js                   # Geração e estilo de diagramas SVG | SVG diagram generation & styling
├── i18n.js                       # Internacionalização (PT/EN) | Internationalization (PT/EN)
├── styles.css                    # Todos os estilos da UI | All UI styling
│
├── Motores de Áudio | Audio Engines
├── audio-engine.js               # Interface de áudio abstrata | Abstract audio interface
├── audio-engine-tonejs.js        # Motor de síntese Tone.js | Tone.js synthesis engine
├── audio-engine-samples.js       # Motor de áudio de guitarra amostrado | Sampled guitar audio engine
├── diagram-audio.js              # Integração clique-para-reproduzir | Click-to-play integration
├── tone.js                       # Biblioteca Tone.js (síntese) | Tone.js library (synthesis)
├── samples/                      # Arquivos de áudio de guitarra | Guitar sample files
│
├── Interface Interativa | Interactive UI
├── interactive-fretboard.js      # Manipulador de interação do braço | Fretboard interaction handler
├── interactive-fretboard-demo.html
├── interactive-fretboard-tonejs-demo.html
├── interactive-fretboard-samples-demo.html
│
├── Documentação | Documentation
├── README.md                     # Este arquivo | This file
├── INTERACTIVE_FRETBOARD.md      # Guia de interação do braço | Fretboard interaction guide
│
├── Testes | Tests
├── tests/                        # Suite de testes abrangente | Comprehensive test suite
│   ├── arpeggios.test.js
│   ├── arpeggio-shapes.test.js
│   ├── harmonic-fields.test.js
│   ├── svg-diagrams.test.js
│   ├── diagram-audio.test.js
│   ├── inversion-filter.test.js
│   ├── library-and-generators.test.js
│   └── comprehensive.test.js
│
├── Configuração | Configuration
├── .claude/                      # Integração Claude Code | Claude Code integration
└── color-review.html             # Teste de esquema de cores | Color scheme testing
```

---

## 🔧 Detalhes Técnicos | Technical Details

### Bibliotecas Centrais | Core Libraries

- **Sem dependências externas** para funcionalidade principal | **No external dependencies** for core functionality
- **Tone.js** (incluído) para síntese de áudio | **Tone.js** (included) for audio synthesis
- **SVG para renderização** (escalável, imprimível, exportável) | **SVG for rendering** (scalable, printable, exportable)

### Motor de Música | Music Engine (`music-engine.js`)

#### Português
O coração da aplicação. Fornece:

- **BIBLIOTECA:** Definições mestras de acordes/arpejos/escalas/modos
  - 13 tipos de acordes
  - 11 formas de arpejos
  - 11+ escalas e modos
  - Geradores de campo harmônico

- **Sistema de intervalos:** Intervalos nomeados (T, b2, 2, b3, 3, 4, #4, 5, b6, 6, b7, 7M, 8)

- **Geradores de voicing:**
  - Formas de grupo de cordas específicas de guitarra (2-6 cordas)
  - Restrições de intervalo de trastes
  - Modos de inversão (apenas posição raiz, todas as inversões, inversões selecionadas)

- **Sugestões de escala e compatibilidade:** Recomendações alimentadas por IA baseadas em relacionamentos de teoria musical

#### English
The heart of the application. Provides:

- **LIBRARY:** Master chord/arpeggio/scale/mode definitions
  - 13 chord types
  - 11 arpeggio shapes
  - 11+ scales and modes
  - Harmonic field generators

- **Interval system:** Named intervals (T, b2, 2, b3, 3, 4, #4, 5, b6, 6, b7, 7M, 8)

- **Voicing generators:**
  - Guitar-specific string group shapes (2-6 strings)
  - Fret range constraints
  - Inversion modes (root position only, all inversions, select inversions)

- **Scale suggestions & compatibility:** AI-powered recommendations based on music theory relationships

### Motor de Renderização | Rendering Engine (`renderer.js`)

#### Português
Gera diagramas SVG com:

- **Grade de braço** (intervalo de trastes customizável)
- **Pontos de notas** (codificados por cor por função: raiz vs. tons de acordes)
- **Zonas interativas** para clique-para-reproduzir
- **Renderização de tablatura** para exercícios
- **Sistema de estilo** para temas claro/escuro

#### English
Generates SVG diagrams with:

- **Fretboard grid** (customizable fret range)
- **Note dots** (color-coded by role: root vs. chord tones)
- **Interactive zones** for click-to-play
- **Tablature rendering** for exercises
- **Styling system** for light/dark themes

### Gerenciamento de Estado | State Management (`app.js`)

- Roteamento baseado em hash para deep linking | Hash-based routing for deep linking
- Sincronização de URL em tempo real para bookmarking/compartilhamento | Real-time URL sync for bookmark/sharing
- Controles da barra lateral com gaveta móvel | Sidebar controls with mobile drawer
- Solver de voice leading | Voice leading solver
- Manipuladores de exportação/impressão | Export/print handlers

### Áudio | Audio (`audio-engine*.js` and `diagram-audio.js`)

- **Interface de áudio modular:** Alterne entre Tone.js e amostras de forma perfeita | **Modular audio interface:** Switch between Tone.js and samples seamlessly
- **Agendamento de áudio:** Escalone ataques de nota para arpejos | **Audio scheduling:** Stagger note onsets for arpeggios
- **Manipuladores de clique:** Converta interações de diagrama em eventos de áudio | **Click handlers:** Convert diagram interactions to audio events

### Internacionalização | Internationalization (`i18n.js`)

- Suporte bilíngue (Português, Inglês) | Bilingual support (Portuguese, English)
- Atributos de dados i18n para elementos DOM | Data-i18n attributes for DOM elements
- Botões de alternância de idioma | Language toggle buttons
- Busca automática de tradução | Automatic translation lookup

---

## 🔊 Motores de Áudio | Audio Engines

### Síntese Tone.js | Tone.js Synthesis (Padrão | Default)

#### Português
Síntese em navegador com timbre realista. Nenhum arquivo de amostra necessário.

**Vantagens:**
- Funciona offline
- Leve
- Parâmetros de síntese personalizáveis

**Como usar:**
```html
<script src="tone.js"></script>
<script src="audio-engine-tonejs.js"></script>
<script src="diagram-audio.js"></script>
```

#### English
Browser-based synthesis with realistic timbre. No sample files needed.

**Advantages:**
- Works offline
- Lightweight
- Customizable synthesis parameters

**How to use:**
```html
<script src="tone.js"></script>
<script src="audio-engine-tonejs.js"></script>
<script src="diagram-audio.js"></script>
```

### Amostras de Áudio | Audio Samples

#### Português
Amostras de guitarra pré-gravadas para tom autêntico.

**Vantagens:**
- Som realista de guitarra
- Múltiplas técnicas de toque (pick, fingerstyle, etc.)

**Como usar:**
```html
<script src="audio-engine-samples.js"></script>
<script src="diagram-audio.js"></script>
```

Adicione arquivos `.wav` ou `.mp3` ao diretório `samples/` organizados por tom e técnica.

#### English
Pre-recorded guitar samples for authentic tone.

**Advantages:**
- Realistic guitar sound
- Multiple playing techniques (pick, fingerstyle, etc.)

**How to use:**
```html
<script src="audio-engine-samples.js"></script>
<script src="diagram-audio.js"></script>
```

Add `.wav` or `.mp3` files to the `samples/` directory organized by pitch and technique.

---

## 🧪 Testes | Testing

### Português
O projeto inclui uma suite de testes abrangente cobrindo:

- Geração de arpejos e posicionamento
- Cálculos de campo harmônico
- Acurácia de diagrama SVG
- Agendamento de áudio
- Filtragem de inversão
- Consistência da biblioteca
- Compatibilidade de plataforma

**Execute testes em seu navegador:**

Abra `test.html` (ou qualquer arquivo `*.test.js` no console do navegador) para ver a saída dos testes automatizados.

### English
The project includes a comprehensive test suite covering:

- Arpeggio generation and positioning
- Harmonic field calculations
- SVG diagram accuracy
- Audio scheduling
- Inversion filtering
- Library consistency
- Platform compatibility

**Run tests in your browser:**

Open `test.html` (or any `*.test.js` file in browser console) to see automated test output.

---

## 🌍 Internacionalização | Internationalization

### Idiomas Suportados | Supported Languages

- **Portuguese (PT)** - 🇧🇷
- **English (EN)** - 🇺🇸

### Adicionando um Novo Idioma | Adding a New Language

#### Português
1. Edite `i18n.js` e adicione traduções ao objeto `I18N`
2. Adicione um botão de idioma a `index.html`
3. Atualize `CATEGORY_TO_SLUG` e `SLUG_TO_CATEGORY` para novas categorias
4. Todos os atributos `data-i18n` usarão automaticamente a nova tradução

#### English
1. Edit `i18n.js` and add translations to the `I18N` object
2. Add a language button to `index.html`
3. Update `CATEGORY_TO_SLUG` and `SLUG_TO_CATEGORY` for new categories
4. All `data-i18n` attributes will automatically use the new translation

---

## 📚 Referência de Categorias | Category Reference

| Português | English | Propósito | Purpose |
|-----------|---------|-----------|---------|
| **Acordes** | **Chords** | 13 tipos de acordes (tríades, tétrades, suspensos, sexta) | 13 chord types (triads, tetrads, suspended, sixth) |
| **Arpejos** | **Arpeggios** | 11 padrões de arpejos com layouts de cinco posições | 11 arpeggio patterns with five-position layouts |
| **Escalas** | **Scales** | 11 escalas (maior, menor natural/harmônica/melódica, pentatônica, blues, etc.) | 11 scales (major, minor natural/harmonic/melodic, pentatonic, blues, etc.) |
| **Modos** | **Modes** | 8 modos gregos + Alterado/Superlócrio | 8 Greek modes + Altered/Superlócrio |
| **Campos Harmônicos** | **Harmonic Fields** | 4 modos de campo harmônico para progressões | 4 harmonic field modes for progressions |
| **Superposição de Arpejos** | **Arpeggio Superimposition** | Estudos avançados de empilhamento de arpejos | Advanced arpeggio stacking studies |
| **Exercícios** | **Exercises** | Rotinas de prática apenas em tablatura | Tablature-only practice routines |
| **Intervalos** | **Intervals** | Todos os 13 intervalos para treinamento de intervalos | All 13 intervals for interval training |

---

## 🎨 Customização | Customization

### Cores & Estilos | Colors & Styling

#### Português
Edite `styles.css` para customizar:

- Cor da nota raiz (pontos brancos)
- Cor da nota de acorde (pontos pretos)
- Cores do braço (textura de madeira, grade)
- Estilo de botão e controle
- Tema claro/escuro

Veja `color-review.html` para uma interface de teste de esquema de cores.

#### English
Edit `styles.css` to customize:

- Root note color (white dots)
- Chord tone color (black dots)
- Fretboard colors (wood texture, grid)
- Button and control styling
- Light/dark theme

See `color-review.html` for a color scheme testing interface.

### Adicionar Novos Acordes ou Escalas | Adding New Chords or Scales

#### Português
Edite `music-engine.js` e adicione ao objeto `LIBRARY`:

#### English
Edit `music-engine.js` and add to the `LIBRARY` object:

```javascript
LIBRARY['Acordes']['Meu Acorde'] = ['T', '3', '5', 'b7'];
// or
LIBRARY['Chords']['My Chord'] = ['T', '3', '5', 'b7'];
```

Todos os geradores de voicing criarão automaticamente posições de braço.

All voicing generators will automatically create fretboard positions.

### Customização de Áudio | Audio Customization

#### Português
Edite a classe `AudioEngine` em `audio-engine-tonejs.js` ou `audio-engine-samples.js`:

- Ajuste parâmetros de síntese (ataque, soltura, cutoff de filtro)
- Altere taxa de reprodução ou volume de amostra
- Adicione reverb, delay ou outros efeitos

#### English
Edit the `AudioEngine` class in `audio-engine-tonejs.js` or `audio-engine-samples.js`:

- Adjust synthesis parameters (attack, release, filter cutoff)
- Change sample playback rate or volume
- Add reverb, delay, or other effects

---

## 🚢 Implantação | Deployment

### GitHub Pages

#### Português
Chord Atlas é totalmente compatível com GitHub Pages:

1. Faça push para uma branch `gh-pages`
2. Ou ative GitHub Pages em configurações do repositório
3. Acesse via `seu-usuario.github.io/chord-atlas`

**Deep linking funciona automaticamente** via roteamento por hash.

#### English
Chord Atlas is fully compatible with GitHub Pages:

1. Push to a `gh-pages` branch
2. Or enable GitHub Pages in repository settings
3. Access via `your-username.github.io/chord-atlas`

**Deep linking works automatically** via hash routing.

### Auto-hospedagem | Self-Hosted

#### Português
Simplesmente copie todos os arquivos para um servidor web estático e sirva o diretório. Nenhuma etapa de build ou código servidor necessário.

#### English
Simply copy all files to a web server and serve the directory. No build step or server-side code required.

---

## ⚠️ Limitações Conhecidas | Known Limitations

- Reprodução de áudio requer navegador moderno com suporte a Web Audio API (todos os navegadores modernos: Chrome, Firefox, Safari, Edge) | Audio playback requires a modern browser with Web Audio API support (all modern browsers: Chrome, Firefox, Safari, Edge)
- Motor de áudio amostrado requer arquivos `.wav` ou `.mp3` no diretório `samples/` | Sampled audio engine requires `.wav` or `.mp3` files in the `samples/` directory
- Dispositivos móveis podem ter inicialização limitada de contexto de áudio (toque para iniciar) | Mobile devices may have limited audio context initialization (tap to start)

---

## 🤝 Contribuindo | Contributing

### Português
Para melhorar Chord Atlas:

1. **Reporte bugs:** Abra uma issue com a categoria, estrutura e comportamento esperado
2. **Sugira features:** Novos tipos de acordes, escalas, exercícios ou melhorias de UI
3. **Melhore traduções:** Adicione novos idiomas ou melhore traduções existentes
4. **Adicione testes:** Expanda a suite de testes em `tests/`

### English
To improve Chord Atlas:

1. **Report bugs:** File an issue with the category, structure, and expected behavior
2. **Suggest features:** New chord types, scales, exercises, or UI improvements
3. **Improve translations:** Add new languages or improve existing translations
4. **Add tests:** Expand the test suite in `tests/`

---

## 📖 Documentação | Documentation

- **[INTERACTIVE_FRETBOARD.md](INTERACTIVE_FRETBOARD.md)** - Guia detalhado sobre interação e customização do braço | Detailed guide on fretboard interaction and customization
- **Comentários no código | Code comments** — Detalhes de implementação | throughout for implementation details

---

## 📄 Licença | License

Este projeto é para fins educacionais. Use livremente para aprender e ensinar teoria musical e técnicas de guitarra. | This project is for educational purposes. Use freely for learning and teaching music theory and guitar techniques.

---

## 🎓 Usos Educacionais | Educational Use

### Português
Chord Atlas foi projetado para:

- Estudantes de guitarra aprendendo teoria musical e navegação do braço
- Músicos jazz compreendendo voicings e voice leading
- Compositores explorando possibilidades harmônicas
- Professores demonstrando acordes, escalas e progressões
- Trabalho de transcrição compreendendo que notas foram tocadas

### English
Chord Atlas is designed for:

- **Guitar students** learning music theory and fretboard navigation
- **Jazz musicians** understanding chord voicings and voice leading
- **Composers** exploring harmonic possibilities
- **Teachers** demonstrating chords, scales, and progressions
- **Transcription work** understanding what notes were played

**Comece: Abra `index.html` e explore! | Get started: Open `index.html` and explore!**

---

## ⌨️ Referência Rápida | Quick Reference

### Atalhos de Teclado | Keyboard Shortcuts

- **Alterne idioma | Language toggle:** Botões no topo direito (Português / English) | Buttons in top right (Portuguese / English)
- **Menu móvel | Mobile menu:** Botão de hamburger em telas pequenas | Hamburger button on small screens
- **Cópia de deep link | Deep link copying:** Barra de endereço do navegador (estado auto-sincronizado) | Browser address bar (auto-synced state)

### Opções de Exportação | Export Options

| Formato | Uso | Format | Use Case |
|--------|-----|--------|----------|
| **SVG** | Incorporação web, edição vetorial (Inkscape, Adobe XD) | **SVG** | Web embedding, vector editing (Inkscape, Adobe XD) |
| **PNG** | Compartilhamento, documentação, email | **PNG** | Sharing, documentation, email |
| **Print** | Folhas de prática, materiais de referência | **Print** | Practice sheets, reference materials |

---

## 💡 Dicas & Truques | Tips & Tricks

### Português
1. **Estreite o intervalo de trastes** (ex: 5-12) para focar em uma região específica
2. **Filtre grupos de cordas** para encontrar voicings para técnicas específicas (ex: formas de 3-cordas para trabalho de arpejos)
3. **Use voice leading** para praticar transições suaves em progressões jazz
4. **Combine escalas + acordes** alternando abas para compreender o relacionamento
5. **Deep link e bookmark** suas explorações favoritas para estudo posterior
6. **Exporte diagramas** para criar materiais de prática personalizados

### English
1. **Narrow the fret range** (e.g., 5-12) to focus on a specific region
2. **Filter string groups** to find voicings for specific techniques (e.g., 3-string shapes for arpeggio work)
3. **Use voice leading** to practice smooth transitions in jazz progressions
4. **Combine scales + chords** by switching tabs to understand the relationship
5. **Deep link** and bookmark your favorite explorations for later study
6. **Export diagrams** for creating custom practice materials

---

## 👤 Créditos | Credits

Desenvolvido por **Lucas Borges** para músicos, estudantes e educadores. | Built by **Lucas Borges** for musicians, students, and educators.

**Agradecimentos especiais** à comunidade de teoria musical e aos criadores do Tone.js por ferramentas de síntese excelentes. | **Special thanks** to the music theory community and Tone.js creators for excellent synthesis tools.

---

## 📞 Suporte | Support

### Português
Para dúvidas ou problemas:

1. Verifique a documentação neste README
2. Revise `INTERACTIVE_FRETBOARD.md` para tópicos avançados
3. Explore os arquivos de teste para compreender o comportamento esperado
4. Inspecione o console do navegador para mensagens de erro

### English
For questions or issues:

1. Check the documentation in this README
2. Review `INTERACTIVE_FRETBOARD.md` for advanced topics
3. Explore the test files to understand expected behavior
4. Inspect browser console for error messages

---

**Aproveite a exploração da teoria musical com Chord Atlas! 🎸 | Enjoy exploring music theory with Chord Atlas! 🎸**
