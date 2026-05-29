/**
 * Audio Engine - Web Audio API wrapper for playing musical notes
 * Handles oscillator creation, frequency calculation, and envelope shaping
 */

class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.isInitialized = false;
    this.masterGain = null;
    this.volume = 0.2;

    // Note frequencies (A4 = 440Hz standard tuning)
    this.NOTE_FREQUENCIES = {
      'C': 261.63,
      'C#': 277.18,
      'Db': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'Eb': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'Gb': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'Ab': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'Bb': 466.16,
      'B': 493.88
    };

    // Standard guitar tuning (6 strings)
    this.GUITAR_TUNING = [
      { note: 'E', octave: 4 },  // Low E (string 6)
      { note: 'A', octave: 3 },  // A (string 5)
      { note: 'D', octave: 3 },  // D (string 4)
      { note: 'G', octave: 3 },  // G (string 3)
      { note: 'B', octave: 3 },  // B (string 2)
      { note: 'E', octave: 3 }   // High E (string 1)
    ];
  }

  /**
   * Initialize audio context on first user interaction
   */
  init() {
    if (this.isInitialized) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();

      // Create master gain for volume control
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.audioContext.destination);

      this.isInitialized = true;
      console.log('🎵 AudioEngine initialized');
    } catch (error) {
      console.error('❌ AudioContext not supported:', error);
    }
  }

  /**
   * Set master volume (0.0 - 1.0)
   */
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.masterGain) {
      this.masterGain.gain.value = this.volume;
    }
  }

  /**
   * Get frequency for a note and octave
   * @param {string} note - Note name (C, D, E, F, G, A, B, with # or b for accidentals)
   * @param {number} octave - Octave number (4 = middle octave)
   * @returns {number} Frequency in Hz
   */
  getFrequency(note, octave) {
    const baseFreq = this.NOTE_FREQUENCIES[note];
    if (!baseFreq) {
      console.warn(`Unknown note: ${note}`);
      return 440; // Default to A4
    }
    return baseFreq * Math.pow(2, octave - 4);
  }

  /**
   * Get note and octave for a string and fret
   * @param {number} stringNum - String number (0-5, where 0 is high E, 5 is low E)
   * @param {number} fretNum - Fret number (0-24)
   * @returns {object} {note, octave}
   */
  getStringNote(stringNum, fretNum) {
    const tuningIndex = 5 - stringNum; // Reverse for string numbering
    const tuning = this.GUITAR_TUNING[tuningIndex];

    // Calculate new note based on fret position
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const currentNoteIndex = notes.indexOf(tuning.note);
    const newNoteIndex = (currentNoteIndex + fretNum) % 12;
    const newNote = notes[newNoteIndex];

    const newOctave = tuning.octave + Math.floor((currentNoteIndex + fretNum) / 12);

    return { note: newNote, octave: newOctave };
  }

  /**
   * Play a single note
   * @param {number} frequency - Frequency in Hz
   * @param {object} options - {duration, type, envelope}
   */
  playNote(frequency, options = {}) {
    if (!this.isInitialized) this.init();

    const {
      duration = 200,
      type = 'sine',
      envelope = { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.2 }
    } = options;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Configure oscillator
      oscillator.type = type;
      oscillator.frequency.value = frequency;

      // Connect: oscillator → gain → master gain → destination
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      // Apply ADSR envelope
      const now = this.audioContext.currentTime;
      const totalDuration = duration / 1000;

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + envelope.attack);
      gainNode.gain.linearRampToValueAtTime(envelope.sustain, now + envelope.attack + envelope.decay);
      gainNode.gain.linearRampToValueAtTime(0, now + totalDuration);

      // Play
      oscillator.start(now);
      oscillator.stop(now + totalDuration);
    } catch (error) {
      console.error('❌ Error playing note:', error);
    }
  }

  /**
   * Play a chord (multiple notes simultaneously)
   * @param {array} frequencies - Array of frequencies
   * @param {object} options - Same as playNote
   */
  playChord(frequencies, options = {}) {
    frequencies.forEach(freq => {
      this.playNote(freq, options);
    });
  }

  /**
   * Play a sequence of notes (arpeggio)
   * @param {array} frequencies - Array of frequencies
   * @param {object} options - {noteDuration, delayBetween, ...}
   */
  playArpeggio(frequencies, options = {}) {
    const {
      noteDuration = 150,
      delayBetween = 50,
      ...noteOptions
    } = options;

    frequencies.forEach((freq, index) => {
      const delay = (noteDuration + delayBetween) * index;
      setTimeout(() => {
        this.playNote(freq, { duration: noteDuration, ...noteOptions });
      }, delay);
    });
  }

  /**
   * Resume audio context if suspended (required for user interaction)
   */
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Create global instance
window.audioEngine = new AudioEngine();
