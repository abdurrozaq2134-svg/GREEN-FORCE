@php
    $title = $headerTitle ?? 'Dashboard';
    $badge = $headerBadge ?? 'OPERATOR';
    $subtitle = $headerSubtitle ?? '';
@endphp

<header class="main-header fade-up">
    <div class="main-header__title-group">
        <div class="main-header__title-row">
            <h1 class="main-header__title">{{ $title }}</h1>
            <span class="badge">{{ $badge }}</span>
        </div>
        @if($subtitle)
            <p class="main-header__subtitle">{{ $subtitle }}</p>
        @endif
    </div>

    <div class="live-indicator">
        <span class="live-indicator__dot"></span>
        powered by green force
    </div>
</header>