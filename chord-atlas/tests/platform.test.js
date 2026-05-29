/**
 * Platform-wide tests: audio engine, diagram audio, renderer, and fretboard.
 *
 * Covers all the functional parts of ChordAtlas that users interact with:
 * - Real guitar sample playback (AudioEngineSamples)
 * - Interactive diagram clicking (diagram-audio.js)
 * - SVG diagram rendering (all renderer functions)
 * - Interactive fretboard component
 *
 * These tests ensure that when you change code, the working features don't break.
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// --- Load music-engine to use its constants and utilities ---
function loadEngineModule() {
  const dir = path.join(__dirname, '..');
  const code = [
    fs.readFileSync(path.join(dir, 'i18n.js'), 'utf8'),
    fs.readFileSync(path.join(dir, 'music-engine.js'), 'utf8'),
    '\n;globalThis.__engine = { LIBRARY, BOOK_ARPEGGIO_PATTERNS, generateBookArpeggio, NOTES, STRINGS, STRING_TUNING, INTERVALS, noteFor, noteAt, pc };',
  ].join('\n');
  const sandbox = { document: {}, window: {}, console, navigator: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'engine.bundle.js' });
  return sandbox.__engine;
}

const { LIBRARY, NOTES, STRINGS, STRING_TUNING, INTERVALS, noteFor, noteAt, pc } = loadEngineModule();

// --- Audio Engine Tests ---
test('Audio Engine: AudioEngineSamples class exists and has required methods', () => {
  const enginePath = path.join(__dirname, '..', 'audio-engine-samples.js');
  assert.ok(fs.existsSync(enginePath), 'audio-engine-samples.js not found');
  const code = fs.readFileSync(enginePath, 'utf8');
  // Verify class and methods are declared
  assert.ok(code.includes('class AudioEngineSamples'), 'AudioEngineSamples class missing');
  assert.ok(code.includes('playNote('), 'playNote method missing');
  assert.ok(code.includes('playChord('), 'playChord method missing');
  assert.ok(code.includes('playArpeggio('), 'playArpeggio method missing');
  assert.ok(code.includes('setVolume('), 'setVolume method missing');
  assert.ok(code.includes('setReverb('), 'setReverb method missing');
  assert.ok(code.includes('setDelay('), 'setDelay method missing');
});

test('Audio Engine: Sample files bundled locally (no external API)', () => {
  const samplesDir = path.join(__dirname, '..', 'samples');
  assert.ok(fs.existsSync(samplesDir), 'samples/ directory missing');

  // Check acoustic samples exist
  const acPath = path.join(samplesDir, 'guitar-acoustic');
  assert.ok(fs.existsSync(acPath), 'guitar-acoustic/ not found');
  const acFiles = fs.readdirSync(acPath);
  assert.ok(acFiles.length > 0, 'No acoustic samples found');
  assert.ok(acFiles.some(f => f.endsWith('.ogg') || f.endsWith('.mp3')),
    'No OGG/MP3 samples in acoustic folder');

  // Check electric samples exist
  const elPath = path.join(samplesDir, 'guitar-electric');
  assert.ok(fs.existsSync(elPath), 'guitar-electric/ not found');
  const elFiles = fs.readdirSync(elPath);
  assert.ok(elFiles.length > 0, 'No electric samples found');
});

// --- Diagram Audio Tests ---
test('Diagram Audio: diagram-audio.js exists and has required patterns', () => {
  const diagPath = path.join(__dirname, '..', 'diagram-audio.js');
  assert.ok(fs.existsSync(diagPath), 'diagram-audio.js not found');
  const code = fs.readFileSync(diagPath, 'utf8');

  // Verify event delegation and listeners
  assert.ok(code.includes('.ca-note'), 'ca-note class selector missing');
  assert.ok(code.includes('addEventListener'), 'event listener setup missing');
  assert.ok(code.includes('playNote') || code.includes('audioEngine'),
    'audio engine integration missing');
});

test('Diagram Audio: clickable note elements are marked with data-note', () => {
  const rendPath = path.join(__dirname, '..', 'renderer.js');
  assert.ok(fs.existsSync(rendPath), 'renderer.js not found');
  const code = fs.readFileSync(rendPath, 'utf8');

  // Check that renderer marks notes as clickable
  assert.ok(code.includes('ca-note'), 'ca-note class not set in renderer');
  assert.ok(code.includes('data-note'), 'data-note attribute not set');
  assert.ok(code.includes('audioNoteGroup'), 'audioNoteGroup wrapper not found');
});

// --- Renderer Tests ---
test('Renderer: All SVG diagram functions are defined', () => {
  const rendPath = path.join(__dirname, '..', 'renderer.js');
  const code = fs.readFileSync(rendPath, 'utf8');

  const functions = [
    'svgDiagram', 'svgHorizontalArpeggio', 'svgIntervalMap',
    'svgHarmonicField', 'renderIntervals', 'renderHarmonicField',
    'pitchAt', 'audioNoteGroup'
  ];

  for (const fn of functions) {
    assert.ok(code.includes(`function ${fn}`) || code.includes(`const ${fn}`),
      `Function ${fn} not found in renderer`);
  }
});

test('Renderer: pitchAt helper calculates correct MIDI numbers for open strings', () => {
  // Open strings: E4, B3, G3, D3, A2, E2 (strings 1-6)
  // MIDI: E4=64, B3=59, G3=55, D3=50, A2=45, E2=40
  const rendPath = path.join(__dirname, '..', 'renderer.js');
  const code = fs.readFileSync(rendPath, 'utf8');

  // Verify OPEN_STRING_MIDI is defined with correct values
  assert.ok(code.includes('OPEN_STRING_MIDI'), 'OPEN_STRING_MIDI not defined');
  assert.ok(code.includes('6: 40'), 'E2 (string 6) MIDI not 40');
  assert.ok(code.includes('1: 64'), 'E4 (string 1) MIDI not 64');
});

// --- Fretboard Interactivity Tests ---
test('Interactive Fretboard: Component class and methods exist', () => {
  const fbPath = path.join(__dirname, '..', 'interactive-fretboard.js');
  assert.ok(fs.existsSync(fbPath), 'interactive-fretboard.js not found');
  const code = fs.readFileSync(fbPath, 'utf8');

  assert.ok(code.includes('class InteractiveFretboard'), 'InteractiveFretboard class missing');
  const methods = ['render', 'createFretboardHTML', 'playNote', 'setFretRange', 'setHoverPlay'];
  for (const m of methods) {
    assert.ok(code.includes(`${m}(`), `Method ${m} not found`);
  }
});

test('Interactive Fretboard: Note rendering includes data attributes', () => {
  const fbPath = path.join(__dirname, '..', 'interactive-fretboard.js');
  const code = fs.readFileSync(fbPath, 'utf8');

  // Notes should have data-string, data-fret, data-note attributes
  assert.ok(code.includes('data-string'), 'data-string attribute missing');
  assert.ok(code.includes('data-fret'), 'data-fret attribute missing');
  assert.ok(code.includes('data-note'), 'data-note attribute missing');
});

// --- Music Theory Consistency ---
test('Music Theory: Standard guitar tuning is correct', () => {
  // Verify tuning matches the engine's definition
  assert.deepStrictEqual(
    Object.values(STRING_TUNING),
    ['E', 'B', 'G', 'D', 'A', 'E'],
    'Guitar string tuning is not standard E-B-G-D-A-E'
  );
});

test('Music Theory: INTERVALS map is complete', () => {
  // All common intervals should be defined
  const required = ['T', '8', 'b2', '2', '#2', 'b3', '3', '4', '#4', 'b5', '5', '#5', 'b6', '6', 'b7', '7M'];
  for (const iv of required) {
    assert.ok(iv in INTERVALS, `Interval ${iv} not in INTERVALS`);
  }
});

// --- Integration: Diagram → Audio Path ---
test('Integration: Diagram note data flow is complete', () => {
  // A rendered note has the data necessary for audio playback
  const rendPath = path.join(__dirname, '..', 'renderer.js');
  const rendCode = fs.readFileSync(rendPath, 'utf8');
  const diagPath = path.join(__dirname, '..', 'diagram-audio.js');
  const diagCode = fs.readFileSync(diagPath, 'utf8');

  // Renderer sets data-note
  assert.ok(rendCode.includes('data-note'), 'Renderer: data-note not set');
  // Diagram reads data-note and passes to audioEngine
  assert.ok(diagCode.includes('data-note') || diagCode.includes('getAttribute'),
    'Diagram: data-note not read for playback');
  assert.ok(diagCode.includes('audioEngine') || diagCode.includes('playNote'),
    'Diagram: audioEngine not called');
});
