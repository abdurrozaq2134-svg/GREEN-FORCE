{{-- Pengaturan — 4 tab client-side: Profil, Keamanan, Notifikasi, Langganan --}}
@extends('layouts.dashboard')

@section('title', 'Pengaturan')

@section('content')
    @include('components.header', [
        'headerTitle' => 'Pengaturan',
        'headerBadge' => 'OPERATOR',
        'headerSubtitle' => 'Kelola profil, keamanan, dan preferensi akunmu.',
    ])

    <div class="settings-layout fade-up">
        {{-- Tab nav (switch via resources/js/dashboard.js) --}}
        <nav class="settings-nav" aria-label="Tab pengaturan">
            <button type="button" class="settings-nav__item is-active" data-settings-tab="profil">Profil</button>
            <button type="button" class="settings-nav__item" data-settings-tab="keamanan">Keamanan</button>
            <button type="button" class="settings-nav__item" data-settings-tab="notifikasi">Notifikasi</button>
        </nav>

        <div class="settings-main">

            {{-- ============ TAB 1: PROFIL ============ --}}
            <div data-settings-panel="profil" class="settings-panel is-active">
                @include('dashboard.settings.profil')
            </div>

            {{-- ============ TAB 2: KEAMANAN ============ --}}
            <div data-settings-panel="keamanan" class="settings-panel">
                @include('dashboard.settings.keamanan')
            </div>

            {{-- ============ TAB 3: NOTIFIKASI ============ --}}
            <div data-settings-panel="notifikasi" class="settings-panel">
                @include('dashboard.settings.notifikasi')
            </div>

        </div>
    </div>
@endsection