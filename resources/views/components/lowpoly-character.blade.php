@php
    $darkGreen = '#12372A';
    $forestGreen = '#436850';
    $sageGreen = '#93c598';
    $mintGreen = '#4ade80';
    $paleSkin = '#dcfce7';
    $paleSkinDark = '#bbf7d0';
    $accentGreen = '#22c55e';
    $darkAccent = '#16a34a';
@endphp

{{-- Low-poly geometric character illustration --}}
<svg
    viewBox="0 0 500 700"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="lowpoly-character"
>
    <defs>
        <linearGradient id="grad-jacket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="{{ $forestGreen }}" />
            <stop offset="100%" stop-color="{{ $darkGreen }}" />
        </linearGradient>
        <linearGradient id="grad-hair" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{{ $mintGreen }}" />
            <stop offset="100%" stop-color="{{ $darkAccent }}" />
        </linearGradient>
        <linearGradient id="grad-beanie" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1a4d1a" />
            <stop offset="100%" stop-color="{{ $darkGreen }}" />
        </linearGradient>
    </defs>

    {{-- ===== Body / Jacket (low-poly polygons) ===== --}}
    <polygon points="220,300 280,310 270,470 230,480" fill="url(#grad-jacket)" />
    <polygon points="230,440 270,450 250,560 200,540" fill="{{ $darkGreen }}" />
    <polygon points="250,440 300,480 250,520 220,470" fill="{{ $darkGreen }}" />

    {{-- Jacket folds / details --}}
    <polygon points="225,460 245,470 245,500 215,490" fill="{{ $forestGreen }}" />
    <polygon points="260,470 278,485 270,510 245,495" fill="{{ $forestGreen }}" />

    {{-- Head base (pale) — low-poly triangles --}}
    <polygon points="200,260 240,255 220,310" fill="{{ $paleSkin }}" />
    <polygon points="240,255 260,265 220,310" fill="{{ $paleSkinDark }}" />
    <polygon points="220,260 260,265 260,295 220,295" fill="{{ $paleSkin }}" />
    <polygon points="260,265 280,290 260,295" fill="{{ $paleSkinDark }}" />
    <polygon points="200,260 220,310 200,295" fill="{{ $paleSkinDark }}" />

    {{-- Ear (simple triangle) --}}
    <polygon points="205,275 220,280 210,295" fill="{{ $paleSkinDark }}" />

    {{-- ===== Beanie (dark green cap) ===== --}}
    <polygon points="190,240 270,235 260,265 200,270" fill="url(#grad-beanie)" />
    <polygon points="200,270 260,265 250,285 210,290" fill="{{ $darkGreen }}" />

    {{-- ===== Spiky hair (behind/around beanie) ===== --}}
    <polygon points="200,225 215,210 230,230" fill="url(#grad-hair)" />
    <polygon points="230,215 245,205 260,225" fill="url(#grad-hair)" />
    <polygon points="265,215 275,200 285,220" fill="url(#grad-hair)" />
    <polygon points="185,235 175,215 195,225" fill="url(#grad-hair)" />
    <polygon points="170,245 155,225 180,240" fill="url(#grad-hair)" />

    {{-- ===== Eyes (angular, narrow) ===== --}}
    <polygon points="218,292 232,290 236,298 222,300" fill="{{ $darkGreen }}" />
    <polygon points="242,292 256,290 260,298 246,300" fill="{{ $darkGreen }}" />

    {{-- Eye highlights (small) --}}
    <polygon points="224,294 228,293 230,296" fill="{{ $paleSkin }}" />
    <polygon points="248,294 252,293 254,296" fill="{{ $paleSkin }}" />

    {{-- ===== Mouth (subtle line) ===== --}}
    <path d="M230,305 Q240,308 250,305" stroke="{{ $darkAccent }}" stroke-width="1.5" fill="none" stroke-linecap="round" />

    {{-- Neck ===== --}}
    <polygon points="245,310 255,310 255,330 245,330" fill="{{ $paleSkinDark }}" />

    {{-- ===== Arms holding the lizard ===== --}}
    {{-- Left arm (holding lizard) --}}
    <polygon points="200,330 215,345 210,380 195,370" fill="url(#grad-jacket)" />
    <polygon points="215,345 235,360 210,385 195,375" fill="{{ $darkGreen }}" />
    {{-- Right arm --}}
    <polygon points="285,330 300,340 295,375 280,370" fill="{{ $forestGreen }}" />
    <polygon points="300,340 312,355 295,380 285,375" fill="{{ $darkGreen }}" />

    {{-- ===== Hands (pale) ===== --}}
    <polygon points="198,368 210,375 208,383 196,378" fill="{{ $paleSkin }}" />
    <polygon points="282,370 295,378 293,388 280,380" fill="{{ $paleSkin }}" />

    {{-- ===== Lizard / Dragon (green, low-poly, held in left hand) ===== --}}
    <g transform="translate(175, 388)">
        {{-- Body --}}
        <polygon points="20,8 35,10 40,22 25,25" fill="url(#grad-hair)" />
        <polygon points="25,25 40,22 30,30 15,28" fill="{{ $mintGreen }}" />
        {{-- Tail --}}
        <polygon points="15,28 5,35 10,22 20,25" fill="{{ $darkAccent }}" />
        {{-- Head --}}
        <polygon points="40,12 55,10 58,18 42,20" fill="url(#grad-hair)" />
        {{-- Horns / spikes --}}
        <polygon points="48,6 52,2 56,8" fill="{{ $darkGreen }}" />
        <polygon points="50,6 54,1 58,8" fill="{{ $darkGreen }}" />
        {{-- Eye (small dot) --}}
        <polygon points="50,15 53,14 54,17 51,18" fill="{{ $darkGreen }}" />
    </g>

    {{-- ===== Jacket details: collar ===== --}}
    <polygon points="240,310 260,310 270,325 230,325" fill="{{ $darkGreen }}" />
</svg>
