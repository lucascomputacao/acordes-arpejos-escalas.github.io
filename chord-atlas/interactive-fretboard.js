/**
 * Interactive Fretboard Component
 * Displays a clickable guitar fretboard with playable notes
 */

class InteractiveFretboard {
  constructor(containerId = 'interactive-fretboard') {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.settings = {
      minFret: 0,
      maxFret: 12,
      hoverPlay: true,
      showNoteNames: true,
      isLeftHanded: false,
      noteDuration: 200,
      oscillatorType: 'sine'
    };
    this.activeNotes = new Set();
  }

  /**
   * Render the interactive fretboard
   */
  render() {
    if (!this.container) {
      console.error(`❌ Container #${this.containerId} not found`);
      return;
    }

    const html = this.createFretboardHTML();
    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Create HTML structure for fretboard
   */
  createFretboardHTML() {
    let html = '<div class="ifretboard">';

    // Nut (open strings)
    html += this.createNutHTML();

    // Frets
    for (let fret = this.settings.minFret; fret <= this.settings.maxFret; fret++) {
      html += this.createFretHTML(fret);
    }

    // Strings (visual)
    html += '<div class="ifretboard-strings">';
    for (let i = 0; i < 6; i++) {
      html += `<div class="ifretboard-string" style="--string: ${i + 1}"></div>`;
    }
    html += '</div>';

    html += '</div>';
    return html;
  }

  /**
   * Create nut (open strings) HTML
   */
  createNutHTML() {
    const tuning = ['E', 'B', 'G', 'D', 'A', 'E'];
    let html = '<div class="ifretboard-nut">';

    tuning.forEach((note, idx) => {
      const stringNum = 5 - idx; // String numbering (0 = high E)
      const noteData = window.audioEngine.getStringNote(stringNum, 0);
      const displayNote = `${noteData.note}${noteData.octave}`;

      html += `
        <div class="ifretboard-note"
             data-string="${stringNum}"
             data-fret="0"
             data-note="${displayNote}">
          <span class="ifretboard-note-label">${note}</span>
        </div>
      `;
    });

    html += '</div>';
    return html;
  }

  /**
   * Create fret HTML
   */
  createFretHTML(fretNum) {
    let html = `<div class="ifretboard-fret" data-fret="${fretNum}">`;

    for (let stringNum = 0; stringNum < 6; stringNum++) {
      const noteData = window.audioEngine.getStringNote(stringNum, fretNum);
      const displayNote = `${noteData.note}${noteData.octave}`;

      html += `
        <div class="ifretboard-note"
             data-string="${stringNum}"
             data-fret="${fretNum}"
             data-note="${displayNote}">
          <span class="ifretboard-note-label">${noteData.note}</span>
        </div>
      `;
    }

    html += '</div>';
    return html;
  }

  /**
   * Attach event listeners to notes
   */
  attachEventListeners() {
    const notes = this.container.querySelectorAll('.ifretboard-note');

    notes.forEach(noteEl => {
      noteEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playNote(noteEl);
      });

      noteEl.addEventListener('mouseenter', (e) => {
        if (this.settings.hoverPlay) {
          this.playNote(noteEl);
        }
      });

      noteEl.addEventListener('mousedown', () => {
        noteEl.classList.add('active');
      });

      noteEl.addEventListener('mouseup', () => {
        noteEl.classList.remove('active');
      });
    });
  }

  /**
   * Play note from element
   */
  playNote(noteEl) {
    const note = noteEl.dataset.note;

    window.audioEngine.playNote(note, {
      duration: this.settings.noteDuration
    });

    // Visual feedback
    noteEl.classList.add('played');
    setTimeout(() => noteEl.classList.remove('played'), 100);
  }

  /**
   * Update fretboard range
   */
  setFretRange(minFret, maxFret) {
    this.settings.minFret = minFret;
    this.settings.maxFret = maxFret;
    this.render();
  }

  /**
   * Toggle hover play
   */
  setHoverPlay(enabled) {
    this.settings.hoverPlay = enabled;
  }

  /**
   * Set oscillator type (sine, square, sawtooth, triangle)
   */
  setOscillatorType(type) {
    this.settings.oscillatorType = type;
  }

  /**
   * Set note duration (ms)
   */
  setNoteDuration(duration) {
    this.settings.noteDuration = duration;
  }

  /**
   * Toggle left-handed mode
   */
  setLeftHanded(isLeftHanded) {
    this.settings.isLeftHanded = isLeftHanded;
    this.container.classList.toggle('lefthanded', isLeftHanded);
  }
}
