@php
    $dashboardUser = auth()->user();
    $userInitial = $dashboardUser ? mb_strtoupper(mb_substr(trim($dashboardUser->name), 0, 1)) : '?';
@endphp

<aside class="sidebar" aria-label="Navigasi utama dashboard">
    <div class="sidebar__top">
        <div class="sidebar__brand">
            <div class="sidebar__avatar" aria-hidden="true">{{ $userInitial }}</div>
            <div class="sidebar__user-info">
                <div class="sidebar__user-name">{{ $dashboardUser->name ?? 'Guest' }}</div>
                <div class="sidebar__user-role">SISTEM KOMANDO</div>
            </div>
        </div>

        <nav class="sidebar__nav" aria-label="Menu dashboard">
            <a href="{{ route('dashboard') }}"
               class="nav-item {{ request()->routeIs('dashboard') ? 'is-active' : '' }}">
                <svg class="nav-item__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="9" rx="1"/>
                    <rect x="14" y="3" width="7" height="5" rx="1"/>
                    <rect x="14" y="12" width="7" height="9" rx="1"/>
                    <rect x="3" y="16" width="7" height="5" rx="1"/>
                </svg>
                Dasbor Utama
            </a>
            <a href="{{ route('events.index') }}"
               class="nav-item {{ request()->routeIs('events.index') ? 'is-active' : '' }}">
                <svg class="nav-item__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
                </svg>
                Event Saya
            </a>
        </nav>
    </div>

    <div class="sidebar__footer">
        <div class="terminal-status">
            <div class="terminal-status__header">
                <span class="terminal-status__label">TERMINAL STATUS</span>
                <span class="terminal-status__badge">ONLINE</span>
            </div>
            <span class="terminal-status__clock" id="live-clock">--:--:--</span>
            <span class="terminal-status__node">Node: Jakarta-Sektor-4</span>
        </div>

        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="btn btn--danger sidebar__logout">Keluar</button>
        </form>

        <div class="sidebar__powered">
            <span class="sidebar__powered-label">POWERED BY</span>
            <span class="sidebar__powered-value">GREEN FORCE.</span>
        </div>
    </div>
</aside>