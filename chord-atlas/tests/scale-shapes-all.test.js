/**
 * Shape lock for the book scale fingerings of every scale EXCEPT the major
 * scale (which is locked in scale-shapes.test.js).
 *
 * Covers the 10 scales added from book sections 1.2-1.4, 3.1-3.2, 4.1-4.2,
 * 5.1-5.3:
 *   - 7-note scales (menor natural/harmônica/melódica): 5 CAGED box positions
 *   - pentatonics + blues: 5 diagonal box positions (blues add the blue note)
 *   - symmetric scales (diminuta, diminuta dominante, tons inteiros): 2 unique
 *     fingerings each (the rest repeat by the scale's symmetry)
 *
 * Each signature is the sorted (string:fret:interval) output of
 * generateBookScale() at C and G. Run: npm test
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
    '\n;globalThis.__engine = { LIBRARY, BOOK_SCALE_PATTERNS, generateBookScale, hasBookScalePattern };',
  ].join('\n');
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const { LIBRARY, BOOK_SCALE_PATTERNS, generateBookScale, hasBookScalePattern } = loadEngine();

// Expected position count per scale family.
const EXPECTED_COUNT = {
  'Escala menor natural': 5, 'Escala menor harmônica': 5, 'Escala menor melódica': 5,
  'Pentatonic/root maior': 5, 'Pentatonic/root menor': 5,
  'Blues maior': 5, 'Blues menor': 5,
  'Escala diminuta': 2, 'Diminuta dominante': 2, 'Tons inteiros': 2,
};

function signature(lib, root, positionName) {
  const formula = LIBRARY['Escalas'][lib];
  const items   = generateBookScale(root, lib, formula, 0, 24, [positionName]);
  assert.strictEqual(items.length, 1,
    `generateBookScale("${root}", "${lib}/${positionName}"): expected 1 item, got ${items.length}`);
  return items[0].positions
    .slice()
    .sort((a, b) => a.string - b.string || a.fret - b.fret)
    .map(p => `${p.string}:${p.fret}:${p.label}`)
    .join(' ');
}

// --- Inventory ------------------------------------------------------------

test('every scale family exposes a book scale pattern', () => {
  for (const lib of Object.keys(EXPECTED_COUNT)) assert.ok(hasBookScalePattern(lib), `${lib} missing`);
});

test('each scale has its expected number of positions', () => {
  for (const [lib, n] of Object.entries(EXPECTED_COUNT)) {
    assert.strictEqual(BOOK_SCALE_PATTERNS[lib].length, n, `${lib} should have ${n} positions`);
  }
});

test('every position covers all scale degrees and only those', () => {
  for (const lib of Object.keys(EXPECTED_COUNT)) {
    const formula = new Set(LIBRARY['Escalas'][lib]);
    for (const p of BOOK_SCALE_PATTERNS[lib]) {
      const tones = new Set(signature(lib, 'C', p.name).split(' ').map(s => s.split(':')[2]));
      for (const t of formula) assert.ok(tones.has(t), `${lib}/${p.name}: missing degree ${t}`);
      for (const t of tones)   assert.ok(formula.has(t), `${lib}/${p.name}: foreign tone ${t}`);
    }
  }
});

test('positions ascend the neck without collapsing onto each other', () => {
  for (const lib of Object.keys(EXPECTED_COUNT)) {
    const lows = BOOK_SCALE_PATTERNS[lib].map(p => {
      const items = generateBookScale('C', lib, LIBRARY['Escalas'][lib], 0, 24, [p.name]);
      return Math.min(...items[0].positions.map(x => x.fret));
    });
    for (let i = 1; i < lows.length; i++) {
      assert.ok(lows[i] > lows[i - 1], `${lib}: position ${i + 1} does not sit above position ${i}`);
    }
  }
});

test('pentatonic boxes are exactly two notes per string', () => {
  for (const lib of ['Pentatonic/root maior', 'Pentatonic/root menor']) {
    for (const p of BOOK_SCALE_PATTERNS[lib]) {
      const counts = {};
      signature(lib, 'C', p.name).split(' ').forEach(s => {
        const str = s.split(':')[0]; counts[str] = (counts[str] || 0) + 1;
      });
      for (const [str, c] of Object.entries(counts)) {
        assert.strictEqual(c, 2, `${lib}/${p.name}: string ${str} has ${c} notes (expected 2)`);
      }
    }
  }
});

// --- Locked exact shapes (C, G) -------------------------------------------
// [scale, root, positionName, expectedSignature]
const LOCKED = [
  ['Escala menor natural','C','Position 1','1:3:5 1:4:b6 1:6:b7 2:3:2 2:4:b3 2:6:4 3:3:b7 3:5:T 4:3:4 4:5:5 4:6:b6 5:3:T 5:5:2 5:6:b3 6:3:5 6:4:b6 6:6:b7'],
  ['Escala menor natural','C','Position 2','1:4:b6 1:6:b7 1:8:T 2:4:b3 2:6:4 2:8:5 3:5:T 3:7:2 3:8:b3 4:5:5 4:6:b6 4:8:b7 5:5:2 5:6:b3 5:8:4 6:4:b6 6:6:b7 6:8:T'],
  ['Escala menor natural','C','Position 3','1:8:T 1:10:2 2:8:5 2:9:b6 3:7:2 3:8:b3 3:10:4 4:8:b7 4:10:T 5:8:4 5:10:5 6:8:T 6:10:2'],
  ['Escala menor natural','C','Position 4','1:10:2 1:11:b3 1:13:4 2:11:b7 2:13:T 3:10:4 3:12:5 3:13:b6 4:10:T 4:12:2 4:13:b3 5:10:5 5:11:b6 5:13:b7 6:10:2 6:11:b3 6:13:4'],
  ['Escala menor natural','C','Position 5','1:13:4 1:15:5 1:16:b6 2:13:T 2:15:2 2:16:b3 3:12:5 3:13:b6 3:15:b7 4:12:2 4:13:b3 4:15:4 5:13:b7 5:15:T 6:13:4 6:15:5 6:16:b6'],
  ['Escala menor natural','G','Position 1','1:10:5 1:11:b6 1:13:b7 2:10:2 2:11:b3 2:13:4 3:10:b7 3:12:T 4:10:4 4:12:5 4:13:b6 5:10:T 5:12:2 5:13:b3 6:10:5 6:11:b6 6:13:b7'],
  ['Escala menor natural','G','Position 2','1:11:b6 1:13:b7 1:15:T 2:11:b3 2:13:4 2:15:5 3:12:T 3:14:2 3:15:b3 4:12:5 4:13:b6 4:15:b7 5:12:2 5:13:b3 5:15:4 6:11:b6 6:13:b7 6:15:T'],
  ['Escala menor natural','G','Position 3','1:15:T 1:17:2 2:15:5 2:16:b6 3:14:2 3:15:b3 3:17:4 4:15:b7 4:17:T 5:15:4 5:17:5 6:15:T 6:17:2'],
  ['Escala menor natural','G','Position 4','1:17:2 1:18:b3 1:20:4 2:18:b7 2:20:T 3:17:4 3:19:5 3:20:b6 4:17:T 4:19:2 4:20:b3 5:17:5 5:18:b6 5:20:b7 6:17:2 6:18:b3 6:20:4'],
  ['Escala menor natural','G','Position 5','1:20:4 1:22:5 1:23:b6 2:20:T 2:22:2 2:23:b3 3:19:5 3:20:b6 3:22:b7 4:19:2 4:20:b3 4:22:4 5:20:b7 5:22:T 6:20:4 6:22:5 6:23:b6'],
  ['Escala menor harmônica','C','Position 1','1:3:5 1:4:b6 2:3:2 2:4:b3 3:4:7 3:5:T 4:3:4 4:5:5 5:2:7 5:3:T 5:5:2 6:3:5 6:4:b6'],
  ['Escala menor harmônica','C','Position 2','1:4:b6 1:7:7 1:8:T 2:4:b3 2:6:4 2:8:5 3:4:7 3:5:T 3:7:2 3:8:b3 4:5:5 4:6:b6 5:5:2 5:6:b3 5:8:4 6:4:b6 6:7:7 6:8:T'],
  ['Escala menor harmônica','C','Position 3','1:7:7 1:8:T 1:10:2 2:8:5 2:9:b6 3:7:2 3:8:b3 3:10:4 4:9:7 4:10:T 5:8:4 5:10:5 6:7:7 6:8:T 6:10:2'],
  ['Escala menor harmônica','C','Position 4','1:10:2 1:11:b3 1:13:4 2:9:b6 2:12:7 2:13:T 3:10:4 3:12:5 3:13:b6 4:9:7 4:10:T 4:12:2 4:13:b3 5:10:5 5:11:b6 6:10:2 6:11:b3 6:13:4'],
  ['Escala menor harmônica','C','Position 5','1:13:4 1:15:5 2:12:7 2:13:T 2:15:2 3:12:5 3:13:b6 4:12:2 4:13:b3 4:15:4 5:14:7 5:15:T 6:13:4 6:15:5'],
  ['Escala menor harmônica','G','Position 1','1:10:5 1:11:b6 2:10:2 2:11:b3 3:11:7 3:12:T 4:10:4 4:12:5 5:9:7 5:10:T 5:12:2 6:10:5 6:11:b6'],
  ['Escala menor harmônica','G','Position 2','1:11:b6 1:14:7 1:15:T 2:11:b3 2:13:4 2:15:5 3:11:7 3:12:T 3:14:2 3:15:b3 4:12:5 4:13:b6 5:12:2 5:13:b3 5:15:4 6:11:b6 6:14:7 6:15:T'],
  ['Escala menor harmônica','G','Position 3','1:14:7 1:15:T 1:17:2 2:15:5 2:16:b6 3:14:2 3:15:b3 3:17:4 4:16:7 4:17:T 5:15:4 5:17:5 6:14:7 6:15:T 6:17:2'],
  ['Escala menor harmônica','G','Position 4','1:17:2 1:18:b3 1:20:4 2:16:b6 2:19:7 2:20:T 3:17:4 3:19:5 3:20:b6 4:16:7 4:17:T 4:19:2 4:20:b3 5:17:5 5:18:b6 6:17:2 6:18:b3 6:20:4'],
  ['Escala menor harmônica','G','Position 5','1:20:4 1:22:5 2:19:7 2:20:T 2:22:2 3:19:5 3:20:b6 4:19:2 4:20:b3 4:22:4 5:21:7 5:22:T 6:20:4 6:22:5'],
  ['Escala menor melódica','C','Position 1','1:3:5 1:5:6 2:3:2 2:4:b3 3:2:6 3:4:7 3:5:T 4:3:4 4:5:5 5:2:7 5:3:T 5:5:2 6:3:5 6:5:6'],
  ['Escala menor melódica','C','Position 2','1:5:6 1:7:7 1:8:T 2:4:b3 2:6:4 2:8:5 3:4:7 3:5:T 3:7:2 3:8:b3 4:5:5 4:7:6 5:5:2 5:6:b3 5:8:4 6:5:6 6:7:7 6:8:T'],
  ['Escala menor melódica','C','Position 3','1:7:7 1:8:T 1:10:2 2:8:5 2:10:6 3:7:2 3:8:b3 3:10:4 4:7:6 4:9:7 4:10:T 5:8:4 5:10:5 6:7:7 6:8:T 6:10:2'],
  ['Escala menor melódica','C','Position 4','1:10:2 1:11:b3 1:13:4 2:10:6 2:12:7 2:13:T 3:10:4 3:12:5 4:9:7 4:10:T 4:12:2 4:13:b3 5:10:5 5:12:6 6:10:2 6:11:b3 6:13:4'],
  ['Escala menor melódica','C','Position 5','1:13:4 1:15:5 2:12:7 2:13:T 2:15:2 3:12:5 3:14:6 4:12:2 4:13:b3 4:15:4 5:12:6 5:14:7 5:15:T 6:13:4 6:15:5'],
  ['Escala menor melódica','G','Position 1','1:10:5 1:12:6 2:10:2 2:11:b3 3:9:6 3:11:7 3:12:T 4:10:4 4:12:5 5:9:7 5:10:T 5:12:2 6:10:5 6:12:6'],
  ['Escala menor melódica','G','Position 2','1:12:6 1:14:7 1:15:T 2:11:b3 2:13:4 2:15:5 3:11:7 3:12:T 3:14:2 3:15:b3 4:12:5 4:14:6 5:12:2 5:13:b3 5:15:4 6:12:6 6:14:7 6:15:T'],
  ['Escala menor melódica','G','Position 3','1:14:7 1:15:T 1:17:2 2:15:5 2:17:6 3:14:2 3:15:b3 3:17:4 4:14:6 4:16:7 4:17:T 5:15:4 5:17:5 6:14:7 6:15:T 6:17:2'],
  ['Escala menor melódica','G','Position 4','1:17:2 1:18:b3 1:20:4 2:17:6 2:19:7 2:20:T 3:17:4 3:19:5 4:16:7 4:17:T 4:19:2 4:20:b3 5:17:5 5:19:6 6:17:2 6:18:b3 6:20:4'],
  ['Escala menor melódica','G','Position 5','1:20:4 1:22:5 2:19:7 2:20:T 2:22:2 3:19:5 3:21:6 4:19:2 4:20:b3 4:22:4 5:19:6 5:21:7 5:22:T 6:20:4 6:22:5'],
  ['Pentatonic/root maior','C','Position 1','1:0:3 1:3:5 2:1:T 2:3:2 3:0:5 3:2:6 4:0:2 4:2:3 5:0:6 5:3:T 6:0:3 6:3:5'],
  ['Pentatonic/root maior','C','Position 2','1:3:5 1:5:6 2:3:2 2:5:3 3:2:6 3:5:T 4:2:3 4:5:5 5:3:T 5:5:2 6:3:5 6:5:6'],
  ['Pentatonic/root maior','C','Position 3','1:5:6 1:8:T 2:5:3 2:8:5 3:5:T 3:7:2 4:5:5 4:7:6 5:5:2 5:7:3 6:5:6 6:8:T'],
  ['Pentatonic/root maior','C','Position 4','1:8:T 1:10:2 2:8:5 2:10:6 3:7:2 3:9:3 4:7:6 4:10:T 5:7:3 5:10:5 6:8:T 6:10:2'],
  ['Pentatonic/root maior','C','Position 5','1:10:2 1:12:3 2:10:6 2:13:T 3:9:3 3:12:5 4:10:T 4:12:2 5:10:5 5:12:6 6:10:2 6:12:3'],
  ['Pentatonic/root maior','G','Position 1','1:7:3 1:10:5 2:8:T 2:10:2 3:7:5 3:9:6 4:7:2 4:9:3 5:7:6 5:10:T 6:7:3 6:10:5'],
  ['Pentatonic/root maior','G','Position 2','1:10:5 1:12:6 2:10:2 2:12:3 3:9:6 3:12:T 4:9:3 4:12:5 5:10:T 5:12:2 6:10:5 6:12:6'],
  ['Pentatonic/root maior','G','Position 3','1:12:6 1:15:T 2:12:3 2:15:5 3:12:T 3:14:2 4:12:5 4:14:6 5:12:2 5:14:3 6:12:6 6:15:T'],
  ['Pentatonic/root maior','G','Position 4','1:15:T 1:17:2 2:15:5 2:17:6 3:14:2 3:16:3 4:14:6 4:17:T 5:14:3 5:17:5 6:15:T 6:17:2'],
  ['Pentatonic/root maior','G','Position 5','1:17:2 1:19:3 2:17:6 2:20:T 3:16:3 3:19:5 4:17:T 4:19:2 5:17:5 5:19:6 6:17:2 6:19:3'],
  ['Pentatonic/root menor','C','Position 1','1:1:4 1:3:5 2:1:T 2:4:b3 3:0:5 3:3:b7 4:1:b3 4:3:4 5:1:b7 5:3:T 6:1:4 6:3:5'],
  ['Pentatonic/root menor','C','Position 2','1:3:5 1:6:b7 2:4:b3 2:6:4 3:3:b7 3:5:T 4:3:4 4:5:5 5:3:T 5:6:b3 6:3:5 6:6:b7'],
  ['Pentatonic/root menor','C','Position 3','1:6:b7 1:8:T 2:6:4 2:8:5 3:5:T 3:8:b3 4:5:5 4:8:b7 5:6:b3 5:8:4 6:6:b7 6:8:T'],
  ['Pentatonic/root menor','C','Position 4','1:8:T 1:11:b3 2:8:5 2:11:b7 3:8:b3 3:10:4 4:8:b7 4:10:T 5:8:4 5:10:5 6:8:T 6:11:b3'],
  ['Pentatonic/root menor','C','Position 5','1:11:b3 1:13:4 2:11:b7 2:13:T 3:10:4 3:12:5 4:10:T 4:13:b3 5:10:5 5:13:b7 6:11:b3 6:13:4'],
  ['Pentatonic/root menor','G','Position 1','1:8:4 1:10:5 2:8:T 2:11:b3 3:7:5 3:10:b7 4:8:b3 4:10:4 5:8:b7 5:10:T 6:8:4 6:10:5'],
  ['Pentatonic/root menor','G','Position 2','1:10:5 1:13:b7 2:11:b3 2:13:4 3:10:b7 3:12:T 4:10:4 4:12:5 5:10:T 5:13:b3 6:10:5 6:13:b7'],
  ['Pentatonic/root menor','G','Position 3','1:13:b7 1:15:T 2:13:4 2:15:5 3:12:T 3:15:b3 4:12:5 4:15:b7 5:13:b3 5:15:4 6:13:b7 6:15:T'],
  ['Pentatonic/root menor','G','Position 4','1:15:T 1:18:b3 2:15:5 2:18:b7 3:15:b3 3:17:4 4:15:b7 4:17:T 5:15:4 5:17:5 6:15:T 6:18:b3'],
  ['Pentatonic/root menor','G','Position 5','1:18:b3 1:20:4 2:18:b7 2:20:T 3:17:4 3:19:5 4:17:T 4:20:b3 5:17:5 5:20:b7 6:18:b3 6:20:4'],
  ['Blues maior','C','Position 1','1:0:3 1:3:5 2:1:T 2:3:2 3:0:5 3:2:6 4:0:2 4:1:b3 4:2:3 5:0:6 5:3:T 6:0:3 6:3:5'],
  ['Blues maior','C','Position 2','1:3:5 1:5:6 2:3:2 2:4:b3 2:5:3 3:2:6 3:5:T 4:2:3 4:5:5 5:3:T 5:5:2 6:3:5 6:5:6'],
  ['Blues maior','C','Position 3','1:5:6 1:8:T 2:5:3 2:8:5 3:5:T 3:7:2 3:8:b3 4:5:5 4:7:6 5:5:2 5:6:b3 5:7:3 6:5:6 6:8:T'],
  ['Blues maior','C','Position 4','1:8:T 1:10:2 2:8:5 2:10:6 3:7:2 3:8:b3 3:9:3 4:7:6 4:10:T 5:7:3 5:10:5 6:8:T 6:10:2'],
  ['Blues maior','C','Position 5','1:10:2 1:11:b3 1:12:3 2:10:6 2:13:T 3:9:3 3:12:5 4:10:T 4:12:2 4:13:b3 5:10:5 5:12:6 6:10:2 6:11:b3 6:12:3'],
  ['Blues maior','G','Position 1','1:7:3 1:10:5 2:8:T 2:10:2 3:7:5 3:9:6 4:7:2 4:8:b3 4:9:3 5:7:6 5:10:T 6:7:3 6:10:5'],
  ['Blues maior','G','Position 2','1:10:5 1:12:6 2:10:2 2:11:b3 2:12:3 3:9:6 3:12:T 4:9:3 4:12:5 5:10:T 5:12:2 6:10:5 6:12:6'],
  ['Blues maior','G','Position 3','1:12:6 1:15:T 2:12:3 2:15:5 3:12:T 3:14:2 3:15:b3 4:12:5 4:14:6 5:12:2 5:13:b3 5:14:3 6:12:6 6:15:T'],
  ['Blues maior','G','Position 4','1:15:T 1:17:2 2:15:5 2:17:6 3:14:2 3:15:b3 3:16:3 4:14:6 4:17:T 5:14:3 5:17:5 6:15:T 6:17:2'],
  ['Blues maior','G','Position 5','1:17:2 1:18:b3 1:19:3 2:17:6 2:20:T 3:16:3 3:19:5 4:17:T 4:19:2 4:20:b3 5:17:5 5:19:6 6:17:2 6:18:b3 6:19:3'],
  ['Blues menor','C','Position 1','1:1:4 1:2:b5 1:3:5 2:1:T 2:4:b3 3:0:5 3:3:b7 4:1:b3 4:3:4 4:4:b5 5:1:b7 5:3:T 6:1:4 6:2:b5 6:3:5'],
  ['Blues menor','C','Position 2','1:3:5 1:6:b7 2:4:b3 2:6:4 3:3:b7 3:5:T 4:3:4 4:4:b5 4:5:5 5:3:T 5:6:b3 6:3:5 6:6:b7'],
  ['Blues menor','C','Position 3','1:6:b7 1:8:T 2:6:4 2:7:b5 2:8:5 3:5:T 3:8:b3 4:5:5 4:8:b7 5:6:b3 5:8:4 6:6:b7 6:8:T'],
  ['Blues menor','C','Position 4','1:8:T 1:11:b3 2:8:5 2:11:b7 3:8:b3 3:10:4 3:11:b5 4:8:b7 4:10:T 5:8:4 5:9:b5 5:10:5 6:8:T 6:11:b3'],
  ['Blues menor','C','Position 5','1:11:b3 1:13:4 2:11:b7 2:13:T 3:10:4 3:11:b5 3:12:5 4:10:T 4:13:b3 5:10:5 5:13:b7 6:11:b3 6:13:4'],
  ['Blues menor','G','Position 1','1:8:4 1:9:b5 1:10:5 2:8:T 2:11:b3 3:7:5 3:10:b7 4:8:b3 4:10:4 4:11:b5 5:8:b7 5:10:T 6:8:4 6:9:b5 6:10:5'],
  ['Blues menor','G','Position 2','1:10:5 1:13:b7 2:11:b3 2:13:4 3:10:b7 3:12:T 4:10:4 4:11:b5 4:12:5 5:10:T 5:13:b3 6:10:5 6:13:b7'],
  ['Blues menor','G','Position 3','1:13:b7 1:15:T 2:13:4 2:14:b5 2:15:5 3:12:T 3:15:b3 4:12:5 4:15:b7 5:13:b3 5:15:4 6:13:b7 6:15:T'],
  ['Blues menor','G','Position 4','1:15:T 1:18:b3 2:15:5 2:18:b7 3:15:b3 3:17:4 3:18:b5 4:15:b7 4:17:T 5:15:4 5:16:b5 5:17:5 6:15:T 6:18:b3'],
  ['Blues menor','G','Position 5','1:18:b3 1:20:4 2:18:b7 2:20:T 3:17:4 3:18:b5 3:19:5 4:17:T 4:20:b3 5:17:5 5:20:b7 6:18:b3 6:20:4'],
  ['Escala diminuta','C','Position 1','1:2:b5 1:4:b6 1:5:6 2:3:2 2:4:b3 3:2:6 3:4:7 3:5:T 4:3:4 4:4:b5 5:2:7 5:3:T 5:5:2 6:2:b5 6:4:b6 6:5:6'],
  ['Escala diminuta','C','Position 2','1:4:b6 1:5:6 1:7:7 1:8:T 2:4:b3 2:6:4 2:7:b5 3:4:7 3:5:T 3:7:2 3:8:b3 4:4:b5 4:6:b6 4:7:6 5:5:2 5:6:b3 5:8:4 6:4:b6 6:5:6 6:7:7 6:8:T'],
  ['Escala diminuta','G','Position 1','1:9:b5 1:11:b6 1:12:6 2:10:2 2:11:b3 3:9:6 3:11:7 3:12:T 4:10:4 4:11:b5 5:9:7 5:10:T 5:12:2 6:9:b5 6:11:b6 6:12:6'],
  ['Escala diminuta','G','Position 2','1:11:b6 1:12:6 1:14:7 1:15:T 2:11:b3 2:13:4 2:14:b5 3:11:7 3:12:T 3:14:2 3:15:b3 4:11:b5 4:13:b6 4:14:6 5:12:2 5:13:b3 5:15:4 6:11:b6 6:12:6 6:14:7 6:15:T'],
  ['Diminuta dominante','C','Position 1','1:2:b5 1:3:5 1:5:6 2:2:b2 2:4:b3 2:5:3 3:2:6 3:3:b7 3:5:T 4:2:3 4:4:b5 4:5:5 5:3:T 5:4:b2 6:2:b5 6:3:5 6:5:6'],
  ['Diminuta dominante','C','Position 2','1:5:6 1:6:b7 1:8:T 2:4:b3 2:5:3 2:7:b5 2:8:5 3:5:T 3:6:b2 3:8:b3 4:4:b5 4:5:5 4:7:6 4:8:b7 5:4:b2 5:6:b3 5:7:3 6:5:6 6:6:b7 6:8:T'],
  ['Diminuta dominante','G','Position 1','1:9:b5 1:10:5 1:12:6 2:9:b2 2:11:b3 2:12:3 3:9:6 3:10:b7 3:12:T 4:9:3 4:11:b5 4:12:5 5:10:T 5:11:b2 6:9:b5 6:10:5 6:12:6'],
  ['Diminuta dominante','G','Position 2','1:12:6 1:13:b7 1:15:T 2:11:b3 2:12:3 2:14:b5 2:15:5 3:12:T 3:13:b2 3:15:b3 4:11:b5 4:12:5 4:14:6 4:15:b7 5:11:b2 5:13:b3 5:14:3 6:12:6 6:13:b7 6:15:T'],
  ['Tons inteiros','C','Position 1','1:2:#4 1:4:#5 2:3:2 2:5:3 3:3:b7 3:5:T 4:2:3 4:4:#4 5:3:T 5:5:2 6:2:#4 6:4:#5'],
  ['Tons inteiros','C','Position 2','1:4:#5 1:6:b7 1:8:T 2:5:3 2:7:#4 3:5:T 3:7:2 4:4:#4 4:6:#5 4:8:b7 5:5:2 5:7:3 6:4:#5 6:6:b7 6:8:T'],
  ['Tons inteiros','G','Position 1','1:9:#4 1:11:#5 2:10:2 2:12:3 3:10:b7 3:12:T 4:9:3 4:11:#4 5:10:T 5:12:2 6:9:#4 6:11:#5'],
  ['Tons inteiros','G','Position 2','1:11:#5 1:13:b7 1:15:T 2:12:3 2:14:#4 3:12:T 3:14:2 4:11:#4 4:13:#5 4:15:b7 5:12:2 5:14:3 6:11:#5 6:13:b7 6:15:T'],
];

for (const [lib, root, position, expected] of LOCKED) {
  test(`${lib} / ${position} @ ${root} keeps its exact box`, () => {
    assert.strictEqual(signature(lib, root, position), expected);
  });
}
