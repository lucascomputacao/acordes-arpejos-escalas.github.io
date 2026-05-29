/**
 * Regression guard for the book-style arpeggio data in music-engine.js.
 *
 * Background: a bad file overwrite once silently dropped several arpeggio
 * positions (Arpejo tétrade menor 7 lost positions 4–5; dominante 7,
 * meio-diminuto and diminuto vanished entirely). These tests lock the
 * known-good inventory and validate, at the rendering level, that every
 * arpeggio still produces its full set of complete positions — so that
 * kind of silent data loss fails the test instead of shipping.
 *
 * Model note: each offset's `fret` is RELATIVE (added to a computed base
 * fret, so negative values are legal) and the renderer FILTERS OUT any note
 * whose interval is not part of the arpeggio formula. We therefore validate
 * the *rendered output* of generateBookArpeggio(), not raw offsets.
 *
 * Run:  npm test            (node --test chord-atlas/tests/*.test.js)
 * Override the engine path with MUSIC_ENGINE=/path/to/music-engine.js
 * (used to prove the guard catches a regressed version).
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// --- Load engine (i18n.js + music-engine.js) into a sandbox and expose API ---
function loadEngine() {
  const dir = path.join(__dirname, '..');
  const enginePath = process.env.MUSIC_ENGINE
    ? path.resolve(process.env.MUSIC_ENGINE)
    : path.join(dir, 'music-engine.js');
  const code = [
    fs.readFileSync(path.join(dir, 'i18n.js'), 'utf8'),
    fs.readFileSync(enginePath, 'utf8'),
    '\n;globalThis.__engine = { LIBRARY, BOOK_ARPEGGIO_PATTERNS, generateBookArpeggio, NOTES };',
  ].join('\n');
  // music-engine/i18n only declare data + functions at top level; stub the
  // few browser globals their bodies reference so evaluation never throws.
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const { LIBRARY, BOOK_ARPEGGIO_PATTERNS, generateBookArpeggio, NOTES } = loadEngine();

// --- Known-good inventory. A DROP below these counts is the bug we guard. ---
// Bump a number here when you intentionally add positions; never lower it
// without a deliberate reason.
const EXPECTED_POSITIONS = {
  'Arpejo tríade maior': 5,
  'Arpejo tríade menor': 5,
  'Arpejo tríade aumentada': 1,
  'Arpejo tríade diminuta': 2,
  'Arpejo tétrade maior 7M': 5,
  'Arpejo tétrade menor 7': 5,
  'Arpejo dominante 7': 5,
  'Arpejo meio-diminuto': 5,
  'Arpejo diminuto': 3,
};
const ARPEGGIO_NAMES = Object.keys(EXPECTED_POSITIONS);

// Roots to exercise the renderer with (full chromatic set).
const ROOTS = NOTES.slice();

// ---------------------------------------------------------------------------
// Data-level guards
// ---------------------------------------------------------------------------

test('every catalogued arpeggio still exists in LIBRARY.Arpejos', () => {
  assert.ok(LIBRARY && LIBRARY['Arpejos'], 'LIBRARY.Arpejos is missing');
  for (const name of ARPEGGIO_NAMES) {
    assert.ok(
      Array.isArray(LIBRARY['Arpejos'][name]) && LIBRARY['Arpejos'][name].length > 0,
      `LIBRARY.Arpejos["${name}"] is missing or empty`
    );
  }
});

test('every LIBRARY.Arpejos entry has a book pattern (none silently dropped)', () => {
  for (const name of Object.keys(LIBRARY['Arpejos'])) {
    assert.ok(
      Array.isArray(BOOK_ARPEGGIO_PATTERNS[name]),
      `"${name}" is in LIBRARY.Arpejos but has no BOOK_ARPEGGIO_PATTERNS entry`
    );
  }
});

test('each arpeggio keeps at least its known-good number of positions', () => {
  for (const name of ARPEGGIO_NAMES) {
    const positions = BOOK_ARPEGGIO_PATTERNS[name];
    assert.ok(Array.isArray(positions), `BOOK_ARPEGGIO_PATTERNS["${name}"] missing`);
    assert.ok(
      positions.length >= EXPECTED_POSITIONS[name],
      `"${name}" has ${positions.length} positions; expected at least ${EXPECTED_POSITIONS[name]} — positions were lost`
    );
  }
});

test('every position is structurally well-formed', () => {
  for (const name of ARPEGGIO_NAMES) {
    const seen = new Set();
    BOOK_ARPEGGIO_PATTERNS[name].forEach((pos, i) => {
      const where = `${name} / position #${i + 1}`;
      assert.ok(
        typeof pos.name === 'string' && pos.name.trim().length > 0,
        `${where}: missing/empty name`
      );
      assert.ok(!seen.has(pos.name), `${where}: duplicate name "${pos.name}"`);
      seen.add(pos.name);
      assert.ok(
        Number.isInteger(pos.baseForC) && pos.baseForC >= 0 && pos.baseForC <= 11,
        `${where}: baseForC must be an integer 0–11 (got ${pos.baseForC})`
      );
      assert.ok(
        Array.isArray(pos.offsets) && pos.offsets.length > 0,
        `${where}: offsets must be a non-empty array`
      );
      pos.offsets.forEach((o, j) => {
        const tag = `${where}, offset #${j + 1}`;
        assert.ok(
          Number.isInteger(o.string) && o.string >= 1 && o.string <= 6,
          `${tag}: string must be 1–6 (got ${o.string})`
        );
        // fret is a RELATIVE offset (added to a base) — allow a sane range
        assert.ok(
          Number.isInteger(o.fret) && o.fret >= -12 && o.fret <= 24,
          `${tag}: fret offset out of sane range (got ${o.fret})`
        );
        assert.ok(
          typeof o.interval === 'string' && o.interval.length > 0,
          `${tag}: interval must be a non-empty string`
        );
      });
    });
  }
});

// ---------------------------------------------------------------------------
// Render-level guards (what users actually see)
// ---------------------------------------------------------------------------

test('each arpeggio renders its full set of positions at every root', () => {
  for (const name of ARPEGGIO_NAMES) {
    const formula = LIBRARY['Arpejos'][name];
    for (const root of ROOTS) {
      const items = generateBookArpeggio(root, name, formula, 0, 24, null);
      assert.ok(
        items.length >= EXPECTED_POSITIONS[name],
        `${name} @ ${root}: rendered ${items.length} positions, expected >= ${EXPECTED_POSITIONS[name]}`
      );
    }
  }
});

test('every rendered position is complete and uses only formula tones', () => {
  for (const name of ARPEGGIO_NAMES) {
    const formula = LIBRARY['Arpejos'][name];
    const formulaSet = new Set(formula);
    for (const root of ROOTS) {
      const items = generateBookArpeggio(root, name, formula, 0, 24, null);
      items.forEach((it) => {
        const where = `${name} @ ${root} / ${it.voicing}`;
        // Engine requires at least 6 notes to render a pattern.
        assert.ok(
          it.positions.length >= 6,
          `${where}: only ${it.positions.length} notes (need >= 6)`
        );
        const intervals = new Set(it.positions.map((p) => p.label));
        // No foreign tones.
        for (const iv of intervals) {
          assert.ok(formulaSet.has(iv), `${where}: foreign interval "${iv}"`);
        }
        // Completeness: every chord tone of the formula is present.
        for (const tone of formula) {
          assert.ok(intervals.has(tone), `${where}: missing chord tone "${tone}"`);
        }
        // All frets land on the playable neck.
        it.positions.forEach((p) => {
          assert.ok(
            Number.isInteger(p.fret) && p.fret >= 0 && p.fret <= 24,
            `${where}: rendered fret ${p.fret} off the neck`
          );
        });
      });
    }
  }
});
