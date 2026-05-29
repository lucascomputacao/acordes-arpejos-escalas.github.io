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
   * Create HTML structure for fretboard (horizontal, muted.io style)
   * - 6 horizontal strings, bass (thick) on top → treble (thin) on bottom
   * - Fret wires as vertical lines, fret numbers on top
   * - Wood-colored board with inlay markers
   */
  createFretboardHTML() {
    const minFret = this.settings.minFret;
    const maxFret = this.settings.maxFret;
    // Fret columns always start at 1 (fret 0 = open string column / nut)
    const startFret = Math.max(minFret, 1);
    const fretCount = Math.max(0, maxFret - startFret + 1);

    let html = `<div class="ifretboard" style="--frets:${fretCount};">`;

    // Fret number header row
    html += '<div class="ifretboard-fretnums">';
    html += '<div class="ifretboard-fretnum is-open">0</div>';
    for (let f = startFret; f <= maxFret; f++) {
      html += `<div class="ifretboard-fretnum">${f}</div>`;
    }
    html += '</div>';

    // Board (holds inlays + string rows)
    html += '<div class="ifretboard-board">';

    // Inlay markers overlay
    html += this.createInlaysHTML(startFret, maxFret);

    // String rows: display high E (string 0, thinnest) on top → low E (string 5, thickest) on bottom
    for (let displayRow = 0; displayRow < 6; displayRow++) {
      const stringNum = displayRow;
      const gauge = 5 - stringNum; // thickness: string 0 = thin (gauge 5), string 5 = thick (gauge 0)
      html += `<div class="ifretboard-srow" data-gauge="${gauge}" data-string="${stringNum}">`;

      // Open string note (nut column)
      const openNote = window.audioEngine.getStringNote(stringNum, 0);
      html += this.noteCellHTML(stringNum, 0, openNote, true);

      // Fretted notes
      for (let f = startFret; f <= maxFret; f++) {
        const note = window.audioEngine.getStringNote(stringNum, f);
        html += this.noteCellHTML(stringNum, f, note, false);
      }

      html += '</div>';
    }

    html += '</div>'; // board
    html += '</div>'; // ifretboard
    return html;
  }

  /**
   * Build a single note cell
   */
  noteCellHTML(stringNum, fretNum, noteName, isOpen) {
    const label = (noteName || '').replace(/\d/g, '');
    const cls = 'ifretboard-note' + (isOpen ? ' ifretboard-open' : '');
    return `
      <div class="${cls}"
           data-string="${stringNum}"
           data-fret="${fretNum}"
           data-note="${noteName}">
        <span class="ifretboard-note-label">${label}</span>
      </div>
    `;
  }

  /**
   * Inlay markers overlay (single dots at 3,5,7,9,15,17,19,21 — double at 12,24)
   */
  createInlaysHTML(startFret, maxFret) {
    const singles = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubles = [12, 24];

    let html = '<div class="ifretboard-inlays" aria-hidden="true">';
    // Spacer for the open/nut column
    html += '<div class="ifretboard-inlay-cell is-open"></div>';
    for (let f = startFret; f <= maxFret; f++) {
      if (doubles.includes(f)) {
        html += '<div class="ifretboard-inlay-cell"><span class="ifretboard-dot"></span><span class="ifretboard-dot"></span></div>';
      } else if (singles.includes(f)) {
        html += '<div class="ifretboard-inlay-cell"><span class="ifretboard-dot single"></span></div>';
      } else {
        html += '<div class="ifretboard-inlay-cell"></div>';
      }
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

    // Convert duration to seconds if it's in ms
    // For samples, duration should be in seconds (0.3-3.0)
    let duration = this.settings.noteDuration;
    if (typeof duration === 'number' && duration > 10) {
      duration = duration / 1000; // Convert ms to seconds
    }

    window.audioEngine.playNote(note, {
      duration: duration
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
