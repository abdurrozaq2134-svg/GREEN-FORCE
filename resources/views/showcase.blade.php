<!DOCTYPE html>
<html lang="id" class="no-js">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#060a06">
    <meta name="description"
        content="Pengalaman gulir imersif Green Force: inti 3D yang pecah dan menyatu kembali mengikuti posisi scroll, dirender langsung dengan WebGL2.">

    <title>Orbit — Green Force</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    @vite(['resources/css/showcase.css', 'resources/js/showcase.js'])

    <script>
        document.documentElement.classList.replace('no-js', 'js');
    </script>
</head>

<body class="showcase-body">
    <a class="sc-skip" href="#konten">Lewati ke konten</a>

    <a class="sc-brand" href="{{ route('landing') }}">
        <span class="sc-brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
        </span>
        <span>Green Force</span>
    </a>

    {{-- Panggung WebGL: fixed di belakang seluruh konten, digerakkan oleh posisi scroll. --}}
    <div class="sc-stage" data-showcase-stage>
        <canvas data-showcase-canvas role="img"
            aria-label="Visual 3D: inti berbentuk bola bersegi yang pecah menjadi kepingan lalu menyatu kembali seiring halaman digulir, dikelilingi pecahan yang mengorbit di atas lantai grid bercahaya."></canvas>
    </div>

    <nav class="sc-rail" data-act-rail aria-label="Navigasi babak">
        <div class="sc-rail__track">
            <span class="sc-rail__bar" data-act-bar></span>
        </div>

        @foreach ([
            'Pembuka',
            'Kanvas',
            'Modular',
            'Menyatu',
            'Mulai',
        ] as $index => $actName)
            <button type="button" class="sc-rail__dot @if ($index === 0) is-active @endif"
                data-act-index="{{ $index }}" data-act-name="{{ $actName }}"
                aria-current="{{ $index === 0 ? 'true' : 'false' }}">
                <span class="sc-sr-only">Babak {{ $index + 1 }}: {{ $actName }}</span>
            </button>
        @endforeach

        <p class="sc-rail__label" data-act-label>Pembuka</p>
    </nav>

    <button type="button" class="sc-motion" data-motion-toggle aria-pressed="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span data-motion-label>Animasi aktif</span>
    </button>

    <main id="konten" class="sc-content">
        {{-- BABAK 1 — pembuka, kamera jauh, inti utuh --}}
        <section class="sc-act sc-act--start" data-act-section id="babak-1">
            <div class="sc-shell">
                <div class="sc-panel sc-panel--wide">
                    <p class="sc-eyebrow" data-reveal style="--reveal-index: 0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" />
                            <path d="M20 3v4" />
                            <path d="M22 5h-4" />
                        </svg>
                        Green Force · Immersive
                    </p>

                    <h1 class="sc-title sc-title--hero" data-reveal style="--reveal-index: 1">
                        Halaman event yang <em>terasa hidup</em>
                    </h1>

                    <p class="sc-lead" data-reveal style="--reveal-index: 2">
                        Gulir ke bawah. Posisi scroll-mu yang mengemudikan kamera 3D di belakang teks ini —
                        inti bersegi, pecahan yang mengorbit, dan lantai grid, semuanya dirender langsung
                        di GPU lewat WebGL2.
                    </p>

                    <div class="sc-actions" data-reveal style="--reveal-index: 3">
                        @auth
                            <a class="sc-btn sc-btn--primary" href="{{ route('dashboard') }}">
                                Buka dashboard
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        @else
                            <a class="sc-btn sc-btn--primary" href="{{ route('landing') }}">
                                Mulai bangun event
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        @endauth

                        <a class="sc-btn sc-btn--ghost" href="#babak-2">Lihat cara kerjanya</a>
                    </div>

                    <p class="sc-cue" data-reveal style="--reveal-index: 4">Gulir untuk memulai</p>
                </div>
            </div>
        </section>

        {{-- BABAK 2 — kamera mengayun ke samping --}}
        <section class="sc-act sc-act--end" data-act-section id="babak-2">
            <div class="sc-shell">
                <div class="sc-panel">
                    <p class="sc-eyebrow" data-reveal style="--reveal-index: 0">Kanvas</p>

                    <h2 class="sc-heading" data-reveal style="--reveal-index: 1">
                        Susun panggungnya, bukan kodenya
                    </h2>

                    <p class="sc-lead" data-reveal style="--reveal-index: 2">
                        Kamera mengayun mengelilingi inti saat kamu melewati babak ini. Cara yang sama
                        dipakai builder Green Force: kamu menggeser elemen, sistem yang mengurus posisi,
                        grid, dan responsifnya.
                    </p>

                    <ul class="sc-list">
                        <li data-reveal style="--reveal-index: 3">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="m9 9 5 12 1.774-5.226L21 14 9 9z" />
                                <path d="M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656-2.12 2.122" />
                            </svg>
                            <div>
                                <strong>Tarik dan lepas presisi</strong>
                                <span>Setiap objek punya koordinat sendiri, bebas ditumpuk dan diputar.</span>
                            </div>
                        </li>
                        <li data-reveal style="--reveal-index: 4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                                <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
                            </svg>
                            <div>
                                <strong>Lapisan yang jelas</strong>
                                <span>Latar, konten, dan aksi hidup di lapisan terpisah — tidak saling menimpa.</span>
                            </div>
                        </li>
                        <li data-reveal style="--reveal-index: 5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                            </svg>
                            <div>
                                <strong>Pratinjau seketika</strong>
                                <span>Apa yang kamu susun persis seperti yang dilihat peserta.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {{-- BABAK 3 — puncak gulir: inti pecah, kamera menyelam ke dalam --}}
        <section class="sc-act sc-act--start" data-act-section id="babak-3">
            <div class="sc-shell">
                <div class="sc-panel sc-panel--wide">
                    <p class="sc-eyebrow" data-reveal style="--reveal-index: 0">Modular</p>

                    <h2 class="sc-heading" data-reveal style="--reveal-index: 1">
                        Setiap bidang berdiri sendiri
                    </h2>

                    <p class="sc-lead" data-reveal style="--reveal-index: 2">
                        Di titik ini kamera menyelam ke jantung objek dan intinya pecah. Tidak ada satu pun
                        posisi dihitung di CPU: seluruh ledakan terjadi di vertex shader, satu putaran acak
                        per bidang. Di perangkat kelas bawah jumlah bidang dan pecahan otomatis diturunkan.
                    </p>

                    <dl class="sc-stats">
                        <div class="sc-stat" data-reveal style="--reveal-index: 3">
                            <dt>Bidang inti</dt>
                            <dd>1.280</dd>
                        </div>
                        <div class="sc-stat" data-reveal style="--reveal-index: 4">
                            <dt>Pecahan orbit</dt>
                            <dd>96</dd>
                        </div>
                        <div class="sc-stat" data-reveal style="--reveal-index: 5">
                            <dt>Draw call</dt>
                            <dd>6</dd>
                        </div>
                        <div class="sc-stat" data-reveal style="--reveal-index: 6">
                            <dt>Library 3D</dt>
                            <dd>0</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>

        {{-- BABAK 4 — pecahan menyatu, kamera menjauh ke sisi kiri --}}
        <section class="sc-act sc-act--end" data-act-section id="babak-4">
            <div class="sc-shell">
                <div class="sc-panel">
                    <p class="sc-eyebrow" data-reveal style="--reveal-index: 0">Menyatu</p>

                    <h2 class="sc-heading" data-reveal style="--reveal-index: 1">
                        Semuanya kembali ke satu tempat
                    </h2>

                    <p class="sc-lead" data-reveal style="--reveal-index: 2">
                        Pecahan yang tadi berhamburan ditarik kembali ke satu cangkang. Begitu juga data
                        event-mu — pendaftaran, pembayaran, dan rekap peserta bermuara di satu dashboard.
                    </p>

                    <ul class="sc-list">
                        <li data-reveal style="--reveal-index: 3">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <div>
                                <strong>Formulir peserta</strong>
                                <span>Field dinamis, langsung tersimpan dan bisa diekspor.</span>
                            </div>
                        </li>
                        <li data-reveal style="--reveal-index: 4">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                            <div>
                                <strong>Konfirmasi pembayaran</strong>
                                <span>Status tiap peserta terlihat dan bisa diverifikasi satu per satu.</span>
                            </div>
                        </li>
                        <li data-reveal style="--reveal-index: 5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                            <div>
                                <strong>Tautan admin terpisah</strong>
                                <span>Panitia dapat akses khusus tanpa membuka halaman publik.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {{-- BABAK 5 — penutup, kamera mundur lebar --}}
        <section class="sc-act sc-act--center" data-act-section id="babak-5">
            <div class="sc-shell">
                <div class="sc-panel sc-panel--wide">
                    <p class="sc-eyebrow" data-reveal style="--reveal-index: 0">Mulai</p>

                    <h2 class="sc-title" data-reveal style="--reveal-index: 1">
                        Giliran <em>event-mu</em>
                    </h2>

                    <p class="sc-lead" data-reveal style="--reveal-index: 2">
                        Buat halaman pertamamu dalam hitungan menit — lalu bagikan tautannya.
                    </p>

                    <div class="sc-actions" data-reveal style="--reveal-index: 3">
                        @auth
                            <a class="sc-btn sc-btn--primary" href="{{ route('builder.create') }}">
                                Buat event baru
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        @else
                            <a class="sc-btn sc-btn--primary" href="{{ route('landing') }}">
                                Mulai sekarang
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        @endauth

                        <a class="sc-btn sc-btn--ghost" href="#babak-1">Ulang dari awal</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="sc-footer">
        <div class="sc-shell">
            <p>Dirender dengan WebGL2 — tanpa library 3D pihak ketiga.</p>
            <p><a href="{{ route('landing') }}">Kembali ke Green Force</a></p>
        </div>
    </footer>
</body>

</html>
