/**
 * Diagram Audio — makes the static SVG chord/scale/arpeggio diagrams playable.
 * Each note dot is rendered by renderer.js inside a <g class="ca-note" data-note="...">.
 * Clicking (or hovering, optionally) a note plays the corresponding real guitar
 * sample via the shared Tone.js sample engine (window.audioEngine).
 */
(function () {
  let inited = false;
  let initing = null;

  // Lazy-initialize the audio engine on first user interaction (required by browsers).
  async function ensureAudio() {
    if (inited) return true;
    if (initing) return initing;
    initing = (async () => {
      try {
        if (!window.audioEngine) {
          console.error('❌ audioEngine not loaded');
          return false;
        }
        await window.audioEngine.init();
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
    window.audioEngine.playNote(note, { duration: 1.4 });
    flash(groupEl);
  }

  // Event delegation: handle clicks anywhere, find the nearest note group.
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;
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

  console.log('🎸 Diagram audio ready — click any note on a diagram to hear it.');
})();
