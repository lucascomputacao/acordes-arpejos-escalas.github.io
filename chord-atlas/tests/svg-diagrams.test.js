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
const vm = require('vm');

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

// ---------------------------------------------------------------------------
// FUNCTIONAL TESTS: Verify actual SVG generation and dimensions
// ---------------------------------------------------------------------------

function loadEngineForExecution() {
  const dir = path.join(__dirname, '..');
  const code = [
    fs.readFileSync(path.join(dir, 'i18n.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'music-engine.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'renderer.js'), 'utf8'),
    '\n;globalThis.__engine = { svgIntervalMap, svgHarmonicField };',
  ].join('\n');
  const sandbox = {
    document: {
      querySelectorAll: () => [],
    },
    window: {},
    console,
    navigator: {},
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

function parseViewBox(svgString) {
  const match = svgString.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!match) return null;
  return { w: parseInt(match[1], 10), h: parseInt(match[2], 10) };
}

function extractGridRect(svgString) {
  const match = svgString.match(/<rect[^>]*x="(\d+)"[^>]*y="(\d+)"[^>]*width="(\d+)"[^>]*height="(\d+)"[^>]*fill="#f8fafc"/);
  if (!match) return null;
  return {
    x: parseInt(match[1], 10),
    y: parseInt(match[2], 10),
    width: parseInt(match[3], 10),
    height: parseInt(match[4], 10),
  };
}

test('svgIntervalMap generates valid SVG with correct viewBox', () => {
  const E = loadEngineForExecution();
  const svg = E.svgIntervalMap('C', 'Todos os intervalos', ['T', '2', '3', '4', '5', '6', '7', 'b7', '8', '9', 'b9', '#9', '11', '#11', '13', 'b13'], 0, 24);

  assert.ok(svg, 'should generate SVG string');
  assert.ok(svg.includes('<svg class="interval-map-svg"'), 'should have interval-map-svg class');

  const viewBox = parseViewBox(svg);
  assert.ok(viewBox, 'should have valid viewBox');
  assert.strictEqual(viewBox.h, 158, 'viewBox height should be 158');
  assert.ok(viewBox.w >= 700, 'viewBox width should be at least 700');
});

test('svgHarmonicField generates valid SVG with correct viewBox', () => {
  const E = loadEngineForExecution();
  const svg = E.svgHarmonicField('C', 'Campo maior (jônico)', 0, 24);

  assert.ok(svg, 'should generate SVG string');
  assert.ok(svg.includes('<svg class="field-map-svg"'), 'should have field-map-svg class');

  const viewBox = parseViewBox(svg);
  assert.ok(viewBox, 'should have valid viewBox');
  assert.strictEqual(viewBox.h, 158, 'viewBox height should be 158');
  assert.ok(viewBox.w >= 700, 'viewBox width should be at least 700');
});

test('svgIntervalMap and svgHarmonicField have identical viewBox dimensions', () => {
  const E = loadEngineForExecution();
  const intervalSvg = E.svgIntervalMap('C', 'Todos os intervalos', ['T', '2', '3', '4', '5', '6', '7', 'b7', '8', '9', 'b9', '#9', '11', '#11', '13', 'b13'], 0, 24);
  const fieldSvg = E.svgHarmonicField('C', 'Campo maior (jônico)', 0, 24);

  const intervalBox = parseViewBox(intervalSvg);
  const fieldBox = parseViewBox(fieldSvg);

  assert.strictEqual(intervalBox.w, fieldBox.w, 'viewBox widths should be identical');
  assert.strictEqual(intervalBox.h, fieldBox.h, 'viewBox heights should be identical');
});

test('svgIntervalMap grid rect has same dimensions as svgHarmonicField', () => {
  const E = loadEngineForExecution();
  const intervalSvg = E.svgIntervalMap('C', 'Todos os intervalos', ['T', '2', '3', '4', '5', '6', '7', 'b7', '8', '9', 'b9', '#9', '11', '#11', '13', 'b13'], 0, 24);
  const fieldSvg = E.svgHarmonicField('C', 'Campo maior (jônico)', 0, 24);

  const intervalRect = extractGridRect(intervalSvg);
  const fieldRect = extractGridRect(fieldSvg);

  assert.ok(intervalRect, 'interval map should have grid rect');
  assert.ok(fieldRect, 'field map should have grid rect');

  assert.strictEqual(intervalRect.x, fieldRect.x, 'grid x position should be identical');
  assert.strictEqual(intervalRect.y, fieldRect.y, 'grid y position should be identical');
  assert.strictEqual(intervalRect.height, fieldRect.height, 'grid height should be identical');
});

test('svgIntervalMap and svgHarmonicField have identical aspect ratios', () => {
  const E = loadEngineForExecution();
  const intervalSvg = E.svgIntervalMap('C', 'Todos os intervalos', ['T', '2', '3', '4', '5', '6', '7', 'b7', '8', '9', 'b9', '#9', '11', '#11', '13', 'b13'], 0, 24);
  const fieldSvg = E.svgHarmonicField('C', 'Campo maior (jônico)', 0, 24);

  const intervalBox = parseViewBox(intervalSvg);
  const fieldBox = parseViewBox(fieldSvg);

  const intervalAspect = intervalBox.w / intervalBox.h;
  const fieldAspect = fieldBox.w / fieldBox.h;

  // Should be identical (difference < 0.1%)
  const diff = Math.abs(intervalAspect - fieldAspect) / fieldAspect;
  assert.ok(diff < 0.001, `aspect ratios should be identical (interval: ${intervalAspect.toFixed(4)}, field: ${fieldAspect.toFixed(4)})`);
});
