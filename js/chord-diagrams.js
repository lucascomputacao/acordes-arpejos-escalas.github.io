/**
 * Definição dos diagramas de acordes usando SVGuitar
 * Orientação: horizontal (cordas da esquerda para direita, trastes de cima para baixo)
 */

const CHORD_DIAGRAMS = {
  // C MAJOR TRIADS
  'C Major - Forma C': {
    title: 'C Major - Forma C',
    position: 3,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 2],
      [3, 3],
      [2, 3],
      [1, 'x'],
    ],
  },
  'C Major - Forma A': {
    title: 'C Major - Forma A',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 2],
      [2, 3],
      [1, 0],
    ],
  },
  'C Major - Forma G': {
    title: 'C Major - Forma G',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 0],
      [2, 2],
      [1, 0],
    ],
  },
  'C Major - Forma E': {
    title: 'C Major - Forma E',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 3],
      [4, 2],
      [3, 2],
      [2, 'x'],
      [1, 'x'],
    ],
  },
  'C Major - Forma D': {
    title: 'C Major - Forma D',
    position: 10,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 1],
      [3, 2],
      [2, 'x'],
      [1, 0],
    ],
  },

  // C MINOR TRIADS
  'C Minor - Forma C': {
    title: 'C Minor - Forma C',
    position: 3,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 3],
      [3, 3],
      [2, 1],
      [1, 'x'],
    ],
  },
  'C Minor - Forma A': {
    title: 'C Minor - Forma A',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 1],
      [2, 3],
      [1, 0],
    ],
  },
  'C Minor - Forma G': {
    title: 'C Minor - Forma G',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 0],
      [2, 2],
      [1, 0],
    ],
  },
  'C Minor - Forma E': {
    title: 'C Minor - Forma E',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 3],
      [4, 2],
      [3, 1],
      [2, 'x'],
      [1, 'x'],
    ],
  },
  'C Minor - Forma D': {
    title: 'C Minor - Forma D',
    position: 10,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 1],
      [2, 0],
      [1, 0],
    ],
  },

  // C AUGMENTED TRIADS
  'C Augmented - Forma C': {
    title: 'C Augmented - Forma C',
    position: 3,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 3],
      [3, 4],
      [2, 2],
      [1, 'x'],
    ],
  },
  'C Augmented - Forma A': {
    title: 'C Augmented - Forma A',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 1],
      [3, 2],
      [2, 3],
      [1, 0],
    ],
  },
  'C Augmented - Forma G': {
    title: 'C Augmented - Forma G',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 0],
      [2, 2],
      [1, 1],
    ],
  },
  'C Augmented - Forma E': {
    title: 'C Augmented - Forma E',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 3],
      [4, 3],
      [3, 2],
      [2, 'x'],
      [1, 'x'],
    ],
  },
  'C Augmented - Forma D': {
    title: 'C Augmented - Forma D',
    position: 10,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 2],
      [2, 0],
      [1, 0],
    ],
  },

  // C DIMINISHED TRIADS
  'C Diminished - Forma C': {
    title: 'C Diminished - Forma C',
    position: 3,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 3],
      [3, 3],
      [2, 1],
      [1, 'x'],
    ],
  },
  'C Diminished - Forma A': {
    title: 'C Diminished - Forma A',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 1],
      [3, 1],
      [2, 3],
      [1, 0],
    ],
  },
  'C Diminished - Forma G': {
    title: 'C Diminished - Forma G',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 0],
      [2, 2],
      [1, 0],
    ],
  },
  'C Diminished - Forma E': {
    title: 'C Diminished - Forma E',
    position: 0,
    fingers: [
      [6, 'x'],
      [5, 3],
      [4, 1],
      [3, 1],
      [2, 'x'],
      [1, 'x'],
    ],
  },
  'C Diminished - Forma D': {
    title: 'C Diminished - Forma D',
    position: 10,
    fingers: [
      [6, 'x'],
      [5, 'x'],
      [4, 'x'],
      [3, 1],
      [2, 1],
      [1, 1],
    ],
  },
};

/**
 * Renderiza um diagrama de acorde usando SVGuitar
 * @param {string} containerId - ID do elemento container
 * @param {string} chordName - Nome do acorde (deve estar em CHORD_DIAGRAMS)
 * @param {object} options - Opções adicionais (width, height, style, etc)
 */
function renderChordDiagram(containerId, chordName, options = {}) {
  const chordData = CHORD_DIAGRAMS[chordName];
  if (!chordData) {
    console.warn(`Acorde não encontrado: ${chordName}`);
    return;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container não encontrado: ${containerId}`);
    return;
  }

  // Opções padrão
  const defaultOptions = {
    width: 200,
    height: 200,
    strings: 6,
    frets: 4,
    position: chordData.position,
    orientation: 'horizontal',
  };

  const config = { ...defaultOptions, ...options };

  // Limpar container
  container.innerHTML = '';

  // Criar o diagrama (SVGuitarChord vem do CDN em window.svguitar.SVGuitarChord)
  const SVGuitarChord = window.svguitar.SVGuitarChord;

  const chord = new SVGuitarChord(container);

  // Configurar e desenhar o diagrama
  const chordConfig = {
    title: chordData.title,
    fingers: chordData.fingers,
    orientation: config.orientation,
  };

  // SVGuitar não permite position: 0, então só adiciona se for > 0
  if (config.position > 0) {
    chordConfig.position = config.position;
  }

  chord.configure(chordConfig);

  chord.draw();

  return chord;
}

/**
 * Renderiza múltiplos diagramas de uma vez
 * @param {array} chordNames - Array de nomes de acordes
 * @param {string} containerPrefix - Prefixo do ID dos containers (ex: 'chord-' renderizará em 'chord-0', 'chord-1', etc)
 * @param {object} options - Opções para todos os diagramas
 */
function renderChordDiagrams(chordNames, containerPrefix, options = {}) {
  chordNames.forEach((chordName, index) => {
    const containerId = `${containerPrefix}${index}`;
    renderChordDiagram(containerId, chordName, options);
  });
}
