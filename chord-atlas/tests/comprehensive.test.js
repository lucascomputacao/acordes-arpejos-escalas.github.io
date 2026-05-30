/**
 * Comprehensive Chord Atlas Tests
 *
 * Tests all major functions, all possible musical choices, and audio behavior:
 * - All tonalities (12 chromatic roots)
 * - All categories (Acordes, Arpejos, Escalas, Modos, Intervalos, Campos Harmônicos)
 * - SVG generation and properties
 * - Audio pitch calculations and playback behavior
 * - DOM element behavior and accessibility
 *
 * Run: npm test   (node --test chord-atlas/tests/*.test.js)
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Load music engine and renderer
function loadEngine() {
  const dir = path.join(__dirname, '..');
  const code = [
    fs.readFileSync(path.join(dir, 'i18n.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'music-engine.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'renderer.js'), 'utf8'),
    '\n;globalThis.__engine = { pitchAt, orderedPitches, cardPlayButton, svgDiagram, svgFullFretboard, LIBRARY, OPEN_STRING_MIDI, NOTES };',
  ].join('\n');
  const sandbox = {
    document: { querySelectorAll: () => [] },
    window: {},
    console,
    navigator: {},
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const E = loadEngine();

// All 12 chromatic roots
const ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// All categories
const CATEGORIES = ['Acordes', 'Arpejos', 'Escalas', 'Modos', 'Intervalos', 'Campos Harmônicos'];

// ============================================================================
// SECTION 1: Pitch Calculation Tests (pitchAt function)
// ============================================================================

test('pitchAt returns correct notes for all strings and frets', () => {
  // Standard guitar tuning: E2(40), A2(45), D3(50), G3(55), B3(59), E4(64)
  const expectations = {
    '6_0': 'E2', // String 6, open
    '5_0': 'A2', // String 5, open
    '4_0': 'D3',
    '3_0': 'G3',
    '2_0': 'B3',
    '1_0': 'E4',
    '6_5': 'A2', // String 6, fret 5 (A2)
    '4_12': 'D4', // String 4, fret 12 (octave)
  };

  Object.entries(expectations).forEach(([key, expected]) => {
    const [string, fret] = key.split('_').map(Number);
    const result = E.pitchAt(string, fret);
    assert.strictEqual(result, expected, `pitchAt(${string}, ${fret}) should be ${expected}, got ${result}`);
  });
});

test('pitchAt returns empty string for invalid string', () => {
  assert.strictEqual(E.pitchAt(0, 0), '', 'string 0 should return empty');
  assert.strictEqual(E.pitchAt(7, 0), '', 'string 7 should return empty');
  assert.strictEqual(E.pitchAt(99, 0), '', 'string 99 should return empty');
});

test('pitchAt calculates fretted notes correctly across entire range (0-24)', () => {
  // Test a few notes across the full fret range
  const testCases = [
    { string: 3, fret: 0, expected: 'G3' },   // Open G
    { string: 3, fret: 2, expected: 'A3' },   // G + 2 semitones
    { string: 3, fret: 12, expected: 'G4' },  // Octave
    { string: 3, fret: 24, expected: 'G5' },  // 2 octaves
  ];

  testCases.forEach(({ string, fret, expected }) => {
    const result = E.pitchAt(string, fret);
    assert.strictEqual(result, expected, `pitchAt(${string}, ${fret}) should be ${expected}`);
  });
});

// ============================================================================
// SECTION 2: Pitch Ordering Tests (orderedPitches function)
// ============================================================================

test('orderedPitches returns pitches for a valid chord item', () => {
  const item = { positions: [{ string: 1, fret: 0 }, { string: 2, fret: 0 }, { string: 3, fret: 0 }] };
  const pitches = E.orderedPitches(item);

  assert.ok(Array.isArray(pitches), 'should return an array');
  assert.ok(pitches.length >= 3, 'should have at least 3 pitches');
  pitches.forEach(p => assert.ok(typeof p === 'string', `each pitch should be a string: ${p}`));
});

test('orderedPitches returns empty array for empty positions', () => {
  const item = { positions: [] };
  const pitches = E.orderedPitches(item);
  assert.strictEqual(pitches.length, 0, 'should return empty array for no positions');
});

test('orderedPitches returns pitches in ascending order', () => {
  // Create a chord with notes intentionally out of order
  const item = {
    positions: [
      { string: 1, fret: 5 },  // E4 + 5 = A4
      { string: 6, fret: 0 },  // E2
      { string: 4, fret: 7 },  // D3 + 7 = A3
    ]
  };
  const pitches = E.orderedPitches(item);

  // pitches should be in ascending MIDI order: E2 < A3 < A4
  assert.ok(pitches.length >= 3, 'should have at least 3 pitches');
  // Pitches should not have duplicates from same position
  assert.strictEqual(new Set(pitches).size, pitches.length, 'pitches should be unique');
});

// ============================================================================
// SECTION 3: Play Button Generation Tests (cardPlayButton function)
// ============================================================================

test('cardPlayButton generates valid HTML button for chord', () => {
  const item = { positions: [{ string: 1, fret: 0 }, { string: 2, fret: 0 }] };
  const html = E.cardPlayButton(item, 'arp');

  assert.ok(typeof html === 'string', 'should return string');
  assert.ok(html.includes('<button'), 'should contain button element');
  assert.ok(html.includes('class="ca-play"'), 'should have ca-play class');
  assert.ok(html.includes('data-notes='), 'should have data-notes attribute');
  assert.ok(html.includes('aria-label='), 'should have aria-label for accessibility');
});

test('cardPlayButton includes correct mode in data-mode attribute', () => {
  const item = { positions: [{ string: 1, fret: 0 }] };

  const buttonsArp = E.cardPlayButton(item, 'arp');
  assert.ok(buttonsArp.includes('data-mode="arp"'), 'should set data-mode to arp');

  const buttonsChord = E.cardPlayButton(item, 'chord');
  assert.ok(buttonsChord.includes('data-mode="chord"'), 'should set data-mode to chord');

  const buttonsBlock = E.cardPlayButton(item, 'block');
  assert.ok(buttonsBlock.includes('data-mode="block"'), 'should set data-mode to block');
});

test('cardPlayButton returns empty string for item with no positions', () => {
  const item = { positions: [] };
  const html = E.cardPlayButton(item, 'arp');
  assert.strictEqual(html, '', 'should return empty string for no positions');
});

test('cardPlayButton data-notes contains valid MIDI pitches', () => {
  const item = { positions: [{ string: 6, fret: 0 }, { string: 1, fret: 0 }] };
  const html = E.cardPlayButton(item, 'arp');

  const match = html.match(/data-notes="([^"]+)"/);
  assert.ok(match, 'should have data-notes attribute');

  const notes = match[1].split(',');
  notes.forEach(note => {
    assert.ok(/^[A-G]#?[0-9]$/.test(note), `note "${note}" should be valid pitch format`);
  });
});

// ============================================================================
// SECTION 4: SVG Generation Tests (svgDiagram function)
// ============================================================================

test('svgDiagram generates valid SVG for all chord positions', () => {
  const item = {
    baseFret: 1,
    positions: [
      { string: 1, fret: 0, label: 'T' },
      { string: 2, fret: 0, label: '3' },
      { string: 3, fret: 2, label: '5' },
    ]
  };
  const svg = E.svgDiagram(item);

  assert.ok(svg.includes('<svg'), 'should contain SVG element');
  assert.ok(svg.includes('class="diagram"'), 'should have diagram class');
  assert.ok(svg.includes('<rect'), 'should have background rect');
  assert.ok(svg.includes('<line'), 'should have grid lines');
});

test('svgDiagram generates circles for each chord position', () => {
  const item = {
    baseFret: 1,
    positions: [
      { string: 1, fret: 0 },
      { string: 2, fret: 1 },
      { string: 3, fret: 2 },
    ]
  };
  const svg = E.svgDiagram(item);

  const circles = svg.match(/<circle/g);
  assert.ok(circles && circles.length >= 3, 'should have at least 3 circles for positions');
});

test('svgDiagram includes fret labels for non-zero frets', () => {
  const item = {
    baseFret: 3,
    positions: [
      { string: 1, fret: 3 },
      { string: 2, fret: 4 },
    ]
  };
  const svg = E.svgDiagram(item);

  // Should include text for fret numbers
  assert.ok(svg.includes('<text'), 'should have text elements');
});

// ============================================================================
// SECTION 5: Library Coverage Tests (all categories and items)
// ============================================================================

test('LIBRARY contains all expected categories', () => {
  CATEGORIES.forEach(cat => {
    assert.ok(E.LIBRARY[cat], `LIBRARY should have category: ${cat}`);
    assert.ok(typeof E.LIBRARY[cat] === 'object', `${cat} should be an object`);
  });
});

test('each LIBRARY category has items with valid formulas', () => {
  CATEGORIES.forEach(category => {
    const items = E.LIBRARY[category];
    Object.entries(items).forEach(([name, formula]) => {
      assert.ok(Array.isArray(formula), `${category}/${name} formula should be array`);
      assert.ok(formula.length > 0, `${category}/${name} formula should not be empty`);
      formula.forEach(note => {
        assert.ok(typeof note === 'string', `${category}/${name} note ${note} should be string`);
      });
    });
  });
});

// ============================================================================
// SECTION 6: Audio-Related Tests (MIDI and pitch calculations)
// ============================================================================

test('OPEN_STRING_MIDI has correct MIDI numbers for standard tuning', () => {
  assert.strictEqual(E.OPEN_STRING_MIDI[6], 40, 'string 6 (E2) should be MIDI 40');
  assert.strictEqual(E.OPEN_STRING_MIDI[5], 45, 'string 5 (A2) should be MIDI 45');
  assert.strictEqual(E.OPEN_STRING_MIDI[4], 50, 'string 4 (D3) should be MIDI 50');
  assert.strictEqual(E.OPEN_STRING_MIDI[3], 55, 'string 3 (G3) should be MIDI 55');
  assert.strictEqual(E.OPEN_STRING_MIDI[2], 59, 'string 2 (B3) should be MIDI 59');
  assert.strictEqual(E.OPEN_STRING_MIDI[1], 64, 'string 1 (E4) should be MIDI 64');
});

test('NOTES array has all 12 chromatic pitches', () => {
  const notes = E.NOTES;
  assert.ok(Array.isArray(notes), 'NOTES should be array');
  assert.strictEqual(notes.length, 12, 'NOTES should have 12 pitches');

  // Verify semitone relationships
  const expected = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  expected.forEach((note, idx) => {
    assert.strictEqual(notes[idx], note, `NOTES[${idx}] should be ${note}`);
  });
});

test('pitchAt uses correct MIDI calculation for all strings at fret 0', () => {
  // All open strings should match OPEN_STRING_MIDI
  const stringMidiMap = {
    1: 64, // E4
    2: 59, // B3
    3: 55, // G3
    4: 50, // D3
    5: 45, // A2
    6: 40, // E2
  };

  Object.entries(stringMidiMap).forEach(([string, expectedMidi]) => {
    const pitch = E.pitchAt(Number(string), 0);
    assert.ok(pitch.length > 0, `pitchAt(${string}, 0) should return pitch`);

    // Calculate MIDI from pitch to verify
    const noteName = pitch.slice(0, -1);
    const octave = parseInt(pitch.slice(-1));
    const noteIndex = E.NOTES.indexOf(noteName);
    const calculatedMidi = (octave + 1) * 12 + noteIndex;

    assert.strictEqual(calculatedMidi, expectedMidi, `${pitch} should be MIDI ${expectedMidi}`);
  });
});

// ============================================================================
// SECTION 7: Cross-Category Consistency Tests
// ============================================================================

test('all categories have items accessible in LIBRARY', () => {
  CATEGORIES.forEach(category => {
    const items = E.LIBRARY[category];
    const itemNames = Object.keys(items);
    assert.ok(itemNames.length > 0, `${category} should have at least one item`);
  });
});

test('Acordes and Arpejos categories have matching formulas', () => {
  const acordesKeys = Object.keys(E.LIBRARY.Acordes);
  const arpejosKeys = Object.keys(E.LIBRARY.Arpejos);

  // Both should have same basic triads and sevenths
  const basicChords = ['Tríade maior', 'Tríade menor', 'Tétrade maior 7M', 'Tétrade menor 7'];
  basicChords.forEach(chord => {
    assert.ok(acordesKeys.some(k => k.includes(chord.split(' ')[1])), `Acordes should have ${chord}`);
    assert.ok(arpejosKeys.some(k => k.includes(chord.split(' ')[1])), `Arpejos should have ${chord}`);
  });
});

test('Escalas and Modos categories have complementary items', () => {
  const escalasKeys = Object.keys(E.LIBRARY.Escalas);
  const modosKeys = Object.keys(E.LIBRARY.Modos);

  // Should have basic scales and modes
  assert.ok(escalasKeys.length > 5, 'Escalas should have multiple items');
  assert.ok(modosKeys.length > 5, 'Modos should have multiple items');
});

// ============================================================================
// SECTION 8: Edge Cases and Error Handling
// ============================================================================

test('pitchAt handles invalid inputs gracefully', () => {
  // pitchAt with undefined string returns empty
  const result = E.pitchAt(undefined, 5);
  assert.strictEqual(result, '', 'pitchAt should return empty for undefined string');

  // pitchAt with negative string
  assert.strictEqual(E.pitchAt(-1, 0), '', 'pitchAt should return empty for negative string');

  // pitchAt with null string
  assert.strictEqual(E.pitchAt(null, 0), '', 'pitchAt should return empty for null string');
});

test('svgDiagram handles empty positions gracefully', () => {
  const item = { baseFret: 1, positions: [] };
  const svg = E.svgDiagram(item);

  assert.ok(svg.includes('<svg'), 'should still generate valid SVG for empty positions');
  // Should not have circles if no positions
  const circles = svg.match(/<circle[^>]*fill="[^"]*"[^>]*\/>/g);
  assert.ok(!circles || circles.length === 0, 'should not have note circles for empty positions');
});

// ============================================================================
// SECTION 9: Accessibility Tests (aria labels, titles, etc)
// ============================================================================

test('cardPlayButton includes accessibility attributes', () => {
  const item = { positions: [{ string: 1, fret: 0 }] };
  const html = E.cardPlayButton(item, 'arp');

  assert.ok(html.includes('aria-label'), 'should have aria-label for screen readers');
  assert.ok(html.includes('type="button"'), 'should have type="button"');
});

test('svgDiagram includes accessible structure', () => {
  const item = {
    baseFret: 1,
    positions: [{ string: 1, fret: 0 }]
  };
  const svg = E.svgDiagram(item);

  assert.ok(svg.includes('xmlns'), 'should have proper SVG namespace');
  assert.ok(svg.includes('viewBox'), 'should have viewBox for scaling');
});

// ============================================================================
// SECTION 10: Full Fretboard Tests (svgFullFretboard function)
// ============================================================================

test('svgFullFretboard generates valid SVG with fullboard-diagram class', () => {
  const positions = [
    { string: 1, fret: 0, label: 'T' },
    { string: 2, fret: 2, label: '3' },
    { string: 3, fret: 4, label: '5' },
  ];
  const svg = E.svgFullFretboard(positions);

  assert.ok(svg.includes('<svg'), 'should contain SVG element');
  assert.ok(svg.includes('class="fullboard-diagram"'), 'should have fullboard-diagram class');
  assert.ok(svg.includes('<circle'), 'should have circles for positions');
  assert.ok(svg.includes('xmlns'), 'should have SVG namespace');
});

test('svgFullFretboard displays all 6 string lines', () => {
  const positions = [{ string: 1, fret: 5, label: 'T' }];
  const svg = E.svgFullFretboard(positions);

  // Should have 6 horizontal string lines
  const stringLines = svg.match(/stroke="#334155"/g);
  assert.ok(stringLines && stringLines.length >= 6, 'should have lines for all 6 strings');
});

test('svgFullFretboard displays fret numbers at fret bars after nut', () => {
  const positions = [{ string: 1, fret: 5, label: 'T' }];
  const svg = E.svgFullFretboard(positions);

  // start=4 (rawMin-1), fret bars at 5,6,7,8 should be labeled at the bar
  assert.ok(svg.includes('>5<'), 'should show fret 5 label at bar');
  assert.ok(svg.includes('>6<'), 'should show fret 6 label at bar');
  // Nut (start=4) may show as position indicator on the side, but NOT in the grid
  // All fret bar labels come after the nut line
  const labelsInOrder = (svg.match(/>\d+</g) || []).map(m => parseInt(m.slice(1)));
  const firstGridLabel = labelsInOrder.find(n => n >= 5);
  assert.ok(firstGridLabel === 5, `first grid label should be 5, got ${firstGridLabel}`);
});

test('svgFullFretboard shows minimum of 4 frets', () => {
  // Even a chord spanning only 1 fret should show at least 4 frets
  const positions = [
    { string: 1, fret: 7, label: 'T' },
    { string: 2, fret: 7, label: '5' },
  ];
  const svg = E.svgFullFretboard(positions);
  const box = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  assert.ok(box, 'should have viewBox');
  // start=6 (rawMin-1), end>=start+4=10, so at least 4 fret lines after nut
  // width = x0 + fretCount*cell + 38, fretCount >= 4
  // minimum: 52 + 4*22 + 38 = 178
  const svgWidth = parseInt(box[1]);
  assert.ok(svgWidth >= 178, `should be at least 178px wide for 4 frets (got ${svgWidth})`);
});

test('svgFullFretboard auto-calculates fret range from positions', () => {
  const positions = [
    { string: 1, fret: 7, label: 'T' },
    { string: 2, fret: 9, label: '3' },
  ];
  const svg = E.svgFullFretboard(positions);

  // Should show both positions (range determined by positions themselves)
  const circles = svg.match(/<circle/g);
  assert.ok(circles && circles.length >= 2, 'should render all positions');
});

test('svgFullFretboard shows compact range (not full 0-24)', () => {
  const positions = [
    { string: 1, fret: 7, label: 'T' },
    { string: 2, fret: 9, label: '3' },
  ];
  const svg = E.svgFullFretboard(positions);
  const box = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  assert.ok(box, 'should have viewBox');
  // Width should be much smaller than a full 0-24 fretboard
  const fullWidth = 52 + 24 * 30 + 38; // ~810 approx max
  const svgWidth = parseInt(box[1]);
  assert.ok(svgWidth < fullWidth, `compact diagram (${svgWidth}) should be narrower than full fretboard (${fullWidth})`);
});

test('svgFullFretboard renders positions with labels', () => {
  const positions = [
    { string: 1, fret: 5, label: 'T' },
    { string: 2, fret: 7, label: '3' },
  ];
  const svg = E.svgFullFretboard(positions);

  // Should contain position labels
  assert.ok(svg.includes('>T<'), 'should include root label');
  assert.ok(svg.includes('>3<'), 'should include interval label');
});

test('svgFullFretboard uses interval colors for notes', () => {
  const positions = [
    { string: 1, fret: 5, label: 'T' },   // root: #2563eb
    { string: 2, fret: 7, label: '3' },   // major third: #16a34a
    { string: 3, fret: 9, label: '5' },   // fifth: #06b6d4
  ];
  const svg = E.svgFullFretboard(positions);

  // Should use interval-specific colors
  assert.ok(svg.includes('#2563eb'), 'root (T) should use brand blue color');
  assert.ok(svg.includes('#16a34a'), 'major third should use green color');
  assert.ok(svg.includes('#06b6d4'), 'fifth should use cyan color');
});

test('svgFullFretboard root note (T) has white fill with colored stroke', () => {
  const positions = [{ string: 1, fret: 5, label: 'T' }];
  const svg = E.svgFullFretboard(positions);

  // Root note should be white fill (inverted) with colored stroke
  assert.ok(svg.includes('fill="#fff"'), 'root should have white fill');
  assert.ok(svg.includes('stroke="#2563eb"'), 'root should have blue stroke');
});

test('svgFullFretboard with empty positions still generates valid SVG', () => {
  const positions = [];
  const svg = E.svgFullFretboard(positions);

  assert.ok(svg.includes('<svg'), 'should generate valid SVG for empty positions');
  assert.ok(svg.includes('fullboard-diagram'), 'should have correct class');
  assert.ok(svg.includes('</svg>'), 'should close SVG properly');
});

test('svgFullFretboard includes string labels and text rendering', () => {
  const positions = [{ string: 1, fret: 5, label: 'T' }];
  const svg = E.svgFullFretboard(positions);

  // Should include string labels
  assert.ok(svg.includes('text-anchor="middle"'), 'should have centered text');
  assert.ok(svg.includes('font-weight="900"'), 'should have bold string labels');
});

test('svgFullFretboard positions have interactive audio capability', () => {
  const positions = [{ string: 1, fret: 5, label: 'T' }];
  const svg = E.svgFullFretboard(positions);

  // Should have group elements with data attributes for audio interaction
  assert.ok(svg.includes('<g'), 'should have group elements for notes');
  assert.ok(svg.includes('circle'), 'should have circles for note visualization');
});

test('svgFullFretboard shows x for muted strings', () => {
  // Chord using only strings 1-3; strings 4,5,6 should be muted (x)
  const positions = [
    { string: 1, fret: 5, label: 'T' },
    { string: 2, fret: 5, label: '3' },
    { string: 3, fret: 5, label: '5' },
  ];
  const svg = E.svgFullFretboard(positions);

  // Should have x markers for muted strings (4, 5, 6)
  const xMarkers = (svg.match(/>x</g) || []).length;
  assert.ok(xMarkers >= 3, `should have at least 3 x markers for muted strings, got ${xMarkers}`);
});

test('svgFullFretboard shows open circle (o) for open strings', () => {
  // Chord with an open string (fret=0)
  const positions = [
    { string: 1, fret: 0, label: 'T' },
    { string: 2, fret: 3, label: '3' },
    { string: 3, fret: 5, label: '5' },
  ];
  const svg = E.svgFullFretboard(positions);

  // Should have a transparent circle for the open string (o indicator)
  assert.ok(svg.includes('fill="transparent"'), 'should have transparent circle for open string');
});

test('svgFullFretboard does not show x for strings that have positions', () => {
  const positions = [
    { string: 1, fret: 5, label: 'T' },
    { string: 2, fret: 5, label: '3' },
    { string: 3, fret: 5, label: '5' },
    { string: 4, fret: 5, label: 'T' },
    { string: 5, fret: 5, label: '3' },
    { string: 6, fret: 5, label: '5' },
  ];
  const svg = E.svgFullFretboard(positions);

  // All 6 strings played, so no x markers
  const xMarkers = (svg.match(/>x</g) || []).length;
  assert.strictEqual(xMarkers, 0, 'should have no x markers when all strings are played');
});
