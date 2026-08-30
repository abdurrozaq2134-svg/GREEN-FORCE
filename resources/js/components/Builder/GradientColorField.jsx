import { useState } from "react";

/**
 * Warna latar/isi objek disimpan di dua field yang saling sinkron:
 *   bgColor    : string hex -- dipertahankan untuk kompatibilitas mundur
 *                (usedColors, kode lain yang membaca fp.bgColor langsung)
 *   background : { type: "solid", color } | { type: "gradient", angle, stops }
 *                sumber kebenaran BARU begitu EO menyentuh field ini.
 *
 * Elemen lama yang cuma punya bgColor (belum pernah menyentuh gradient
 * picker) tidak punya `background` sama sekali -- resolveBackgroundFill()
 * di bawah menganggapnya solid dari bgColor, sama seperti perilaku sebelum
 * fitur ini ada.
 */
export function resolveBackgroundFill(props, fallbackColor = "#4b5563") {
    const bg = props?.background;
    if (bg && bg.type === "gradient" && Array.isArray(bg.stops) && bg.stops.length >= 2) {
        return {
            mode: "gradient",
            angle: Number.isFinite(bg.angle) ? bg.angle : 135,
            stops: bg.stops.map((s, i) => ({
                color: s.color || fallbackColor,
                position: Number.isFinite(s.position) ? s.position : (i / (bg.stops.length - 1)) * 100,
            })),
        };
    }
    return { mode: "solid", color: bg?.color || props?.bgColor || fallbackColor };
}

/** CSS `linear-gradient(...)` string, dipakai elemen yang backgroundnya CSS biasa. */
export function cssGradientString(angle, stops) {
    const stopsCss = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
    return `linear-gradient(${angle}deg, ${stopsCss})`;
}

/**
 * Titik awal/akhir garis gradient dalam koordinat piksel (userSpaceOnUse),
 * mereplikasi aturan "magic corners" CSS linear-gradient supaya arah &
 * jangkauannya sama persis di kotak non-persegi (bukan cuma dikira-kira).
 *
 *   panjang garis = |lebar * sin(sudut)| + |tinggi * cos(sudut)|
 *
 * Rumus ini yang membuat sudut 0deg selalu "ke atas" dan sudut yang sama
 * terlihat identik dengan versi CSS-nya, apa pun rasio lebar:tinggi kotak.
 */
export function svgGradientLine(angleDeg, w, h) {
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.sin(rad);
    const dy = -Math.cos(rad);
    const length = Math.abs(w * dx) + Math.abs(h * dy);
    const half = length / 2;
    const cx = w / 2;
    const cy = h / 2;
    return {
        x1: cx - dx * half,
        y1: cy - dy * half,
        x2: cx + dx * half,
        y2: cy + dy * half,
    };
}

const PALETTE = ["#4f6b1c", "#7ED957", "#7F77DD", "#D4537E", "#F5A623", "#4B9FE1", "#E14B4B", "#1A1F17"];

function nextStopColor(existing) {
    const used = new Set(existing.map((s) => s.color));
    return PALETTE.find((c) => !used.has(c)) || PALETTE[existing.length % PALETTE.length];
}

/** Sebar ulang posisi tiap stop merata 0..100%, urutan tetap dipertahankan. */
function evenlySpace(stops) {
    if (stops.length === 1) return [{ ...stops[0], position: 0 }];
    return stops.map((s, i) => ({ ...s, position: Math.round((i / (stops.length - 1)) * 100) }));
}

/**
 * Field warna latar terpadu: Solid / Gradient, ditempel LANGSUNG di panel
 * properti objek (bukan panel/popover terpisah) -- sesuai spesifikasi.
 * Gradient mendukung sebanyak apa pun warna (tombol "+ Tambah Warna"),
 * posisinya disebar rata otomatis supaya EO cukup mikirin warna & sudut.
 */
export default function GradientColorField({ props, onUpdateProps, fallbackColor = "#4b5563" }) {
    const resolved = resolveBackgroundFill(props, fallbackColor);
    const [mode, setMode] = useState(resolved.mode);

    const commit = (background) => {
        // bgColor tetap disinkronkan (warna pertama saat gradient) supaya
        // kode lain yang masih membaca fp.bgColor langsung (mis. riwayat
        // "warna dipakai") tetap dapat nilai yang masuk akal.
        const flatColor = background.type === "gradient" ? background.stops[0].color : background.color;
        onUpdateProps({ background, bgColor: flatColor });
    };

    const switchMode = (nextMode) => {
        setMode(nextMode);
        if (nextMode === "solid") {
            commit({ type: "solid", color: resolved.mode === "gradient" ? resolved.stops[0].color : resolved.color });
        } else {
            const baseColor = resolved.mode === "solid" ? resolved.color : PALETTE[0];
            commit({
                type: "gradient",
                angle: 135,
                stops: [
                    { color: baseColor, position: 0 },
                    { color: nextStopColor([{ color: baseColor }]), position: 100 },
                ],
            });
        }
    };

    if (mode === "solid") {
        return (
            <div className="grad-field">
                <ModeToggle mode={mode} onChange={switchMode} />
                <div className="grad-solid-row">
                    <input
                        type="color"
                        value={resolved.color}
                        onChange={(e) => commit({ type: "solid", color: e.target.value })}
                    />
                    <span className="ctl-value mono">{resolved.color.toUpperCase()}</span>
                </div>
            </div>
        );
    }

    const { angle, stops } = resolved;
    const preview = cssGradientString(angle, stops);

    const updateStopColor = (idx, color) => {
        const next = stops.map((s, i) => (i === idx ? { ...s, color } : s));
        commit({ type: "gradient", angle, stops: next });
    };

    const addStop = () => {
        const withNew = evenlySpace([...stops, { color: nextStopColor(stops) }]);
        commit({ type: "gradient", angle, stops: withNew });
    };

    const removeStop = (idx) => {
        if (stops.length <= 2) return; // minimal 2 warna supaya tetap gradient
        const withoutIdx = evenlySpace(stops.filter((_, i) => i !== idx));
        commit({ type: "gradient", angle, stops: withoutIdx });
    };

    const updateAngle = (nextAngle) => {
        commit({ type: "gradient", angle: nextAngle, stops });
    };

    return (
        <div className="grad-field">
            <ModeToggle mode={mode} onChange={switchMode} />

            <div className="grad-preview" style={{ background: preview }} />

            <div className="grad-stops">
                {stops.map((s, idx) => (
                    <div className="grad-stop-row" key={idx}>
                        <input
                            type="color"
                            value={s.color}
                            onChange={(e) => updateStopColor(idx, e.target.value)}
                        />
                        <span className="ctl-value mono">{s.color.toUpperCase()}</span>
                        <button
                            type="button"
                            className="grad-stop-remove"
                            title="Hapus warna ini"
                            onClick={() => removeStop(idx)}
                            disabled={stops.length <= 2}
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button type="button" className="btn-add-row" onClick={addStop}>
                    + Tambah Warna
                </button>
            </div>

            <div className="grad-angle-row">
                <span className="anim-prop-label">Sudut</span>
                <input
                    type="range"
                    min={0}
                    max={360}
                    value={angle}
                    onChange={(e) => updateAngle(Number(e.target.value))}
                />
                <span className="ctl-value">{angle}°</span>
            </div>
        </div>
    );
}

function ModeToggle({ mode, onChange }) {
    return (
        <div className="grad-mode-toggle">
            <button
                type="button"
                className={"grad-mode-btn" + (mode === "solid" ? " active" : "")}
                onClick={() => onChange("solid")}
            >
                Warna Polos
            </button>
            <button
                type="button"
                className={"grad-mode-btn" + (mode === "gradient" ? " active" : "")}
                onClick={() => onChange("gradient")}
            >
                Gradient
            </button>
        </div>
    );
}
