/**
 * Shape lock for the book chord voicings of the six core tetrad types:
 *   7M, m7, m7(b5), 7, m(7M), dim7  (sections 5.1–5.4, 5.6–5.7 of the book).
 *
 * Companion to chord-shapes.test.js (which locks 7M(#5)). Same approach:
 * each expected signature is the sorted (string:fret:interval) output of
 * generateBookChord() at a given root. Any drift in BOOK_CHORD_PATTERNS
 * breaks the precise test(s) and shows the intent in the diff.
 *
 * Coverage: 6 types × 4 formations × 4 inversions = 96 shapes,
 * each locked at C, G and A#/Bb (transposition validated).
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
    fs.readFileSync(path.join(dir, 'i18n.js'),         'utf8'),
    fs.readFileSync(path.join(dir, 'music-engine.js'), 'utf8'),
    '\n;globalThis.__engine = { LIBRARY, BOOK_CHORD_PATTERNS, generateBookChord, hasBookChordPattern };',
  ].join('\n');
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const { LIBRARY, BOOK_CHORD_PATTERNS, generateBookChord, hasBookChordPattern } = loadEngine();

const TYPES = [
  'Tétrade maior 7M',
  'Tétrade menor 7',
  'Tétrade meio-diminuta m7(b5)',
  'Tétrade dominante 7',
  'Menor com sétima maior m(7M)',
  'Tétrade diminuta dim7',
];

function signature(lib, root, shapeName) {
  const formula = LIBRARY['Acordes'][lib];
  const items   = generateBookChord(root, lib, formula, 0, 24, [shapeName]);
  assert.strictEqual(items.length, 1,
    `generateBookChord("${root}", "${shapeName}") for ${lib}: expected 1 item, got ${items.length}`);
  return items[0].positions
    .slice()
    .sort((a, b) => a.string - b.string || a.fret - b.fret)
    .map(p => `${p.string}:${p.fret}:${p.label}`)
    .join(' ');
}

// --- Inventory ------------------------------------------------------------

test('all six tetrad types expose a book chord pattern', () => {
  for (const lib of TYPES) assert.ok(hasBookChordPattern(lib), `${lib} missing book pattern`);
});

test('each type has exactly 16 shapes (4 formations × 4 inversions)', () => {
  for (const lib of TYPES) assert.strictEqual(BOOK_CHORD_PATTERNS[lib].length, 16, lib);
});

test('each type has exactly 4 shapes per formation F1–F4', () => {
  for (const lib of TYPES) {
    for (const fn of ['F1', 'F2', 'F3', 'F4']) {
      const n = BOOK_CHORD_PATTERNS[lib].filter(s => s.name.startsWith(fn + ' ·')).length;
      assert.strictEqual(n, 4, `${lib} / ${fn} has ${n} shapes`);
    }
  }
});

test('every shape uses exactly its chord-formula tones (no extras, none missing)', () => {
  for (const lib of TYPES) {
    const formula = new Set(LIBRARY['Acordes'][lib]);
    for (const p of BOOK_CHORD_PATTERNS[lib]) {
      const tones = new Set(signature(lib, 'C', p.name).split(' ').map(s => s.split(':')[2]));
      for (const t of formula) assert.ok(tones.has(t), `${lib}/${p.name}: missing ${t}`);
      for (const t of tones)   assert.ok(formula.has(t), `${lib}/${p.name}: foreign ${t}`);
    }
  }
});

// --- Locked exact shapes (C, G, A#) ---------------------------------------
// [chordType, root, shapeName, expectedSignature]
const LOCKED = [
  // Tétrade maior 7M
  ['Tétrade maior 7M','C','F1 · 1,7,3,5','2:8:5 3:9:3 4:9:7M 6:8:T'],
  ['Tétrade maior 7M','C','F1 · 3,1,5,7','2:12:7M 3:12:5 4:10:T 6:12:3'],
  ['Tétrade maior 7M','C','F1 · 5,3,7,1','2:1:T 3:4:7M 4:2:3 6:3:5'],
  ['Tétrade maior 7M','C','F1 · 7,5,1,3','2:5:3 3:5:T 4:5:5 6:7:7M'],
  ['Tétrade maior 7M','C','F2 · 1,5,7,3','2:5:3 3:4:7M 4:5:5 5:3:T'],
  ['Tétrade maior 7M','C','F2 · 3,7,1,5','2:8:5 3:5:T 4:9:7M 5:7:3'],
  ['Tétrade maior 7M','C','F2 · 5,1,3,7','2:12:7M 3:9:3 4:10:T 5:10:5'],
  ['Tétrade maior 7M','C','F2 · 7,3,5,1','2:1:T 3:0:5 4:2:3 5:2:7M'],
  ['Tétrade maior 7M','C','F3 · 1,3,5,7','2:0:7M 3:0:5 4:2:3 5:3:T'],
  ['Tétrade maior 7M','C','F3 · 3,5,7,1','2:1:T 3:4:7M 4:5:5 5:7:3'],
  ['Tétrade maior 7M','C','F3 · 5,7,1,3','2:5:3 3:5:T 4:9:7M 5:10:5'],
  ['Tétrade maior 7M','C','F3 · 7,1,3,5','2:8:5 3:9:3 4:10:T 5:14:7M'],
  ['Tétrade maior 7M','C','F4 · 1,5,7,3','1:12:3 2:12:7M 3:12:5 4:10:T'],
  ['Tétrade maior 7M','C','F4 · 3,7,1,5','1:3:5 2:1:T 3:4:7M 4:2:3'],
  ['Tétrade maior 7M','C','F4 · 5,1,3,7','1:7:7M 2:5:3 3:5:T 4:5:5'],
  ['Tétrade maior 7M','C','F4 · 7,3,5,1','1:8:T 2:8:5 3:9:3 4:9:7M'],
  ['Tétrade maior 7M','G','F1 · 1,7,3,5','2:3:5 3:4:3 4:4:7M 6:3:T'],
  ['Tétrade maior 7M','G','F1 · 3,1,5,7','2:7:7M 3:7:5 4:5:T 6:7:3'],
  ['Tétrade maior 7M','G','F1 · 5,3,7,1','2:8:T 3:11:7M 4:9:3 6:10:5'],
  ['Tétrade maior 7M','G','F1 · 7,5,1,3','2:0:3 3:0:T 4:0:5 6:2:7M'],
  ['Tétrade maior 7M','G','F2 · 1,5,7,3','2:12:3 3:11:7M 4:12:5 5:10:T'],
  ['Tétrade maior 7M','G','F2 · 3,7,1,5','2:3:5 3:0:T 4:4:7M 5:2:3'],
  ['Tétrade maior 7M','G','F2 · 5,1,3,7','2:7:7M 3:4:3 4:5:T 5:5:5'],
  ['Tétrade maior 7M','G','F2 · 7,3,5,1','2:8:T 3:7:5 4:9:3 5:9:7M'],
  ['Tétrade maior 7M','G','F3 · 1,3,5,7','2:7:7M 3:7:5 4:9:3 5:10:T'],
  ['Tétrade maior 7M','G','F3 · 3,5,7,1','2:8:T 3:11:7M 4:12:5 5:14:3'],
  ['Tétrade maior 7M','G','F3 · 5,7,1,3','2:0:3 3:0:T 4:4:7M 5:5:5'],
  ['Tétrade maior 7M','G','F3 · 7,1,3,5','2:3:5 3:4:3 4:5:T 5:9:7M'],
  ['Tétrade maior 7M','G','F4 · 1,5,7,3','1:7:3 2:7:7M 3:7:5 4:5:T'],
  ['Tétrade maior 7M','G','F4 · 3,7,1,5','1:10:5 2:8:T 3:11:7M 4:9:3'],
  ['Tétrade maior 7M','G','F4 · 5,1,3,7','1:2:7M 2:0:3 3:0:T 4:0:5'],
  ['Tétrade maior 7M','G','F4 · 7,3,5,1','1:3:T 2:3:5 3:4:3 4:4:7M'],
  ['Tétrade maior 7M','A#','F1 · 1,7,3,5','2:6:5 3:7:3 4:7:7M 6:6:T'],
  ['Tétrade maior 7M','A#','F1 · 3,1,5,7','2:10:7M 3:10:5 4:8:T 6:10:3'],
  ['Tétrade maior 7M','A#','F1 · 5,3,7,1','2:11:T 3:14:7M 4:12:3 6:13:5'],
  ['Tétrade maior 7M','A#','F1 · 7,5,1,3','2:3:3 3:3:T 4:3:5 6:5:7M'],
  ['Tétrade maior 7M','A#','F2 · 1,5,7,3','2:3:3 3:2:7M 4:3:5 5:1:T'],
  ['Tétrade maior 7M','A#','F2 · 3,7,1,5','2:6:5 3:3:T 4:7:7M 5:5:3'],
  ['Tétrade maior 7M','A#','F2 · 5,1,3,7','2:10:7M 3:7:3 4:8:T 5:8:5'],
  ['Tétrade maior 7M','A#','F2 · 7,3,5,1','2:11:T 3:10:5 4:12:3 5:12:7M'],
  ['Tétrade maior 7M','A#','F3 · 1,3,5,7','2:10:7M 3:10:5 4:12:3 5:13:T'],
  ['Tétrade maior 7M','A#','F3 · 3,5,7,1','2:11:T 3:14:7M 4:15:5 5:17:3'],
  ['Tétrade maior 7M','A#','F3 · 5,7,1,3','2:3:3 3:3:T 4:7:7M 5:8:5'],
  ['Tétrade maior 7M','A#','F3 · 7,1,3,5','2:6:5 3:7:3 4:8:T 5:12:7M'],
  ['Tétrade maior 7M','A#','F4 · 1,5,7,3','1:10:3 2:10:7M 3:10:5 4:8:T'],
  ['Tétrade maior 7M','A#','F4 · 3,7,1,5','1:13:5 2:11:T 3:14:7M 4:12:3'],
  ['Tétrade maior 7M','A#','F4 · 5,1,3,7','1:5:7M 2:3:3 3:3:T 4:3:5'],
  ['Tétrade maior 7M','A#','F4 · 7,3,5,1','1:6:T 2:6:5 3:7:3 4:7:7M'],
  // Tétrade menor 7
  ['Tétrade menor 7','C','F1 · 1,b7,b3,5','2:8:5 3:8:b3 4:8:b7 6:8:T'],
  ['Tétrade menor 7','C','F1 · b3,1,5,b7','2:11:b7 3:12:5 4:10:T 6:11:b3'],
  ['Tétrade menor 7','C','F1 · 5,b3,b7,1','2:1:T 3:3:b7 4:1:b3 6:3:5'],
  ['Tétrade menor 7','C','F1 · b7,5,1,b3','2:4:b3 3:5:T 4:5:5 6:6:b7'],
  ['Tétrade menor 7','C','F2 · 1,5,b7,b3','2:4:b3 3:3:b7 4:5:5 5:3:T'],
  ['Tétrade menor 7','C','F2 · b3,b7,1,5','2:8:5 3:5:T 4:8:b7 5:6:b3'],
  ['Tétrade menor 7','C','F2 · 5,1,b3,b7','2:11:b7 3:8:b3 4:10:T 5:10:5'],
  ['Tétrade menor 7','C','F2 · b7,b3,5,1','2:1:T 3:0:5 4:1:b3 5:1:b7'],
  ['Tétrade menor 7','C','F3 · 1,b3,5,b7','2:11:b7 3:12:5 4:13:b3 5:15:T'],
  ['Tétrade menor 7','C','F3 · b3,5,b7,1','2:1:T 3:3:b7 4:5:5 5:6:b3'],
  ['Tétrade menor 7','C','F3 · 5,b7,1,b3','2:4:b3 3:5:T 4:8:b7 5:10:5'],
  ['Tétrade menor 7','C','F3 · b7,1,b3,5','2:8:5 3:8:b3 4:10:T 5:13:b7'],
  ['Tétrade menor 7','C','F4 · 1,5,b7,b3','1:11:b3 2:11:b7 3:12:5 4:10:T'],
  ['Tétrade menor 7','C','F4 · b3,b7,1,5','1:3:5 2:1:T 3:3:b7 4:1:b3'],
  ['Tétrade menor 7','C','F4 · 5,1,b3,b7','1:6:b7 2:4:b3 3:5:T 4:5:5'],
  ['Tétrade menor 7','C','F4 · b7,b3,5,1','1:8:T 2:8:5 3:8:b3 4:8:b7'],
  ['Tétrade menor 7','G','F1 · 1,b7,b3,5','2:3:5 3:3:b3 4:3:b7 6:3:T'],
  ['Tétrade menor 7','G','F1 · b3,1,5,b7','2:6:b7 3:7:5 4:5:T 6:6:b3'],
  ['Tétrade menor 7','G','F1 · 5,b3,b7,1','2:8:T 3:10:b7 4:8:b3 6:10:5'],
  ['Tétrade menor 7','G','F1 · b7,5,1,b3','2:11:b3 3:12:T 4:12:5 6:13:b7'],
  ['Tétrade menor 7','G','F2 · 1,5,b7,b3','2:11:b3 3:10:b7 4:12:5 5:10:T'],
  ['Tétrade menor 7','G','F2 · b3,b7,1,5','2:3:5 3:0:T 4:3:b7 5:1:b3'],
  ['Tétrade menor 7','G','F2 · 5,1,b3,b7','2:6:b7 3:3:b3 4:5:T 5:5:5'],
  ['Tétrade menor 7','G','F2 · b7,b3,5,1','2:8:T 3:7:5 4:8:b3 5:8:b7'],
  ['Tétrade menor 7','G','F3 · 1,b3,5,b7','2:6:b7 3:7:5 4:8:b3 5:10:T'],
  ['Tétrade menor 7','G','F3 · b3,5,b7,1','2:8:T 3:10:b7 4:12:5 5:13:b3'],
  ['Tétrade menor 7','G','F3 · 5,b7,1,b3','2:11:b3 3:12:T 4:15:b7 5:17:5'],
  ['Tétrade menor 7','G','F3 · b7,1,b3,5','2:3:5 3:3:b3 4:5:T 5:8:b7'],
  ['Tétrade menor 7','G','F4 · 1,5,b7,b3','1:6:b3 2:6:b7 3:7:5 4:5:T'],
  ['Tétrade menor 7','G','F4 · b3,b7,1,5','1:10:5 2:8:T 3:10:b7 4:8:b3'],
  ['Tétrade menor 7','G','F4 · 5,1,b3,b7','1:13:b7 2:11:b3 3:12:T 4:12:5'],
  ['Tétrade menor 7','G','F4 · b7,b3,5,1','1:3:T 2:3:5 3:3:b3 4:3:b7'],
  ['Tétrade menor 7','A#','F1 · 1,b7,b3,5','2:6:5 3:6:b3 4:6:b7 6:6:T'],
  ['Tétrade menor 7','A#','F1 · b3,1,5,b7','2:9:b7 3:10:5 4:8:T 6:9:b3'],
  ['Tétrade menor 7','A#','F1 · 5,b3,b7,1','2:11:T 3:13:b7 4:11:b3 6:13:5'],
  ['Tétrade menor 7','A#','F1 · b7,5,1,b3','2:2:b3 3:3:T 4:3:5 6:4:b7'],
  ['Tétrade menor 7','A#','F2 · 1,5,b7,b3','2:2:b3 3:1:b7 4:3:5 5:1:T'],
  ['Tétrade menor 7','A#','F2 · b3,b7,1,5','2:6:5 3:3:T 4:6:b7 5:4:b3'],
  ['Tétrade menor 7','A#','F2 · 5,1,b3,b7','2:9:b7 3:6:b3 4:8:T 5:8:5'],
  ['Tétrade menor 7','A#','F2 · b7,b3,5,1','2:11:T 3:10:5 4:11:b3 5:11:b7'],
  ['Tétrade menor 7','A#','F3 · 1,b3,5,b7','2:9:b7 3:10:5 4:11:b3 5:13:T'],
  ['Tétrade menor 7','A#','F3 · b3,5,b7,1','2:11:T 3:13:b7 4:15:5 5:16:b3'],
  ['Tétrade menor 7','A#','F3 · 5,b7,1,b3','2:2:b3 3:3:T 4:6:b7 5:8:5'],
  ['Tétrade menor 7','A#','F3 · b7,1,b3,5','2:6:5 3:6:b3 4:8:T 5:11:b7'],
  ['Tétrade menor 7','A#','F4 · 1,5,b7,b3','1:9:b3 2:9:b7 3:10:5 4:8:T'],
  ['Tétrade menor 7','A#','F4 · b3,b7,1,5','1:13:5 2:11:T 3:13:b7 4:11:b3'],
  ['Tétrade menor 7','A#','F4 · 5,1,b3,b7','1:4:b7 2:2:b3 3:3:T 4:3:5'],
  ['Tétrade menor 7','A#','F4 · b7,b3,5,1','1:6:T 2:6:5 3:6:b3 4:6:b7'],
  // Tétrade meio-diminuta m7(b5)
  ['Tétrade meio-diminuta m7(b5)','C','F1 · 1,b7,b3,b5','2:7:b5 3:8:b3 4:8:b7 6:8:T'],
  ['Tétrade meio-diminuta m7(b5)','C','F1 · b3,1,b5,b7','2:11:b7 3:11:b5 4:10:T 6:11:b3'],
  ['Tétrade meio-diminuta m7(b5)','C','F1 · b5,b3,b7,1','2:1:T 3:3:b7 4:1:b3 6:2:b5'],
  ['Tétrade meio-diminuta m7(b5)','C','F1 · b7,b5,1,b3','2:4:b3 3:5:T 4:4:b5 6:6:b7'],
  ['Tétrade meio-diminuta m7(b5)','C','F2 · 1,b5,b7,b3','2:4:b3 3:3:b7 4:4:b5 5:3:T'],
  ['Tétrade meio-diminuta m7(b5)','C','F2 · b3,b7,1,b5','2:7:b5 3:5:T 4:8:b7 5:6:b3'],
  ['Tétrade meio-diminuta m7(b5)','C','F2 · b5,1,b3,b7','2:11:b7 3:8:b3 4:10:T 5:9:b5'],
  ['Tétrade meio-diminuta m7(b5)','C','F2 · b7,b3,b5,1','2:13:T 3:11:b5 4:13:b3 5:13:b7'],
  ['Tétrade meio-diminuta m7(b5)','C','F3 · 1,b3,b5,b7','2:11:b7 3:11:b5 4:13:b3 5:15:T'],
  ['Tétrade meio-diminuta m7(b5)','C','F3 · b3,b5,b7,1','2:1:T 3:3:b7 4:4:b5 5:6:b3'],
  ['Tétrade meio-diminuta m7(b5)','C','F3 · b5,b7,1,b3','2:4:b3 3:5:T 4:8:b7 5:9:b5'],
  ['Tétrade meio-diminuta m7(b5)','C','F3 · b7,1,b3,b5','2:7:b5 3:8:b3 4:10:T 5:13:b7'],
  ['Tétrade meio-diminuta m7(b5)','C','F4 · 1,b5,b7,b3','1:11:b3 2:11:b7 3:11:b5 4:10:T'],
  ['Tétrade meio-diminuta m7(b5)','C','F4 · b3,b7,1,b5','1:2:b5 2:1:T 3:3:b7 4:1:b3'],
  ['Tétrade meio-diminuta m7(b5)','C','F4 · b5,1,b3,b7','1:6:b7 2:4:b3 3:5:T 4:4:b5'],
  ['Tétrade meio-diminuta m7(b5)','C','F4 · b7,b3,b5,1','1:8:T 2:7:b5 3:8:b3 4:8:b7'],
  ['Tétrade meio-diminuta m7(b5)','G','F1 · 1,b7,b3,b5','2:2:b5 3:3:b3 4:3:b7 6:3:T'],
  ['Tétrade meio-diminuta m7(b5)','G','F1 · b3,1,b5,b7','2:6:b7 3:6:b5 4:5:T 6:6:b3'],
  ['Tétrade meio-diminuta m7(b5)','G','F1 · b5,b3,b7,1','2:8:T 3:10:b7 4:8:b3 6:9:b5'],
  ['Tétrade meio-diminuta m7(b5)','G','F1 · b7,b5,1,b3','2:11:b3 3:12:T 4:11:b5 6:13:b7'],
  ['Tétrade meio-diminuta m7(b5)','G','F2 · 1,b5,b7,b3','2:11:b3 3:10:b7 4:11:b5 5:10:T'],
  ['Tétrade meio-diminuta m7(b5)','G','F2 · b3,b7,1,b5','2:2:b5 3:0:T 4:3:b7 5:1:b3'],
  ['Tétrade meio-diminuta m7(b5)','G','F2 · b5,1,b3,b7','2:6:b7 3:3:b3 4:5:T 5:4:b5'],
  ['Tétrade meio-diminuta m7(b5)','G','F2 · b7,b3,b5,1','2:8:T 3:6:b5 4:8:b3 5:8:b7'],
  ['Tétrade meio-diminuta m7(b5)','G','F3 · 1,b3,b5,b7','2:6:b7 3:6:b5 4:8:b3 5:10:T'],
  ['Tétrade meio-diminuta m7(b5)','G','F3 · b3,b5,b7,1','2:8:T 3:10:b7 4:11:b5 5:13:b3'],
  ['Tétrade meio-diminuta m7(b5)','G','F3 · b5,b7,1,b3','2:11:b3 3:12:T 4:15:b7 5:16:b5'],
  ['Tétrade meio-diminuta m7(b5)','G','F3 · b7,1,b3,b5','2:2:b5 3:3:b3 4:5:T 5:8:b7'],
  ['Tétrade meio-diminuta m7(b5)','G','F4 · 1,b5,b7,b3','1:6:b3 2:6:b7 3:6:b5 4:5:T'],
  ['Tétrade meio-diminuta m7(b5)','G','F4 · b3,b7,1,b5','1:9:b5 2:8:T 3:10:b7 4:8:b3'],
  ['Tétrade meio-diminuta m7(b5)','G','F4 · b5,1,b3,b7','1:13:b7 2:11:b3 3:12:T 4:11:b5'],
  ['Tétrade meio-diminuta m7(b5)','G','F4 · b7,b3,b5,1','1:3:T 2:2:b5 3:3:b3 4:3:b7'],
  ['Tétrade meio-diminuta m7(b5)','A#','F1 · 1,b7,b3,b5','2:5:b5 3:6:b3 4:6:b7 6:6:T'],
  ['Tétrade meio-diminuta m7(b5)','A#','F1 · b3,1,b5,b7','2:9:b7 3:9:b5 4:8:T 6:9:b3'],
  ['Tétrade meio-diminuta m7(b5)','A#','F1 · b5,b3,b7,1','2:11:T 3:13:b7 4:11:b3 6:12:b5'],
  ['Tétrade meio-diminuta m7(b5)','A#','F1 · b7,b5,1,b3','2:2:b3 3:3:T 4:2:b5 6:4:b7'],
  ['Tétrade meio-diminuta m7(b5)','A#','F2 · 1,b5,b7,b3','2:2:b3 3:1:b7 4:2:b5 5:1:T'],
  ['Tétrade meio-diminuta m7(b5)','A#','F2 · b3,b7,1,b5','2:5:b5 3:3:T 4:6:b7 5:4:b3'],
  ['Tétrade meio-diminuta m7(b5)','A#','F2 · b5,1,b3,b7','2:9:b7 3:6:b3 4:8:T 5:7:b5'],
  ['Tétrade meio-diminuta m7(b5)','A#','F2 · b7,b3,b5,1','2:11:T 3:9:b5 4:11:b3 5:11:b7'],
  ['Tétrade meio-diminuta m7(b5)','A#','F3 · 1,b3,b5,b7','2:9:b7 3:9:b5 4:11:b3 5:13:T'],
  ['Tétrade meio-diminuta m7(b5)','A#','F3 · b3,b5,b7,1','2:11:T 3:13:b7 4:14:b5 5:16:b3'],
  ['Tétrade meio-diminuta m7(b5)','A#','F3 · b5,b7,1,b3','2:2:b3 3:3:T 4:6:b7 5:7:b5'],
  ['Tétrade meio-diminuta m7(b5)','A#','F3 · b7,1,b3,b5','2:5:b5 3:6:b3 4:8:T 5:11:b7'],
  ['Tétrade meio-diminuta m7(b5)','A#','F4 · 1,b5,b7,b3','1:9:b3 2:9:b7 3:9:b5 4:8:T'],
  ['Tétrade meio-diminuta m7(b5)','A#','F4 · b3,b7,1,b5','1:12:b5 2:11:T 3:13:b7 4:11:b3'],
  ['Tétrade meio-diminuta m7(b5)','A#','F4 · b5,1,b3,b7','1:4:b7 2:2:b3 3:3:T 4:2:b5'],
  ['Tétrade meio-diminuta m7(b5)','A#','F4 · b7,b3,b5,1','1:6:T 2:5:b5 3:6:b3 4:6:b7'],
  // Tétrade dominante 7
  ['Tétrade dominante 7','C','F1 · 1,b7,3,5','2:8:5 3:9:3 4:8:b7 6:8:T'],
  ['Tétrade dominante 7','C','F1 · 3,1,5,b7','2:11:b7 3:12:5 4:10:T 6:12:3'],
  ['Tétrade dominante 7','C','F1 · 5,3,b7,1','2:1:T 3:3:b7 4:2:3 6:3:5'],
  ['Tétrade dominante 7','C','F1 · b7,5,1,3','2:5:3 3:5:T 4:5:5 6:6:b7'],
  ['Tétrade dominante 7','C','F2 · 1,5,b7,3','2:5:3 3:3:b7 4:5:5 5:3:T'],
  ['Tétrade dominante 7','C','F2 · 3,b7,1,5','2:8:5 3:5:T 4:8:b7 5:7:3'],
  ['Tétrade dominante 7','C','F2 · 5,1,3,b7','2:11:b7 3:9:3 4:10:T 5:10:5'],
  ['Tétrade dominante 7','C','F2 · b7,3,5,1','2:1:T 3:0:5 4:2:3 5:1:b7'],
  ['Tétrade dominante 7','C','F3 · 1,3,5,b7','2:11:b7 3:12:5 4:14:3 5:15:T'],
  ['Tétrade dominante 7','C','F3 · 3,5,b7,1','2:1:T 3:3:b7 4:5:5 5:7:3'],
  ['Tétrade dominante 7','C','F3 · 5,b7,1,3','2:5:3 3:5:T 4:8:b7 5:10:5'],
  ['Tétrade dominante 7','C','F3 · b7,1,3,5','2:8:5 3:9:3 4:10:T 5:13:b7'],
  ['Tétrade dominante 7','C','F4 · 1,5,b7,3','1:12:3 2:11:b7 3:12:5 4:10:T'],
  ['Tétrade dominante 7','C','F4 · 3,b7,1,5','1:3:5 2:1:T 3:3:b7 4:2:3'],
  ['Tétrade dominante 7','C','F4 · 5,1,3,b7','1:6:b7 2:5:3 3:5:T 4:5:5'],
  ['Tétrade dominante 7','C','F4 · b7,3,5,1','1:8:T 2:8:5 3:9:3 4:8:b7'],
  ['Tétrade dominante 7','G','F1 · 1,b7,3,5','2:3:5 3:4:3 4:3:b7 6:3:T'],
  ['Tétrade dominante 7','G','F1 · 3,1,5,b7','2:6:b7 3:7:5 4:5:T 6:7:3'],
  ['Tétrade dominante 7','G','F1 · 5,3,b7,1','2:8:T 3:10:b7 4:9:3 6:10:5'],
  ['Tétrade dominante 7','G','F1 · b7,5,1,3','2:0:3 3:0:T 4:0:5 6:1:b7'],
  ['Tétrade dominante 7','G','F2 · 1,5,b7,3','2:12:3 3:10:b7 4:12:5 5:10:T'],
  ['Tétrade dominante 7','G','F2 · 3,b7,1,5','2:3:5 3:0:T 4:3:b7 5:2:3'],
  ['Tétrade dominante 7','G','F2 · 5,1,3,b7','2:6:b7 3:4:3 4:5:T 5:5:5'],
  ['Tétrade dominante 7','G','F2 · b7,3,5,1','2:8:T 3:7:5 4:9:3 5:8:b7'],
  ['Tétrade dominante 7','G','F3 · 1,3,5,b7','2:6:b7 3:7:5 4:9:3 5:10:T'],
  ['Tétrade dominante 7','G','F3 · 3,5,b7,1','2:8:T 3:10:b7 4:12:5 5:14:3'],
  ['Tétrade dominante 7','G','F3 · 5,b7,1,3','2:0:3 3:0:T 4:3:b7 5:5:5'],
  ['Tétrade dominante 7','G','F3 · b7,1,3,5','2:3:5 3:4:3 4:5:T 5:8:b7'],
  ['Tétrade dominante 7','G','F4 · 1,5,b7,3','1:7:3 2:6:b7 3:7:5 4:5:T'],
  ['Tétrade dominante 7','G','F4 · 3,b7,1,5','1:10:5 2:8:T 3:10:b7 4:9:3'],
  ['Tétrade dominante 7','G','F4 · 5,1,3,b7','1:1:b7 2:0:3 3:0:T 4:0:5'],
  ['Tétrade dominante 7','G','F4 · b7,3,5,1','1:3:T 2:3:5 3:4:3 4:3:b7'],
  ['Tétrade dominante 7','A#','F1 · 1,b7,3,5','2:6:5 3:7:3 4:6:b7 6:6:T'],
  ['Tétrade dominante 7','A#','F1 · 3,1,5,b7','2:9:b7 3:10:5 4:8:T 6:10:3'],
  ['Tétrade dominante 7','A#','F1 · 5,3,b7,1','2:11:T 3:13:b7 4:12:3 6:13:5'],
  ['Tétrade dominante 7','A#','F1 · b7,5,1,3','2:3:3 3:3:T 4:3:5 6:4:b7'],
  ['Tétrade dominante 7','A#','F2 · 1,5,b7,3','2:3:3 3:1:b7 4:3:5 5:1:T'],
  ['Tétrade dominante 7','A#','F2 · 3,b7,1,5','2:6:5 3:3:T 4:6:b7 5:5:3'],
  ['Tétrade dominante 7','A#','F2 · 5,1,3,b7','2:9:b7 3:7:3 4:8:T 5:8:5'],
  ['Tétrade dominante 7','A#','F2 · b7,3,5,1','2:11:T 3:10:5 4:12:3 5:11:b7'],
  ['Tétrade dominante 7','A#','F3 · 1,3,5,b7','2:9:b7 3:10:5 4:12:3 5:13:T'],
  ['Tétrade dominante 7','A#','F3 · 3,5,b7,1','2:11:T 3:13:b7 4:15:5 5:17:3'],
  ['Tétrade dominante 7','A#','F3 · 5,b7,1,3','2:3:3 3:3:T 4:6:b7 5:8:5'],
  ['Tétrade dominante 7','A#','F3 · b7,1,3,5','2:6:5 3:7:3 4:8:T 5:11:b7'],
  ['Tétrade dominante 7','A#','F4 · 1,5,b7,3','1:10:3 2:9:b7 3:10:5 4:8:T'],
  ['Tétrade dominante 7','A#','F4 · 3,b7,1,5','1:13:5 2:11:T 3:13:b7 4:12:3'],
  ['Tétrade dominante 7','A#','F4 · 5,1,3,b7','1:4:b7 2:3:3 3:3:T 4:3:5'],
  ['Tétrade dominante 7','A#','F4 · b7,3,5,1','1:6:T 2:6:5 3:7:3 4:6:b7'],
  // Menor com sétima maior m(7M)
  ['Menor com sétima maior m(7M)','C','F1 · 1,7,b3,5','2:8:5 3:8:b3 4:9:7M 6:8:T'],
  ['Menor com sétima maior m(7M)','C','F1 · b3,1,5,7','2:12:7M 3:12:5 4:10:T 6:11:b3'],
  ['Menor com sétima maior m(7M)','C','F1 · 5,b3,7,1','2:1:T 3:4:7M 4:1:b3 6:3:5'],
  ['Menor com sétima maior m(7M)','C','F1 · 7,5,1,b3','2:4:b3 3:5:T 4:5:5 6:7:7M'],
  ['Menor com sétima maior m(7M)','C','F2 · 1,5,7,b3','2:4:b3 3:4:7M 4:5:5 5:3:T'],
  ['Menor com sétima maior m(7M)','C','F2 · b3,7,1,5','2:8:5 3:5:T 4:9:7M 5:6:b3'],
  ['Menor com sétima maior m(7M)','C','F2 · 5,1,b3,7','2:12:7M 3:8:b3 4:10:T 5:10:5'],
  ['Menor com sétima maior m(7M)','C','F2 · 7,b3,5,1','2:1:T 3:0:5 4:1:b3 5:2:7M'],
  ['Menor com sétima maior m(7M)','C','F3 · 1,b3,5,7','2:0:7M 3:0:5 4:1:b3 5:3:T'],
  ['Menor com sétima maior m(7M)','C','F3 · b3,5,7,1','2:1:T 3:4:7M 4:5:5 5:6:b3'],
  ['Menor com sétima maior m(7M)','C','F3 · 5,7,1,b3','2:4:b3 3:5:T 4:9:7M 5:10:5'],
  ['Menor com sétima maior m(7M)','C','F3 · 7,1,b3,5','2:8:5 3:8:b3 4:10:T 5:14:7M'],
  ['Menor com sétima maior m(7M)','C','F4 · 1,5,7,b3','1:11:b3 2:12:7M 3:12:5 4:10:T'],
  ['Menor com sétima maior m(7M)','C','F4 · b3,7,1,5','1:3:5 2:1:T 3:4:7M 4:1:b3'],
  ['Menor com sétima maior m(7M)','C','F4 · 5,1,b3,7','1:7:7M 2:4:b3 3:5:T 4:5:5'],
  ['Menor com sétima maior m(7M)','C','F4 · 7,b3,5,1','1:8:T 2:8:5 3:8:b3 4:9:7M'],
  ['Menor com sétima maior m(7M)','G','F1 · 1,7,b3,5','2:3:5 3:3:b3 4:4:7M 6:3:T'],
  ['Menor com sétima maior m(7M)','G','F1 · b3,1,5,7','2:7:7M 3:7:5 4:5:T 6:6:b3'],
  ['Menor com sétima maior m(7M)','G','F1 · 5,b3,7,1','2:8:T 3:11:7M 4:8:b3 6:10:5'],
  ['Menor com sétima maior m(7M)','G','F1 · 7,5,1,b3','2:11:b3 3:12:T 4:12:5 6:14:7M'],
  ['Menor com sétima maior m(7M)','G','F2 · 1,5,7,b3','2:11:b3 3:11:7M 4:12:5 5:10:T'],
  ['Menor com sétima maior m(7M)','G','F2 · b3,7,1,5','2:3:5 3:0:T 4:4:7M 5:1:b3'],
  ['Menor com sétima maior m(7M)','G','F2 · 5,1,b3,7','2:7:7M 3:3:b3 4:5:T 5:5:5'],
  ['Menor com sétima maior m(7M)','G','F2 · 7,b3,5,1','2:8:T 3:7:5 4:8:b3 5:9:7M'],
  ['Menor com sétima maior m(7M)','G','F3 · 1,b3,5,7','2:7:7M 3:7:5 4:8:b3 5:10:T'],
  ['Menor com sétima maior m(7M)','G','F3 · b3,5,7,1','2:8:T 3:11:7M 4:12:5 5:13:b3'],
  ['Menor com sétima maior m(7M)','G','F3 · 5,7,1,b3','2:11:b3 3:12:T 4:16:7M 5:17:5'],
  ['Menor com sétima maior m(7M)','G','F3 · 7,1,b3,5','2:3:5 3:3:b3 4:5:T 5:9:7M'],
  ['Menor com sétima maior m(7M)','G','F4 · 1,5,7,b3','1:6:b3 2:7:7M 3:7:5 4:5:T'],
  ['Menor com sétima maior m(7M)','G','F4 · b3,7,1,5','1:10:5 2:8:T 3:11:7M 4:8:b3'],
  ['Menor com sétima maior m(7M)','G','F4 · 5,1,b3,7','1:14:7M 2:11:b3 3:12:T 4:12:5'],
  ['Menor com sétima maior m(7M)','G','F4 · 7,b3,5,1','1:3:T 2:3:5 3:3:b3 4:4:7M'],
  ['Menor com sétima maior m(7M)','A#','F1 · 1,7,b3,5','2:6:5 3:6:b3 4:7:7M 6:6:T'],
  ['Menor com sétima maior m(7M)','A#','F1 · b3,1,5,7','2:10:7M 3:10:5 4:8:T 6:9:b3'],
  ['Menor com sétima maior m(7M)','A#','F1 · 5,b3,7,1','2:11:T 3:14:7M 4:11:b3 6:13:5'],
  ['Menor com sétima maior m(7M)','A#','F1 · 7,5,1,b3','2:2:b3 3:3:T 4:3:5 6:5:7M'],
  ['Menor com sétima maior m(7M)','A#','F2 · 1,5,7,b3','2:2:b3 3:2:7M 4:3:5 5:1:T'],
  ['Menor com sétima maior m(7M)','A#','F2 · b3,7,1,5','2:6:5 3:3:T 4:7:7M 5:4:b3'],
  ['Menor com sétima maior m(7M)','A#','F2 · 5,1,b3,7','2:10:7M 3:6:b3 4:8:T 5:8:5'],
  ['Menor com sétima maior m(7M)','A#','F2 · 7,b3,5,1','2:11:T 3:10:5 4:11:b3 5:12:7M'],
  ['Menor com sétima maior m(7M)','A#','F3 · 1,b3,5,7','2:10:7M 3:10:5 4:11:b3 5:13:T'],
  ['Menor com sétima maior m(7M)','A#','F3 · b3,5,7,1','2:11:T 3:14:7M 4:15:5 5:16:b3'],
  ['Menor com sétima maior m(7M)','A#','F3 · 5,7,1,b3','2:2:b3 3:3:T 4:7:7M 5:8:5'],
  ['Menor com sétima maior m(7M)','A#','F3 · 7,1,b3,5','2:6:5 3:6:b3 4:8:T 5:12:7M'],
  ['Menor com sétima maior m(7M)','A#','F4 · 1,5,7,b3','1:9:b3 2:10:7M 3:10:5 4:8:T'],
  ['Menor com sétima maior m(7M)','A#','F4 · b3,7,1,5','1:13:5 2:11:T 3:14:7M 4:11:b3'],
  ['Menor com sétima maior m(7M)','A#','F4 · 5,1,b3,7','1:5:7M 2:2:b3 3:3:T 4:3:5'],
  ['Menor com sétima maior m(7M)','A#','F4 · 7,b3,5,1','1:6:T 2:6:5 3:6:b3 4:7:7M'],
  // Tétrade diminuta dim7
  ['Tétrade diminuta dim7','C','F1 · 1,bb7,b3,b5','2:7:b5 3:8:b3 4:7:bb7 6:8:T'],
  ['Tétrade diminuta dim7','C','F1 · b3,1,b5,bb7','2:10:bb7 3:11:b5 4:10:T 6:11:b3'],
  ['Tétrade diminuta dim7','C','F1 · b5,b3,bb7,1','2:1:T 3:2:bb7 4:1:b3 6:2:b5'],
  ['Tétrade diminuta dim7','C','F1 · bb7,b5,1,b3','2:4:b3 3:5:T 4:4:b5 6:5:bb7'],
  ['Tétrade diminuta dim7','C','F2 · 1,b5,bb7,b3','2:4:b3 3:2:bb7 4:4:b5 5:3:T'],
  ['Tétrade diminuta dim7','C','F2 · b3,bb7,1,b5','2:7:b5 3:5:T 4:7:bb7 5:6:b3'],
  ['Tétrade diminuta dim7','C','F2 · b5,1,b3,bb7','2:10:bb7 3:8:b3 4:10:T 5:9:b5'],
  ['Tétrade diminuta dim7','C','F2 · bb7,b3,b5,1','2:13:T 3:11:b5 4:13:b3 5:12:bb7'],
  ['Tétrade diminuta dim7','C','F3 · 1,b3,b5,bb7','2:10:bb7 3:11:b5 4:13:b3 5:15:T'],
  ['Tétrade diminuta dim7','C','F3 · b3,b5,bb7,1','2:1:T 3:2:bb7 4:4:b5 5:6:b3'],
  ['Tétrade diminuta dim7','C','F3 · b5,bb7,1,b3','2:4:b3 3:5:T 4:7:bb7 5:9:b5'],
  ['Tétrade diminuta dim7','C','F3 · bb7,1,b3,b5','2:7:b5 3:8:b3 4:10:T 5:12:bb7'],
  ['Tétrade diminuta dim7','C','F4 · 1,b5,bb7,b3','1:11:b3 2:10:bb7 3:11:b5 4:10:T'],
  ['Tétrade diminuta dim7','C','F4 · b3,bb7,1,b5','1:2:b5 2:1:T 3:2:bb7 4:1:b3'],
  ['Tétrade diminuta dim7','C','F4 · b5,1,b3,bb7','1:5:bb7 2:4:b3 3:5:T 4:4:b5'],
  ['Tétrade diminuta dim7','C','F4 · bb7,b3,b5,1','1:8:T 2:7:b5 3:8:b3 4:7:bb7'],
  ['Tétrade diminuta dim7','G','F1 · 1,bb7,b3,b5','2:2:b5 3:3:b3 4:2:bb7 6:3:T'],
  ['Tétrade diminuta dim7','G','F1 · b3,1,b5,bb7','2:5:bb7 3:6:b5 4:5:T 6:6:b3'],
  ['Tétrade diminuta dim7','G','F1 · b5,b3,bb7,1','2:8:T 3:9:bb7 4:8:b3 6:9:b5'],
  ['Tétrade diminuta dim7','G','F1 · bb7,b5,1,b3','2:11:b3 3:12:T 4:11:b5 6:12:bb7'],
  ['Tétrade diminuta dim7','G','F2 · 1,b5,bb7,b3','2:11:b3 3:9:bb7 4:11:b5 5:10:T'],
  ['Tétrade diminuta dim7','G','F2 · b3,bb7,1,b5','2:2:b5 3:0:T 4:2:bb7 5:1:b3'],
  ['Tétrade diminuta dim7','G','F2 · b5,1,b3,bb7','2:5:bb7 3:3:b3 4:5:T 5:4:b5'],
  ['Tétrade diminuta dim7','G','F2 · bb7,b3,b5,1','2:8:T 3:6:b5 4:8:b3 5:7:bb7'],
  ['Tétrade diminuta dim7','G','F3 · 1,b3,b5,bb7','2:5:bb7 3:6:b5 4:8:b3 5:10:T'],
  ['Tétrade diminuta dim7','G','F3 · b3,b5,bb7,1','2:8:T 3:9:bb7 4:11:b5 5:13:b3'],
  ['Tétrade diminuta dim7','G','F3 · b5,bb7,1,b3','2:11:b3 3:12:T 4:14:bb7 5:16:b5'],
  ['Tétrade diminuta dim7','G','F3 · bb7,1,b3,b5','2:2:b5 3:3:b3 4:5:T 5:7:bb7'],
  ['Tétrade diminuta dim7','G','F4 · 1,b5,bb7,b3','1:6:b3 2:5:bb7 3:6:b5 4:5:T'],
  ['Tétrade diminuta dim7','G','F4 · b3,bb7,1,b5','1:9:b5 2:8:T 3:9:bb7 4:8:b3'],
  ['Tétrade diminuta dim7','G','F4 · b5,1,b3,bb7','1:12:bb7 2:11:b3 3:12:T 4:11:b5'],
  ['Tétrade diminuta dim7','G','F4 · bb7,b3,b5,1','1:3:T 2:2:b5 3:3:b3 4:2:bb7'],
  ['Tétrade diminuta dim7','A#','F1 · 1,bb7,b3,b5','2:5:b5 3:6:b3 4:5:bb7 6:6:T'],
  ['Tétrade diminuta dim7','A#','F1 · b3,1,b5,bb7','2:8:bb7 3:9:b5 4:8:T 6:9:b3'],
  ['Tétrade diminuta dim7','A#','F1 · b5,b3,bb7,1','2:11:T 3:12:bb7 4:11:b3 6:12:b5'],
  ['Tétrade diminuta dim7','A#','F1 · bb7,b5,1,b3','2:2:b3 3:3:T 4:2:b5 6:3:bb7'],
  ['Tétrade diminuta dim7','A#','F2 · 1,b5,bb7,b3','2:2:b3 3:0:bb7 4:2:b5 5:1:T'],
  ['Tétrade diminuta dim7','A#','F2 · b3,bb7,1,b5','2:5:b5 3:3:T 4:5:bb7 5:4:b3'],
  ['Tétrade diminuta dim7','A#','F2 · b5,1,b3,bb7','2:8:bb7 3:6:b3 4:8:T 5:7:b5'],
  ['Tétrade diminuta dim7','A#','F2 · bb7,b3,b5,1','2:11:T 3:9:b5 4:11:b3 5:10:bb7'],
  ['Tétrade diminuta dim7','A#','F3 · 1,b3,b5,bb7','2:8:bb7 3:9:b5 4:11:b3 5:13:T'],
  ['Tétrade diminuta dim7','A#','F3 · b3,b5,bb7,1','2:11:T 3:12:bb7 4:14:b5 5:16:b3'],
  ['Tétrade diminuta dim7','A#','F3 · b5,bb7,1,b3','2:2:b3 3:3:T 4:5:bb7 5:7:b5'],
  ['Tétrade diminuta dim7','A#','F3 · bb7,1,b3,b5','2:5:b5 3:6:b3 4:8:T 5:10:bb7'],
  ['Tétrade diminuta dim7','A#','F4 · 1,b5,bb7,b3','1:9:b3 2:8:bb7 3:9:b5 4:8:T'],
  ['Tétrade diminuta dim7','A#','F4 · b3,bb7,1,b5','1:12:b5 2:11:T 3:12:bb7 4:11:b3'],
  ['Tétrade diminuta dim7','A#','F4 · b5,1,b3,bb7','1:3:bb7 2:2:b3 3:3:T 4:2:b5'],
  ['Tétrade diminuta dim7','A#','F4 · bb7,b3,b5,1','1:6:T 2:5:b5 3:6:b3 4:5:bb7'],
];

for (const [lib, root, shape, expected] of LOCKED) {
  test(`${lib} / ${shape} @ ${root} keeps its exact voicing`, () => {
    assert.strictEqual(signature(lib, root, shape), expected);
  });
}
