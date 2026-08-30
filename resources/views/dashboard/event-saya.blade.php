{{-- Event Saya — daftar semua event milik user --}}
@extends('layouts.dashboard')

@section('title', 'Event Saya')

@section('content')
    @include('components.header', [
        'headerTitle' => 'Event Saya',
        'headerBadge' => 'OPERATOR',
        'headerSubtitle' => $pages->count() . ' event total · ' . $pages->where('is_published', true)->count() . ' published',
    ])

    <div class="layout">
        <div class="layout__left">

            {{-- Toolbar: cari + filter + CTA (3 bar terpisah) --}}
            <section class="toolbar fade-up" aria-label="Pencarian dan filter">
                <div class="toolbar__search">
                    <svg class="toolbar__search-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="text" id="event-search" class="input" placeholder="Cari nama event" autocomplete="off">
                </div>
                <div class="toolbar__filter">
                    <select id="event-status-filter" class="select" aria-label="Filter status">
                        <option value="all">Semua status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <a href="{{ route('builder.create') }}" class="btn btn--outline toolbar__cta">+ Buat event baru</a>
            </section>

            @if($pages->count())
                {{-- Form hapus massal sengaja dibiarkan kosong: checkbox di dalam
                     tabel terhubung lewat atribut form="bulk-delete-form" supaya
                     tidak bikin <form> bersarang dengan tombol hapus per baris. --}}
                <form id="bulk-delete-form" action="{{ route('events.bulkDestroy') }}" method="POST">
                    @csrf
                </form>

                {{-- Bar aksi massal, muncul begitu ada baris yang dicentang --}}
                <div class="bulk-bar fade-up" id="bulk-bar" role="region" aria-label="Aksi massal" hidden>
                    <span class="bulk-bar__count">
                        <strong id="bulk-count">0</strong> event terpilih
                    </span>
                    <div class="bulk-bar__actions">
                        <button type="button" class="btn btn--outline bulk-bar__btn" id="bulk-clear">
                            Batal pilih
                        </button>
                        <button type="submit" form="bulk-delete-form" class="btn btn--danger bulk-bar__btn" id="bulk-delete-btn">
                            Hapus terpilih
                        </button>
                    </div>
                </div>
            @endif

            {{-- Tabel event --}}
            <section class="table card fade-up" aria-label="Daftar event">
                <div class="table__header">
                    <span class="table__cell--check">
                        @if($pages->count())
                            <input type="checkbox"
                                   class="table__checkbox"
                                   id="select-all-events"
                                   aria-label="Pilih semua event yang tampil">
                        @endif
                    </span>
                    <span>Nama event</span>
                    <span>Status</span>
                    <span>Diedit</span>
                    <span>Aksi</span>
                </div>

                @forelse($pages as $page)
                    <div class="table__row"
                         data-event-row
                         data-event-name="{{ $page->title }}"
                         data-event-status="{{ $page->is_published ? 'published' : 'draft' }}">
                        <div class="table__cell table__cell--check">
                            <input type="checkbox"
                                   class="table__checkbox"
                                   form="bulk-delete-form"
                                   name="ids[]"
                                   value="{{ $page->id }}"
                                   data-event-checkbox
                                   aria-label="Pilih event {{ $page->title }}">
                        </div>
                        <div class="table__cell table__cell--name">
                            <div class="table__thumb" aria-hidden="true">{{ mb_strtoupper(mb_substr($page->title, 0, 1)) }}</div>
                            <span class="table__name-text">{{ $page->title }}</span>
                        </div>
                        <div class="table__cell table__cell--status">
                            <span class="badge {{ $page->is_published ? 'badge--success' : 'badge--draft' }}">
                                {{ $page->is_published ? 'Published' : 'Draft' }}
                            </span>
                        </div>
                        <div class="table__cell table__cell--meta">{{ $page->updated_at->diffForHumans() }}</div>
                        <div class="table__cell table__cell--actions">
                            <div class="table__actions">
                                <a href="{{ route('builder.edit', $page) }}" class="table__action-btn">Edit</a>
                                <button type="button" class="table__action-btn" title="Duplikat (belum tersedia)" disabled>Duplikat</button>
                                @if($page->slug && $page->is_published)
                                    @php($eventUrls = $page->publicUrls())
                                    <a href="{{ $eventUrls['subdomain'] ?? $eventUrls['path'] }}" target="_blank" rel="noopener" class="table__action-btn">Lihat</a>
                                @endif
                                <form action="{{ route('events.destroy', $page) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus event ini?');" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="table__action-btn table__action-btn--danger" title="Hapus">Hapus</button>
                                </form>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="empty-state">
                        <svg class="empty-state__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"/>
                        </svg>
                        <h3 class="empty-state__title">Belum ada event</h3>
                        <p class="empty-state__desc">Buat event pertamamu untuk mulai membangun landing page.</p>
                        <a href="{{ route('builder.create') }}" class="btn btn--primary" style="margin: 0 auto;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v16m8-8H4"/></svg>
                            Buat Event Pertama
                        </a>
                    </div>
                @endforelse

                {{-- Muncul kalau filter/search tidak menemukan apa pun --}}
                <div id="event-filter-empty" class="empty-state" hidden>
                    <svg class="empty-state__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"/>
                    </svg>
                    <h3 class="empty-state__title">Tidak ditemukan</h3>
                    <p class="empty-state__desc">Tidak ada event yang cocok dengan pencarian/filter.</p>
                </div>
            </section>

        </div>

        @include('components.diagnostics')
    </div>

    @if(session('success'))
        <script>
            window.addEventListener('DOMContentLoaded', function () {
                if (window.showToast) {
                    window.showToast(@json(session('success')), 'success');
                }
            });
        </script>
    @endif
@endsection
