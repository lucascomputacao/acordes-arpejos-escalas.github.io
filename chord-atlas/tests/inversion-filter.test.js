'use strict';

/**
 * Tests for the inversion filter logic (app.js).
 *
 * voicingInversionType() and the filter logic are pure functions with no DOM
 * dependency, so we test them in isolation here. If either function changes in
 * app.js, update the copy below in the same commit so the diff records the intent.
 *
 * Run: npm test
 */

const { test } = require('node:test');
const assert = require('node:assert');

// ---------------------------------------------------------------------------
// Pure copy of the two functions from app.js (keep in sync)
// ---------------------------------------------------------------------------

function voicingInversionType(voicing) {
  const bass = voicing.split('-')[0];
  if (bass === 'T') return 'root';
  if (bass === '3' || bass === 'b3') return '1st';
  if (bass === '5' || bass === 'b5' || bass === '#5') return '2nd';
  return '3rd';
}

function applyInversionFilter(voicings, mode, selectedInversions) {
  return voicings.map(v => {
    const invType = voicingInversionType(v);
    if (mode === 'root') return { v, checked: invType === 'root' };
    if (mode === 'all')  return { v, checked: true };
    return { v, checked: selectedInversions.has(invType) };
  });
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const TRIAD_VOICINGS = ['T-3-5', 'T-5-3', '3-5-T', '3-T-5', '5-T-3', '5-3-T'];

const MINOR_TRIAD = ['T-b3-5', 'T-5-b3', 'b3-5-T', 'b3-T-5', '5-T-b3', '5-b3-T'];

const TETRAD_STANDARD = [
  'T-7M-3-5', '7M-3-5-T', '3-5-T-7M', '5-T-7M-3',
  'T-5-7M-3', '5-7M-3-T', '7M-3-T-5', '3-T-5-7M',
  'T-3-5-7M', '3-5-7M-T', '5-7M-T-3', '7M-T-3-5',
  'T-5-3-7M', '5-3-7M-T', '3-7M-T-5', '7M-T-5-3',
];

const TETRAD_DROP2 = ['5-T-3-7M', '7M-3-5-T', 'T-5-7M-3', '3-7M-T-5'];

const SHELL = ['T-3-7M', 'T-7M-3', '3-7M-T', '7M-3-T'];

// ---------------------------------------------------------------------------
// voicingInversionType — classification by bass note
// ---------------------------------------------------------------------------

test('voicingInversionType: tonic bass → root position', () => {
  assert.strictEqual(voicingInversionType('T-3-5'),    'root');
  assert.strictEqual(voicingInversionType('T-5-3'),    'root');
  assert.strictEqual(voicingInversionType('T-7M-3-5'), 'root');
  assert.strictEqual(voicingInversionType('T-b3-5'),   'root');
  assert.strictEqual(voicingInversionType('T-3-7M'),   'root');
});

test('voicingInversionType: major or minor third bass → 1st inversion', () => {
  assert.strictEqual(voicingInversionType('3-5-T'),    '1st');
  assert.strictEqual(voicingInversionType('3-T-5'),    '1st');
  assert.strictEqual(voicingInversionType('b3-5-T'),   '1st');
  assert.strictEqual(voicingInversionType('b3-b5-T'),  '1st');
  assert.strictEqual(voicingInversionType('3-5-7M-T'), '1st');
  assert.strictEqual(voicingInversionType('3-7M-T'),   '1st');
});

test('voicingInversionType: fifth bass (perfect/aug/dim) → 2nd inversion', () => {
  assert.strictEqual(voicingInversionType('5-T-3'),    '2nd');
  assert.strictEqual(voicingInversionType('5-3-T'),    '2nd');
  assert.strictEqual(voicingInversionType('b5-T-b3'),  '2nd');
  assert.strictEqual(voicingInversionType('#5-T-3'),   '2nd');
  assert.strictEqual(voicingInversionType('5-7M-T-3'), '2nd');
});

test('voicingInversionType: seventh bass → 3rd inversion', () => {
  assert.strictEqual(voicingInversionType('b7-T-3-5'), '3rd');
  assert.strictEqual(voicingInversionType('7M-3-5-T'), '3rd');
  assert.strictEqual(voicingInversionType('bb7-T-b3'), '3rd');
  assert.strictEqual(voicingInversionType('7M-T-3'),   '3rd');
});

test('voicingInversionType: drop2 voicings classified by bass note', () => {
  assert.strictEqual(voicingInversionType('5-T-3-7M'), '2nd');
  assert.strictEqual(voicingInversionType('7M-3-5-T'), '3rd');
  assert.strictEqual(voicingInversionType('3-7M-T-5'), '1st');
  assert.strictEqual(voicingInversionType('T-5-7M-3'), 'root');
});

// ---------------------------------------------------------------------------
// applyInversionFilter — mode behaviour
// ---------------------------------------------------------------------------

test('root mode: only T-bass voicings checked', () => {
  applyInversionFilter(TRIAD_VOICINGS, 'root', new Set()).forEach(({ v, checked }) => {
    if (voicingInversionType(v) === 'root')
      assert.ok(checked,  `${v} should be checked in root mode`);
    else
      assert.ok(!checked, `${v} should be unchecked in root mode`);
  });
});

test('root mode: same result for tetrades (no 3rd-inv leak)', () => {
  applyInversionFilter(TETRAD_STANDARD, 'root', new Set()).forEach(({ v, checked }) => {
    if (voicingInversionType(v) === 'root')
      assert.ok(checked,  `${v} should be checked`);
    else
      assert.ok(!checked, `${v} should be unchecked`);
  });
});

test('all mode: every voicing checked regardless of inversion', () => {
  [...TRIAD_VOICINGS, ...TETRAD_STANDARD, ...SHELL].forEach(v => {
    const [{ checked }] = applyInversionFilter([v], 'all', new Set());
    assert.ok(checked, `${v} should be checked in all mode`);
  });
});

test('select mode with empty selection: nothing checked', () => {
  applyInversionFilter(TRIAD_VOICINGS, 'select', new Set()).forEach(({ v, checked }) => {
    assert.ok(!checked, `${v} should be unchecked when nothing selected`);
  });
});

test('select mode 1st only: only 3rd-bass voicings checked', () => {
  applyInversionFilter(TRIAD_VOICINGS, 'select', new Set(['1st'])).forEach(({ v, checked }) => {
    if (voicingInversionType(v) === '1st')
      assert.ok(checked,  `${v} should be checked`);
    else
      assert.ok(!checked, `${v} should be unchecked`);
  });
});

test('select mode 2nd only: only 5th-bass voicings checked', () => {
  applyInversionFilter(TRIAD_VOICINGS, 'select', new Set(['2nd'])).forEach(({ v, checked }) => {
    if (voicingInversionType(v) === '2nd')
      assert.ok(checked,  `${v} should be checked`);
    else
      assert.ok(!checked, `${v} should be unchecked`);
  });
});

test('select mode 3rd only: only 7th-bass voicings checked', () => {
  applyInversionFilter([...TETRAD_STANDARD, ...TETRAD_DROP2], 'select', new Set(['3rd'])).forEach(({ v, checked }) => {
    if (voicingInversionType(v) === '3rd')
      assert.ok(checked,  `${v} should be checked`);
    else
      assert.ok(!checked, `${v} should be unchecked`);
  });
});

test('select mode 1st+2nd: root and 3rd excluded', () => {
  const sel = new Set(['1st', '2nd']);
  applyInversionFilter(TETRAD_STANDARD, 'select', sel).forEach(({ v, checked }) => {
    const inv = voicingInversionType(v);
    if (inv === '1st' || inv === '2nd')
      assert.ok(checked,  `${v} should be checked`);
    else
      assert.ok(!checked, `${v} should be unchecked`);
  });
});

test('select mode never includes root position, even with all inversions chosen', () => {
  const allInv = new Set(['1st', '2nd', '3rd']);
  [...TETRAD_STANDARD, ...TRIAD_VOICINGS, ...SHELL].forEach(v => {
    const [{ checked }] = applyInversionFilter([v], 'select', allInv);
    if (voicingInversionType(v) === 'root')
      assert.ok(!checked, `Root-position voicing ${v} must not appear in select mode`);
  });
});

// ---------------------------------------------------------------------------
// Inversion range per chord type
// ---------------------------------------------------------------------------

test('triads have no 3rd-inversion voicings', () => {
  [...TRIAD_VOICINGS, ...MINOR_TRIAD].forEach(v => {
    assert.notStrictEqual(voicingInversionType(v), '3rd',
      `Triad voicing ${v} should not be classified as 3rd inversion`);
  });
});

test('tetrades contain 3rd-inversion voicings', () => {
  const has3rd = TETRAD_STANDARD.some(v => voicingInversionType(v) === '3rd');
  assert.ok(has3rd, 'Standard tetrad voicings should include at least one 3rd inversion');
});

test('all four inversion types are represented across tetrad voicings', () => {
  const all = [...TETRAD_STANDARD, ...TETRAD_DROP2, ...SHELL];
  const types = new Set(all.map(voicingInversionType));
  assert.ok(types.has('root'), 'should have root-position voicings');
  assert.ok(types.has('1st'),  'should have 1st inversion voicings');
  assert.ok(types.has('2nd'),  'should have 2nd inversion voicings');
  assert.ok(types.has('3rd'),  'should have 3rd inversion voicings');
});

test('minor triad inversions classified correctly', () => {
  assert.strictEqual(voicingInversionType('T-b3-5'),  'root');
  assert.strictEqual(voicingInversionType('b3-5-T'),  '1st');
  assert.strictEqual(voicingInversionType('5-T-b3'),  '2nd');
});
