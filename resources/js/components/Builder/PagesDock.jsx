import React, { useEffect, useRef, useState } from "react";

// Ukuran desain thumbnail (canvas referensi) & lebar jendela thumb (dari CSS)
const THUMB_W = 136;
const STAGE_W = 1200;
const STAGE_H = 680;

/**
 * Dock halaman di bawah layar builder.
 *
 * Props:
 * - leftOffset      : lebar sidebar kiri aktif (px) -> padding-left dinamis
 * - pages           : array halaman { id, name, elements }
 * - activePageId    : id halaman aktif
 * - onSelect(id)    : pindah halaman
 * - onAdd()         : tambah halaman baru
 * - onRename(id,name): rename halaman (double-click nama / Enter)
 * - onRequestDelete(id): minta konfirmasi hapus (dialog di parent)
 * - renderThumb(el) : renderer elemen untuk mini-preview (opsional)
 */
export default function PagesDock({
    leftOffset = 60,
    pages = [],
    activePageId = null,
    onSelect,
    onAdd,
    onRename,
    onDuplicate,
    onToggleMode,
    onRequestDelete,
    renderThumb,
}) {
    const [renamingId, setRenamingId] = useState(null);
    const [draftName, setDraftName] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (renamingId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [renamingId]);

    const startRename = (page) => {
        setDraftName(page.name || "");
        setRenamingId(page.id);
    };

    const commitRename = () => {
        if (renamingId && draftName.trim()) {
            onRename?.(renamingId, draftName);
        }
        setRenamingId(null);
    };

    const scale = THUMB_W / STAGE_W;

    return (
        <div
            className="builder-pages-dock"
            style={{ paddingLeft: Math.max(leftOffset, 60) + 16 }}
        >
            {pages.map((page, i) => {
                const active = page.id === activePageId;
                const isAdmin = page.mode === "admin";
                const els = (page.elements || []).filter(
                    (el) => el.visible !== false,
                );
                return (
                    <div
                        key={page.id}
                        className={"page-card" + (active ? " active" : "")}
                        role="button"
                        tabIndex={0}
                        aria-current={active ? "true" : undefined}
                        title={"Beralih ke " + (page.name || "Halaman")}
                        onClick={() => {
                            if (!active) onSelect?.(page.id);
                        }}
                        onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && !active) {
                                e.preventDefault();
                                onSelect?.(page.id);
                            }
                        }}
                    >
                        <div
                            className="page-thumb-window"
                            style={{
                                height: Math.round(STAGE_H * scale),
                            }}
                        >
                            <div
                                className="page-thumb-stage"
                                style={{
                                    width: STAGE_W,
                                    height: STAGE_H,
                                    transform: "scale(" + scale + ")",
                                }}
                            >
                                {els.map((el) => (
                                    <div
                                        key={el.id}
                                        style={{
                                            position: "absolute",
                                            left: el.x || 0,
                                            top: el.y || 0,
                                            width: el.width || 0,
                                            height: el.height || 0,
                                            opacity:
                                                typeof el.props?.opacity ===
                                                "number"
                                                    ? el.props.opacity
                                                    : 1,
                                        }}
                                    >
                                        {renderThumb ? renderThumb(el) : null}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="page-card-meta">
                            <span className="page-num">{i + 1}</span>
                            {renamingId === page.id ? (
                                <input
                                    ref={inputRef}
                                    className="page-card-input"
                                    value={draftName}
                                    maxLength={60}
                                    onChange={(e) =>
                                        setDraftName(e.target.value)
                                    }
                                    onBlur={commitRename}
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => {
                                        e.stopPropagation();
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            commitRename();
                                        } else if (e.key === "Escape") {
                                            setRenamingId(null);
                                        }
                                    }}
                                />
                            ) : (
                                <span
                                    className="page-name"
                                    title="Klik dua kali untuk rename"
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        startRename(page);
                                    }}
                                >
                                    {page.name || "Halaman"}
                                </span>
                            )}
                            <button
                                type="button"
                                className={"page-mode-badge " + (isAdmin ? "mode-admin" : "mode-participant")}
                                title={`Mode: ${isAdmin ? "Admin" : "Peserta"}. Klik untuk beralih mode.`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleMode?.(page.id);
                                }}
                            >
                                {isAdmin ? "Admin" : "Peserta"}
                            </button>
                        </div>

                        <div className="page-card-actions">
                            <button
                                type="button"
                                className="page-card-btn page-card-dup"
                                title="Duplikasi halaman"
                                aria-label={"Duplikasi " + (page.name || "halaman")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDuplicate?.(page.id);
                                }}
                            >
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            </button>

                            {pages.length > 1 && (
                                <button
                                    type="button"
                                    className="page-card-btn page-card-delete"
                                    title="Hapus halaman"
                                    aria-label={
                                        "Hapus " + (page.name || "halaman")
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRequestDelete?.(page.id);
                                    }}
                                >
                                    <svg
                                        width="10"
                                        height="10"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    >
                                        <path d="M6 6l12 12M18 6L6 18" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            <button
                type="button"
                className="page-card page-card-add"
                onClick={() => onAdd?.()}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Tambah Halaman</span>
            </button>
        </div>
    );
}
