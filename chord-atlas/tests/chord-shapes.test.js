/**
 * Shape lock for the book chord voicings of "Tétrade aumentada 7M(#5)".
 *
 * Mirrors the arpeggio-shapes.test.js approach: each expected signature is the
 * sorted (string:fret:interval) output of generateBookChord() for a given root.
 * Any change to BOOK_CHORD_PATTERNS that silently shifts a note will break
 * exactly the test(s) for that formation and make the intent explicit in the diff.
 *
 * Covers:
 *   4 formations (F1–F4) × 4 inversions each = 16 shapes
 *   Verified roots: C (all 16), G (all 16), Bb/A# (all 16)
 *
 * Run: npm test  (node --test chord-atlas/tests/*.test.js)
 */
'use strict';

const { test } = require('node:test');
const assert   = require('node:assert');
const fs       = require('node:fs');
const path     = require('node:path');
const vm       = require('node:vm');

function loadEngine() {
  const dir  = path.join(__dirname, '..');
  const code = [
    fs.readFileSync(path.join(dir, 'i18n.js'),          'utf8'),
    fs.readFileSync(path.join(dir, 'music-engine.js'),   'utf8'),
    '\n;globalThis.__engine = {',
    '  LIBRARY, BOOK_CHORD_PATTERNS,',
    '  generateBookChord, hasBookChordPattern',
    '};',
  ].join('\n');
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const { LIBRARY, BOOK_CHORD_PATTERNS, generateBookChord, hasBookChordPattern } = loadEngine();

// Canonical signature: sorted (string:fret:interval) of every note in the shape.
function signature(root, shapeName) {
  const formula = LIBRARY['Acordes']['Tétrade aumentada 7M(#5)'];
  const items   = generateBookChord(root, 'Tétrade aumentada 7M(#5)', formula, 0, 24, [shapeName]);
  assert.strictEqual(items.length, 1,
    `generateBookChord("${root}", "${shapeName}") should return exactly 1 item, got ${items.length}`);
  return items[0].positions
    .slice()
    .sort((a, b) => a.string - b.string || a.fret - b.fret)
    .map(p => `${p.string}:${p.fret}:${p.label}`)
    .join(' ');
}

// ---------------------------------------------------------------------------
// Inventory tests
// ---------------------------------------------------------------------------

test('Tétrade aumentada 7M(#5) has a book chord pattern', () => {
  assert.ok(hasBookChordPattern('Tétrade aumentada 7M(#5)'));
});

test('Tétrade aumentada 7M(#5) has exactly 16 shapes (4 formations × 4 inversions)', () => {
  const shapes = BOOK_CHORD_PATTERNS['Tétrade aumentada 7M(#5)'];
  assert.strictEqual(shapes.length, 16);
});

test('all 16 shape names follow the "Fn · voicing" convention', () => {
  const shapes = BOOK_CHORD_PATTERNS['Tétrade aumentada 7M(#5)'];
  for (const s of shapes) {
    assert.match(s.name, /^F[1-4] · [1-9#][^·]+$/,
      `Shape name "${s.name}" does not match expected convention`);
  }
});

test('each formation has exactly 4 shapes', () => {
  const shapes = BOOK_CHORD_PATTERNS['Tétrade aumentada 7M(#5)'];
  for (const fn of ['F1', 'F2', 'F3', 'F4']) {
    const count = shapes.filter(s => s.name.startsWith(fn + ' ·')).length;
    assert.strictEqual(count, 4, `Formation ${fn} has ${count} shapes, expected 4`);
  }
});

// ---------------------------------------------------------------------------
// Locked exact shapes — root C
// ---------------------------------------------------------------------------

const LOCKED_C = [
  ['C', 'F1 · 1,7,3,#5',  '2:9:#5 3:9:3 4:9:7M 6:8:T'],
  ['C', 'F1 · 3,1,#5,7',  '2:12:7M 3:13:#5 4:10:T 6:12:3'],
  ['C', 'F1 · #5,3,7,1',  '2:1:T 3:4:7M 4:2:3 6:4:#5'],
  ['C', 'F1 · 7,#5,1,3',  '2:5:3 3:5:T 4:6:#5 6:7:7M'],
  ['C', 'F2 · 1,#5,7,3',  '2:5:3 3:4:7M 4:6:#5 5:3:T'],
  ['C', 'F2 · 3,7,1,#5',  '2:9:#5 3:5:T 4:9:7M 5:7:3'],
  ['C', 'F2 · #5,1,3,7',  '2:12:7M 3:9:3 4:10:T 5:11:#5'],
  ['C', 'F2 · 7,3,#5,1',  '2:1:T 3:1:#5 4:2:3 5:2:7M'],
  ['C', 'F3 · 1,3,#5,7',  '2:0:7M 3:1:#5 4:2:3 5:3:T'],
  ['C', 'F3 · 3,#5,7,1',  '2:1:T 3:4:7M 4:6:#5 5:7:3'],
  ['C', 'F3 · #5,7,1,3',  '2:5:3 3:5:T 4:9:7M 5:11:#5'],
  ['C', 'F3 · 7,1,3,#5',  '2:9:#5 3:9:3 4:10:T 5:14:7M'],
  ['C', 'F4 · 1,#5,7,3',  '1:12:3 2:12:7M 3:13:#5 4:10:T'],
  ['C', 'F4 · 3,7,1,#5',  '1:4:#5 2:1:T 3:4:7M 4:2:3'],
  ['C', 'F4 · #5,1,3,7',  '1:7:7M 2:5:3 3:5:T 4:6:#5'],
  ['C', 'F4 · 7,3,#5,1',  '1:8:T 2:9:#5 3:9:3 4:9:7M'],
];

// ---------------------------------------------------------------------------
// Locked exact shapes — root G (tests transposition by +7 semitones)
// ---------------------------------------------------------------------------

const LOCKED_G = [
  ['G', 'F1 · 1,7,3,#5',  '2:4:#5 3:4:3 4:4:7M 6:3:T'],
  ['G', 'F1 · 3,1,#5,7',  '2:7:7M 3:8:#5 4:5:T 6:7:3'],
  ['G', 'F1 · #5,3,7,1',  '2:8:T 3:11:7M 4:9:3 6:11:#5'],
  ['G', 'F1 · 7,#5,1,3',  '2:0:3 3:0:T 4:1:#5 6:2:7M'],
  ['G', 'F2 · 1,#5,7,3',  '2:12:3 3:11:7M 4:13:#5 5:10:T'],
  ['G', 'F2 · 3,7,1,#5',  '2:4:#5 3:0:T 4:4:7M 5:2:3'],
  ['G', 'F2 · #5,1,3,7',  '2:7:7M 3:4:3 4:5:T 5:6:#5'],
  ['G', 'F2 · 7,3,#5,1',  '2:8:T 3:8:#5 4:9:3 5:9:7M'],
  ['G', 'F3 · 1,3,#5,7',  '2:7:7M 3:8:#5 4:9:3 5:10:T'],
  ['G', 'F3 · 3,#5,7,1',  '2:8:T 3:11:7M 4:13:#5 5:14:3'],
  ['G', 'F3 · #5,7,1,3',  '2:0:3 3:0:T 4:4:7M 5:6:#5'],
  ['G', 'F3 · 7,1,3,#5',  '2:4:#5 3:4:3 4:5:T 5:9:7M'],
  ['G', 'F4 · 1,#5,7,3',  '1:7:3 2:7:7M 3:8:#5 4:5:T'],
  ['G', 'F4 · 3,7,1,#5',  '1:11:#5 2:8:T 3:11:7M 4:9:3'],
  ['G', 'F4 · #5,1,3,7',  '1:2:7M 2:0:3 3:0:T 4:1:#5'],
  ['G', 'F4 · 7,3,#5,1',  '1:3:T 2:4:#5 3:4:3 4:4:7M'],
];

// ---------------------------------------------------------------------------
// Locked exact shapes — root Bb/A# (tests transposition by +10 semitones)
// ---------------------------------------------------------------------------

const LOCKED_Bb = [
  ['A#', 'F1 · 1,7,3,#5',  '2:7:#5 3:7:3 4:7:7M 6:6:T'],
  ['A#', 'F1 · 3,1,#5,7',  '2:10:7M 3:11:#5 4:8:T 6:10:3'],
  ['A#', 'F1 · #5,3,7,1',  '2:11:T 3:14:7M 4:12:3 6:14:#5'],
  ['A#', 'F1 · 7,#5,1,3',  '2:3:3 3:3:T 4:4:#5 6:5:7M'],
  ['A#', 'F2 · 1,#5,7,3',  '2:3:3 3:2:7M 4:4:#5 5:1:T'],
  ['A#', 'F2 · 3,7,1,#5',  '2:7:#5 3:3:T 4:7:7M 5:5:3'],
  ['A#', 'F2 · #5,1,3,7',  '2:10:7M 3:7:3 4:8:T 5:9:#5'],
  ['A#', 'F2 · 7,3,#5,1',  '2:11:T 3:11:#5 4:12:3 5:12:7M'],
  ['A#', 'F3 · 1,3,#5,7',  '2:10:7M 3:11:#5 4:12:3 5:13:T'],
  ['A#', 'F3 · 3,#5,7,1',  '2:11:T 3:14:7M 4:16:#5 5:17:3'],
  ['A#', 'F3 · #5,7,1,3',  '2:3:3 3:3:T 4:7:7M 5:9:#5'],
  ['A#', 'F3 · 7,1,3,#5',  '2:7:#5 3:7:3 4:8:T 5:12:7M'],
  ['A#', 'F4 · 1,#5,7,3',  '1:10:3 2:10:7M 3:11:#5 4:8:T'],
  ['A#', 'F4 · 3,7,1,#5',  '1:14:#5 2:11:T 3:14:7M 4:12:3'],
  ['A#', 'F4 · #5,1,3,7',  '1:5:7M 2:3:3 3:3:T 4:4:#5'],
  ['A#', 'F4 · 7,3,#5,1',  '1:6:T 2:7:#5 3:7:3 4:7:7M'],
];

for (const [root, shape, expected] of [...LOCKED_C, ...LOCKED_G, ...LOCKED_Bb]) {
  test(`maj7(#5) / ${shape} @ ${root} keeps its exact voicing`, () => {
    assert.strictEqual(signature(root, shape), expected);
  });
}

// ---------------------------------------------------------------------------
// Tone-coverage test — every shape uses exactly the chord formula tones
// ---------------------------------------------------------------------------

test('every locked shape covers all four formula tones (T, 3, #5, 7M)', () => {
  const formula = new Set(LIBRARY['Acordes']['Tétrade aumentada 7M(#5)']);
  for (const [root, shape] of [...LOCKED_C, ...LOCKED_G, ...LOCKED_Bb].map(r => [r[0], r[1]])) {
    const labels = new Set(signature(root, shape).split(' ').map(s => s.split(':')[2]));
    for (const tone of formula) {
      assert.ok(labels.has(tone),
        `${shape} @ ${root}: formula tone "${tone}" missing from shape`);
    }
    for (const tone of labels) {
      assert.ok(formula.has(tone),
        `${shape} @ ${root}: foreign tone "${tone}" found in shape`);
    }
  }
});

// ---------------------------------------------------------------------------
// Voicing-filter test — inversion type resolves correctly for book shape names
// ---------------------------------------------------------------------------

test('voicingInversionType correctly classifies book chord shape names', () => {
  // Replicate the voicingInversionType logic from app.js inline.
  function voicingInversionType(voicing) {
    const bass = voicing.includes('·')
      ? voicing.split('·').pop().trim().split(',')[0].trim()
      : voicing.split('-')[0];
    if (bass === 'T' || bass === '1') return 'root';
    if (bass === '3' || bass === 'b3') return '1st';
    if (bass === '5' || bass === 'b5' || bass === '#5') return '2nd';
    return '3rd';
  }

  const cases = [
    ['F1 · 1,7,3,#5', 'root'],
    ['F1 · 3,1,#5,7', '1st'],
    ['F1 · #5,3,7,1', '2nd'],
    ['F1 · 7,#5,1,3', '3rd'],
    ['F2 · 1,#5,7,3', 'root'],
    ['F2 · 3,7,1,#5', '1st'],
    ['F2 · #5,1,3,7', '2nd'],
    ['F2 · 7,3,#5,1', '3rd'],
    ['F3 · 1,3,#5,7', 'root'],
    ['F3 · 3,#5,7,1', '1st'],
    ['F3 · #5,7,1,3', '2nd'],
    ['F3 · 7,1,3,#5', '3rd'],
    ['F4 · 1,#5,7,3', 'root'],
    ['F4 · 3,7,1,#5', '1st'],
    ['F4 · #5,1,3,7', '2nd'],
    ['F4 · 7,3,#5,1', '3rd'],
  ];

  for (const [name, expected] of cases) {
    assert.strictEqual(voicingInversionType(name), expected,
      `voicingInversionType("${name}") should be "${expected}"`);
  }
});
