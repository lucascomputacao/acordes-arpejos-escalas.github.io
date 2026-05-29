/**
 * Audio Engine with Real Guitar Samples
 * Uses Tone.Sampler to play recorded guitar samples instead of synthesis
 * Sample packs from: https://github.com/nbrosowsky/tonejs-instruments
 */

class AudioEngineSamples {
  constructor() {
    this.isInitialized = false;
    this.samplers = {};
    this.currentInstrument = 'guitar-acoustic';
    this.masterGain = null;
    this.reverb = null;
    this.delay = null;
    this.volume = 0.4;
  }

  /**
   * Initialize Tone.js and load guitar samples
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

      // Load guitar samples from tonejs-instruments
      // Using a simpler approach: load samples directly from the CDN
      await this.loadGuitarSamples();

      this.isInitialized = true;
      console.log('🎸 AudioEngine (Real Samples) initialized');
    } catch (error) {
      console.error('❌ Error initializing audio engine:', error);
      throw error;
    }
  }

  /**
   * Load guitar samples using Tone.Sampler
   * Maps note names to sample URLs from tonejs-instruments CDN
   */
  async loadGuitarSamples() {
    // Guitar tuning: E A D G B E (standard 6-string)
    const tuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

    // Create samplers for different guitar types
    const guitarTypes = ['guitar-acoustic', 'guitar-electric'];

    for (const guitarType of guitarTypes) {
      // Create a sampler for each guitar type
      // Using URLs from tonejs-instruments GitHub repo
      const urls = this.generateSampleUrls(guitarType);

      this.samplers[guitarType] = new Tone.Sampler({
        urls: urls,
        baseUrl: `https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/${guitarType}/`,
        onload: () => {
          console.log(`✅ ${guitarType} samples loaded`);
        },
        onerror: (error) => {
          console.error(`❌ Error loading ${guitarType}:`, error);
        }
      });

      // Connect to effects chain
      this.samplers[guitarType].connect(this.reverb);
      this.reverb.connect(this.delay);
      this.delay.connect(this.masterGain);
      this.masterGain.toDestination();
    }

    // Set default instrument
    this.currentInstrument = 'guitar-acoustic';
  }

  /**
   * Generate sample URLs for a guitar type
   * tonejs-instruments has samples at intervals (e.g., every semitone)
   */
  generateSampleUrls(guitarType) {
    const notes = ['C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
                   'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
                   'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
                   'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
                   'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5'];

    const urls = {};
    notes.forEach(note => {
      // tonejs-instruments samples are named like: A1.mp3, A#1.mp3, etc.
      urls[note] = `${note}.mp3`;
    });

    return urls;
  }

  /**
   * Get note name for a string and fret
   */
  getStringNote(stringNum, fretNum) {
    const tuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']; // Standard tuning
    const noteIndex = Tone.Frequency(tuning[stringNum]).toMidi();
    const newNoteIndex = noteIndex + fretNum;
    return Tone.Frequency(newNoteIndex, 'midi').toNote();
  }

  /**
   * Play a single note using guitar samples
   */
  playNote(note, options = {}) {
    if (!this.isInitialized) {
      console.warn('⚠️ Audio engine not initialized yet');
      return;
    }

    const {
      duration = 1.5,  // Default duration in seconds
      volume = 1
    } = options;

    try {
      const sampler = this.samplers[this.currentInstrument];
      if (!sampler) {
        console.error('❌ Current sampler not loaded');
        return;
      }

      // Convert duration if it's in milliseconds
      let toneDuration = duration;
      if (typeof duration === 'number' && duration < 10) {
        // Assume it's already in seconds if < 10
        toneDuration = duration;
      } else if (typeof duration === 'number') {
        // Assume it's in milliseconds
        toneDuration = duration / 1000;
      }

      // Play the note
      sampler.triggerAttackRelease(note, toneDuration, Tone.now());
    } catch (error) {
      console.error('❌ Error playing note:', error);
    }
  }

  /**
   * Play a chord (multiple notes simultaneously)
   */
  playChord(notes, options = {}) {
    if (!this.isInitialized) {
      console.warn('⚠️ Audio engine not initialized yet');
      return;
    }

    const {
      duration = 2,
      volume = 1
    } = options;

    try {
      const sampler = this.samplers[this.currentInstrument];
      if (!sampler) {
        console.error('❌ Current sampler not loaded');
        return;
      }

      let toneDuration = duration;
      if (typeof duration === 'number' && duration > 10) {
        toneDuration = duration / 1000;
      }

      // Play all notes together
      sampler.triggerAttackRelease(notes, toneDuration, Tone.now());
    } catch (error) {
      console.error('❌ Error playing chord:', error);
    }
  }

  /**
   * Play an arpeggio (sequence of notes)
   */
  playArpeggio(notes, options = {}) {
    if (!this.isInitialized) {
      console.warn('⚠️ Audio engine not initialized yet');
      return;
    }

    const {
      noteDuration = 0.5,
      delayBetween = 100
    } = options;

    try {
      const sampler = this.samplers[this.currentInstrument];
      if (!sampler) {
        console.error('❌ Current sampler not loaded');
        return;
      }

      let toneDuration = noteDuration;
      if (typeof noteDuration === 'number' && noteDuration > 10) {
        toneDuration = noteDuration / 1000;
      }

      let currentTime = Tone.now();
      const delaySeconds = (typeof delayBetween === 'number')
        ? delayBetween / 1000
        : Tone.Time(delayBetween).toSeconds();

      notes.forEach((note, index) => {
        const noteTime = currentTime + (index * delaySeconds);
        sampler.triggerAttackRelease(note, toneDuration, noteTime);
      });
    } catch (error) {
      console.error('❌ Error playing arpeggio:', error);
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
   * Switch guitar type
   */
  setInstrument(guitarType) {
    if (this.samplers[guitarType]) {
      this.currentInstrument = guitarType;
      console.log(`✅ Switched to ${guitarType}`);
    } else {
      console.error(`❌ Unknown guitar type: ${guitarType}`);
    }
  }

  /**
   * Stop all currently playing notes
   */
  stopAll() {
    Object.values(this.samplers).forEach(sampler => {
      sampler.triggerRelease();
    });
  }
}

// Create global instance
window.audioEngine = new AudioEngineSamples();
