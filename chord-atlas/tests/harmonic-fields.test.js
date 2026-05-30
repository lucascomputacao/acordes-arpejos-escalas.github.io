/**
 * Tests for harmonic field chord play button helpers.
 *
 * Locks the behavior of harmonicChordPitches() and harmonicChordPlayButton()
 * to ensure play buttons are rendered correctly with proper note pitches
 * and playback modes (chord vs arp).
 *
 * Run: npm test   (node --test chord-atlas/tests/*.test.js)
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadEngine() {
  const dir = path.join(__dirname, '..');
  const code = [
    fs.readFileSync(path.join(dir, 'i18n.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'music-engine.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'renderer.js'), 'utf8'),
    '\n;globalThis.__engine = { harmonicChordPitches, harmonicChordPlayButton };',
  ].join('\n');
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const E = loadEngine();
const norm = (x) => JSON.parse(JSON.stringify(x));

// ---------------------------------------------------------------------------
// harmonicChordPitches — converts note names to pitches with octaves
// ---------------------------------------------------------------------------
test('harmonicChordPitches converts note names to pitches with octaves', () => {
  // C major 7: C, E, G, B
  assert.deepStrictEqual(
    norm(E.harmonicChordPitches(['C', 'E', 'G', 'B'])),
    ['C3', 'E3', 'G3', 'B3']
  );
});

test('harmonicChordPitches handles D minor 7: D, F, A, C', () => {
  assert.deepStrictEqual(
    norm(E.harmonicChordPitches(['D', 'F', 'A', 'C'])),
    ['C3', 'D3', 'F3', 'A3']
  );
});

test('harmonicChordPitches sorts pitches in ascending order', () => {
  // Notes in random order should be sorted
  const result = norm(E.harmonicChordPitches(['G', 'C', 'E', 'B']));
  assert.deepStrictEqual(result, ['C3', 'E3', 'G3', 'B3']);
});

test('harmonicChordPitches handles accidentals (sharps)', () => {
  const result = norm(E.harmonicChordPitches(['C#', 'E#', 'G#']));
  const sorted = result.sort();
  // All notes should be present
  assert.strictEqual(result.length, 3);
});

test('harmonicChordPitches returns empty array for empty input', () => {
  assert.deepStrictEqual(
    norm(E.harmonicChordPitches([])),
    []
  );
});

// ---------------------------------------------------------------------------
// harmonicChordPlayButton — renders play button with correct mode
// ---------------------------------------------------------------------------
test('harmonicChordPlayButton renders button with chord mode by default', () => {
  const html = E.harmonicChordPlayButton(['C', 'E', 'G', 'B']);
  assert.ok(html.includes('data-mode="chord"'), 'should have data-mode="chord"');
  assert.ok(html.includes('data-notes="C3,E3,G3,B3"'), 'should have correct notes');
  assert.ok(html.includes('class="ca-play super-result-play"'), 'should have correct class');
});

test('harmonicChordPlayButton renders button with arp mode when specified', () => {
  const html = E.harmonicChordPlayButton(['D', 'F', 'A', 'C'], 'arp');
  assert.ok(html.includes('data-mode="arp"'), 'should have data-mode="arp"');
  assert.ok(html.includes('ca-play'), 'should have ca-play class');
});

test('harmonicChordPlayButton returns empty string for empty notes', () => {
  const html = E.harmonicChordPlayButton([]);
  assert.strictEqual(html, '');
});

test('harmonicChordPlayButton button has play aria label', () => {
  const html = E.harmonicChordPlayButton(['C', 'E', 'G', 'B']);
  assert.ok(html.includes('aria-label='), 'should have aria-label for accessibility');
  assert.ok(html.includes('title='), 'should have title attribute');
});

test('harmonicChordPlayButton preserves note order in data-notes', () => {
  // Em7: E, G, B, D (sorted ascending by pitch: D, E, G, B)
  const html = E.harmonicChordPlayButton(['E', 'G', 'B', 'D']);
  assert.ok(html.includes('data-notes='), 'should have data-notes attribute');
  // Extract the data-notes value
  const match = html.match(/data-notes="([^"]+)"/);
  assert.ok(match, 'should match data-notes pattern');
  const notes = match[1].split(',');
  // Notes should be in ascending order by MIDI pitch (D=2, E=4, G=7, B=11)
  assert.strictEqual(notes[0], 'D3');
  assert.strictEqual(notes[1], 'E3');
  assert.strictEqual(notes[2], 'G3');
  assert.strictEqual(notes[3], 'B3');
});
