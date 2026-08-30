{{-- DANISH — Sistem Komando: Dashboard Builder Event --}}
@extends('layouts.dashboard')

@section('title', 'Dashboard')

@section('content')
    @include('components.header', [
        'headerTitle' => 'Dashboard Eventmu',
        'headerBadge' => 'OPERATOR',
        'headerSubtitle' => 'Kelola event landing page bertema hutan hujan.',
    ])

    <div class="layout">
        {{-- ---------- Kolom kiri ---------- --}}
        <div class="layout__left">

            {{-- Ikhtisar / Statistik --}}
            <section class="summary-card card fade-up" aria-labelledby="summary-heading">
                <div class="summary-card__header">
                    <p class="summary-card__label">IKHTISAR EVENT ANDA</p>
                    <h2 class="summary-card__heading" id="summary-heading">
                        {{ $pages->count() }} Event Tersimpan
                    </h2>
                    <p class="summary-card__desc">
                        Kelola, edit, dan publikasikan event landing page bertema hutan hujan.
                    </p>
                </div>

                <div class="summary-stats">
                    <div class="stat-card">
                        <div class="stat-card__header">
                            <span class="stat-card__label">Total Event</span>
                            <span class="stat-card__dot"></span>
                        </div>
                        <div class="stat-card__value-row">
                            <span class="stat-card__value">{{ $pages->count() }}</span>
                            <span class="stat-card__unit">Event</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__header">
                            <span class="stat-card__label">Dipublikasikan</span>
                            <span class="stat-card__dot"></span>
                        </div>
                        <div class="stat-card__value-row">
                            <span class="stat-card__value">{{ $pages->where('is_published', true)->count() }}</span>
                            <span class="stat-card__unit">Event</span>
                        </div>
                    </div>
                </div>
            </section>

            {{-- Modul / Aksi Cepat --}}
            <section class="modules fade-up" aria-label="Modul tindakan">
                <a href="{{ route('builder.create') }}" class="module-card module-card--featured card">
                    <div class="module-card__top">
                        <span class="module-card__icon">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
                        </span>
                    </div>
                    <h3 class="module-card__title">Buat Event Baru</h3>
                    <p class="module-card__desc">Inisiasi event landing page baru bertema hutan hujan dengan template siap pakai.</p>
                    <span class="module-card__footer">
                        Buka Builder
                        <svg class="module-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </span>
                </a>

                @if($pages->isNotEmpty())
                    <a href="{{ route('events.index') }}" class="module-card card">
                        <div class="module-card__top">
                            <span class="module-card__icon">
                                <svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
                            </span>
                            <span class="module-card__badge">{{ $pages->count() }} Aktif</span>
                        </div>
                        <h3 class="module-card__title">Proyek Saya</h3>
                        <p class="module-card__desc">Kelola, edit, dan publikasikan event yang sudah dibuat.</p>
                        <span class="module-card__footer">
                            Buka Daftar
                            <svg class="module-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                        </span>
                    </a>
                @endif
            </section>

            {{-- Daftar Event (kosong state) --}}
            @if($pages->isEmpty())
                <div class="empty-state card fade-up">
                    <svg class="empty-state__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"/>
                    </svg>
                    <h3 class="empty-state__title">Belum ada event</h3>
                    <p class="empty-state__desc">Klik "Buat Event Baru" untuk memulai.</p>
                    <a href="{{ route('builder.create') }}" class="btn btn--primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v16m8-8H4"/></svg>
                        Buat Event Pertama
                    </a>
                </div>
            @endif

        </div>

        {{-- ---------- Panel diagnostik (kanan) ---------- --}}
        @include('components.diagnostics')
    </div>
@endsection