const fs = require('fs');
const path = require('path');
const { SVG } = require('@svgdotjs/svg.js');
const { createSVGWindow } = require('svgdom');
const { SVGuitarChord, OPEN, SILENT } = require('svguitar');

// Setup DOM para Node.js
const window = createSVGWindow();
const document = window.document;
global.document = document;
global.window = window;

// Função para criar diretório se não existir
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Definição dos acordes para cada dia
// Format: [string (1-6), fret (0 for open, 'x' for muted, or fret number)]
const chords = {
  'dia-01': [
    {
      name: 'C Major (Dó maior)',
      file: 'triade-C.svg',
      title: 'C Major',
      fingers: [
        [1, 'x'],       // 1ª corda (E) - muted
        [2, 'x'],       // 2ª corda (B) - muted
        [3, 2],         // 3ª corda (G) - 2º traste
        [4, 2],         // 4ª corda (D) - 2º traste
        [5, 3],         // 5ª corda (A) - 3º traste
        [6, 'x'],       // 6ª corda (E) - muted
      ],
    },
    {
      name: 'C Minor (Dó menor)',
      file: 'triade-C-menor.svg',
      title: 'C Minor',
      fingers: [
        [1, 'x'],       // 1ª corda (E) - muted
        [2, 'x'],       // 2ª corda (B) - muted
        [3, 1],         // 3ª corda (G) - 1º traste
        [4, 2],         // 4ª corda (D) - 2º traste
        [5, 3],         // 5ª corda (A) - 3º traste
        [6, 'x'],       // 6ª corda (E) - muted
      ],
    },
    {
      name: 'C Augmented (Dó aumentado)',
      file: 'triade-C-aumentado.svg',
      title: 'C Augmented',
      fingers: [
        [1, 'x'],       // 1ª corda (E) - muted
        [2, 'x'],       // 2ª corda (B) - muted
        [3, 2],         // 3ª corda (G) - 2º traste
        [4, 3],         // 4ª corda (D) - 3º traste (G#)
        [5, 3],         // 5ª corda (A) - 3º traste
        [6, 'x'],       // 6ª corda (E) - muted
      ],
    },
    {
      name: 'C Diminished (Dó diminuto)',
      file: 'triade-C-diminuto.svg',
      title: 'C Diminished',
      fingers: [
        [1, 'x'],       // 1ª corda (E) - muted
        [2, 'x'],       // 2ª corda (B) - muted
        [3, 1],         // 3ª corda (G) - 1º traste
        [4, 1],         // 4ª corda (D) - 1º traste (Db)
        [5, 3],         // 5ª corda (A) - 3º traste
        [6, 'x'],       // 6ª corda (E) - muted
      ],
    },
  ],
};

// Função para gerar um acorde
const generateChord = (chordData, outputPath) => {
  const chordDef = {
    title: chordData.title,
    fingers: chordData.fingers,
    barres: [],
    position: 1,
  };

  const chord = new SVGuitarChord(chordDef, {
    width: 300,
    height: 400,
    fretSize: 50,
    strokeWidth: 2,
  });

  // Desenhar o acorde
  chord.draw();

  // Obter SVG do renderer
  const svgString = chord.renderer.root.node.outerHTML;
  fs.writeFileSync(outputPath, svgString);
  console.log(`✓ Generated: ${outputPath}`);
};

// Gerar todos os acordes
Object.entries(chords).forEach(([dayFolder, dayChords]) => {
  const dayPath = path.join(__dirname, 'public', 'images', dayFolder);
  ensureDir(dayPath);

  dayChords.forEach(chord => {
    const outputPath = path.join(dayPath, chord.file);
    generateChord(chord, outputPath);
  });
});

console.log('\n✨ All chord diagrams generated successfully!');
