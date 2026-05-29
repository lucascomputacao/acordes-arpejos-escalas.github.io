# Interactive Fretboard - Feature Documentation

## Overview

The Interactive Fretboard is a new Web Audio API-powered feature that allows users to explore and play notes on a virtual guitar fretboard. It's built with vanilla JavaScript and integrates seamlessly with the ChordAtlas ecosystem.

## Features

### 🎵 Audio Engine
- **Web Audio API Integration**: Uses the browser's native Web Audio API for sound generation
- **Frequency Calculation**: Accurate note-to-frequency conversion using equal temperament tuning
- **ADSR Envelope**: Professional envelope shaping (Attack, Decay, Sustain, Release)
- **Multiple Waveforms**: Sine, Square, Sawtooth, Triangle for different sonic characteristics
- **Master Volume Control**: Global volume adjustment with smooth ramping
- **Polyphony Support**: Play multiple notes simultaneously (chords and arpeggios)

### 🎸 Fretboard Component
- **Interactive Notes**: Click to play, hover to preview
- **6-String Guitar**: Standard tuning (E-A-D-G-B-E)
- **Configurable Range**: Play from 0-24 frets (or any custom range)
- **Visual Feedback**: Active and played states for user feedback
- **Left-Handed Mode**: Mirrored fretboard for left-handed players
- **Customizable Duration**: Adjust note length from 50-500ms
- **Waveform Selection**: Switch between different oscillator types

## Usage

### Basic Setup

```html
<!-- Load scripts in order -->
<script src="audio-engine.js"></script>
<script src="interactive-fretboard.js"></script>

<!-- Container for fretboard -->
<div id="interactive-fretboard"></div>

<script>
  // Create and render fretboard
  const fretboard = new InteractiveFretboard('interactive-fretboard');
  window.audioEngine.init(); // Initialize on user interaction
  fretboard.render();
</script>
```

### Audio Engine API

#### Initialize
```javascript
window.audioEngine.init();  // Must be called after user interaction
```

#### Play a Single Note
```javascript
const frequency = window.audioEngine.getFrequency('C', 4); // C4 = 261.63 Hz
window.audioEngine.playNote(frequency, {
  duration: 200,
  type: 'sine',
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.3,
    release: 0.2
  }
});
```

#### Play a Chord
```javascript
const frequencies = [
  window.audioEngine.getFrequency('C', 4),
  window.audioEngine.getFrequency('E', 4),
  window.audioEngine.getFrequency('G', 4)
];
window.audioEngine.playChord(frequencies, { duration: 500 });
```

#### Play an Arpeggio
```javascript
const frequencies = [
  window.audioEngine.getFrequency('C', 4),
  window.audioEngine.getFrequency('E', 4),
  window.audioEngine.getFrequency('G', 4),
  window.audioEngine.getFrequency('E', 4)
];
window.audioEngine.playArpeggio(frequencies, {
  noteDuration: 150,
  delayBetween: 50
});
```

#### Volume Control
```javascript
window.audioEngine.setVolume(0.5);  // 0.0 - 1.0
```

### Fretboard Component API

#### Initialize
```javascript
const fretboard = new InteractiveFretboard('container-id');
fretboard.render();
```

#### Set Fret Range
```javascript
fretboard.setFretRange(0, 12);  // Show frets 0-12
```

#### Toggle Hover Play
```javascript
fretboard.setHoverPlay(true);   // Play on hover
fretboard.setHoverPlay(false);  // Click only
```

#### Change Waveform
```javascript
fretboard.setOscillatorType('sine');      // sine, square, sawtooth, triangle
```

#### Set Note Duration
```javascript
fretboard.setNoteDuration(200);  // 200ms
```

#### Left-Handed Mode
```javascript
fretboard.setLeftHanded(true);   // Flip the fretboard
fretboard.setLeftHanded(false);  // Right-handed (default)
```

## Technical Details

### Note Frequencies
The system uses equal temperament tuning with A4 = 440Hz as the standard reference pitch.

```
C4:  261.63 Hz    C#4: 277.18 Hz    D4:  293.66 Hz
D#4: 311.13 Hz    E4:  329.63 Hz    F4:  349.23 Hz
F#4: 369.99 Hz    G4:  392.00 Hz    G#4: 415.30 Hz
A4:  440.00 Hz    A#4: 466.16 Hz    B4:  493.88 Hz
```

### Guitar Tuning
Standard 6-string guitar tuning (from low to high):
- String 6 (Low E): E2 (82.41 Hz)
- String 5 (A): A2 (110.00 Hz)
- String 4 (D): D3 (146.83 Hz)
- String 3 (G): G3 (196.00 Hz)
- String 2 (B): B3 (246.94 Hz)
- String 1 (High E): E4 (329.63 Hz)

### ADSR Envelope
Each note is shaped with an ADSR envelope:
- **Attack**: Fade-in time (default: 0.01s)
- **Decay**: Initial volume drop (default: 0.1s)
- **Sustain**: Sustained volume level (default: 0.3)
- **Release**: Fade-out time (default: 0.2s)

## Browser Support

The Interactive Fretboard requires:
- **Web Audio API** (supported in all modern browsers)
- **ES6 JavaScript** (classes, arrow functions, etc.)
- **HTML5** (for audio context)

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Note: Some browsers may require user interaction (click) to initialize the AudioContext due to autoplay policies.

## Demo

A complete working demo is available at:
```
/chord-atlas/interactive-fretboard-demo.html
```

The demo includes:
- Interactive fretboard with full controls
- Adjustable fret range
- Volume control
- Waveform selector
- Note duration adjustment
- Left-handed mode toggle
- Hover-to-play option

## Future Enhancements

Potential improvements for future versions:
- [ ] Scale/mode highlighting (show which notes belong to a scale)
- [ ] Chord shape detection (identify common chord patterns)
- [ ] MIDI support (connect to MIDI controllers)
- [ ] Recording and playback
- [ ] Metronome integration
- [ ] Different instrument sounds (different ADSR presets)
- [ ] Fretboard visualization of scales/chords
- [ ] Accessibility improvements (keyboard controls)
- [ ] Mobile touch support with gesture recognition
- [ ] Custom tunings support

## Performance Notes

- The AudioContext is initialized only once (lazy loading)
- Notes are garbage collected after they finish playing
- Minimal DOM manipulation for rendering
- Efficient event delegation for large fretboards
- No external dependencies (vanilla JavaScript)

## Accessibility

Current accessibility features:
- Focus states for keyboard navigation
- Clear visual feedback for all interactions
- No audio autoplays (user-initiated only)

Future improvements:
- Keyboard controls (arrow keys for navigation)
- Screen reader support
- High contrast mode

## License

This feature is part of ChordAtlas and follows the same license as the parent project.

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-29  
**Status**: Stable
