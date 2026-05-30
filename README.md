# Acordes, Arpejos e Escalas

Um projeto abrangente de aprendizado de música interativo, baseado no livro _"Acordes, Arpejos e Escalas"_ de Nelson Faria (Lumiar Editora).

🎸 **[Explore o Chord Atlas](./chord-atlas/)** — Ferramenta interativa para explorar acordes, arpejos, escalas e modos na guitarra.

---

## 📋 Visão Geral

Este repositório contém:

1. **Plano de Estudos Personalizado** (`index.html`) — Um aplicativo web com 20 semanas de estudo estruturado cobrindo acordes, escalas, arpejos e fraseado
2. **Chord Atlas** (`chord-atlas/`) — Uma ferramenta educacional interativa para exploração avançada de acordes, arpejos, escalas, modos e campos harmônicos

---

## 🎯 Componentes Principais

### 1. Plano de Estudos (`index.html`)

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

### 2. Chord Atlas (`chord-atlas/`)

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

---

## 🚀 Como Começar

### Requisitos
- Navegador moderno com suporte a Web Audio API (Chrome, Firefox, Safari, Edge)
- Node.js (apenas para testes)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lucascomputacao/acordes-arpejos-escalas.git
cd acordes-arpejos-escalas

# Instale dependências (opcional, apenas para testes)
npm install
```

### Usar Localmente

#### Opção 1: Plano de Estudos
```bash
# Abra em seu navegador
open index.html
# ou simplesmente abra index.html em seu navegador favorito
```

#### Opção 2: Chord Atlas
```bash
# Navegue até o diretório
cd chord-atlas

# Abra em seu navegador
open index.html
```

#### Opção 3: Servir localmente com Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Depois acesse: http://localhost:8000
```

---

## 📁 Estrutura do Projeto

```
acordes-arpejos-escalas/
├── index.html                    # Plano de estudos personalizado
├── css/
│   └── styles.css               # Estilos do plano de estudos
├── js/                          # Scripts JavaScript do plano
│
├── chord-atlas/                 # Ferramenta interativa avançada
│   ├── index.html               # Entrada do Chord Atlas
│   ├── app.js                   # Roteamento e gerenciamento de estado
│   ├── music-engine.js          # Biblioteca de acordes/escalas/arpejos
│   ├── renderer.js              # Geração de diagramas SVG
│   ├── i18n.js                  # Internacionalização (PT/EN)
│   ├── styles.css               # Estilos do Chord Atlas
│   ├── audio-engine.js          # Interface de áudio abstrata
│   ├── audio-engine-tonejs.js   # Motor de síntese Tone.js
│   ├── audio-engine-samples.js  # Motor de samples de guitarra
│   ├── diagram-audio.js         # Integração clique-para-reproduzir
│   ├── interactive-fretboard.js # Manipulador de interação
│   ├── samples/                 # Arquivos de áudio de guitarra
│   ├── tests/                   # Suite de testes abrangente
│   └── README.md                # Documentação completa do Chord Atlas
│
├── images/                      # Imagens do projeto
├── public/                      # Arquivos públicos
├── scripts/                     # Scripts utilitários
├── generate-chords.html/.js     # Gerador de acordes em HTML/JS
├── generate_svg_chords.py       # Gerador de acordes em SVG (Python)
├── package.json                 # Metadados do projeto e dependências
└── README.md                    # Este arquivo
```

---

## 🧪 Testes

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

---

## 🌍 Internacionalização

Ambos os componentes suportam:
- 🇧🇷 **Português**
- 🇺🇸 **English**

Alterne o idioma usando os botões de idioma no topo da interface.

---

## 📚 Tecnologias Utilizadas

### Frontend
- **HTML5** — Estrutura semântica
- **CSS3** — Estilos responsivos
- **JavaScript (Vanilla)** — Sem dependências externas (exceto Tone.js para áudio)
- **SVG** — Diagramas escaláveis e impressíveis

### Bibliotecas
- **Tone.js** — Síntese de áudio em navegador
- **SVGuitar** — Geração de diagramas de guitarra (em alguns componentes)

### Build & Deploy
- **npm** — Gerenciamento de dependências
- **GitHub Pages** — Hospedagem estática
- Deep linking via hash URL para bookmarking e compartilhamento

---

## 💾 Recursos do Plano de Estudos

### Progresso
- Rastreamento visual de 0-100 dias
- Barra de progresso animada
- Estatísticas de aulas

### Fases de Estudo
1. **Fase 1: Acordes** (Semanas 1-6)
   - Acordes básicos maiores/menores
   - Dominantes e diminutos
   - Acordes com extensões

2. **Fase 2: Escalas** (Semanas 7-11)
   - Escalas maiores
   - Escalas menores (natural, harmônica, melódica)
   - Modos gregos

3. **Fase 3: Arpejos** (Semanas 12-17)
   - Padrões e técnicas
   - Voice leading
   - Combinações progressivas

4. **Fase 4: Fraseado** (Semanas 18-20)
   - Aplicação musical
   - Improvisação
   - Estudos práticos

### Verificação de Aprendizado
- 5 avaliações estruturadas
- Checklists por fase
- Tabulaturas de exercícios

---

## 🎸 Recursos do Chord Atlas

### Exploração Interativa
- **Seletor de raiz** — C até B (cromático)
- **Filtro de estrutura** — Acordes, arpejos, escalas, modos
- **Intervalo de trastes** — Foco em regiões específicas (0-24 trastes)
- **Grupos de cordas** — 2-6 cordas
- **Inversões** — Todas, apenas raiz, ou selecionadas

### Voice Leading
- Encontre as voicings mais próximas entre dois acordes
- Minimize movimento de dedos
- Visualize mapeamento de intervalos

### Análise de Acordes
- **Extensões disponíveis** — 9ª, 11ª, 13ª
- **Acordes compatíveis** — Substituições e variações
- **Sugestões de escala** — Por que funciona com o acorde selecionado

### Exportação & Impressão
- **SVG** — Para edição vetorial
- **PNG** — Para compartilhamento
- **Print-friendly** — Para criar folhas de prática

---

## 🔗 Deep Linking

O Chord Atlas suporta deep linking via hash URL para compartilhamento e bookmarking:

```
#/category/structure?root=ROOT&minFret=N&maxFret=N&lang=LANG&...
```

**Exemplos:**
- `#/acordes/tetrade-maior-7m?root=F&minFret=5&maxFret=12&lang=pt`
- `#/arpejos/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24`
- `#/escalas/escala-menor-natural?lang=pt&stringGroups=3-4-5-6`

---

## 🎵 Motores de Áudio

### Tone.js (Padrão)
- Síntese em navegador
- Funciona offline
- Sem necessidade de arquivos de sample

### Audio Samples
- Samples gravados de guitarra
- Som mais autêntico
- Pode ser togglado na interface

---

## 📖 Documentação Adicional

- **[Chord Atlas README](./chord-atlas/README.md)** — Documentação detalhada da ferramenta interativa
- **[Interactive Fretboard Guide](./chord-atlas/INTERACTIVE_FRETBOARD.md)** — Guia avançado de interação
- **Comentários no código** — Explicações técnicas detalhadas

---

## 🛠️ Customização

### Adicionar Novos Acordes
Edite `chord-atlas/music-engine.js` e adicione à biblioteca:

```javascript
LIBRARY['Acordes']['Meu Acorde'] = ['T', '3', '5', 'b7'];
```

### Personalizar Cores
Edite `chord-atlas/styles.css` para ajustar:
- Cores de notas (raiz vs. tones)
- Cores do braço de guitarra
- Temas claros/escuros

### Adicionar Novos Idiomas
Edite `chord-atlas/i18n.js` e adicione traduções ao objeto `I18N`.

---

## 🚢 Deploy

### GitHub Pages
```bash
# Push para branch gh-pages
git push origin main:gh-pages

# Ou configure em Settings > Pages > Deploy from a branch
```

**Deep linking funciona automaticamente** via roteamento por hash.

### Auto-hospedagem
Copie todos os arquivos para um servidor web estático. Não requer build ou código servidor.

---

## 📋 Checklist de Recursos

- [x] Plano de 20 semanas estruturado
- [x] 13 tipos de acordes
- [x] 11+ escalas e modos
- [x] Voice leading analysis
- [x] Síntese de áudio interativa
- [x] Suporte bilingue (PT/EN)
- [x] Responsivo (desktop/mobile)
- [x] Deep linking e bookmarking
- [x] Exportação SVG/PNG
- [x] Print-friendly
- [x] Suite de testes abrangente
- [x] Documentação detalhada

---

## 🐛 Problemas Conhecidos

- Audio playback requer navegador moderno com Web Audio API
- Motores de sample requerem arquivos .wav ou .mp3 no diretório `samples/`
- Dispositivos mobile podem requerer tap-to-start para contexto de áudio

---

## 🤝 Contribuindo

Para melhorar este projeto:

1. **Reporte bugs** — Descreva a categoria, estrutura e comportamento esperado
2. **Sugira features** — Novos acordes, escalas, exercícios ou melhorias de UI
3. **Melhore traduções** — Adicione novos idiomas
4. **Adicione testes** — Expanda a suite de testes em `tests/`

---

## 📄 Licença

Este projeto é para fins educacionais. Use livremente para aprender e ensinar teoria musical e técnicas de guitarra.

---

## 👤 Autor

Desenvolvido por **Lucas Borges** para músicos, estudantes e educadores.

**Agradecimentos especiais** à comunidade de teoria musical e aos criadores do Tone.js por ferramentas de síntese excelentes.

---

## 💡 Dicas & Truques

1. **Estreite o intervalo de trastes** (ex: 5-12) para focar em uma região específica
2. **Filtre grupos de cordas** para encontrar voicings para técnicas específicas
3. **Use voice leading** para praticar transições suaves em progressões jazz
4. **Combine escalas + acordes** alternando abas para entender a relação
5. **Deep link e bookmark** suas explorações favoritas
6. **Exporte diagramas** para criar materiais de prática personalizados

---

## 🎓 Usos Educacionais

Chord Atlas foi projetado para:

- Estudantes de guitarra aprendendo teoria e navegação do braço
- Músicos jazz entendendo voicings e voice leading
- Compositores explorando possibilidades harmônicas
- Professores demonstrando acordes, escalas e progressões
- Trabalho de transcrição entendendo que notas foram tocadas

**Comece:** Abra `index.html` ou `chord-atlas/index.html` e explore!

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Leia a documentação neste README
2. Revise `chord-atlas/README.md` para tópicos avançados
3. Explore os arquivos de teste para entender comportamento esperado
4. Inspecione o console do navegador para mensagens de erro

---

## 🔗 Links Úteis

- **[GitHub Repository](https://github.com/lucascomputacao/acordes-arpejos-escalas)**
- **[Chord Atlas Live](https://lucascomputacao.github.io/acordes-arpejos-escalas/chord-atlas/)**
- **Livro Original:** "Acordes, Arpejos e Escalas" — Nelson Faria (Lumiar Editora)

---

Aproveite a exploração da teoria musical com Chord Atlas! 🎸
