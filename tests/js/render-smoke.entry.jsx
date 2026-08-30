// Smoke test SSR: render SEMUA tipe komponen lewat ElementRenderer.
// Dibangun dengan `vite build --ssr` lalu dijalankan via node.
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Shim minimal untuk deps yang menyentuh window/document saat di-import di Node
if (typeof globalThis.window === "undefined") {
    globalThis.window = globalThis;
    try {
        globalThis.navigator = globalThis.navigator || { userAgent: "node" };
    } catch (e) {
        // Node >= 21 punya navigator bawaan read-only — aman diabaikan
    }
}

const { ElementRenderer } = await import(
    "../../resources/js/components/Builder/EventBuilder.jsx"
);
const { EVENT_COMPONENTS, EVENT_DEFAULT_PROPS } = await import(
    "../../resources/js/components/Builder/EventElements.jsx"
);

const BASIC = {
    text: { content: "Halo", fontSize: 24, color: "#111", fontWeight: "600" },
    title: { content: "Judul", fontSize: 42, color: "#111", fontWeight: "700", lineHeight: 1.2, textAlign: "left" },
    subtitle: { content: "Subjudul", fontSize: 22, color: "#374151", fontWeight: "600", lineHeight: 1.3, textAlign: "left" },
    link: {
        content: "Kunjungi", fontSize: 16, color: "#3b82f6", fontWeight: "500",
        linkType: "external", linkTarget: "https://contoh.com", openInNewTab: true, hoverColor: "#2563eb",
    },
    button: { label: "Klik", bgColor: "#4f46e5", textColor: "#fff", radius: 8 },
    image: { src: "https://placehold.co/40x30", alt: "gambar" },
    video: { src: "https://www.youtube.com/embed/x", alt: "video" },
    rectangle: { bgColor: "#e5e7eb", radius: 4 },
    "rounded-rectangle": { bgColor: "#e5e7eb", radius: 16 },
    circle: { bgColor: "#e5e7eb", radius: 9999 },
    triangle: { bgColor: "#e5e7eb" },
    diamond: { bgColor: "#e5e7eb" },
    pentagon: { bgColor: "#e5e7eb" },
    hexagon: { bgColor: "#e5e7eb" },
    polygon: { bgColor: "#e5e7eb", sides: 6 },
    star: { bgColor: "#f59e0b", points: 5 },
    heart: { bgColor: "#ef4444" },
    "speech-bubble": { bgColor: "#3b82f6" },
    blob: { bgColor: "#8b5cf6" },
    line: { strokeColor: "#6b7280", strokeWidth: 2, strokeDasharray: "none" },
    arrow: { strokeColor: "#6b7280", strokeWidth: 2, strokeDasharray: "none" },
    divider: { strokeColor: "#d1d5db", strokeWidth: 1, strokeDasharray: "none", fullWidth: true },
    badge: { bgColor: "#4f46e5", textColor: "#ffffff", label: "Badge", radius: 9999, paddingX: 12, paddingY: 4 },
};

const makeEl = (type, props, extra = {}) => ({
    id: "el_" + type,
    type,
    name: type,
    xPct: 10,
    yPct: 10,
    widthPct: 20,
    heightPct: 15,
    visible: true,
    props: JSON.parse(JSON.stringify(props)),
    tablet: {},
    mobile: {},
    autoLocked: { tablet: true, mobile: true },
    ...extra,
});

const cases = [];
for (const [type, props] of Object.entries(BASIC)) cases.push(makeEl(type, props));
for (const comp of EVENT_COMPONENTS) {
    const props = EVENT_DEFAULT_PROPS[comp.type] || {};
    const el = makeEl(comp.type, props);
    if (comp.type === "container") {
        el.children = [
            makeEl("text", BASIC.text),
            makeEl("button", BASIC.button),
        ];
    }
    cases.push(el);
}

let pass = 0;
let fail = 0;
for (const el of cases) {
    for (const isPreview of [false, true]) {
        try {
            const html = renderToStaticMarkup(
                React.createElement(ElementRenderer, {
                    el,
                    now: new Date(),
                    isPreview,
                    devicePreview: "desktop",
                }),
            );
            if (typeof html !== "string" || html.length === 0) throw new Error("markup kosong");
            pass++;
        } catch (err) {
            fail++;
            console.error(`FAIL: ${el.type} (isPreview=${isPreview}) -> ${err.message}`);
        }
    }
}

// ===== NAVBAR RESPONSIVE =====
function check(cond, msg) {
    if (cond) { pass++; console.log("OK: " + msg); }
    else { fail++; console.error("FAIL: " + msg); }
}
const navProps = JSON.parse(JSON.stringify(EVENT_DEFAULT_PROPS.navbar || {}));
const renderNav = (props, device) =>
    renderToStaticMarkup(
        React.createElement(ElementRenderer, {
            el: makeEl("navbar", props),
            now: new Date(),
            isPreview: false,
            devicePreview: device || "desktop",
        }),
    );

const d = renderNav(navProps);
check(d.includes("navbar-menu") && d.includes("navbar-auth"), "navbar desktop: menu + auth tampil horizontal");
check(!d.includes("nb-burger"), "navbar desktop: hamburger tidak muncul");

const c = renderNav({ ...navProps, collapsed: true });
check(c.includes("nb-burger"), "navbar collapsed: hamburger muncul");
check(!c.includes('class="navbar-menu"'), "navbar collapsed: menu utama disembunyikan");

const t = renderNav(navProps, "tablet");
check(t.includes("nb-burger"), "navbar tablet (auto-responsive): collapse ke hamburger");

const m = renderNav(navProps, "mobile");
check(m.includes("nb-burger"), "navbar mobile (auto-responsive): collapse ke hamburger");

// ===== SECTION WIDTH PRESETS =====
const secWrapCount = (html) => (html.match(/class="section-inner"/g) || []).length;

const contHtml = renderToStaticMarkup(
    React.createElement(ElementRenderer, {
        el: makeEl("container", EVENT_DEFAULT_PROPS.container, {
            children: [makeEl("button", BASIC.button)],
        }),
        now: new Date(),
        isPreview: false,
        devicePreview: "desktop",
    }),
);
check(secWrapCount(contHtml) === 1 && contHtml.includes("max-width:1140px"), "container: dibungkus section-inner default Standar (1140px)");

const cdHtml = renderToStaticMarkup(
    React.createElement(ElementRenderer, { el: makeEl("countdown", EVENT_DEFAULT_PROPS.countdown), now: new Date(), isPreview: false, devicePreview: "desktop" }),
);
check(cdHtml.includes("max-width:800px"), "countdown: default Sempit (800px)");

const fullNav = renderToStaticMarkup(
    React.createElement(ElementRenderer, { el: makeEl("navbar", navProps), now: new Date(), isPreview: false, devicePreview: "desktop" }),
);
check(!fullNav.includes("section-inner"), "navbar: TIDAK dibungkus section-inner");

const wideCont = renderToStaticMarkup(
    React.createElement(ElementRenderer, {
        el: makeEl("container", { ...EVENT_DEFAULT_PROPS.container, widthPreset: "wide" }),
        now: new Date(), isPreview: false, devicePreview: "desktop",
    }),
);
check(wideCont.includes("max-width:1600px"), "override manual: preset Lebar (1600px)");

const fullCont = renderToStaticMarkup(
    React.createElement(ElementRenderer, {
        el: makeEl("container", { ...EVENT_DEFAULT_PROPS.container, widthPreset: "full" }),
        now: new Date(), isPreview: false, devicePreview: "desktop",
    }),
);
check(fullCont.includes("max-width:none"), "preset Penuh Layar: max-width none");

const titleHtml = renderToStaticMarkup(
    React.createElement(ElementRenderer, { el: makeEl("title", { content: "Judul", fontSize: 42 }), now: new Date(), isPreview: false, devicePreview: "desktop" }),
);
check(titleHtml.includes("max-width:800px"), "title: default Sempit");

const plainText = renderToStaticMarkup(
    React.createElement(ElementRenderer, { el: makeEl("text", BASIC.text), now: new Date(), isPreview: false, devicePreview: "desktop" }),
);
check(!plainText.includes("section-inner"), "teks biasa: tidak dibungkus section-inner");

console.log(`\nTOTAL: ${pass} render | PASS: ${pass} | FAIL: ${fail}`);
if (fail > 0) process.exitCode = 1;
