import { useEffect, useMemo, useState } from "react";
import {
    ANIMATION_CATEGORIES,
    ANIMATION_PRESETS,
    ANIMATION_TRIGGERS,
    animationRuntimeStyle,
    resolveAnimationSettings,
} from "./AnimationPresets";

function IconChevronLeftSmall() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}

function IconPlaySmall() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    );
}

const DEVICE_STAGE_WIDTH = {
    mobile: 200,
    tablet: 260,
    desktop: 320,
};

/**
 * Representasi ringan objek terpilih di dalam panggung pratinjau. Tujuannya
 * memperlihatkan animasi yang SEBENARNYA berjalan pada bentuk yang mendekati
 * objek asli — bukan mereplikasi renderEventElement() persis (itu terikat ke
 * banyak state kanvas lain), cukup representatif: teks pakai kontennya
 * sendiri, gambar pakai src aslinya, sisanya kartu berwarna/berlabel.
 */
function PreviewObject({ el }) {
    const p = el.props || {};
    const t = el.type;

    if (t === "text") {
        return (
            <div
                style={{
                    fontSize: Math.min(Number(p.fontSize) || 22, 26),
                    fontWeight: p.fontWeight || 600,
                    color: p.color || "#111827",
                    textAlign: "center",
                    maxWidth: 180,
                    wordBreak: "break-word",
                }}
            >
                {p.content || "Contoh Teks"}
            </div>
        );
    }

    if (t === "image" && p.src) {
        return (
            <img
                src={p.src}
                alt=""
                style={{
                    width: 100,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,.12)",
                }}
            />
        );
    }

    const bg = p.bgColor || p.color || "#4f46e5";
    const label = p.label || p.title || el.name || t;
    return (
        <div
            style={{
                minWidth: 96,
                padding: "12px 18px",
                borderRadius: p.radius ?? 10,
                background: bg,
                color: p.textColor || "#ffffff",
                fontSize: 12,
                fontWeight: 600,
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,.12)",
            }}
        >
            {label}
        </div>
    );
}

/**
 * Panel dedicated Animasi. Ditampilkan MENGGANTIKAN body normal
 * ObjectPropertyPanel (bukan modal, bukan route terpisah) — sama persis
 * mekanisme "sidebar kiri, ganti konten" yang sudah dipakai panel properti
 * lain di builder ini. `onBack` mengembalikan ke panel properti objek.
 */
export default function AnimationPanel({ el, onUpdateProps, onBack, devicePreview = "desktop" }) {
    const p = el.props || {};
    const settings = resolveAnimationSettings(p);
    const [activeCategory, setActiveCategory] = useState(
        settings.preset.category || ANIMATION_CATEGORIES[0].key,
    );
    const [replayKey, setReplayKey] = useState(0);
    const [awaitingClick, setAwaitingClick] = useState(settings.trigger === "click");

    const visiblePresets = useMemo(
        () => ANIMATION_PRESETS.filter((a) => a.category === activeCategory),
        [activeCategory],
    );

    const replay = () => setReplayKey((k) => k + 1);

    // Putar ulang otomatis kapan pun preset/durasi/delay/infinite berubah —
    // KECUALI trigger "klik", yang harus menunggu interaksi supaya EO benar-
    // benar melihat perilaku sesuai pilihannya, bukan langsung autoplay.
    useEffect(() => {
        if (settings.trigger === "click") {
            setAwaitingClick(true);
            return;
        }
        replay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.key, settings.duration, settings.delay, settings.infinite, settings.trigger]);

    const stageWidth = DEVICE_STAGE_WIDTH[devicePreview] || DEVICE_STAGE_WIDTH.desktop;
    const runtimeStyle = settings.key === "none" ? {} : animationRuntimeStyle(p);
    const isPlayable = settings.key !== "none";

    const handleStageClick = () => {
        if (settings.trigger !== "click") return;
        setAwaitingClick(false);
        replay();
    };

    return (
        <div className="anim-panel">
            <button type="button" className="anim-panel-back" onClick={onBack}>
                <IconChevronLeftSmall />
                <span>Animasi</span>
            </button>

            {/* ===== Panggung pratinjau ===== */}
            <div className="ctl-box anim-stage-box">
                <div
                    className={"anim-stage" + (settings.trigger === "click" && awaitingClick ? " is-waiting" : "")}
                    style={{ width: "100%", maxWidth: stageWidth, height: 140 }}
                    onClick={handleStageClick}
                >
                    {isPlayable ? (
                        <div
                            key={`${replayKey}-${settings.key}`}
                            className="anim-stage-object"
                            style={
                                settings.trigger === "click" && awaitingClick
                                    ? {}
                                    : runtimeStyle
                            }
                        >
                            <PreviewObject el={el} />
                        </div>
                    ) : (
                        <div className="anim-stage-object">
                            <PreviewObject el={el} />
                        </div>
                    )}
                    {settings.trigger === "click" && awaitingClick && isPlayable && (
                        <div className="anim-stage-hint">
                            <IconPlaySmall /> Klik untuk memutar
                        </div>
                    )}
                </div>
                <div className="anim-stage-footer">
                    <span className="anim-stage-caption">
                        {devicePreview === "mobile" && "Pratinjau — tampilan Mobile"}
                        {devicePreview === "tablet" && "Pratinjau — tampilan Tablet"}
                        {devicePreview === "desktop" && "Pratinjau — tampilan Desktop"}
                    </span>
                    <button type="button" className="ctl-action" onClick={replay} disabled={!isPlayable}>
                        <IconPlaySmall /><span>Putar Ulang</span>
                    </button>
                </div>
            </div>

            {/* ===== Kategori + daftar preset ===== */}
            <div className="ctl-box">
                <div className="anim-category-tabs">
                    {ANIMATION_CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            type="button"
                            className={"anim-category-tab" + (activeCategory === cat.key ? " active" : "")}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="anim-preset-grid">
                    <button
                        type="button"
                        className={"anim-preset-btn" + (settings.key === "none" ? " active" : "")}
                        onClick={() => onUpdateProps({ animation: "none" })}
                    >
                        Tanpa Animasi
                    </button>
                    {visiblePresets.map((preset) => (
                        <button
                            key={preset.key}
                            type="button"
                            className={"anim-preset-btn" + (settings.key === preset.key ? " active" : "")}
                            onClick={() => onUpdateProps({ animation: preset.key })}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== Pengaturan ===== */}
            {isPlayable && (
                <div className="ctl-box">
                    <p className="ctl-box-title">Pengaturan</p>

                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.infinite}
                                onChange={(e) => onUpdateProps({ animInfinite: e.target.checked })}
                            />
                            Putar berulang (infinite)
                        </label>
                    </div>

                    <PropRow label="Durasi per siklus">
                        <input
                            type="number"
                            min={0.1}
                            max={10}
                            step={0.1}
                            value={settings.duration}
                            onChange={(e) =>
                                onUpdateProps({ animDuration: Math.max(0.1, Number(e.target.value) || 0.1) })
                            }
                        />
                        <span className="anim-unit">detik</span>
                    </PropRow>

                    <PropRow label="Jeda sebelum mulai">
                        <input
                            type="number"
                            min={0}
                            max={10}
                            step={0.1}
                            value={settings.delay}
                            onChange={(e) =>
                                onUpdateProps({ animDelay: Math.max(0, Number(e.target.value) || 0) })
                            }
                        />
                        <span className="anim-unit">detik</span>
                    </PropRow>

                    <PropRow label="Mulai animasi">
                        <select
                            value={settings.trigger}
                            onChange={(e) => onUpdateProps({ animTrigger: e.target.value })}
                        >
                            {ANIMATION_TRIGGERS.map((tr) => (
                                <option key={tr.key} value={tr.key}>{tr.label}</option>
                            ))}
                        </select>
                    </PropRow>
                    <p className="anim-trigger-hint">
                        {settings.trigger === "scroll" &&
                            "Di halaman event yang sebenarnya, animasi baru main saat objek ini tergulir masuk ke layar pengunjung."}
                        {settings.trigger === "load" &&
                            "Animasi main begitu halaman event selesai dimuat, tanpa menunggu di-scroll."}
                        {settings.trigger === "click" &&
                            "Animasi main setiap kali pengunjung mengklik objek ini di halaman event."}
                    </p>
                </div>
            )}
        </div>
    );
}

function PropRow({ label, children }) {
    return (
        <div className="ctl-row anim-prop-row">
            <span className="anim-prop-label">{label}</span>
            <div className="anim-prop-control">{children}</div>
        </div>
    );
}
