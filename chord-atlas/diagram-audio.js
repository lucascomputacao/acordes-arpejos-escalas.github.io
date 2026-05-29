/**
 * Diagram Audio — makes the static SVG chord/scale/arpeggio diagrams playable.
 * Each note dot is rendered by renderer.js inside a <g class="ca-note" data-note="...">.
 * Clicking a note (or a card ▶ button) plays the matching real guitar sample
 * via the shared Tone.js sample engine (window.audioEngine).
 *
 * Mobile note: iOS/Android require the AudioContext to be resumed *inside* a
 * user gesture. We unlock it synchronously on the very first pointer/touch and
 * keep it resumed before every playback so sound works on phones too.
 */
(function () {
  let inited = false;
  let initing = null;
  let unlocked = false;

  function getCtx() {
    try { return (window.Tone && Tone.context) ? Tone.context : null; }
    catch (e) { return null; }
  }

  // Synchronously nudge the audio context awake within a user gesture.
  // Also plays a 1-sample silent buffer — the classic iOS unlock trick.
  function unlockAudio() {
    try {
      if (!window.Tone) return;
      const ctx = getCtx();
      if (ctx && ctx.state !== 'running' && typeof ctx.resume === 'function') {
        ctx.resume();
      }
      if (typeof Tone.start === 'function') { Tone.start(); }
      if (!unlocked && ctx) {
        const raw = ctx.rawContext || ctx._context || ctx;
        if (raw && typeof raw.createBuffer === 'function') {
          const buf = raw.createBuffer(1, 1, 22050);
          const src = raw.createBufferSource();
          src.buffer = buf;
          src.connect(raw.destination);
          (src.start || src.noteOn).call(src, 0);
          unlocked = true;
        }
      }
    } catch (e) { /* best-effort */ }
  }

  // Make sure the context is actually running before producing sound.
  async function resumeContext() {
    const ctx = getCtx();
    if (ctx && ctx.state !== 'running' && typeof ctx.resume === 'function') {
      try { await ctx.resume(); } catch (e) { /* ignore */ }
    }
  }

  // Lazy-initialize the audio engine on first user interaction.
  async function ensureAudio() {
    unlockAudio();
    if (inited) { await resumeContext(); return true; }
    if (initing) return initing;
    initing = (async () => {
      try {
        if (!window.audioEngine) {
          console.error('❌ audioEngine not loaded');
          return false;
        }
        await window.audioEngine.init();
        await resumeContext();
        inited = !!window.audioEngine.isInitialized;
        return inited;
      } catch (err) {
        console.error('❌ Diagram audio init failed:', err);
        return false;
      } finally {
        initing = null;
      }
    })();
    return initing;
  }

  function flash(groupEl) {
    groupEl.classList.add('ca-note-playing');
    setTimeout(() => groupEl.classList.remove('ca-note-playing'), 240);
  }

  async function playFromElement(groupEl) {
    const note = groupEl.getAttribute('data-note');
    if (!note) return;
    const ready = await ensureAudio();
    if (!ready || !window.audioEngine.isInitialized) return;
    await resumeContext();
    window.audioEngine.playNote(note, { duration: 1.4 });
    flash(groupEl);
  }

  // Play an entire diagram from a card play button.
  // mode 'chord': arpeggiate (sequence) then strum (simultaneous).
  // mode 'arp':   arpeggiate (sequence) only.
  async function playFromButton(btn) {
    const raw = btn.getAttribute('data-notes') || '';
    const notes = raw.split(',').map((n) => n.trim()).filter(Boolean);
    if (!notes.length) return;
    const mode = btn.getAttribute('data-mode') || 'arp';

    const ready = await ensureAudio();
    if (!ready || !window.audioEngine.isInitialized) return;
    await resumeContext();

    if (btn.classList.contains('is-playing')) return; // avoid overlap
    btn.classList.add('is-playing');

    const stepMs = 200;     // gap between sequenced notes
    const pauseMs = 650;    // pause between the sequence and the simultaneous strum
    window.audioEngine.playArpeggio(notes, { noteDuration: 0.9, delayBetween: stepMs });
    const seqMs = notes.length * stepMs;

    if (mode === 'chord') {
      // After the sequence finishes, pause, then play all notes together (strum).
      setTimeout(() => {
        window.audioEngine.playChord(notes, { duration: 2.6 });
      }, seqMs + pauseMs);
      setTimeout(() => btn.classList.remove('is-playing'), seqMs + pauseMs + 2600);
    } else {
      setTimeout(() => btn.classList.remove('is-playing'), seqMs + 700);
    }
  }

  // Earliest possible unlock: fire synchronously on the first pointer/touch,
  // before the click handler's async work runs. Capture phase, runs once.
  const earlyUnlock = () => unlockAudio();
  ['pointerdown', 'touchstart', 'mousedown'].forEach((evt) => {
    document.addEventListener(evt, earlyUnlock, { capture: true, passive: true });
  });

  // Event delegation: handle taps anywhere, find the nearest note or play button.
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;

    const playBtn = target.closest('.ca-play');
    if (playBtn) {
      e.preventDefault();
      playFromButton(playBtn);
      return;
    }

    const group = target.closest('.ca-note');
    if (!group) return;
    e.preventDefault();
    playFromElement(group);
  });

  // Keyboard accessibility: allow Enter/Space when a note is focused.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const group = document.activeElement && document.activeElement.closest
      ? document.activeElement.closest('.ca-note')
      : null;
    if (!group) return;
    e.preventDefault();
    playFromElement(group);
  });

  console.log('🎸 Diagram audio ready — tap any note (or ▶) on a diagram to hear it.');
})();
