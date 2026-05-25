#!/usr/bin/env python3
"""
Gerador de diagramas de acordes em SVG para guitarra.
Cria diagramas visuais parecidos com o padrão do livro Nelson Faria.
"""

import os
from pathlib import Path

# Definição dos acordes com múltiplas posições (formas clássicas)
CHORDS = {
    # ========== C MAJOR ==========
    'C Major - Forma C (barra 3ª)': {
        'filename': 'triade-C-forma-C.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 3),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Major - Forma A (5ª corda)': {
        'filename': 'triade-C-forma-A.svg',
        'fingers': [
            (1, 0),
            (2, 3),
            (3, 2),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Major - Forma G (4ª corda)': {
        'filename': 'triade-C-forma-G.svg',
        'fingers': [
            (1, 0),
            (2, 2),
            (3, 0),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Major - Forma E (6ª corda)': {
        'filename': 'triade-C-forma-E.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 2),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Major - Forma D (barra 10ª)': {
        'filename': 'triade-C-forma-D.svg',
        'fingers': [
            (1, 0),
            (2, 'x'),
            (3, 2),
            (4, 1),
            (5, 'x'),
            (6, 'x'),
        ]
    },

    # ========== C MINOR ==========
    'C Minor - Forma C (barra 3ª)': {
        'filename': 'triade-Cm-forma-C.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 3),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Minor - Forma A (5ª corda)': {
        'filename': 'triade-Cm-forma-A.svg',
        'fingers': [
            (1, 0),
            (2, 3),
            (3, 1),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Minor - Forma G (4ª corda)': {
        'filename': 'triade-Cm-forma-G.svg',
        'fingers': [
            (1, 0),
            (2, 2),
            (3, 0),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Minor - Forma E (6ª corda)': {
        'filename': 'triade-Cm-forma-E.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 2),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Minor - Forma D (barra 10ª)': {
        'filename': 'triade-Cm-forma-D.svg',
        'fingers': [
            (1, 0),
            (2, 0),
            (3, 1),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },

    # ========== C AUGMENTED ==========
    'C Augmented - Forma C (barra 3ª)': {
        'filename': 'triade-Caug-forma-C.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 4),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Augmented - Forma A (5ª corda)': {
        'filename': 'triade-Caug-forma-A.svg',
        'fingers': [
            (1, 0),
            (2, 3),
            (3, 2),
            (4, 1),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Augmented - Forma G (4ª corda)': {
        'filename': 'triade-Caug-forma-G.svg',
        'fingers': [
            (1, 1),
            (2, 2),
            (3, 0),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Augmented - Forma E (6ª corda)': {
        'filename': 'triade-Caug-forma-E.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 3),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Augmented - Forma D (barra 10ª)': {
        'filename': 'triade-Caug-forma-D.svg',
        'fingers': [
            (1, 0),
            (2, 0),
            (3, 2),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },

    # ========== C DIMINISHED ==========
    'C Diminished - Forma C (barra 3ª)': {
        'filename': 'triade-Cdim-forma-C.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 3),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Diminished - Forma A (5ª corda)': {
        'filename': 'triade-Cdim-forma-A.svg',
        'fingers': [
            (1, 0),
            (2, 3),
            (3, 1),
            (4, 1),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Diminished - Forma G (4ª corda)': {
        'filename': 'triade-Cdim-forma-G.svg',
        'fingers': [
            (1, 0),
            (2, 2),
            (3, 0),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    },
    'C Diminished - Forma E (6ª corda)': {
        'filename': 'triade-Cdim-forma-E.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 1),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Diminished - Forma D (barra 10ª)': {
        'filename': 'triade-Cdim-forma-D.svg',
        'fingers': [
            (1, 0),
            (2, 0),
            (3, 1),
            (4, 'x'),
            (5, 'x'),
            (6, 'x'),
        ]
    }
}

DIAGRAM_WIDTH = 700
DIAGRAM_HEIGHT = 300
FRET_COUNT = 4
FRET_HEIGHT = 70
STRING_SPACING = (DIAGRAM_HEIGHT - 90) / 5
START_X = 25
START_Y = 50
NUT_HEIGHT = 8
HORIZONTAL_MODE = True  # Orientação horizontal (landscape)


def create_chord_svg(chord_name, fingers):
    """Cria um diagrama SVG de acorde em orientação horizontal (landscape)."""
    svg = f'''<svg width="{DIAGRAM_WIDTH}" height="{DIAGRAM_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect width="{DIAGRAM_WIDTH}" height="{DIAGRAM_HEIGHT}" fill="white"/>

    <!-- Título -->
    <text x="20" y="20" text-anchor="start" font-size="14" font-weight="bold">{chord_name}</text>

    <!-- Nut (capo) - linha vertical no topo -->
    <rect x="{START_X}" y="{START_Y}" width="{NUT_HEIGHT}" height="{STRING_SPACING * 5}" fill="black" stroke="black" stroke-width="2"/>

    <!-- Cordas (linhas horizontais) -->
'''

    # Desenhar cordas horizontais (da esquerda para direita)
    for i in range(6):
        y = START_Y + i * STRING_SPACING
        svg += f'    <line x1="{START_X}" y1="{y}" x2="{START_X + NUT_HEIGHT + FRET_HEIGHT * (FRET_COUNT + 0.5)}" y2="{y}" stroke="black" stroke-width="2"/>\n'

    svg += '''
    <!-- Trastes (linhas verticais) -->
'''

    # Desenhar trastes
    for f in range(1, FRET_COUNT + 1):
        x = START_X + NUT_HEIGHT + f * FRET_HEIGHT
        svg += f'    <line x1="{x}" y1="{START_Y}" x2="{x}" y2="{START_Y + STRING_SPACING * 5}" stroke="black" stroke-width="1"/>\n'

        # Números dos trastes (embaixo)
        svg += f'    <text x="{x}" y="{START_Y + STRING_SPACING * 5 + 20}" text-anchor="middle" font-size="12" fill="gray">{f}</text>\n'

    svg += '''
    <!-- Posições dos dedos -->
'''

    # Adicionar posições dos dedos
    for string_num, fret in fingers:
        string_index = string_num - 1
        y = START_Y + string_index * STRING_SPACING

        if fret == 'x':
            # X para corda mutada (no topo-esquerda)
            size = 8
            svg += f'    <line x1="{START_X - 15}" y1="{y - size}" x2="{START_X - 5}" y2="{y + size}" stroke="black" stroke-width="2"/>\n'
            svg += f'    <line x1="{START_X - 5}" y1="{y - size}" x2="{START_X - 15}" y2="{y + size}" stroke="black" stroke-width="2"/>\n'
        elif fret == 0 or fret == '0':
            # O para corda aberta (no topo-esquerda)
            svg += f'    <circle cx="{START_X - 10}" cy="{y}" r="6" fill="none" stroke="black" stroke-width="2"/>\n'
        else:
            # Ponto para posição do dedo
            x = START_X + NUT_HEIGHT + (fret - 0.5) * FRET_HEIGHT
            svg += f'    <circle cx="{x}" cy="{y}" r="10" fill="black" stroke="black" stroke-width="2"/>\n'

    svg += '</svg>'
    return svg


def main():
    """Gera todos os diagramas de acordes."""

    # Criar diretório de destino
    output_dir = Path('public/images/dia-01')
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f'🎸 Gerando diagramas de acordes em {output_dir}...\n')

    # Gerar cada acorde
    for chord_name, chord_data in CHORDS.items():
        svg_content = create_chord_svg(chord_name, chord_data['fingers'])
        output_file = output_dir / chord_data['filename']

        with open(output_file, 'w') as f:
            f.write(svg_content)

        print(f'✓ Generated: {output_file}')

    print(f'\n✨ Todos os diagramas foram gerados com sucesso!')
    print(f'📁 Localização: {output_dir.absolute()}')


if __name__ == '__main__':
    main()
