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
    'C Major - Forma C (casa 3ª)': {
        'filename': 'triade-C-forma-C.svg',
        'start_fret': 3,
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
        'start_fret': 0,
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
        'start_fret': 0,
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
        'start_fret': 0,
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 2),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Major - Forma D (casa 10ª)': {
        'filename': 'triade-C-forma-D.svg',
        'start_fret': 10,
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
    'C Minor - Forma C (casa 3ª)': {
        'filename': 'triade-Cm-forma-C.svg',
        'start_fret': 3,
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
        'start_fret': 0,
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
        'start_fret': 0,
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
        'start_fret': 0,
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 2),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Minor - Forma D (casa 10ª)': {
        'filename': 'triade-Cm-forma-D.svg',
        'start_fret': 10,
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
    'C Augmented - Forma C (casa 3ª)': {
        'filename': 'triade-Caug-forma-C.svg',
        'start_fret': 3,
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
        'start_fret': 0,
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
        'start_fret': 0,
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
        'start_fret': 0,
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 3),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Augmented - Forma D (casa 10ª)': {
        'filename': 'triade-Caug-forma-D.svg',
        'start_fret': 10,
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
    'C Diminished - Forma C (casa 3ª)': {
        'filename': 'triade-Cdim-forma-C.svg',
        'start_fret': 3,
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
        'start_fret': 0,
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
        'start_fret': 0,
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
        'start_fret': 0,
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 1),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Diminished - Forma D (casa 10ª)': {
        'filename': 'triade-Cdim-forma-D.svg',
        'start_fret': 10,
        'fingers': [
            (1, 1),
            (2, 1),
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


def create_chord_svg(chord_name, fingers, start_fret=0):
    """Cria um diagrama SVG de acorde em orientação vertical (cordas na vertical, trastes na horizontal)."""
    svg = f'''<svg width="{DIAGRAM_WIDTH}" height="{DIAGRAM_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect width="{DIAGRAM_WIDTH}" height="{DIAGRAM_HEIGHT}" fill="white"/>

    <!-- Título -->
    <text x="20" y="20" text-anchor="start" font-size="14" font-weight="bold">{chord_name}</text>

    <!-- Nut (capo) - linha horizontal no topo -->
    <rect x="{START_X}" y="{START_Y}" width="{STRING_SPACING * 5}" height="{NUT_HEIGHT}" fill="black" stroke="black" stroke-width="2"/>

    <!-- Cordas (linhas verticais) -->
'''

    # Desenhar cordas verticais (de cima para baixo)
    for i in range(6):
        x = START_X + i * STRING_SPACING
        svg += f'    <line x1="{x}" y1="{START_Y}" x2="{x}" y2="{START_Y + NUT_HEIGHT + FRET_HEIGHT * (FRET_COUNT + 0.5)}" stroke="black" stroke-width="2"/>\n'

    svg += '''
    <!-- Trastes (linhas horizontais) -->
'''

    # Desenhar trastes
    for f in range(1, FRET_COUNT + 1):
        y = START_Y + NUT_HEIGHT + f * FRET_HEIGHT
        svg += f'    <line x1="{START_X}" y1="{y}" x2="{START_X + STRING_SPACING * 5}" y2="{y}" stroke="black" stroke-width="1"/>\n'

    # Adicionar números das casas na parte inferior, centrados no meio de cada casa
    for f in range(1, FRET_COUNT + 1):
        # Número da casa (começa no start_fret)
        fret_number = start_fret + f - 1
        # Posição X no meio da casa (entre o traste anterior e o atual)
        x = START_X + (f - 0.5) * FRET_HEIGHT
        # Posição Y na parte inferior (embaixo do diagrama)
        y = START_Y + NUT_HEIGHT + FRET_HEIGHT * (FRET_COUNT + 0.5) + 20
        svg += f'    <text x="{x}" y="{y}" text-anchor="middle" font-size="12" fill="gray">{fret_number}</text>\n'

    svg += '''
    <!-- Posições dos dedos -->
'''

    # Adicionar posições dos dedos
    # Primeiro, detectar barras (múltiplas cordas no mesmo fret)
    fret_groups = {}
    for string_num, fret in fingers:
        if fret not in ('x', 0, '0'):  # Apenas frets numerados
            if fret not in fret_groups:
                fret_groups[fret] = []
            fret_groups[fret].append(string_num)

    # Desenhar barras (linhas contínuas quando múltiplas cordas no mesmo fret)
    for fret, string_nums in fret_groups.items():
        if len(string_nums) > 1:  # Barra (pestana)
            sorted_strings = sorted(string_nums)
            min_string = sorted_strings[0]
            max_string = sorted_strings[-1]

            x_min = START_X + (min_string - 1) * STRING_SPACING
            x_max = START_X + (max_string - 1) * STRING_SPACING
            y = START_Y + NUT_HEIGHT + (fret - 0.5) * FRET_HEIGHT

            # Desenhar barra preta contínua
            svg += f'    <line x1="{x_min}" y1="{y}" x2="{x_max}" y2="{y}" stroke="black" stroke-width="12" stroke-linecap="round"/>\n'

    # Depois, adicionar marcadores individuais (para cordas soltas, mudas, ou notas isoladas)
    for string_num, fret in fingers:
        string_index = string_num - 1
        x = START_X + string_index * STRING_SPACING

        if fret == 'x':
            # X para corda mutada (no topo)
            size = 8
            svg += f'    <line x1="{x - size}" y1="{START_Y - 15}" x2="{x + size}" y2="{START_Y - 5}" stroke="black" stroke-width="2"/>\n'
            svg += f'    <line x1="{x + size}" y1="{START_Y - 15}" x2="{x - size}" y2="{START_Y - 5}" stroke="black" stroke-width="2"/>\n'
        elif fret == 0 or fret == '0':
            # O para corda aberta (no topo)
            svg += f'    <circle cx="{x}" cy="{START_Y - 10}" r="6" fill="none" stroke="black" stroke-width="2"/>\n'
        else:
            # Para notas individuais (não parte de uma barra), desenhar círculo
            # Se faz parte de uma barra, não desenhar círculo (a barra já representa)
            if fret in fret_groups and len(fret_groups[fret]) > 1:
                # Parte de uma barra, não desenhar círculo
                pass
            else:
                # Nota isolada, desenhar círculo
                y = START_Y + NUT_HEIGHT + (fret - 0.5) * FRET_HEIGHT
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
        start_fret = chord_data.get('start_fret', 0)
        svg_content = create_chord_svg(chord_name, chord_data['fingers'], start_fret)
        output_file = output_dir / chord_data['filename']

        with open(output_file, 'w') as f:
            f.write(svg_content)

        print(f'✓ Generated: {output_file}')

    print(f'\n✨ Todos os diagramas foram gerados com sucesso!')
    print(f'📁 Localização: {output_dir.absolute()}')


if __name__ == '__main__':
    main()
