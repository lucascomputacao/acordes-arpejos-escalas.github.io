# ChordAtlas - Horizontal Arpeggio Patterns

This version keeps the premium legacy CSS and changes the Arpejos section to render book-style horizontal fretboard regions.

Implemented first:
- Arpejo tríade maior with five regional positions.
- Root notes are rendered as white dots.
- Other arpeggio tones are rendered as black dots.
- Patterns transpose by key while preserving the same fret-distance shape.

Open `index.html` in a browser.

- Added book-style Arpejo tétrade maior 7M with five regional horizontal positions.

## Deep links

The app now supports GitHub Pages friendly hash URLs, for example:

- `#/arpeggios/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24&lang=en`
- `#/chords/tetrade-maior-7m?root=F&minFret=5&maxFret=12&lang=pt`

These links preserve the selected tab, structure, key, fret range, and language.

- Mobile drawer for controls on small screens.

- Added harmonic field options: Major, Natural Minor, Harmonic Minor and Melodic Minor.

- Extended harmonic fields: Greek modes, melodic minor modes, symmetric fields, pentatonic/hexatonic/bebop/quartal study fields.

## Shareable URL state

The app now keeps the main controls in the hash URL for GitHub Pages compatibility:

- category/tab
- selected structure
- root
- start/end fret
- language
- selected string groups
- selected voicings/patterns
- voice-leading controls, when present

Example:
`#/arpeggios/arpejo-tetrade-menor-7?root=C&minFret=0&maxFret=24&lang=en&stringGroups=1-2-3-4-5-6&voicings=Position%201`

- Added book-style Arpejo tétrade menor 7 position 4.
