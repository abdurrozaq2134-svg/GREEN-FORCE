/**
 * Katalog font untuk objek teks (Teks/Judul/Sub-judul/Tautan) di builder.
 * 214 font umum Windows/Mac + Google Fonts populer, dikelompokkan 5
 * kategori dan sudah urut A-Z per kategori. Satu-satunya tempat untuk
 * menambah/mengubah daftar font -- tambahkan entri baru di kategori yang
 * sesuai, tetap jaga urutan abjad.
 */

export const FONT_CATEGORIES = ["Semua", "Serif", "Sans Serif", "Display", "Script", "Monospace"];

// Font fallback per kategori, dipasang setelah nama font asli di CSS
// font-family -- supaya tampilan tetap wajar kalau font tsb tidak
// terpasang di perangkat pengguna/pengunjung.
const CATEGORY_FALLBACK = {
    Serif: "Georgia, 'Times New Roman', serif",
    "Sans Serif": "Arial, Helvetica, sans-serif",
    Display: "Impact, Charcoal, sans-serif",
    Script: "'Brush Script MT', cursive",
    Monospace: "'Courier New', Courier, monospace",
};

const RAW_FONTS = [
    // ---------- SERIF (A-Z) ----------
    ["Adobe Garamond Pro", "Serif"], ["Albertina", "Serif"], ["Alegreya", "Serif"],
    ["American Typewriter", "Serif"], ["Athelas", "Serif"], ["Baskerville", "Serif"],
    ["Baskerville Old Face", "Serif"], ["Bell MT", "Serif"], ["Bembo", "Serif"],
    ["Bitter", "Serif"], ["Bodoni MT", "Serif"], ["Book Antiqua", "Serif"],
    ["Bookman Old Style", "Serif"], ["Cambria", "Serif"], ["Cardo", "Serif"],
    ["Caslon", "Serif"], ["Cormorant", "Serif"], ["Cormorant Garamond", "Serif"],
    ["Crimson Text", "Serif"], ["Didot", "Serif"], ["EB Garamond", "Serif"],
    ["Elephant", "Serif"], ["Footlight MT Light", "Serif"], ["Garamond", "Serif"],
    ["Georgia", "Serif"], ["Goudy Old Style", "Serif"], ["Hoefler Text", "Serif"],
    ["Iowan Old Style", "Serif"], ["Libre Baskerville", "Serif"], ["Lora", "Serif"],
    ["Merriweather", "Serif"], ["MS Serif", "Serif"], ["Palatino Linotype", "Serif"],
    ["Perpetua", "Serif"], ["Playfair Display", "Serif"], ["PT Serif", "Serif"],
    ["Rockwell", "Serif"], ["Sabon", "Serif"], ["Sitka", "Serif"],
    ["Source Serif Pro", "Serif"], ["STIX Two Text", "Serif"], ["Times New Roman", "Serif"],
    ["Tinos", "Serif"], ["Vollkorn", "Serif"], ["Zilla Slab", "Serif"],

    // ---------- SANS SERIF (A-Z) ----------
    ["Agency FB", "Sans Serif"], ["Arial", "Sans Serif"], ["Arial Black", "Sans Serif"],
    ["Arial Narrow", "Sans Serif"], ["Avenir", "Sans Serif"], ["Avenir Next", "Sans Serif"],
    ["Bahnschrift", "Sans Serif"], ["Bank Gothic", "Sans Serif"], ["Barlow", "Sans Serif"],
    ["Bell Gothic Std", "Sans Serif"], ["Bliss", "Sans Serif"], ["Calibri", "Sans Serif"],
    ["Candara", "Sans Serif"], ["Century Gothic", "Sans Serif"], ["Chivo", "Sans Serif"],
    ["DejaVu Sans", "Sans Serif"], ["DIN Condensed", "Sans Serif"], ["Droid Sans", "Sans Serif"],
    ["Eurostile", "Sans Serif"], ["Fira Sans", "Sans Serif"], ["Franklin Gothic", "Sans Serif"],
    ["Franklin Gothic Medium", "Sans Serif"], ["Futura", "Sans Serif"], ["Gill Sans", "Sans Serif"],
    ["Gill Sans MT", "Sans Serif"], ["Gotham", "Sans Serif"], ["Helvetica", "Sans Serif"],
    ["Helvetica Neue", "Sans Serif"], ["Hind", "Sans Serif"], ["Inter", "Sans Serif"],
    ["Josefin Sans", "Sans Serif"], ["Karla", "Sans Serif"], ["Lato", "Sans Serif"],
    ["Lucida Grande", "Sans Serif"], ["Lucida Sans", "Sans Serif"], ["Lucida Sans Unicode", "Sans Serif"],
    ["Maven Pro", "Sans Serif"], ["Metropolis", "Sans Serif"], ["Montserrat", "Sans Serif"],
    ["MS Sans Serif", "Sans Serif"], ["Mukta", "Sans Serif"], ["Myriad Pro", "Sans Serif"],
    ["News Gothic MT", "Sans Serif"], ["Nimbus Sans", "Sans Serif"], ["Noto Sans", "Sans Serif"],
    ["Nunito", "Sans Serif"], ["Nunito Sans", "Sans Serif"], ["Open Sans", "Sans Serif"],
    ["Optima", "Sans Serif"], ["Oxygen", "Sans Serif"], ["Poppins", "Sans Serif"],
    ["Proxima Nova", "Sans Serif"], ["PT Sans", "Sans Serif"], ["Public Sans", "Sans Serif"],
    ["Quicksand", "Sans Serif"], ["Raleway", "Sans Serif"], ["Roboto", "Sans Serif"],
    ["Rubik", "Sans Serif"], ["Segoe UI", "Sans Serif"], ["Segoe UI Semibold", "Sans Serif"],
    ["Source Sans Pro", "Sans Serif"], ["Tahoma", "Sans Serif"], ["Trebuchet MS", "Sans Serif"],
    ["Ubuntu", "Sans Serif"], ["Univers", "Sans Serif"], ["Verdana", "Sans Serif"],
    ["Work Sans", "Sans Serif"],

    // ---------- DISPLAY (A-Z) ----------
    ["Alfa Slab One", "Display"], ["Anton", "Display"], ["Bangers", "Display"],
    ["Bebas Neue", "Display"], ["Bevan", "Display"], ["Big Shoulders Display", "Display"],
    ["Broadway", "Display"], ["Chalkduster", "Display"], ["Cinzel", "Display"],
    ["Cooper Black", "Display"], ["Fjalla One", "Display"], ["Fredoka One", "Display"],
    ["Frutiger Ultra Black", "Display"], ["Haettenschweiler", "Display"], ["Impact", "Display"],
    ["Jokerman", "Display"], ["Knockout", "Display"], ["Luckiest Guy", "Display"],
    ["Modak", "Display"], ["Monoton", "Display"], ["Oswald", "Display"],
    ["Passion One", "Display"], ["Paytone One", "Display"], ["Poster Bodoni", "Display"],
    ["Ravie", "Display"], ["Righteous", "Display"], ["Rockwell Extra Bold", "Display"],
    ["Rye", "Display"], ["Shrikhand", "Display"], ["Special Elite", "Display"],
    ["Staatliches", "Display"], ["Stencil Std", "Display"], ["Titan One", "Display"],
    ["Ultra", "Display"], ["Wide Latin", "Display"],

    // ---------- SCRIPT / HANDWRITING (A-Z) ----------
    ["Alex Brush", "Script"], ["Allura", "Script"], ["Amatic SC", "Script"],
    ["Architects Daughter", "Script"], ["Bradley Hand", "Script"], ["Brush Script MT", "Script"],
    ["Caveat", "Script"], ["Chalkboard", "Script"], ["Chalkboard SE", "Script"],
    ["Comic Sans MS", "Script"], ["Cookie", "Script"], ["Dancing Script", "Script"],
    ["Edwardian Script ITC", "Script"], ["Freestyle Script", "Script"], ["Gochi Hand", "Script"],
    ["Great Vibes", "Script"], ["Handlee", "Script"], ["Herculanum", "Script"],
    ["Indie Flower", "Script"], ["Kalam", "Script"], ["Kristen ITC", "Script"],
    ["Kunstler Script", "Script"], ["Lobster", "Script"], ["Lobster Two", "Script"],
    ["Lucida Handwriting", "Script"], ["Marck Script", "Script"], ["Marker Felt", "Script"],
    ["Mistral", "Script"], ["Monotype Corsiva", "Script"], ["Pacifico", "Script"],
    ["Parisienne", "Script"], ["Permanent Marker", "Script"], ["Sacramento", "Script"],
    ["Satisfy", "Script"], ["Script MT Bold", "Script"], ["Segoe Print", "Script"],
    ["Segoe Script", "Script"], ["Shadows Into Light", "Script"], ["Vivaldi", "Script"],
    ["Vladimir Script", "Script"], ["Zapfino", "Script"],

    // ---------- MONOSPACE (A-Z) ----------
    ["Anonymous Pro", "Monospace"], ["Cascadia Code", "Monospace"], ["Consolas", "Monospace"],
    ["Courier", "Monospace"], ["Courier New", "Monospace"], ["Courier Prime", "Monospace"],
    ["Cousine", "Monospace"], ["DejaVu Sans Mono", "Monospace"], ["Fira Code", "Monospace"],
    ["Fira Mono", "Monospace"], ["IBM Plex Mono", "Monospace"], ["Inconsolata", "Monospace"],
    ["JetBrains Mono", "Monospace"], ["Lucida Console", "Monospace"], ["Menlo", "Monospace"],
    ["Monaco", "Monospace"], ["MS Gothic", "Monospace"], ["Nova Mono", "Monospace"],
    ["OCR A Std", "Monospace"], ["Overpass Mono", "Monospace"], ["PT Mono", "Monospace"],
    ["Roboto Mono", "Monospace"], ["Source Code Pro", "Monospace"], ["Space Mono", "Monospace"],
    ["Ubuntu Mono", "Monospace"], ["VT323", "Monospace"],
];

function quoteIfNeeded(name) {
    return name.includes(" ") ? `'${name}'` : name;
}

/**
 * @typedef {{ name: string, category: string, value: string }} FontEntry
 * `value` = string font-family CSS siap pakai (nama asli + fallback
 * kategori), inilah yang disimpan di el.props.fontFamily.
 */
export const FONT_CATALOG = RAW_FONTS.map(([name, category]) => ({
    name,
    category,
    value: `${quoteIfNeeded(name)}, ${CATEGORY_FALLBACK[category]}`,
}));

/** Cari entri katalog dari value CSS font-family yang tersimpan di objek. */
export function findFontByValue(value) {
    if (!value) return null;
    return FONT_CATALOG.find((f) => f.value === value) || null;
}
