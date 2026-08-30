import { useEffect, useMemo, useRef, useState } from "react";
import { FONT_CATALOG, FONT_CATEGORIES, findFontByValue } from "./FontCatalog";

function IconChevronDown() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

/**
 * Pemilih font untuk objek teks (Teks/Judul/Sub-judul/Tautan) — 214 font,
 * dikelompokkan 5 kategori, bisa dicari. Menggantikan <select> polos lama
 * yang cuma memuat 10 font; dengan 200+ opsi, cari + kategori jauh lebih
 * cepat dipakai daripada scroll <select> panjang.
 *
 * Ditempel LANGSUNG di panel properti (buka/tutup inline di tempat), bukan
 * modal, konsisten dengan AnimationPanel/GradientColorField di file
 * sebelah.
 */
export default function FontPicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");
    const rootRef = useRef(null);

    // Tutup saat klik di luar panel -- dengan 214 opsi, membiarkannya
    // terbuka sampai user memilih sesuatu (satu-satunya cara tutup
    // sebelumnya) terasa seperti jebakan.
    useEffect(() => {
        if (!open) return;
        function handleOutside(e) {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [open]);

    const current = findFontByValue(value);
    const currentLabel = current ? current.name : "Font default";
    const currentFamily = value || "inherit";

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        return FONT_CATALOG.filter((f) => {
            const matchesCategory = category === "Semua" || f.category === category;
            const matchesSearch = term === "" || f.name.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });
    }, [search, category]);

    const pick = (font) => {
        onChange(font ? font.value : undefined);
        setOpen(false);
        setSearch("");
    };

    return (
        <div className="font-picker" ref={rootRef}>
            <button
                type="button"
                className="font-picker-trigger"
                onClick={() => setOpen((o) => !o)}
            >
                <span className="font-picker-trigger-label" style={{ fontFamily: currentFamily }}>
                    {currentLabel}
                </span>
                <IconChevronDown />
            </button>

            {open && (
                <div className="font-picker-panel">
                    <input
                        type="text"
                        className="font-picker-search"
                        placeholder="Cari font..."
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setOpen(false);
                        }}
                    />

                    <div className="font-picker-categories">
                        {FONT_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={"font-picker-cat" + (category === cat ? " active" : "")}
                                onClick={() => setCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <p className="font-picker-count">{filtered.length} font ditemukan</p>

                    <div className="font-picker-list">
                        <button
                            type="button"
                            className={"font-picker-item" + (!current ? " active" : "")}
                            onClick={() => pick(null)}
                        >
                            Font default
                        </button>
                        {filtered.map((f) => (
                            <button
                                key={f.name}
                                type="button"
                                className={"font-picker-item" + (value === f.value ? " active" : "")}
                                style={{ fontFamily: f.value }}
                                onClick={() => pick(f)}
                            >
                                {f.name}
                            </button>
                        ))}
                        {filtered.length === 0 && (
                            <p className="font-picker-empty">Tidak ada font yang cocok.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
