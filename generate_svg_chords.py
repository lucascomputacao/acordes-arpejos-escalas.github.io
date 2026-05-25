#!/usr/bin/env python3
"""
Gerador de diagramas de acordes em SVG para guitarra.
Cria diagramas visuais parecidos com o padrão do livro Nelson Faria.
"""

import os
from pathlib import Path

# Definição dos acordes
CHORDS = {
    'C Major (Dó maior)': {
        'filename': 'triade-C.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 2),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Minor (Dó menor)': {
        'filename': 'triade-C-menor.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 2),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Augmented (Dó aumentado)': {
        'filename': 'triade-C-aumentado.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 2),
            (4, 3),
            (5, 3),
            (6, 'x'),
        ]
    },
    'C Diminished (Dó diminuto)': {
        'filename': 'triade-C-diminuto.svg',
        'fingers': [
            (1, 'x'),
            (2, 'x'),
            (3, 1),
            (4, 1),
            (5, 3),
            (6, 'x'),
        ]
    }
}

DIAGRAM_WIDTH = 500
DIAGRAM_HEIGHT = 200
FRET_COUNT = 4
FRET_HEIGHT = 40
STRING_SPACING = (DIAGRAM_HEIGHT - 80) / 5
START_X = 60
START_Y = 30
NUT_HEIGHT = 6
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
            svg += f'    <circle cx="{x}" cy="{y}" r="10" fill="#2196F3" stroke="black" stroke-width="2"/>\n'
            svg += f'    <text x="{x}" y="{y}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="bold" fill="white">{fret}</text>\n'

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
