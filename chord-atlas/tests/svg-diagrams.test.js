/**
 * Tests for SVG diagram dimensions.
 *
 * Locks the behavior that svgIntervalMap and svgHarmonicField use
 * identical parameters for cell sizing, height, offsets, and spacing
 * to ensure visual consistency between the two diagram types.
 *
 * Run: npm test   (node --test chord-atlas/tests/*.test.js)
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Read the renderer.js source to verify parameter consistency
const rendererPath = path.join(__dirname, '..', 'renderer.js');
const rendererCode = fs.readFileSync(rendererPath, 'utf8');

// ---------------------------------------------------------------------------
// svgIntervalMap and svgHarmonicField parameter consistency
// ---------------------------------------------------------------------------
test('svgIntervalMap and svgHarmonicField use same cell divisor (650)', () => {
  // Both should use 650 as divisor in: Math.max(18, Math.min(30, 650 / ...))
  assert.ok(
    rendererCode.includes('Math.max(18, Math.min(30, 650 / Math.max(1,fretCount)))'),
    'should have cell divisor of 650'
  );
  // Count occurrences: should be at least in both functions
  const matches = rendererCode.match(/650 \/ /g);
  assert.ok(matches && matches.length >= 2, 'should use 650 divisor at least twice for both map functions');
});

test('svgIntervalMap uses fixed height of 158', () => {
  // svgIntervalMap should have: const x0=52, y0=28, rowGap=20, h=158
  assert.ok(
    rendererCode.includes('const x0=52, y0=28, rowGap=20, h=158'),
    'svgIntervalMap should have fixed height h=158 with x0=52, y0=28, rowGap=20'
  );
});

test('svgHarmonicField uses same fixed height of 158', () => {
  // svgHarmonicField should also have h=158
  const fieldSection = rendererCode.split('function svgHarmonicField')[1];
  assert.ok(
    fieldSection.includes('h=158'),
    'svgHarmonicField should use fixed height h=158'
  );
});

test('both maps use rowGap of 20', () => {
  // Both should use rowGap=20 for vertical spacing
  assert.ok(
    rendererCode.includes('rowGap=20'),
    'should define rowGap=20'
  );
  const rowGapMatches = rendererCode.match(/rowGap=20/g);
  assert.ok(rowGapMatches && rowGapMatches.length >= 2, 'should use rowGap=20 at least twice');
});

test('svgIntervalMap uses same x0=52, y0=28 offsets as svgHarmonicField', () => {
  // Extract the svgIntervalMap function definition
  const intervalMatch = rendererCode.match(/function svgIntervalMap[^}]*?const x0=(\d+), y0=(\d+)/);
  assert.ok(intervalMatch, 'svgIntervalMap should define x0 and y0');
  assert.strictEqual(intervalMatch[1], '52', 'svgIntervalMap should use x0=52');
  assert.strictEqual(intervalMatch[2], '28', 'svgIntervalMap should use y0=28');

  // Extract the svgHarmonicField function definition
  const fieldMatch = rendererCode.match(/function svgHarmonicField[^}]*?const x0=(\d+), y0=(\d+)/);
  assert.ok(fieldMatch, 'svgHarmonicField should define x0 and y0');
  assert.strictEqual(fieldMatch[1], '52', 'svgHarmonicField should use x0=52');
  assert.strictEqual(fieldMatch[2], '28', 'svgHarmonicField should use y0=28');

  // They should match
  assert.strictEqual(intervalMatch[1], fieldMatch[1], 'both maps should use same x0');
  assert.strictEqual(intervalMatch[2], fieldMatch[2], 'both maps should use same y0');
});

test('svgIntervalMap uses same width padding as svgHarmonicField', () => {
  // Both should use padding of 38: w=x0+fretCount*cell+38
  assert.ok(
    rendererCode.includes('w=x0+fretCount*cell+38'),
    'should use width padding of 38'
  );
  const paddingMatches = rendererCode.match(/\+38\s*[;,]/g);
  assert.ok(paddingMatches && paddingMatches.length >= 2, 'should use +38 padding at least twice');
});

test('svgIntervalMap viewBox formula is symmetric to svgHarmonicField', () => {
  // Both should have: viewBox="0 0 ${w} ${h}"
  assert.ok(
    rendererCode.includes('viewBox="0 0 ${w} ${h}"'),
    'both SVGs should use same viewBox formula'
  );
  const viewBoxMatches = rendererCode.match(/viewBox="0 0 \$\{w\} \$\{h\}"/g);
  assert.ok(viewBoxMatches && viewBoxMatches.length >= 2, 'should have viewBox formula at least twice');
});
