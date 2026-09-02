<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $page->title ?? 'Event' }} — Event Page</title>
    {{--
        Halaman publik ini murni vanilla JS (skrip di bawah), bukan React --
        sebelumnya ikut memuat @vite(['resources/js/builder.jsx']) (bundle
        editor React 266KB+ + CSS-nya). Karena elemen di sini pun dikasih
        class "canvas-element" yang sama seperti kanvas builder, CSS bundle
        itu ikut kepakai di sini: cursor:move di semua elemen dan teks jadi
        tidak bisa di-select sama sekali oleh pengunjung -- bukan cuma boros,
        tapi bikin halaman publik kelihatan/berperilaku seperti mode edit.
    --}}
    <style>
        /* Public page responsive styles */
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f3f4f6; min-height: 100vh; }
        .public-page { position: relative; width: 100%; max-width: 1200px; margin: 0 auto; background: #fff; min-height: 100vh; box-shadow: 0 4px 12px rgba(0,0,0,.08); padding: 32px 24px; }

        /* Section width presets (per-container) */
        .section-inner { width: 100%; margin-left: auto; margin-right: auto; }
        
        /* Text responsive */
        .el-text { font-size: clamp(14px, 2.5vw, 32px); color: inherit; font-weight: inherit; line-height: 1.5; word-break: break-word; overflow-wrap: anywhere; max-width: 100%; }
        
        /* Images responsive */
        .el-image { width: 100%; height: auto; max-width: 100%; object-fit: cover; border-radius: 4px; }
        
        /* Video responsive */
        .el-video { width: 100%; height: auto; aspect-ratio: 16 / 9; }
        .el-video iframe { width: 100%; height: 100%; border: none; border-radius: 4px; }
        
        /* Buttons responsive */
        .el-button { display: inline-flex; align-items: center; justify-content: center; border: none; border-radius: 8px; cursor: pointer; font-size: clamp(13px, 1.8vw, 16px); font-weight: 500; padding: 0.75rem 1.5rem; min-height: 44px; transition: opacity .15s; white-space: nowrap; }
        .el-button:hover { opacity: .92; }
        .el-submit, .el-oke, .el-cancel, .el-rsvp-submit { width: 100%; }
        
        /* Shapes responsive */
        .el-shape { width: 100%; height: 100%; min-width: 40px; min-height: 40px; border-radius: inherit; }
        .el-shape svg { display: block; }

        /* Links */
        .el-link { cursor: pointer; }
        .el-link:hover { opacity: .85; }
        
        /* Navbar responsive */
        .el-navbar { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; max-width: 100%; box-sizing: border-box; padding: 0 24px; border-bottom: 1px solid #e5e7eb; }
        .navbar-brand { font-size: clamp(18px, 3vw, 1.25rem); font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .navbar-menu { display: flex; align-items: center; gap: 24px; min-width: 0; }
        .nb-link { text-decoration: none; font-size: clamp(13px, 1.8vw, 14px); font-weight: 500; white-space: nowrap; transition: opacity .15s; }
        .nb-link:hover { opacity: .7; }
        .navbar-auth { display: flex; align-items: center; gap: 12px; }
        .nb-auth-btn { padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; background: transparent; color: inherit; border: 1px solid currentColor; white-space: nowrap; }
        .nb-auth-btn.primary { border: none; background: #4f46e5; color: #fff; }
        .nb-burger { display: none; flex-direction: column; justify-content: center; gap: 5px; padding: 8px; margin-left: auto; background: transparent; border: none; cursor: pointer; flex-shrink: 0; }
        .nb-burger span { display: block; width: 24px; height: 2px; background: currentColor; border-radius: 1px; transition: transform .2s ease, opacity .2s ease; }
        .el-navbar.nb-open .nb-burger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .el-navbar.nb-open .nb-burger span:nth-child(2) { opacity: 0; }
        .el-navbar.nb-open .nb-burger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .nb-dropdown { display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 60; flex-direction: column; padding: 8px 16px 16px; background: inherit; border-bottom: 1px solid #e5e7eb; box-shadow: 0 12px 24px rgba(0,0,0,.12); box-sizing: border-box; }
        .nb-dd-link { padding: 12px 4px; font-size: 15px; font-weight: 500; text-decoration: none; }
        .nb-dd-link:hover { opacity: .7; }
        .nb-dd-link + .nb-dd-link { border-top: 1px solid #f3f4f6; }
        .nb-dd-auth { margin-top: 10px; padding-top: 12px; border-top: 1px solid #e5e7eb; display: flex; flex-direction: column; gap: 8px; }
        .nb-dd-auth .nb-auth-btn { width: 100%; padding: 10px 16px; font-size: 14px; font-weight: 600; }

        /* Tablet & Mobile: menu collapse ke hamburger */
        @media (max-width: 1024px) {
            .el-navbar .navbar-menu,
            .el-navbar > .navbar-auth { display: none !important; }
            .el-navbar .nb-burger { display: flex !important; }
            .el-navbar.nb-open .nb-dropdown { display: flex; }
        }

        /* Event components responsive */
        .el-countdown { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .countdown-label { font-size: clamp(18px, 3vw, 28px); font-weight: 700; line-height: 1.3; }
        .countdown-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; }
        .countdown-unit { display: flex; flex-direction: column; align-items: center; min-width: 60px; }
        .countdown-value { font-size: clamp(24px, 5vw, 48px); font-weight: 700; }
        .countdown-unit-label { font-size: clamp(12px, 2vw, 14px); color: #6b7280; text-transform: uppercase; letter-spacing: .05em; }
        
        .el-rsvp { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }
        .el-rsvp h4 { font-size: clamp(18px, 3vw, 28px); font-weight: 700; line-height: 1.3; margin: 0; }
        .el-rsvp-sub { font-size: clamp(14px, 2.5vw, 18px); color: #6b7280; margin: 0; line-height: 1.5; }
        .el-rsvp-field { font-size: clamp(13px, 2.5vw, 16px); color: #374151; line-height: 1.5; }
        .el-rsvp-submit { font-size: clamp(13px, 1.8vw, 16px); padding: 0.75rem 1.5rem; min-height: 44px; border-radius: 8px; color: #fff; font-weight: 500; text-align: center; }
        
        .el-schedule { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }
        .el-schedule h4 { font-size: clamp(18px, 3vw, 28px); font-weight: 700; line-height: 1.3; margin: 0; }
        .schedule-row { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .schedule-time { font-size: clamp(13px, 2.5vw, 16px); font-weight: 600; color: #4f46e5; min-width: 70px; line-height: 1.5; }
        .schedule-desc { font-size: clamp(13px, 2.5vw, 16px); color: #374151; line-height: 1.5; }
        
        .el-ticket { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }
        .el-ticket h4 { font-size: clamp(18px, 3vw, 28px); font-weight: 700; line-height: 1.3; margin: 0; }
        .ticket-tier { padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; width: 100%; }
        .ticket-tier-name { font-size: clamp(16px, 2.5vw, 22px); font-weight: 700; line-height: 1.3; }
        .ticket-tier-price { font-size: clamp(18px, 3vw, 24px); font-weight: 700; color: #10b981; margin-top: 0.5rem; }
        .ticket-tier-quota { font-size: clamp(12px, 2vw, 14px); color: #9ca3af; margin-top: 0.25rem; }
        
        .el-map { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-size: clamp(13px, 2.5vw, 16px); color: #374151; }
        
        .el-poll { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }
        .poll-question { font-size: clamp(16px, 2.5vw, 22px); font-weight: 700; line-height: 1.3; }
        .poll-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .poll-option { display: flex; align-items: center; gap: 0.75rem; width: 100%; }
        .poll-option input { width: 20px; height: 20px; accent-color: #4f46e5; }
        .poll-option label { font-size: clamp(13px, 2.5vw, 16px); color: #374151; line-height: 1.5; cursor: pointer; }
        .poll-results { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem; }
        .poll-result { font-size: clamp(13px, 2.5vw, 16px); color: #6b7280; }
        
        .el-guestbook { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
        .el-guestbook h4 { font-size: clamp(18px, 3vw, 28px); font-weight: 700; line-height: 1.3; margin: 0; }
        .el-guestbook textarea { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: clamp(13px, 2.5vw, 16px); font-family: inherit; box-sizing: border-box; min-height: 100px; resize: vertical; }
        .el-guestbook .el-button { width: 100%; }
        
        .el-feedback { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
        .el-feedback h4 { font-size: clamp(18px, 3vw, 28px); font-weight: 700; line-height: 1.3; margin: 0; }
        .feedback-rating { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
        .feedback-star { display: flex; align-items: center; gap: 0.25rem; cursor: pointer; }
        .feedback-star input { width: 20px; height: 20px; accent-color: #f59e0b; }
        .feedback-star span { font-size: clamp(18px, 3vw, 24px); }
        .el-feedback textarea { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: clamp(13px, 2.5vw, 16px); font-family: inherit; box-sizing: border-box; min-height: 80px; resize: vertical; }
        .el-feedback .el-button { width: 100%; }
        
        .el-sponsor { display: flex; align-items: center; gap: 0.5rem; }
        .el-sponsor a { color: #4f46e5; text-decoration: none; font-weight: 500; font-size: clamp(14px, 2.5vw, 18px); }
        .el-sponsor a:hover { text-decoration: underline; }
        
                /* ===================== KEYFRAMES ANIMASI OBJEK =====================
           Cerminan PERSIS dari blok yang sama di resources/css/builder.css —
           kalau ubah satu, ubah juga yang lain. Durasi/delay/loop tidak
           dibakar di sini, dipasang lewat inline style per objek saat
           trigger-nya jalan (lihat racikApplyAnimStyle() di script bawah). */
        @keyframes racikFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes racikSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes racikSlideDown { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes racikSlideLeft { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes racikSlideRight { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes racikZoom { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }
        @keyframes racikBounce {
          0% { opacity: 0; transform: translateY(-30px); }
          60% { opacity: 1; transform: translateY(8px); }
          80% { transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes racikPop {
          0% { opacity: 0; transform: scale(.5); }
          70% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes racikFlip {
          from { opacity: 0; transform: perspective(400px) rotateX(80deg); }
          to { opacity: 1; transform: perspective(400px) rotateX(0deg); }
        }
        @keyframes racikRotateIn {
          from { opacity: 0; transform: rotate(-35deg) scale(.85); }
          to { opacity: 1; transform: rotate(0) scale(1); }
        }
        @keyframes racikPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes racikShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes racikWobble {
          0%, 100% { transform: rotate(0); }
          15% { transform: rotate(-6deg); }
          30% { transform: rotate(5deg); }
          45% { transform: rotate(-4deg); }
          60% { transform: rotate(3deg); }
          75% { transform: rotate(-2deg); }
        }
        @keyframes racikTada {
          0%, 100% { transform: scale(1) rotate(0); }
          10%, 20% { transform: scale(.9) rotate(-3deg); }
          30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
          40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
        }
        @keyframes racikHeartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          40% { transform: scale(1); }
          60% { transform: scale(1.15); }
        }
        @keyframes racikFlash { 0%, 100% { opacity: 1; } 25%, 75% { opacity: .2; } 50% { opacity: 1; } }
        @keyframes racikFadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes racikSlideOutUp { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-24px); } }
        @keyframes racikSlideOutDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(24px); } }
        @keyframes racikZoomOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(.7); } }
        @keyframes racikShrink { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0); } }

        /* Elemen bermode "masuk" (entrance) disembunyikan sampai animasinya
           benar-benar jalan — "perhatian" dan "keluar" harus tetap kelihatan
           dari awal (animasinya sendiri yang menutup di akhir untuk exit). */
        .canvas-element[data-anim-category="entrance"] { opacity: 0; }
/* Mobile stacking */
        @media (max-width: 767px) {
            .public-page { padding: 24px 16px; min-height: 100vh; }
            .el-button, .el-submit, .el-oke, .el-cancel, .el-rsvp-submit { width: 100%; font-size: 16px; padding: 1rem; }
            .el-text { font-size: clamp(12px, 4vw, 24px); line-height: 1.6; }
            .countdown-grid { gap: 1rem; }
            .countdown-unit { min-width: 55px; }
        }
        
        /* Tablet */
        @media (min-width: 768px) and (max-width: 1023px) {
            .public-page { padding: 32px 24px; }
        }
        
        /* Print */
        @media print {
            body { background: white; }
            .public-page { box-shadow: none; padding: 0; min-height: auto; }
        }
        /* Multi-halaman: hanya satu view terlihat pada satu waktu */
        .public-page-view { position: relative; display: none; }
        .public-page-view.active { display: block; }
    </style>
</head>
<body>
    <div id="public-pages-root">
        @foreach ($allPages as $index => $pg)
            <div
                class="public-page{{ $index === 0 ? ' active' : '' }} public-page-view"
                data-page-id="{{ $pg['id'] }}"
                data-page-name="{{ $pg['name'] }}"
                {{-- Indeks 0-based: JS mencari kontainer lewat index array allPages. --}}
                id="event-public-page-{{ $index }}"
            ></div>
        @endforeach
    </div>

    <script>
        // Konteks peserta dari server. Sengaja di scope terluar script ini,
        // bukan di dalam DOMContentLoaded, karena seluruh helper render*
        // di bawah membacanya.
        const RACIK = {
            eventSlug: @json($page->slug),
            viewer: @json($viewer),
            submission: @json($viewerSubmission),
            csrf: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            googleLoginUrl: @json(route('google.redirect')) + '?event=' + encodeURIComponent(@json($page->slug)),
            claimPaymentUrl: @json(route('api.form.payment.claim', ['eventPage' => $page->id])),
            quotaUrl: @json(route('api.form.quota', ['eventPage' => $page->id])),
            submitUrl: @json(route('api.form.submit', ['eventPage' => $page->id])),
            participantsUrl: @json(route('api.form.participants', ['eventPage' => $page->id])),
            participantCount: null,
            // true hanya untuk link /e/{slug}/admin (auth+ownership di server).
            // Dipakai buat banner penanda -- BUKAN kontrol keamanan; filtering
            // sebenarnya sudah terjadi di server lewat $allPages yang dikirim.
            isAdminView: @json($isAdminView ?? false),
            participantUrl: @json(route('builder.public', $page->slug)),
        };
        const isLoggedIn = () => !!(RACIK.viewer && RACIK.viewer.id);

        // Initialize public pages (multi-halaman) with elements
        document.addEventListener('DOMContentLoaded', function() {
            const allPages = @json($allPages);
            const rootEl = document.getElementById('public-pages-root');


            function renderPageInto(container, elements, pageMode = 'participant') {
                // Sort elements by y position for proper rendering order
                elements.sort((a, b) => (a.y || 0) - (b.y || 0));

                // Filter berdasarkan scope objek (lihat elementScope di bawah).
                elements = elements.filter(el => isElementVisibleInMode(el, pageMode));

                // Group elements by section (container/section types) for scroll direction
                const sections = [];
                let currentSection = { elements: [], scrollDirection: 'vertical', x: 0, y: 0 };
                
                elements.forEach(el => {
                    if (el.visible === false) return;
                    
                    // Check if this element starts a new section
                    const isSection = ['container', 'section', 'navbar', 'event-sidebar'].includes(el.type);
                    
                    if (isSection && currentSection.elements.length > 0) {
                        sections.push(currentSection);
                        currentSection = { elements: [], scrollDirection: el.props?.scrollDirection || 'vertical', x: el.x || 0, y: el.y || 0 };
                    }
                    
                    currentSection.elements.push(el);
                });
                
                if (currentSection.elements.length > 0) {
                    sections.push(currentSection);
                }

                // If no sections found, use default single section
                if (sections.length === 0) {
                    sections.push({ elements, scrollDirection: 'vertical', x: 0, y: 0 });
                }

                // Tinggi minimum halaman dihitung dari elemen terjauh; dideklarasikan
                // di luar loop karena dipakai lagi setelah semua section selesai.
                let maxPos = 0;

                // Render each section
                sections.forEach((section, sectionIdx) => {
                    const scrollDirection = section.scrollDirection || 'vertical';
                    const isHorizontal = scrollDirection === 'horizontal';
                    
                    // Create section container
                    const sectionContainer = document.createElement('div');
                    sectionContainer.className = 'canvas-section';
                    sectionContainer.style.cssText = `
                        position: relative;
                        width: 100%;
                        ${isHorizontal ? 'display: flex; flex-direction: row; overflow-x: auto; flex-wrap: nowrap;' : 'display: block;'}
                        margin-bottom: 2rem;
                    `;
                    
                    // Sort elements by position
                    const sortedElements = section.elements.sort((a, b) => {
                        if (isHorizontal) return (a.x || 0) - (b.x || 0);
                        return (a.y || 0) - (b.y || 0);
                    });

                    // Tinggi section ini sendiri (vertikal) -- anak-anaknya
                    // position:absolute, jadi TIDAK ikut membentuk tinggi induk
                    // secara alami. Tanpa ini, canvas-section collapse ke 0px
                    // dan top:X% semua elemen jadi X% dari 0 = 0 -- semuanya
                    // numpuk di pojok kiri atas, apa pun posisi aslinya.
                    let sectionMaxPos = 0;

                    sortedElements.forEach(el => {
                        if (el.visible === false) return;

                        const xPct = el.xPct !== undefined ? el.xPct : (el.x ? Math.min(100, (el.x / 1200) * 100) : 0);
                        const yPct = el.yPct !== undefined ? el.yPct : (el.y ? Math.min(100, (el.y / 900) * 100) : 0);
                        const widthPct = el.widthPct !== undefined ? el.widthPct : (el.width ? Math.min(100, (el.width / 1200) * 100) : 100);
                        const heightPct = el.heightPct !== undefined ? el.heightPct : (el.height ? Math.min(100, (el.height / 900) * 100) : undefined);

                        const cw = container.clientWidth || 1200;
                        const pos = isHorizontal 
                            ? (xPct / 100) * cw + (widthPct / 100) * cw
                            : (yPct / 100) * cw + ((heightPct !== undefined ? (heightPct / 100) * cw : (el.height || 0)));
                        if (pos > maxPos) maxPos = pos;
                        if (!isHorizontal && pos > sectionMaxPos) sectionMaxPos = pos;

                        const element = document.createElement('div');
                        element.className = 'canvas-element';
                        // Jangkar scroll: dipakai Tombol Daftar Sekarang & menu navbar
                        // untuk melompat ke section tertentu di halaman yang sama.
                        if (el.id) {
                            element.id = 'el-' + el.id;
                            element.dataset.elementId = el.id;
                        }
                        element.dataset.elType = el.type || '';
                        var animSettings = racikResolveAnim(el.props);
                        if (animSettings) {
                            element.dataset.anim = animSettings.key;
                            element.dataset.animCategory = animSettings.category || '';
                            element.dataset.animTrigger = animSettings.trigger;
                            // Disimpan sebagai properti JS (bukan cuma dataset string)
                            // supaya durasi/delay/infinite tersedia utuh saat trigger
                            // jalan nanti, tanpa perlu lookup ulang ke model elemen.
                            element._racikAnim = animSettings;
                        }
                        element.style.cssText = `
                            position: absolute;
                            left: ${xPct}%;
                            top: ${yPct}%;
                            width: ${widthPct}%;
                            ${heightPct !== undefined ? `height: ${heightPct}%;` : ''}
                            box-sizing: border-box;
                            ${racikFxToCss(el.props && el.props.effects)}
                        `;

                        element.innerHTML = racikWrapWithLink(renderElement(el), el.props);
                        sectionContainer.appendChild(element);
                    });
                    
                    if (!isHorizontal && sectionMaxPos > 0) {
                        sectionContainer.style.minHeight = sectionMaxPos + 'px';
                    }

                    container.appendChild(sectionContainer);
                    
                    if (isHorizontal) {
                        maxPos = Math.max(maxPos, sectionContainer.scrollWidth);
                    }
                });

                const autoMin = Math.max(
                    window.innerHeight || 0,
                    Math.ceil(maxPos) + 48,
                );
                container.style.minHeight = 'max(100vh, ' + autoMin + 'px)';
            }

            allPages.forEach((pg, i) => {
                const container = document.getElementById('event-public-page-' + i);
                if (!container) return;
                const effectiveMode = pg.mode || 'participant';
                renderPageInto(container, pg.elements || [], effectiveMode);
            });

            // Fetch participant data for participant-list elements (halaman
            // bermode admin -- hanya pernah dikirim server lewat link /admin).
            const slug = @json($page->slug);
            allPages.forEach((pg, i) => {
                const effectiveMode = pg.mode || 'participant';
                if (effectiveMode === 'admin') {
                    const container = document.getElementById('event-public-page-' + i);
                    if (!container) return;
                    // Find participant-list elements and fetch data
                    const participantListEls = container.querySelectorAll('.el-participant-list');
                    if (participantListEls.length > 0) {
                        fetch(RACIK.participantsUrl)
                            .then(res => res.json())
                            .then(data => {
                                if (data.success && data.data) {
                                    participantListEls.forEach(el => {
                                        const tableBody = el.querySelector('tbody');
                                        if (tableBody) {
                                            const model = findElementById(el.dataset.elementId || (el.closest('[data-element-id]') || {}).dataset?.elementId);
                                            tableBody.innerHTML = participantRows(data.data, model ? model.props : null);
                                            // Update count
                                            const countEl = el.querySelector('.participant-count');
                                            if (countEl) countEl.textContent = data.pagination?.total + ' peserta';
                                        }
                                    });
                                }
                            })
                            .catch(err => console.error('Failed to fetch participants:', err));
                    }
                }
            });

            // Penanda visual: ini link khusus panitia, bukan yang dibagikan ke
            // peserta. Datanya asli (bukan dummy) -- beda dari mekanisme
            // preview lama yang pernah ada di sini.
            if (RACIK.isAdminView) {
                const banner = document.createElement('div');
                banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#111827;color:#fff;padding:8px 16px;text-align:center;z-index:9999;font-size:13px;font-weight:500;box-shadow:0 2px 8px rgba(0,0,0,.15)';
                banner.innerHTML = `<strong>Tampilan Panitia</strong> — halaman ini tidak dibagikan ke peserta. <a href="${RACIK.participantUrl}" style="color:#fff;text-decoration:underline;margin-left:16px;">Buka sebagai peserta</a>`;
                document.body.prepend(banner);
            }

            // Animasi objek: 3 cara mulai, sesuai pilihan EO di panel Animasi.
            const animEls = Array.from(rootEl.querySelectorAll('.canvas-element[data-anim]'));
            const scrollEls = [];

            animEls.forEach((el) => {
                const settings = el._racikAnim;
                if (!settings) return;

                if (settings.trigger === 'click') {
                    el.style.cursor = 'pointer';
                    el.addEventListener('click', function () {
                        // Boleh diputar ulang berkali-kali per klik, bukan cuma sekali.
                        el.classList.remove('anim-play');
                        el.style.animationName = 'none';
                        // eslint-disable-next-line no-unused-expressions
                        void el.offsetWidth; // paksa reflow supaya restart animasi kedeteksi
                        racikPlayAnim(el, settings);
                    });
                    return;
                }

                if (settings.trigger === 'load') {
                    racikPlayAnim(el, settings);
                    return;
                }

                // 'scroll' (default) -- diproses di bawah lewat satu IntersectionObserver
                // bersama, supaya tidak bikin satu observer per elemen.
                scrollEls.push(el);
            });

            if ('IntersectionObserver' in window && scrollEls.length) {
                const io = new IntersectionObserver((entries) => {
                    entries.forEach((en) => {
                        if (en.isIntersecting) {
                            racikPlayAnim(en.target, en.target._racikAnim);
                            io.unobserve(en.target);
                        }
                    });
                }, { threshold: 0.15 });
                scrollEls.forEach((el) => io.observe(el));
            } else {
                scrollEls.forEach((el) => racikPlayAnim(el, el._racikAnim));
            }

            // Navigasi antar halaman
            window.racikShowPage = function(pageId) {
                const views = rootEl.querySelectorAll('.public-page-view');
                let found = false;
                views.forEach(v => {
                    const match = v.getAttribute('data-page-id') === String(pageId);
                    if (match) found = true;
                    v.classList.toggle('active', match);
                });
                if (found) window.scrollTo({ top: 0, behavior: 'auto' });
                return found;
            };

            document.addEventListener('click', function(e) {
                const navBtn = e.target.closest && e.target.closest('[data-nav-page]');
                if (navBtn) {
                    e.preventDefault();
                    racikShowPage(navBtn.getAttribute('data-nav-page'));
                }
            });

            // Lompat ke satu elemen di halaman aktif. Kalau elemen ada di halaman
            // lain, pindah halaman dulu baru scroll.
            function racikScrollToElement(elementId, pageId) {
                if (pageId) racikShowPage(pageId);
                const jump = () => {
                    const target = elementId ? document.getElementById('el-' + elementId) : null;
                    const fallback = target || document.querySelector('.public-page.active [data-el-type="form"]');
                    if (fallback) {
                        fallback.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        return true;
                    }
                    return false;
                };
                // Beri satu frame supaya halaman baru sempat tampil sebelum diukur.
                if (pageId) { requestAnimationFrame(jump); } else { jump(); }
            }

            // Tombol Daftar Sekarang
            document.addEventListener('click', function(e) {
                const btn = e.target.closest && e.target.closest('[data-scroll-target]');
                if (!btn) return;
                e.preventDefault();
                racikScrollToElement(btn.getAttribute('data-scroll-target') || '', null);
            });

            // Menu navbar: section di halaman ini / halaman lain / URL luar
            document.addEventListener('click', function(e) {
                const link = e.target.closest && e.target.closest('[data-nav-target-type]');
                if (!link) return;
                const type = link.getAttribute('data-nav-target-type');
                const id = link.getAttribute('data-nav-target-id') || '';
                if (type === 'url') return; // biarkan <a> jalan seperti biasa
                e.preventDefault();
                if (type === 'page') {
                    racikShowPage(id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    racikScrollToElement(id, null);
                }
                // Tutup dropdown hamburger kalau sedang terbuka
                const nav = link.closest('.el-navbar');
                if (nav) nav.classList.remove('nb-open');
            });

            // Tombol Bayar: peserta menandai sudah transfer
            document.addEventListener('click', async function(e) {
                const btn = e.target.closest && e.target.closest('[data-pay-claim]');
                if (!btn) return;
                e.preventDefault();
                btn.disabled = true;
                const original = btn.textContent;
                btn.textContent = 'Mengirim...';
                try {
                    const res = await fetch(RACIK.claimPaymentUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-CSRF-TOKEN': RACIK.csrf,
                        },
                    });
                    const data = await res.json();
                    if (res.ok && data.success) {
                        RACIK.submission = RACIK.submission
                            ? Object.assign({}, RACIK.submission, { status: data.status })
                            : { status: data.status };
                        // Render ulang semua tombol bayar supaya statusnya seragam
                        document.querySelectorAll('[data-el-type="pay-button"]').forEach(function (wrap) {
                            const elId = wrap.dataset.elementId;
                            const model = findElementById(elId);
                            if (model) wrap.innerHTML = racikWrapWithLink(renderElement(model), model.props);
                        });
                        alert(data.message);
                    } else {
                        btn.disabled = false;
                        btn.textContent = original;
                        alert(data.message || 'Gagal memproses. Coba lagi.');
                    }
                } catch (err) {
                    btn.disabled = false;
                    btn.textContent = original;
                    alert('Koneksi bermasalah. Coba lagi.');
                }
            });

            // Penghitung Peserta mengambil angkanya dari server (jumlah pendaftar
            // event ini), bukan dari props. Dipanggil sekali saat halaman dimuat
            // dan sekali lagi setiap ada Form Pendaftaran yang berhasil disubmit.
            async function refreshParticipantCount() {
                if (!document.querySelector('[data-el-type="participant-counter"]')) return;
                try {
                    const res = await fetch(RACIK.quotaUrl, { headers: { 'Accept': 'application/json' } });
                    const data = await res.json();
                    if (!data || typeof data.used !== 'number') return;
                    RACIK.participantCount = data.used;
                    document.querySelectorAll('[data-el-type="participant-counter"]').forEach(function (wrap) {
                        const model = findElementById(wrap.dataset.elementId);
                        if (model) wrap.innerHTML = racikWrapWithLink(renderElement(model), model.props);
                    });
                } catch (e) {
                    /* biarkan angka sebelumnya kalau jaringan gagal */
                }
            }
            window.racikRefreshParticipantCount = refreshParticipantCount;
            refreshParticipantCount();

            function findElementById(id) {
                for (const pg of allPages) {
                    const found = (pg.elements || []).find(function (el) { return String(el.id) === String(id); });
                    if (found) return found;
                }
                return null;
            }

            // Interaksi hamburger navbar: toggle dropdown, tutup saat klik di luar
            document.addEventListener('click', function(e) {
                const burger = e.target.closest && e.target.closest('.nb-burger');
                if (burger) {
                    const nav = burger.closest('.el-navbar');
                    if (nav) {
                        const open = nav.classList.toggle('nb-open');
                        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
                    }
                    return;
                }
                document.querySelectorAll('.el-navbar.nb-open').forEach(function(nav) {
                    if (!nav.contains(e.target)) {
                        nav.classList.remove('nb-open');
                        const b = nav.querySelector('.nb-burger');
                        if (b) b.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            // Form submit handler
            document.addEventListener('submit', async function(e) {
                const form = e.target.closest('.el-form');
                if (!form) return;
                e.preventDefault();
                
                const elementId = form.dataset.elementId;
                const formData = new FormData(form);
                const data = {};
                for (const [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                const submitBtn = form.querySelector('.el-form-submit');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Mendaftar...';
                
                try {
                    
                    const response = await fetch(RACIK.submitUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                            'Accept': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({ data }),
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Penghitung Peserta ikut naik tanpa perlu reload.
                        if (window.racikRefreshParticipantCount) window.racikRefreshParticipantCount();
                        alert('Pendaftaran berhasil!');
                        if (result.redirect_url) {
                            window.location.href = result.redirect_url;
                        } else {
                            form.reset();
                        }
                    } else {
                        alert(result.message || 'Gagal mendaftar.');
                    }
                } catch (err) {
                    console.error(err);
                    alert('Terjadi kesalahan. Silakan coba lagi.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            });

            // Pay button handler
            window.handlePayClick = async function(btn) {
                const form = btn.closest('.el-form');
                if (!form) return;
                
                const formData = new FormData(form);
                const data = {};
                for (const [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                const originalText = btn.textContent;
                btn.disabled = true;
                btn.textContent = 'Memproses...';
                
                try {
                    
                    const response = await fetch(RACIK.submitUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                            'Accept': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify({ data }),
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Penghitung Peserta ikut naik tanpa perlu reload.
                        if (window.racikRefreshParticipantCount) window.racikRefreshParticipantCount();
                        // Update submission status to menunggu_konfirmasi
                        if (result.submission && result.submission.id) {
                            try {
                                const paymentResponse = await fetch(`/api/submissions/${result.submission.id}/payment`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                                        'Accept': 'application/json',
                                    },
                                    credentials: 'same-origin',
                                    body: JSON.stringify({ status: 'menunggu_konfirmasi' }),
                                });
                                const paymentResult = await paymentResponse.json();
                                if (paymentResult.success) {
                                    alert('Pendaftaran berhasil! Status pembayaran: Menunggu konfirmasi. Silakan lakukan pembayaran lalu hubungi admin untuk verifikasi.');
                                } else {
                                    alert('Pendaftaran berhasil! Namun gagal mengupdate status pembayaran: ' + (paymentResult.message || 'Unknown error'));
                                }
                            } catch (err) {
                                console.error(err);
                                alert('Pendaftaran berhasil! Namun terjadi kesalahan saat mengupdate status pembayaran.');
                            }
                        } else {
                            alert('Pendaftaran berhasil! Status pembayaran: Menunggu konfirmasi.');
                        }
                    } else {
                        alert(result.message || 'Gagal memproses.');
                    }
                } catch (err) {
                    console.error(err);
                    alert('Terjadi kesalahan. Silakan coba lagi.');
                } finally {
                    btn.disabled = false;
                    btn.textContent = originalText;
                }
            };
        });
        
        /* ===== SCOPE OBJEK =====
           Cerminan dari helper yang sama di resources/js/components/Builder/EventElements.jsx.
           Objek lama tanpa field `scope` jatuh kembali ke aturan berbasis tipe,
           supaya event yang sudah terbit tidak mendadak kosong. */
        const PARTICIPANT_LOCKED_TYPES = ['form', 'rsvp'];
        const ADMIN_LOCKED_TYPES = ['participant-list'];

        function elementScope(el) {
            if (!el) return 'both';
            if (el.scope === 'admin' || el.scope === 'participant' || el.scope === 'both') {
                return el.scope;
            }
            if (PARTICIPANT_LOCKED_TYPES.includes(el.type)) return 'participant';
            if (ADMIN_LOCKED_TYPES.includes(el.type)) return 'admin';
            return 'both';
        }

        function isElementVisibleInMode(el, mode) {
            const scope = elementScope(el);
            return scope === 'both' || scope === mode;
        }

        /* ===== KATALOG ANIMASI =====
           Cerminan sisi-server dari resources/js/components/Builder/AnimationPresets.js.
           Hanya field yang dipakai runtime publik: keyframe + category + durasi
           bawaan. Daftar lengkap (label per bahasa Indonesia, dikelompokkan
           Masuk/Perhatian/Keluar) ada di file JS itu -- di sini cukup untuk
           MEMUTAR animasinya, bukan untuk UI pemilihan (itu tugas builder). */
        const RACIK_ANIM_PRESETS = {
            fade: { keyframe: 'racikFade', category: 'entrance', defaultDurationMs: 600 },
            'slide-up': { keyframe: 'racikSlideUp', category: 'entrance', defaultDurationMs: 600 },
            'slide-down': { keyframe: 'racikSlideDown', category: 'entrance', defaultDurationMs: 600 },
            'slide-left': { keyframe: 'racikSlideLeft', category: 'entrance', defaultDurationMs: 600 },
            'slide-right': { keyframe: 'racikSlideRight', category: 'entrance', defaultDurationMs: 600 },
            zoom: { keyframe: 'racikZoom', category: 'entrance', defaultDurationMs: 550 },
            bounce: { keyframe: 'racikBounce', category: 'entrance', defaultDurationMs: 800 },
            pop: { keyframe: 'racikPop', category: 'entrance', defaultDurationMs: 500 },
            flip: { keyframe: 'racikFlip', category: 'entrance', defaultDurationMs: 700 },
            'rotate-in': { keyframe: 'racikRotateIn', category: 'entrance', defaultDurationMs: 700 },
            pulse: { keyframe: 'racikPulse', category: 'attention', defaultDurationMs: 900 },
            shake: { keyframe: 'racikShake', category: 'attention', defaultDurationMs: 700 },
            wobble: { keyframe: 'racikWobble', category: 'attention', defaultDurationMs: 900 },
            tada: { keyframe: 'racikTada', category: 'attention', defaultDurationMs: 900 },
            heartbeat: { keyframe: 'racikHeartbeat', category: 'attention', defaultDurationMs: 1000 },
            flash: { keyframe: 'racikFlash', category: 'attention', defaultDurationMs: 900 },
            'fade-out': { keyframe: 'racikFadeOut', category: 'exit', defaultDurationMs: 500 },
            'slide-out-up': { keyframe: 'racikSlideOutUp', category: 'exit', defaultDurationMs: 500 },
            'slide-out-down': { keyframe: 'racikSlideOutDown', category: 'exit', defaultDurationMs: 500 },
            'zoom-out': { keyframe: 'racikZoomOut', category: 'exit', defaultDurationMs: 500 },
            shrink: { keyframe: 'racikShrink', category: 'exit', defaultDurationMs: 450 },
            // Alias event lama, sebelum katalog ini punya banyak pilihan slide.
            slide: { keyframe: 'racikSlideDown', category: 'entrance', defaultDurationMs: 600 },
        };

        /**
         * Nilai efektif animasi sebuah objek. Balik null kalau objek ini
         * memang tidak beranimasi -- pemanggilnya cukup cek truthy-nya.
         */
        function racikResolveAnim(props) {
            const key = (props && props.animation) || 'none';
            if (key === 'none') return null;
            const preset = RACIK_ANIM_PRESETS[key];
            if (!preset) return null;

            const rawDuration = props && Number(props.animDuration);
            const rawDelay = props && Number(props.animDelay);

            return {
                key: key,
                keyframe: preset.keyframe,
                category: preset.category,
                infinite: !!(props && props.animInfinite),
                delay: (rawDelay > 0) ? rawDelay : 0,
                duration: (rawDuration > 0) ? rawDuration : (preset.defaultDurationMs || 600) / 1000,
                trigger: (props && props.animTrigger) || 'scroll',
            };
        }

        /** Pasang animation-* inline di elemen lalu mulai animasinya. */
        function racikPlayAnim(element, settings) {
            element.style.animationName = settings.keyframe;
            element.style.animationDuration = settings.duration + 's';
            element.style.animationDelay = settings.delay + 's';
            element.style.animationIterationCount = settings.infinite ? 'infinite' : '1';
            element.style.animationTimingFunction = 'ease-out';
            element.style.animationFillMode = settings.infinite ? 'none' : 'both';
            element.classList.add('anim-play');
        }

        // Dipakai bersama oleh renderElement dan seluruh helper render* di bawah.
        // Sebelumnya ini const lokal di dalam renderElement, sehingga setiap
        // helper yang memakainya melempar ReferenceError saat dipanggil.
        const baseStyle = 'max-width: 100%; box-sizing: border-box;';

        /**
         * Cerminan wrapWithLink() di EventBuilder.jsx -- kalau props.isLink
         * aktif, bungkus markup elemen dengan <a>. linkTarget menyimpan
         * tujuan siap pakai untuk keduanya ("/e/slug-halaman" internal, URL
         * penuh eksternal), persis format yang sama dipakai tipe elemen
         * "link" khusus. Sebelumnya toggle "Jadikan Link" di builder untuk
         * SEMUA elemen dasar (teks, bentuk, gambar, dst.) tidak berefek apa
         * pun di halaman publik -- markup-nya dirender di sini, dan di sini
         * tidak pernah ada logika pembungkus <a> sama sekali.
         */
        /**
         * Cerminan fxToCss() di EventBuilder.jsx -- efek visual (bayangan,
         * border, blur) yang EO atur lewat panel properti tersimpan di
         * props.effects, tapi sebelumnya TIDAK PERNAH dirender di halaman
         * publik sama sekali (hanya tampil di kanvas builder). EO mendesain
         * bayangan yang bagus, publish, dan bayangannya hilang.
         */
        function racikFxToCss(effects) {
            if (!Array.isArray(effects)) return '';
            const shadows = [];
            const filters = [];
            effects.forEach(function (f) {
                if (!f || !f.type) return;
                if (f.type === 'shadow') {
                    shadows.push((Number(f.offsetX) || 0) + 'px ' + (Number(f.offsetY) || 4) + 'px ' + (Number(f.blur) || 8) + 'px ' + (f.color || 'rgba(0,0,0,.35)'));
                } else if (f.type === 'border') {
                    shadows.push('0 0 0 ' + (Number(f.width) || 2) + 'px ' + (f.color || '#111111'));
                } else if (f.type === 'blur') {
                    filters.push('blur(' + (Number(f.radius) || 0) + 'px)');
                }
            });
            let css = '';
            if (shadows.length) css += 'box-shadow:' + shadows.join(', ') + ';';
            if (filters.length) css += 'filter:' + filters.join(' ') + ';';
            return css;
        }

        function racikWrapWithLink(html, props) {
            const p = props || {};
            if (!p.isLink || !p.linkTarget) return html;
            const target = p.openInNewTab !== false ? '_blank' : '_self';
            const rel = p.openInNewTab !== false ? ' rel="noopener noreferrer"' : '';
            return `<a href="${escapeAttr(p.linkTarget)}" target="${target}"${rel} style="text-decoration:none;color:inherit;display:inline-block;max-width:100%;">${html}</a>`;
        }

        function renderElement(el) {
            switch (el.type) {
                case 'text': {
                    const tp = el.props || {};
                    const fontFamilyCss = tp.fontFamily ? `font-family:${escapeAttr(tp.fontFamily)};` : '';
                    return `<div class="el-text" style="font-size:${tp.fontSize}px;color:${tp.color};font-weight:${tp.fontWeight};${fontFamilyCss}${baseStyle}">${escapeHtml(tp.content)}</div>`;
                }
                
                case 'image':
                    return `<img class="el-image" src="${escapeHtml(el.props.src)}" alt="${escapeHtml(el.props.alt)}" style="width:100%;height:auto;object-fit:cover;border-radius:4px;${baseStyle}">`;
                
                case 'video': {
                    const vp = el.props || {};
                    const isEmbed = /youtube\.com|youtu\.be|vimeo\.com|dailymotion|\/embed\//i.test(vp.src || '');
                    if (isEmbed) {
                        return `<div class="el-video" style="width:100%;height:auto;aspect-ratio:16/9;${baseStyle}"><iframe width="100%" height="100%" src="${escapeHtml(vp.src)}" title="${escapeHtml(vp.alt)}" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>`;
                    }
                    // File video upload: <video> asli dengan kontrol untuk pengunjung
                    return `<div class="el-video" style="width:100%;height:auto;aspect-ratio:16/9;${baseStyle}"><video class="el-video-file" src="${escapeHtml(vp.src)}" controls playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;border-radius:4px;background:#111827;display:block;"></video></div>`;
                }
                
                case 'google-login': {
                    const gp = el.props || {};
                    // Sudah login: tampilkan identitas, bukan ajakan login lagi.
                    if (isLoggedIn()) {
                        return `<span class="el-google-login is-signed-in" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:${Number(gp.radius) || 4}px;font-size:${Number(gp.fontSize) || 14}px;background:${escapeAttr(gp.bgColor || '#ffffff')};color:${escapeAttr(gp.textColor || '#333333')};border:1px solid ${escapeAttr(gp.borderColor || '#dadce0')};${baseStyle}">${googleGlyph()}Masuk sebagai ${escapeHtml(RACIK.viewer.name)}</span>`;
                    }
                    return `<a href="${escapeAttr(RACIK.googleLoginUrl)}" class="el-google-login" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;border-radius:${Number(gp.radius) || 4}px;font-size:${Number(gp.fontSize) || 14}px;font-weight:500;text-decoration:none;background:${escapeAttr(gp.bgColor || '#ffffff')};color:${escapeAttr(gp.textColor || '#333333')};border:1px solid ${escapeAttr(gp.borderColor || '#dadce0')};cursor:pointer;${baseStyle}"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z" fill="#34A853"/><path d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" fill="#FBBC05"/><path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/></svg>${escapeHtml(gp.label || 'Masuk dengan Google')}</a>`;
                }
                
                case 'button': {
                    const bp = el.props || {};
                    let extra = '';
                    if (bp.action === 'page' && bp.actionTarget) {
                        // Navigasi antar halaman event ini
                        extra = ` data-nav-page="${escapeAttr(bp.actionTarget)}" style="cursor:pointer;"`;
                    } else if (bp.action === 'url' && bp.actionTarget) {
                        return `<a href="${escapeAttr(bp.actionTarget)}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;${baseStyle}"><button class="el-button" style="background:${bp.bgColor};color:${bp.textColor};border-radius:${Number(bp.radius) || 8}px;cursor:pointer;">${escapeHtml(bp.label)}</button></a>`;
                    }
                    return `<button class="el-button"${extra} style="background:${escapeAttr(bp.bgColor)};color:${escapeAttr(bp.textColor)};border-radius:${Number(bp.radius) || 8}px;${baseStyle}">${escapeHtml(bp.label)}</button>`;
                }
                
                // Semua jenis shape → SVG/render function masing-masing
                case 'shape':
                case 'rectangle':
                case 'rounded-rectangle':
                case 'circle':
                case 'triangle':
                case 'diamond':
                case 'pentagon':
                case 'hexagon':
                case 'polygon':
                case 'star':
                case 'heart':
                case 'speech-bubble':
                case 'blob':
                case 'line':
                case 'arrow':
                case 'divider':
                case 'badge':
                    return shapeMarkup(el);

                // Tautan: <a> sungguhan dengan href & target sesuai properti
                case 'link': {
                    const lp = el.props || {};
                    const href = escapeAttr(lp.linkTarget || '#');
                    const target = lp.openInNewTab !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
                    const linkFontFamilyCss = lp.fontFamily ? `font-family:${escapeAttr(lp.fontFamily)};` : '';
                    return `<a class="el-link" href="${href}"${target} style="font-size:${Number(lp.fontSize) || 16}px;color:${escapeAttr(lp.color || '#3b82f6')};font-weight:${escapeAttr(String(lp.fontWeight || 500))};${linkFontFamilyCss}text-decoration:underline;text-underline-offset:3px;line-height:1.5;word-break:break-word;overflow-wrap:anywhere;${baseStyle}">${escapeHtml(lp.content)}</a>`;
                }

                // Navbar responsif: desktop horizontal, ≤1024px collapse ke hamburger
                case 'navbar':
                    return renderNavbar(el);

                // Section event components — dibungkus preset lebar per-section
                case 'countdown':
                    return sectionWrap(el, renderCountdown(el));
                case 'rsvp':
                    return sectionWrap(el, renderRsvp(el));
                case 'schedule':
                    return sectionWrap(el, renderSchedule(el));
                case 'ticket':
                    return sectionWrap(el, renderTicket(el));
                case 'map':
                    return sectionWrap(el, renderMap(el));
                case 'poll':
                    return sectionWrap(el, renderPoll(el));
                case 'guestbook':
                    return sectionWrap(el, renderGuestbook(el));
                case 'feedback':
                    return sectionWrap(el, renderFeedback(el));                
                case 'sponsor':
                    return renderSponsor(el);
                case 'form':
                    return sectionWrap(el, renderForm(el));
                case 'participant-list':
                    return sectionWrap(el, renderParticipantList(el));
                case 'date-time':
                    return sectionWrap(el, renderDateTime(el));
                case 'location-map':
                    return sectionWrap(el, renderLocationMap(el));
                case 'participant-counter':
                    return sectionWrap(el, renderParticipantCounter(el));
                case 'gallery':
                    return sectionWrap(el, renderGallery(el));
                case 'event-sidebar':
                    return sectionWrap(el, renderEventSidebar(el));
                case 'link-button':
                    return sectionWrap(el, renderLinkButton(el));
                case 'register-button':
                    return sectionWrap(el, renderRegisterButton(el));
                case 'pay-button':
                    return sectionWrap(el, renderPayButton(el));
                
                case 'submit':
                case 'oke':
                case 'cancel':
                    return `<button class="el-${el.type} el-button" style="background:${el.props.color};color:#fff;border-radius:${el.props.radius || 8}px;${baseStyle}">${escapeHtml(el.props.label)}</button>`;
                
                default:
                    return '';
            }
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text == null ? '' : String(text);
            return div.innerHTML
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function escapeAttr(value) {
            return escapeHtml(value);
        }

        // ===================== SHAPE RENDERING (public page) =====================
        // Mirror dari ShapeContent di EventBuilder.jsx — mapping eksplisit
        // setiap shape type ke SVG markup masing-masing.
        function polygonPointsStr(sides, cx, cy, r, rotation) {
            rotation = rotation === undefined ? -Math.PI / 2 : rotation;
            const pts = [];
            for (let i = 0; i < sides; i++) {
                const angle = rotation + (i * 2 * Math.PI) / sides;
                pts.push((cx + r * Math.cos(angle)).toFixed(2) + ',' + (cy + r * Math.sin(angle)).toFixed(2));
            }
            return pts.join(' ');
        }

        function starPointsStr(count, cx, cy, outerR, innerR, rotation) {
            rotation = rotation === undefined ? -Math.PI / 2 : rotation;
            const pts = [];
            for (let i = 0; i < count * 2; i++) {
                const angle = rotation + (i * Math.PI) / count;
                const radius = i % 2 === 0 ? outerR : innerR;
                pts.push((cx + radius * Math.cos(angle)).toFixed(2) + ',' + (cy + radius * Math.sin(angle)).toFixed(2));
            }
            return pts.join(' ');
        }

        function heartPathStr(cx, cy, size) {
            const s = size / 2;
            return 'M ' + cx + ' ' + (cy + s * 0.9) +
                ' C ' + (cx - s * 1.1) + ' ' + (cy + s * 0.15) + ', ' + (cx - s * 0.95) + ' ' + (cy - s * 0.85) + ', ' + cx + ' ' + (cy - s * 0.25) +
                ' C ' + (cx + s * 0.95) + ' ' + (cy - s * 0.85) + ', ' + (cx + s * 1.1) + ' ' + (cy + s * 0.15) + ', ' + cx + ' ' + (cy + s * 0.9) + ' Z';
        }

        function speechBubblePathStr(w, h, tailW, tailH, cornerRadius) {
            const bodyH = h - tailH;
            const r = Math.max(0, Math.min(cornerRadius, w / 3, bodyH / 2));
            const cx = w / 2;
            return 'M 0 ' + r + ' Q 0 0 ' + r + ' 0' +
                ' L ' + (w - r) + ' 0 Q ' + w + ' 0 ' + w + ' ' + r +
                ' L ' + w + ' ' + (bodyH - r) + ' Q ' + w + ' ' + bodyH + ' ' + (w - r) + ' ' + bodyH +
                ' L ' + (cx + tailW / 2) + ' ' + bodyH + ' L ' + cx + ' ' + h + ' L ' + (cx - tailW / 2) + ' ' + bodyH +
                ' L ' + r + ' ' + bodyH + ' Q 0 ' + bodyH + ' 0 ' + (bodyH - r) + ' Z';
        }

        function blobPathStr(cx, cy, baseR) {
            const n = 8;
            const radii = [];
            const angles = [];
            for (let i = 0; i < n; i++) {
                angles.push((i * 2 * Math.PI) / n);
                radii.push(baseR * (0.72 + Math.sin(i * 2.4) * 0.28));
            }
            const px = (i) => cx + radii[i] * Math.cos(angles[i]);
            const py = (i) => cy + radii[i] * Math.sin(angles[i]);
            let d = 'M ' + ((px(0) + px(n - 1)) / 2).toFixed(2) + ' ' + ((py(0) + py(n - 1)) / 2).toFixed(2);
            for (let i = 0; i < n; i++) {
                const next = (i + 1) % n;
                d += ' Q ' + px(i).toFixed(2) + ' ' + py(i).toFixed(2) +
                    ' ' + ((px(i) + px(next)) / 2).toFixed(2) + ' ' + ((py(i) + py(next)) / 2).toFixed(2);
            }
            return d + ' Z';
        }

        /* ===== WARNA BENTUK: SOLID / GRADIENT =====
           Cerminan dari resources/js/components/Builder/GradientColorField.jsx.
           Bentuk = SVG, jadi gradient perlu <linearGradient> beneran; badge/
           fallback default = <div> CSS biasa, pakai linear-gradient() string. */
        function racikResolveBackgroundFill(props, fallbackColor) {
            const bg = props && props.background;
            if (bg && bg.type === 'gradient' && Array.isArray(bg.stops) && bg.stops.length >= 2) {
                return {
                    mode: 'gradient',
                    angle: (typeof bg.angle === 'number' && isFinite(bg.angle)) ? bg.angle : 135,
                    stops: bg.stops.map(function (st, i) {
                        return {
                            color: st.color || fallbackColor,
                            position: (typeof st.position === 'number' && isFinite(st.position))
                                ? st.position
                                : (i / (bg.stops.length - 1)) * 100,
                        };
                    }),
                };
            }
            return { mode: 'solid', color: (bg && bg.color) || (props && props.bgColor) || fallbackColor };
        }

        function racikCssGradientString(angle, stops) {
            const stopsCss = stops.map(function (s) { return s.color + ' ' + s.position + '%'; }).join(', ');
            return 'linear-gradient(' + angle + 'deg, ' + stopsCss + ')';
        }

        // "Magic corners" ala CSS linear-gradient, dalam koordinat piksel --
        // lihat komentar svgGradientLine() di GradientColorField.jsx untuk
        // penjelasan rumusnya.
        function racikSvgGradientLine(angleDeg, w, h) {
            const rad = (angleDeg * Math.PI) / 180;
            const dx = Math.sin(rad);
            const dy = -Math.cos(rad);
            const length = Math.abs(w * dx) + Math.abs(h * dy);
            const half = length / 2;
            const cx = w / 2;
            const cy = h / 2;
            return { x1: cx - dx * half, y1: cy - dy * half, x2: cx + dx * half, y2: cy + dy * half };
        }

        function racikSvgOpen(w, h, gradientDefsStr) {
            return '<svg width="100%" height="100%" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' + gradientDefsStr;
        }

        function shapeMarkup(el) {
            const p = el.props || {};
            const isStroked = ['line', 'arrow', 'divider'].includes(el.type);
            const sw = Math.min(p.strokeWidth || 2, 40);
            const fill = escapeAttr(p.bgColor || '#4b5563');
            const strokeColor = escapeAttr(p.strokeColor || '#6b7280');

            const resolvedFill = racikResolveBackgroundFill(p, '#4b5563');
            const isGradientFill = !isStroked && resolvedFill.mode === 'gradient';
            const gradientId = 'grad-' + (el.id || 'shape') + '-' + el.type;
            const cssBgValue = isGradientFill
                ? racikCssGradientString(resolvedFill.angle, resolvedFill.stops)
                : fill;
            const dash = p.strokeDasharray && p.strokeDasharray !== 'none' ? ' stroke-dasharray="' + escapeAttr(p.strokeDasharray) + '"' : '';
            // Rekonstruksi ukuran px seperti editor (% dari base canvas 1200).
            // SVG memakai preserveAspectRatio="none" sehingga tetap stretch mengisi box.
            const widthPct = el.widthPct !== undefined && el.widthPct !== null
                ? el.widthPct
                : (el.width ? Math.min(100, (el.width / 1200) * 100) : 100);
            let w = Math.max(4, Math.round((widthPct / 100) * 1200));
            let h;
            if (el.heightPct !== undefined && el.heightPct !== null) {
                h = Math.max(4, Math.round((el.heightPct / 100) * 1200));
            } else if (el.height) {
                h = Math.max(4, Math.round(el.height));
            } else {
                h = (el.type === 'line' || el.type === 'divider') ? 8 : w;
            }
            const inset = isStroked ? sw / 2 : 0;
            const cx = w / 2;
            const cy = h / 2;
            const rx = Math.max(w / 2 - inset, 1);
            const ry = Math.max(h / 2 - inset, 1);
            const r = Math.max(Math.min(w, h) / 2 - inset, 1);

            const commonFill = isStroked ? 'none' : (isGradientFill ? 'url(#' + gradientId + ')' : fill);
            const commonStroke = isStroked ? ' stroke="' + strokeColor + '" stroke-width="' + sw + '"' + dash + ' stroke-linecap="round" stroke-linejoin="round"' : '';

            let gradientDefsStr = '';
            if (isGradientFill) {
                const line = racikSvgGradientLine(resolvedFill.angle, w, h);
                const stopsMarkup = resolvedFill.stops.map(function (st) {
                    return '<stop offset="' + st.position + '%" stop-color="' + escapeAttr(st.color) + '" />';
                }).join('');
                gradientDefsStr = '<defs><linearGradient id="' + gradientId + '" gradientUnits="userSpaceOnUse" x1="' +
                    line.x1 + '" y1="' + line.y1 + '" x2="' + line.x2 + '" y2="' + line.y2 + '">' + stopsMarkup + '</linearGradient></defs>';
            }

            switch (el.type) {
                case 'rectangle':
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<rect x="' + inset + '" y="' + inset + '" width="' + Math.max(w - inset * 2, 1) + '" height="' + Math.max(h - inset * 2, 1) + '" fill="' + commonFill + '"' + commonStroke + ' /></svg>';
                case 'rounded-rectangle':
                case 'shape': {
                    const rad = Math.min(p.radius === undefined ? 16 : p.radius, w / 2, h / 2);
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<rect x="' + inset + '" y="' + inset + '" width="' + Math.max(w - inset * 2, 1) + '" height="' + Math.max(h - inset * 2, 1) + '" rx="' + rad + '" ry="' + rad + '" fill="' + commonFill + '"' + commonStroke + ' /></svg>';
                }
                case 'circle':
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + commonFill + '"' + commonStroke + ' /></svg>';
                case 'triangle':
                    return svgPolygon(polygonPointsStr(3, cx, cy, r), commonFill, commonStroke, w, h, gradientDefsStr);
                case 'diamond':
                    return svgPolygon(polygonPointsStr(4, cx, cy, r), commonFill, commonStroke, w, h, gradientDefsStr);
                case 'pentagon':
                    return svgPolygon(polygonPointsStr(5, cx, cy, r), commonFill, commonStroke, w, h, gradientDefsStr);
                case 'hexagon':
                    return svgPolygon(polygonPointsStr(6, cx, cy, r), commonFill, commonStroke, w, h, gradientDefsStr);
                case 'polygon':
                    return svgPolygon(polygonPointsStr(Math.round(p.sides || 6), cx, cy, r), commonFill, commonStroke, w, h, gradientDefsStr);
                case 'star':
                    return svgPolygon(starPointsStr(Math.round(p.points || 5), cx, cy, r, r * 0.45), commonFill, commonStroke, w, h, gradientDefsStr);
                case 'heart':
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<path d="' + heartPathStr(cx, cy + h * 0.02, Math.min(w * 0.92, h)) + '" fill="' + commonFill + '"' + commonStroke + ' /></svg>';
                case 'speech-bubble':
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<path d="' + speechBubblePathStr(w, h, Math.min(24, w * 0.3), Math.min(22, h * 0.35), p.radius === undefined ? 12 : p.radius) + '" fill="' + commonFill + '" /></svg>';
                case 'blob':
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<path d="' + blobPathStr(cx, cy, r) + '" fill="' + commonFill + '"' + commonStroke + ' /></svg>';
                case 'line':
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<line x1="' + inset + '" y1="' + cy + '" x2="' + Math.max(w - inset, inset) + '" y2="' + cy + '" stroke="' + strokeColor + '" stroke-width="' + sw + '"' + dash + ' stroke-linecap="round" /></svg>';
                case 'arrow': {
                    const headLen = Math.min(Math.max(sw * 3.5, 10), w * 0.35);
                    const headHalf = Math.max(sw * 2.2, 5);
                    const tipX = w - inset;
                    const shaftEndX = tipX - headLen;
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<line x1="' + inset + '" y1="' + cy + '" x2="' + shaftEndX + '" y2="' + cy + '" stroke="' + strokeColor + '" stroke-width="' + sw + '"' + dash + ' stroke-linecap="round" />' +
                        '<polygon points="' + tipX + ',' + cy + ' ' + shaftEndX + ',' + (cy - headHalf) + ' ' + shaftEndX + ',' + (cy + headHalf) + '" fill="' + strokeColor + '" /></svg>';
                }
                case 'divider':
                    return racikSvgOpen(w, h, gradientDefsStr) +
                        '<line x1="0" y1="' + cy + '" x2="' + w + '" y2="' + cy + '" stroke="' + strokeColor + '" stroke-width="' + sw + '"' + dash + ' stroke-linecap="round" /></svg>';
                case 'badge': {
                    const padX = p.paddingX === undefined ? 12 : p.paddingX;
                    const padY = p.paddingY === undefined ? 4 : p.paddingY;
                    const fontSize = Math.max(10, Math.min((h - padY * 2) * 0.9, 32));
                    return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:' + cssBgValue +
                        ';color:' + escapeAttr(p.textColor || '#ffffff') + ';border-radius:' + escapeAttr(String(p.radius === undefined ? 9999 : p.radius)) + 'px;padding:' + padY + 'px ' + padX +
                        'px;overflow:hidden;box-sizing:border-box;"><span style="font-size:' + fontSize + 'px;font-weight:600;white-space:nowrap;font-family:system-ui,sans-serif;line-height:1;">' +
                        escapeHtml(p.label || 'Badge') + '</span></div>';
                }
                default:
                    return '<div style="width:100%;height:100%;background:' + cssBgValue + ';"></div>';
            }
        }

        function svgPolygon(points, fill, strokeAttrs, w, h, gradientDefsStr) {
            return racikSvgOpen(w, h, gradientDefsStr || '') +
                '<polygon points="' + points + '" fill="' + fill + '"' + strokeAttrs + ' /></svg>';
        }

        // ===================== SECTION WIDTH (public page) =====================
        function defaultSectionPreset(type) {
            const map = {
                navbar: 'full',
                countdown: 'narrow',
                rsvp: 'narrow',
                schedule: 'narrow',
                ticket: 'narrow',
                map: 'narrow',
                poll: 'narrow',
                guestbook: 'narrow',
                feedback: 'narrow',
            };
            return map[type] || 'standard';
        }

        function sectionWrap(el, inner) {
            const p = el.props || {};
            const preset = p.widthPreset || defaultSectionPreset(el.type);
            const widths = { narrow: 800, standard: 1140, wide: 1400 };
            const mw = widths[preset];
            return '<div class="section-inner"' +
                (mw ? ' style="max-width:' + mw + 'px;"' : '') +
                '>' + inner + '</div>';
        }

        // ===================== NAVBAR (public page) =====================
        function renderNavbar(el) {
            const p = el.props || {};
            const bg = escapeAttr(p.bgColor || '#ffffff');
            const fg = escapeAttr(p.textColor || '#1a1a1a');
            const logoColor = escapeAttr(p.logoColor || p.textColor || '#1a1a1a');
            const height = Number(p.height) || 64;

            // Tujuan item menu: section di halaman ini, halaman lain, atau URL.
            // Item lama yang cuma punya href string tetap jalan seperti dulu.
            function navItemAttrs(item) {
                const type = item.targetType || (item.href ? 'url' : 'section');
                const id = item.targetId || '';
                let href = '#';
                if (type === 'url') {
                    href = item.href || '#';
                } else if (type === 'section' && id) {
                    href = '#el-' + id;
                }
                return ' href="' + escapeAttr(href) + '"' +
                    ' data-nav-target-type="' + escapeAttr(type) + '"' +
                    ' data-nav-target-id="' + escapeAttr(id) + '"' +
                    (type === 'url' && item.openInNewTab !== false ? ' target="_blank" rel="noopener noreferrer"' : '');
            }

            const links = (p.menuItems || []).map(item =>
                '<a class="nb-link"' + navItemAttrs(item) + ' style="color:' + fg + '">' +
                escapeHtml(item.label) + '</a>'
            ).join('');
            // Duplikasi item menu sebagai link vertikal di dalam dropdown
            const ddLinks = (p.menuItems || []).map(item =>
                '<a class="nb-dd-link"' + navItemAttrs(item) + ' style="color:' + fg + '">' +
                escapeHtml(item.label) + '</a>'
            ).join('');
            const auths = (p.authButtons || []).map(btn => {
                const primary = btn.variant === 'primary';
                return '<button type="button" class="nb-auth-btn' + (primary ? ' primary' : '') + '" style="' +
                    (primary ? '' : 'color:' + fg + ';border-color:currentColor;') + '">' +
                    escapeHtml(btn.label) + '</button>';
            }).join('');
            const ddAuths = (p.authButtons || []).length
                ? '<div class="nb-dd-auth">' + (p.authButtons || []).map(btn => {
                      const primary = btn.variant === 'primary';
                      return '<button type="button" class="nb-auth-btn' + (primary ? ' primary' : '') + '" style="' +
                          (primary ? '' : 'color:' + fg + ';border-color:currentColor;') + '">' +
                          escapeHtml(btn.label) + '</button>';
                  }).join('') + '</div>'
                : '';

            const brand = p.showLogo === false
                ? '<div class="navbar-brand" aria-hidden="true"></div>'
                : '<div class="navbar-brand" style="color:' + logoColor + '">' + escapeHtml(p.logoText || '') + '</div>';
            return '<nav class="el-navbar" style="background:' + bg + ';color:' + fg + ';height:' + height + 'px;">' +
                brand +
                '<div class="navbar-menu">' + links + '</div>' +
                '<div class="navbar-auth">' + auths + '</div>' +
                '<button type="button" class="nb-burger" aria-label="Buka menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
                '<div class="nb-dropdown" style="background:' + bg + ';color:' + fg + ';">' + ddLinks + ddAuths + '</div>' +
                '</nav>';
        }
        
        function renderCountdown(el) {
            const p = el.props || {};
            const target = new Date(p.targetDate);
            const expired = p.targetDate && !isNaN(target) && target <= new Date();
            if (expired && p.expiredText) {
                return `<div class="el-countdown" style="color:${escapeAttr(p.color || '#1a1a1a')};${baseStyle}">
                    <div class="countdown-label">${escapeHtml(p.label || '')}</div>
                    <div class="countdown-expired" style="font-size:clamp(16px,3vw,22px);font-weight:600;">${escapeHtml(p.expiredText)}</div>
                </div>`;
            }
            const allowed = p.format && p.format.length ? p.format : ['days', 'hours', 'minutes', 'seconds'];
            const units = getCountdownUnits(p.targetDate).filter(u => allowed.includes(u.key));
            return `
                <div class="el-countdown" style="color:${el.props.color};${baseStyle}">
                    <div class="countdown-label">${escapeHtml(el.props.label)}</div>
                    <div class="countdown-grid">
                        ${units.map(u => `
                            <div class="countdown-unit">
                                <span class="countdown-value">${u.value}</span>
                                <span class="countdown-unit-label">${u.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        function renderRsvp(el) {
            return `
                <div class="el-rsvp" style="${baseStyle}">
                    <h4>${escapeHtml(el.props.title)}</h4>
                    <p class="el-rsvp-sub">${escapeHtml(el.props.subtitle)}</p>
                    <div class="el-rsvp-field">Nama Lengkap</div>
                    <div class="el-rsvp-field">Email</div>
                    ${el.props.question ? `<div class="el-rsvp-question" style="margin:0.75rem 0 0.5rem;font-weight:600;">${escapeHtml(el.props.question)}</div>` : ''}
                    ${(el.props.answerOptions || []).map((opt, idx) => `
                        <label class="el-rsvp-option" style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.375rem;">
                            <input type="radio" name="rsvp-${el.id}" value="${escapeAttr(opt)}" style="width:18px;height:18px;accent-color:${escapeAttr(el.props.buttonColor || '#4f46e5')};">
                            <span>${escapeHtml(opt)}</span>
                        </label>
                    `).join('')}
                    ${el.props.showGuestCount ? '<div class="el-rsvp-field">Jumlah Tamu</div>' : ''}
                    <div class="el-rsvp-submit" style="background:${el.props.buttonColor}">${escapeHtml(el.props.buttonLabel)}</div>
                </div>
            `;
        }
        
        function renderSchedule(el) {
            return `
                <div class="el-schedule" style="${baseStyle}">
                    <h4>${escapeHtml(el.props.title)}</h4>
                    ${el.props.items.map(item => `
                        <div class="schedule-row">
                            <span class="schedule-time">${escapeHtml(item.endTime ? item.time + '–' + item.endTime : item.time)}</span>
                            <span class="schedule-desc">${escapeHtml(item.desc)}${item.speaker ? ` <em style="color:#6b7280;font-style:normal;">· ${escapeHtml(item.speaker)}</em>` : ''}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        function renderTicket(el) {
            return `
                <div class="el-ticket" style="${baseStyle}">
                    <h4>${escapeHtml(el.props.title)}</h4>
                    ${el.props.tiers.map(tier => `
                        <div class="ticket-tier">
                            <div class="ticket-tier-name">${escapeHtml(tier.name)}</div>
                            <div class="ticket-tier-price">${escapeHtml(tier.price)}</div>
                            <div class="ticket-tier-quota">Sisa ${tier.quota} kursi</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        function renderMap(el) {
            const p = el.props || {};
            const pin = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';
            const body = p.mapsUrl
                ? `<a href="${escapeAttr(p.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="color:inherit;">${escapeHtml(p.address)}</a>`
                : `<span>${escapeHtml(p.address)}</span>`;
            return `<div class="el-map" style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;${baseStyle}">${pin}${body}</div>`;
        }
        
        function renderPoll(el) {
            return `
                <div class="el-poll" style="${baseStyle}">
                    <div class="poll-question">${escapeHtml(el.props.question)}</div>
                    <div class="poll-options">
                        ${el.props.options.map((opt, idx) => `
                            <div class="poll-option">
                                <input type="radio" id="poll-${el.id}-${idx}" name="poll-${el.id}" value="${escapeHtml(opt)}" style="width:20px;height:20px;accent-color:#4f46e5;">
                                <label for="poll-${el.id}-${idx}">${escapeHtml(opt)}</label>
                            </div>
                        `).join('')}
                    </div>
                    ${el.props.showResults ? `
                        <div class="poll-results">
                            ${el.props.options.map(opt => `
                                <div class="poll-result"><span>${escapeHtml(opt)}: ${Math.round(Math.random() * 100)}%</span></div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        function renderGuestbook(el) {
            return `
                <div class="el-guestbook" style="${baseStyle}">
                    <h4>${escapeHtml(el.props.title)}</h4>
                    <textarea rows="3" placeholder="${escapeHtml(el.props.placeholder)}" readOnly style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:6px;font-family:inherit;box-sizing:border-box;min-height:100px;resize:vertical;"></textarea>
                    <button class="el-button" style="background:#4f46e5;color:#fff;border-radius:6px;width:100%;">Kirim</button>
                </div>
            `;
        }
        
        function renderFeedback(el) {
            return `
                <div class="el-feedback" style="${baseStyle}">
                    <h4>${escapeHtml(el.props.title)}</h4>
                    <div class="feedback-rating" style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center;margin-bottom:1rem;">
                        ${el.props.ratingOptions.map(option => `
                            <label class="feedback-star" style="display:flex;align-items:center;gap:0.25rem;cursor:pointer;">
                                <input type="radio" name="feedback-${el.id}" value="${option}" style="width:20px;height:20px;accent-color:#f59e0b;">
                                <<span style="font-size:1.5rem;">★</span>
                            </label>
                        `).join('')}
                    </div>
                    <textarea rows="2" placeholder="Komentar..." readOnly style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:6px;font-family:inherit;box-sizing:border-box;min-height:80px;resize:vertical;"></textarea>
                    <button class="el-button" style="background:#4f46e5;color:#fff;border-radius:6px;width:100%;">Kirim</button>
                </div>
            `;
        }
        
        function renderSponsor(el) {
            return `<div class="el-sponsor" style="display:flex;align-items:center;gap:0.5rem;${baseStyle}"><a href="${escapeHtml(el.props.url)}" target="_blank" rel="noopener" style="color:#4f46e5;text-decoration:none;font-weight:500;">${escapeHtml(el.props.name)}</a></div>`;
        }
        
        const PARTICIPANT_COLUMNS = [
            { key: 'nama', label: 'Nama' },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status' },
            { key: 'tanggal', label: 'Tanggal Daftar' },
        ];

        function participantColumns(p) {
            const chosen = (p && p.columns && p.columns.length) ? p.columns : PARTICIPANT_COLUMNS.map(c => c.key);
            return PARTICIPANT_COLUMNS.filter(c => chosen.includes(c.key));
        }

        function participantCell(pt, key) {
            if (key === 'nama') return escapeHtml(pt.user?.name || pt.data?.nama_lengkap || '-');
            if (key === 'email') return escapeHtml(pt.user?.email || pt.data?.email || '-');
            if (key === 'tanggal') return escapeHtml(pt.created_at || '-');
            const bg = pt.status === 'diterima' ? '#dcfce7' : pt.status === 'menunggu_konfirmasi' ? '#fef3c7' : '#fee2e2';
            const fg = pt.status === 'diterima' ? '#166534' : pt.status === 'menunggu_konfirmasi' ? '#92400e' : '#991b1b';
            return '<span style="padding:0.25rem 0.75rem;border-radius:9999px;font-size:11px;font-weight:600;background:' +
                bg + ';color:' + fg + ';">' + escapeHtml(pt.status) + '</span>';
        }

        function participantRows(list, p) {
            const cols = participantColumns(p);
            return list.map(pt =>
                '<tr style="border-bottom:1px solid #f3f4f6;">' +
                cols.map(c => '<td style="padding:0.75rem;">' + participantCell(pt, c.key) + '</td>').join('') +
                '</tr>'
            ).join('');
        }

        function renderParticipantList(el) {
            const p = el.props || {};
            const participants = el.participants || [];
            const count = participants.length;
            
            const colCount = participantColumns(p).length;
            let rowsHtml = '';
            if (participants.length === 0) {
                rowsHtml = '<tr><td colspan="' + colCount + '" style="padding:2rem;text-align:center;color:#9ca3af;">Belum ada peserta</td></tr>';
            } else {
                rowsHtml = participantRows(participants, p);
            }
            
            const searchHtml = p.showSearch ? `
                <input type="text" placeholder="Cari nama, email..." style="width:100%;max-width:300px;padding:0.5rem;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;margin-bottom:1rem;">
            ` : '';
            
            return `
                <div class="el-participant-list" style="${baseStyle}">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">
                        <h3 style="margin:0;font-size:clamp(18px,3vw,28px);font-weight:700;">${escapeHtml(p.title || 'Daftar Peserta')}</h3>
                        <span style="color:#6b7280;font-weight:500;">${count} peserta</span>
                    </div>
                    ${searchHtml}
                    <div style="max-height:400px;overflow:auto;border:1px solid #e5e7eb;border-radius:6px;">
                        <table style="width:100%;border-collapse:collapse;font-size:clamp(12px,2vw,14px);">
                            <thead>
                                <tr style="background:#f9fafb;position:sticky;top:0;" data-participant-head>
                                    ${participantColumns(p).map(c => `<th style="padding:0.75rem;text-align:left;border-bottom:1px solid #e5e7eb;">${escapeHtml(c.label)}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }
        
        function renderForm(el) {
            const p = el.props || {};
            const fields = p.fields || [];
            const isQuotaFull = p.quota && p.quota > 0; // Real check done via API

            // Gerbang login: selama peserta belum login Google, field form tidak
            // dirender sama sekali — diganti ajakan login. Submission butuh
            // user_id, jadi identitas harus ada lebih dulu.
            if (p.requireLogin !== false && !isLoggedIn()) {
                return '<div class="el-form el-form-locked" style="text-align:center;padding:2rem 1.5rem;border:1px solid #e5e7eb;border-radius:8px;' + baseStyle + '">' +
                    '<h3 style="margin:0 0 .5rem;font-size:1.25rem;">' + escapeHtml(p.title || 'Form Pendaftaran') + '</h3>' +
                    '<p style="margin:0 0 1.25rem;color:#6b7280;font-size:.95rem;line-height:1.5;">' +
                    escapeHtml(p.loginPrompt || 'Masuk dulu dengan Google untuk mengisi formulir pendaftaran.') + '</p>' +
                    '<a href="' + escapeAttr(RACIK.googleLoginUrl) + '" class="el-google-login" ' +
                    'style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 20px;border-radius:4px;' +
                    'background:#ffffff;color:#333333;border:1px solid #dadce0;font-size:14px;font-weight:500;text-decoration:none;">' +
                    googleGlyph() + 'Masuk dengan Google</a>' +
                    '</div>';
            }
            
            // Field catalog for rendering (inline)
            const fieldCatalog = {
                nama_lengkap: { label: 'Nama Lengkap', type: 'text' },
                nama_panggilan: { label: 'Nama Panggilan', type: 'text' },
                email: { label: 'Email', type: 'email' },
                telepon: { label: 'Nomor Telepon', type: 'tel' },
                whatsapp: { label: 'Nomor WhatsApp', type: 'tel' },
                tanggal_lahir: { label: 'Tanggal Lahir', type: 'date' },
                jenis_kelamin: { label: 'Jenis Kelamin', type: 'select', options: ['Laki-laki', 'Perempuan', 'Lainnya'] },
                foto_profil: { label: 'Foto Profil', type: 'file' },
                nik: { label: 'NIK', type: 'text' },
                nip: { label: 'NIP/NIM', type: 'text' },
                institusi: { label: 'Institusi/Perusahaan', type: 'text' },
                jabatan: { label: 'Jabatan', type: 'text' },
                jurusan: { label: 'Jurusan/Prodi', type: 'text' },
                angkatan: { label: 'Angkatan', type: 'number' },
                no_anggota: { label: 'Nomor Anggota', type: 'text' },
                alamat_lengkap: { label: 'Alamat Lengkap', type: 'textarea' },
                provinsi: { label: 'Provinsi', type: 'text' },
                kota: { label: 'Kota/Kabupaten', type: 'text' },
                kecamatan: { label: 'Kecamatan', type: 'text' },
                kelurahan: { label: 'Kelurahan/Desa', type: 'text' },
                kode_pos: { label: 'Kode Pos', type: 'text' },
                negara: { label: 'Negara', type: 'text' },
                tipe_tiket: { label: 'Tipe Tiket', type: 'select', options: ['Reguler', 'VIP', 'Early Bird', 'Student', 'Gratis'] },
                kode_undangan: { label: 'Kode Undangan', type: 'text' },
                kuota_tiket: { label: 'Jumlah Tiket', type: 'number' },
                tanggal_registrasi: { label: 'Tanggal Registrasi', type: 'datetime-local' },
                sumber_registrasi: { label: 'Sumber Registrasi', type: 'select', options: ['Website', 'Offline', 'Referral', 'Sosial Media'] },
                metode_bayar: { label: 'Metode Pembayaran', type: 'select', options: ['Transfer Bank', 'Virtual Account', 'E-Wallet', 'Kartu Kredit', 'Cash', 'Lainnya'] },
                bank_pengirim: { label: 'Bank Pengirim', type: 'text' },
                nama_rekening: { label: 'Nama Rekening', type: 'text' },
                nomor_rekening: { label: 'Nomor Rekening', type: 'text' },
                jumlah_bayar: { label: 'Jumlah Bayar', type: 'number' },
                bukti_bayar: { label: 'Bukti Pembayaran', type: 'file' },
                tanggal_bayar: { label: 'Tanggal Bayar', type: 'datetime-local' },
                kebutuhan_khusus: { label: 'Kebutuhan Khusus', type: 'textarea' },
                preferensi_makanan: { label: 'Preferensi Makanan', type: 'select', options: ['Reguler', 'Vegetarian', 'Vegan', 'Halal', 'No Seafood', 'Lainnya'] },
                ukuran_kaos: { label: 'Ukuran Kaos', type: 'select', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
                pesan_khusus: { label: 'Pesan Khusus', type: 'textarea' },
                cara_tahu_event: { label: 'Cara Mengetahui Event', type: 'select', options: ['Teman', 'Instagram', 'LinkedIn', 'Website', 'Email', 'Lainnya'] },
                setuju_syarat: { label: 'Setuju Syarat & Ketentuan', type: 'checkbox' },
                setuju_privasi: { label: 'Setuju Kebijakan Privasi', type: 'checkbox' },
                setuju_foto: { label: 'Setuju Foto/Video Diambil', type: 'checkbox' },
                setuju_promo: { label: 'Setuju Menerima Info Promo', type: 'checkbox' },
                tanda_tangan_digital: { label: 'Tanda Tangan Digital', type: 'text' },
            };
            
            let fieldsHtml = '';
            if (fields.length === 0) {
                fieldsHtml = '<p style="color:#9ca3af;font-style:italic;">Belum ada field yang dipilih.</p>';
            } else {
                fieldsHtml = fields.map(item => {
                    // Entri lama berupa string dianggap wajib, sama seperti perilaku sebelumnya.
                    const fieldKey = typeof item === 'string' ? item : (item && item.key);
                    const isRequired = typeof item === 'string' ? true : !(item && item.required === false);
                    const def = fieldCatalog[fieldKey] || { label: fieldKey, type: 'text' };
                    const required = isRequired ? ' *' : '';
                    const req = isRequired ? ' required' : '';
                    const id = `form-${el.id}-${fieldKey}`;
                    
                    if (def.type === 'checkbox') {
                        return `<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem;">
                            <input type="checkbox" id="${id}" name="${fieldKey}"${req} style="width:20px;height:20px;accent-color:${p.submitColor};">
                            <label for="${id}" style="font-weight:500;">${escapeHtml(def.label)}${required}</label>
                        </div>`;
                    }
                    
                    if (def.type === 'file') {
                        return `<div style="margin-bottom:1rem;">
                            <label for="${id}" style="display:block;font-weight:500;margin-bottom:0.375rem;">${escapeHtml(def.label)}${required}</label>
                            <input type="file" id="${id}" name="${fieldKey}"${req} accept="image/*,.pdf" style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                        </div>`;
                    }
                    
                    if (def.type === 'select' && def.options) {
                        return `<div style="margin-bottom:1rem;">
                            <label for="${id}" style="display:block;font-weight:500;margin-bottom:0.375rem;">${escapeHtml(def.label)}${required}</label>
                            <select id="${id}" name="${fieldKey}"${req} style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                                <option value="">Pilih...</option>
                                ${def.options.map(opt => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join('')}
                            </select>
                        </div>`;
                    }
                    
                    if (def.type === 'date' || def.type === 'datetime-local') {
                        return `<div style="margin-bottom:1rem;">
                            <label for="${id}" style="display:block;font-weight:500;margin-bottom:0.375rem;">${escapeHtml(def.label)}${required}</label>
                            <input type="${def.type}" id="${id}" name="${fieldKey}"${req} style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                        </div>`;
                    }
                    
                    if (def.type === 'textarea') {
                        return `<div style="margin-bottom:1rem;">
                            <label for="${id}" style="display:block;font-weight:500;margin-bottom:0.375rem;">${escapeHtml(def.label)}${required}</label>
                            <textarea id="${id}" name="${fieldKey}"${req} rows="3" style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;resize:vertical;min-height:100px;"></textarea>
                        </div>`;
                    }
                    
                    // Default text/input
                    const inputType = def.type === 'email' ? 'email' : def.type === 'tel' ? 'tel' : def.type === 'number' ? 'number' : 'text';
                    return `<div style="margin-bottom:1rem;">
                        <label for="${id}" style="display:block;font-weight:500;margin-bottom:0.375rem;">${escapeHtml(def.label)}${required}</label>
                        <input type="${inputType}" id="${id}" name="${fieldKey}"${req} placeholder="${def.type === 'email' ? 'email@example.com' : def.type === 'tel' ? '08xxxxxxxxxx' : ''}" style="width:100%;padding:0.75rem;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                    </div>`;
                }).join('');
            }
            
            const submitBtn = `<button type="submit" class="el-form-submit" style="width:100%;padding:1rem;border:none;border-radius:8px;background:${p.submitColor};color:#fff;font-weight:600;font-size:16px;cursor:pointer;">${escapeHtml(p.submitLabel || 'Daftar')}</button>`;
            const payBtn = p.payButtonLabel ? `<button type="button" class="el-form-pay" onclick="handlePayClick(this)" data-event-page="${el.dataset?.eventPageId || ''}" style="width:100%;margin-top:0.75rem;padding:1rem;border:none;border-radius:8px;background:${p.payButtonColor};color:#fff;font-weight:600;font-size:16px;cursor:pointer;">${escapeHtml(p.payButtonLabel)}</button>` : '';
            
            return `
                <form class="el-form" data-element-id="${el.id}" style="${baseStyle}">
                    <div style="margin-bottom:1.5rem;">
                        <h3 style="margin:0 0 0.5rem;font-size:clamp(18px,3vw,28px);font-weight:700;">${escapeHtml(p.title || 'Form Pendaftaran')}</h3>
                        ${p.subtitle ? `<p style="margin:0;color:#6b7280;">${escapeHtml(p.subtitle)}</p>` : ''}
                    </div>
                    ${isQuotaFull ? `<div style="padding:1rem;background:#fef2f2;border:1px solid #fecaca;border-radius:6px;color:#dc2626;font-weight:500;">Kuota pendaftaran sudah penuh.</div>` : ''}
                    ${!isQuotaFull ? `
                        <div>${fieldsHtml}</div>
                        <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:1rem;">
                            ${submitBtn}
                            ${payBtn}
                        </div>
                    ` : ''}
                </form>
            `;
        }
        
        function renderDateTime(el) {
            const p = el.props || {};
            let content = '';
            
            if (p.showDate !== false && p.date) {
                const d = new Date(p.date);
                const day = d.getDate().toString().padStart(2, '0');
                const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                const month = monthNames[d.getMonth()];
                const year = d.getFullYear();
                content += `${day} ${month} ${year}`;
            }
            
            if (p.showTime !== false && p.time) {
                if (content) content += ' | ';
                content += p.time.substring(0, 5);
            }
            
            if (!content) content = 'Tanggal & Waktu belum diatur';
            
            return `
                <div class="el-date-time" style="${baseStyle}">
                    <div style="text-align:center;color:${escapeHtml(p.color || '#1a1a1a')};font-size:clamp(14px,2.5vw,20px);font-weight:${p.fontWeight || 600};">
                        ${escapeHtml(content)}
                    </div>
                </div>
            `;
        }
        
        function renderLocationMap(el) {
            const p = el.props || {};
            const showMap = p.showMap !== false;
            const showAddress = p.showAddress !== false;
            
            let html = '<div class="el-location-map" style="' + baseStyle + '">';
            
            if (p.title) {
                html += '<h4 style="margin:0 0 0.75rem;font-size:clamp(16px,2.5vw,22px);font-weight:700;">' + escapeHtml(p.title) + '</h4>';
            }
            
            if (showAddress && p.address) {
                html += '<div class="location-address" style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.75rem;font-size:clamp(13px,2.5vw,16px);color:#374151;">';
                html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';
                html += '<span>' + escapeHtml(p.address) + '</span>';
                html += '</div>';
            }
            
            if (showMap && p.address) {
                const zoom = p.zoom || 15;
                const height = p.height || 300;
                html += '<div class="location-map" style="width:100%;height:' + height + 'px;border-radius:8px;overflow:hidden;background:#f3f4f6;">';
                html += '<iframe width="100%" height="100%" frameBorder="0" style="border:0" src="https://maps.google.com/maps?q=' + encodeURIComponent(p.address) + '&t=&z=' + zoom + '&ie=UTF8&iwloc=&output=embed" allowFullScreen title="' + escapeHtml(p.address) + '"></iframe>';
                html += '</div>';
            }
            
            html += '</div>';
            return html;
        }
        
        function renderParticipantCounter(el) {
            const p = el.props || {};
            // Angka selalu dari server (jumlah pendaftar event ini), tidak pernah manual.
            const count = (RACIK.participantCount != null) ? RACIK.participantCount : (el.participantCount || 0);
            
            let html = '<div class="el-participant-counter" style="' + baseStyle + '">';
            html += '<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;text-align:center;color:' + escapeHtml(p.color || '#1a1a1a') + ';">';
            
            if (p.showIcon) {
                html += '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style="opacity:0.5;">';
                html += '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />';
                html += '<circle cx="9" cy="7" r="4" />';
                html += '<path d="M23 21v-2a4 4 0 0 0-3-3.87" />';
                html += '<path d="M16 3.13a4 4 0 0 1 0 7.75" />';
                html += '</svg>';
            }
            
            html += '<div style="font-size:clamp(18px,5vw,28px);font-weight:' + (p.fontWeight || 700) + ';">' + count.toLocaleString('id-ID') + '</div>';
            
            const caption = p.template
                ? p.template.replace('{jumlah}', count.toLocaleString('id-ID'))
                : p.label;
            if (caption) {
                html += '<div style="font-size:clamp(12px,2vw,14px);color:#6b7280;">' + escapeHtml(caption) + '</div>';
            }
            
            html += '</div></div>';
            return html;
        }
        
        function renderGallery(el) {
            const p = el.props || {};
            const isBanner = (p.mode || 'gallery') === 'banner';
            const images = isBanner ? (p.images || []).slice(0, 1) : (p.images || []);
            const layout = isBanner ? 'full-width' : (p.layout || 'grid');
            const columns = p.columns || 3;
            const gap = p.gap || 12;
            const aspectRatio = p.aspectRatio || '4/3';
            
            let html = '<div class="el-gallery" style="' + baseStyle + '">';
            
            if (p.showTitle && p.title) {
                html += '<h3 style="margin:0 0 1rem;font-size:clamp(16px,2.5vw,22px);font-weight:700;">' + escapeHtml(p.title) + '</h3>';
            }
            
            if (images.length === 0) {
                html += '<div style="display:flex;align-items:center;justify-content:center;min-height:200;color:#9ca3af;background:#f9fafb;border-radius:8px;border:2px dashed #d1d5db;">Belum ada gambar</div>';
            } else if (layout === 'slider') {
                html += '<div style="display:flex;overflow-x:auto;gap:' + gap + 'px;width:100%;padding-bottom:10px;scroll-snap-type:x mandatory;">';
                images.forEach((img, idx) => {
                    const src = img.url || img;
                    const alt = img.alt || 'Gambar ' + (idx + 1);
                    html += '<div style="flex-shrink:0;width:300px;aspect-ratio:' + aspectRatio + ';border-radius:8px;overflow:hidden;background:#f3f4f6;scroll-snap-align:start;">';
                    html += '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" style="width:100%;height:100%;object-fit:cover;">';
                    html += '</div>';
                });
                html += '</div>';
            } else if (layout === 'full-width') {
                const src = images[0]?.url || images[0];
                const alt = images[0]?.alt || 'Banner';
                html += '<div style="width:100%;aspect-ratio:' + aspectRatio + ';border-radius:8px;overflow:hidden;background:#f3f4f6;">';
                html += '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" style="width:100%;height:100%;object-fit:cover;">';
                html += '</div>';
            } else {
                // grid
                html += '<div style="display:grid;grid-template-columns:repeat(' + columns + ',1fr);gap:' + gap + 'px;width:100%;">';
                images.forEach((img, idx) => {
                    const src = img.url || img;
                    const alt = img.alt || 'Gambar ' + (idx + 1);
                    html += '<div style="aspect-ratio:' + aspectRatio + ';border-radius:8px;overflow:hidden;background:#f3f4f6;">';
                    html += '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" style="width:100%;height:100%;object-fit:cover;">';
                    html += '</div>';
                });
                html += '</div>';
            }
            
            html += '</div>';
            return html;
        }
        
        function renderEventSidebar(el) {
            const p = el.props || {};
            const items = p.items || [];
            const activeColor = p.activeColor || '#4f46e5';
            const textColor = p.textColor || '#1a1a1a';
            const bgColor = p.bgColor || '#ffffff';
            
            const align = (p.position === 'right') ? 'margin-left:auto;' : 'margin-right:auto;';
            let html = '<nav class="el-event-sidebar" style="' + baseStyle + ';background:' + escapeHtml(bgColor) + ';border-radius:8px;padding:1rem;width:100%;' + align + '">';
            
            if (p.title) {
                html += '<h4 style="margin:0 0 1rem;font-size:clamp(14px,2.5vw,18px);font-weight:700;color:' + escapeHtml(textColor) + ';">' + escapeHtml(p.title) + '</h4>';
            }
            
            html += '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem;">';
            items.forEach((item) => {
                const type = item.targetType || (item.pageId ? 'page' : item.href ? 'url' : 'section');
                const id = item.targetId || item.pageId || '';
                const clickable = type === 'url' ? !!item.href : !!id;
                html += '<li>';
                html += '<a href="' + escapeAttr(type === 'url' ? (item.href || '#') : (type === 'section' && id ? '#el-' + id : '#')) + '"' +
                    ' data-nav-target-type="' + escapeAttr(type) + '" data-nav-target-id="' + escapeAttr(id) + '"' +
                    ' style="display:block;width:100%;text-align:left;padding:0.75rem 1rem;color:' + escapeHtml(textColor) +
                    ';font-size:clamp(13px,2.5vw,16px);font-weight:500;border-radius:6px;text-decoration:none;cursor:' +
                    (clickable ? 'pointer' : 'default') + ';">' + escapeHtml(item.label) + '</a>';
                html += '</li>';
            });
            html += '</ul></nav>';
            return html;
        }
        
        function renderLinkButton(el) {
            const p = el.props || {};
            const href = escapeAttr(p.href || '#');
            const target = p.openInNewTab !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
            return '<a class="el-link-button" href="' + href + '"' + target + ' style="display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;border-radius:' + (p.radius || 8) + 'px;background:' + escapeHtml(p.bgColor || '#4f46e5') + ';color:' + escapeHtml(p.textColor || '#ffffff') + ';font-size:' + (p.fontSize || 14) + 'px;font-weight:' + (p.fontWeight || 500) + ';text-decoration:none;text-align:center;' + baseStyle + '">' + escapeHtml(p.label) + '</a>';
        }
        
        function googleGlyph() {
            return '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
                '<path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/>' +
                '<path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z" fill="#34A853"/>' +
                '<path d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" fill="#FBBC05"/>' +
                '<path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>' +
                '</svg>';
        }

        // Tombol Daftar Sekarang — tujuan scroll disimpan di data-scroll-target;
        // handler klik global yang mengurus lompatannya.
        function renderRegisterButton(el) {
            const p = el.props || {};
            const target = p.targetFormId ? ' data-scroll-target="' + escapeAttr(p.targetFormId) + '"' : ' data-scroll-target=""';
            return '<button type="button" class="el-register-button"' + target +
                ' style="display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;border:none;border-radius:' + (p.radius || 8) + 'px;' +
                'background:' + escapeAttr(p.bgColor || '#4f46e5') + ';color:' + escapeAttr(p.textColor || '#ffffff') + ';' +
                'font-size:' + (p.fontSize || 15) + 'px;font-weight:' + (p.fontWeight || 600) + ';cursor:pointer;text-align:center;' + baseStyle + '">' +
                escapeHtml(p.label || 'Daftar Sekarang') + '</button>';
        }

        // Tombol Bayar — tampilannya bergantung status submission peserta.
        function renderPayButton(el) {
            const p = el.props || {};
            const status = RACIK.submission ? RACIK.submission.status : null;
            const amountText = (p.showAmount !== false) ? formatAmount(p.currency, p.amount) : '';
            const amountHtml = amountText
                ? '<p class="el-pay-amount" style="margin:0 0 6px;font-size:18px;font-weight:700;color:#111827;">' + escapeHtml(amountText) + '</p>'
                : '';
            const instruction = p.instruction
                ? '<p class="el-pay-instruction" style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#4b5563;">' + escapeHtml(p.instruction) + '</p>'
                : '';

            let inner;
            if (!isLoggedIn()) {
                inner = '<a href="' + escapeAttr(RACIK.googleLoginUrl) + '" class="el-pay-button is-locked" style="' + payBtnStyle(p, '#6b7280') + ';text-decoration:none;">' +
                    'Masuk dulu untuk membayar</a>';
            } else if (!RACIK.submission) {
                inner = '<button type="button" class="el-pay-button is-locked" disabled style="' + payBtnStyle(p, '#9ca3af') + ';cursor:not-allowed;">' +
                    'Daftar dulu sebelum membayar</button>';
            } else if (status === 'diterima') {
                inner = '<span class="el-pay-button is-confirmed" style="' + payBtnStyle(p, '#047857') + '">' +
                    escapeHtml(p.confirmedLabel || 'Pembayaran terkonfirmasi') + '</span>';
            } else if (status === 'menunggu_konfirmasi') {
                inner = '<span class="el-pay-button is-pending" style="' + payBtnStyle(p, '#b45309') + '">' +
                    escapeHtml(p.pendingLabel || 'Menunggu konfirmasi panitia') + '</span>';
            } else {
                inner = '<button type="button" class="el-pay-button" data-pay-claim style="' + payBtnStyle(p, p.bgColor || '#059669') + ';cursor:pointer;">' +
                    escapeHtml(p.label || 'Saya Sudah Bayar') + '</button>';
            }

            return '<div class="el-pay-wrap" style="' + baseStyle + '">' + amountHtml + instruction + inner + '</div>';
        }

        // Format nominal ala Indonesia: "Rp 150.000". Nol/kosong -> string kosong.
        function formatAmount(currency, amount) {
            const n = Number(amount);
            if (!n || n <= 0) return '';
            return (currency || 'Rp') + ' ' + n.toLocaleString('id-ID');
        }

        function payBtnStyle(p, bg) {
            return 'display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;border:none;border-radius:' +
                (p.radius || 8) + 'px;background:' + escapeAttr(bg) + ';color:' + escapeAttr(p.textColor || '#ffffff') +
                ';font-size:' + (p.fontSize || 15) + 'px;font-weight:' + (p.fontWeight || 600) + ';text-align:center';
        }

        function getCountdownUnits(targetDate) {
            const target = new Date(targetDate);
            if (!targetDate || isNaN(target)) {
                return [
                    { key: 'days', label: 'Hari', value: '00' },
                    { key: 'hours', label: 'Jam', value: '00' },
                    { key: 'minutes', label: 'Menit', value: '00' },
                    { key: 'seconds', label: 'Detik', value: '00' },
                ];
            }
            let diff = Math.max(0, target - new Date());
            const days = Math.floor(diff / 86400000);
            diff -= days * 86400000;
            const hours = Math.floor(diff / 3600000);
            diff -= hours * 3600000;
            const minutes = Math.floor(diff / 60000);
            diff -= minutes * 60000;
            const seconds = Math.floor(diff / 1000);
            const pad = (n) => String(n).padStart(2, '0');
            return [
                { key: 'days', label: 'Hari', value: pad(days) },
                { key: 'hours', label: 'Jam', value: pad(hours) },
                { key: 'minutes', label: 'Menit', value: pad(minutes) },
                { key: 'seconds', label: 'Detik', value: pad(seconds) },
            ];
        }
    </script>
</body>
</html>
