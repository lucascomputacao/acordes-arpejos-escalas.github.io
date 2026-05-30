/**
 * Tests for diagram audio playback modes.
 *
 * Locks the behavior of diagram-audio.js playback modes:
 * - 'block': plays simultaneous notes only (no sequence first)
 * - 'chord': plays sequence, pauses, then plays simultaneous notes
 * - 'arp': plays sequence only
 *
 * Run: npm test   (node --test chord-atlas/tests/*.test.js)
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Read the diagram-audio.js file to verify playback behavior
const diagramAudioPath = path.join(__dirname, '..', 'diagram-audio.js');
const diagramAudioCode = fs.readFileSync(diagramAudioPath, 'utf8');

test('diagram-audio.js contains playFromButton function', () => {
  assert.ok(diagramAudioCode.includes('async function playFromButton(btn)'),
    'should define playFromButton function');
});

test('diagram-audio.js documents three playback modes', () => {
  assert.ok(diagramAudioCode.includes("mode 'block'"),
    'should document block mode');
  assert.ok(diagramAudioCode.includes("mode 'chord'"),
    'should document chord mode');
  assert.ok(diagramAudioCode.includes("mode 'arp'"),
    'should document arp mode');
});

test("diagram-audio.js 'block' mode plays chord without sequence", () => {
  // Verify that 'block' mode calls playChord directly
  assert.ok(diagramAudioCode.includes("if (mode === 'block')"),
    'should check for block mode');
  assert.ok(diagramAudioCode.includes("window.audioEngine.playChord(notes"),
    'should call playChord for chord playback');
  // Verify block mode does NOT call playArpeggio
  const blockSection = diagramAudioCode.split("if (mode === 'block')")[1].split("} else")[0];
  assert.ok(!blockSection.includes("playArpeggio"),
    'block mode should NOT call playArpeggio');
});

test("diagram-audio.js 'chord' mode plays sequence then chord", () => {
  // Verify that 'chord' mode calls both playArpeggio and playChord
  assert.ok(diagramAudioCode.includes("} else if (mode === 'chord')"),
    'should check for chord mode');
  assert.ok(diagramAudioCode.includes("playArpeggio(notes"),
    'chord mode should call playArpeggio');
  assert.ok(diagramAudioCode.includes("playChord(notes"),
    'chord mode should call playChord');
  // Verify they happen in sequence with a pause
  assert.ok(diagramAudioCode.includes("seqMs + pauseMs"),
    'chord mode should pause between sequence and chord');
});

test("diagram-audio.js 'arp' mode plays sequence only", () => {
  // Verify that 'arp' mode (default) calls only playArpeggio
  assert.ok(diagramAudioCode.includes("} else {"),
    'should have else clause for arp mode');
  const arpSection = diagramAudioCode.split("} else {")[1].split("}")[0];
  assert.ok(arpSection.includes("playArpeggio"),
    'arp mode should call playArpeggio');
  assert.ok(!arpSection.includes("playChord"),
    'arp mode should NOT call playChord');
});

test("diagram-audio.js block mode duration is correct", () => {
  // Verify block mode plays chord with 2.6 second duration
  assert.ok(diagramAudioCode.includes("{ duration: 2.6 }"),
    'chord playback should use 2.6 second duration');
  assert.ok(diagramAudioCode.includes("setTimeout(() => btn.classList.remove('is-playing'), 2600)"),
    'block mode should remove playing class after 2600ms');
});

test("diagram-audio.js chord mode timing is correct", () => {
  // Verify chord mode has proper timings: stepMs=200, pauseMs=650
  assert.ok(diagramAudioCode.includes("const stepMs = 200"),
    'should use 200ms step between sequence notes');
  assert.ok(diagramAudioCode.includes("const pauseMs = 650"),
    'should use 650ms pause between sequence and chord');
  assert.ok(diagramAudioCode.includes("delayBetween: stepMs"),
    'should use stepMs for arpeggio delay');
  assert.ok(diagramAudioCode.includes("seqMs + pauseMs"),
    'chord playback should happen after sequence and pause');
});

test("diagram-audio.js arp mode timing is correct", () => {
  // Verify arp mode removes playing class after sequence + buffer
  assert.ok(diagramAudioCode.includes("seqMs + 700"),
    'arp mode should remove playing class after sequence + 700ms buffer');
});

test("diagram-audio.js handles data-mode attribute correctly", () => {
  // Verify it reads the data-mode attribute from button
  assert.ok(diagramAudioCode.includes("btn.getAttribute('data-mode')"),
    'should read data-mode attribute from button');
  assert.ok(diagramAudioCode.includes("const mode = btn.getAttribute('data-mode') || 'arp'"),
    'should default to arp mode if data-mode not specified');
});

test("diagram-audio.js uses is-playing class to prevent overlap", () => {
  // Verify button gets is-playing class during playback
  assert.ok(diagramAudioCode.includes("btn.classList.add('is-playing')"),
    'should add is-playing class when starting');
  assert.ok(diagramAudioCode.includes("btn.classList.contains('is-playing')"),
    'should check is-playing class to prevent overlap');
  assert.ok(diagramAudioCode.includes("btn.classList.remove('is-playing')"),
    'should remove is-playing class when done');
});
