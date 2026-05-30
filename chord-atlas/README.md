# Chord Atlas

A comprehensive, interactive guitar learning tool for exploring chords, arpeggios, scales, modes, and harmonic relationships on the fretboard.

**Live Demo:** Open `index.html` in a modern web browser.

---

## Overview

Chord Atlas is a feature-rich music education application designed for guitarists who want to understand:

- **Chord voicings** across different string groups and fret ranges
- **Arpeggio patterns** with five regional positions per structure
- **Scales and modes** (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, Altered, etc.)
- **Harmonic fields** (Major, Natural Minor, Harmonic Minor, Melodic Minor)
- **Voice leading** between different chord voicings for smooth transitions
- **Scale/chord compatibility** with AI-assisted suggestions
- **Greek modes, melodic minor modes, symmetric scales, and pentatonic/hexatonic/bebop/quartal study fields**

All voicings are rendered as interactive SVG fretboard diagrams with clickable notes that produce audio via synthesized or sampled guitar sounds.

---

## Features

### Interactive Diagrams
- **Dynamic fretboard visualization** with root notes (white dots) and chord tones (black dots)
- **Adjustable fret range** to zoom into specific regions (0-12, 5-12, 0-24 frets)
- **String group selection** to filter by number of strings
- **Voicing filters** to show specific positions or shapes
- **Click-to-play audio** for each note and full arpeggio playback

### Musical Content
- **13 chord types** (major, minor, dominant, diminished, suspended, sixth chords, etc.)
- **11 arpeggio shapes** with five-position regional layouts
- **Multiple scales and modes** with diatonic, harmonic, and melodic variants
- **4 harmonic field modes** for understanding chord progressions
- **Scale suggestions** based on selected chord (why it works with your structure)
- **Tension analysis** showing available chord extensions (9, 11, 13)
- **Compatible chord finder** to explore substitutions and variations

### Voice Leading Analysis
- Find the closest voicings when transitioning between two chords
- Minimize finger movement for smooth voice leading
- Understand interval relationships between voices

### Arpeggio Superimposition
- Study advanced arpeggio stacking and substitution techniques
- View tablature-only arpeggio studies (IIm7 - V7 - I7M progressions)

### Exercises
- Dedicated exercise section with real-world arpeggio studies
- Tab-only format for focused practice

### Internationalization
- **Bilingual support:** Portuguese and English
- Toggle language at the top of the interface
- All labels, suggestions, and descriptions translated

### Export & Print
- **Export as SVG** for vector editing or web embedding
- **Export as PNG** for sharing or documentation
- **Print-friendly layout** for creating practice sheets

### Responsive Design
- **Mobile-friendly drawer navigation** for small screens
- **Floating quick-select** for root and structure (always accessible)
- **Full desktop controls sidebar** with advanced filtering

### GitHub Pages Compatible
- **Deep linking via hash URLs** for shareable state
- All settings preserved in the URL for bookmarking or sharing links
- Example: `#/arpeggios/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24&lang=en`

---

## How to Use

### Getting Started

1. **Open the app:** Open `index.html` in your browser
2. **Select a root note** (C, C#, D, etc.) from the root selector
3. **Pick a structure** (chord, arpeggio, scale, mode, or harmonic field)
4. **Adjust the fret range** to focus on a specific region
5. **Toggle string groups** to show/hide strings
6. **Select voicings** to filter which positions to display

### Controls

| Control | Purpose |
|---------|---------|
| **Root** | Choose the tonal center (chromatic: C to B) |
| **Structure** | Select the chord, arpeggio, scale, or field to explore |
| **Fret Range** | Adjust start and end frets (0-24) |
| **String Groups** | Toggle 2-string, 3-string, 4-string, 5-string, 6-string shapes |
| **Voicings** | Filter to specific positions or show all |
| **Scale Suggestions** | AI suggestions for scales/modes that work with the selected chord |
| **Available Tensions** | Extensions available (9, 11, 13) |
| **Compatible Chords** | Alternative voicings and chord substitutions |
| **Voice Leading** | Find smooth transitions between two chords |

### Audio Playback

Click any note on the fretboard to play it. Click the play button on a diagram to hear the entire arpeggio or chord.

**Audio engines:**
- **Tone.js (default):** Browser-based synthesis with realistic guitar timbre
- **Audio samples:** Recorded guitar samples for authentic tone
- Select your preferred engine when initializing

### Voice Leading

1. Select "From chord" (root + structure)
2. Select "To chord" (root + structure)
3. Click "Find closest voicings"
4. View the two voicings side-by-side with interval mappings

### Deep Linking

All app state is encoded in the URL hash for easy sharing:

```
#/category/structure?root=ROOT&minFret=N&maxFret=N&lang=LANG&stringGroups=A|B|C&voicings=X|Y|Z&vlRootA=...&vlStructA=...
```

**Examples:**
- `#/chords/tetrade-maior-7m?root=F&minFret=5&maxFret=12&lang=pt`
- `#/arpeggios/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24`
- `#/scales/escala-menor-natural?lang=pt&stringGroups=3-4-5-6`

---

## Project Structure

```
chord-atlas/
├── index.html                    # Main HTML entry point
├── app.js                        # Router, state management, event handlers
├── music-engine.js               # Chord/arpeggio/scale library, interval logic
├── renderer.js                   # SVG diagram generation & styling
├── i18n.js                       # Internationalization (PT/EN)
├── styles.css                    # All UI styling
│
├── Audio Engines
├── audio-engine.js               # Abstract audio interface
├── audio-engine-tonejs.js        # Tone.js synthesis engine
├── audio-engine-samples.js       # Sampled guitar audio engine
├── diagram-audio.js              # Click-to-play integration
├── tone.js                       # Tone.js library (synthesis)
├── samples/                      # Guitar sample files (.wav, .mp3)
│
├── Interactive UI
├── interactive-fretboard.js      # Fretboard interaction handler
├── interactive-fretboard-demo.html
├── interactive-fretboard-tonejs-demo.html
├── interactive-fretboard-samples-demo.html
│
├── Documentation
├── README.md                     # This file
├── INTERACTIVE_FRETBOARD.md      # Fretboard interaction guide
│
├── Tests
├── tests/                        # Comprehensive test suite
│   ├── arpeggios.test.js
│   ├── arpeggio-shapes.test.js
│   ├── harmonic-fields.test.js
│   ├── svg-diagrams.test.js
│   ├── diagram-audio.test.js
│   ├── inversion-filter.test.js
│   ├── library-and-generators.test.js
│   └── comprehensive.test.js
│
├── Configuration
├── .claude/                      # Claude Code integration
└── color-review.html             # Color scheme testing
```

---

## Technical Details

### Core Libraries

- **No external dependencies** for core functionality
- **Tone.js** (included) for audio synthesis
- **SVG for rendering** (scalable, printable, exportable)

### Music Engine (`music-engine.js`)

The heart of the application. Provides:

- **LIBRARY:** Master chord/arpeggio/scale/mode definitions
  - 13 chord types
  - 11 arpeggio shapes
  - 11+ scales and modes
  - Harmonic field generators

- **Interval system:** Named intervals (T, b2, 2, b3, 3, 4, #4, 5, b6, 6, b7, 7M, 8)

- **Voicing generators:**
  - Guitar-specific string group shapes (2-6 strings)
  - Fret range constraints
  - Inversion modes (root position only, all inversions, select inversions)

- **Scale suggestions & compatibility:** AI-powered recommendations based on music theory relationships

### Rendering Engine (`renderer.js`)

Generates SVG diagrams with:

- **Fretboard grid** (customizable fret range)
- **Note dots** (color-coded by role: root vs. chord tones)
- **Interactive zones** for click-to-play
- **Tablature rendering** for exercises
- **Styling system** for light/dark themes

### State Management (`app.js`)

- Hash-based routing for deep linking
- Real-time URL sync for bookmark/sharing
- Sidebar controls with mobile drawer
- Voice leading solver
- Export/print handlers

### Audio (`audio-engine*.js` and `diagram-audio.js`)

- **Modular audio interface:** Switch between Tone.js and samples seamlessly
- **Audio scheduling:** Stagger note onsets for arpeggios
- **Click handlers:** Convert diagram interactions to audio events

### Internationalization (`i18n.js`)

- Bilingual support (Portuguese, English)
- Data-i18n attributes for DOM elements
- Language toggle buttons
- Automatic translation lookup

---

## Audio Engines

### Tone.js Synthesis (Default)

Browser-based synthesis with realistic timbre. No sample files needed.

**Advantages:**
- Works offline
- Lightweight
- Customizable synthesis parameters

**How to use:**
```html
<script src="tone.js"></script>
<script src="audio-engine-tonejs.js"></script>
<script src="diagram-audio.js"></script>
```

### Audio Samples

Pre-recorded guitar samples for authentic tone.

**Advantages:**
- Realistic guitar sound
- Multiple playing techniques (pick, fingerstyle, etc.)

**How to use:**
```html
<script src="audio-engine-samples.js"></script>
<script src="diagram-audio.js"></script>
```

Add `.wav` or `.mp3` files to the `samples/` directory organized by pitch and technique.

---

## Testing

The project includes a comprehensive test suite covering:

- Arpeggio generation and positioning
- Harmonic field calculations
- SVG diagram accuracy
- Audio scheduling
- Inversion filtering
- Library consistency
- Platform compatibility

**Run tests in your browser:**

Open `test.html` (or any `*.test.js` file in browser console) to see automated test output.

---

## Internationalization

### Supported Languages

- **Portuguese (PT)** - 🇧🇷
- **English (EN)** - 🇺🇸

### Adding a New Language

1. Edit `i18n.js` and add translations to the `I18N` object
2. Add a language button to `index.html`
3. Update `CATEGORY_TO_SLUG` and `SLUG_TO_CATEGORY` for new categories
4. All `data-i18n` attributes will automatically use the new translation

---

## Category Reference

| Category | Purpose |
|----------|---------|
| **Acordes** | 13 chord types (triads, tetrads, suspended, sixth) |
| **Arpejos** | 11 arpeggio patterns with five-position layouts |
| **Escalas** | 11 scales (major, minor natural/harmonic/melodic, pentatonic, blues, etc.) |
| **Modos** | 8 Greek modes + Altered/Superlócrio |
| **Campos Harmônicos** | 4 harmonic field modes for progressions |
| **Superposição de Arpejos** | Advanced arpeggio stacking studies |
| **Exercícios** | Tablature-only practice routines |
| **Intervalos** | All 13 intervals for interval training |

---

## Customization

### Colors & Styling

Edit `styles.css` to customize:

- Root note color (white dots)
- Chord tone color (black dots)
- Fretboard colors (wood texture, grid)
- Button and control styling
- Light/dark theme

See `color-review.html` for a color scheme testing interface.

### Adding New Chords or Scales

Edit `music-engine.js` and add to the `LIBRARY` object:

```javascript
LIBRARY['Acordes']['Meu Acorde'] = ['T', '3', '5', 'b7'];
```

All voicing generators will automatically create fretboard positions.

### Audio Customization

Edit the `AudioEngine` class in `audio-engine-tonejs.js` or `audio-engine-samples.js`:

- Adjust synthesis parameters (attack, release, filter cutoff)
- Change sample playback rate or volume
- Add reverb, delay, or other effects

---

## Deployment

### GitHub Pages

Chord Atlas is fully compatible with GitHub Pages:

1. Push to a `gh-pages` branch
2. Or enable GitHub Pages in repository settings
3. Access via `your-username.github.io/chord-atlas`

**Deep linking works automatically** via hash routing.

### Self-Hosted

Simply copy all files to a web server and serve the directory. No build step or server-side code required.

---

## Known Limitations

- Audio playback requires a modern browser with Web Audio API support (all modern browsers: Chrome, Firefox, Safari, Edge)
- Sampled audio engine requires `.wav` or `.mp3` files in the `samples/` directory
- Mobile devices may have limited audio context initialization (tap to start)

---

## Contributing

To improve Chord Atlas:

1. **Report bugs:** File an issue with the category, structure, and expected behavior
2. **Suggest features:** New chord types, scales, exercises, or UI improvements
3. **Improve translations:** Add new languages or improve existing translations
4. **Add tests:** Expand the test suite in `tests/`

---

## Documentation

- **[INTERACTIVE_FRETBOARD.md](INTERACTIVE_FRETBOARD.md)** - Detailed guide on fretboard interaction and customization
- **Code comments** throughout for implementation details

---

## License

This project is for educational purposes. Use freely for learning and teaching music theory and guitar techniques.

---

## Educational Use

Chord Atlas is designed for:

- **Guitar students** learning music theory and fretboard navigation
- **Jazz musicians** understanding chord voicings and voice leading
- **Composers** exploring harmonic possibilities
- **Teachers** demonstrating chords, scales, and progressions
- **Transcription work** understanding what notes were played

Get started: Open `index.html` and explore!

---

## Quick Reference

### Keyboard Shortcuts

- **Language toggle:** Buttons in top right (Portuguese / English)
- **Mobile menu:** Hamburger button on small screens
- **Deep link copying:** Browser address bar (auto-synced state)

### Export Options

| Format | Use Case |
|--------|----------|
| **SVG** | Web embedding, vector editing (Inkscape, Adobe XD) |
| **PNG** | Sharing, documentation, email |
| **Print** | Practice sheets, reference materials |

---

## Tips & Tricks

1. **Narrow the fret range** (e.g., 5-12) to focus on a specific region
2. **Filter string groups** to find voicings for specific techniques (e.g., 3-string shapes for arpeggio work)
3. **Use voice leading** to practice smooth transitions in jazz progressions
4. **Combine scales + chords** by switching tabs to understand the relationship
5. **Deep link** and bookmark your favorite explorations for later study
6. **Export diagrams** for creating custom practice materials

---

## Credits

Built by Lucas Borges for musicians, students, and educators.

**Special thanks** to the music theory community and Tone.js creators for excellent synthesis tools.

---

## Support

For questions or issues:

1. Check the documentation in this README
2. Review `INTERACTIVE_FRETBOARD.md` for advanced topics
3. Explore the test files to understand expected behavior
4. Inspect browser console for error messages

Enjoy exploring music theory with Chord Atlas!
