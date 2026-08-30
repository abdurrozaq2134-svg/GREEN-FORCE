/**
 * Katalog animasi — referensi murni, terpisah dari data objek.
 *
 * Objek di kanvas hanya menyimpan (di el.props):
 *   animation      : key preset ini (mis. "fade"), "none" = tanpa animasi
 *   animInfinite   : boolean — looping terus atau sekali jalan
 *   animDelay      : detik, jeda sebelum animasi mulai
 *   animDuration   : detik, lama satu siklus (opsional — fallback ke
 *                    defaultDurationMs preset kalau objek belum mengisinya)
 *   animTrigger    : "scroll" | "load" | "click"
 *
 * @keyframes yang dipakai preset di sini didefinisikan di dua tempat yang
 * harus tetap identik:
 *   - resources/css/builder.css       (kanvas builder + panel Animasi)
 *   - resources/views/builder/public.blade.php (halaman publik/live)
 * Keduanya cuma butuh NAMA keyframe yang sama; parameter (durasi, delay,
 * infinite) selalu dipasang lewat inline style saat runtime, bukan dibakar
 * ke dalam aturan CSS, supaya bisa berbeda per objek.
 */

export const ANIMATION_CATEGORIES = [
    { key: "entrance", label: "Masuk" },
    { key: "attention", label: "Perhatian" },
    { key: "exit", label: "Keluar" },
];

export const ANIMATION_PRESETS = [
    { key: "none", label: "Tanpa Animasi", category: null, keyframe: null, defaultDurationMs: 0 },

    // ---- Masuk (Entrance) ----
    { key: "fade", label: "Fade In", category: "entrance", keyframe: "racikFade", defaultDurationMs: 600 },
    { key: "slide-up", label: "Slide Up", category: "entrance", keyframe: "racikSlideUp", defaultDurationMs: 600 },
    { key: "slide-down", label: "Slide Down", category: "entrance", keyframe: "racikSlideDown", defaultDurationMs: 600 },
    { key: "slide-left", label: "Slide dari Kanan", category: "entrance", keyframe: "racikSlideLeft", defaultDurationMs: 600 },
    { key: "slide-right", label: "Slide dari Kiri", category: "entrance", keyframe: "racikSlideRight", defaultDurationMs: 600 },
    { key: "zoom", label: "Zoom In", category: "entrance", keyframe: "racikZoom", defaultDurationMs: 550 },
    { key: "bounce", label: "Bounce In", category: "entrance", keyframe: "racikBounce", defaultDurationMs: 800 },
    { key: "pop", label: "Pop", category: "entrance", keyframe: "racikPop", defaultDurationMs: 500 },
    { key: "flip", label: "Flip In", category: "entrance", keyframe: "racikFlip", defaultDurationMs: 700 },
    { key: "rotate-in", label: "Rotate In", category: "entrance", keyframe: "racikRotateIn", defaultDurationMs: 700 },

    // ---- Perhatian (Attention) ----
    { key: "pulse", label: "Pulse", category: "attention", keyframe: "racikPulse", defaultDurationMs: 900 },
    { key: "shake", label: "Shake", category: "attention", keyframe: "racikShake", defaultDurationMs: 700 },
    { key: "wobble", label: "Wobble", category: "attention", keyframe: "racikWobble", defaultDurationMs: 900 },
    { key: "tada", label: "Tada", category: "attention", keyframe: "racikTada", defaultDurationMs: 900 },
    { key: "heartbeat", label: "Heartbeat", category: "attention", keyframe: "racikHeartbeat", defaultDurationMs: 1000 },
    { key: "flash", label: "Flash", category: "attention", keyframe: "racikFlash", defaultDurationMs: 900 },

    // ---- Keluar (Exit) ----
    { key: "fade-out", label: "Fade Out", category: "exit", keyframe: "racikFadeOut", defaultDurationMs: 500 },
    { key: "slide-out-up", label: "Slide Keluar Atas", category: "exit", keyframe: "racikSlideOutUp", defaultDurationMs: 500 },
    { key: "slide-out-down", label: "Slide Keluar Bawah", category: "exit", keyframe: "racikSlideOutDown", defaultDurationMs: 500 },
    { key: "zoom-out", label: "Zoom Out", category: "exit", keyframe: "racikZoomOut", defaultDurationMs: 500 },
    { key: "shrink", label: "Shrink", category: "exit", keyframe: "racikShrink", defaultDurationMs: 450 },

    // ---- Alias lama (tidak tampil di grid pilihan: category null) ----
    // Sebelum katalog ini diperluas, satu-satunya "Slide In" memakai
    // transform identik dengan "slide-down" sekarang. Dipetakan ke keyframe
    // yang sama supaya event lama yang menyimpan animation:"slide" tidak
    // mendadak jadi tanpa animasi.
    { key: "slide", label: "Slide In", category: null, keyframe: "racikSlideDown", defaultDurationMs: 600 },
];

export const ANIMATION_TRIGGERS = [
    { key: "scroll", label: "Saat tergulir masuk layar" },
    { key: "load", label: "Saat halaman dimuat" },
    { key: "click", label: "Saat objek diklik" },
];

export function findAnimationPreset(key) {
    return ANIMATION_PRESETS.find((a) => a.key === key) || ANIMATION_PRESETS[0];
}

/**
 * Nilai efektif animasi sebuah objek dengan fallback yang aman untuk objek
 * lama (event yang sudah tersimpan sebelum field delay/durasi/infinite/
 * trigger ada) — hasilnya identik dengan perilaku sebelum fitur ini dibuat:
 * sekali jalan, tanpa delay, durasi bawaan preset, trigger "scroll".
 */
export function resolveAnimationSettings(props) {
    const key = props?.animation || "none";
    const preset = findAnimationPreset(key);
    const rawDuration = Number(props?.animDuration);
    const rawDelay = Number(props?.animDelay);

    return {
        key,
        preset,
        infinite: !!props?.animInfinite,
        delay: Number.isFinite(rawDelay) && rawDelay > 0 ? rawDelay : 0,
        duration:
            Number.isFinite(rawDuration) && rawDuration > 0
                ? rawDuration
                : (preset.defaultDurationMs || 600) / 1000,
        trigger: props?.animTrigger || "scroll",
    };
}

/** Style inline siap-pakai untuk elemen yang animasinya SEDANG diputar. */
export function animationRuntimeStyle(props) {
    const s = resolveAnimationSettings(props);
    if (s.key === "none" || !s.preset.keyframe) return {};
    return {
        animationName: s.preset.keyframe,
        animationDuration: `${s.duration}s`,
        animationDelay: `${s.delay}s`,
        animationIterationCount: s.infinite ? "infinite" : 1,
        animationTimingFunction: "ease-out",
        animationFillMode: s.infinite ? "none" : "both",
    };
}
