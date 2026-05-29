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
    this.loadingStatus = 'idle';
  }

  /**
   * Initialize Tone.js and load guitar samples
   */
  async init() {
    if (this.isInitialized) return;

    try {
      console.log('🎵 Starting Tone.js...');
      this.loadingStatus = 'initializing';

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

      console.log('📦 Loading guitar samples...');
      this.loadingStatus = 'loading-samples';

      // Load guitar samples
      await this.loadGuitarSamples();

      this.isInitialized = true;
      this.loadingStatus = 'ready';
      console.log('✅ AudioEngine (Real Samples) initialized successfully!');
    } catch (error) {
      console.error('❌ Error initializing audio engine:', error);
      this.loadingStatus = 'error';
      throw error;
    }
  }

  /**
   * Load guitar samples using Tone.Sampler
   */
  async loadGuitarSamples() {
    const guitarTypes = ['guitar-acoustic', 'guitar-electric'];
    const loadPromises = [];

    for (const guitarType of guitarTypes) {
      console.log(`📥 Preparing to load ${guitarType}...`);
      const urls = this.generateSampleUrls(guitarType);

      const promise = new Promise((resolve, reject) => {
        try {
          const baseUrl = `https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/${guitarType}/`;

          this.samplers[guitarType] = new Tone.Sampler({
            urls: urls,
            baseUrl: baseUrl,
            onload: () => {
              console.log(`✅ ${guitarType} loaded! (${Object.keys(urls).length} samples)`);
              resolve();
            },
            onerror: (error) => {
              console.warn(`⚠️ ${guitarType} encountered an error but continuing:`, error);
              // Still resolve - samples may load asynchronously
              resolve();
            }
          });

          // Connect to effects chain
          this.samplers[guitarType].connect(this.reverb);
          console.log(`✓ ${guitarType} connected to effects chain`);

          // Timeout in case loading stalls
          const timeout = setTimeout(() => {
            console.log(`⏱️ ${guitarType} load timeout (continuing anyway)`);
            resolve();
          }, 20000);

          // Override onload to clear timeout
          const originalOnload = this.samplers[guitarType]._onload;
          this.samplers[guitarType]._onload = () => {
            clearTimeout(timeout);
            if (originalOnload) originalOnload();
          };
        } catch (error) {
          console.error(`❌ Error creating sampler for ${guitarType}:`, error);
          reject(error);
        }
      });

      loadPromises.push(promise);
    }

    // Connect effects chain (do this once)
    this.reverb.connect(this.delay);
    this.delay.connect(this.masterGain);
    this.masterGain.toDestination();
    console.log('✓ Effects chain connected to destination');

    // Wait for all samplers
    try {
      await Promise.all(loadPromises);
      console.log('✅ All samplers loaded');
    } catch (error) {
      console.error('Error loading samplers:', error);
      // Don't throw - continue anyway
    }

    // Set default instrument
    this.currentInstrument = 'guitar-acoustic';
  }

  /**
   * Generate sample URLs for a guitar type
   */
  generateSampleUrls(guitarType) {
    const notes = ['C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
                   'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
                   'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
                   'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
                   'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5'];

    const urls = {};
    notes.forEach(note => {
      // Use .ogg format (more available than .mp3)
      urls[note] = `${note}.ogg`;
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
      console.warn('⚠️ Audio engine not initialized yet - status:', this.loadingStatus);
      return;
    }

    const {
      duration = 1.5,  // Default duration in seconds
      volume = 1
    } = options;

    try {
      const sampler = this.samplers[this.currentInstrument];
      if (!sampler) {
        console.error(`❌ Sampler for '${this.currentInstrument}' not found. Available: ${Object.keys(this.samplers).join(', ')}`);
        return;
      }

      // Convert duration if it's in milliseconds
      let toneDuration = duration;
      if (typeof duration === 'number' && duration < 10) {
        toneDuration = duration;
      } else if (typeof duration === 'number') {
        toneDuration = duration / 1000;
      }

      console.log(`🎵 Playing ${note} (${toneDuration.toFixed(2)}s) on ${this.currentInstrument}`);

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
