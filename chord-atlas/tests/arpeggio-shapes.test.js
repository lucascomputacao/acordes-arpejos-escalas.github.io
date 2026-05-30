/**
 * Shape lock for the arpeggio positions corrected/added in this work.
 *
 * Where arpeggios.test.js guards *inventory and completeness* (counts, all
 * formula tones present), this file pins the EXACT rendered voicing — the
 * precise (string, fret, interval) of every note the user sees — for the
 * positions we built and fine-tuned against the book diagrams:
 *
 *   - Arpejo diminuto            → Position 2 (the casa 2-6 box)
 *   - Arpejo menor com sétima maior (m/maj7) → Positions 1-5
 *   - Arpejo tétrade aumentada (maj7#5)      → Positions 1-5
 *
 * Each expected signature is the rendered output of generateBookArpeggio()
 * for a given root, sorted by string then fret, as "string:fret:interval".
 * If any offset changes, moves, or a note is dropped/added, the signature
 * changes and the test fails — exactly the silent-regression class of bug
 * this project has been bitten by before.
 *
 * To intentionally change a shape: re-run the helper at the bottom of this
 * file's history (or render the position) and paste the new signature here,
 * in the same commit as the code change, so the diff shows the intent.
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
    '\n;globalThis.__engine = { LIBRARY, generateBookArpeggio };',
  ].join('\n');
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const { LIBRARY, generateBookArpeggio } = loadEngine();

// Render one named position at one root and return its canonical signature.
function signature(root, arpeggioName, positionName) {
  const formula = LIBRARY['Arpejos'][arpeggioName];
  assert.ok(formula, `LIBRARY.Arpejos["${arpeggioName}"] missing`);
  const items = generateBookArpeggio(root, arpeggioName, formula, 0, 24, [positionName]);
  assert.ok(items.length === 1, `${arpeggioName} / ${positionName} @ ${root}: expected exactly 1 rendered item, got ${items.length}`);
  return items[0].positions
    .slice()
    .sort((a, b) => a.string - b.string || a.fret - b.fret)
    .map((p) => `${p.string}:${p.fret}:${p.label}`)
    .join(' ');
}

// --- Locked expected shapes ------------------------------------------------
// [root, arpeggio, position, expected signature]
const LOCKED = [
  // Diminished 7 (T-b3-5-bb7) — Position 2 compact box (casa 2-6 in C).
  ['C', 'Arpejo diminuto', 'Position 2',
    '1:2:b5 1:5:bb7 2:4:b3 3:2:bb7 3:5:T 4:4:b5 5:3:T 5:6:b3 6:5:bb7'],

  // Minor major 7 (T-b3-5-7M) — all 5 positions, with the 7M-below-root
  // tones and (P5) the relative-offset E-string b3.
  ['C', 'Arpejo menor com sétima maior', 'Position 1',
    '1:3:5 1:7:7M 2:4:b3 3:4:7M 3:5:T 4:5:5 5:2:7M 5:3:T 5:6:b3 6:3:5'],
  ['C', 'Arpejo menor com sétima maior', 'Position 2',
    '1:7:7M 1:8:T 2:8:5 3:4:7M 3:5:T 3:8:b3 4:5:5 5:6:b3 6:7:7M 6:8:T'],
  ['C', 'Arpejo menor com sétima maior', 'Position 3',
    '1:7:7M 1:8:T 2:8:5 3:8:b3 4:9:7M 4:10:T 5:10:5 6:8:T 6:11:b3'],
  ['C', 'Arpejo menor com sétima maior', 'Position 4',
    '1:11:b3 2:12:7M 2:13:T 3:12:5 4:9:7M 4:10:T 4:13:b3 5:10:5 6:11:b3'],
  ['C', 'Arpejo menor com sétima maior', 'Position 5',
    '1:11:b3 1:15:5 2:12:7M 2:13:T 3:12:5 4:13:b3 5:14:7M 5:15:T 6:11:b3 6:15:5'],
  // P5 in D proves the relative E-string b3 appears on the neck (fret 1).
  ['D', 'Arpejo menor com sétima maior', 'Position 5',
    '1:1:b3 1:5:5 2:2:7M 2:3:T 3:2:5 4:3:b3 5:4:7M 5:5:T 6:1:b3 6:5:5'],

  // Augmented major 7 (T-3-#5-7M) — all 5 positions (P1-P3 fine-tuned,
  // P4-P5 derived from maj7 by raising 5 -> #5).
  ['C', 'Arpejo tétrade aumentada', 'Position 1',
    '1:4:#5 2:5:3 3:1:#5 3:4:7M 3:5:T 4:2:3 5:2:7M 5:3:T 6:4:#5'],
  ['C', 'Arpejo tétrade aumentada', 'Position 2',
    '1:4:#5 1:7:7M 2:5:3 3:4:7M 3:5:T 4:6:#5 5:7:3 6:7:7M 6:8:T'],
  ['C', 'Arpejo tétrade aumentada', 'Position 3',
    '1:7:7M 1:8:T 2:9:#5 3:9:3 4:6:#5 4:9:7M 4:10:T 5:7:3 6:7:7M 6:8:T'],
  ['C', 'Arpejo tétrade aumentada', 'Position 4',
    '1:12:3 2:12:7M 2:13:T 3:9:3 3:13:#5 4:9:7M 4:10:T 5:11:#5 6:12:3'],
  ['C', 'Arpejo tétrade aumentada', 'Position 5',
    '1:0:3 1:4:#5 2:0:7M 2:1:T 3:1:#5 4:2:3 5:2:7M 5:3:T 6:0:3 6:4:#5'],
];

for (const [root, arpeggio, position, expected] of LOCKED) {
  test(`${arpeggio} / ${position} @ ${root} keeps its exact voicing`, () => {
    assert.strictEqual(signature(root, arpeggio, position), expected);
  });
}

// Sanity: every locked position's tones are a subset of its formula and the
// full formula is covered (defence in depth alongside the literal signature).
test('every locked shape uses exactly the arpeggio formula tones', () => {
  for (const [root, arpeggio, position] of LOCKED) {
    const formula = new Set(LIBRARY['Arpejos'][arpeggio]);
    const labels = signature(root, arpeggio, position)
      .split(' ')
      .map((s) => s.split(':')[2]);
    const seen = new Set(labels);
    for (const l of seen) {
      assert.ok(formula.has(l), `${arpeggio}/${position}@${root}: foreign tone "${l}"`);
    }
    for (const tone of formula) {
      assert.ok(seen.has(tone), `${arpeggio}/${position}@${root}: missing tone "${tone}"`);
    }
  }
});
