/**
 * Foundation lock for everything the platform is built on, beyond arpeggios.
 *
 * The arpeggio-specific guards live in arpeggios.test.js and
 * arpeggio-shapes.test.js. This file pins the rest of the deterministic
 * music data and generators so a silent change anywhere — a mistyped
 * formula, a reordered voicing, a broken harmonic field — fails a test
 * instead of shipping:
 *
 *   - INTERVALS          → exact semitone value of every interval token
 *   - LIBRARY            → per-category counts + the exact note formula of
 *                          every catalogued chord/scale/mode/interval/field
 *   - getVoicingGroups   → chord voicings (standard / drop2 / shell)
 *   - intervalMap        → formula -> notes for sample roots
 *   - fieldData          → diatonic chords of the harmonic fields
 *   - noteFor / noteAt   → core fretboard/interval math
 *
 * To change any locked value intentionally: update the expectation here in
 * the same commit as the code change, so the diff records the intent.
 *
 * Run: npm test   (node --test chord-atlas/tests/*.test.js)
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadEngine() {
  const dir = path.join(__dirname, '..');
  const code = [
    fs.readFileSync(path.join(dir, 'i18n.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'music-engine.js'), 'utf8'),
    '\n;globalThis.__engine = { LIBRARY, INTERVALS, NOTES, STRING_TUNING,' +
      ' getVoicingGroups, intervalMap, fieldData, HARMONIC_FIELDS, noteFor, noteAt, pc };',
  ].join('\n');
  // getVoicingGroups branches on the i18n global `currentCategory`; it is
  // initialised to 'Acordes', which is the chord path we want to exercise.
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const E = loadEngine();

// The engine is evaluated inside a separate vm realm, so its objects/arrays
// carry that realm's prototypes. assert.deepStrictEqual is prototype-sensitive
// ("same structure but not reference-equal"), so normalise engine values
// through JSON before comparing against test-realm literals.
const norm = (x) => JSON.parse(JSON.stringify(x));

// ---------------------------------------------------------------------------
// INTERVALS — exact semitone table
// ---------------------------------------------------------------------------
test('INTERVALS maps every token to its exact semitone count', () => {
  const expected = {
    'T': 0, '1': 0, '8': 0, 'b2': 1, '2': 2, '#2': 3, 'b3': 3, '3': 4,
    '4': 5, '#4': 6, 'b5': 6, '5': 7, '#5': 8, 'b6': 8, '6': 9, 'bb7': 9,
    'b7': 10, '7': 11, '7M': 11,
  };
  assert.deepStrictEqual(norm(E.INTERVALS), expected);
});

// ---------------------------------------------------------------------------
// LIBRARY — category sizes and exact formulas
// ---------------------------------------------------------------------------
test('LIBRARY keeps its expected number of entries per category', () => {
  const counts = Object.fromEntries(
    Object.keys(E.LIBRARY).map((c) => [c, Object.keys(E.LIBRARY[c]).length])
  );
  // The catalogue is extended at load time (harmonic fields expand to 24,
  // plus the superimposition and exercise tables), so lock the runtime totals.
  assert.deepStrictEqual(counts, {
    'Intervalos': 14,
    'Acordes': 13,
    'Arpejos': 11,
    'Escalas': 11,
    'Modos': 8,
    'Campos Harmônicos': 24,
    'Superposição de Arpejos': 7,
    'Exercícios': 2,
  });
});

// Exact formulas for the catalogued chords, scales and modes. A change to any
// of these note recipes (the kind of silent edit that lost arpeggio data
// before) flips this test.
const LOCKED_FORMULAS = {
  'Acordes': {
    'Tríade maior': ['T', '3', '5'],
    'Tríade menor': ['T', 'b3', '5'],
    'Tríade aumentada': ['T', '3', '#5'],
    'Tríade diminuta': ['T', 'b3', 'b5'],
    'Tétrade maior 7M': ['T', '3', '5', '7M'],
    'Tétrade menor 7': ['T', 'b3', '5', 'b7'],
    'Tétrade dominante 7': ['T', '3', '5', 'b7'],
    'Tétrade meio-diminuta m7(b5)': ['T', 'b3', 'b5', 'b7'],
    'Tétrade diminuta dim7': ['T', 'b3', 'b5', 'bb7'],
    'Menor com sétima maior m(7M)': ['T', 'b3', '5', '7M'],
    'Maior com sexta 6': ['T', '3', '5', '6'],
    'Menor com sexta m6': ['T', 'b3', '5', '6'],
    'Suspenso sus4': ['T', '4', '5'],
  },
  'Escalas': {
    'Escala maior': ['T', '2', '3', '4', '5', '6', '7'],
    'Escala menor natural': ['T', '2', 'b3', '4', '5', 'b6', 'b7'],
    'Escala menor harmônica': ['T', '2', 'b3', '4', '5', 'b6', '7'],
    'Escala menor melódica': ['T', '2', 'b3', '4', '5', '6', '7'],
    'Pentatonic/root maior': ['T', '2', '3', '5', '6'],
    'Pentatonic/root menor': ['T', 'b3', '4', '5', 'b7'],
    'Blues maior': ['T', '2', 'b3', '3', '5', '6'],
    'Blues menor': ['T', 'b3', '4', 'b5', '5', 'b7'],
    'Escala diminuta': ['T', '2', 'b3', '4', 'b5', 'b6', '6', '7'],
    'Diminuta dominante': ['T', 'b2', 'b3', '3', 'b5', '5', '6', 'b7'],
    'Tons inteiros': ['T', '2', '3', '#4', '#5', 'b7'],
  },
  'Modos': {
    'Modo jônico': ['T', '2', '3', '4', '5', '6', '7'],
    'Modo dórico': ['T', '2', 'b3', '4', '5', '6', 'b7'],
    'Modo frígio': ['T', 'b2', 'b3', '4', '5', 'b6', 'b7'],
    'Modo lídio': ['T', '2', '3', '#4', '5', '6', '7'],
    'Modo mixolídio': ['T', '2', '3', '4', '5', '6', 'b7'],
    'Modo eólio': ['T', '2', 'b3', '4', '5', 'b6', 'b7'],
    'Modo lócrio': ['T', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
    'Superlócrio / alterada': ['T', 'b2', '#2', '3', 'b5', '#5', 'b7'],
  },
};

for (const [category, entries] of Object.entries(LOCKED_FORMULAS)) {
  test(`LIBRARY.${category} formulas are unchanged`, () => {
    for (const [name, formula] of Object.entries(entries)) {
      assert.deepStrictEqual(
        norm(E.LIBRARY[category][name]), formula,
        `${category} / ${name} formula changed`
      );
    }
  });
}

test('every LIBRARY formula starts on the tonic and uses known interval tokens', () => {
  for (const [category, entries] of Object.entries(E.LIBRARY)) {
    for (const [name, formula] of Object.entries(entries)) {
      assert.ok(Array.isArray(formula) && formula.length > 0, `${category}/${name}: empty formula`);
      assert.strictEqual(formula[0], 'T', `${category}/${name}: does not start on T`);
      for (const token of formula) {
        assert.ok(token in E.INTERVALS, `${category}/${name}: unknown interval "${token}"`);
      }
    }
  }
});

// ---------------------------------------------------------------------------
// Chord voicings — getVoicingGroups (standard / drop2 / shell)
// ---------------------------------------------------------------------------
test('getVoicingGroups returns the locked voicings for a triad', () => {
  assert.deepStrictEqual(norm(E.getVoicingGroups(['T', '3', '5'])), [
    { name: 'standard', items: ['T-3-5', 'T-5-3', '3-5-T', '3-T-5', '5-T-3', '5-3-T'] },
  ]);
});

test('getVoicingGroups returns the locked voicings for a seventh chord', () => {
  assert.deepStrictEqual(norm(E.getVoicingGroups(['T', '3', '5', '7M'])), [
    {
      name: 'standard',
      items: [
        'T-7M-3-5', '7M-3-5-T', '3-5-T-7M', '5-T-7M-3', 'T-5-7M-3', '5-7M-3-T',
        '7M-3-T-5', '3-T-5-7M', 'T-3-5-7M', '3-5-7M-T', '5-7M-T-3', '7M-T-3-5',
        'T-5-3-7M', '5-3-7M-T', '3-7M-T-5', '7M-T-5-3',
      ],
    },
    { name: 'drop2', items: ['5-T-3-7M', '7M-3-5-T', 'T-5-7M-3', '3-7M-T-5'] },
    { name: 'shell', items: ['T-3-7M', 'T-7M-3', '3-7M-T', '7M-3-T'] },
  ]);
});

// ---------------------------------------------------------------------------
// intervalMap — formula -> concrete notes
// ---------------------------------------------------------------------------
test('intervalMap resolves formulas to the right notes per root', () => {
  assert.deepStrictEqual(norm(E.intervalMap('C', ['T', '3', '5', '7M'])),
    { 'T': 'C', '3': 'E', '5': 'G', '7M': 'B' });
  assert.deepStrictEqual(norm(E.intervalMap('A', ['T', 'b3', '5'])),
    { 'T': 'A', 'b3': 'C', '5': 'E' });
  assert.deepStrictEqual(norm(E.intervalMap('G', ['T', '2', '3', '4', '5', '6', '7'])),
    { 'T': 'G', '2': 'A', '3': 'B', '4': 'C', '5': 'D', '6': 'E', '7': 'F#' });
});

// ---------------------------------------------------------------------------
// Harmonic fields — diatonic chords per degree
// ---------------------------------------------------------------------------
// Signature = "degree:root:quality" per diatonic chord, in order.
function fieldSignature(root, field) {
  const fd = E.fieldData(root, field);
  assert.ok(fd && Array.isArray(fd.chords), `fieldData(${root}, ${field}) has no chords`);
  return fd.chords.map((c) => `${c.degree}:${c.root}:${c.quality}`).join(' ');
}

const LOCKED_FIELDS = [
  ['C', 'Campo maior (jônico)',
    'I:C:maj7 ii:D:m7 iii:E:m7 IV:F:maj7 V:G:7 vi:A:m7 vii°:B:m7(b5)'],
  ['A', 'Campo menor natural (eólio)',
    'i:A:m7 ii°:B:m7(b5) bIII:C:maj7 iv:D:m7 v:E:m7 bVI:F:maj7 bVII:G:7'],
  ['C', 'Campo menor harmônico',
    'i:C:m(7M) ii°:D:m7(b5) bIII+:D#:maj7(#5) iv:F:m7 V:G:7 bVI:G#:maj7 vii°:B:dim7'],
  ['C', 'Campo menor melódico',
    'i:C:m(7M) ii:D:m7 bIII+:D#:maj7(#5) IV:F:7 V:G:7 vi°:A:m7(b5) vii°:B:m7(b5)'],
];

for (const [root, field, expected] of LOCKED_FIELDS) {
  test(`fieldData "${field}" @ ${root} keeps its diatonic chords`, () => {
    assert.strictEqual(fieldSignature(root, field), expected);
  });
}

test('every harmonic field builds a full set of diatonic chords with notes', () => {
  for (const field of Object.keys(E.HARMONIC_FIELDS)) {
    const fd = E.fieldData('C', field);
    assert.ok(fd && Array.isArray(fd.chords), `${field}: no chords`);
    // Heptatonic fields yield 7 chords; pentatonic fields yield 5.
    assert.ok(fd.chords.length >= 5, `${field}: only ${fd.chords.length} chords`);
    for (const ch of fd.chords) {
      assert.ok(Array.isArray(ch.notes) && ch.notes.length >= 3,
        `${field} / ${ch.degree}: chord has too few notes`);
    }
  }
});

// ---------------------------------------------------------------------------
// Core fretboard / interval math
// ---------------------------------------------------------------------------
test('noteFor computes the right note for an interval over a root', () => {
  const cases = [
    ['C', '3', 'E'], ['C', 'b3', 'D#'], ['C', '5', 'G'], ['C', '7M', 'B'],
    ['C', '#5', 'G#'], ['C', 'bb7', 'A'], ['F#', '5', 'C#'], ['B', '7M', 'A#'],
  ];
  for (const [root, iv, note] of cases) {
    assert.strictEqual(E.noteFor(root, iv), note, `noteFor(${root}, ${iv})`);
  }
});

test('noteAt returns the open-string notes and fretted notes correctly', () => {
  // Open strings 6..1 = E A D G B E
  assert.deepStrictEqual(
    [6, 5, 4, 3, 2, 1].map((s) => E.noteAt(s, 0)),
    ['E', 'A', 'D', 'G', 'B', 'E']
  );
  assert.strictEqual(E.noteAt(6, 5), 'A');   // low E + 5 frets
  assert.strictEqual(E.noteAt(1, 12), 'E');  // high E at the octave
});
