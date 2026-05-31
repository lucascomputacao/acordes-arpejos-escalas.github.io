/**
 * Shape lock for the book scale fingerings — the 5 classic "box" positions of
 * the major scale (section 1.1 of the book), validated by the user.
 *
 * Same approach as chord-shapes.test.js: each expected signature is the sorted
 * (string:fret:interval) output of generateBookScale() at a given root. Any
 * drift in BOOK_SCALE_PATTERNS breaks the precise test and shows in the diff.
 *
 * Coverage: 5 positions × 3 roots (C, G, A) + inventory and theory checks.
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
    '\n;globalThis.__engine = { LIBRARY, BOOK_SCALE_PATTERNS, generateBookScale, hasBookScalePattern };',
  ].join('\n');
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const { LIBRARY, BOOK_SCALE_PATTERNS, generateBookScale, hasBookScalePattern } = loadEngine();
const SCALE = 'Escala maior';

function signature(root, positionName) {
  const formula = LIBRARY['Escalas'][SCALE];
  const items   = generateBookScale(root, SCALE, formula, 0, 24, [positionName]);
  assert.strictEqual(items.length, 1,
    `generateBookScale("${root}", "${positionName}"): expected 1 item, got ${items.length}`);
  return items[0].positions
    .slice()
    .sort((a, b) => a.string - b.string || a.fret - b.fret)
    .map(p => `${p.string}:${p.fret}:${p.label}`)
    .join(' ');
}

// --- Inventory ------------------------------------------------------------

test('Escala maior exposes a book scale pattern', () => {
  assert.ok(hasBookScalePattern(SCALE));
});

test('Escala maior has exactly 5 box positions', () => {
  assert.strictEqual(BOOK_SCALE_PATTERNS[SCALE].length, 5);
  assert.strictEqual(
    BOOK_SCALE_PATTERNS[SCALE].map(p => p.name).join('|'),
    'Position 1|Position 2|Position 3|Position 4|Position 5'
  );
});

test('every position covers all seven scale degrees', () => {
  const formula = new Set(LIBRARY['Escalas'][SCALE]);
  for (const p of BOOK_SCALE_PATTERNS[SCALE]) {
    const tones = new Set(signature('C', p.name).split(' ').map(s => s.split(':')[2]));
    for (const t of formula) assert.ok(tones.has(t), `${p.name}: missing degree ${t}`);
    for (const t of tones)   assert.ok(formula.has(t), `${p.name}: foreign tone ${t}`);
  }
});

test('the 5 positions ascend the neck without collapsing onto each other', () => {
  const lows = BOOK_SCALE_PATTERNS[SCALE].map(p => {
    const items = generateBookScale('C', SCALE, LIBRARY['Escalas'][SCALE], 0, 24, [p.name]);
    return Math.min(...items[0].positions.map(x => x.fret));
  });
  for (let i = 1; i < lows.length; i++) {
    assert.ok(lows[i] > lows[i - 1], `Position ${i + 1} (low fret ${lows[i]}) does not sit above Position ${i} (${lows[i - 1]})`);
  }
});

// --- Locked exact shapes (C, G, A) ----------------------------------------
// [root, positionName, expectedSignature]
const LOCKED = [
  ['C','Position 1','1:3:5 2:3:2 2:5:3 3:2:6 3:4:7 3:5:T 4:2:3 4:3:4 4:5:5 5:2:7 5:3:T 5:5:2 6:3:5'],
  ['C','Position 2','1:5:6 1:7:7 1:8:T 2:5:3 2:6:4 2:8:5 3:4:7 3:5:T 3:7:2 4:5:5 4:7:6 5:5:2 5:7:3 5:8:4 6:5:6 6:7:7 6:8:T'],
  ['C','Position 3','1:7:7 1:8:T 1:10:2 2:8:5 2:10:6 3:7:2 3:9:3 3:10:4 4:7:6 4:9:7 4:10:T 5:7:3 5:8:4 5:10:5 6:7:7 6:8:T 6:10:2'],
  ['C','Position 4','1:10:2 1:12:3 1:13:4 2:10:6 2:12:7 2:13:T 3:9:3 3:10:4 3:12:5 4:9:7 4:10:T 4:12:2 5:10:5 5:12:6 6:10:2 6:12:3 6:13:4'],
  ['C','Position 5','1:12:3 1:13:4 1:15:5 2:12:7 2:13:T 2:15:2 3:12:5 3:14:6 4:12:2 4:14:3 4:15:4 5:12:6 5:14:7 5:15:T 6:12:3 6:13:4 6:15:5'],
  ['G','Position 1','1:10:5 2:10:2 2:12:3 3:9:6 3:11:7 3:12:T 4:9:3 4:10:4 4:12:5 5:9:7 5:10:T 5:12:2 6:10:5'],
  ['G','Position 2','1:12:6 1:14:7 1:15:T 2:12:3 2:13:4 2:15:5 3:11:7 3:12:T 3:14:2 4:12:5 4:14:6 5:12:2 5:14:3 5:15:4 6:12:6 6:14:7 6:15:T'],
  ['G','Position 3','1:14:7 1:15:T 1:17:2 2:15:5 2:17:6 3:14:2 3:16:3 3:17:4 4:14:6 4:16:7 4:17:T 5:14:3 5:15:4 5:17:5 6:14:7 6:15:T 6:17:2'],
  ['G','Position 4','1:17:2 1:19:3 1:20:4 2:17:6 2:19:7 2:20:T 3:16:3 3:17:4 3:19:5 4:16:7 4:17:T 4:19:2 5:17:5 5:19:6 6:17:2 6:19:3 6:20:4'],
  ['G','Position 5','1:19:3 1:20:4 1:22:5 2:19:7 2:20:T 2:22:2 3:19:5 3:21:6 4:19:2 4:21:3 4:22:4 5:19:6 5:21:7 5:22:T 6:19:3 6:20:4 6:22:5'],
  ['A','Position 1','1:12:5 2:12:2 2:14:3 3:11:6 3:13:7 3:14:T 4:11:3 4:12:4 4:14:5 5:11:7 5:12:T 5:14:2 6:12:5'],
  ['A','Position 2','1:14:6 1:16:7 1:17:T 2:14:3 2:15:4 2:17:5 3:13:7 3:14:T 3:16:2 4:14:5 4:16:6 5:14:2 5:16:3 5:17:4 6:14:6 6:16:7 6:17:T'],
  ['A','Position 3','1:16:7 1:17:T 1:19:2 2:17:5 2:19:6 3:16:2 3:18:3 3:19:4 4:16:6 4:18:7 4:19:T 5:16:3 5:17:4 5:19:5 6:16:7 6:17:T 6:19:2'],
  ['A','Position 4','1:19:2 1:21:3 1:22:4 2:19:6 2:21:7 2:22:T 3:18:3 3:19:4 3:21:5 4:18:7 4:19:T 4:21:2 5:19:5 5:21:6 6:19:2 6:21:3 6:22:4'],
  ['A','Position 5','1:21:3 1:22:4 1:24:5 2:21:7 2:22:T 2:24:2 3:21:5 3:23:6 4:21:2 4:23:3 4:24:4 5:21:6 5:23:7 5:24:T 6:21:3 6:22:4 6:24:5'],
];

for (const [root, position, expected] of LOCKED) {
  test(`Escala maior / ${position} @ ${root} keeps its exact box`, () => {
    assert.strictEqual(signature(root, position), expected);
  });
}
