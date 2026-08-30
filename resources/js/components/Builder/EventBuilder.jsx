import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useReducer,
} from "react";
import { Rnd } from "react-rnd";
import "../../../css/builder.css";

import {
    EVENT_COMPONENTS,
    EVENT_DEFAULT_PROPS,
    EVENT_SIZES,
    renderEventElement,
    wrapElementWithLink,
    EventPropertiesPanel,
    resolveScopeForNew,
    isElementVisibleInMode,
    elementScope,
    isScopeLocked,
    PARTICIPANT_LOCKED_TYPES,
    getEventMeta,
    IconEvent,
    SectionInner,
    SECTION_WIDTH_PRESETS,
    defaultWidthPresetFor,
    isSectionType,
} from "./EventElements";

import EventSidebar from "./EventSidebar";
import PagesDock from "./PagesDock";

// ===================== IKON DASAR (defined first for use in component arrays) =====================
function IconText() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
    );
}
function IconImage() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
        </svg>
    );
}
function IconVideo() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
    );
}
function IconShape() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
    );
}
function IconRectangle() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="1" />
        </svg>
    );
}
function IconRoundedRectangle() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="6" />
        </svg>
    );
}
function IconCircle() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
        </svg>
    );
}
function IconTriangle() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L22 20H2Z" />
        </svg>
    );
}
function IconDiamond() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L22 12L12 22L2 12Z" />
        </svg>
    );
}
function IconPentagon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L20.9 7.5 18.4 18.5 5.6 18.5 3.1 7.5Z" />
        </svg>
    );
}
function IconHexagon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
    );
}
function IconPolygon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        </svg>
    );
}
function IconStar() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        </svg>
    );
}
function IconHeart() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
    );
}
function IconSpeechBubble() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
    );
}
function IconBlob() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C7 2 3.7 5.5 3 10c-.5 4 3 8 9 8 6 0 9.5-4 9-8C20.3 5.5 17 2 12 2z" />
        </svg>
    );
}
function IconDivider() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
        </svg>
    );
}
function IconBadge() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 18a5 5 0 00-10 0M7 7h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z" />
        </svg>
    );
}
function IconGoogleLogin() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z" fill="#34A853"/>
            <path d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" fill="#FBBC05"/>
            <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
    );
}
function IconChevronLeft() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}
function IconChevronRight() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}
function IconMonitor() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    );
}
function IconTablet() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}
function IconMobile() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}
function IconUser() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

// Validation icons
function IconValidate() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function IconCheckCircle() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function IconWarning() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

function IconError() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    );
}

// ===================== BASIC COMPONENT CATEGORIES =====================
const TEXT_COMPONENTS = [
    { type: "text", label: "Teks", icon: <IconText /> },
    { type: "link", label: "Tautan", icon: <IconLinkText /> },
];

function IconGlobe() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

function IconLinkText() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

// Shape categories for organized panel display
const SHAPE_CATEGORIES = [
    {
        id: "basic",
        label: "Bentuk Dasar",
        shapes: [
            { type: "rectangle", label: "Persegi Panjang", icon: <IconRectangle /> },
            { type: "rounded-rectangle", label: "Persegi Panjang Membulat", icon: <IconRoundedRectangle /> },
            { type: "circle", label: "Lingkaran/Oval", icon: <IconCircle /> },
            { type: "triangle", label: "Segitiga", icon: <IconTriangle /> },
        ],
    },
    {
        id: "polygons",
        label: "Poligon",
        shapes: [
            { type: "diamond", label: "Diamond/Belah Ketupat", icon: <IconDiamond /> },
            { type: "pentagon", label: "Pentagon", icon: <IconPentagon /> },
            { type: "hexagon", label: "Hexagon", icon: <IconHexagon /> },
            { type: "polygon", label: "Poligon Custom", icon: <IconPolygon /> },
        ],
    },
    {
        id: "decorative",
        label: "Dekoratif",
        shapes: [
            { type: "star", label: "Bintang", icon: <IconStar /> },
            { type: "heart", label: "Hati", icon: <IconHeart /> },
            { type: "speech-bubble", label: "Speech Bubble", icon: <IconSpeechBubble /> },
            { type: "blob", label: "Blob", icon: <IconBlob /> },
        ],
    },
    {
        id: "functional",
        label: "Fungsional",
        shapes: [
            { type: "divider", label: "Divider", icon: <IconDivider /> },
            { type: "badge", label: "Badge/Pill", icon: <IconBadge /> },
        ],
    },
];

// Flattened list for ALL_BASIC_COMPONENTS and type lookups
const SHAPE_COMPONENTS = SHAPE_CATEGORIES.flatMap((cat) => cat.shapes);

const UPLOAD_COMPONENTS = [
    { type: "image", label: "Gambar", icon: <IconImage /> },
    { type: "video", label: "Video", icon: <IconVideo /> },
    { type: "google-login", label: "Tombol Google", icon: <IconGoogleLogin /> },
];

const ALL_BASIC_COMPONENTS = [...TEXT_COMPONENTS, ...SHAPE_COMPONENTS, ...UPLOAD_COMPONENTS];

// ===================== DEFAULT PROPS (basic only) =====================
function defaultPropsFor(type) {
const defaults = {
        text: {
            content: "Teks baru",
            fontSize: 24,
            color: "#1a1a1a",
            fontWeight: "600",
            isLink: false,
            linkUrl: "",
            linkTarget: "",
            openInNewTab: true,
        },
        title: { widthPreset: "narrow", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        subtitle: { widthPreset: "narrow", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        image: { src: "https://placehold.co/400x300?text=Gambar", alt: "Gambar", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        video: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "Video", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        button: {
            label: "Klik di sini",
            bgColor: "#4f46e5",
            textColor: "#ffffff",
            radius: 8,
            isLink: false,
            linkUrl: "",
            linkTarget: "",
            openInNewTab: true,
        },
        // Link type
        link: {
            content: "Teks tautan",
            fontSize: 16,
            color: "#3b82f6",
            fontWeight: "500",
            textDecoration: "underline",
            linkType: "external", // "internal" | "external"
            linkTarget: "", // page id for internal, URL for external
            openInNewTab: true,
            hoverColor: "#2563eb",
        },
        // Basic shapes (filled)
        rectangle: { bgColor: "#4b5563", radius: 4, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        "rounded-rectangle": { bgColor: "#4b5563", radius: 16, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        circle: { bgColor: "#4b5563", radius: 9999, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        triangle: { bgColor: "#4b5563", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        diamond: { bgColor: "#4b5563", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        pentagon: { bgColor: "#4b5563", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        hexagon: { bgColor: "#4b5563", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        polygon: { bgColor: "#4b5563", sides: 6, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        star: { bgColor: "#4b5563", points: 5, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        heart: { bgColor: "#4b5563", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        "speech-bubble": { bgColor: "#4b5563", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        blob: { bgColor: "#4b5563", isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        // Functional
        divider: { strokeColor: "#d1d5db", strokeWidth: 1, strokeDasharray: "none", fullWidth: true, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        badge: { bgColor: "#4f46e5", textColor: "#ffffff", label: "Badge", radius: 9999, paddingX: 12, paddingY: 4, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
        "google-login": { label: "Masuk dengan Google", bgColor: "#ffffff", textColor: "#333333", borderColor: "#dadce0", radius: 4, isLink: false, linkUrl: "", linkTarget: "", openInNewTab: true },
    };
    return type in EVENT_DEFAULT_PROPS
        ? JSON.parse(JSON.stringify(EVENT_DEFAULT_PROPS[type]))
        : JSON.parse(JSON.stringify(defaults[type] || {}));
}

// ===================== DEFAULT SIZES (basic + event) =====================
function defaultSizeFor(type) {
    const basicSizes = {
        text: { width: 300, height: 40 },
        image: { width: 300, height: 200 },
        video: { width: 400, height: 225 },
        button: { width: 160, height: 44 },
        link: { width: 200, height: 40 },
        // Basic shapes - roughly square
        rectangle: { width: 160, height: 100 },
        "rounded-rectangle": { width: 160, height: 100 },
        circle: { width: 120, height: 120 },
        triangle: { width: 120, height: 120 },
        diamond: { width: 120, height: 120 },
        pentagon: { width: 120, height: 120 },
        hexagon: { width: 120, height: 120 },
        polygon: { width: 120, height: 120 },
        star: { width: 120, height: 120 },
        heart: { width: 120, height: 120 },
        "speech-bubble": { width: 160, height: 100 },
        blob: { width: 140, height: 140 },
        // Functional
        divider: { width: 1200, height: 2 },
        badge: { width: 100, height: 36 },
        "google-login": { width: 220, height: 44 },
    };
    return basicSizes[type] || EVENT_SIZES[type] || { width: 200, height: 100 };
}

// ===================== COMPONENT META =====================
function getComponentMeta(type) {
    const basic = ALL_BASIC_COMPONENTS.find((c) => c.type === type);
    if (basic) return basic;
    return getEventMeta(type);
}

const ALL_EVENT_TYPES = EVENT_COMPONENTS.map((c) => c.type);

// ===================== DEVICE PREVIEW BREAKPOINTS =====================
const BASE_CANVAS_WIDTH = 1200; // Desktop breakpoint - all % values are relative to this
const DEVICE_BREAKPOINTS = {
    desktop: { width: 1200, label: "Desktop", icon: <IconMonitor /> },
    tablet: { width: 768, label: "Tablet", icon: <IconTablet /> },
    mobile: { width: 390, label: "Mobile", icon: <IconMobile /> },
};

// ===================== AUTO-RESPONSIVE SYSTEM =====================

// Element type categories for responsive rules
const RESPONSIVE_TYPE_CATEGORIES = {
    title: "title",
    subtitle: "title",
    text: "text",
    link: "text",
    container: "container",
    navbar: "navbar",
    image: "image",
    buttonGroup: "buttonGroup",
    pillGroup: "pillGroup",
    button: "button",
    countdown: "text",
    rsvp: "container",
    schedule: "container",
    map: "text",
    form: "container",
    "participant-list": "container",
    "date-time": "text",
    "location-map": "container",
    "participant-counter": "text",
    "gallery": "container",
    "event-sidebar": "container",
    "google-login": "button",
    // Basic shapes (filled)
    rectangle: "shape",
    "rounded-rectangle": "shape",
    circle: "shape",
    triangle: "shape",
    diamond: "shape",
    pentagon: "shape",
    hexagon: "shape",
    polygon: "shape",
    star: "shape",
    heart: "shape",
    "speech-bubble": "shape",
    blob: "shape",
    // Functional
    divider: "shape",
    badge: "shape",
    shape: "shape",
    video: "image",
};

// Default auto-locked state for new elements
function getDefaultAutoLocked() {
    return { tablet: true, mobile: true };
}

// Apply auto-responsive rules based on element type and breakpoint
function applyAutoResponsive(desktopProps, type, breakpoint) {
    const category = RESPONSIVE_TYPE_CATEGORIES[type] || "text";
    const result = { ...desktopProps };

    if (breakpoint === "tablet") {
        switch (category) {
            case "title":
                if (result.fontSize) result.fontSize = Math.round(result.fontSize * 0.75);
                result.textAlign = "center";
                result.maxLines = Math.min(result.maxLines || 3, 3);
                break;
            case "text":
                if (result.fontSize) result.fontSize = Math.round(result.fontSize * 0.9);
                break;
            case "container":
                if (result.gap) result.gap = Math.round(result.gap * 0.7);
                break;
            case "image":
                result.scale = 0.7;
                break;
            case "buttonGroup":
                if (result.gap) result.gap = Math.round(result.gap * 0.7);
                break;
            case "navbar":
                // Hamburger menu di tablet & mobile (dirender oleh NavbarElement)
                result.collapsed = true;
                break;
            case "pillGroup":
                result.wrap = true;
                break;
            case "button":
                if (result.fontSize) result.fontSize = Math.round(result.fontSize * 0.9);
                break;
        }
    } else if (breakpoint === "mobile") {
        switch (category) {
            case "title":
                if (result.fontSize) result.fontSize = Math.round(result.fontSize * 0.5);
                result.textAlign = "center";
                result.maxWidth = "100%";
                result.maxLines = 3;
                break;
            case "text":
                if (result.fontSize) result.fontSize = Math.round(result.fontSize * 0.85);
                break;
            case "container":
                if (result.flexDirection === "row") {
                    result.flexDirection = "column";
                    result.alignItems = "center";
                }
                if (result.gap) result.gap = Math.round(result.gap * 0.5);
                break;
            case "image":
                result.scale = 0.4;
                result.renderOrder = "last"; // Render after text & buttons
                break;
            case "buttonGroup":
                result.flexDirection = "column";
                result.buttonWidth = "100%";
                result.gap = 12;
                break;
            case "navbar":
                result.collapsed = true; // Always hamburger on mobile
                break;
            case "pillGroup":
                result.wrap = true;
                result.columns = 1; // Stack vertically or 2 cols if short
                break;
            case "button":
                result.width = "100%";
                if (result.fontSize) result.fontSize = Math.max(16, Math.round(result.fontSize * 0.9));
                break;
        }
    }

    return result;
}

// Merge desktop props with breakpoint-specific overrides
function getResponsiveProps(element, breakpoint) {
    if (breakpoint === "desktop") return element.props || {};

    const autoLocked = element.autoLocked?.[breakpoint] ?? true;
    const override = element[breakpoint] || {};

    if (autoLocked) {
        // Auto-compute from desktop
        return applyAutoResponsive(element.props || {}, element.type, breakpoint);
    } else {
        // Use manual override (merge with desktop for missing props)
        return { ...applyAutoResponsive(element.props || {}, element.type, breakpoint), ...override };
    }
}

// Ensure element has responsive structure
function ensureResponsiveFields(el) {
    if (el.tablet !== undefined && el.mobile !== undefined && el.autoLocked !== undefined) {
        // Also ensure percent fields
        if (el.xPct !== undefined) return el;
        return {
            ...el,
            xPct: pxToPct(el.x || 0),
            yPct: pxToPct(el.y || 0),
            widthPct: pxToPct(el.width || 0),
            heightPct: el.height ? pxToPct(el.height) : undefined,
        };
    }
    return {
        ...el,
        tablet: {},
        mobile: {},
        autoLocked: getDefaultAutoLocked(),
        xPct: el.xPct !== undefined ? el.xPct : pxToPct(el.x || 0),
        yPct: el.yPct !== undefined ? el.yPct : pxToPct(el.y || 0),
        widthPct: el.widthPct !== undefined ? el.widthPct : pxToPct(el.width || 0),
        heightPct: el.heightPct !== undefined ? el.heightPct : (el.height ? pxToPct(el.height) : undefined),
    };
}

// Get effective props for current preview mode
function getEffectiveProps(element, devicePreview) {
    if (devicePreview === "desktop") return element.props || {};

    const breakpoint = devicePreview; // "tablet" or "mobile"
    const autoLocked = element.autoLocked?.[breakpoint] ?? true;
    const override = element[breakpoint] || {};

    if (autoLocked) {
        return applyAutoResponsive(element.props || {}, element.type, breakpoint);
    } else {
        // Merge override with auto-computed for any missing props
        const auto = applyAutoResponsive(element.props || {}, element.type, breakpoint);
        return { ...auto, ...override };
    }
}

// Handle manual override when user edits in tablet/mobile mode
function handleResponsiveOverride(element, devicePreview, propKey, newValue) {
    if (devicePreview === "desktop") return newValue;

    // Mark as manually edited (unlock)
    const newAutoLocked = { ...element.autoLocked, [devicePreview]: false };
    const newBreakpointProps = { ...element[devicePreview], [propKey]: newValue };

    return { autoLocked: newAutoLocked, breakpointProps: newBreakpointProps };
}

// Reset to auto for a specific breakpoint
function resetToAuto(element, breakpoint) {
    return {
        ...element,
        [breakpoint]: {},
        autoLocked: { ...element.autoLocked, [breakpoint]: true },
    };
}

// Compile CSS with media queries for publish/preview
function compileResponsiveCSS(elements) {
    let css = "";

    elements.forEach((el) => {
        const id = el.id;
        const desktopProps = el.props || {};
        const tabletProps = getEffectiveProps(el, "tablet");
        const mobileProps = getEffectiveProps(el, "mobile");

        css += `.element-${id} {\n`;

        // Base/desktop styles
        if (desktopProps.fontSize) {
            const mobileFontSize = mobileProps.fontSize || desktopProps.fontSize;
            const tabletFontSize = tabletProps.fontSize || desktopProps.fontSize;
            css += `  font-size: clamp(${mobileFontSize}px, ${Math.round((tabletFontSize - mobileFontSize) / 2 + mobileFontSize)}vw, ${desktopProps.fontSize}px);\n`;
        }
        if (desktopProps.color) css += `  color: ${desktopProps.color};\n`;
        if (desktopProps.fontWeight) css += `  font-weight: ${desktopProps.fontWeight};\n`;
        if (desktopProps.textAlign) css += `  text-align: ${desktopProps.textAlign};\n`;
        if (desktopProps.lineHeight) css += `  line-height: ${desktopProps.lineHeight};\n`;

        // Layout
        if (desktopProps.flexDirection) css += `  display: flex; flex-direction: ${desktopProps.flexDirection};\n`;
        if (desktopProps.gap) css += `  gap: ${desktopProps.gap}px;\n`;
        if (desktopProps.alignItems) css += `  align-items: ${desktopProps.alignItems};\n`;
        if (desktopProps.justifyContent) css += `  justify-content: ${desktopProps.justifyContent};\n`;
        if (desktopProps.padding) css += `  padding: ${desktopProps.padding}px;\n`;
        if (desktopProps.bgColor && desktopProps.bgColor !== "transparent") css += `  background-color: ${desktopProps.bgColor};\n`;
        if (desktopProps.borderRadius) css += `  border-radius: ${desktopProps.borderRadius}px;\n`;

        css += `}\n\n`;

        // Tablet media query
        css += `@media (max-width: 1024px) {\n  .element-${id} {\n`;
        if (tabletProps.fontSize && tabletProps.fontSize !== desktopProps.fontSize) {
            const mobileFontSize = mobileProps.fontSize || tabletProps.fontSize;
            css += `    font-size: clamp(${mobileFontSize}px, ${Math.round((tabletProps.fontSize - mobileFontSize) / 2 + mobileFontSize)}vw, ${tabletProps.fontSize}px);\n`;
        }
        if (tabletProps.textAlign && tabletProps.textAlign !== desktopProps.textAlign) css += `    text-align: ${tabletProps.textAlign};\n`;
        if (tabletProps.flexDirection && tabletProps.flexDirection !== desktopProps.flexDirection) css += `    flex-direction: ${tabletProps.flexDirection};\n`;
        if (tabletProps.gap !== undefined && tabletProps.gap !== desktopProps.gap) css += `    gap: ${tabletProps.gap}px;\n`;
        if (tabletProps.alignItems && tabletProps.alignItems !== desktopProps.alignItems) css += `    align-items: ${tabletProps.alignItems};\n`;
        if (tabletProps.maxWidth) css += `    max-width: ${tabletProps.maxWidth};\n`;
        if (tabletProps.collapsed) css += `    /* Navbar collapsed - handled by JS */\n`;
        css += `  }\n}\n\n`;

        // Mobile media query
        css += `@media (max-width: 768px) {\n  .element-${id} {\n`;
        if (mobileProps.fontSize && mobileProps.fontSize !== desktopProps.fontSize) {
            css += `    font-size: ${mobileProps.fontSize}px;\n`;
        }
        if (mobileProps.textAlign && mobileProps.textAlign !== desktopProps.textAlign) css += `    text-align: ${mobileProps.textAlign};\n`;
        if (mobileProps.flexDirection && mobileProps.flexDirection !== desktopProps.flexDirection) css += `    flex-direction: ${mobileProps.flexDirection};\n`;
        if (mobileProps.gap !== undefined && mobileProps.gap !== desktopProps.gap) css += `    gap: ${mobileProps.gap}px;\n`;
        if (mobileProps.alignItems && mobileProps.alignItems !== desktopProps.alignItems) css += `    align-items: ${mobileProps.alignItems};\n`;
        if (mobileProps.maxWidth) css += `    max-width: ${mobileProps.maxWidth};\n`;
        if (mobileProps.buttonWidth) css += `    width: ${mobileProps.buttonWidth};\n`;
        if (mobileProps.collapsed) css += `    /* Navbar collapsed - handled by JS */\n`;
        if (mobileProps.renderOrder === "last") css += `    order: 999;\n`;
        css += `  }\n}\n\n`;
    });

    return css;
}

// Validation warnings before publish
function validateResponsiveLayout(elements) {
    const warnings = [];

    elements.forEach((el) => {
        const mobileProps = getEffectiveProps(el, "mobile");
        const tabletProps = getEffectiveProps(el, "tablet");

        // Check image overlap with button/text on mobile
        if (el.type === "image" && mobileProps.renderOrder === "last") {
            // This is a warning, not blocking
            warnings.push({
                type: "warning",
                elementId: el.id,
                message: `Gambar "${el.name}" dipindahkan ke bawah di mobile untuk menghindari overlap dengan CTA`,
            });
        }

        // Check text overflow at 320px
        if ((el.type === "text" || el.type === "title" || el.type === "subtitle") && mobileProps.fontSize) {
            const approxCharsPerLine = Math.floor(320 / (mobileProps.fontSize * 0.6));
            const textLength = (el.props.content || "").length;
            const estimatedLines = Math.ceil(textLength / approxCharsPerLine);
            if (estimatedLines > (mobileProps.maxLines || 3)) {
                warnings.push({
                    type: "warning",
                    elementId: el.id,
                    message: `Teks "${el.name}" mungkin overflow di layar 320px (perkiraan ${estimatedLines} baris)`,
                });
            }
        }

        // Check buttonGroup width on mobile
        if (el.type === "buttonGroup" && mobileProps.flexDirection === "column") {
            const buttonCount = (el.props.buttons || []).length;
            if (buttonCount > 3) {
                warnings.push({
                    type: "warning",
                    elementId: el.id,
                    message: `Grup tombol "${el.name}" memiliki ${buttonCount} tombol di mobile - pertimbangkan mengurangi`,
                });
            }
        }

        // Check navbar collapse
        if (el.type === "navbar" && !mobileProps.collapsed) {
            warnings.push({
                type: "warning",
                elementId: el.id,
                message: `Navbar "${el.name}" seharusnya collapse ke hamburger di mobile`,
            });
        }
    });

    return warnings;
}

// Helper: convert absolute px to percentage (relative to BASE_CANVAS_WIDTH)
// base opsional: pemanggil drag/resize mengirim lebar canvas AKTUAL saat drop
function pxToPct(value, base = BASE_CANVAS_WIDTH) {
    return Math.round((value / base) * 10000) / 100; // 2 decimal places
}

// Deteksi jenis media upload dari MIME type sebenarnya (+ fallback ekstensi),
// bukan berasumsi semua upload adalah gambar.
// Konversi daftar efek (shadow/border/blur) menjadi CSS untuk wrapper elemen
export function fxToCss(effects) {
    if (!Array.isArray(effects)) return {};
    const filter = [];
    const shadows = [];
    for (const f of effects) {
        if (!f || !f.type) continue;
        if (f.type === "shadow") {
            shadows.push(
                `${Number(f.offsetX) || 0}px ${Number(f.offsetY) || 4}px ${Number(f.blur) || 8}px ${f.color || "rgba(0,0,0,.35)"}`,
            );
        } else if (f.type === "border") {
            shadows.push(`0 0 0 ${Number(f.width) || 2}px ${f.color || "#111111"}`);
        } else if (f.type === "blur") {
            filter.push(`blur(${Number(f.radius) || 0}px)`);
        }
    }
    const css = {};
    if (filter.length) css.filter = filter.join(" ");
    if (shadows.length) css.boxShadow = shadows.join(", ");
    return css;
}
export function detectUploadType(file) {
    const mime = (file.type || "").toLowerCase();
    if (mime.startsWith("video/")) return "video"; // video/mp4, video/webm, video/quicktime, dst
    if (mime.startsWith("image/")) return "image"; // image/png, image/jpeg, image/webp, dst
    if (/\.(mp4|webm|mov|m4v|ogv|avi|mkv)$/i.test(file.name || ""))
        return "video";
    return "image";
}

// Helper: convert percentage to absolute px for current canvas width
function pctToPx(pct, canvasWidth) {
    return Math.round((pct / 100) * canvasWidth);
}

// Helper: ensure element has percentage fields, migrate if needed
function ensurePercentFields(el) {
    if (el.xPct !== undefined) return el; // already migrated
    return {
        ...el,
        xPct: pxToPct(el.x || 0),
        yPct: pxToPct(el.y || 0),
        widthPct: pxToPct(el.width || 0),
        heightPct: el.height ? pxToPct(el.height) : undefined,
    };
}

// Helper: compute absolute pixel values for current canvas width
function computeAbsoluteValues(el, canvasWidth) {
    const abs = {
        x: pctToPx(el.xPct || 0, canvasWidth),
        y: pctToPx(el.yPct || 0, canvasWidth),
        width: pctToPx(el.widthPct || 0, canvasWidth),
    };
    if (el.heightPct !== undefined) {
        abs.height = pctToPx(el.heightPct, canvasWidth);
    } else if (el.height !== undefined) {
        abs.height = el.height; // fallback for old elements without heightPct
    }
    return abs;
}

// Satu baris tautan di modal Publish: label, tombol salin (dengan feedback
// "Tersalin!" sesaat), dan tombol buka di tab baru. `url` null (mis. subdomain
// belum dikonfigurasi) menampilkan `emptyHint` alih-alih baris tautan.
function PublishLinkRow({ label, url, emptyHint, highlight = false }) {
    const [copied, setCopied] = useState(false);

    if (!url) {
        if (!emptyHint) return null;
        return (
            <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 4px" }}>
                    {label}
                </p>
                <p style={{ fontSize: 12, color: "#b45309", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, padding: "8px 10px", margin: 0 }}>
                    {emptyHint}
                </p>
            </div>
        );
    }

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            /* clipboard API tidak tersedia (mis. http non-secure) — biarkan
               pengguna menyalin manual dari kotak teks */
        }
    };

    return (
        <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 4px" }}>
                {label}
            </p>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: highlight ? "1.5px solid #4f46e5" : "1px solid #e5e7eb",
                    borderRadius: 8,
                    padding: "8px 10px",
                    background: highlight ? "#eef2ff" : "#f9fafb",
                }}
            >
                <span style={{ flex: 1, fontSize: 13, fontFamily: "monospace", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {url}
                </span>
                <button
                    type="button"
                    onClick={copy}
                    title="Salin tautan"
                    style={{
                        flexShrink: 0,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        border: "1px solid #d1d5db",
                        borderRadius: 6,
                        background: copied ? "#dcfce7" : "#ffffff",
                        color: copied ? "#166534" : "#374151",
                        cursor: "pointer",
                    }}
                >
                    {copied ? "Tersalin" : "Salin"}
                </button>
                <button
                    type="button"
                    onClick={() => window.open(url, "_blank", "noopener")}
                    title="Buka di tab baru"
                    style={{
                        flexShrink: 0,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        border: "1px solid #d1d5db",
                        borderRadius: 6,
                        background: "#ffffff",
                        color: "#374151",
                        cursor: "pointer",
                    }}
                >
                    Buka
                </button>
            </div>
        </div>
    );
}

// ===================== MAIN BUILDER =====================
export default function EventBuilder({
    pageId,
    initialTitle,
    initialElements,
    initialPages,
    saveUrl,
    pages = [],
    initialSlug = null,
    initialIsPublished = false,
    initialPublicUrls = null,
}) {
    // ===================== MULTI-HALAMAN =====================
    const [eventPages, setEventPages] = useState(() => {
        if (initialPages?.length) {
            return initialPages.map((p, i) => ({
                id: String(p.id || "page_" + (i + 1)),
                name: p.name || "Halaman " + (i + 1),
                mode: p.mode || "participant",
                elements: (p.elements || []).map(ensureResponsiveFields),
            }));
        }
        return [{
            id: "page_1",
            name: "Halaman 1",
            mode: "participant",
            elements: (initialElements?.length
                ? initialElements
                : []
            ).map(ensureResponsiveFields),
        }];
    });
    const [activePageId, setActivePageId] = useState(null);
    const [toastMsg, setToastMsg] = useState(null);

    const [pageTitle, setPageTitle] = useState(initialTitle || "Event Baru");

    // ===================== PUBLISH / SUBDOMAIN =====================
    // ID event yang tersimpan di server. Berbeda dari prop `pageId` (yang
    // statis dari HTML awal) karena untuk event BARU harus diperbarui begitu
    // penyimpanan pertama sukses — tanpa ini, setiap autosave berikutnya
    // mengira event belum ada dan membuat baris duplikat di database.
    const [persistedId, setPersistedId] = useState(pageId || null);
    const [eventSlug, setEventSlug] = useState(initialSlug || null);
    const [isPublished, setIsPublished] = useState(!!initialIsPublished);
    const [publicUrls, setPublicUrls] = useState(initialPublicUrls || null);
    // idle | saving | publishing | error — "saving" dulu (memaksa layout
    // tersimpan) baru "publishing" (menandai is_published), supaya subdomain
    // tidak pernah menampilkan versi kanvas yang lebih lama dari yang dilihat EO.
    const [publishStatus, setPublishStatus] = useState("idle");
    const [publishError, setPublishError] = useState(null);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [elements, setElements] = useState(() => {
        const first =
            (initialPages?.length ? initialPages[0].elements : null) ||
            initialElements ||
            [];
        return (first || []).map(ensureResponsiveFields);
    });
    const activePageIdResolved = activePageId ?? eventPages[0]?.id;

    // ===================== UNDO / REDO (per halaman) =====================
    const historyRef = useRef({}); // pageId -> { past:[], future:[] }
    const prevElsRef = useRef(null);
    const histMetaRef = useRef({ skip: false, lastCommit: 0 });
    const [, bumpHistVer] = useReducer((x) => x + 1, 0);

    const [selectedId, setSelectedId] = useState(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [canvasWidth, setCanvasWidth] = useState(1200);
    const [activeRailCategory, setActiveRailCategory] = useState("teks");
const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
    const [viewMode, setViewMode] = useState("admin"); // admin | participant
    const [devicePreview, setDevicePreview] = useState("desktop"); // desktop | tablet | mobile
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("event-builder-sidebar-collapsed");
            return saved === "true";
        }
        return false;
    });
    const [now, setNow] = useState(new Date());
    const [validationWarnings, setValidationWarnings] = useState([]);
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [confirmDeletePageId, setConfirmDeletePageId] = useState(null);
    const [lastPanelCategory, setLastPanelCategory] = useState("teks");
    // Lebar total sidebar kiri AKTIF (rail saja / rail+panel) - diukur
    // real-time via ResizeObserver agar dock/handle/kanvas selalu konsisten.
    const [sidebarW, setSidebarW] = useState(320);
    const sidebarRef = useRef(null);
    const edgeHandleRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // Auto-save state
    const saveTimeoutRef = useRef(null);
    const isInitialLoadRef = useRef(true);

    // Computed absolute pixel values for current canvas width
    const elementsWithAbs = elements.map((el) => ({
        ...el,
        ...computeAbsoluteValues(el, canvasWidth),
    }));

    // Auto-height: derived murni dari konten 
    // (Y + tinggi elemen) + padding bawah. Tidak ada kontrol manual.
    const canvasAutoHeight = Math.ceil(
        elementsWithAbs.reduce(
            (max, el) =>
                el.visible === false
                    ? max
                    : Math.max(max, (el.y || 0) + (el.height || 0)),
            0,
        ) + 48,
    );

    // Warna yang dipakai di desain 
    const usedColors = Array.from(
        new Set(
            elements.flatMap((el) =>
                Object.values(el.props || {}).filter(
                    (v) =>
                        typeof v === "string" &&
                        /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v),
                ),
            ),
        ),
    ).slice(0, 12);

    const selectedElement = elementsWithAbs.find((el) => el.id === selectedId) || null;

    // ===================== OPERASI MULTI-HALAMAN =====================
    const currentPageId = activePageIdResolved;
    const currentPageName =
        eventPages.find((p) => p.id === currentPageId)?.name || "Halaman 1";

    const switchToPage = useCallback(
        (id) => {
            if (id === currentPageId) return;
            const target = eventPages.find((p) => p.id === id);
            if (!target) return;
            // Commit elemen halaman aktif sebelum pindah
            setEventPages((prev) =>
                prev.map((p) =>
                    p.id === currentPageId ? { ...p, elements } : p,
                ),
            );
            const els = (target.elements || []).map(ensureResponsiveFields);
            histMetaRef.current.skip = true; // jangan dicatat history
            prevElsRef.current = els;
            setElements(els);
            setActivePageId(id);
            setSelectedId(null);
        },
        [currentPageId, eventPages, elements],
    );

    const addPage = useCallback(() => {
        // Commit halaman aktif lalu tambah halaman baru kosong & pindah ke sana
        const committed = eventPages.map((p) =>
            p.id === currentPageId ? { ...p, elements } : p,
        );
        const nid =
            "pg_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        const np = {
            id: nid,
            name: "Halaman " + (committed.length + 1),
            elements: [],
        };
        setEventPages([...committed, np]);
        histMetaRef.current.skip = true;
        prevElsRef.current = [];
        setElements([]);
        setActivePageId(nid);
        setSelectedId(null);
    }, [eventPages, currentPageId, elements]);

    const renamePage = useCallback((id, name) => {
        const clean = (name || "").trim();
        if (!clean) return;
        setEventPages((prev) =>
            prev.map((p) => (p.id === id ? { ...p, name: clean } : p)),
        );
    }, []);

    // Hapus halaman (dipanggil setelah dialog konfirmasi).
    // Minimal harus tersisa 1 halaman. Kalau yang dihapus halaman aktif,
    // pindah ke halaman pertama yang tersisa.
    const deletePage = useCallback(
        (id) => {
            if (eventPages.length <= 1) return;
            const remaining = eventPages.filter((p) => p.id !== id);
            setEventPages(remaining);
            if (id === currentPageId) {
                const target = remaining[0];
                const els = (target.elements || []).map(
                    ensureResponsiveFields,
                );
                histMetaRef.current.skip = true;
                prevElsRef.current = els;
                setElements(els);
                setActivePageId(target.id);
                setSelectedId(null);
            }
        },
        [eventPages, currentPageId],
    );

    // ===================== UNDO / REDO =====================
    const canUndo = (historyRef.current[currentPageId]?.past.length ?? 0) > 0;
    const canRedo = (historyRef.current[currentPageId]?.future.length ?? 0) > 0;

    const undo = useCallback(() => {
        const st = historyRef.current[currentPageId];
        if (!st || st.past.length === 0) return;
        st.future.push(elements);
        const prevSnap = st.past.pop();
        histMetaRef.current.skip = true;
        prevElsRef.current = prevSnap;
        setElements(prevSnap);
        bumpHistVer();
    }, [currentPageId, elements]);

    const redo = useCallback(() => {
        const st = historyRef.current[currentPageId];
        if (!st || st.future.length === 0) return;
        st.past.push(elements);
        const nextSnap = st.future.pop();
        histMetaRef.current.skip = true;
        prevElsRef.current = nextSnap;
        setElements(nextSnap);
        bumpHistVer();
    }, [currentPageId, elements]);

    // Perekam history: snapshot SEBELUM perubahan, coalesce burst
    // (slider/drag memicu banyak update dalam <400ms = 1 entri)
    useEffect(() => {
        const key = activePageIdResolved;
        if (!historyRef.current[key]) {
            historyRef.current[key] = { past: [], future: [] };
        }
        if (histMetaRef.current.skip) {
            histMetaRef.current.skip = false;
            prevElsRef.current = elements;
            return;
        }
        const prev = prevElsRef.current;
        prevElsRef.current = elements;
        if (prev === null || prev === elements) return;
        const now = Date.now();
        if (now - histMetaRef.current.lastCommit > 400) {
            const st = historyRef.current[key];
            st.past.push(prev);
            if (st.past.length > 60) st.past.shift();
            st.future.length = 0;
            bumpHistVer();
        }
        histMetaRef.current.lastCommit = now;
    }, [elements, activePageIdResolved]);

    // Navigasi antar halaman dari tombol di mode preview
    useEffect(() => {
        const handler = (e) => {
            if (e.detail) switchToPage(e.detail);
        };
        window.addEventListener("racik-navigate", handler);
        return () => window.removeEventListener("racik-navigate", handler);
    }, [switchToPage]);

    // ===== ALL HANDLERS DECLARED FIRST (before any useEffect) =====
    const deleteElement = useCallback((id) => {
        const idx = elements.findIndex((el) => el.id === id);
        if (idx === -1) return;
        const remaining = elements.filter((el) => el.id !== id);
        setElements(remaining);
        // Auto-select: pilih elemen yang sekarang menempati posisi yang sama
        // di list Lapisan; jika yang dihapus tadi paling bawah, pilih yang
        // sekarang menjadi paling bawah; jika kosong total, buang selection.
        if (remaining.length === 0) {
            setSelectedId(null);
        } else {
            setSelectedId(remaining[Math.min(idx, remaining.length - 1)].id);
        }
    }, [elements]);

    const selectElement = useCallback((id) => {
        setSelectedId(id);
    }, []);

    // Duplikat elemen: clone data + geser sedikit, lalu pilih hasilnya
    const duplicateElement = useCallback((id) => {
        setElements((prev) => {
            const src = prev.find((el) => el.id === id);
            if (!src) return prev;
            const copy = JSON.parse(JSON.stringify(src));
            copy.id =
                "el_" +
                Date.now() +
                "_" +
                Math.floor(Math.random() * 1000);
            copy.name = (src.name || src.type) + " Salinan";
            copy.xPct = Math.round(((src.xPct || 0) + 2) * 100) / 100;
            copy.yPct = Math.round(((src.yPct || 0) + 2) * 100) / 100;
            setSelectedId(copy.id);
            return [...prev, copy];
        });
    }, []);

    const updateElement = useCallback((id, patch) => {
        setElements((prev) =>
            prev.map((el) => {
                if (el.id !== id) return el;

                // If editing position/size in tablet/mobile mode, mark as manual override
                const isResponsiveProp = ['xPct', 'yPct', 'widthPct', 'heightPct'].some(key => key in patch);
                if (isResponsiveProp && devicePreview !== 'desktop') {
                    return {
                        ...el,
                        ...patch,
                        autoLocked: { ...el.autoLocked, [devicePreview]: false },
                        [devicePreview]: { ...el[devicePreview], ...patch },
                    };
                }
                return { ...el, ...patch };
            }),
        );
    }, [devicePreview]);

    const updateElementProps = useCallback((id, propsPatch) => {
        setElements((prev) =>
            prev.map((el) => {
                if (el.id !== id) return el;

                // If editing props in tablet/mobile mode, mark as manual override
                if (devicePreview !== 'desktop') {
                    const newAutoLocked = { ...el.autoLocked, [devicePreview]: false };
                    const newBreakpointProps = { ...el[devicePreview], ...propsPatch };
                    return {
                        ...el,
                        props: { ...el.props, ...propsPatch },
                        autoLocked: newAutoLocked,
                        [devicePreview]: newBreakpointProps,
                    };
                }
                return { ...el, props: { ...el.props, ...propsPatch } };
            }),
        );
    }, [devicePreview]);

    const toggleVisibility = useCallback((id) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id
                    ? { ...el, visible: el.visible === false ? true : false }
                    : el,
            ),
        );
    }, []);

    const triggerFileUpload = useCallback((accept) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.click();
        }
    }, []);

    const handleFileUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const type = detectUploadType(file);
        const url = URL.createObjectURL(file);
        const size = defaultSizeFor(type);
        const countSameType = elements.filter((el) => el.type === type).length;
        const centerX = canvasWidth / 2 - size.width / 2 + countSameType * 16;
        const startY = 100 + countSameType * 16;

        const newEl = ensureResponsiveFields({
            id: "el_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            type,
            name: getComponentMeta(type)?.label + " " + (countSameType + 1),
            xPct: pxToPct(Math.max(0, centerX)),
            yPct: pxToPct(Math.max(0, startY)),
            widthPct: pxToPct(size.width),
            heightPct: pxToPct(size.height),
            visible: true,
            // Objek baru mewarisi tab mode yang sedang aktif; form/rsvp
            // selalu "participant" berapa pun mode-nya.
            scope: resolveScopeForNew(type, viewMode),
            props: {
                ...defaultPropsFor(type),
                src: url,
                fileName: file.name,
            },
        });

        setElements((prev) => [...prev, newEl]);
        selectElement(newEl.id);
        e.target.value = "";
    }, [elements, canvasWidth, selectElement]);

    const addElementToCanvas = (type) => {
        // Role Guard: Validate block type against current page mode
        const currentPage = eventPages.find(p => p.id === currentPageId);
        const isAdminPage = currentPage?.mode === 'admin';
        const isAdminOnly = ['participant-list', 'participant-counter'].includes(type);

        if (isAdminOnly && !isAdminPage) {
            alert('Blok ini hanya tersedia untuk halaman mode Admin.');
            return;
        }

        if (type === "image") {
            triggerFileUpload("image/*");
            return;
        }
        if (type === "video") {
            triggerFileUpload("video/*");
            return;
        }
        const size = defaultSizeFor(type);
        const countSameType = elements.filter((el) => el.type === type).length;

        // Always use BASE_CANVAS_WIDTH (1200) for consistent default positioning/sizing
        // regardless of current device preview mode
        const baseCanvasWidth = BASE_CANVAS_WIDTH;
        const baseCanvasHeight = 900;
        const centerX = baseCanvasWidth / 2 - size.width / 2 + countSameType * 16;
        const startY = 100 + countSameType * 16;

        // For filled shape elements, ensure minimum reasonable size.
        // Garis/panah/divider/badge dikecualikan agar proporsinya tidak rusak
        // (line/divider memang lebar & tipis, badge mengikuti teksnya).
        const filledShapeTypes = [
            "rectangle", "rounded-rectangle", "circle", "triangle", "diamond",
            "pentagon", "hexagon", "polygon", "star", "heart", "speech-bubble", "blob",
        ];
        let finalSize = size;
        if (filledShapeTypes.includes(type)) {
            const minDimension = Math.min(baseCanvasWidth, baseCanvasHeight) * 0.15; // 15% = ~180px
            finalSize = {
                width: Math.max(size.width, minDimension),
                height: Math.max(size.height, minDimension),
            };
        }

        const newEl = ensureResponsiveFields({
            id: "el_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            type,
            name: getComponentMeta(type)?.label + " " + (countSameType + 1),
            xPct: pxToPct(Math.max(0, centerX)),
            yPct: pxToPct(Math.max(0, startY)),
            widthPct: pxToPct(finalSize.width),
            heightPct: pxToPct(finalSize.height),
            visible: true,
            scope: resolveScopeForNew(type, viewMode),
            props: defaultPropsFor(type),
        });

        setElements((prev) => [...prev, newEl]);
        selectElement(newEl.id);
    };

    const toggleSidebar = useCallback(() => {
        const newState = !sidebarCollapsed;
        setSidebarCollapsed(newState);
        localStorage.setItem("event-builder-sidebar-collapsed", String(newState));
    }, [sidebarCollapsed]);

    const handleRailClick = useCallback((category) => {
        cancelEdgeClose();
        if (category !== "edit-objek") setLastPanelCategory(category);
        setActiveRailCategory(category);
        if (sidebarCollapsed) {
            setSidebarCollapsed(false);
            localStorage.setItem("event-builder-sidebar-collapsed", "false");
        }
    }, [sidebarCollapsed]);

    // ===================== PANEL EDIT OBJEK (sidebar kiri) =====================
    const lastPanelCategoryRef = useRef(lastPanelCategory);
    lastPanelCategoryRef.current = lastPanelCategory;
    const edgeCloseTimer = useRef(null);

    const cancelEdgeClose = useCallback(() => {
        if (edgeCloseTimer.current) {
            clearTimeout(edgeCloseTimer.current);
            edgeCloseTimer.current = null;
        }
    }, []);

    const scheduleEdgeClose = useCallback(() => {
        cancelEdgeClose();
        edgeCloseTimer.current = setTimeout(() => {
            // Kursor meninggalkan handle & panel -> kembali ke panel
            // kategori terakhir + collapse sidebar
            setActiveRailCategory(lastPanelCategoryRef.current);
            setSidebarCollapsed(true);
            localStorage.setItem("event-builder-sidebar-collapsed", "true");
        }, 380);
    }, [cancelEdgeClose]);

    const openObjectEditor = useCallback(() => {
        cancelEdgeClose();
        if (activeRailCategory !== "edit-objek") {
            setLastPanelCategory(activeRailCategory);
        }
        setActiveRailCategory("edit-objek");
        setSidebarCollapsed(false);
        localStorage.setItem("event-builder-sidebar-collapsed", "false");
    }, [activeRailCategory]);

    // Dipanggil saat objek di-klik/di-drag di kanvas 
    // terdefinisi (bug lama: ReferenceError karena tidak ada definisinya)
    const focusEditPanel = useCallback(() => {
        openObjectEditor();
    }, [openObjectEditor]);

    // Dipanggil saat objek baru dipilih dari kanvas -> langsung buka panel edit;
    // saat deselect & sedang di panel edit -> kembali ke panel semula.
    const prevSelectedRef = useRef(null);

    // ===================== DRAG & DROP POINTER (kustom) =====================
    // mousedown/pointerdown -> mulai drag; pointermove -> posisi real-time;
    // pointerup -> posisi final tersimpan di state (lalu bisa di-Simpan ke DB).
    const [editingTextId, setEditingTextId] = useState(null);
    const startObjectDrag = useCallback(
        (e, el) => {
            if (previewMode || el.locked || editingTextId === el.id) return;
            if (e.button !== undefined && e.button !== 0) return;
            selectElement(el.id);
            // userSelect none mencegah seleksi teks native saat drag
            document.body.style.userSelect = "none";
            document.body.style.cursor = "grabbing";

            const rect = canvasRef.current?.getBoundingClientRect();
            const cw = rect && rect.width > 0 ? rect.width : BASE_CANVAS_WIDTH;
            const startX = e.clientX;
            const startY = e.clientY;
            const origX = pctToPx(el.xPct || 0, cw);
            const origY = pctToPx(el.yPct || 0, cw);

            const onMove = (ev) => {
                const nx = origX + (ev.clientX - startX);
                const ny = origY + (ev.clientY - startY);
                // Real-time: state diperbarui tiap gerakan -> elemen ikut kursor
                updateElement(el.id, {
                    xPct: Math.round((nx / cw) * 10000) / 100,
                    yPct: Math.round((ny / cw) * 10000) / 100,
                });
            };
            const onUp = () => {
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
                document.body.style.userSelect = "";
                document.body.style.cursor = "";
                // Posisi final sudah tersimpan di state pada move terakhir.
            };
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
        },
        [previewMode, editingTextId, selectElement, updateElement],
    );

    // ===================== RESIZE POINTER (kustom, 4 sudut) =====================
    const startObjectResize = useCallback(
        (e, el, dir) => {
            if (previewMode || el.locked || editingTextId === el.id) return;
            if (e.button !== undefined && e.button !== 0) return;
            e.stopPropagation();
            selectElement(el.id);
            document.body.style.userSelect = "none";

            const rect = canvasRef.current?.getBoundingClientRect();
            const cw = rect && rect.width > 0 ? rect.width : BASE_CANVAS_WIDTH;
            const startX = e.clientX;
            const startY = e.clientY;
            const MIN = 20;
            const o = {
                x: pctToPx(el.xPct || 0, cw),
                y: pctToPx(el.yPct || 0, cw),
                w: pctToPx(el.widthPct || 0, cw),
                h: pctToPx(el.heightPct || 0, cw),
            };

            const onMove = (ev) => {
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;
                let { x, y, w, h } = o;
                if (dir.includes("e")) w = Math.max(MIN, o.w + dx);
                if (dir.includes("s")) h = Math.max(MIN, o.h + dy);
                if (dir.includes("w")) {
                    const nw = Math.max(MIN, o.w - dx);
                    x = x + (o.w - nw);
                    w = nw;
                }
                if (dir.includes("n")) {
                    const nh = Math.max(MIN, o.h - dy);
                    y = y + (o.h - nh);
                    h = nh;
                }
                updateElement(el.id, {
                    xPct: Math.round((x / cw) * 10000) / 100,
                    yPct: Math.round((y / cw) * 10000) / 100,
                    widthPct: Math.round((w / cw) * 10000) / 100,
                    heightPct: Math.round((h / cw) * 10000) / 100,
                });
            };
            const onUp = () => {
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
                document.body.style.userSelect = "";
            };
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
        },
        [previewMode, editingTextId, selectElement, updateElement],
    );

    // Reorder layer: front/forward/back/backward (urutan array = urutan stack)
    const reorderElement = useCallback((id, dir) => {
        setElements((prev) => {
            const idx = prev.findIndex((e) => e.id === id);
            if (idx < 0) return prev;
            const arr = [...prev];
            const [it] = arr.splice(idx, 1);
            let ni = idx;
            if (dir === "front") ni = arr.length;
            else if (dir === "back") ni = 0;
            else if (dir === "forward") ni = Math.min(arr.length, idx + 1);
            else ni = Math.max(0, idx - 1);
            arr.splice(ni, 0, it);
            return arr;
        });
    }, []);

    const commitInlineText = useCallback(

        (id, content) => {
            updateElementProps(id, { content });
            setEditingTextId(null);
        },
        [updateElementProps],
    );
    useEffect(() => {
        // Hanya revert: panel edit TIDAK dibuka otomatis saat seleksi 
        // dibuka manual lewat handle setengah lingkaran di tepi kiri.
        if (!selectedId && prevSelectedRef.current) {
            if (activeRailCategory === "edit-objek") {
                setActiveRailCategory(lastPanelCategoryRef.current);
            }
        }
        prevSelectedRef.current = selectedId;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    // Proximity glow untuk handle tepi kiri canvas
    useEffect(() => {
        if (!selectedElement || previewMode) return;
        const onMove = (e) => {
            const h = edgeHandleRef.current;
            if (!h) return;
            const r = h.getBoundingClientRect();
            const d = Math.hypot(
                e.clientX - (r.left + r.width / 2),
                e.clientY - (r.top + r.height / 2),
            );
            h.classList.toggle("near", d < 72);
        };
        document.addEventListener("mousemove", onMove, { passive: true });
        return () => document.removeEventListener("mousemove", onMove);
    }, [selectedElement, previewMode]);

    // Ukur lebar sidebar AKTIF (rail saja saat collapsed, rail+panel saat
    // expanded) - dipakai dock halaman, handle edit, dan padding kanvas.
    useEffect(() => {
        const measure = () => {
            const el = sidebarRef.current;
            if (!el) return;
            const w = el.getBoundingClientRect().width;
            if (w > 0) setSidebarW((prev) =>
                Math.abs(prev - w) < 0.5 ? prev : Math.round(w),
            );
        };
        measure();
        let ro;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(measure);
            if (sidebarRef.current) ro.observe(sidebarRef.current);
        }
        return () => {
            if (ro) ro.disconnect();
        };
    }, [sidebarCollapsed]);



    // Mengembalikan { id, slug } saat berhasil, null saat gagal — dipakai
    // handlePublish() untuk memastikan ID yang benar dipublikasikan, karena
    // membaca `persistedId` dari state tidak bisa diandalkan tepat setelah
    // await (closure render ini belum tentu melihat setState yang baru saja
    // terjadi di dalam saveLayout itu sendiri).
    const saveLayout = async () => {
        setSaveStatus("saving");
        try {
            const res = await fetch(saveUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]',
                    ).content,
                },
                body: JSON.stringify({
                    id: persistedId,
                    title: pageTitle,
                    elements,
                    // Multi-halaman: halaman aktif di-commit dengan elemen
                    // yang sedang diedit sebelum dikirim
                    pages: eventPages.map((p) =>
                        p.id === currentPageId ? { ...p, elements } : p,
                    ),
                }),
            });
            if (!res.ok) throw new Error("Save failed");
            const data = await res.json();
            setSaveStatus("saved");
            setTimeout(
                () => setSaveStatus((s) => (s === "saved" ? "idle" : s)),
                2000,
            );
            if (data.id && String(data.id) !== String(persistedId)) {
                setPersistedId(data.id);
                // Event baru: pindahkan URL browser ke /builder/{id}/edit,
                // supaya refresh halaman tidak membuat baris duplikat lagi
                // (prop `pageId` dari server cuma terisi lewat reload penuh).
                if (
                    !pageId &&
                    typeof window !== "undefined" &&
                    window.history?.replaceState
                ) {
                    window.history.replaceState(
                        null,
                        "",
                        `/builder/${data.id}/edit`,
                    );
                }
            }
            if (data.slug) setEventSlug(data.slug);
            return data;
        } catch (err) {
            setSaveStatus("error");
            return null;
        }
    };

    const saveStatusText = {
        idle: "Otomatis tersimpan",
        saving: "Menyimpan...",
        saved: "Tersimpan",
        error: "Gagal menyimpan",
    }[saveStatus];

    // Terbitkan event: pastikan kanvas tersimpan dulu (supaya subdomain
    // langsung menampilkan versi terbaru), baru tandai is_published di server.
    // Dipakai juga saat event SUDAH live — publish ulang tidak merusak apa
    // pun (backend idempotent), sekadar cara membuka lagi modal linknya.
    const handlePublish = async () => {
        if (publishStatus === "saving" || publishStatus === "publishing") return;
        setPublishError(null);
        setPublishStatus("saving");

        const saved = await saveLayout();
        if (!saved || !saved.id) {
            setPublishStatus("error");
            setPublishError(
                "Gagal menyimpan layout sebelum publish. Cek koneksi lalu coba lagi.",
            );
            setShowPublishModal(true);
            return;
        }

        setPublishStatus("publishing");
        try {
            const res = await fetch(`/builder/${saved.id}/publish`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]',
                    ).content,
                },
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Gagal mempublikasikan event.");
            }
            setIsPublished(true);
            setEventSlug(data.slug);
            setPublicUrls(data.urls);
            setPublishStatus("idle");
            setShowPublishModal(true);
        } catch (err) {
            setPublishStatus("error");
            setPublishError(err.message || "Gagal mempublikasikan event.");
            setShowPublishModal(true);
        }
    };

    // Batalkan publikasi — halaman publik & subdomain 404 lagi, data event
    // (elements, pendaftar) tidak terhapus.
    const handleUnpublish = async () => {
        if (!persistedId || publishStatus === "publishing") return;
        setPublishError(null);
        setPublishStatus("publishing");
        try {
            const res = await fetch(`/builder/${persistedId}/unpublish`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]',
                    ).content,
                },
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Gagal membatalkan publikasi.");
            }
            setIsPublished(false);
            setPublishStatus("idle");
        } catch (err) {
            setPublishStatus("error");
            setPublishError(err.message || "Gagal membatalkan publikasi.");
        }
    };

    // ===== ALL useEffects AFTER HANDLERS =====
    // Tick tiap detik untuk countdown real-time
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Track lebar canvas AKTUAL secara real-time.
    // Sumber kebenaran = elemen .canvas-page (canvasRef) 
    // render (elementsWithAbs) maupun konversi px->% saat drag/resize drop,
    // sehingga keduanya tidak pernah pakai lebar yang berbeda.
    // ResizeObserver menangkap perubahan dari window resize, toggle sidebar,
    // dan ganti breakpoint Desktop/Tablet/Mobile.
    useEffect(() => {
        const viewport = document.querySelector(".canvas-viewport");
        const measure = () => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect && rect.width > 0) {
                setCanvasWidth((prev) =>
                    Math.abs(prev - rect.width) < 0.5 ? prev : rect.width,
                );
            }
        };
        measure();
        let ro;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(measure);
            if (viewport) ro.observe(viewport);
            if (canvasRef.current) ro.observe(canvasRef.current);
        }
        window.addEventListener("resize", measure);
        return () => {
            if (ro) ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    // Backspace/Delete key to delete selected element
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Jangan hapus elemen saat user sedang mengetik di input/textarea
            const t = e.target;
            if (
                t &&
                (t.tagName === "INPUT" ||
                    t.tagName === "TEXTAREA" ||
                    t.tagName === "SELECT" ||
                    t.isContentEditable)
            ) {
                return;
            }
            // Fokus ada di dock halaman (kartu halaman) -> Backspace/Delete
            // dikhususkan untuk hapus halaman, bukan elemen kanvas
            if (
                t &&
                t.closest &&
                t.closest(".builder-pages-dock")
            ) {
                return;
            }
            if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault();
                if (selectedId) {
                    deleteElement(selectedId);
                }
            }
            // Undo/Redo: Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z
            const mod = e.ctrlKey || e.metaKey;
            if (mod && !e.altKey) {
                const k = e.key.toLowerCase();
                if (k === "z" && !e.shiftKey) {
                    e.preventDefault();
                    undo();
                } else if (k === "y" || (k === "z" && e.shiftKey)) {
                    e.preventDefault();
                    redo();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, deleteElement, undo, redo]);

    // Auto-save: debounced save when elements or pageTitle change
    useEffect(() => {
        if (isInitialLoadRef.current) {
            isInitialLoadRef.current = false;
            return;
        }
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
            if (saveStatus !== "saving") {
                saveLayout();
            }
        }, 2000); // 2 detik debounce setelah perubahan berhenti
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [elements, pageTitle, eventPages, currentPageId]);

    // ===================== RENDER =====================
    return (
        <div className="builder">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                    const activeType = activeRailCategory === "unggahan" ? "image" : null;
                }}
            />
            {/* ===================== TOOLBAR ===================== */}
            <header className="toolbar" style={{ paddingLeft: sidebarW }}>
                <div className="toolbar-left">
                    <button
                        className="icon-btn"
                        title="Kembali"
                        onClick={() => window.history.back()}
                    >
                        <IconBack />
                    </button>
                    <input
                        className="page-title-input"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                        placeholder="Nama Event"
                    />
                </div>

                <div className="toolbar-center">
                    
                    <div className="device-preview-nav">
                        {Object.entries(DEVICE_BREAKPOINTS).map(([key, bp]) => (
                            <button
                                key={key}
                                className={
                                    "device-preview-btn" +
                                    (devicePreview === key ? " active" : "")
                                }
                                title={bp.label}
                                onClick={() => setDevicePreview(key)}
                            >
                                {bp.icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="toolbar-right">
                    <span className={"save-status " + saveStatus}>
                        {saveStatusText}
                    </span>
                    <button
                        className={"icon-btn undo-btn" + (!canUndo ? " disabled" : "")}
                        disabled={!canUndo}
                        onClick={undo}
                        title="Undo (Ctrl+Z)"
                    >
                        <IconUndo />
                    </button>
                    <button
                        className={"icon-btn redo-btn" + (!canRedo ? " disabled" : "")}
                        disabled={!canRedo}
                        onClick={redo}
                        title="Redo (Ctrl+Y)"
                    >
                        <IconRedo />
                    </button>
                    <button
                        className="btn-ghost"
                        onClick={() => {
                            const warnings = validateResponsiveLayout(elements);
                            setValidationWarnings(warnings);
                            setShowValidationModal(true);
                        }}
                        title="Validasi layout responsif"
                    >
                        <IconValidate />
                        <span>Validasi</span>
                    </button>
                    <button
                        className="btn-ghost"
                        onClick={() => setPreviewMode((p) => !p)}
                    >
                        {previewMode ? "Edit" : "Preview"}
                    </button>
                    {!previewMode && (
                        <div className="toolbar-divider" style={{ width: 1, height: 24, background: "#e5e7eb", margin: "0 8px" }} />
                    )}
                    {!previewMode && (
                        <div className="view-mode-toggle" style={{ display: "flex", gap: 4, background: "#f3f4f6", borderRadius: 6, padding: 2 }}>
                            <button
                                className={`view-mode-btn ${viewMode === "admin" ? "active" : ""}`}
                                onClick={() => setViewMode("admin")}
                                style={{ padding: "6px 12px", border: "none", background: "transparent", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 500, color: viewMode === "admin" ? "#fff" : "#374151", backgroundColor: viewMode === "admin" ? "#4f46e5" : "transparent" }}
                                title="Mode Admin (lihat Daftar Peserta)"
                            >
                                <IconParticipants /> Admin
                            </button>
                            <button
                                className={`view-mode-btn ${viewMode === "participant" ? "active" : ""}`}
                                onClick={() => setViewMode("participant")}
                                style={{ padding: "6px 12px", border: "none", background: "transparent", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 500, color: viewMode === "participant" ? "#fff" : "#374151", backgroundColor: viewMode === "participant" ? "#10b981" : "transparent" }}
                                title="Mode Peserta (lihat Form/RSVP)"
                            >
                                <IconUser /> Peserta
                            </button>
                        </div>
                    )}
                    <button
                        className={"btn-primary btn-publish" + (isPublished ? " is-published" : "")}
                        onClick={handlePublish}
                        disabled={publishStatus === "saving" || publishStatus === "publishing"}
                        title={
                            isPublished
                                ? "Event sudah live — klik untuk lihat/salin tautan"
                                : "Simpan lalu terbitkan event ke subdomain"
                        }
                    >
                        <IconGlobe />
                        {publishStatus === "saving"
                            ? "Menyimpan..."
                            : publishStatus === "publishing"
                            ? "Mempublikasikan..."
                            : isPublished
                            ? "Event Live"
                            : "Publish Subdomain"}
                    </button>
                </div>
            </header>

            <div className="builder-body">
                {/* ===================== SIDEBAR ===================== */}
                {!previewMode && (
                    <aside ref={sidebarRef} className={"canva-sidebar" + (sidebarCollapsed ? " collapsed" : "")}>
                        {/* Rail ikon kiri - 60px */}
                        <div className="canva-rail">
                            <button
                                className={
                                    "canva-rail-btn" +
                                    (activeRailCategory === "teks"
                                        ? " active"
                                        : "")
                                }
                                onClick={() => handleRailClick("teks")}
                                title="Teks"
                            >
                                <IconText />
                                <span>Teks</span>
                            </button>

                            <button
                                className={
                                    "canva-rail-btn" +
                                    (activeRailCategory === "bentuk"
                                        ? " active"
                                        : "")
                                }
                                onClick={() => handleRailClick("bentuk")}
                                title="Bentuk"
                            >
                                <IconShape />
                                <span>Bentuk</span>
                            </button>

                            <button
                                className={
                                    "canva-rail-btn" +
                                    (activeRailCategory === "unggahan"
                                        ? " active"
                                        : "")
                                }
                                onClick={() => handleRailClick("unggahan")}
                                title="Unggahan"
                            >
                                <IconImage />
                                <span>Unggahan</span>
                            </button>

                            <button
                                className={
                                    "canva-rail-btn" +
                                    (activeRailCategory === "event"
                                        ? " active"
                                        : "")
                                }
                                onClick={() => handleRailClick("event")}
                                title="Event"
                            >
                                <IconEvent />
                                <span>Event</span>
                            </button>

                            <div className="canva-rail-spacer" />

                            <button
                                className={
                                    "canva-rail-btn" +
                                    (activeRailCategory === "lapisan"
                                        ? " active"
                                        : "")
                                }
                                onClick={() => handleRailClick("lapisan")}
                                title="Lapisan"
                            >
                                <IconLayers />
                                <span>Lapisan</span>
                            </button>
                        </div>

                        {/* Toggle button - hanya tampil saat panel TERBUKA (expanded) */}
                        {!sidebarCollapsed && (
                            <button
                                className="sidebar-toggle-btn"
                                onClick={toggleSidebar}
                                title="Tutup panel"
                                aria-label="Tutup panel"
                            >
                                <IconChevronLeft />
                            </button>
                        )}

                        {/* Panel konten - muncul di kanan rail */}
                        {!sidebarCollapsed && (
                            <div
                                className="canva-panel"
                                onMouseEnter={
                                    activeRailCategory === "edit-objek"
                                        ? cancelEdgeClose
                                        : undefined
                                }
                                onMouseLeave={
                                    activeRailCategory === "edit-objek"
                                        ? scheduleEdgeClose
                                        : undefined
                                }
                            >
                                <div className="canva-panel-header">
                                    <h4>
                                        {activeRailCategory === "teks" && "Teks"}
                                        {activeRailCategory === "bentuk" && "Bentuk"}
                                        {activeRailCategory === "unggahan" && "Unggahan"}
                                        {activeRailCategory === "event" && "Event"}
                                        {activeRailCategory === "lapisan" && "Lapisan"}
                                        {activeRailCategory === "edit-objek" && "Edit Objek"}
                                    </h4>
                                </div>
                                <div className="canva-panel-body">
                                    {/* ====== PANEL EDIT OBJEK ====== */}
                                    {activeRailCategory === "edit-objek" &&
                                        (selectedElement ? (
                                            <ElementErrorBoundary
                                                elementName={"Panel " + selectedElement.name}
                                                resetKey={selectedElement.id + ":props"}
                                            >
                                            <ObjectPropertyPanel
                                                el={selectedElement}
                                                usedColors={usedColors}
                                                onMoveLayer={reorderElement}
                                                eventPages={eventPages}
                                                siblingElements={elements}
                                                onUpdate={(patch) =>
                                                    updateElement(selectedElement.id, patch)
                                                }
                                                onUpdateProps={(patch) =>
                                                    updateElementProps(selectedElement.id, patch)
                                                }
                                                onDuplicate={() =>
                                                    duplicateElement(selectedElement.id)
                                                }
                                                devicePreview={devicePreview}
                                                pages={pages}
                                                onResetToAuto={(breakpoint) => {
                                                    setElements((prev) =>
                                                        prev.map((elem) =>
                                                            elem.id === selectedElement.id
                                                                ? resetToAuto(elem, breakpoint)
                                                                : elem
                                                        )
                                                    );
                                                }}
                                            />
                                            </ElementErrorBoundary>
                                        ) : (
                                            <p className="layers-empty">
                                                Pilih objek di kanvas untuk
                                                mengedit propertinya.
                                            </p>
                                        ))}
                                    {/* ====== PANEL TEKS ====== */}
                                    {activeRailCategory === "teks" && (
                                        <>
                                            <p className="panel-section-label">
                                                Gaya teks default
                                            </p>
                                            <div className="text-preset-list">
                                                {/* 1. Tambahkan judul - Heading */}
                                                <div
                                                    className="text-preset-card"
                                                    onClick={() => {
                                                        const size = defaultSizeFor("text");
                                                        const countSameType = elements.filter((el) => el.type === "text" || el.type === "link").length;
                                                        const centerX = canvasWidth / 2 - size.width / 2 + countSameType * 16;
                                                        const startY = 100 + countSameType * 16;
                                                        const newEl = {
                                                            id: "el_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
                                                            type: "text",
                                                            name: "Judul " + (countSameType + 1),
                                                            xPct: pxToPct(Math.max(0, centerX)),
                                                            yPct: pxToPct(Math.max(0, startY)),
                                                            widthPct: pxToPct(size.width),
                                                            heightPct: pxToPct(size.height),
                                                            visible: true,
                                                            props: {
                                                                content: "Tambahkan judul",
                                                                fontSize: 32,
                                                                color: "#1a1a1a",
                                                                fontWeight: "700",
                                                                widthPreset: "narrow",
                                                            },
                                                        };
                                                        setElements((prev) => [...prev, newEl]);
                                                        selectElement(newEl.id);
                                                    }}
                                                >
                                                    <div className="text-preset-preview" style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
                                                        Tambahkan judul
                                                    </div>
                                                    <span className="text-preset-meta">Judul</span>
                                                </div>

                                                {/* 2. Tambahkan subjudul - Subheading */}
                                                <div
                                                    className="text-preset-card"
                                                    onClick={() => {
                                                        const size = defaultSizeFor("text");
                                                        const countSameType = elements.filter((el) => el.type === "text" || el.type === "link").length;
                                                        const centerX = canvasWidth / 2 - size.width / 2 + countSameType * 16;
                                                        const startY = 100 + countSameType * 16;
                                                        const newEl = {
                                                            id: "el_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
                                                            type: "text",
                                                            name: "Subjudul " + (countSameType + 1),
                                                            xPct: pxToPct(Math.max(0, centerX)),
                                                            yPct: pxToPct(Math.max(0, startY)),
                                                            widthPct: pxToPct(size.width),
                                                            heightPct: pxToPct(size.height),
                                                            visible: true,
                                                            props: {
                                                                content: "Tambahkan subjudul",
                                                                fontSize: 20,
                                                                color: "#374151",
                                                                fontWeight: "600",
                                                                widthPreset: "narrow",
                                                            },
                                                        };
                                                        setElements((prev) => [...prev, newEl]);
                                                        selectElement(newEl.id);
                                                    }}
                                                >
                                                    <div className="text-preset-preview" style={{ fontSize: 20, fontWeight: 600, color: "#374151", fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
                                                        Tambahkan subjudul
                                                    </div>
                                                    <span className="text-preset-meta">Subjudul</span>
                                                </div>

                                                {/* 3. Tambahkan sedikit teks isi - Body */}
                                                <div
                                                    className="text-preset-card"
                                                    onClick={() => {
                                                        const size = defaultSizeFor("text");
                                                        const countSameType = elements.filter((el) => el.type === "text" || el.type === "link").length;
                                                        const centerX = canvasWidth / 2 - size.width / 2 + countSameType * 16;
                                                        const startY = 100 + countSameType * 16;
                                                        const newEl = {
                                                            id: "el_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
                                                            type: "text",
                                                            name: "Teks isi " + (countSameType + 1),
                                                            xPct: pxToPct(Math.max(0, centerX)),
                                                            yPct: pxToPct(Math.max(0, startY)),
                                                            widthPct: pxToPct(size.width),
                                                            heightPct: pxToPct(size.height),
                                                            visible: true,
                                                            props: {
                                                                content: "Tambahkan sedikit teks isi",
                                                                fontSize: 14,
                                                                color: "#4b5563",
                                                                fontWeight: "400",
                                                            },
                                                        };
                                                        setElements((prev) => [...prev, newEl]);
                                                        selectElement(newEl.id);
                                                    }}
                                                >
                                                    <div className="text-preset-preview" style={{ fontSize: 14, fontWeight: 400, color: "#4b5563", fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
                                                        Tambahkan sedikit teks isi
                                                    </div>
                                                    <span className="text-preset-meta">Teks isi</span>
                                                </div>

                                                {/* 4. Tambahkan tautan - Link */}
                                                <div
                                                    className="text-preset-card"
                                                    onClick={() => {
                                                        const size = defaultSizeFor("link");
                                                        const countSameType = elements.filter((el) => el.type === "text" || el.type === "link").length;
                                                        const centerX = canvasWidth / 2 - size.width / 2 + countSameType * 16;
                                                        const startY = 100 + countSameType * 16;
                                                        const newEl = {
                                                            id: "el_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
                                                            type: "link",
                                                            name: "Tautan " + (countSameType + 1),
                                                            xPct: pxToPct(Math.max(0, centerX)),
                                                            yPct: pxToPct(Math.max(0, startY)),
                                                            widthPct: pxToPct(size.width),
                                                            heightPct: pxToPct(size.height),
                                                            visible: true,
                                                            props: defaultPropsFor("link"),
                                                        };
                                                        setElements((prev) => [...prev, newEl]);
                                                        selectElement(newEl.id);
                                                    }}
                                                >
                                                    <div className="text-preset-preview" style={{ fontSize: 16, fontWeight: 500, color: "#3b82f6", textDecoration: "underline", fontFamily: "Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
                                                        Teks tautan
                                                    </div>
                                                    <span className="text-preset-meta">Tautan</span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* ====== PANEL BENTUK ====== */}
                                    {activeRailCategory === "bentuk" && (
                                        <>
                                            {SHAPE_CATEGORIES.map((category) => (
                                                <div key={category.id} style={{ marginBottom: 20 }}>
                                                    <p className="panel-section-label" style={{ marginBottom: 10 }}>
                                                        {category.label}
                                                    </p>
                                                    <div className="panel-grid">
                                                        {category.shapes.map((comp) => (
                                                            <div
                                                                key={comp.type}
                                                                className="panel-card"
                                                                onClick={() =>
                                                                    addElementToCanvas(
                                                                        comp.type,
                                                                    )
                                                                }
                                                                title={comp.label}
                                                            >
                                                                <span className="panel-card-icon">
                                                                    {comp.icon}
                                                                </span>
                                                                <span className="panel-card-label">
                                                                    {comp.label}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* ====== PANEL UNGGAHAN ====== */}
                                    {activeRailCategory === "unggahan" && (
                                        <>
                                            <p className="panel-section-label">
                                                Unggahan
                                            </p>
                                            <div
                                                className="upload-dropzone"
                                                onClick={(e) => e.stopPropagation()}
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.currentTarget.classList.add("drag-over");
                                                }}
                                                onDragLeave={(e) => {
                                                    e.currentTarget.classList.remove("drag-over");
                                                }}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.currentTarget.classList.remove("drag-over");
                                                    const file = e.dataTransfer.files[0];
                                                    if (file) {
                                                        handleFileUpload({ target: { files: [file] } });
                                                    }
                                                }}
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    accept="image/*,video/*"
                                                    style={{ display: "none" }}
                                                    onChange={(e) => handleFileUpload(e)}
                                                    id="sidebar-file-upload"
                                                />
                                                <label
                                                    htmlFor="sidebar-file-upload"
                                                    className="upload-dropzone-label"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <IconImage style={{ width: 40, height: 40, color: "#6366f1", marginBottom: 12 }} />
                                                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#374151" }}>
                                                        Seret file ke sini atau klik untuk memilih
                                                    </p>
                                                    <p style={{ margin: "8px 0 0", fontSize: 11, color: "#9ca3af" }}>
                                                        Gambar (PNG, JPG, GIF) {"\u00B7"} Video (MP4, WebM)
                                                    </p>
                                                </label>
                                            </div>
                                        </>
                                    )}

                                    {/* ====== PANEL EVENT (dedicated EventSidebar) ====== */}
                                    {activeRailCategory === "event" && (
                                        <EventSidebar
                                            isOpen={true}
                                            onAdd={addElementToCanvas}
                                            activeEventTypes={ALL_EVENT_TYPES}
                                        />
                                    )}

                                    {/* ====== PANEL LAPISAN ====== */}
                                    {activeRailCategory === "lapisan" && (
                                        <div className="layers-panel">
                                            {elements.length === 0 ? (
                                                <p className="layers-empty">
                                                    Belum ada elemen di kanvas.
                                                </p>
                                            ) : (
                                                elements.map((el) => (
                                                    <div
                                                        key={el.id}
                                                        className={
                                                            "layer-item" +
                                                            (selectedId === el.id
                                                                ? " active"
                                                                : "")
                                                        }
                                                        onClick={() =>
                                                            selectElement(el.id)
                                                        }
                                                    >
                                                        <span className="layer-icon">
                                                            {getComponentMeta(
                                                                el.type,
                                                            )?.icon || (
                                                                <IconElement />
                                                            )}
                                                        </span>
                                                        <span className="layer-name">
                                                            {el.name}
                                                        </span>
                                                        <button
                                                            className="layer-visibility"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleVisibility(
                                                                    el.id,
                                                                );
                                                            }}
                                                        >
                                                            {el.visible !==
                                                            false ? (
                                                                <IconEye />
                                                            ) : (
                                                                <IconEyeOff />
                                                            )}
                                                        </button>
                                                        <button
                                                            className="layer-delete"
                                                            title="Hapus elemen"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteElement(
                                                                    el.id,
                                                                );
                                                            }}
                                                        >
                                                            <IconTrash />
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </aside>
                )}

                {/* ===================== KOLOM TENGAH ===================== */}
                <div className="builder-center">
                    {/* Manajemen halaman pindah ke DOCK di bawah (PagesDock) */}

                    {!previewMode && selectedElement && (
                        <button
                            type="button"
                            ref={edgeHandleRef}
                            className="canvas-edge-handle"
                            title="Edit properti elemen"
                            onMouseEnter={() => {
                                cancelEdgeClose();
                                openObjectEditor();
                            }}
                            onMouseLeave={scheduleEdgeClose}
                            onClick={(e) => {
                                e.stopPropagation();
                                openObjectEditor();
                            }}
                        >
                            <IconPencil />
                        </button>
                    )}

                    {/* ===================== CANVAS ===================== */}
                    <main
                        style={{ paddingLeft: sidebarW + 24 }}
                        className="canvas-viewport"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setSelectedId(null);
                        }}
                    >
                    <div
                        className="canvas-page"
                        style={{
                            // Fluid: mengikuti ruang yang tersedia, di-cap lebar
                            // breakpoint. Lebar AKTUAL inilah satu-satunya sumber
                            // kebenaran untuk render & konversi posisi drag/resize.
                            width: "100%",
                            maxWidth: devicePreview === "desktop" ? BASE_CANVAS_WIDTH : DEVICE_BREAKPOINTS[devicePreview].width,
                            // Auto-height: minimal 1 layar penuh saat kosong,
                            // mengembang/menyusut mengikuti elemen paling bawah.
                            minHeight: `max(100vh, ${canvasAutoHeight}px)`,
                            margin: "0 auto"
                        }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget)
                                setSelectedId(null);
                        }}
                        ref={canvasRef}
                    >
                        {elementsWithAbs
                            .filter((el) => {
                                if (el.visible === false) return false;
                                // Saat menyunting, semua objek tetap terlihat supaya EO
                                // bisa memindahkannya; yang di luar mode aktif diredupkan
                                // (lihat opacity di bawah). Di preview, difilter beneran.
                                if (!previewMode) return true;
                                return isElementVisibleInMode(el, viewMode);
                            })
                            .map((el) => {
                            const isSelected = selectedId === el.id;
                            return (
                                    <Rnd
                                        key={el.id}
                                        size={{
                                            width: el.width,
                                            height: el.height,
                                        }}
                                        position={{ x: el.x, y: el.y }}
                                        bounds="parent"
                                        disableDragging={true}
                                        enableResizing={false}
                                        enableUserSelectHack={false}
                                        // Pass onMouseDown to Rnd so DraggableCore invokes it
                                        // BEFORE the disableDragging check — the child div's
                                        // onMouseDown would be overwritten by cloneElement.
                                        onMouseDown={(e) => {
                                            // While editing text on THIS element, ignore clicks
                                            if (editingTextId === el.id) return;
                                            // While editing text on ANOTHER element, just select — no drag
                                            if (editingTextId !== null) {
                                                selectElement(el.id);
                                                return;
                                            }
                                            // Ignore clicks on resize handles / lock indicator
                                            const target = e.target;
                                            if (
                                                target &&
                                                typeof target.closest === "function" &&
                                                target.closest(".rz-h,.responsive-lock-indicator")
                                            ) {
                                                return;
                                            }
                                            if (e.button !== undefined && e.button !== 0) return;

                                            // Single click → just select the element
                                            selectElement(el.id);

                                            // Locked elements and preview mode: no drag setup
                                            if (previewMode || el.locked) return;

                                            // ---- Threshold-based drag detection ----
                                            const rect = canvasRef.current?.getBoundingClientRect();
                                            const cw =
                                                rect && rect.width > 0
                                                    ? rect.width
                                                    : BASE_CANVAS_WIDTH;
                                            const startX = e.clientX;
                                            const startY = e.clientY;
                                            const origX = pctToPx(el.xPct || 0, cw);
                                            const origY = pctToPx(el.yPct || 0, cw);

                                            const DRAG_THRESHOLD = 5;
                                            let dragActive = false;

                                            // Set cursor to 4-direction arrow (move) immediately
                                            // to signal that the element is draggable on hold
                                            document.body.style.cursor = "move";

                                            const onMove = (ev) => {
                                                const dx = ev.clientX - startX;
                                                const dy = ev.clientY - startY;
                                                const distance = Math.sqrt(
                                                    dx * dx + dy * dy,
                                                );

                                                // Below threshold → still a click, no drag
                                                if (distance < DRAG_THRESHOLD) return;

                                                // Movement exceeded threshold → activate drag mode
                                                if (!dragActive) {
                                                    dragActive = true;
                                                    document.body.style.userSelect = "none";
                                                }

                                                const nx =
                                                    origX +
                                                    (ev.clientX - startX);
                                                const ny =
                                                    origY + (ev.clientY - startY);
                                                updateElement(el.id, {
                                                    xPct: Math.round(
                                                        (nx / cw) * 10000,
                                                    ) / 100,
                                                    yPct: Math.round(
                                                        (ny / cw) * 10000,
                                                    ) / 100,
                                                });
                                            };

                                            const onUp = () => {
                                                if (dragActive) {
                                                    document.body.style.userSelect =
                                                        "";
                                                }
                                                // Reset cursor
                                                document.body.style.cursor = "";
                                                // If below threshold (no drag), this was
                                                // just a click — selection stays
                                                window.removeEventListener(
                                                    "mousemove",
                                                    onMove,
                                                );
                                                window.removeEventListener(
                                                    "mouseup",
                                                    onUp,
                                                );
                                            };

                                            window.addEventListener(
                                                "mousemove",
                                                onMove,
                                            );
                                            window.addEventListener(
                                                "mouseup",
                                                onUp,
                                            );
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "100%",
                                                // Objek di luar tab mode aktif diredupkan saat
                                                // menyunting, supaya EO langsung paham objek itu
                                                // tidak akan tampil di halaman yang sedang dibuka.
                                                opacity:
                                                    (typeof el.props?.opacity === "number" ? el.props.opacity : 1) *
                                                    (!previewMode && !isElementVisibleInMode(el, viewMode) ? 0.35 : 1),
                                                ...(fxToCss(el.props?.effects)),
                                            }}
                                            className={
                                                "canvas-element" +
                                                (previewMode &&
                                                el.props?.animation &&
                                                el.props.animation !== "none"
                                                    ? " racik-anim-" + el.props.animation
                                                    : "")
                                            }
                                            onClick={(e) => {
                                                /* Backup selection: react-rnd v10 does NOT
                                                   reliably fire its Rnd-level onMouseDown
                                                   when disableDragging=true, which makes
                                                   "klik objek tidak berfungsi". This child
                                                   onClick is always reachable. */
                                                if (editingTextId === el.id) return;
                                                e.stopPropagation();
                                                selectElement(el.id);
                                            }}
                                            onDoubleClick={(e) => {
                                                if (!TEXT_TOOL_TYPES.includes(el.type)) return;
                                                e.stopPropagation();
                                                setEditingTextId(el.id);
                                            }}
                                        >
                                            <ElementErrorBoundary
                                                elementName={el.name}
                                                resetKey={el.id + ":" + el.type}
                                                silent={!!previewMode}
                                            >
                                                <ElementRenderer
                                                    el={el}
                                                    now={now}
                                                    isPreview={previewMode}
                                                    devicePreview={devicePreview}
                                                    isEditingText={editingTextId === el.id}
                                                    onCommitInlineText={(content) =>
                                                        commitInlineText(el.id, content)
                                                    }
                                                />
                                            </ElementErrorBoundary>
                                        {/* Editing properti lewat panel sidebar kiri */}
                                        {/* Resize handles (4 sudut) */}
                                        {isSelected && !el.locked &&
                                            ["nw", "ne", "sw", "se"].map((dir) => (
                                                <span
                                                    key={dir}
                                                    className={"rz-h rz-" + dir}
                                                    onPointerDown={(e) =>
                                                        startObjectResize(e, el, dir)
                                                    }
                                                />
                                            ))}
                                        {/* Lock/Unlock indicator for tablet/mobile */}
                                        {selectedId === el.id && devicePreview !== "desktop" && (
                                            <div
                                                className="responsive-lock-indicator"
                                                style={{
                                                    position: "absolute",
                                                    top: 4,
                                                    right: 4,
                                                    zIndex: 10,
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 4,
                                                    background: el.autoLocked?.[devicePreview] ? "#10b981" : "#f59e0b",
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 10,
                                                    cursor: "help",
                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                                }}
                                                title={el.autoLocked?.[devicePreview]
                                                    ? `Auto-responsive aktif (${devicePreview})`
                                                    : `Custom override aktif (${devicePreview}) - Klik untuk reset`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!el.autoLocked?.[devicePreview]) {
                                                        setElements((prev) =>
                                                            prev.map((elem) =>
                                                                elem.id === el.id
                                                                    ? resetToAuto(elem, devicePreview)
                                                                    : elem
                                                            )
                                                        );
                                                    }
                                                }}
                                            >
                                                {el.autoLocked?.[devicePreview] ? <IconLock /> : <IconUnlock />}
                                            </div>
                                        )}
                                    </div>
                                    </Rnd>
                                );
                            })}

                                    {/* ===================== CANVAS EMPTY HINT ===================== */}
                                    {elements.length === 0 && (
                                        <div className="canvas-empty-hint">
                                            Seret elemen ke sini
                                            <span className="canvas-empty-hint-sub">
                                                atau pilih dari panel di sebelah kiri
                                            </span>
                                        </div>
                                    )}
                                    </div>
                                </main>

                                {/* ===================== DOCK HALAMAN (bawah layar) ===================== */}
                                <PagesDock
                                    leftOffset={sidebarW}
                                    pages={eventPages}
                                    activePageId={currentPageId}
                                    onSelect={switchToPage}
                                    onAdd={addPage}
                                    onRename={renamePage}
                                    onRequestDelete={(id) => setConfirmDeletePageId(id)}
                                    renderThumb={(el) => (
                                        <ElementErrorBoundary
                                            elementName={el.name}
                                            resetKey={el.id + ":" + el.type}
                                            silent
                                        >
                                            <ElementRenderer
                                                el={el}
                                                now={now}
                                                devicePreview="desktop"
                                            />
                                        </ElementErrorBoundary>
                                    )}
                                />
                                </div>
                                {/* /builder-center */}

                                {/* Dialog konfirmasi hapus halaman */}
                                {confirmDeletePageId && (
                                    <div
                                        className="validation-modal-overlay"
                                        onClick={() => setConfirmDeletePageId(null)}
                                    >
                                        <div
                                            className="validation-modal"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <h3 style={{ margin: "0 0 8px" }}>Hapus halaman?</h3>
                                            <p style={{ margin: "0 0 16px", fontSize: 13, color: "#6b7280" }}>
                                                Halaman "{eventPages.find((p) => p.id === confirmDeletePageId)?.name || ""}"
                                                beserta seluruh isinya akan dihapus permanen. Aksi ini tidak bisa di-undo.
                                            </p>
                                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                                <button type="button" className="btn-ghost" onClick={() => setConfirmDeletePageId(null)}>
                                                    Batal
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-primary"
                                                    style={{ background: "#dc2626" }}
                                                    onClick={() => {
                                                        deletePage(confirmDeletePageId);
                                                        setConfirmDeletePageId(null);
                                                    }}
                                                >
                                                    Hapus Halaman
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Validation Modal */}
                                {showValidationModal && (
                                    <div
                                        className="validation-modal-overlay"
                                        onClick={() => setShowValidationModal(false)}
                                        style={{
                                            position: "fixed",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: "rgba(0,0,0,0.5)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 1000,
                                        }}
                                    >
                                        <div
                                            className="validation-modal"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                background: "#fff",
                                                borderRadius: 12,
                                                padding: 24,
                                                maxWidth: 500,
                                                width: "90%",
                                                maxHeight: "80vh",
                                                overflow: "auto",
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Validasi Layout Responsif</h3>
                                                <button onClick={() => setShowValidationModal(false)}
                                                    style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#9ca3af" }}>×</button>
                                            </div>
                                            {validationWarnings.length === 0 ? (
                                                <div style={{ textAlign: "center", padding: 32, color: "#10b981" }}>
                                                    Tidak ada peringatan. Layout siap dipublish.
                                                </div>
                                            ) : (
                                                validationWarnings.map((w, i) => (
                                                    <p key={i} style={{ fontSize: 13, color: w.type === "error" ? "#dc2626" : "#b45309", margin: "0 0 8px" }}>
                                                        {w.message}
                                                    </p>
                                                ))
                                            )}
                                            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                                                <button type="button" className="btn-primary" onClick={() => setShowValidationModal(false)}>
                                                    Tutup
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showPublishModal && (
                                    <div
                                        className="validation-modal-overlay"
                                        onClick={() => setShowPublishModal(false)}
                                        style={{
                                            position: "fixed",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: "rgba(0,0,0,0.5)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 1000,
                                        }}
                                    >
                                        <div
                                            className="validation-modal publish-modal"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                background: "#fff",
                                                borderRadius: 12,
                                                padding: 24,
                                                maxWidth: 480,
                                                width: "90%",
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                                                    {publishStatus === "error" ? "Publikasi Gagal" : "Event Terpublikasi"}
                                                </h3>
                                                <button onClick={() => setShowPublishModal(false)}
                                                    style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#9ca3af" }}>×</button>
                                            </div>

                                            {publishStatus === "error" ? (
                                                <>
                                                    <p style={{ fontSize: 13, color: "#dc2626", margin: "0 0 16px" }}>
                                                        {publishError || "Terjadi kesalahan. Coba lagi."}
                                                    </p>
                                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                                        <button type="button" className="btn-ghost" onClick={() => setShowPublishModal(false)}>
                                                            Tutup
                                                        </button>
                                                        <button type="button" className="btn-primary" onClick={handlePublish}>
                                                            Coba Lagi
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 16px" }}>
                                                        Peserta bisa membuka event ini lewat tautan berikut.
                                                    </p>

                                                    <PublishLinkRow
                                                        label="Subdomain"
                                                        url={publicUrls?.subdomain}
                                                        emptyHint="Belum aktif — isi EVENT_SUBDOMAIN_HOST di .env server untuk mengaktifkan URL subdomain."
                                                        highlight
                                                    />
                                                    <PublishLinkRow
                                                        label="Tautan cadangan (selalu aktif)"
                                                        url={publicUrls?.path}
                                                    />

                                                    <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <button
                                                            type="button"
                                                            className="btn-ghost"
                                                            onClick={handleUnpublish}
                                                            disabled={publishStatus === "publishing"}
                                                            style={{ color: "#dc2626" }}
                                                        >
                                                            Batalkan Publikasi
                                                        </button>
                                                        <button type="button" className="btn-primary" onClick={() => setShowPublishModal(false)}>
                                                            Selesai
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                </div>
            </div>
    );
}

function polygonPoints(sides, cx, cy, r, rotation = -Math.PI / 2) {
    const pts = [];
    for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides;
        pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
    }
    return pts.join(" ");
}

function starPoints(count, cx, cy, r, rotation = -Math.PI / 2) {
    const pts = [];
    const total = count * 2;
    for (let i = 0; i < total; i++) {
        const angle = rotation + (i * Math.PI) / count;
        const radius = i % 2 === 0 ? r : r * 0.45;
        pts.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
    }
    return pts.join(" ");
}

function heartPath(cx, cy, size) {
    const s = size / 2;
    return (
        `M ${cx} ${cy + s * 0.9} ` +
        `C ${cx - s * 1.1} ${cy + s * 0.15}, ${cx - s * 0.95} ${cy - s * 0.85}, ${cx} ${cy - s * 0.25} ` +
        `C ${cx + s * 0.95} ${cy - s * 0.85}, ${cx + s * 1.1} ${cy + s * 0.15}, ${cx} ${cy + s * 0.9} Z`
    );
}

function speechBubblePath(w, h, tailW, tailH, cornerRadius) {
    const bodyH = h - tailH;
    const r = Math.max(0, Math.min(cornerRadius, w / 3, bodyH / 2));
    const cx = w / 2;
    return (
        `M 0 ${r} Q 0 0 ${r} 0 ` +
        `L ${w - r} 0 Q ${w} 0 ${w} ${r} ` +
        `L ${w} ${bodyH - r} Q ${w} ${bodyH} ${w - r} ${bodyH} ` +
        `L ${cx + tailW / 2} ${bodyH} L ${cx} ${h} L ${cx - tailW / 2} ${bodyH} ` +
        `L ${r} ${bodyH} Q 0 ${bodyH} 0 ${bodyH - r} Z`
    );
}

function blobPath(cx, cy, baseR) {
    const n = 8;
    const radii = [];
    const angles = [];
    for (let i = 0; i < n; i++) {
        angles.push((i * 2 * Math.PI) / n);
        radii.push(baseR * (0.72 + Math.sin(i * 2.4) * 0.28));
    }
    const px = (i) => cx + radii[i] * Math.cos(angles[i]);
    const py = (i) => cy + radii[i] * Math.sin(angles[i]);
    let d = `M ${(px(0) + px(n - 1)) / 2} ${(py(0) + py(n - 1)) / 2} `;
    for (let i = 0; i < n; i++) {
        const next = (i + 1) % n;
        d += `Q ${px(i).toFixed(2)} ${py(i).toFixed(2)} ${((px(i) + px(next)) / 2).toFixed(2)} ${((py(i) + py(next)) / 2).toFixed(2)} `;
    }
    return d + "Z";
}

// ===================== SHAPE RENDERER =====================
const STROKED_SHAPE_TYPES = ["line", "arrow", "divider"];

function ShapeContent({ type, props, width, height }) {
    const p = props || {};
    const isStroked = STROKED_SHAPE_TYPES.includes(type);
    const sw = Math.min(p.strokeWidth || 2, 40);
    const fillColor = p.bgColor || "#4b5563";
    const strokeColor = p.strokeColor || "#6b7280";
    const dashArray =
        p.strokeDasharray && p.strokeDasharray !== "none"
            ? p.strokeDasharray
            : undefined;
    const w = Math.max(width || 100, 4);
    const h = Math.max(height || 100, 4);
    const inset = isStroked ? sw / 2 : 0;
    const cx = w / 2;
    const cy = h / 2;
    const rx = Math.max(w / 2 - inset, 1);
    const ry = Math.max(h / 2 - inset, 1);
    const r = Math.max(Math.min(w, h) / 2 - inset, 1);

    const commonShapeProps = {
        fill: isStroked ? "none" : fillColor,
        stroke: isStroked ? strokeColor : "none",
        strokeWidth: isStroked ? sw : undefined,
        strokeDasharray: dashArray,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    switch (type) {
        case "rectangle":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <rect x={inset} y={inset} width={Math.max(w - inset * 2, 1)} height={Math.max(h - inset * 2, 1)} {...commonShapeProps} />
                </svg>
            );
        case "rounded-rectangle":
        case "shape":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <rect
                        x={inset}
                        y={inset}
                        width={Math.max(w - inset * 2, 1)}
                        height={Math.max(h - inset * 2, 1)}
                        rx={Math.min(p.radius ?? 16, w / 2, h / 2)}
                        ry={Math.min(p.radius ?? 16, w / 2, h / 2)}
                        {...commonShapeProps}
                    />
                </svg>
            );
        case "circle":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} {...commonShapeProps} />
                </svg>
            );
        case "triangle":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <polygon points={polygonPoints(3, cx, cy, r)} {...commonShapeProps} />
                </svg>
            );
        case "diamond":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <polygon points={polygonPoints(4, cx, cy, r, -Math.PI / 2)} {...commonShapeProps} />
                </svg>
            );
        case "pentagon":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <polygon points={polygonPoints(5, cx, cy, r)} {...commonShapeProps} />
                </svg>
            );
        case "hexagon":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <polygon points={polygonPoints(6, cx, cy, r)} {...commonShapeProps} />
                </svg>
            );
        case "polygon":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <polygon points={polygonPoints(Math.round(p.sides || 6), cx, cy, r)} {...commonShapeProps} />
                </svg>
            );
        case "star":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <polygon points={starPoints(Math.round(p.points || 5), cx, cy, r)} {...commonShapeProps} />
                </svg>
            );
        case "heart":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <path d={heartPath(cx, cy, Math.min(w, h))} {...commonShapeProps} />
                </svg>
            );
        case "speech-bubble":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <path
                        d={speechBubblePath(w, h, Math.min(24, w * 0.3), Math.min(22, h * 0.35), p.radius ?? 12)}
                        fill={fillColor}
                        stroke="none"
                    />
                </svg>
            );
        case "blob":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <path d={blobPath(cx, cy, r)} {...commonShapeProps} />
                </svg>
            );
        case "line":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <line x1={inset} y1={cy} x2={Math.max(w - inset, inset)} y2={cy} stroke={strokeColor} strokeWidth={sw} strokeDasharray={dashArray} strokeLinecap="round" />
                </svg>
            );
        case "arrow": {
            const headLen = Math.min(Math.max(sw * 3.5, 10), w * 0.35);
            const headHalf = Math.max(sw * 2.2, 5);
            const tipX = w - inset;
            const shaftEndX = tipX - headLen;
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <line x1={inset} y1={cy} x2={shaftEndX} y2={cy} stroke={strokeColor} strokeWidth={sw} strokeDasharray={dashArray} strokeLinecap="round" />
                    <polygon points={`${tipX},${cy} ${shaftEndX},${cy - headHalf} ${shaftEndX},${cy + headHalf}`} fill={strokeColor} />
                </svg>
            );
        }
        case "divider":
            return (
                <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                    <line x1={0} y1={cy} x2={w} y2={cy} stroke={strokeColor} strokeWidth={sw} strokeDasharray={dashArray} strokeLinecap="round" />
                </svg>
            );
        case "badge": {
            const padX = p.paddingX ?? 12;
            const padY = p.paddingY ?? 4;
            const fontSize = Math.max(10, Math.min((h - padY * 2) * 0.9, 32));
            return (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: fillColor,
                        color: p.textColor || "#ffffff",
                        borderRadius: p.radius ?? 9999,
                        padding: `${padY}px ${padX}px`,
                        overflow: "hidden",
                        boxSizing: "border-box",
                    }}
                >
                    <span style={{ fontSize, fontWeight: 600, whiteSpace: "nowrap", fontFamily: "system-ui, sans-serif", lineHeight: 1 }}>
                        {p.label || "Badge"}
                    </span>
                </div>
            );
        }
        default:
            return (
                <div style={{ width: "100%", height: "100%", background: fillColor, borderRadius: p.radius ?? 4 }} />
            );
    }
}


// ===================== RENDER ELEMEN DI KANVAS =====================
export function ElementRenderer({
    el,
    now,
    isPreview = false,
    devicePreview = "desktop",
    isEditingText = false,
    onCommitInlineText,
}) {
    const effectiveProps = getEffectiveProps(el, devicePreview);

    const responsiveStyle = {};

    // Helper: wrap content with <a> if isLink is true
    const wrapWithLink = (content, p) => {
        if (!p.isLink || !p.linkUrl) return content;
        const href = p.linkTarget || p.linkUrl || '#';
        const target = p.openInNewTab !== false ? '_blank' : '_self';
        const rel = p.openInNewTab !== false ? 'noopener noreferrer' : '';
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                style={{ textDecoration: 'none', color: 'inherit', display: 'inline' }}
            >
                {content}
            </a>
        );
    };

    switch (el.type) {
        case "text": {
            const p = effectiveProps;
            const baseTextStyle = {
                ...responsiveStyle,
                fontSize: p.fontSize,
                color: p.color,
                fontWeight: p.fontWeight,
                fontStyle: p.fontStyle,
                fontFamily: p.fontFamily,
                letterSpacing:
                    p.letterSpacing !== undefined && p.letterSpacing !== 0
                        ? p.letterSpacing + "px"
                        : undefined,
                textDecoration:
                    p.textDecoration && p.textDecoration !== "none"
                        ? p.textDecoration
                        : undefined,
                lineHeight: p.lineHeight || 1.5,
                wordBreak: isPreview ? "break-word" : undefined,
                overflowWrap: isPreview ? "anywhere" : undefined,
                maxWidth: "100%",
                textAlign: p.textAlign,
            };

            if (isEditingText) {
                return (
                    <div
                        className="el-text el-text-editing"
                        style={{ ...baseTextStyle, fontSize: p.fontSize }}
                        contentEditable
                        suppressContentEditableWarning
                        ref={(n) => {
                            if (n) {
                                n.focus();
                                try {
                                    const r = document.createRange();
                                    r.selectNodeContents(n);
                                    r.collapse(false);
                                    const sel = window.getSelection();
                                    if (sel) {
                                        sel.removeAllRanges();
                                        sel.addRange(r);
                                    }
                                } catch (err) {}
                            }
                        }}
                        onBlur={(e) => onCommitInlineText(e.currentTarget.innerText)}
                        onKeyDown={(e) => { if (e.key === "Escape") e.currentTarget.blur(); }}
                    >
                        {p.content}
                    </div>
                );
            }

            const ls = p.listStyle;
            if (ls && ls !== "none") {
                const items = String(p.content || "")
                    .split(/\r?\n/)
                    .map((s) => s.trim())
                    .filter(Boolean);
                const orderedTypes = ["decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"];
                const Tag = orderedTypes.includes(ls) ? "ol" : "ul";
                const typeMap = {
                    bullet: "disc",
                    circle: "circle",
                    square: "square",
                    decimal: "decimal",
                    lowerAlpha: "lower-alpha",
                    upperAlpha: "upper-alpha",
                    lowerRoman: "lower-roman",
                    upperRoman: "upper-roman",
                };
                const listNode = (
                    <Tag
                        className="el-text-list"
                        style={{
                            ...baseTextStyle,
                            listStyleType: typeMap[ls] || "disc",
                            paddingLeft: "1.4em",
                            margin: 0,
                        }}
                    >
                        {items.map((s, i2) => (
                            <li key={i2} style={{ marginBottom: 4 }}>{s}</li>
                        ))}
                    </Tag>
                );
                return listNode;
            }

            return wrapWithLink(
                <div className="el-text" style={baseTextStyle}>
                    {p.content}
                </div>,
                p
            );
        }

        case "link":
            return (
                <div
                    className="el-link"
                    style={{
                        ...responsiveStyle,
                        fontSize: effectiveProps.fontSize,
                        color: effectiveProps.color,
                        fontWeight: effectiveProps.fontWeight,
                        fontStyle: effectiveProps.fontStyle,
                        fontFamily: effectiveProps.fontFamily,
                        textDecoration: "underline",
                        textDecorationColor: effectiveProps.hoverColor || effectiveProps.color,
                        textUnderlineOffset: 3,
                        cursor: "pointer",
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        maxWidth: "100%",
                    }}
                    title={
                        effectiveProps.linkType === "internal"
                            ? "Link internal"
                            : effectiveProps.linkTarget || "Belum ada URL tujuan"
                    }
                >
                    {effectiveProps.content}
                </div>
            );

        case "title":
            return wrapWithLink(
                <SectionInner type="title" props={effectiveProps}>
                <h1
                    className="el-title"
                    style={{
                        ...responsiveStyle,
                        fontSize: effectiveProps.fontSize,
                        color: effectiveProps.color,
                        fontWeight: effectiveProps.fontWeight,
                        fontFamily: effectiveProps.fontFamily,
                        letterSpacing:
                            effectiveProps.letterSpacing !== undefined && effectiveProps.letterSpacing !== 0
                                ? effectiveProps.letterSpacing + "px"
                                : undefined,
                        lineHeight: effectiveProps.lineHeight,
                        textAlign: effectiveProps.textAlign,
                        maxWidth: "100%",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                    }}
                >
                    {effectiveProps.content}
                </h1>
                </SectionInner>
            , effectiveProps);

        case "subtitle":
            return wrapWithLink(
                <SectionInner type="subtitle" props={effectiveProps}>
                <h2
                    className="el-subtitle"
                    style={{
                        ...responsiveStyle,
                        fontSize: effectiveProps.fontSize,
                        color: effectiveProps.color,
                        fontWeight: effectiveProps.fontWeight,
                        fontFamily: effectiveProps.fontFamily,
                        letterSpacing:
                            effectiveProps.letterSpacing !== undefined && effectiveProps.letterSpacing !== 0
                                ? effectiveProps.letterSpacing + "px"
                                : undefined,
                        lineHeight: effectiveProps.lineHeight,
                        textAlign: effectiveProps.textAlign,
                        maxWidth: "100%",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                    }}
                >
                    {effectiveProps.content}
                </h2>
                </SectionInner>
            , effectiveProps);

        case "image":
            return wrapWithLink(
                <img
                    className="el-image"
                    src={effectiveProps.src}
                    alt={effectiveProps.alt}
                    draggable={false}
                    style={{
                        ...responsiveStyle,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                        filter:
                            effectiveProps.filter && effectiveProps.filter !== "none"
                                ? (FILTER_PRESETS.find((f) => f.key === effectiveProps.filter)?.css)
                                : undefined,
                    }}
                />
            , effectiveProps);

        case "video": {
            const src = effectiveProps.src || "";
            const isEmbed = /youtube\.com|youtu\.be|vimeo\.com|dailymotion|\/embed\//i.test(src);
            const cssFilter =
                effectiveProps.filter && effectiveProps.filter !== "none"
                    ? (FILTER_PRESETS.find((f) => f.key === effectiveProps.filter)?.css)
                    : undefined;
            return wrapWithLink(
                <div className="el-video" style={{ ...responsiveStyle, width: "100%", height: "100%" }}>
                    {isEmbed ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={src}
                            title={effectiveProps.alt}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <CanvasVideo src={src} cssFilter={cssFilter} />
                    )}
                </div>
            , effectiveProps);
        }

        case "button":
            return wrapWithLink(
                <button
                    type="button"
                    className="el-button"
                    style={{
                        ...responsiveStyle,
                        background: effectiveProps.bgColor,
                        color: effectiveProps.textColor,
                        borderRadius: effectiveProps.radius,
                        fontSize: effectiveProps.fontSize || 14,
                        padding: "10px 20px",
                        border: "none",
                        cursor: "pointer",
                        width: effectiveProps.width || (devicePreview === "mobile" ? "100%" : "auto"),
                    }}
                    onClick={
                        isPreview &&
                        effectiveProps.action === "page" &&
                        effectiveProps.actionTarget
                            ? (e) => {
                                  e.stopPropagation();
                                  window.dispatchEvent(
                                      new CustomEvent("racik-navigate", {
                                          detail: effectiveProps.actionTarget,
                                      }),
                                  );
                              }
                            : undefined
                    }
                >
                    {effectiveProps.label}
                </button>
            , effectiveProps);

        case "google-login":
            return wrapWithLink(
                <a
                    href="/auth/google/redirect"
                    className="el-google-login"
                    style={{
                        ...responsiveStyle,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "10px 20px",
                        borderRadius: effectiveProps.radius || 4,
                        fontSize: effectiveProps.fontSize || 14,
                        fontWeight: 500,
                        textDecoration: "none",
                        background: effectiveProps.bgColor || "#ffffff",
                        color: effectiveProps.textColor || "#333333",
                        border: `1px solid ${effectiveProps.borderColor || "#dadce0"}`,
                        cursor: "pointer",
                        width: effectiveProps.width || (devicePreview === "mobile" ? "100%" : "auto"),
                        boxSizing: "border-box",
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/>
                        <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z" fill="#34A853"/>
                        <path d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" fill="#FBBC05"/>
                        <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                    {effectiveProps.label || "Masuk dengan Google"}
                </a>
            , effectiveProps);

        // ===== SHAPES =====
        case "rectangle":
        case "rounded-rectangle":
        case "circle":
        case "triangle":
        case "diamond":
        case "pentagon":
        case "hexagon":
        case "polygon":
        case "star":
        case "heart":
        case "speech-bubble":
        case "blob":
        case "line":
        case "arrow":
        case "divider":
        case "badge":
        case "shape":
            return wrapWithLink(
                <div
                    className={"el-shape"}
                    style={{
                        ...responsiveStyle,
                        minWidth: 12,
                        minHeight: 12,
                    }}
                >
                    <ShapeContent
                        type={el.type}
                        props={effectiveProps}
                        width={el.width}
                        height={el.height}
                    />
                </div>
            , effectiveProps);

        default:
            break;
    }

    // Event elements — delegated to EventElements.jsx
    const isEvent = ALL_EVENT_TYPES.includes(el.type);
    if (isEvent) {
        const rendered = renderEventElement(
            { ...el, props: effectiveProps },
            now,
            isPreview,
        );
        const wrapped = wrapElementWithLink(rendered, effectiveProps);
        if (el.type === "navbar") {
            return <>{wrapped}</>;
        }
        return (
            <SectionInner type={el.type} props={effectiveProps}>
                {wrapped}
            </SectionInner>
        );
    }

    return null;
}


// ===================== ERROR BOUNDARY =====================
class ElementErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, message: error?.message || String(error) };
    }

    componentDidCatch(error, info) {
        console.error(
            `Gagal merender elemen "${this.props.elementName || "tanpa nama"}":`,
            error,
            info?.componentStack,
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
            this.setState({ hasError: false, message: "" });
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.silent) return null;
            return (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        minHeight: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        padding: "4px 8px",
                        boxSizing: "border-box",
                        background: "#fef2f2",
                        border: "1px dashed #fca5a5",
                        borderRadius: 6,
                        color: "#b91c1c",
                        fontSize: 11,
                        fontWeight: 500,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                    }}
                    title={this.state.message}
                >
                    ⚠️ {(this.props.elementName || "Elemen") + " gagal dirender"}
                </div>
            );
        }
        return this.props.children;
    }
}

const TEXT_TOOL_TYPES = ["text", "link", "title", "subtitle"];
const STROKED_TOOL_TYPES = ["line", "arrow", "divider"];
const RADIUS_TOOL_TYPES = [
    "rectangle", "rounded-rectangle", "circle",
    "speech-bubble", "blob", "badge", "shape",
];
const SHAPE_TOOL_TYPES = [
    ...STROKED_TOOL_TYPES,
    "rectangle", "rounded-rectangle", "circle", "triangle", "diamond",
    "pentagon", "hexagon", "polygon", "star", "heart", "speech-bubble",
    "blob", "badge", "shape",
];
const FILTER_PRESETS = [
    { key: "none", css: "none", label: "Normal" },
    { key: "grayscale", css: "grayscale(1)", label: "Abu" },
    { key: "sepia", css: "sepia(.7)", label: "Sepia" },
    { key: "bright", css: "brightness(1.15)", label: "Terang" },
    { key: "blur", css: "blur(2px)", label: "Kabur" },
];

function primaryColorField(type, props = {}) {
    if (STROKED_TOOL_TYPES.includes(type)) return "strokeColor";
    for (const f of ["bgColor", "buttonColor", "color"]) {
        if (props[f]) return f;
    }
    return null;
}

/* Tombol play overlay untuk video di kanvas builder (Bug 3):
   video bisa diputar langsung tanpa masuk mode Preview.
   Overlay di tengah + zIndex tinggi supaya tidak tertutup handle seleksi. */
function CanvasVideo({ src, cssFilter }) {
    const vidRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const togglePlay = (e) => {
        e.stopPropagation();
        const v = vidRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <video
                ref={vidRef}
                className="el-video-file"
                src={src}
                muted
                playsInline
                preload="metadata"
                controls={false}
                onEnded={() => setPlaying(false)}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 4,
                    background: "#111827",
                    filter: cssFilter,
                    display: "block",
                }}
            />
            {!playing && (
                <button
                    type="button"
                    aria-label="Putar video"
                    title="Putar video"
                    onClick={togglePlay}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                        display: "grid",
                        placeItems: "center",
                        background: "rgba(0,0,0,0.55)",
                        color: "#fff",
                        zIndex: 20,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                        transition: "background .15s ease, transform .15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.75)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.55)"; }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

function TBtn({ active, title, onClick, children }) {
    return (
        <button
            type="button"
            title={title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={"ftb-btn" + (active ? " active" : "")}
        >
            {children}
        </button>
    );
}

export function ObjectPropertyPanel({
    el,
    onUpdate,
    onUpdateProps,
    onDuplicate,
    devicePreview,
    pages,
    eventPages = [],
    onResetToAuto,
    usedColors = [],
    onMoveLayer,
    siblingElements = [],
}) {
    const [panel, setPanel] = useState(null); // null | "color"
    const fp = el.props || {};
    const t = el.type;

    const isTextLike = TEXT_TOOL_TYPES.includes(t);
    const isStroked = STROKED_TOOL_TYPES.includes(t);
    const isShape = SHAPE_TOOL_TYPES.includes(t);
    const isEvent = ALL_EVENT_TYPES.includes(t);
    const colorField = primaryColorField(t, fp);

    // ---- efek visual (shadow/border/blur) ----
    const fxList = Array.isArray(fp.effects) ? fp.effects : [];
    const getFx = (type) => fxList.find((f) => f.type === type) || null;
    const setFx = (type, cfg) => {
        const arr = fxList.filter((f) => f.type !== type);
        if (cfg) arr.push({ type, ...cfg });
        onUpdateProps({ effects: arr });
    };
    const updFx = (type, patch) => {
        onUpdateProps({
            effects: fxList.map((f) =>
                f.type === type ? { ...f, ...patch } : f,
            ),
        });
    };


    const fxShadow = getFx("shadow");
    const fxBorder = getFx("border");
    const fxBlur = getFx("blur");

    // ---- kontrol cepat per kategori ----
    const controls = [];

    // ===== TEKS: font, ukuran, gaya, align, list, spacing =====
    if (isTextLike) {
        const fs = Math.round(Number(fp.fontSize)) || 16;
        const isBold = String(fp.fontWeight) === "700";
        const isItalic = fp.fontStyle === "italic";
        const deco = String(fp.textDecoration || "");
        const isUnder = deco.includes("underline");
        const isStrike = deco.includes("line-through");
        const ls = fp.listStyle || "none";

        controls.push(
            <div key="grp-font" className="ctl-box">
                <div className="ctl-row">
                    <span className="ctl-label"><IconType /></span>
                    <select
                        className="ctl-select"
                        style={{ fontFamily: fp.fontFamily || "inherit" }}
                        value={fp.fontFamily || ""}
                        onChange={(e) =>
                            onUpdateProps({
                                fontFamily: e.target.value || undefined,
                            })
                        }
                    >
                        <option value="">Font default</option>
                        {FONT_FAMILIES.map((f) => (
                            <option key={f.label} value={f.value} style={{ fontFamily: f.preview }}>
                                {f.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="ctl-row">
                    <span className="ctl-label"><IconType /></span>
                    <TBtn title="Perkecil font" onClick={() => onUpdateProps({ fontSize: Math.max(8, fs - 2) })}>
                        <IconMinus />
                    </TBtn>
                    <input
                        type="number"
                        min={8}
                        max={120}
                        value={fs}
                        className="ctl-number"
                        onChange={(e) =>
                            onUpdateProps({
                                fontSize: Math.min(
                                    120,
                                    Math.max(8, Number(e.target.value) || 8),
                                ),
                            })
                        }
                    />
                    <TBtn title="Perbesar font" onClick={() => onUpdateProps({ fontSize: Math.min(120, fs + 2) })}>
                        <IconPlus />
                    </TBtn>
                </div>
            </div>,
        );

        controls.push(
            <div key="grp-style" className="ctl-box">
                <div className="ctl-row">
                    <TBtn title="Tebal (Bold)" active={isBold} onClick={() => onUpdateProps({ fontWeight: isBold ? "400" : "700" })}>
                        <IconBold />
                    </TBtn>
                    <TBtn title="Miring (Italic)" active={isItalic} onClick={() => onUpdateProps({ fontStyle: isItalic ? "normal" : "italic" })}>
                        <IconItalic />
                    </TBtn>
                    <TBtn title="Garis bawah" active={isUnder}
                        onClick={() => onUpdateProps({ textDecoration: combineDeco(deco, "underline") })}>
                        <IconUnderline />
                    </TBtn>
                    <TBtn title="Coret" active={isStrike}
                        onClick={() => onUpdateProps({ textDecoration: combineDeco(deco, "line-through") })}>
                        <IconStrikethrough />
                    </TBtn>
                </div>
                <div className="ctl-row ctl-align-group">
                    {[
                        ["left", "Rata kiri"],
                        ["center", "Rata tengah"],
                        ["right", "Rata kanan"],
                        ["justify", "Rata kiri-kanan"],
                    ].map(([val, title]) => (
                        <TBtn
                            key={val}
                            title={title}
                            active={(fp.textAlign || "left") === val}
                            onClick={() => onUpdateProps({ textAlign: val })}
                        >
                            <AlignIcon align={val} />
                        </TBtn>
                    ))}
                </div>
            </div>,
        );

        controls.push(
            <details key="grp-list-spacing" className="ctl-box ctl-accordion" style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px", marginTop: 4 }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 12, color: "#374151", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <IconList /> Format Daftar & Spasi
                    </span>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{ls !== "none" ? "Aktif" : "Buka"}</span>
                </summary>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div className="ctl-row">
                        <span className="ctl-label" style={{ fontSize: 11, color: "#6b7280", minWidth: 60 }}>Gaya Daftar</span>
                        <select
                            className="ctl-select"
                            value={ls}
                            onChange={(e) => onUpdateProps({ listStyle: e.target.value })}
                        >
                            <option value="none">Tanpa daftar</option>
                            <optgroup label="Unordered">
                                <option value="bullet">{"Bullet \u2022"}</option>
                                <option value="circle">{"Circle \u25CB"}</option>
                                <option value="square">{"Square \u25AA"}</option>
                            </optgroup>
                            <optgroup label="Ordered">
                                <option value="decimal">Angka (1,2,3)</option>
                                <option value="lowerAlpha">Huruf kecil (a,b,c)</option>
                                <option value="upperAlpha">Huruf besar (A,B,C)</option>
                                <option value="lowerRoman">Romawi kecil (i,ii,iii)</option>
                                <option value="upperRoman">Romawi besar (I,II,III)</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="ctl-row">
                        <span className="ctl-label" style={{ fontSize: 11, color: "#6b7280", minWidth: 60 }}>Spasi Huruf</span>
                        <input
                            type="range"
                            min={-2}
                            max={10}
                            step={0.5}
                            value={fp.letterSpacing ?? 0}
                            style={{ flex: 1 }}
                            title="Jarak huruf"
                            onChange={(e) =>
                                onUpdateProps({ letterSpacing: Number(e.target.value) })
                            }
                        />
                        <span className="ctl-value">{fp.letterSpacing ?? 0}px</span>
                    </div>
                    <div className="ctl-row">
                        <span className="ctl-label" style={{ fontSize: 11, color: "#6b7280", minWidth: 60 }}>Tinggi Baris</span>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.05}
                            value={fp.lineHeight ?? 1.5}
                            style={{ flex: 1 }}
                            title="Jarak baris"
                            onChange={(e) =>
                                onUpdateProps({ lineHeight: Number(e.target.value) })
                            }
                        />
                        <span className="ctl-value">{Number(fp.lineHeight ?? 1.5).toFixed(2)}</span>
                    </div>
                </div>
            </details>,
        );

        controls.push(
            <div key="grp-color-text" className="ctl-box">
                <div className="ctl-row">
                    <span className="ctl-label"><IconTextColor /></span>
                    <TBtn title="Warna teks"
                        active={panel === "color"}
                        onClick={() => setPanel((p) => (p === "color" ? null : "color"))}>
                        <span className="ftb-swatch lg" style={{ background: fp.color || "#1a1a1a" }} />
                    </TBtn>
                    <span className="ctl-value mono">{(fp.color || "#1a1a1a").toUpperCase()}</span>
                </div>
            </div>,
        );
    }

    // ===== SHAPE: fill/radius/stroke =====
    if (isShape) {
        const strokeMode = isStroked;
        const colorKey = strokeMode ? "strokeColor" : "bgColor";
        controls.push(
            <div key="grp-fill" className="ctl-box">
                <div className="ctl-row">
                    <span className="ctl-label">
                        {strokeMode ? <IconLineWidth /> : <IconFill />}
                    </span>
                    <TBtn title={strokeMode ? "Warna garis" : "Warna bentuk"}
                        active={panel === "color"}
                        onClick={() => setPanel((p) => (p === "color" ? null : "color"))}>
                        <span className="ftb-swatch lg"
                            style={{ background: fp[colorKey] || (strokeMode ? "#6b7280" : "#4b5563") }} />
                    </TBtn>
                    <span className="ctl-value mono">
                        {(fp[colorKey] || (strokeMode ? "#6b7280" : "#4b5563")).toUpperCase()}
                    </span>
                </div>
            </div>,
        );
        if (RADIUS_TOOL_TYPES.includes(t)) {
            const r = Math.min(Number(fp.radius) || 0, 60);
            controls.push(
                <div key="grp-radius" className="ctl-box">
                    <div className="ctl-row">
                        <span className="ctl-label"><IconRadius /></span>
                        <input type="range" min={0} max={60} value={r} style={{ flex: 1 }}
                            onChange={(e) => onUpdateProps({ radius: Number(e.target.value) })} />
                        <span className="ctl-value">{r}</span>
                    </div>
                </div>,
            );
        }
        if (strokeMode) {
            const sw = Number(fp.strokeWidth) || 2;
            const dashes = ["none", "8,4", "2,4"];
            const curDash = dashes.indexOf(fp.strokeDasharray || "none");
            const dashLabel = dashes[curDash] === "none" ? "solid" : dashes[curDash] === "8,4" ? "dashed" : "dotted";
            controls.push(
                <div key="grp-stroke" className="ctl-box">
                    <div className="ctl-row">
                        <span className="ctl-label"><IconLineWidth /></span>
                        <TBtn title="Tipiskan garis" onClick={() => onUpdateProps({ strokeWidth: Math.max(1, sw - 1) })}>
                            <IconMinus />
                        </TBtn>
                        <span className="ctl-value">{sw}px</span>
                        <TBtn title="Tebalkan garis" onClick={() => onUpdateProps({ strokeWidth: Math.min(20, sw + 1) })}>
                            <IconPlus />
                        </TBtn>
                        <span className="ftb-sep" />
                        <TBtn title={`Gaya garis: ${dashLabel}`}
                            onClick={() => onUpdateProps({ strokeDasharray: dashes[(curDash + 1) % dashes.length] })}>
                            <DashIcon variant={dashLabel} />
                        </TBtn>
                    </div>
                </div>,
            );
        }
    }

    if (t === "image" || t === "video") {
        const idx = FILTER_PRESETS.findIndex((f) => f.key === (fp.filter || "none"));
        const next = FILTER_PRESETS[(idx + 1) % FILTER_PRESETS.length];
        controls.push(
            <div key="grp-media" className="ctl-box">
                <div className="ctl-row">
                    <span className="ctl-label"><IconFilter /></span>
                    <span className="ctl-value">{FILTER_PRESETS[idx].label}</span>
                    <span className="ftb-sep" />
                    <TBtn title="Ganti filter" onClick={() => onUpdateProps({ filter: next.key })}>
                        <IconRepeat />
                    </TBtn>
                </div>
            </div>,
        );
    }

    if (isEvent && colorField) {
        controls.push(
            <div key="grp-color-event" className="ctl-box">
                <div className="ctl-row">
                    <span className="ctl-label"><IconFill /></span>
                    <TBtn title="Warna"
                        active={panel === "color"}
                        onClick={() => setPanel((p) => (p === "color" ? null : "color"))}>
                        <span className="ftb-swatch lg" style={{ background: fp[colorField] }} />
                    </TBtn>
                </div>
            </div>,
        );
    }

    return (
        <div className="obj-editor-controls">
            {/* Opacity */}
            <div className="ctl-box">
                <div className="ctl-row">
                    <span className="ctl-label"><IconOpacity /></span>
                    <input
                        type="range"
                        min={10}
                        max={100}
                        value={Math.round((typeof fp.opacity === "number" ? fp.opacity : 1) * 100)}
                        style={{ flex: 1 }}
                        onChange={(e) => onUpdateProps({ opacity: Number(e.target.value) / 100 })}
                    />
                    <span className="ctl-value">
                        {Math.round((typeof fp.opacity === "number" ? fp.opacity : 1) * 100)}%
                    </span>
                </div>
            </div>

            {controls}

            {/* ===== Scope: di halaman mana objek ini tampil ===== */}
            <div className="ctl-box">
                <p className="ctl-box-title">Tampil di Halaman</p>
                {isScopeLocked(t) ? (
                    <p className="ctl-hint" style={{ margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>
                        {PARTICIPANT_LOCKED_TYPES.includes(t)
                            ? "Objek ini selalu tampil di halaman Peserta dan tidak bisa dipindah — di situlah peserta mengisinya."
                            : "Objek ini selalu tampil di halaman Panitia karena berisi data pendaftar."}
                    </p>
                ) : (
                    <div className="ctl-seg" style={{ display: "flex", gap: 4 }}>
                        {[
                            { key: "participant", label: "Peserta" },
                            { key: "admin", label: "Panitia" },
                            { key: "both", label: "Keduanya" },
                        ].map((opt) => {
                            const active = elementScope(el) === opt.key;
                            return (
                                <button
                                    key={opt.key}
                                    type="button"
                                    className={"ctl-action" + (active ? " active" : "")}
                                    onClick={() => onUpdate({ scope: opt.key })}
                                    style={{ flex: 1, fontSize: 12, padding: "6px 4px" }}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Properti khusus per-komponen event (tanggal countdown, tujuan
                tombol daftar, item menu navbar, dsb). Sebelumnya hanya
                tersambung ke PropertiesPanel yang tidak pernah dirender, jadi
                seluruh editor ini tidak pernah kelihatan di UI. */}
            {isEvent && (
                <div className="ctl-box">
                    <p className="ctl-box-title">Pengaturan {getComponentMeta(t)?.label || "Komponen"}</p>
                    <EventPropertiesPanel
                        element={el}
                        onUpdateProps={onUpdateProps}
                        pages={eventPages}
                        elements={siblingElements}
                    />
                </div>
            )}

            {/* Efek visual: bayangan / border / blur
            {(isShape || t === "image" || t === "video" || isEvent || isTextLike) && (
                <div className="ctl-box">
                    <p className="ctl-box-title">Efek Visual</p>

                    <label className="ctl-toggle-row">
                        <input
                            type="checkbox"
                            checked={!!fxShadow}
                            onChange={(e) =>
                                setFx("shadow", e.target.checked
                                    ? { offsetX: 0, offsetY: 6, blur: 12, color: "#00000066" }
                                    : null)
                            }
                        />
                        <span>Bayangan</span>
                    </label>
                    {fxShadow && (
                        <div className="ctl-sub">
                            <div className="ctl-row">
                                <span className="ctl-label"><IconFill /></span>
                                <input type="color" value={(fxShadow.color || "#00000066").slice(0, 7)}
                                    onChange={(e) => updFx("shadow", { color: e.target.value })} />
                            </div>
                            <div className="ctl-row">
                                <span className="ctl-label">X</span>
                                <input type="range" min={-30} max={30} value={fxShadow.offsetX || 0} style={{ flex: 1 }}
                                    onChange={(e) => updFx("shadow", { offsetX: Number(e.target.value) })} />
                                <span className="ctl-value">{fxShadow.offsetX || 0}</span>
                            </div>
                            <div className="ctl-row">
                                <span className="ctl-label">Y</span>
                                <input type="range" min={-30} max={30} value={fxShadow.offsetY || 0} style={{ flex: 1 }}
                                    onChange={(e) => updFx("shadow", { offsetY: Number(e.target.value) })} />
                                <span className="ctl-value">{fxShadow.offsetY || 6}</span>
                            </div>
                            <div className="ctl-row">
                                <span className="ctl-label">B</span>
                                <input type="range" min={0} max={40} value={fxShadow.blur || 0} style={{ flex: 1 }}
                                    onChange={(e) => updFx("shadow", { blur: Number(e.target.value) })} />
                                <span className="ctl-value">{fxShadow.blur || 12}</span>
                            </div>
                        </div>
                    )}

                    <label className="ctl-toggle-row">
                        <input
                            type="checkbox"
                            checked={!!fxBorder}
                            onChange={(e) =>
                                setFx("border", e.target.checked
                                    ? { width: 2, color: "#111111" }
                                    : null)
                            }
                        />
                        <span>Border / Outline</span>
                    </label>
                    {fxBorder && (
                        <div className="ctl-sub">
                            <div className="ctl-row">
                                <span className="ctl-label"><IconFill /></span>
                                <input type="color" value={(fxBorder.color || "#111111").slice(0, 7)}
                                    onChange={(e) => updFx("border", { color: e.target.value })} />
                                <input type="number" min={1} max={24} value={fxBorder.width || 2}
                                    className="ctl-number"
                                    onChange={(e) => updFx("border", { width: Number(e.target.value) })} />
                                <span className="ctl-value">px</span>
                            </div>
                        </div>
                    )}

                    <label className="ctl-toggle-row">
                        <input
                            type="checkbox"
                            checked={!!fxBlur}
                            onChange={(e) => setFx("blur", e.target.checked ? { radius: 4 } : null)}
                        />
                        <span>Blur</span>
                    </label>
                    {fxBlur && (
                        <div className="ctl-sub">
                            <div className="ctl-row">
                                <span className="ctl-label"><IconOpacity /></span>
                                <input type="range" min={0} max={20} value={fxBlur.radius || 0} style={{ flex: 1 }}
                                    onChange={(e) => updFx("blur", { radius: Number(e.target.value) })} />
                                <span className="ctl-value">{fxBlur.radius || 0}px</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Animasi kemunculan */}
            <div className="ctl-box">
                <div className="ctl-row">
                    <span className="ctl-label"><IconAnim /></span>
                    <select
                        className="ctl-select"
                        value={fp.animation || "none"}
                        onChange={(e) => onUpdateProps({ animation: e.target.value })}
                    >
                        {ANIMATION_PRESETS.map((a) => (
                            <option key={a.key} value={a.key}>{a.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Posisi layer */}
            <div className="ctl-box">
                <p className="ctl-box-title">Posisi Layer</p>
                <div className="ctl-layer-grid">
                    <button type="button" className="ctl-action" title="Bawa ke depan"
                        onClick={() => onMoveLayer(el.id, "front")}>
                        <LayerIcon mode="front" /><span>Depan</span>
                    </button>
                    <button type="button" className="ctl-action" title="Naikkan satu lapis"
                        onClick={() => onMoveLayer(el.id, "forward")}>
                        <LayerIcon mode="forward" /><span>Naik</span>
                    </button>
                    <button type="button" className="ctl-action" title="Turunkan satu lapis"
                        onClick={() => onMoveLayer(el.id, "backward")}>
                        <LayerIcon mode="backward" /><span>Turun</span>
                    </button>
                    <button type="button" className="ctl-action" title="Kirim ke paling belakang"
                        onClick={() => onMoveLayer(el.id, "back")}>
                        <LayerIcon mode="back" /><span>Belakang</span>
                    </button>
                </div>
            </div>

            {/* Aksi objek */}
            <div className="ctl-actions">
                <button type="button" className="ctl-action" onClick={onDuplicate} title="Duplikat">
                    <IconDuplicate /><span>Duplikat</span>
                </button>
                <button type="button" className={"ctl-action" + (el.locked ? " active" : "")}
                    onClick={() => onUpdate({ locked: !el.locked })}
                    title={el.locked ? "Buka kunci" : "Kunci"}>
                    {el.locked ? <IconLock /> : <IconUnlock />}
                    <span>{el.locked ? "Terbuka" : "Kunci"}</span>
                </button>
            </div>

            {panel === "color" && colorField && (
                <div className="floating-popover docked">
                    <div className="fp-head">
                        <strong>Pilih warna</strong>
                        <button type="button" className="fp-close" title="Tutup" onClick={() => setPanel(null)}>{"\u00D7"}</button>
                    </div>
                    <ColorPickerBody
                        value={fp[colorField]}
                        usedColors={usedColors}
                        onChange={(v) => onUpdateProps({ [colorField]: v })}
                    />
                </div>
            )}
        </div>
    );
}

const ANIMATION_PRESETS = [
    { key: "none", label: "Tanpa Animasi" },
    { key: "fade", label: "Fade In" },
    { key: "slide", label: "Slide In" },
    { key: "zoom", label: "Zoom In" },
    { key: "bounce", label: "Bounce" },
    { key: "pop", label: "Pop" },
];

const FONT_FAMILIES = [
    { label: "Arial", value: "Arial, sans-serif", preview: "Arial, sans-serif" },
    { label: "Helvetica", value: "Helvetica, Arial, sans-serif", preview: "Helvetica, Arial, sans-serif" },
    { label: "Verdana", value: "Verdana, sans-serif", preview: "Verdana, sans-serif" },
    { label: "Tahoma", value: "Tahoma, sans-serif", preview: "Tahoma, sans-serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif", preview: "'Trebuchet MS', sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif", preview: "'Times New Roman', serif" },
    { label: "Georgia", value: "Georgia, serif", preview: "Georgia, serif" },
    { label: "Courier New", value: "'Courier New', monospace", preview: "'Courier New', monospace" },
    { label: "Impact", value: "Impact, sans-serif", preview: "Impact, sans-serif" },
    { label: "Comic Sans MS", value: "'Comic Sans MS', cursive", preview: "'Comic Sans MS', cursive" },
];

function IconList() {
    return (
        <IconSvg>
            <line x1="9" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="9" y1="18" x2="20" y2="18" />
            <circle cx="4.5" cy="6" r="0.5" fill="currentColor" />
            <circle cx="4.5" cy="12" r="0.5" fill="currentColor" />
            <circle cx="4.5" cy="18" r="0.5" fill="currentColor" />
        </IconSvg>
    );
}
function IconSpacing() {
    return (
        <IconSvg>
            <path d="M4 12h16" strokeDasharray="2 3" />
            <path d="M8 4H16" />
            <path d="M8 20H16" />
        </IconSvg>
    );
}
function IconLineHeight() {
    return (
        <IconSvg>
            <polyline points="8 7 12 3 16 7" />
            <polyline points="8 17 12 21 16 17" />
            <line x1="4" y1="12" x2="20" y2="12" strokeDasharray="2 2" />
        </IconSvg>
    );
}
function IconAnim() {
    return (
        <IconSvg>
            <polygon points="5 3 19 12 5 21 5 3" />
        </IconSvg>
    );
}

function LayerIcon({ mode }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mode === "front" && (<><rect x="7" y="3" width="13" height="5" rx="1" fill="currentColor" stroke="none" /><rect x="4" y="12" width="16" height="9" rx="2" /></>)}
            {mode === "forward" && (<><polyline points="7 13 12 8 17 13" /><rect x="5" y="16" width="14" height="4" rx="1" /></>)}
            {mode === "backward" && (<><rect x="5" y="3" width="14" height="4" rx="1" /><polyline points="7 11 12 16 17 11" /></>)}
            {mode === "back" && (<><rect x="4" y="3" width="16" height="5" rx="1" /><rect x="7" y="15" width="13" height="5" rx="1" fill="currentColor" stroke="none" /></>)}
        </svg>
    );
}


// ====== ikon editing (base + turunan) ======
function IconSvg({ children, size = 16, viewBox = "0 0 24 24" }) {
    return (
        <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}
function IconType() {
    return (
        <IconSvg>
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
        </IconSvg>
    );
}
function IconMinus() {
    return (
        <IconSvg size={14}>
            <line x1="5" y1="12" x2="19" y2="12" />
        </IconSvg>
    );
}
function IconPlus() {
    return (
        <IconSvg size={14}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </IconSvg>
    );
}
function IconBold() {
    return (
        <IconSvg>
            <path d="M6 4h8a4 4 0 0 1 0 8H6z" />
            <path d="M6 12h9a4 4 0 0 1 0 8H6z" />
        </IconSvg>
    );
}
function IconItalic() {
    return (
        <IconSvg>
            <line x1="19" y1="4" x2="10" y2="4" />
            <line x1="14" y1="20" x2="5" y2="20" />
            <line x1="15" y1="4" x2="9" y2="20" />
        </IconSvg>
    );
}
function IconUnderline() {
    return (
        <IconSvg>
            <path d="M6 4v6a6 6 0 0 0 12 0V4" />
            <line x1="4" y1="20" x2="20" y2="20" />
        </IconSvg>
    );
}
function IconStrikethrough() {
    return (
        <IconSvg>
            <path d="M16 4H9a3 3 0 0 0-2.83 4" />
            <path d="M14 12a4 4 0 0 1 0 8H6" />
            <line x1="4" y1="12" x2="20" y2="12" />
        </IconSvg>
    );
}
function IconOpacity() {
    return (
        <IconSvg>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
        </IconSvg>
    );
}
function IconRadius() {
    return (
        <IconSvg>
            <path d="M4 20V10a6 6 0 0 1 6-6h10" />
        </IconSvg>
    );
}
function IconLineWidth() {
    return (
        <IconSvg>
            <line x1="3" y1="12" x2="21" y2="12" strokeWidth="3.5" />
        </IconSvg>
    );
}
function IconFill() {
    return (
        <IconSvg>
            <rect x="4" y="4" width="16" height="16" rx="3" />
        </IconSvg>
    );
}
function IconTextColor() {
    return (
        <IconSvg>
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="9" y1="20" x2="15" y2="20" />
        </IconSvg>
    );
}
function IconRepeat() {
    return (
        <IconSvg>
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </IconSvg>
    );
}


function combineDeco(current, flag) {
    const parts = new Set(String(current || "").split(/\s+/).filter(Boolean));
    if (parts.has(flag)) parts.delete(flag);
    else parts.add(flag);
    if (parts.size === 0) return "none";
    return Array.from(parts).join(" ");
}

function AlignIcon({ align }) {
    const xs = align === "center" ? [3, 1, 3] : align === "right" ? [0, 2, 0] : [0, 0, 0];
    const ws = align === "center" ? [8, 12, 8] : align === "right" ? [12, 12, 8] : [12, 8, 12];
    return (
        <svg width="14" height="14" viewBox="0 0 14 14">
            {[0, 1, 2].map((i) => (
                <rect key={i} x={align === "right" ? 14 - ws[i] - xs[i] : xs[i]} y={2 + i * 4} width={ws[i]} height="2" rx="1" fill="currentColor" />
            ))}
        </svg>
    );
}

function DashIcon({ variant }) {
    return (
        <svg width="18" height="8" viewBox="0 0 18 8">
            {variant === "solid" && <rect x="0" y="3" width="18" height="2" rx="1" fill="currentColor" />}
            {variant === "dashed" && [0, 6, 12].map((x) => <rect key={x} x={x} y="3" width="4" height="2" rx="1" fill="currentColor" />)}
            {variant === "dotted" && [1, 7, 13].map((x) => <circle key={x} cx={x + 1} cy="4" r="1.2" fill="currentColor" />)}
        </svg>
    );
}

function IconDuplicate() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
    );
}

function IconCrop() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2v14a2 2 0 002 2h14" /><path d="M18 22V8a2 2 0 00-2-2H2" />
        </svg>
    );
}

function IconFilter() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="9" r="5" /><path d="M13 13l7 7" />
        </svg>
    );
}

const COLOR_PALETTE = [
    "#000000", "#374151", "#6b7280", "#9ca3af", "#e5e7eb", "#ffffff",
    "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4",
    "#3b82f6", "#4f46e5", "#8b5cf6", "#d946ef", "#ec4899", "#78350f",
];

function ColorPickerBody({ value, usedColors, onChange }) {
    const [hex, setHex] = useState(value || "#000000");

    useEffect(() => {
        setHex(value || "#000000");
    }, [value]);

    const commit = (v) => {
        setHex(v);
        onChange(v);
    };

    return (
        <>
            <div className="swatch-grid">
                {COLOR_PALETTE.map((c) => (
                    <button
                        key={c}
                        type="button"
                        title={c}
                        className={"swatch-item" + ((value || "").toLowerCase() === c.toLowerCase() ? " selected" : "")}
                        style={{ background: c }}
                        onClick={() => commit(c)}
                    />
                ))}
            </div>
            {usedColors.length > 0 && (
                <>
                    <p className="fp-label">Warna yang dipakai di desain</p>
                    <div className="swatch-grid">
                        {usedColors.slice(0, 6).map((c) => (
                            <button
                                key={c}
                                type="button"
                                title={c}
                                className={"swatch-item" + ((value || "").toLowerCase() === c.toLowerCase() ? " selected" : "")}
                                style={{ background: c }}
                                onClick={() => commit(c)}
                            />
                        ))}
                    </div>
                </>
            )}
            <div className="color-row">
                <input
                    type="color"
                    value={/^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#000000"}
                    onChange={(e) => commit(e.target.value)}
                />
                <input
                    type="text"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && commit(hex)}
                    onBlur={() => /^#?[0-9a-fA-F]{3,6}$/.test(hex) && commit(hex.startsWith("#") ? hex : "#" + hex)}
                    placeholder="#3b82f6"
                />
                <TBtn title="Transparan" onClick={() => commit("transparent")}>✕</TBtn>
            </div>
        </>
    );
}

// Lock/Unlock indicator icons
function IconLock() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}

function IconUnlock() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <line x1="12" y1="11" x2="12" y2="18" />
        </svg>
    );
}

// ===================== PANEL PROPERTI =====================
function PropertiesPanel({
    element,
    onUpdate,
    onUpdateProps,
    onDelete,
    onClosePanel,
    devicePreview = "desktop",
    onResetToAuto,
    pages = [],
    eventPages = [],
}) {
    const p = element.props;
    const isTabletOrMobile = devicePreview !== "desktop";
    const autoLocked = element.autoLocked?.[devicePreview] ?? true;
    const hasOverride = element[devicePreview] && Object.keys(element[devicePreview]).length > 0;

    return (
        <div className="properties-content">
            <div className="properties-header">
                <h3>{getComponentMeta(element.type)?.label}</h3>
                <div className="properties-header-actions">
                    <button
                        className="icon-btn danger"
                        title="Hapus elemen"
                        onClick={onDelete}
                    >
                        <IconTrash />
                    </button>
                    <button
                        className="icon-btn"
                        title="Tutup panel"
                        onClick={onClosePanel}
                    >
                        <IconClose />
                    </button>
                </div>
            </div>

            {/* Responsive status indicator */}
            {isTabletOrMobile && (
                <div
                    className="responsive-status-banner"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        marginBottom: 12,
                        borderRadius: 6,
                        background: autoLocked ? "#ecfdf5" : "#fffbeb",
                        border: `1px solid ${autoLocked ? "#a7f3d0" : "#fde68a"}`,
                        fontSize: 12,
                    }}
                >
                    <span
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 3,
                            background: autoLocked ? "#10b981" : "#f59e0b",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 10,
                        }}
                    >
                        {autoLocked ? <IconLock /> : <IconUnlock />}
                    </span>
                    <span style={{ flex: 1, color: autoLocked ? "#065f46" : "#92400e" }}>
                        {autoLocked
                            ? `Mode ${devicePreview}: Auto-responsive aktif (mengikuti desktop)`
                            : `Mode ${devicePreview}: Custom override aktif`}
                    </span>
                    {!autoLocked && hasOverride && onResetToAuto && (
                        <button
                            className="btn-reset-auto"
                            onClick={() => onResetToAuto(devicePreview)}
                            style={{
                                padding: "4px 10px",
                                border: "1px solid #d1d5db",
                                borderRadius: 4,
                                background: "#fff",
                                fontSize: 11,
                                fontWeight: 500,
                                color: "#374151",
                                cursor: "pointer",
                                transition: "all .15s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "#f3f4f6";
                                e.target.style.borderColor = "#9ca3af";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "#fff";
                                e.target.style.borderColor = "#d1d5db";
                            }}
                        >
                            Reset ke Auto
                        </button>
                    )}
                </div>
            )}

            {/* Lebar Section 
            {(isSectionType(element.type) || p.widthPreset) && (
                <PropField label="Lebar Konten">
                    <select
                        value={p.widthPreset || defaultWidthPresetFor(element.type)}
                        onChange={(e) =>
                            onUpdateProps({ widthPreset: e.target.value })
                        }
                    >
                        {Object.entries(SECTION_WIDTH_PRESETS).map(
                            ([key, preset]) => (
                                <option key={key} value={key}>
                                    {preset.label}
                                    {preset.maxWidth ? ` (${preset.maxWidth}px)` : ""}
                                </option>
                            ),
                        )}
                    </select>
                </PropField>
            )}

            {/* Universal Link Toggle — untuk semua elemen basic */}
            <div
                style={{
                    marginBottom: 16,
                    padding: 12,
                    borderRadius: 8,
                    background: p.isLink ? "#eef2ff" : "#f9fafb",
                    border: `1px solid ${p.isLink ? "#c7d2fe" : "#e5e7eb"}`,
                }}
            >
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontWeight: 500 }}>
                    <input
                        type="checkbox"
                        checked={p.isLink}
                        onChange={(e) => onUpdateProps({ isLink: e.target.checked })}
                        style={{ width: 18, height: 18, accentColor: "#4f46e5" }}
                    />
                    <span>Jadikan Link</span>
                </label>
                {p.isLink && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                        <PropField label="URL Tujuan" style={{ margin: 0 }}>
                            <input
                                type="url"
                                placeholder="https://contoh.com atau /e/slug-halaman"
                                value={p.linkUrl || ""}
                                onChange={(e) => onUpdateProps({ linkUrl: e.target.value })}
                            />
                        </PropField>
                        <PropField label="Target" style={{ margin: 0 }}>
                            <select
                                value={p.linkTarget || ""}
                                onChange={(e) => onUpdateProps({ linkTarget: e.target.value })}
                            >
                                <option value="">_self (tab sama)</option>
                                <option value="_blank">_blank (tab baru)</option>
                            </select>
                        </PropField>
                        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
                            <input
                                type="checkbox"
                                checked={p.openInNewTab}
                                onChange={(e) => onUpdateProps({ openInNewTab: e.target.checked })}
                                style={{ width: 16, height: 16, accentColor: "#4f46e5" }}
                            />
                            <span>Buka di tab baru (setara target="_blank")</span>
                        </label>
                    </div>
                )}
            </div>

            {/* Basic element props */}
            {element.type === "text" && (
                <>
                    <PropField label="Isi Teks">
                        <textarea
                            rows={2}
                            value={p.content}
                            onChange={(e) =>
                                onUpdateProps({ content: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label={`Ukuran Font (${p.fontSize}px)`}>
                        <input
                            type="range"
                            min={10}
                            max={72}
                            value={p.fontSize}
                            onChange={(e) =>
                                onUpdateProps({
                                    fontSize: Number(e.target.value),
                                })
                            }
                        />
                    </PropField>
                    <PropField label="Warna">
                        <input
                            type="color"
                            value={p.color}
                            onChange={(e) =>
                                onUpdateProps({ color: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Ketebalan">
                        <select
                            value={p.fontWeight}
                            onChange={(e) =>
                                onUpdateProps({ fontWeight: e.target.value })
                            }
                        >
                            <option value="400">Normal</option>
                            <option value="600">Semi Bold</option>
                            <option value="700">Bold</option>
                        </select>
                    </PropField>
                </>
            )}

            {element.type === "link" && (
                <>
                    <PropField label="Isi Teks">
                        <input
                            type="text"
                            value={p.content || ""}
                            onChange={(e) =>
                                onUpdateProps({ content: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label={`Ukuran Font (${p.fontSize}px)`}>
                        <input
                            type="range"
                            min={10}
                            max={48}
                            value={p.fontSize ?? 16}
                            onChange={(e) =>
                                onUpdateProps({ fontSize: Number(e.target.value) })
                            }
                        />
                    </PropField>
                    <PropField label="Warna">
                        <input
                            type="color"
                            value={p.color || "#3b82f6"}
                            onChange={(e) =>
                                onUpdateProps({ color: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Ketebalan">
                        <select
                            value={p.fontWeight || "500"}
                            onChange={(e) =>
                                onUpdateProps({ fontWeight: e.target.value })
                            }
                        >
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                            <option value="700">Bold</option>
                        </select>
                    </PropField>
                    <PropField label="Tipe Tujuan">
                        <select
                            value={p.linkType || "external"}
                            onChange={(e) =>
                                onUpdateProps({
                                    linkType: e.target.value,
                                    linkTarget:
                                        e.target.value === "internal"
                                            ? p.linkType === "internal"
                                                ? p.linkTarget
                                                : ""
                                            : p.linkType === "external"
                                                ? p.linkTarget
                                                : "",
                                })
                            }
                        >
                            <option value="internal">Halaman di situs ini</option>
                            <option value="external">URL eksternal</option>
                        </select>
                    </PropField>
                    {p.linkType !== "external" ? (
                        <PropField label="Halaman Tujuan">
                            {(pages || []).length > 0 ? (
                                <select
                                    value={p.linkTarget || ""}
                                    onChange={(e) =>
                                        onUpdateProps({ linkTarget: e.target.value })
                                    }
                                >
                                    <option value="">{"\u2014 Pilih halaman tujuan \u2014"}</option>
                                    {pages.map((pg) => (
                                        <option key={pg.id} value={`/e/${pg.slug}`}>
                                            {pg.title}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="/e/slug-halaman"
                                        value={p.linkTarget || ""}
                                        onChange={(e) =>
                                            onUpdateProps({ linkTarget: e.target.value })
                                        }
                                    />
                                    <span style={{ fontSize: 11, color: "#6b7280" }}>
                                        Belum ada halaman tersimpan. Masukkan path manual.
                                    </span>
                                </>
                            )}
                        </PropField>
                    ) : (
                        <PropField label="URL Tujuan">
                            <input
                                type="text"
                                placeholder="https://contoh.com"
                                value={p.linkTarget || ""}
                                onChange={(e) =>
                                    onUpdateProps({ linkTarget: e.target.value })
                                }
                            />
                        </PropField>
                    )}
                    <PropField label="Buka di Tab Baru">
                        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={p.openInNewTab !== false}
                                onChange={(e) =>
                                    onUpdateProps({ openInNewTab: e.target.checked })
                                }
                            />
                            <span>Buka tujuan di tab baru</span>
                        </label>
                    </PropField>
                </>
            )}

            {element.type === "button" && (
                <>
                    <PropField label="Label Tombol">
                        <input
                            type="text"
                            value={p.label}
                            onChange={(e) =>
                                onUpdateProps({ label: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Warna Latar">
                        <input
                            type="color"
                            value={p.bgColor}
                            onChange={(e) =>
                                onUpdateProps({ bgColor: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input
                            type="color"
                            value={p.textColor}
                            onChange={(e) =>
                                onUpdateProps({ textColor: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input
                            type="range"
                            min={0}
                            max={40}
                            value={p.radius}
                            onChange={(e) =>
                                onUpdateProps({
                                    radius: Number(e.target.value),
                                })
                            }
                        />
                    </PropField>
                    <PropField label="Aksi Klik">
                        <select
                            value={p.action || "none"}
                            onChange={(e) =>
                                onUpdateProps({
                                    action: e.target.value,
                                    actionTarget:
                                        e.target.value === "none" ? "" : p.actionTarget || "",
                                })
                            }
                        >
                            <option value="none">Tidak ada</option>
                            <option value="page">Navigasi ke Halaman</option>
                            <option value="url">Buka URL eksternal</option>
                        </select>
                    </PropField>
                    {p.action === "page" && (
                        <PropField label="Halaman Tujuan">
                            {(eventPages || []).length > 0 ? (
                                <select
                                    value={p.actionTarget || ""}
                                    onChange={(e) =>
                                        onUpdateProps({ actionTarget: e.target.value })
                                    }
                                >
                                    <option value="">{"\u2014 Pilih event \u2014"}</option>
                                    {eventPages.map((pg) => (
                                        <option key={pg.id} value={pg.id}>
                                            {pg.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span style={{ fontSize: 11, color: "#6b7280" }}>
                                    Belum ada halaman lain.
                                </span>
                            )}
                        </PropField>
                    )}
                    {p.action === "url" && (
                        <PropField label="URL Tujuan">
                            <input
                                type="text"
                                placeholder="https://contoh.com"
                                value={p.actionTarget || ""}
                                onChange={(e) =>
                                    onUpdateProps({ actionTarget: e.target.value })
                                }
                            />
                        </PropField>
                    )}
                </>
            )}

            {/* Shape type specific property panels */}
            {["rectangle", "rounded-rectangle", "circle", "triangle", "diamond", "pentagon", "hexagon", "polygon", "star", "heart", "speech-bubble", "blob", "shape"].includes(element.type) && (
                <>
                    <PropField label="Warna">
                        <input
                            type="color"
                            value={p.bgColor}
                            onChange={(e) =>
                                onUpdateProps({ bgColor: e.target.value })
                            }
                        />
                    </PropField>
                    {["rectangle", "rounded-rectangle", "speech-bubble", "blob", "shape"].includes(element.type) && (
                        <PropField label="Radius Sudut">
                            <input
                                type="range"
                                min={0}
                                max={9999}
                                value={p.radius}
                                onChange={(e) =>
                                    onUpdateProps({
                                        radius: Number(e.target.value),
                                    })
                                }
                            />
                        </PropField>
                    )}
                    {["polygon"].includes(element.type) && (
                        <PropField label="Jumlah Sisi">
                            <input
                                type="range"
                                min={3}
                                max={12}
                                value={p.sides || 6}
                                onChange={(e) =>
                                    onUpdateProps({
                                        sides: Number(e.target.value),
                                    })
                                }
                            />
                            <span style={{ fontSize: 12, color: "#6b7280" }}>{p.sides || 6} sisi</span>
                        </PropField>
                    )}
                    {["star"].includes(element.type) && (
                        <PropField label="Jumlah Sudut">
                            <input
                                type="range"
                                min={3}
                                max={12}
                                value={p.points || 5}
                                onChange={(e) =>
                                    onUpdateProps({
                                        points: Number(e.target.value),
                                    })
                                }
                            />
                            <span style={{ fontSize: 12, color: "#6b7280" }}>{p.points || 5} sudut</span>
                        </PropField>
                    )}
                </>
            )}

            {["line", "arrow", "divider"].includes(element.type) && (
                <>
                    <PropField label="Warna Garis">
                        <input
                            type="color"
                            value={p.strokeColor}
                            onChange={(e) =>
                                onUpdateProps({ strokeColor: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Ketebalan">
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={p.strokeWidth || 2}
                            onChange={(e) =>
                                onUpdateProps({
                                    strokeWidth: Number(e.target.value),
                                })
                            }
                        />
                        <span style={{ fontSize: 12, color: "#6b7280" }}>{p.strokeWidth || 2}px</span>
                    </PropField>
                    <PropField label="Gaya Garis">
                        <select
                            value={p.strokeDasharray || "none"}
                            onChange={(e) =>
                                onUpdateProps({ strokeDasharray: e.target.value })
                            }
                        >
                            <option value="none">Solid</option>
                            <option value="8,4">Dashed</option>
                            <option value="2,4">Dotted</option>
                        </select>
                    </PropField>
                    {element.type === "divider" && (
                        <PropField label="Lebar Penuh">
                            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={p.fullWidth !== false}
                                    onChange={(e) =>
                                        onUpdateProps({ fullWidth: e.target.checked })
                                    }
                                />
                                <span>Perluas ke lebar penuh container</span>
                            </label>
                        </PropField>
                    )}
                </>
            )}

            {element.type === "badge" && (
                <>
                    <PropField label="Warna Latar">
                        <input
                            type="color"
                            value={p.bgColor}
                            onChange={(e) =>
                                onUpdateProps({ bgColor: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input
                            type="color"
                            value={p.textColor}
                            onChange={(e) =>
                                onUpdateProps({ textColor: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Teks Badge">
                        <input
                            type="text"
                            value={p.label}
                            onChange={(e) =>
                                onUpdateProps({ label: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input
                            type="range"
                            min={0}
                            max={9999}
                            value={p.radius}
                            onChange={(e) =>
                                onUpdateProps({
                                    radius: Number(e.target.value),
                                })
                            }
                        />
                    </PropField>
                    <PropField label="Padding Horizontal">
                        <input
                            type="range"
                            min={4}
                            max={40}
                            value={p.paddingX || 12}
                            onChange={(e) =>
                                onUpdateProps({
                                    paddingX: Number(e.target.value),
                                })
                            }
                        />
                    </PropField>
                    <PropField label="Padding Vertikal">
                        <input
                            type="range"
                            min={2}
                            max={20}
                            value={p.paddingY || 4}
                            onChange={(e) =>
                                onUpdateProps({
                                    paddingY: Number(e.target.value),
                                })
                            }
                        />
                    </PropField>
                </>
            )}

            {element.type === "shape" && (
                <>
                    <PropField label="Warna">
                        <input
                            type="color"
                            value={p.bgColor}
                            onChange={(e) =>
                                onUpdateProps({ bgColor: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={p.radius}
                            onChange={(e) =>
                                onUpdateProps({
                                    radius: Number(e.target.value),
                                })
                            }
                        />
                    </PropField>
                </>
            )}

            {element.type === "image" && (
                <>
                    <PropField label="Gambar">
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {p.src && (
                                <div style={{ position: "relative", maxWidth: "100%" }}>
                                    <img
                                        src={p.src}
                                        alt={p.alt}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "120px",
                                            borderRadius: "6px",
                                            border: "1px solid #e5e7eb",
                                            objectFit: "cover",
                                        }}
                                    />
                                    {p.fileName && (
                                        <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>
                                            {p.fileName}
                                        </div>
                                    )}
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id={`file-upload-image-${element.id}`}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        onUpdateProps({ src: url, fileName: file.name });
                                    }
                                    e.target.value = "";
                                }}
                            />
                            <label
                                htmlFor={`file-upload-image-${element.id}`}
                                style={{
                                    padding: "8px 12px",
                                    border: "1px dashed #d1d5db",
                                    borderRadius: "6px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    color: "#4f46e5",
                                    background: "#eef2ff",
                                    transition: "all .15s",
                                }}
                                onMouseEnter={(e) => (e.target.style.background = "#e0e7ff")}
                                onMouseLeave={(e) => (e.target.style.background = "#eef2ff")}
                            >
                                {p.src ? "Ganti Gambar" : "Pilih Gambar dari Lokal"}
                            </label>
                            {p.src && (
                                <button
                                    type="button"
                                    onClick={() => onUpdateProps({ src: "", fileName: "" })}
                                    style={{
                                        padding: "6px 12px",
                                        border: "1px solid #fecaca",
                                        borderRadius: "6px",
                                        background: "#fef2f2",
                                        color: "#dc2626",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Hapus Gambar
                                </button>
                            )}
                        </div>
                    </PropField>
                    <PropField label="Teks Alternatif">
                        <input
                            type="text"
                            value={p.alt}
                            onChange={(e) =>
                                onUpdateProps({ alt: e.target.value })
                            }
                        />
                    </PropField>
                </>
            )}

            {element.type === "video" && (
                <>
                    <PropField label="Video">
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {p.src && (
                                <div style={{ position: "relative", maxWidth: "100%" }}>
                                    <video
                                        src={p.src}
                                        controls
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "120px",
                                            borderRadius: "6px",
                                            border: "1px solid #e5e7eb",
                                        }}
                                    />
                                    {p.fileName && (
                                        <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>
                                            {p.fileName}
                                        </div>
                                    )}
                                </div>
                            )}
                            <input
                                type="file"
                                accept="video/*"
                                style={{ display: "none" }}
                                id={`file-upload-video-${element.id}`}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        onUpdateProps({ src: url, fileName: file.name });
                                    }
                                    e.target.value = "";
                                }}
                            />
                            <label
                                htmlFor={`file-upload-video-${element.id}`}
                                style={{
                                    padding: "8px 12px",
                                    border: "1px dashed #d1d5db",
                                    borderRadius: "6px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    color: "#4f46e5",
                                    background: "#eef2ff",
                                    transition: "all .15s",
                                }}
                                onMouseEnter={(e) => (e.target.style.background = "#e0e7ff")}
                                onMouseLeave={(e) => (e.target.style.background = "#eef2ff")}
                            >
                                {p.src ? "Ganti Video" : "Pilih Video dari Lokal"}
                            </label>
                            {p.src && (
                                <button
                                    type="button"
                                    onClick={() => onUpdateProps({ src: "", fileName: "" })}
                                    style={{
                                        padding: "6px 12px",
                                        border: "1px solid #fecaca",
                                        borderRadius: "6px",
                                        background: "#fef2f2",
                                        color: "#dc2626",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Hapus Video
                                </button>
                            )}
                        </div>
                    </PropField>
                    <PropField label="Teks Alternatif">
                        <input
                            type="text"
                            value={p.alt}
                            onChange={(e) =>
                                onUpdateProps({ alt: e.target.value })
                            }
                        />
                    </PropField>
                </>
            )}

            {/* Event element props - delegated to EventElements.jsx */}
            {ALL_EVENT_TYPES.includes(element.type) && (
                <EventPropertiesPanel
                    element={element}
                    onUpdateProps={onUpdateProps}
                    pages={eventPages}
                />
            )}
        </div>
    );
}

function PropField({ label, children }) {
    return (
        <div className="prop-group">
            <label className="prop-group-label">{label}</label>
            {children}
        </div>
    );
}

// ===================== IKON DASAR (remaining) =====================
function IconButton() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="2" y="8" width="20" height="8" rx="4" />
        </svg>
    );
}
function IconBack() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    );
}
function IconEye() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
function IconEyeOff() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
            <path d="M1 1l22 22" />
        </svg>
    );
}
function IconTrash() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
        </svg>
    );
}
function IconClose() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
function IconSettings() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    );
}
function IconPencil() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.5 2.5 0 0 1 3.5 3.5L12 16l-4 1 1-4Z" />
            <path d="M2 19.5l10-10" />
        </svg>
    );
}
function IconElement() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}
function IconLayers() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    );
}
function IconUndo() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
        </svg>
    );
}
function IconRedo() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v6h-6" />
            <path d="M3 17a9 9 0 0 1 15-6.7L21 13" />
        </svg>
    );
}
function IconParticipants() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-3.87-4H5a4 4 0 0 0-3.83 3" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3.36-3.92" />
            <path d="M16.5 3.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        </svg>
    );
}
