/**
 * Audio Engine with Tone.js - Professional guitar sound synthesis
 * Uses Tone.js for advanced synthesis, effects, and realistic guitar timbre
 */

class AudioEngineToneJS {
  constructor() {
    this.isInitialized = false;
    this.synth = null;
    this.polySynth = null;
    this.reverb = null;
    this.delay = null;
    this.filter = null;
    this.masterGain = null;
    this.volume = 0.3;

    // Guitar tuning
    this.GUITAR_TUNING = [
      { note: 'E4', octave: 4 },  // High E (string 1)
      { note: 'B3', octave: 3 },  // B (string 2)
      { note: 'G3', octave: 3 },  // G (string 3)
      { note: 'D3', octave: 3 },  // D (string 4)
      { note: 'A2', octave: 2 },  // A (string 5)
      { note: 'E2', octave: 2 }   // Low E (string 6)
    ];
  }

  /**
   * Initialize Tone.js and create instruments
   */
  async init() {
    if (this.isInitialized) return;

    try {
      // Start Tone audio context
      await Tone.start();

      // Create master gain control
      this.masterGain = new Tone.Gain(this.volume);

      // Create effects chain
      this.reverb = new Tone.Reverb({
        decay: 2.5,
        preDelay: 0.01
      });

      this.delay = new Tone.Delay({
        time: '8n',
        feedback: 0.15,
        wet: 0.15
      });

      // Guitar-like filter (biquad)
      this.filter = new Tone.Filter({
        frequency: 4000,
        type: 'highpass',
        rolloff: -12
      });

      // Create polyphonic synthesizer for chords
      this.polySynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'triangle',
          partials: [1, 2, 3, 4, 5, 6]  // Rich harmonic content
        },
        envelope: {
          attack: 0.004,    // Quick pluck attack
          decay: 0.2,       // Fast decay
          sustain: 0.1,     // Lower sustain
          release: 0.4      // Long release for string ring
        }
      });

      // Connect effects chain
      this.polySynth.connect(this.filter);
      this.filter.connect(this.reverb);
      this.reverb.connect(this.delay);
      this.delay.connect(this.masterGain);
      this.masterGain.toDestination();

      this.isInitialized = true;
      console.log('🎵 AudioEngine (Tone.js) initialized');
    } catch (error) {
      console.error('❌ Error initializing Tone.js:', error);
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
   * Get note name for a string and fret
   * @param {number} stringNum - String number (0-5, where 0 is high E, 5 is low E)
   * @param {number} fretNum - Fret number (0-24)
   * @returns {string} Note name (e.g., "C4", "D#3")
   */
  getStringNote(stringNum, fretNum) {
    const tuning = this.GUITAR_TUNING[stringNum];
    const noteIndex = Tone.Frequency(tuning.note).toMidi();
    const newNoteIndex = noteIndex + fretNum;
    return Tone.Frequency(newNoteIndex, 'midi').toNote();
  }

  /**
   * Play a single note (pluck)
   * @param {string|number} note - Note name (e.g., "C4") or frequency in Hz
   * @param {object} options - {duration, volume}
   */
  playNote(note, options = {}) {
    if (!this.isInitialized) {
      this.init();
      return;
    }

    const {
      duration = '8n',  // Tone.js notation (8th note)
      volume = 0.3
    } = options;

    try {
      // Convert duration if it's a number (milliseconds)
      let toneDuration = duration;
      if (typeof duration === 'number') {
        toneDuration = duration / 1000; // Convert to seconds
      }

      // Play note with envelope shaped for guitar pluck
      this.polySynth.triggerAttackRelease(note, toneDuration, Tone.now());
    } catch (error) {
      console.error('❌ Error playing note:', error);
    }
  }

  /**
   * Play a chord (multiple notes simultaneously)
   * @param {array} notes - Array of note names
   * @param {object} options - {duration, volume}
   */
  playChord(notes, options = {}) {
    if (!this.isInitialized) {
      this.init();
      return;
    }

    const {
      duration = '4n',
      volume = 0.3
    } = options;

    try {
      let toneDuration = duration;
      if (typeof duration === 'number') {
        toneDuration = duration / 1000;
      }

      // Play all notes together
      this.polySynth.triggerAttackRelease(notes, toneDuration, Tone.now());
    } catch (error) {
      console.error('❌ Error playing chord:', error);
    }
  }

  /**
   * Play an arpeggio (sequence of notes)
   * @param {array} notes - Array of note names
   * @param {object} options - {noteDuration, delayBetween}
   */
  playArpeggio(notes, options = {}) {
    if (!this.isInitialized) {
      this.init();
      return;
    }

    const {
      noteDuration = '16n',
      delayBetween = 50
    } = options;

    try {
      let toneDuration = noteDuration;
      if (typeof noteDuration === 'number') {
        toneDuration = noteDuration / 1000;
      }

      let currentTime = Tone.now();
      const delaySeconds = (typeof delayBetween === 'number')
        ? delayBetween / 1000
        : Tone.Time(delayBetween).toSeconds();

      notes.forEach((note, index) => {
        const noteTime = currentTime + (index * delaySeconds);
        this.polySynth.triggerAttackRelease(note, toneDuration, noteTime);
      });
    } catch (error) {
      console.error('❌ Error playing arpeggio:', error);
    }
  }

  /**
   * Set reverb amount (wet signal, 0-1)
   */
  setReverb(amount) {
    if (this.reverb) {
      this.reverb.wet.value = Math.max(0, Math.min(1, amount));
    }
  }

  /**
   * Set delay amount (wet signal, 0-1)
   */
  setDelay(amount) {
    if (this.delay) {
      this.delay.wet.value = Math.max(0, Math.min(1, amount));
    }
  }

  /**
   * Set filter frequency (Hz)
   */
  setFilterFrequency(frequency) {
    if (this.filter) {
      this.filter.frequency.value = frequency;
    }
  }

  /**
   * Stop all currently playing notes
   */
  stopAll() {
    if (this.polySynth) {
      this.polySynth.triggerRelease();
    }
  }
}

// Create global instance
window.audioEngine = new AudioEngineToneJS();
