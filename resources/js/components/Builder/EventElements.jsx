import React, { useState } from "react";
import { PropField } from "./shared/PropField";

// ===================== IKON EVENT =====================
export function IconArrowLeft() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}
export function IconContainer() {
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
            <rect x="7" y="7" width="10" height="10" rx="1" />
        </svg>
    );
}
export function IconNavbar() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="3" width="18" height="8" rx="1" />
            <rect x="3" y="16" width="18" height="5" rx="1" />
        </svg>
    );
}
export function IconButtonGroup() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="8" width="7" height="8" rx="2" />
            <rect x="14" y="8" width="7" height="8" rx="2" />
        </svg>
    );
}
export function IconPillGroup() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="9" width="6" height="6" rx="3" />
            <rect x="12" y="9" width="6" height="6" rx="3" />
            <rect x="9" y="18" width="6" height="6" rx="3" />
        </svg>
    );
}
export function IconTitle() {
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
            <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
    );
}
export function IconSubtitle() {
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
export function IconEvent() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}
export function IconCountdown() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 15" />
        </svg>
    );
}
export function IconRsvp() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.9.37 4.14 1.02" />
        </svg>
    );
}
export function IconSchedule() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
        </svg>
    );
}
export function IconTicket() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M2 9a3 3 0 100 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 100-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" />
        </svg>
    );
}
export function IconMap() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
export function IconDateTime() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="12" cy="14" r="4" />
            <path d="M12 10v4l2 2" />
        </svg>
    );
}
export function IconLocationMap() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
            <rect x="7" y="16" width="10" height="6" rx="1" />
        </svg>
    );
}
export function IconParticipantCounter() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <text x="18" y="18" fontSize="8" fill="currentColor" textAnchor="middle">99+</text>
        </svg>
    );
}
export function IconGallery() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <path d="M6 14l4-4 4 4 5-5" />
        </svg>
    );
}
export function IconEventSidebar() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="18" rx="1" />
            <rect x="14" y="3" width="7" height="18" rx="1" />
            <line x1="6" y1="8" x2="6.01" y2="8" />
            <line x1="10" y1="16" x2="10.01" y2="16" />
        </svg>
    );
}
export function IconParticipants() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
export function IconLinkButton() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}
export function IconRegisterButton() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="9" rx="2" />
            <path d="M12 16v5" />
            <path d="M9 18l3 3 3-3" />
        </svg>
    );
}
export function IconGoogleButton() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M21 12h-9V9.5" />
            <path d="M12 12l6.5 6.5" />
        </svg>
    );
}
export function IconPayButton() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <path d="M6 15h4" />
        </svg>
    );
}
export function IconPoll() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
        </svg>
    );
}
export function IconGuestbook() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M14.7 6.3a1.2 1.2 0 0 0-.3 1.9l-.5 1.4a1.2 1.2 0 0 0 .5 2.1l1.6 3.7a1.2 1.2 0 0 0 2.1.3l2.3-1.2a1.2 1.2 0 0 0-.3-1.8l-2.2-3.1a1.2 1.2 0 0 0-1.6-.2l-3.1,2.2z" />
            <circle cx="8.5" cy="8.5" r="3" />
        </svg>
    );
}
export function IconFeedback() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <polygon points="12 2 15 22 2 22 15 2 12 2" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    );
}
export function IconSponsor() {
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
            <path d="M7 14l5 5 5-5" />
        </svg>
    );
}
export function IconForm() {
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
            <line x1="9" y1="9" x2="21" y2="9" />
            <line x1="9" y1="15" x2="21" y2="15" />
            <line x1="9" y1="12" x2="21" y2="12" />
        </svg>
    );
}
export function IconSubmit() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M13 2L3 14h9l-1 8H5a2 2 0 0 0-2 2v2h12v-2a2 2 0 0 0-2-2H5z" />
        </svg>
    );
}
export function IconOke() {
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
export function IconCancel() {
    return (
        <svg
            width="20"
            height="20"
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

// ===================== FIELD CATALOG (7 KATEGORI) =====================
export const FIELD_CATALOG = [
    {
        category: 'Data Pribadi',
        fields: [
            { key: 'nama_lengkap', label: 'Nama Lengkap', data_type: 'string', is_long_text: false, format: null },
            { key: 'nama_panggilan', label: 'Nama Panggilan', data_type: 'string', is_long_text: false, format: null },
            { key: 'email', label: 'Email', data_type: 'string', is_long_text: false, format: 'email' },
            { key: 'telepon', label: 'Nomor Telepon', data_type: 'string', is_long_text: false, format: 'phone' },
            { key: 'whatsapp', label: 'Nomor WhatsApp', data_type: 'string', is_long_text: false, format: 'phone' },
            { key: 'tanggal_lahir', label: 'Tanggal Lahir', data_type: 'date', is_long_text: false, format: null },
            { key: 'jenis_kelamin', label: 'Jenis Kelamin', data_type: 'enum', is_long_text: false, format: null, options: ['Laki-laki', 'Perempuan', 'Lainnya'] },
            { key: 'foto_profil', label: 'Foto Profil', data_type: 'file', is_long_text: false, format: null },
        ],
    },
    {
        category: 'Data Identitas & Institusi',
        fields: [
            { key: 'nik', label: 'NIK', data_type: 'string', is_long_text: false, format: null },
            { key: 'nip', label: 'NIP/NIM', data_type: 'string', is_long_text: false, format: null },
            { key: 'institusi', label: 'Institusi/Perusahaan', data_type: 'string', is_long_text: false, format: null },
            { key: 'jabatan', label: 'Jabatan', data_type: 'string', is_long_text: false, format: null },
            { key: 'jurusan', label: 'Jurusan/Prodi', data_type: 'string', is_long_text: false, format: null },
            { key: 'angkatan', label: 'Angkatan', data_type: 'integer', is_long_text: false, format: null },
            { key: 'no_anggota', label: 'Nomor Anggota', data_type: 'string', is_long_text: false, format: null },
        ],
    },
    {
        category: 'Data Alamat',
        fields: [
            { key: 'alamat_lengkap', label: 'Alamat Lengkap', data_type: 'string', is_long_text: true, format: null },
            { key: 'provinsi', label: 'Provinsi', data_type: 'string', is_long_text: false, format: null },
            { key: 'kota', label: 'Kota/Kabupaten', data_type: 'string', is_long_text: false, format: null },
            { key: 'kecamatan', label: 'Kecamatan', data_type: 'string', is_long_text: false, format: null },
            { key: 'kelurahan', label: 'Kelurahan/Desa', data_type: 'string', is_long_text: false, format: null },
            { key: 'kode_pos', label: 'Kode Pos', data_type: 'string', is_long_text: false, format: null },
            { key: 'negara', label: 'Negara', data_type: 'string', is_long_text: false, format: null },
        ],
    },
    {
        category: 'Data Tiket/Registrasi',
        fields: [
            { key: 'tipe_tiket', label: 'Tipe Tiket', data_type: 'enum', is_long_text: false, format: null, options: ['Reguler', 'VIP', 'Early Bird', 'Student', 'Gratis'] },
            { key: 'kode_undangan', label: 'Kode Undangan', data_type: 'string', is_long_text: false, format: null },
            { key: 'kuota_tiket', label: 'Jumlah Tiket', data_type: 'integer', is_long_text: false, format: null },
            { key: 'tanggal_registrasi', label: 'Tanggal Registrasi', data_type: 'datetime', is_long_text: false, format: null },
            { key: 'sumber_registrasi', label: 'Sumber Registrasi', data_type: 'enum', is_long_text: false, format: null, options: ['Website', 'Offline', 'Referral', 'Sosial Media'] },
        ],
    },
    {
        category: 'Data Pembayaran',
        fields: [
            { key: 'metode_bayar', label: 'Metode Pembayaran', data_type: 'enum', is_long_text: false, format: null, options: ['Transfer Bank', 'Virtual Account', 'E-Wallet', 'Kartu Kredit', 'Cash', 'Lainnya'] },
            { key: 'bank_pengirim', label: 'Bank Pengirim', data_type: 'string', is_long_text: false, format: null },
            { key: 'nama_rekening', label: 'Nama Rekening', data_type: 'string', is_long_text: false, format: null },
            { key: 'nomor_rekening', label: 'Nomor Rekening', data_type: 'string', is_long_text: false, format: null },
            { key: 'jumlah_bayar', label: 'Jumlah Bayar', data_type: 'float', is_long_text: false, format: null },
            { key: 'bukti_bayar', label: 'Bukti Pembayaran', data_type: 'file', is_long_text: false, format: null },
            { key: 'tanggal_bayar', label: 'Tanggal Bayar', data_type: 'datetime', is_long_text: false, format: null },
        ],
    },
    {
        category: 'Data Preferensi/Tambahan',
        fields: [
            { key: 'kebutuhan_khusus', label: 'Kebutuhan Khusus', data_type: 'string', is_long_text: true, format: null },
            { key: 'preferensi_makanan', label: 'Preferensi Makanan', data_type: 'enum', is_long_text: false, format: null, options: ['Reguler', 'Vegetarian', 'Vegan', 'Halal', 'No Seafood', 'Lainnya'] },
            { key: 'ukuran_kaos', label: 'Ukuran Kaos', data_type: 'enum', is_long_text: false, format: null, options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
            { key: 'pesan_khusus', label: 'Pesan Khusus', data_type: 'string', is_long_text: true, format: null },
            { key: 'cara_tahu_event', label: 'Cara Mengetahui Event', data_type: 'enum', is_long_text: false, format: null, options: ['Teman', 'Instagram', 'LinkedIn', 'Website', 'Email', 'Lainnya'] },
        ],
    },
    {
        category: 'Data Persetujuan (Consent)',
        fields: [
            { key: 'setuju_syarat', label: 'Setuju Syarat & Ketentuan', data_type: 'boolean', is_long_text: false, format: null },
            { key: 'setuju_privasi', label: 'Setuju Kebijakan Privasi', data_type: 'boolean', is_long_text: false, format: null },
            { key: 'setuju_foto', label: 'Setuju Foto/Video Diambil', data_type: 'boolean', is_long_text: false, format: null },
            { key: 'setuju_promo', label: 'Setuju Menerima Info Promo', data_type: 'boolean', is_long_text: false, format: null },
            { key: 'tanda_tangan_digital', label: 'Tanda Tangan Digital', data_type: 'string', is_long_text: false, format: null },
        ],
    },
];

// ===================== EVENT COMPONENT CATEGORIES =====================
export const EVENT_COMPONENTS = [
    { type: 'form', label: 'Form Pendaftaran', icon: <IconForm /> },
    { type: 'countdown', label: 'Countdown', icon: <IconCountdown /> },
    { type: 'rsvp', label: 'RSVP', icon: <IconRsvp /> },
    { type: 'schedule', label: 'Jadwal', icon: <IconSchedule /> },
    { type: 'map', label: 'Lokasi & Peta', icon: <IconMap /> },
    { type: 'date-time', label: 'Tanggal & Waktu', icon: <IconDateTime /> },
    { type: 'location-map', label: 'Lokasi & Peta (Lengkap)', icon: <IconLocationMap /> },
    { type: 'participant-counter', label: 'Penghitung Peserta', icon: <IconParticipantCounter /> },
    { type: 'gallery', label: 'Galeri/Banner', icon: <IconGallery /> },
    { type: 'event-sidebar', label: 'Sidebar Event', icon: <IconEventSidebar /> },
    { type: 'participant-list', label: 'Daftar Peserta', icon: <IconParticipants /> },
    { type: 'link-button', label: 'Tombol Link', icon: <IconLinkButton /> },
    { type: 'register-button', label: 'Tombol Daftar Sekarang', icon: <IconRegisterButton /> },
    { type: 'google-login', label: 'Tombol Google', icon: <IconGoogleButton /> },
    { type: 'pay-button', label: 'Tombol Bayar', icon: <IconPayButton /> },
    { type: 'navbar', label: 'Navbar', icon: <IconNavbar /> },
];

/**
 * Field form disimpan di JSON elemen sebagai daftar { key, required }.
 * Event lama menyimpannya sebagai array string biasa — entri seperti itu
 * dianggap wajib, sesuai perilaku sebelumnya yang selalu required.
 */
/** Turunkan mode tampilan lokasi dari displayMode, atau dari pasangan showMap/showAddress milik data lama. */
export function locationDisplayMode(p) {
    if (p && p.displayMode) return p.displayMode;
    const map = !p || p.showMap !== false;
    const text = !p || p.showAddress !== false;
    if (map && text) return "both";
    return map ? "map" : "text";
}

/* ===================== SCOPE OBJEK (Admin / Peserta) =====================
   Setiap objek menyimpan "scope" di JSON-nya. Nilainya:
     "participant" -> hanya tampil di halaman yang dilihat peserta
     "admin"       -> hanya tampil di halaman panitia
     "both"        -> tampil di keduanya

   Catatan istilah: memakai "participant", bukan "peserta", supaya seragam
   dengan `mode` pada halaman dan `viewMode` di builder yang sudah memakai
   kosakata itu. Label di UI tetap "Peserta".
   ======================================================================== */

/** Objek yang scope-nya dipaku ke peserta — pendaftaran harus bisa diisi peserta. */
export const PARTICIPANT_LOCKED_TYPES = ["form", "rsvp"];

/** Objek yang scope-nya dipaku ke panitia — berisi data pendaftar. */
export const ADMIN_LOCKED_TYPES = ["participant-list"];

export function isScopeLocked(type) {
    return PARTICIPANT_LOCKED_TYPES.includes(type) || ADMIN_LOCKED_TYPES.includes(type);
}

/** Scope untuk objek yang BARU ditambahkan, mengikuti tab mode yang aktif. */
export function resolveScopeForNew(type, activeMode) {
    if (PARTICIPANT_LOCKED_TYPES.includes(type)) return "participant";
    if (ADMIN_LOCKED_TYPES.includes(type)) return "admin";
    return activeMode === "admin" ? "admin" : "participant";
}

/**
 * Scope efektif sebuah objek saat dirender.
 *
 * Objek dari event lama belum punya field `scope`. Kalau difilter ketat,
 * seluruh isi event yang sudah terbit akan hilang — jadi objek tanpa scope
 * jatuh kembali ke aturan lama berbasis tipe: form/rsvp peserta,
 * participant-list panitia, sisanya tampil di keduanya.
 */
export function elementScope(el) {
    if (!el) return "both";
    if (el.scope === "admin" || el.scope === "participant" || el.scope === "both") {
        return el.scope;
    }
    if (PARTICIPANT_LOCKED_TYPES.includes(el.type)) return "participant";
    if (ADMIN_LOCKED_TYPES.includes(el.type)) return "admin";
    return "both";
}

/** Apakah objek ini tampil pada mode tertentu ("admin" | "participant"). */
export function isElementVisibleInMode(el, mode) {
    const scope = elementScope(el);
    return scope === "both" || scope === mode;
}

export const PARTICIPANT_COLUMNS = [
    { key: "nama", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    { key: "tanggal", label: "Tanggal Daftar" },
];

export const COUNTDOWN_UNITS = [
    { key: "days", label: "Hari" },
    { key: "hours", label: "Jam" },
    { key: "minutes", label: "Menit" },
    { key: "seconds", label: "Detik" },
];

export function normalizeFormFields(fields) {
    return (fields || [])
        .map((f) => (typeof f === "string" ? { key: f, required: true } : f))
        .filter((f) => f && f.key)
        .map((f) => ({ key: f.key, required: f.required !== false }));
}

/** Format nominal ala Indonesia: "Rp 150.000". Nol/kosong menghasilkan string kosong. */
export function formatAmount(currency, amount) {
    const n = Number(amount);
    if (!n || n <= 0) return "";
    return `${currency || "Rp"} ${n.toLocaleString("id-ID")}`;
}

export function hasFieldKey(fields, key) {
    return normalizeFormFields(fields).some((f) => f.key === key);
}

export function findFieldDef(fieldKey) {
    for (const cat of FIELD_CATALOG) {
        const found = cat.fields.find((f) => f.key === fieldKey);
        if (found) return { ...found, category: cat.category };
    }
    return null;
}

// ===================== UNIVERSAL LINK PROPS (shared across all elements) =====================
const UNIVERSAL_LINK_PROPS = {
    isLink: false,
    linkUrl: "",
    linkTarget: "",
    openInNewTab: true,
};

// ===================== EVENT DEFAULT PROPS =====================
export const EVENT_DEFAULT_PROPS = {
    // Layout & Container
    container: {
        flexDirection: "row",
        gap: 16,
        padding: 16,
        bgColor: "transparent",
        borderRadius: 8,
        alignItems: "stretch",
        widthPreset: "standard",
        justifyContent: "flex-start",
        ...UNIVERSAL_LINK_PROPS,
    },
    navbar: {
        logoText: "EventApp",
        showLogo: true,
        logoColor: "#1a1a1a",
        menuItems: [
            { label: "Beranda", href: "#home" },
            { label: "Acara", href: "#schedule" },
            { label: "Tiket", href: "#tickets" },
        ],
        authButtons: [
            { label: "Masuk", variant: "ghost" },
            { label: "Daftar", variant: "primary" },
        ],
        bgColor: "#ffffff",
        textColor: "#1a1a1a",
        height: 64,
        widthPreset: "full",
        ...UNIVERSAL_LINK_PROPS,
    },
    buttonGroup: {
        buttons: [
            { label: "Tombol 1", variant: "primary" },
            { label: "Tombol 2", variant: "secondary" },
        ],
        gap: 12,
        alignItems: "center",
        widthPreset: "standard",
        ...UNIVERSAL_LINK_PROPS,
    },
    pillGroup: {
        pills: [
            { label: "Badge 1", color: "#4f6b1c", textColor: "#ffffff" },
            { label: "Badge 2", color: "#10b981", textColor: "#ffffff" },
        ],
        gap: 8,
        wrap: true,
        widthPreset: "standard",
        ...UNIVERSAL_LINK_PROPS,
    },
    // Text
    title: {
        content: "Judul Utama",
        fontSize: 42,
        color: "#1a1a1a",
        fontWeight: "800",
        textAlign: "left",
        lineHeight: 1.2,
        maxLines: 3,
        ...UNIVERSAL_LINK_PROPS,
    },
    subtitle: {
        content: "Subjudul deskriptif di sini",
        fontSize: 22,
        color: "#374151",
        fontWeight: "500",
        textAlign: "left",
        lineHeight: 1.4,
        maxLines: 3,
        ...UNIVERSAL_LINK_PROPS,
    },
    // Event-interaction components
    countdown: {
        label: "Menuju Hari-H",
        targetDate: "",
        // Unit yang ditampilkan; urutannya tetap hari -> jam -> menit -> detik.
        format: ["days", "hours", "minutes", "seconds"],
        expiredText: "Acara telah dimulai",
        color: "#1a1a1a",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    rsvp: {
        title: "Konfirmasi Kehadiran",
        subtitle: "Isi form di bawah ini",
        question: "Apakah Anda akan hadir?",
        answerOptions: ["Hadir", "Tidak Hadir", "Mungkin"],
        showGuestCount: true,
        buttonLabel: "Kirim RSVP",
        buttonColor: "#4f6b1c",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    schedule: {
        title: "Rangkaian Acara",
        items: [
            { time: "19:00", endTime: "19:30", desc: "Pembukaan", speaker: "" },
            { time: "19:30", endTime: "21:00", desc: "Acara Inti", speaker: "" },
        ],
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    ticket: {
        title: "Pilih Tiket",
        tiers: [{ name: "Reguler", price: "Rp 150.000", quota: 100 }],
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    map: {
        address: "Jl. Contoh No. 123, Kota",
        mapsUrl: "",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    poll: {
        question: "Pilih opsi",
        options: ["Opsi A", "Opsi B", "Opsi C"],
        showResults: true,
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    form: {
        title: "Form Pendaftaran",
        subtitle: "Isi formulir di bawah untuk mendaftar",
        submitLabel: "Daftar",
        submitColor: "#4f6b1c",
        payButtonLabel: "Bayar Sekarang",
        payButtonColor: "#10b981",
        fields: [],
        quota: 0,
        redirectPageId: null,
        // Gerbang login: selama peserta belum login Google, field form
        // disembunyikan dan diganti tombol "Masuk dengan Google".
        requireLogin: true,
        loginPrompt: "Masuk dulu dengan Google untuk mengisi formulir pendaftaran.",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    "participant-list": {
        title: "Daftar Peserta",
        // Kolom tabel yang ditampilkan; sumber datanya join submissions + users.
        columns: ["nama", "email", "status", "tanggal"],
        showSearch: true,
        showStatusFilter: true,
        widthPreset: "standard",
        ...UNIVERSAL_LINK_PROPS,
    },
    "date-time": {
        label: "Tanggal & Waktu Acara",
        date: "",
        endDate: "",
        time: "",
        showDate: true,
        showTime: true,
        dateFormat: "DD MMMM YYYY",
        timeFormat: "HH:mm",
        color: "#1a1a1a",
        fontSize: 18,
        fontWeight: "600",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    "location-map": {
        title: "Lokasi Acara",
        address: "Jl. Contoh No. 123, Kota",
        mapsUrl: "",
        // "map" | "both" | "text" — menggantikan pasangan showMap/showAddress,
        // keduanya tetap diturunkan dari sini supaya data lama tetap terbaca.
        displayMode: "both",
        showMap: true,
        showAddress: true,
        mapProvider: "google",
        zoom: 15,
        height: 300,
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    "participant-counter": {
        label: "Peserta Terdaftar",
        // {jumlah} diganti angka nyata dari jumlah pendaftar event ini.
        template: "{jumlah} peserta terdaftar",
        showIcon: true,
        color: "#1a1a1a",
        fontSize: 24,
        fontWeight: "700",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    "gallery": {
        title: "Galeri",
        // "gallery" = banyak gambar, "banner" = satu gambar penuh.
        mode: "gallery",
        images: [],
        layout: "grid",
        columns: 3,
        gap: 12,
        aspectRatio: "4/3",
        showTitle: false,
        widthPreset: "standard",
        ...UNIVERSAL_LINK_PROPS,
    },
    "event-sidebar": {
        title: "Navigasi Event",
        items: [
            { label: "Beranda", pageId: null },
            { label: "Acara", pageId: null },
            { label: "Lokasi", pageId: null },
        ],
        position: "left",
        bgColor: "#ffffff",
        textColor: "#1a1a1a",
        activeColor: "#4f6b1c",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    "link-button": {
        label: "Kunjungi Website",
        href: "https://example.com",
        bgColor: "#4f6b1c",
        textColor: "#ffffff",
        radius: 8,
        fontSize: 14,
        fontWeight: "500",
        openInNewTab: true,
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    // Tombol yang scroll ke elemen Form Pendaftaran di halaman yang sama.
    // targetFormId kosong = pakai form pertama yang ditemukan saat runtime.
    "register-button": {
        label: "Daftar Sekarang",
        targetFormId: "",
        bgColor: "#4f6b1c",
        textColor: "#ffffff",
        radius: 8,
        fontSize: 15,
        fontWeight: "600",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    "google-login": {
        label: "Masuk dengan Google",
        bgColor: "#ffffff",
        textColor: "#333333",
        borderColor: "#dadce0",
        radius: 4,
        fontSize: 14,
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    // Peserta menandai sudah bayar; status jadi "menunggu_konfirmasi",
    // verifikasi akhir tetap manual oleh EO lewat Daftar Peserta.
    "pay-button": {
        label: "Saya Sudah Bayar",
        amount: 0,
        currency: "Rp",
        showAmount: true,
        instruction: "Klik setelah transfer. Panitia akan memverifikasi pembayaran Anda.",
        pendingLabel: "Menunggu konfirmasi panitia",
        confirmedLabel: "Pembayaran terkonfirmasi",
        bgColor: "#059669",
        textColor: "#ffffff",
        radius: 8,
        fontSize: 15,
        fontWeight: "600",
        widthPreset: "narrow",
        ...UNIVERSAL_LINK_PROPS,
    },
    submit: { label: "Submit", action: "save", color: "#10b981", radius: 8, ...UNIVERSAL_LINK_PROPS },
    oke: { label: "Oke", action: "close", color: "#3b82f6", radius: 8, ...UNIVERSAL_LINK_PROPS },
    cancel: { label: "Batal", action: "cancel", color: "#ef4444", radius: 8, ...UNIVERSAL_LINK_PROPS },
};

// ===================== EVENT DEFAULT SIZES =====================
export const EVENT_SIZES = {
    // Layout & Container
    container: { width: 400, height: 200 },
    navbar: { width: 1200, height: 64 },
    buttonGroup: { width: 360, height: 48 },
    pillGroup: { width: 360, height: 40 },
    // Text
    title: { width: 500, height: 60 },
    subtitle: { width: 500, height: 44 },
    // Event-interaction components
    countdown: { width: 360, height: 110 },
    rsvp: { width: 320, height: 260 },
    schedule: { width: 340, height: 200 },
    map: { width: 300, height: 60 },
    form: { width: 500, height: 400 },
    "participant-list": { width: 600, height: 400 },
    "date-time": { width: 300, height: 80 },
    "location-map": { width: 400, height: 350 },
    "participant-counter": { width: 280, height: 70 },
    "gallery": { width: 500, height: 400 },
    "event-sidebar": { width: 250, height: 300 },
    "link-button": { width: 200, height: 44 },
    "register-button": { width: 220, height: 48 },
    "google-login": { width: 240, height: 44 },
    "pay-button": { width: 240, height: 48 },
    submit: { width: 140, height: 40 },
    oke: { width: 100, height: 40 },
    cancel: { width: 100, height: 40 },
};

// ===================== EVENT ELEMENT MODELS (dual interface) =====================
export const EVENT_ELEMENT_MODELS = {
    countdown: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "created_at",
            ],
            example: { targetDate: "2024-12-31", clicks: 0 },
        },
    },
    rsvp: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "status",
                "created_at",
            ],
            example: {
                name: "John Doe",
                email: "john@example.com",
                status: "pending",
                event_id: "ev_123",
            },
        },
    },
    schedule: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "created_at",
            ],
            example: { session: "Pembukaan", attendees: 50 },
        },
    },
    ticket: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "status",
                "created_at",
            ],
            example: { tier: "Reguler", price: "150000", status: "paid" },
        },
    },
    map: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "created_at",
            ],
            example: { clicks: 15, address: "Jl. Contoh No. 123" },
        },
    },
    poll: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "created_at",
            ],
            example: { option: "Opsi A", votes: 25, total: 100 },
        },
    },
    guestbook: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "created_at",
                "moderated",
            ],
            example: {
                name: "Budi",
                message: "Selamat jalan!",
                moderated: false,
            },
        },
    },
    feedback: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "rating",
                "created_at",
            ],
            example: { rating: 5, comment: "Bagus!", user: "jane@example.com" },
        },
    },
    sponsor: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "clicks",
                "created_at",
            ],
            example: { sponsor: "Acme Corp", clicks: 45 },
        },
    },
    submit: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "status",
                "created_at",
            ],
            example: { action: "submit", form_type: "rsvp", data_saved: true },
        },
    },
    oke: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "action",
                "created_at",
            ],
            example: { action: "ok", target: "modal_close" },
        },
    },
    cancel: {
        participant: null,
        committee: {
            table: "submissions",
            fields: [
                "id",
                "event_page_id",
                "element_id",
                "type",
                "payload",
                "user_identifier",
                "action",
                "created_at",
            ],
            example: { action: "cancel", target: "modal_close" },
        },
    },
};

// ===================== COUNTDOWN UTILITY =====================
export function getCountdownUnits(targetDate, now) {
    const target = new Date(targetDate);
    if (!targetDate || isNaN(target)) {
        return [
            { label: "Hari", value: "00" },
            { label: "Jam", value: "00" },
            { label: "Menit", value: "00" },
            { label: "Detik", value: "00" },
        ];
    }
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 600000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    const pad = (n) => String(n).padStart(2, "0");
    return [
        { label: "Hari", value: pad(days) },
        { label: "Jam", value: pad(hours) },
        { label: "Menit", value: pad(minutes) },
        { label: "Detik", value: pad(seconds) },
    ];
}

// ===================== NAVBAR (responsive) =====================
// Desktop: logo kiri, menu tengah/kanan, tombol auth di ujung kanan.
// Tablet/Mobile (collapsed): menu disembunyikan, ikon hamburger membuka
// dropdown vertikal; tombol auth ikut masuk ke bagian bawah dropdown.
export function NavbarElement({ el, responsiveStyle = {}, collapsed = false }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const p = el.props || {};
    const bg = p.bgColor || "#ffffff";
    const fg = p.textColor || "#1a1a1a";
    const logoColor = p.logoColor || fg;

    const navStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        height: p.height || 64,
        padding: "0 24px",
        backgroundColor: bg,
        color: fg,
        borderBottom: "1px solid #e5e7eb",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        position: "relative",
    };

    return (
        <nav
            className={
                "el-navbar" +
                (collapsed ? " nb-collapsed" : "") +
                (menuOpen ? " nb-open" : "")
            }
            style={{ ...responsiveStyle, ...navStyle }}
        >
            <div
                className="navbar-brand"
                style={{ fontSize: "1.25rem", fontWeight: 700, color: logoColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
                {p.logoText}
            </div>

            {!collapsed && (
                <>
                    <div className="navbar-menu" style={{ display: "flex", alignItems: "center", gap: 24 }}>
                        {(p.menuItems || []).map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href || "#"}
                                onClick={(e) => e.preventDefault()}
                                style={{ color: fg, textDecoration: "none", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", transition: "opacity .15s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <div className="navbar-auth" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {(p.authButtons || []).map((btn, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={(e) => e.preventDefault()}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: 6,
                                    fontSize: 13,
                                    fontWeight: 500,
                                    border: btn.variant === "primary" ? "none" : "1px solid currentColor",
                                    background: btn.variant === "primary" ? "#4f46e5" : "transparent",
                                    color: btn.variant === "primary" ? "#fff" : fg,
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {collapsed && (
                <>
                    <button
                        type="button"
                        className="nb-burger"
                        aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((v) => !v)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: 5,
                            padding: 8,
                            marginLeft: "auto",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    display: "block",
                                    width: 24,
                                    height: 2,
                                    background: fg,
                                    borderRadius: 1,
                                    transition: "transform .2s ease, opacity .2s ease",
                                    ...(menuOpen && i === 0 ? { transform: "translateY(7px) rotate(45deg)" } : {}),
                                    ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                                    ...(menuOpen && i === 2 ? { transform: "translateY(-7px) rotate(-45deg)" } : {}),
                                }}
                            />
                        ))}
                    </button>

                    {menuOpen && (
                        <div
                            className="nb-dropdown"
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                zIndex: 60,
                                background: bg,
                                borderBottom: "1px solid #e5e7eb",
                                boxShadow: "0 12px 24px rgba(0,0,0,.12)",
                                padding: "8px 16px 16px",
                                display: "flex",
                                flexDirection: "column",
                                boxSizing: "border-box",
                            }}
                        >
                            {(p.menuItems || []).map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href || "#"}
                                    onClick={(e) => e.preventDefault()}
                                    style={{
                                        color: fg,
                                        textDecoration: "none",
                                        fontSize: 15,
                                        fontWeight: 500,
                                        padding: "12px 4px",
                                        borderTop: idx === 0 ? "none" : "1px solid #f3f4f6",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
                                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            {(p.authButtons || []).length > 0 && (
                                <div
                                    className="nb-dropdown-auth"
                                    style={{
                                        marginTop: 10,
                                        paddingTop: 12,
                                        borderTop: "1px solid #e5e7eb",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    {(p.authButtons || []).map((btn, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={(e) => e.preventDefault()}
                                            style={{
                                                width: "100%",
                                                padding: "10px 16px",
                                                borderRadius: 6,
                                                fontSize: 14,
                                                fontWeight: 600,
                                                border: btn.variant === "primary" ? "none" : "1px solid currentColor",
                                                background: btn.variant === "primary" ? "#4f46e5" : "transparent",
                                                color: btn.variant === "primary" ? "#fff" : fg,
                                                cursor: "pointer",
                                            }}
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </nav>
    );
}

// ===================== LEBAR SECTION (per-container) =====================
export const SECTION_WIDTH_PRESETS = {
    narrow: { label: "Sempit", maxWidth: 800 },
    standard: { label: "Standar", maxWidth: 1140 },
    wide: { label: "Lebar", maxWidth: 1600 },
    full: { label: "Penuh Layar (Full-width)", maxWidth: null },
};

const DEFAULT_WIDTH_PRESET_BY_TYPE = {
    navbar: "full",
    container: "standard",
    buttonGroup: "standard",
    pillGroup: "standard",
    title: "narrow",
    subtitle: "narrow",
    countdown: "narrow",
    rsvp: "narrow",
    schedule: "narrow",
    ticket: "narrow",
    map: "narrow",
    poll: "narrow",
    guestbook: "narrow",
    feedback: "narrow",
};

export function defaultWidthPresetFor(type) {
    return DEFAULT_WIDTH_PRESET_BY_TYPE[type] || "standard";
}

export function isSectionType(type) {
    return type in DEFAULT_WIDTH_PRESET_BY_TYPE;
}

// Pembungkus konten section: max-width sesuai preset + center horizontal.
// Hanya membatasi di desktop; layar lebih sempit tetap fluid (width:100%).
export function SectionInner({ type, props, children }) {
    const presetName =
        (props && props.widthPreset) || defaultWidthPresetFor(type);
    const preset =
        SECTION_WIDTH_PRESETS[presetName] || SECTION_WIDTH_PRESETS.standard;
    return (
        <div
            className="section-inner"
            style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: preset.maxWidth ? `${preset.maxWidth}px` : "none",
            }}
        >
            {children}
        </div>
    );
}

// ===================== RENDER EVENT ELEMENT =====================
export function renderEventElement(el, now, isPreview = false) {
    // Responsive styles for preview mode
    const responsiveStyle = isPreview ? {
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
    } : {};

    const textStyle = isPreview ? {
        fontSize: "clamp(13px, 2.5vw, 18px)",
        lineHeight: 1.5,
        wordBreak: "break-word",
        overflowWrap: "anywhere",
    } : {};

    const headingStyle = isPreview ? {
        fontSize: "clamp(18px, 3vw, 28px)",
        fontWeight: 700,
        lineHeight: 1.3,
    } : {};

    const buttonStyle = isPreview ? {
        fontSize: "clamp(13px, 1.8vw, 16px)",
        padding: "0.75rem 1.5rem",
        minHeight: "44px",
        whiteSpace: "nowrap",
    } : {};

    switch (el.type) {
        case "countdown": {
            const units = getCountdownUnits(el.props.targetDate, now);
            return (
                <div className="el-countdown" style={{ ...responsiveStyle, color: el.props.color }}>
                    <div className="countdown-label" style={headingStyle}>{el.props.label}</div>
                    <div className="countdown-grid" style={{ display: "flex", gap: isPreview ? "1.5rem" : "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                        {units.map((u) => (
                            <div key={u.label} className="countdown-unit" style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: isPreview ? "60px" : "50px" }}>
                                <span className="countdown-value" style={{ fontSize: isPreview ? "clamp(24px, 5vw, 48px)" : "2rem", fontWeight: 700 }}>
                                    {u.value}
                                </span>
                                <span className="countdown-unit-label" style={textStyle}>
                                    {u.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        case "rsvp":
            return (
                <div className="el-rsvp" style={responsiveStyle}>
                    <h4 style={headingStyle}>{el.props.title}</h4>
                    <p className="el-rsvp-sub" style={textStyle}>{el.props.subtitle}</p>
                    <div className="el-rsvp-field" style={{ ...textStyle, marginBottom: "0.75rem" }}>Nama Lengkap</div>
                    <div className="el-rsvp-field" style={{ ...textStyle, marginBottom: "0.75rem" }}>Email</div>
                    {el.props.showGuestCount && (
                        <div className="el-rsvp-field" style={{ ...textStyle, marginBottom: "1rem" }}>Jumlah Tamu</div>
                    )}
                    <div
                        className="el-rsvp-submit"
                        style={{ ...buttonStyle, background: el.props.buttonColor, width: isPreview ? "100%" : "auto", textAlign: "center" }}
                    >
                        {el.props.buttonLabel}
                    </div>
                </div>
            );
            break;

        case "schedule":
            return (
                <div className="el-schedule" style={responsiveStyle}>
                    <h4 style={headingStyle}>{el.props.title}</h4>
                    {el.props.items.map((item, idx) => (
                        <div key={idx} className="schedule-row" style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                            <span className="schedule-time" style={{ ...textStyle, fontWeight: 600, minWidth: isPreview ? "70px" : "auto" }}>{item.time}</span>
                            <span className="schedule-desc" style={textStyle}>{item.desc}</span>
                        </div>
                    ))}
                </div>
            );

        case "ticket":
            return (
                <div className="el-ticket" style={responsiveStyle}>
                    <h4 style={headingStyle}>{el.props.title}</h4>
                    {el.props.tiers.map((tier, idx) => (
                        <div key={idx} className="ticket-tier" style={{ padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "8px", marginBottom: "0.75rem", background: "#f9fafb", width: "100%" }}>
                            <div className="ticket-tier-name" style={headingStyle}>{tier.name}</div>
                            <div className="ticket-tier-price" style={{ fontSize: isPreview ? "clamp(18px, 3vw, 24px)" : "1.25rem", fontWeight: 700, color: "#10b981", marginTop: "0.5rem" }}>
                                {tier.price}
                            </div>
                            <div className="ticket-tier-quota" style={textStyle}>Sisa {tier.quota} kursi</div>
                        </div>
                    ))}
                </div>
            );

        case "map":
            return (
                <div className="el-map" style={{ ...responsiveStyle, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <IconMap />
                    <span style={textStyle}>{el.props.address}</span>
                </div>
            );

        case "poll":
            return (
                <div className="el-poll" style={responsiveStyle}>
                    <div className="poll-question" style={headingStyle}>{el.props.question}</div>
                    <div className="poll-options" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {el.props.options.map((opt, idx) => (
                            <div key={idx} className="poll-option" style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
                                <input
                                    type="radio"
                                    id={`poll-${el.id}-${idx}`}
                                    name={`poll-${el.id}`}
                                    value={opt}
                                    style={{ width: isPreview ? "20px" : "auto", height: isPreview ? "20px" : "auto", accentColor: "#4f46e5" }}
                                />
                                <label htmlFor={`poll-${el.id}-${idx}`} style={textStyle}>
                                    {opt}
                                </label>
                            </div>
                        ))}
                    </div>
                    {el.props.showResults && (
                        <div className="poll-results" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                            {el.props.options.map((opt) => (
                                <div key={opt} className="poll-result" style={textStyle}>
                                    <span>
                                        {opt}: {Math.round(Math.random() * 100)}
                                        %
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );

        case "guestbook":
            return (
                <div className="el-guestbook" style={responsiveStyle}>
                    <h4 style={headingStyle}>{el.props.title}</h4>
                    <textarea
                        rows={3}
                        placeholder={el.props.placeholder}
                        readOnly
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: isPreview ? "clamp(13px, 2.5vw, 16px)" : "14px", fontFamily: "inherit", boxSizing: "border-box", minHeight: "100px" }}
                    />
                    <button
                        className="el-button"
                        style={{ ...buttonStyle, background: "#4f46e5", color: "#fff", borderRadius: 6, width: isPreview ? "100%" : "auto" }}
                    >
                        Kirim
                    </button>
                </div>
            );

        case "feedback":
            return (
                <div className="el-feedback" style={responsiveStyle}>
                    <h4 style={headingStyle}>{el.props.title}</h4>
                    <div className="feedback-rating" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "1rem" }}>
                        {el.props.ratingOptions.map((option) => (
                            <label key={option} className="feedback-star" style={{ display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name={`feedback-${el.id}`}
                                    value={option}
                                    style={{ width: isPreview ? "20px" : "auto", height: isPreview ? "20px" : "auto", accentColor: "#f59e0b" }}
                                />
                                <span style={{ fontSize: isPreview ? "clamp(18px, 3vw, 24px)" : "1.5rem" }}>â˜…</span>
                            </label>
                        ))}
                    </div>
                    <textarea
                        rows={2}
                        placeholder="Komentar..."
                        readOnly
                        style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: isPreview ? "clamp(13px, 2.5vw, 16px)" : "14px", fontFamily: "inherit", boxSizing: "border-box", minHeight: "80px" }}
                    />
                    <button
                        className="el-button"
                        style={{ ...buttonStyle, background: "#4f46e5", color: "#fff", borderRadius: 6, width: isPreview ? "100%" : "auto" }}
                    >
                        Kirim
                    </button>
                </div>
            );

        case "sponsor":
            return (
                <div className="el-sponsor" style={responsiveStyle}>
                    <a
                        href={el.props.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#4f46e5", textDecoration: "none", fontWeight: 500, fontSize: isPreview ? "clamp(14px, 2.5vw, 18px)" : "14px" }}
                    >
                        {el.props.name}
                    </a>
                </div>
            );

        case "submit":
            return (
                <button
                    className="el-submit"
                    style={{
                        ...buttonStyle,
                        background: el.props.color,
                        color: "#fff",
                        borderRadius: el.props.radius || 8,
                        width: isPreview ? "100%" : "auto",
                    }}
                >
                    {el.props.label}
                </button>
            );

        case "oke":
            return (
                <button
                    className="el-oke"
                    style={{
                        ...buttonStyle,
                        background: el.props.color,
                        color: "#fff",
                        borderRadius: el.props.radius || 8,
                        width: isPreview ? "100%" : "auto",
                    }}
                >
                    {el.props.label}
                </button>
            );

        case "cancel":
            return (
                <button
                    className="el-cancel"
                    style={{
                        ...buttonStyle,
                        background: el.props.color,
                        color: "#fff",
                        borderRadius: el.props.radius || 8,
                        width: isPreview ? "100%" : "auto",
                    }}
                >
                    {el.props.label}
                </button>
            );

        // ===================== NEW LAYOUT & TEXT ELEMENTS =====================
        case "container": {
            const containerStyle = isPreview ? {
                display: "flex",
                flexDirection: el.props.flexDirection || "row",
                gap: el.props.gap || 16,
                padding: el.props.padding || 16,
                backgroundColor: el.props.bgColor || "transparent",
                borderRadius: el.props.borderRadius || 8,
                alignItems: el.props.alignItems || "stretch",
                justifyContent: el.props.justifyContent || "flex-start",
                flexWrap: el.props.flexDirection === "row" ? "wrap" : "nowrap",
                width: "100%",
                boxSizing: "border-box",
                minHeight: 60,
            } : {};
            return (
                <div className="el-container" style={{ ...responsiveStyle, ...containerStyle }}>
                    {el.children?.map((child, idx) => (
                        <div key={idx} style={{ flex: 1, minWidth: 0 }}>
                            {wrapElementWithLink(renderEventElement(child, now, isPreview), child.props || {})}
                        </div>
                    ))}
                    {(!el.children || el.children.length === 0) && (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: isPreview ? "clamp(12px, 2vw, 14px)" : "13px" }}>
                            Container kosong - seret elemen ke sini
                        </div>
                    )}
                </div>
            );
        }

        case "navbar": {
            // collapsed di-set otomatis oleh auto-responsive saat breakpoint
            // Tablet/Mobile (lihat applyAutoResponsive), atau override manual.
            return (
                <NavbarElement
                    el={el}
                    responsiveStyle={responsiveStyle}
                    collapsed={!!(el.props && el.props.collapsed)}
                />
            );
        }

        case "buttonGroup": {
            const groupStyle = isPreview ? {
                display: "flex",
                gap: el.props.gap || 12,
                alignItems: el.props.alignItems || "center",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
            } : {};
            return (
                <div className="el-button-group" style={{ ...responsiveStyle, ...groupStyle }}>
                    {el.props.buttons?.map((btn, idx) => (
                        <button key={idx} style={{
                            padding: "10px 20px",
                            borderRadius: 8,
                            fontSize: isPreview ? "clamp(13px, 1.8vw, 16px)" : "14px",
                            fontWeight: 500,
                            border: btn.variant === "primary" ? "none" : "1px solid #d1d5db",
                            background: btn.variant === "primary" ? "#4f46e5" : "#fff",
                            color: btn.variant === "primary" ? "#fff" : "#374151",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            transition: "all .15s",
                        }} onMouseEnter={(e) => e.target.style.opacity = 0.9} onMouseLeave={(e) => e.target.style.opacity = 1}>
                            {btn.label}
                        </button>
                    ))}
                </div>
            );
        }

        case "pillGroup": {
            const pillStyle = isPreview ? {
                display: "flex",
                gap: el.props.gap || 8,
                flexWrap: el.props.wrap !== false ? "wrap" : "nowrap",
                justifyContent: "center",
                width: "100%",
            } : {};
            return (
                <div className="el-pill-group" style={{ ...responsiveStyle, ...pillStyle }}>
                    {el.props.pills?.map((pill, idx) => (
                        <span key={idx} style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "4px 12px",
                            borderRadius: 9999,
                            fontSize: isPreview ? "clamp(11px, 1.5vw, 13px)" : "12px",
                            fontWeight: 500,
                            backgroundColor: pill.color || "#eef2ff",
                            color: pill.textColor || "#4f46e5",
                            whiteSpace: "nowrap",
                        }}>
                            {pill.label}
                        </span>
                    ))}
                </div>
            );
        }

        case "title": {
            const titleStyle = isPreview ? {
                fontSize: `clamp(${Math.round((el.props.fontSize || 42) * 0.5)}px, 4vw, ${el.props.fontSize || 42}px)`,
                fontWeight: el.props.fontWeight || 800,
                color: el.props.color || "#1a1a1a",
                textAlign: el.props.textAlign || "left",
                lineHeight: el.props.lineHeight || 1.2,
                maxWidth: "100%",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                display: "-webkit-box",
                WebkitLineClamp: el.props.maxLines || 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            } : {};
            return (
                <h1 className="el-title" style={{ ...responsiveStyle, ...titleStyle }}>
                    {el.props.content}
                </h1>
            );
        }

        case "subtitle": {
            const subtitleStyle = isPreview ? {
                fontSize: `clamp(${Math.round((el.props.fontSize || 22) * 0.5)}px, 3vw, ${el.props.fontSize || 22}px)`,
                fontWeight: el.props.fontWeight || 500,
                color: el.props.color || "#374151",
                textAlign: el.props.textAlign || "left",
                lineHeight: el.props.lineHeight || 1.4,
                maxWidth: "100%",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                display: "-webkit-box",
                WebkitLineClamp: el.props.maxLines || 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            } : {};
            return (
                <h2 className="el-subtitle" style={{ ...responsiveStyle, ...subtitleStyle }}>
                    {el.props.content}
                </h2>
            );
        }

        case "form": {
            const p = el.props || {};
            const isQuotaFull = p.quota && p.quota > 0; // Will be checked via API in real page
            const fieldsToRender = normalizeFormFields(p.fields)
                .map((f) => {
                    const def = findFieldDef(f.key);
                    return def ? { ...def, required: f.required } : null;
                })
                .filter(Boolean);

            const inputStyle = isPreview ? {
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "clamp(13px, 2.5vw, 16px)",
                fontFamily: "inherit",
                boxSizing: "border-box",
            } : {};

            const labelStyle = {
                display: "block",
                marginBottom: "0.375rem",
                fontSize: isPreview ? "clamp(12px, 2vw, 14px)" : "13px",
                fontWeight: 500,
                color: "#374151",
            };

            return (
                <SectionInner type={el.type} props={p}>
                    <div className="el-form" style={{ ...responsiveStyle, display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
                        <div>
                            <h3 style={headingStyle}>{p.title}</h3>
                            {p.subtitle && <p style={{ ...textStyle, color: "#6b7280", marginTop: "0.25rem" }}>{p.subtitle}</p>}
                        </div>

                        {isQuotaFull && (
                            <div style={{ padding: "1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", color: "#dc2626", fontWeight: 500 }}>
                                Kuota pendaftaran sudah penuh.
                            </div>
                        )}

                        {!isQuotaFull && (
                            <>
                                <form onSubmit={(e) => {
                                    if (isPreview) {
                                        e.preventDefault();
                                        // In preview mode, just show success message
                                        alert('Preview: Form submitted successfully! (Data not saved in preview mode)');
                                    }
                                }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        {fieldsToRender.map((field, idx) => {
                                        const isRequired = field.required !== false;
                                        const isFile = field.data_type === 'file';
                                        const isBoolean = field.data_type === 'boolean';
                                        const isEnum = field.data_type === 'enum';
                                        const isLongText = field.is_long_text;

                                        if (isBoolean) {
                                            return (
                                                <div key={field.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                    <input
                                                        type="checkbox"
                                                        id={`form-${el.id}-${field.key}`}
                                                        style={{ width: isPreview ? "20px" : "auto", height: isPreview ? "20px" : "auto", accentColor: p.submitColor }}
                                                    />
                                                    <label htmlFor={`form-${el.id}-${field.key}`} style={labelStyle}>
                                                        {field.label} {isRequired && <span style={{ color: "#ef4444" }}>*</span>}
                                                    </label>
                                                </div>
                                            );
                                        }

                                        if (isFile) {
                                            return (
                                                <div key={field.key}>
                                                    <label style={labelStyle}>
                                                        {field.label} {isRequired && <span style={{ color: "#ef4444" }}>*</span>}
                                                    </label>
                                                    <input type="file" style={inputStyle} accept="image/*,.pdf" />
                                                </div>
                                            );
                                        }

                                        if (isEnum && field.options) {
                                            return (
                                                <div key={field.key}>
                                                    <label style={labelStyle}>
                                                        {field.label} {isRequired && <span style={{ color: "#ef4444" }}>*</span>}
                                                    </label>
                                                    <select style={inputStyle}>
                                                        <option value="">Pilih...</option>
                                                        {field.options.map((opt, oi) => (
                                                            <option key={oi} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            );
                                        }

                                        if (field.data_type === 'date' || field.data_type === 'datetime') {
                                            return (
                                                <div key={field.key}>
                                                    <label style={labelStyle}>
                                                        {field.label} {isRequired && <span style={{ color: "#ef4444" }}>*</span>}
                                                    </label>
                                                    <input
                                                        type={field.data_type === 'date' ? 'date' : 'datetime-local'}
                                                        style={inputStyle}
                                                    />
                                                </div>
                                            );
                                        }

                                        return (
                                            <div key={field.key}>
                                                <label style={labelStyle}>
                                                    {field.label} {isRequired && <span style={{ color: "#ef4444" }}>*</span>}
                                                </label>
                                                {isLongText ? (
                                                    <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} />
                                                ) : (
                                                    <input
                                                        type={field.format === 'email' ? 'email' : field.format === 'phone' ? 'tel' : 'text'}
                                                        style={inputStyle}
                                                        placeholder={field.format === 'email' ? 'email@example.com' : field.format === 'phone' ? '08xxxxxxxxxx' : ''}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                                    <button
                                        type="submit"
                                        className="el-form-submit"
                                        style={{
                                            ...buttonStyle,
                                            background: p.submitColor,
                                            color: "#fff",
                                            borderRadius: 8,
                                            width: isPreview ? "100%" : "auto",
                                        }}
                                    >
                                        {p.submitLabel}
                                    </button>
                                    {p.payButtonLabel && (
                                        <button
                                            className="el-form-pay"
                                            onClick={(e) => {
                                                if (isPreview && window.handlePayClick) {
                                                    e.preventDefault();
                                                    window.handlePayClick(e.currentTarget);
                                                }
                                            }}
                                            style={{
                                                ...buttonStyle,
                                                background: p.payButtonColor,
                                                color: "#fff",
                                                borderRadius: 8,
                                                width: isPreview ? "100%" : "auto",
                                                cursor: isPreview ? "pointer" : "default",
                                            }}
                                        >
                                            {p.payButtonLabel}
                                        </button>
                                    )}
                                </div>
                                </form>
                            </>
                        )}
                    </div>
                </SectionInner>
            );
        }

        case "participant-list": {
            const p = el.props || {};
            return (
                <SectionInner type={el.type} props={p}>
                    <div className="el-participant-list" style={{ ...responsiveStyle, display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                            <h3 style={headingStyle}>{p.title}</h3>
                            <span className="participant-count" style={{ ...textStyle, color: "#6b7280", fontWeight: 500 }}>
                                {el.participantCount || 0} peserta
                            </span>
                        </div>
                        {p.showSearch && (
                            <input
                                type="text"
                                placeholder="Cari nama, email..."
                                style={{ ...inputStyle, width: isPreview ? "100%" : "300px" }}
                            />
                        )}
                        <div style={{ maxHeight: "400px", overflow: "auto", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: isPreview ? "clamp(12px, 2vw, 14px)" : "13px" }}>
                                <thead>
                                    <tr style={{ background: "#f9fafb", position: "sticky", top: 0 }}>
                                        <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Nama</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Email</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Status</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(el.participants || []).map((pt, idx) => (
                                        <tr key={idx} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                            <td style={{ padding: "0.75rem" }}>{pt.name || '-'}</td>
                                            <td style={{ padding: "0.75rem" }}>{pt.email || '-'}</td>
                                            <td style={{ padding: "0.75rem" }}>
                                                <span style={{
                                                    padding: "0.25rem 0.75rem",
                                                    borderRadius: "9999px",
                                                    fontSize: "11px",
                                                    fontWeight: 600,
                                                    background: pt.status === 'diterima' ? '#dcfce7' : pt.status === 'menunggu_konfirmasi' ? '#fef3c7' : '#fee2e2',
                                                    color: pt.status === 'diterima' ? '#166534' : pt.status === 'menunggu_konfirmasi' ? '#92400e' : '#991b1b',
                                                }}>
                                                    {pt.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: "0.75rem", color: "#6b7280" }}>{pt.created_at}</td>
                                        </tr>
                                    ))}
                                    {(el.participants?.length === 0) && (
                                        <tr>
                                            <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#9ca3af" }}>
                                                Belum ada peserta
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </SectionInner>
            );
        }
        
        case "date-time": {
            const p = el.props || {};
            const dateStr = p.date ? new Date(p.date).toLocaleDateString('id-ID', { 
                day: 'numeric', month: 'long', year: 'numeric' 
            }) : '';
            const timeStr = p.time ? p.time.substring(0, 5) : '';
            
            let content = '';
            if (p.showDate && dateStr) content += dateStr;
            if (p.showTime && timeStr) {
                if (content) content += ' | ';
                content += timeStr;
            }
            if (!content) content = 'Tanggal & Waktu belum diatur';
            
            return (
                <SectionInner type={el.type} props={p}>
                    <div className="el-date-time" style={{ ...responsiveStyle, color: p.color, fontSize: isPreview ? `clamp(${Math.round((p.fontSize || 18) * 0.5)}px, 3vw, ${p.fontSize || 18}px)` : p.fontSize || 18, fontWeight: p.fontWeight || 600, textAlign: 'center' }}>
                        {content}
                    </div>
                </SectionInner>
            );
        }
        
        case "location-map": {
            const p = el.props || {};
            const showMap = p.showMap !== false;
            const showAddress = p.showAddress !== false;
            
            return (
                <SectionInner type={el.type} props={p}>
                    <div className="el-location-map" style={{ ...responsiveStyle, display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                        {p.title && <h4 style={headingStyle}>{p.title}</h4>}
                        
                        {showAddress && p.address && (
                            <div className="location-address" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: isPreview ? 'clamp(13px, 2.5vw, 16px)' : '14px', color: '#374151' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{p.address}</span>
                            </div>
                        )}
                        
                        {showMap && p.address && (
                            <div className="location-map" style={{ width: '100%', height: p.height || 300, borderRadius: 8, overflow: 'hidden', background: '#f3f4f6' }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(p.address)}&t=&z=${p.zoom || 15}&ie=UTF8&iwloc=&output=embed`}
                                    allowFullScreen
                                    title={p.address}
                                />
                            </div>
                        )}
                    </div>
                </SectionInner>
            );
        }
        
        case "participant-counter": {
            const p = el.props || {};
            const count = el.participantCount || 0;
            
            return (
                <SectionInner type={el.type} props={p}>
                    <div className="el-participant-counter" style={{ ...responsiveStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center', color: p.color }}>
                        {p.showIcon && (
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5 }}>
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        )}
                        <div style={{ fontSize: isPreview ? `clamp(${Math.round((p.fontSize || 24) * 0.5)}px, 5vw, ${p.fontSize || 24}px)` : p.fontSize || 24, fontWeight: p.fontWeight || 700 }}>
                            {count.toLocaleString('id-ID')}
                        </div>
                        {p.label && <div style={{ fontSize: isPreview ? 'clamp(12px, 2vw, 14px)' : '13px', color: '#6b7280' }}>{p.label}</div>}
                    </div>
                </SectionInner>
            );
        }
        
        case "gallery": {
            const p = el.props || {};
            const images = p.images || [];
            const layout = p.layout || 'grid';
            const columns = p.columns || 3;
            const gap = p.gap || 12;
            const aspectRatio = p.aspectRatio || '4/3';
            
            const gridStyle = {
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`,
                width: '100%',
            };
            
            const sliderStyle = {
                display: 'flex',
                overflowX: 'auto',
                gap: `${gap}px`,
                width: '100%',
                paddingBottom: '10px',
                scrollSnapType: 'x mandatory',
            };
            
            const itemStyle = {
                aspectRatio: aspectRatio,
                borderRadius: 8,
                overflow: 'hidden',
                background: '#f3f4f6',
                flexShrink: 0,
                width: layout === 'slider' ? '300px' : '100%',
                scrollSnapAlign: layout === 'slider' ? 'start' : undefined,
            };
            
            const fullWidthStyle = {
                width: '100%',
                aspectRatio: aspectRatio,
                borderRadius: 8,
                overflow: 'hidden',
                background: '#f3f4f6',
            };
            
            return (
                <SectionInner type={el.type} props={p}>
                    <div className="el-gallery" style={{ ...responsiveStyle, width: '100%' }}>
                        {p.title && <h3 style={headingStyle}>{p.title}</h3>}
                        {images.length === 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200, color: '#9ca3af', background: '#f9fafb', borderRadius: 8, border: '2px dashed #d1d5db' }}>
                                Belum ada gambar. Tambah gambar di panel properti.
                            </div>
                        ) : layout === 'slider' ? (
                            <div style={sliderStyle}>
                                {images.map((img, idx) => (
                                    <div key={idx} style={itemStyle}>
                                        <img src={img.url || img} alt={img.alt || `Gambar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        ) : layout === 'full-width' ? (
                            <div style={fullWidthStyle}>
                                <img src={images[0]?.url || images[0]} alt={images[0]?.alt || 'Banner'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ) : (
                            <div style={gridStyle}>
                                {images.map((img, idx) => (
                                    <div key={idx} style={itemStyle}>
                                        <img src={img.url || img} alt={img.alt || `Gambar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </SectionInner>
            );
        }
        
        case "event-sidebar": {
            const p = el.props || {};
            const items = p.items || [];
            const activeColor = p.activeColor || '#4f46e5';
            const textColor = p.textColor || '#1a1a1a';
            const bgColor = p.bgColor || '#ffffff';
            
            return (
                <SectionInner type={el.type} props={p}>
                    <nav className="el-event-sidebar" style={{ ...responsiveStyle, background: bgColor, borderRadius: 8, padding: '1rem', width: '100%' }}>
                        {p.title && <h4 style={{ ...headingStyle, marginBottom: '1rem', color: textColor }}>{p.title}</h4>}
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {items.map((item, idx) => (
                                <li key={idx} style={{ cursor: item.pageId ? 'pointer' : 'default' }}>
                                    <button
                                        type="button"
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '0.75rem 1rem',
                                            border: 'none',
                                            background: 'transparent',
                                            color: textColor,
                                            fontSize: isPreview ? 'clamp(13px, 2.5vw, 16px)' : '14px',
                                            fontWeight: 500,
                                            borderRadius: 6,
                                            cursor: item.pageId ? 'pointer' : 'default',
                                            transition: 'all 0.15s',
                                        }}
                                        onMouseEnter={(e) => { if (item.pageId) e.target.style.background = '#f3f4f6'; }}
                                        onMouseLeave={(e) => { if (item.pageId) e.target.style.background = 'transparent'; }}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </SectionInner>
            );
        }
        
        case "link-button": {
            const p = el.props || {};
            return (
                <SectionInner type={el.type} props={p}>
                    <a
                        href={p.href}
                        target={p.openInNewTab ? '_blank' : '_self'}
                        rel={p.openInNewTab ? 'noopener noreferrer' : ''}
                        className="el-link-button"
                        style={{
                            ...responsiveStyle,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 20px',
                            borderRadius: p.radius || 8,
                            background: p.bgColor || '#4f46e5',
                            color: p.textColor || '#ffffff',
                            fontSize: p.fontSize || 14,
                            fontWeight: p.fontWeight || '500',
                            textDecoration: 'none',
                            width: isPreview ? '100%' : 'auto',
                            boxSizing: 'border-box',
                        }}
                    >
                        {p.label}
                    </a>
                </SectionInner>
            );
        }

        // Tiga tombol alur pendaftaran. Di kanvas builder semuanya statis —
        // aksi sebenarnya (scroll, OAuth, klaim bayar) jalan di halaman publik.
        case "register-button":
        case "pay-button": {
            const p = el.props || {};
            const isPay = el.type === "pay-button";
            return (
                <SectionInner type={el.type} props={p}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                        {isPay && p.showAmount !== false && Number(p.amount) > 0 && (
                            <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
                                {formatAmount(p.currency, p.amount)}
                            </span>
                        )}
                        {isPay && p.instruction && (
                            <span style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>
                                {p.instruction}
                            </span>
                        )}
                        <button
                            type="button"
                            className={isPay ? "el-pay-button" : "el-register-button"}
                            style={{
                                ...responsiveStyle,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: p.radius ?? 8,
                                background: p.bgColor || (isPay ? "#059669" : "#4f46e5"),
                                color: p.textColor || "#ffffff",
                                fontSize: p.fontSize || 15,
                                fontWeight: p.fontWeight || "600",
                                cursor: "pointer",
                                width: isPreview ? "100%" : "auto",
                                boxSizing: "border-box",
                            }}
                        >
                            {p.label}
                        </button>
                    </div>
                </SectionInner>
            );
        }

        case "google-login": {
            const p = el.props || {};
            return (
                <SectionInner type={el.type} props={p}>
                    <button
                        type="button"
                        className="el-google-login"
                        style={{
                            ...responsiveStyle,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: "10px 20px",
                            borderRadius: p.radius ?? 4,
                            background: p.bgColor || "#ffffff",
                            color: p.textColor || "#333333",
                            border: `1px solid ${p.borderColor || "#dadce0"}`,
                            fontSize: p.fontSize || 14,
                            fontWeight: 500,
                            cursor: "pointer",
                            width: isPreview ? "100%" : "auto",
                            boxSizing: "border-box",
                        }}
                    >
                        <GoogleGlyph />
                        {p.label}
                    </button>
                </SectionInner>
            );
        }

        default:
            return null;
    }
}

// Label ringkas sebuah elemen untuk dropdown "tujuan" — pakai judul/label
// yang diisi EO kalau ada, supaya dua Form di satu halaman bisa dibedakan.
export function describeElementTarget(el, index) {
    const meta = EVENT_COMPONENTS.find((c) => c.type === el.type);
    const typeLabel = meta?.label || el.type;
    const p = el.props || {};
    const own = p.title || p.label || p.content;
    const suffix = typeof own === "string" && own.trim() ? ` — ${own.trim().slice(0, 30)}` : "";
    return `${index + 1}. ${typeLabel}${suffix}`;
}

// Pemilih tujuan navigasi: section di halaman ini, halaman lain, atau URL luar.
function TargetPicker({ value, onChange, elements = [], pages = [], allowUrl = true }) {
    // Item lama: Sidebar memakai { pageId }, Navbar memakai { href }.
    const targetType =
        value.targetType ||
        (value.pageId ? "page" : value.href?.startsWith("#") ? "section" : value.href ? "url" : "section");
    const currentId = value.targetId || value.pageId || "";
    const sectionable = elements.filter((el) => isSectionType(el.type));

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
            <select
                value={targetType}
                onChange={(e) => onChange({ targetType: e.target.value, targetId: "", href: "" })}
            >
                <option value="section">Section di halaman ini</option>
                <option value="page">Halaman lain</option>
                {allowUrl && <option value="url">URL luar</option>}
            </select>

            {targetType === "section" && (
                <select value={currentId} onChange={(e) => onChange({ targetId: e.target.value })}>
                    <option value="">— pilih section —</option>
                    {sectionable.map((el, i) => (
                        <option key={el.id} value={el.id}>
                            {describeElementTarget(el, i)}
                        </option>
                    ))}
                </select>
            )}

            {targetType === "page" && (
                <select value={currentId} onChange={(e) => onChange({ targetId: e.target.value, pageId: e.target.value || null })}>
                    <option value="">— pilih halaman —</option>
                    {pages.map((pg) => (
                        <option key={pg.id} value={pg.id}>
                            {pg.name || pg.id}
                        </option>
                    ))}
                </select>
            )}

            {targetType === "url" && (
                <input
                    type="url"
                    placeholder="https://example.com"
                    value={value.href || ""}
                    onChange={(e) => onChange({ href: e.target.value })}
                />
            )}
        </div>
    );
}

// Logo Google resmi — dipakai di kanvas builder; halaman publik punya
// salinan SVG yang sama di public.blade.php.
function GoogleGlyph() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z" fill="#34A853" />
            <path d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" fill="#FBBC05" />
            <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335" />
        </svg>
    );
}

// Helper: wrap element with <a> tag if isLink is true
export function wrapElementWithLink(content, props) {
    if (!props.isLink || !props.linkUrl) return content;
    const href = props.linkUrl;
    const target = props.linkTarget || (props.openInNewTab ? "_blank" : "_self");
    const rel = props.openInNewTab ? "noopener noreferrer" : "";
    return (
        <a href={href} target={target} rel={rel} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            {content}
        </a>
    );
}

// ===================== UNIVERSAL LINK SECTION =====================
function UniversalLinkSection({ p, onUpdateProps }) {
    return (
        <>
            <div className="prop-group" style={{ borderTop: "1px solid #e5e7eb", marginTop: "1rem", paddingTop: "1rem" }}>
                <label className="prop-group-label">Tautan (Universal)</label>
                <div className="prop-group checkbox-group" style={{ marginBottom: "0.5rem" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={p.isLink}
                            onChange={(e) => onUpdateProps({ isLink: e.target.checked })}
                        />
                        Jadikan tautan (klik akan mengarah ke URL)
                    </label>
                </div>
                {p.isLink && (
                    <>
                        <PropField label="URL Tujuan">
                            <input
                                type="url"
                                value={p.linkUrl}
                                onChange={(e) => onUpdateProps({ linkUrl: e.target.value })}
                                placeholder="https://example.com atau #section-id"
                            />
                        </PropField>
                        <PropField label="Target">
                            <select
                                value={p.linkTarget}
                                onChange={(e) => onUpdateProps({ linkTarget: e.target.value })}
                            >
                                <option value="">_self (tab sama)</option>
                                <option value="_blank">_blank (tab baru)</option>
                                <option value="_parent">_parent</option>
                                <option value="_top">_top</option>
                            </select>
                        </PropField>
                        <div className="prop-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={p.openInNewTab}
                                    onChange={(e) => onUpdateProps({ openInNewTab: e.target.checked })}
                                />
                                Buka di tab baru (rel="noopener noreferrer")
                            </label>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

// ===================== EVENT PROPERTIES PANEL =====================
export function EventPropertiesPanel({ element, onUpdateProps, pages = [], elements = [] }) {
    const p = element.props;

    // Kontrol lebar section — hanya untuk komponen section/container
    const widthPresetControl = isSectionType(element.type) ? (
        <>
            <PropField label="Lebar Konten">
                <select
                    value={
                        p.widthPreset || defaultWidthPresetFor(element.type)
                    }
                    onChange={(e) =>
                        onUpdateProps({ widthPreset: e.target.value })
                    }
                >
                    {Object.entries(SECTION_WIDTH_PRESETS).map(
                        ([key, preset]) => (
                            <option key={key} value={key}>
                                {preset.label}
                                {preset.maxWidth
                                    ? ` (${preset.maxWidth}px)`
                                    : ""}
                            </option>
                        ),
                    )}
                </select>
            </PropField>
            <PropField label="Arah Scroll">
                <select
                    value={p.scrollDirection || "vertical"}
                    onChange={(e) => onUpdateProps({ scrollDirection: e.target.value })}
                >
                    <option value="vertical">Vertikal (atas-bawah)</option>
                    <option value="horizontal">Horizontal (kiri-kanan)</option>
                </select>
            </PropField>
        </>
    ) : null;

    // Universal link section for ALL element types
    const universalLinkSection = <UniversalLinkSection p={p} onUpdateProps={onUpdateProps} />;

    const body = (() => {
        switch (element.type) {
        case "countdown":
            return (
                <>
                    <PropField label="Label">
                        <input
                            type="text"
                            value={p.label}
                            onChange={(e) =>
                                onUpdateProps({ label: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Tanggal & Waktu Acara">
                        <input
                            type="datetime-local"
                            value={p.targetDate}
                            onChange={(e) =>
                                onUpdateProps({ targetDate: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Format Tampilan">
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {COUNTDOWN_UNITS.map((u) => {
                                const active = (p.format || COUNTDOWN_UNITS.map((x) => x.key)).includes(u.key);
                                return (
                                    <label key={u.key} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                                        <input
                                            type="checkbox"
                                            checked={active}
                                            onChange={(e) => {
                                                const current = p.format || COUNTDOWN_UNITS.map((x) => x.key);
                                                const next = e.target.checked
                                                    ? COUNTDOWN_UNITS.map((x) => x.key).filter((k) => current.includes(k) || k === u.key)
                                                    : current.filter((k) => k !== u.key);
                                                // Sisakan minimal satu unit supaya tidak kosong melompong.
                                                onUpdateProps({ format: next.length ? next : [u.key] });
                                            }}
                                        />
                                        {u.label}
                                    </label>
                                );
                            })}
                        </div>
                    </PropField>
                    <PropField label="Teks Saat Waktu Habis">
                        <input
                            type="text"
                            value={p.expiredText ?? ""}
                            onChange={(e) => onUpdateProps({ expiredText: e.target.value })}
                            placeholder="Acara telah dimulai"
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
                </>
            );

        case "rsvp":
            return (
                <>
                    <PropField label="Teks Pertanyaan">
                        <input
                            type="text"
                            value={p.question ?? ""}
                            onChange={(e) => onUpdateProps({ question: e.target.value })}
                            placeholder="Apakah Anda akan hadir?"
                        />
                    </PropField>
                    <PropField label="Pilihan Jawaban">
                        <div>
                            {(p.answerOptions || []).map((opt, idx) => (
                                <div className="schedule-edit-row" key={idx} style={{ marginBottom: 8 }}>
                                    <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                            const opts = [...(p.answerOptions || [])];
                                            opts[idx] = e.target.value;
                                            onUpdateProps({ answerOptions: opts });
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        className="icon-btn danger small"
                                        onClick={() => onUpdateProps({ answerOptions: (p.answerOptions || []).filter((_, i) => i !== idx) })}
                                    >×</button>
                                </div>
                            ))}
                            <button
                                className="btn-add-row"
                                onClick={() => onUpdateProps({ answerOptions: [...(p.answerOptions || []), ""] })}
                            >+ Tambah Pilihan</button>
                        </div>
                    </PropField>
                    <PropField label="Judul Form">
                        <input
                            type="text"
                            value={p.title}
                            onChange={(e) =>
                                onUpdateProps({ title: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Sub-judul">
                        <input
                            type="text"
                            value={p.subtitle}
                            onChange={(e) =>
                                onUpdateProps({ subtitle: e.target.value })
                            }
                        />
                    </PropField>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={p.showGuestCount}
                                onChange={(e) =>
                                    onUpdateProps({
                                        showGuestCount: e.target.checked,
                                    })
                                }
                            />
                            Tampilkan jumlah tamu
                        </label>
                    </div>
                    <PropField label="Label Tombol">
                        <input
                            type="text"
                            value={p.buttonLabel}
                            onChange={(e) =>
                                onUpdateProps({ buttonLabel: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="Warna Tombol">
                        <input
                            type="color"
                            value={p.buttonColor}
                            onChange={(e) =>
                                onUpdateProps({ buttonColor: e.target.value })
                            }
                        />
                    </PropField>
                </>
            );

        case "schedule":
            return (
                <PropField label="Rangkaian Acara">
                    <div>
                        <input
                            type="text"
                            value={p.title}
                            onChange={(e) =>
                                onUpdateProps({ title: e.target.value })
                            }
                            style={{ marginBottom: 8 }}
                        />
                        {p.items.map((item, idx) => (
                            <div className="schedule-edit-row" key={idx}>
                                <input
                                    type="text"
                                    className="schedule-time-input"
                                    value={item.time}
                                    placeholder="19:00"
                                    onChange={(e) => {
                                        const items = [...p.items];
                                        items[idx] = {
                                            ...items[idx],
                                            time: e.target.value,
                                        };
                                        onUpdateProps({ items });
                                    }}
                                />
                                <input
                                    type="text"
                                    className="schedule-time-input"
                                    value={item.endTime ?? ""}
                                    placeholder="selesai"
                                    onChange={(e) => {
                                        const items = [...p.items];
                                        items[idx] = {
                                            ...items[idx],
                                            endTime: e.target.value,
                                        };
                                        onUpdateProps({ items });
                                    }}
                                />
                                <input
                                    type="text"
                                    className="schedule-desc-input"
                                    value={item.desc}
                                    placeholder="Nama sesi"
                                    onChange={(e) => {
                                        const items = [...p.items];
                                        items[idx] = {
                                            ...items[idx],
                                            desc: e.target.value,
                                        };
                                        onUpdateProps({ items });
                                    }}
                                />
                                <input
                                    type="text"
                                    className="schedule-desc-input"
                                    value={item.speaker ?? ""}
                                    placeholder="Pembicara (opsional)"
                                    onChange={(e) => {
                                        const items = [...p.items];
                                        items[idx] = {
                                            ...items[idx],
                                            speaker: e.target.value,
                                        };
                                        onUpdateProps({ items });
                                    }}
                                />
                                <button
                                    className="icon-btn danger small"
                                    onClick={() =>
                                        onUpdateProps({
                                            items: p.items.filter(
                                                (_, i) => i !== idx,
                                            ),
                                        })
                                    }
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            className="btn-add-row"
                            onClick={() =>
                                onUpdateProps({
                                    items: [...p.items, { time: "", desc: "" }],
                                })
                            }
                        >
                            + Tambah Baris
                        </button>
                    </div>
                </PropField>
            );

        case "ticket":
            return (
                <PropField label="Kategori Tiket">
                    <div>
                        <input
                            type="text"
                            value={p.title}
                            onChange={(e) =>
                                onUpdateProps({ title: e.target.value })
                            }
                            style={{ marginBottom: 8 }}
                        />
                        {p.tiers.map((tier, idx) => (
                            <div className="ticket-edit-row" key={idx}>
                                <input
                                    type="text"
                                    className="ticket-name-input"
                                    value={tier.name}
                                    placeholder="Nama tiket"
                                    onChange={(e) => {
                                        const tiers = [...p.tiers];
                                        tiers[idx] = {
                                            ...tiers[idx],
                                            name: e.target.value,
                                        };
                                        onUpdateProps({ tiers });
                                    }}
                                />
                                <input
                                    type="text"
                                    className="ticket-price-input"
                                    value={tier.price}
                                    placeholder="Rp 0"
                                    onChange={(e) => {
                                        const tiers = [...p.tiers];
                                        tiers[idx] = {
                                            ...tiers[idx],
                                            price: e.target.value,
                                        };
                                        onUpdateProps({ tiers });
                                    }}
                                />
                                <input
                                    type="number"
                                    className="ticket-quota-input"
                                    value={tier.quota}
                                    placeholder="Kuota"
                                    onChange={(e) => {
                                        const tiers = [...p.tiers];
                                        tiers[idx] = {
                                            ...tiers[idx],
                                            quota: Number(e.target.value),
                                        };
                                        onUpdateProps({ tiers });
                                    }}
                                />
                                <button
                                    className="icon-btn danger small"
                                    onClick={() =>
                                        onUpdateProps({
                                            tiers: p.tiers.filter(
                                                (_, i) => i !== idx,
                                            ),
                                        })
                                    }
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            className="btn-add-row"
                            onClick={() =>
                                onUpdateProps({
                                    tiers: [
                                        ...p.tiers,
                                        { name: "", price: "", quota: 0 },
                                    ],
                                })
                            }
                        >
                            + Tambah Tiket
                        </button>
                    </div>
                </PropField>
            );

        case "map":
            return (
                <>
                <PropField label="Link Google Maps">
                    <input
                        type="url"
                        value={p.mapsUrl ?? ""}
                        onChange={(e) => onUpdateProps({ mapsUrl: e.target.value })}
                        placeholder="https://maps.app.goo.gl/..."
                    />
                </PropField>
                <PropField label="Alamat Lokasi">
                    <textarea
                        rows={2}
                        value={p.address}
                        onChange={(e) =>
                            onUpdateProps({ address: e.target.value })
                        }
                    />
                </PropField>
                </>
            );

        case "poll":
            return (
                <PropField label="Pertanyaan Poll">
                    <input
                        type="text"
                        value={p.question}
                        onChange={(e) =>
                            onUpdateProps({ question: e.target.value })
                        }
                    />
                </PropField>
            );

        case "guestbook":
            return (
                <PropField label="Titel Guestbook">
                    <input
                        type="text"
                        value={p.title}
                        onChange={(e) =>
                            onUpdateProps({ title: e.target.value })
                        }
                    />
                </PropField>
            );

        case "feedback":
            return (
                <PropField label="Titel Feedback">
                    <input
                        type="text"
                        value={p.title}
                        onChange={(e) =>
                            onUpdateProps({ title: e.target.value })
                        }
                    />
                </PropField>
            );

        case "sponsor":
            return (
                <>
                    <PropField label="Nama Sponsor">
                        <input
                            type="text"
                            value={p.name}
                            onChange={(e) =>
                                onUpdateProps({ name: e.target.value })
                            }
                        />
                    </PropField>
                    <PropField label="URL Sponsor">
                        <input
                            type="text"
                            value={p.url}
                            onChange={(e) =>
                                onUpdateProps({ url: e.target.value })
                            }
                            placeholder="https://..."
                        />
                    </PropField>
                </>
            );

        case "submit":
            return (
                <>
                    <PropField label="Aksi Submit">
                        <select
                            value={p.action}
                            onChange={(e) =>
                                onUpdateProps({ action: e.target.value })
                            }
                        >
                            <option value="save">Simpan Data</option>
                            <option value="redirect">Redirect URL</option>
                            <option value="email">Kirim Email</option>
                        </select>
                    </PropField>
                    <PropField label="Warna Tombol">
                        <input
                            type="color"
                            value={el.props.color}
                            onChange={(e) =>
                                onUpdateProps({ color: e.target.value })
                            }
                        />
                    </PropField>
                </>
            );

        case "oke":
            return (
                <PropField label="Aksi Oke">
                    <select
                        value={p.action}
                        onChange={(e) =>
                            onUpdateProps({ action: e.target.value })
                        }
                    >
                        <option value="close">Tutup Modal</option>
                        <option value="next">Langkah Selanjutnya</option>
                    </select>
                </PropField>
            );

        case "cancel":
            return (
                <PropField label="Aksi Batal">
                    <select
                        value={p.action}
                        onChange={(e) =>
                            onUpdateProps({ action: e.target.value })
                        }
                    >
                        <option value="close">Tutup Modal</option>
                        <option value="back">Kembali</option>
                    </select>
                </PropField>
            );

        case "google-login":
            return (
                <>
                    <PropField label="Label Tombol">
                        <input type="text" value={p.label} onChange={(e) => onUpdateProps({ label: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Latar">
                        <input type="color" value={p.bgColor || "#ffffff"} onChange={(e) => onUpdateProps({ bgColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input type="color" value={p.textColor || "#333333"} onChange={(e) => onUpdateProps({ textColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Border">
                        <input type="color" value={p.borderColor || "#dadce0"} onChange={(e) => onUpdateProps({ borderColor: e.target.value })} />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input type="number" min={0} max={20} value={p.radius || 4} onChange={(e) => onUpdateProps({ radius: Number(e.target.value) })} />
                    </PropField>
                </>
            );

        // ===================== NEW LAYOUT & TEXT ELEMENTS PROPERTIES =====================
        case "container":
            return (
                <>
                    <PropField label="Tata Letak">
                        <select
                            value={p.flexDirection || "row"}
                            onChange={(e) => onUpdateProps({ flexDirection: e.target.value })}
                        >
                            <option value="row">Horizontal (Row)</option>
                            <option value="column">Vertikal (Column)</option>
                        </select>
                    </PropField>
                    <PropField label="Gap (px)">
                        <input
                            type="number"
                            min={0}
                            max={100}
                            value={p.gap || 16}
                            onChange={(e) => onUpdateProps({ gap: Number(e.target.value) })}
                        />
                    </PropField>
                    <PropField label="Padding (px)">
                        <input
                            type="number"
                            min={0}
                            max={100}
                            value={p.padding || 16}
                            onChange={(e) => onUpdateProps({ padding: Number(e.target.value) })}
                        />
                    </PropField>
                    <PropField label="Warna Latar">
                        <input
                            type="color"
                            value={p.bgColor || "#ffffff"}
                            onChange={(e) => onUpdateProps({ bgColor: e.target.value })}
                        />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input
                            type="number"
                            min={0}
                            max={50}
                            value={p.borderRadius || 8}
                            onChange={(e) => onUpdateProps({ borderRadius: Number(e.target.value) })}
                        />
                    </PropField>
                    <PropField label="Align Items">
                        <select
                            value={p.alignItems || "stretch"}
                            onChange={(e) => onUpdateProps({ alignItems: e.target.value })}
                        >
                            <option value="stretch">Stretch</option>
                            <option value="flex-start">Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">End</option>
                        </select>
                    </PropField>
                    <PropField label="Justify Content">
                        <select
                            value={p.justifyContent || "flex-start"}
                            onChange={(e) => onUpdateProps({ justifyContent: e.target.value })}
                        >
                            <option value="flex-start">Start</option>
                            <option value="center">Center</option>
                            <option value="flex-end">End</option>
                            <option value="space-between">Space Between</option>
                            <option value="space-around">Space Around</option>
                        </select>
                    </PropField>
                </>
            );

        case "navbar":
            return (
                <>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={p.showLogo !== false}
                                onChange={(e) => onUpdateProps({ showLogo: e.target.checked })}
                            />
                            Tampilkan logo/branding
                        </label>
                    </div>
                    <PropField label="Teks Logo">
                        <input
                            type="text"
                            value={p.logoText}
                            onChange={(e) => onUpdateProps({ logoText: e.target.value })}
                        />
                    </PropField>
                    <PropField label="Warna Logo">
                        <input
                            type="color"
                            value={p.logoColor}
                            onChange={(e) => onUpdateProps({ logoColor: e.target.value })}
                        />
                    </PropField>
                    <PropField label="Item Menu">
                        <div>
                            {p.menuItems?.map((item, idx) => (
                                <div key={idx} className="schedule-edit-row" style={{ marginBottom: 8 }}>
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={item.label}
                                        onChange={(e) => {
                                            const items = [...p.menuItems];
                                            items[idx] = { ...items[idx], label: e.target.value };
                                            onUpdateProps({ menuItems: items });
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <TargetPicker
                                        value={item}
                                        elements={elements}
                                        pages={pages}
                                        onChange={(patch) => {
                                            const items = [...p.menuItems];
                                            items[idx] = { ...items[idx], ...patch };
                                            onUpdateProps({ menuItems: items });
                                        }}
                                    />
                                    <button className="icon-btn danger small" onClick={() => onUpdateProps({ menuItems: p.menuItems.filter((_, i) => i !== idx) })}>
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button className="btn-add-row" onClick={() => onUpdateProps({ menuItems: [...p.menuItems, { label: "", targetType: "section", targetId: "", href: "" }] })}>
                                + Tambah Menu
                            </button>
                        </div>
                    </PropField>
                    <PropField label="Tombol Auth">
                        <div>
                            {p.authButtons?.map((btn, idx) => (
                                <div key={idx} className="schedule-edit-row" style={{ marginBottom: 8 }}>
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={btn.label}
                                        onChange={(e) => {
                                            const btns = [...p.authButtons];
                                            btns[idx] = { ...btns[idx], label: e.target.value };
                                            onUpdateProps({ authButtons: btns });
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <select
                                        value={btn.variant}
                                        onChange={(e) => {
                                            const btns = [...p.authButtons];
                                            btns[idx] = { ...btns[idx], variant: e.target.value };
                                            onUpdateProps({ authButtons: btns });
                                        }}
                                        style={{ width: 120 }}
                                    >
                                        <option value="ghost">Ghost</option>
                                        <option value="primary">Primary</option>
                                    </select>
                                    <button className="icon-btn danger small" onClick={() => onUpdateProps({ authButtons: p.authButtons.filter((_, i) => i !== idx) })}>
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button className="btn-add-row" onClick={() => onUpdateProps({ authButtons: [...p.authButtons, { label: "", variant: "ghost" }] })}>
                                + Tambah Tombol
                            </button>
                        </div>
                    </PropField>
                    <PropField label="Warna Latar">
                        <input type="color" value={p.bgColor} onChange={(e) => onUpdateProps({ bgColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input type="color" value={p.textColor} onChange={(e) => onUpdateProps({ textColor: e.target.value })} />
                    </PropField>
                    <PropField label="Tinggi (px)">
                        <input type="number" min={40} max={120} value={p.height} onChange={(e) => onUpdateProps({ height: Number(e.target.value) })} />
                    </PropField>
                </>
            );

        case "buttonGroup":
            return (
                <>
                    <PropField label="Tombol-tombol">
                        <div>
                            {p.buttons?.map((btn, idx) => (
                                <div key={idx} className="schedule-edit-row" style={{ marginBottom: 8 }}>
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={btn.label}
                                        onChange={(e) => {
                                            const btns = [...p.buttons];
                                            btns[idx] = { ...btns[idx], label: e.target.value };
                                            onUpdateProps({ buttons: btns });
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <select
                                        value={btn.variant}
                                        onChange={(e) => {
                                            const btns = [...p.buttons];
                                            btns[idx] = { ...btns[idx], variant: e.target.value };
                                            onUpdateProps({ buttons: btns });
                                        }}
                                        style={{ width: 120 }}
                                    >
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="outline">Outline</option>
                                        <option value="ghost">Ghost</option>
                                    </select>
                                    <button className="icon-btn danger small" onClick={() => onUpdateProps({ buttons: p.buttons.filter((_, i) => i !== idx) })}>
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button className="btn-add-row" onClick={() => onUpdateProps({ buttons: [...p.buttons, { label: "", variant: "primary" }] })}>
                                + Tambah Tombol
                            </button>
                        </div>
                    </PropField>
                    <PropField label="Gap (px)">
                        <input type="number" min={0} max={50} value={p.gap || 12} onChange={(e) => onUpdateProps({ gap: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Align Items">
                        <select value={p.alignItems || "center"} onChange={(e) => onUpdateProps({ alignItems: e.target.value })}>
                            <option value="center">Center</option>
                            <option value="flex-start">Start</option>
                            <option value="flex-end">End</option>
                            <option value="stretch">Stretch</option>
                        </select>
                    </PropField>
                </>
            );

        case "pillGroup":
            return (
                <>
                    <PropField label="Badge-badges">
                        <div>
                            {p.pills?.map((pill, idx) => (
                                <div key={idx} className="schedule-edit-row" style={{ marginBottom: 8 }}>
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={pill.label}
                                        onChange={(e) => {
                                            const pills = [...p.pills];
                                            pills[idx] = { ...pills[idx], label: e.target.value };
                                            onUpdateProps({ pills: pills });
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <input
                                        type="color"
                                        value={pill.color}
                                        onChange={(e) => {
                                            const pills = [...p.pills];
                                            pills[idx] = { ...pills[idx], color: e.target.value };
                                            onUpdateProps({ pills: pills });
                                        }}
                                        style={{ width: 40, height: 36 }}
                                    />
                                    <input
                                        type="color"
                                        value={pill.textColor}
                                        onChange={(e) => {
                                            const pills = [...p.pills];
                                            pills[idx] = { ...pills[idx], textColor: e.target.value };
                                            onUpdateProps({ pills: pills });
                                        }}
                                        style={{ width: 40, height: 36 }}
                                    />
                                    <button className="icon-btn danger small" onClick={() => onUpdateProps({ pills: p.pills.filter((_, i) => i !== idx) })}>
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button className="btn-add-row" onClick={() => onUpdateProps({ pills: [...p.pills, { label: "", color: "#4f46e5", textColor: "#ffffff" }] })}>
                                + Tambah Badge
                            </button>
                        </div>
                    </PropField>
                    <PropField label="Gap (px)">
                        <input type="number" min={0} max={50} value={p.gap || 8} onChange={(e) => onUpdateProps({ gap: Number(e.target.value) })} />
                    </PropField>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={p.wrap !== false}
                                onChange={(e) => onUpdateProps({ wrap: e.target.checked })}
                            />
                            Izinkan wrap ke baris baru
                        </label>
                    </div>
                </>
            );

        case "title":
            return (
                <>
                    <PropField label="Isi Judul">
                        <textarea
                            rows={2}
                            value={p.content}
                            onChange={(e) => onUpdateProps({ content: e.target.value })}
                        />
                    </PropField>
                    <PropField label={`Ukuran Font (${p.fontSize}px)`}>
                        <input
                            type="range"
                            min={24}
                            max={72}
                            value={p.fontSize}
                            onChange={(e) => onUpdateProps({ fontSize: Number(e.target.value) })}
                        />
                    </PropField>
                    <PropField label="Warna">
                        <input type="color" value={p.color} onChange={(e) => onUpdateProps({ color: e.target.value })} />
                    </PropField>
                    <PropField label="Ketebalan">
                        <select value={p.fontWeight} onChange={(e) => onUpdateProps({ fontWeight: e.target.value })}>
                            <option value="700">Bold</option>
                            <option value="800">Extra Bold</option>
                            <option value="900">Black</option>
                        </select>
                    </PropField>
                    <PropField label="Text Align">
                        <select value={p.textAlign || "left"} onChange={(e) => onUpdateProps({ textAlign: e.target.value })}>
                            <option value="left">Kiri</option>
                            <option value="center">Tengah</option>
                            <option value="right">Kanan</option>
                        </select>
                    </PropField>
                    <PropField label="Line Height">
                        <input type="number" step={0.1} min={1} max={2} value={p.lineHeight || 1.2} onChange={(e) => onUpdateProps({ lineHeight: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Max Lines">
                        <input type="number" min={1} max={5} value={p.maxLines || 3} onChange={(e) => onUpdateProps({ maxLines: Number(e.target.value) })} />
                    </PropField>
                </>
            );

        case "subtitle":
            return (
                <>
                    <PropField label="Isi Subjudul">
                        <textarea
                            rows={2}
                            value={p.content}
                            onChange={(e) => onUpdateProps({ content: e.target.value })}
                        />
                    </PropField>
                    <PropField label={`Ukuran Font (${p.fontSize}px)`}>
                        <input
                            type="range"
                            min={16}
                            max={32}
                            value={p.fontSize}
                            onChange={(e) => onUpdateProps({ fontSize: Number(e.target.value) })}
                        />
                    </PropField>
                    <PropField label="Warna">
                        <input type="color" value={p.color} onChange={(e) => onUpdateProps({ color: e.target.value })} />
                    </PropField>
                    <PropField label="Ketebalan">
                        <select value={p.fontWeight} onChange={(e) => onUpdateProps({ fontWeight: e.target.value })}>
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                        </select>
                    </PropField>
                    <PropField label="Text Align">
                        <select value={p.textAlign || "left"} onChange={(e) => onUpdateProps({ textAlign: e.target.value })}>
                            <option value="left">Kiri</option>
                            <option value="center">Tengah</option>
                            <option value="right">Kanan</option>
                        </select>
                    </PropField>
                    <PropField label="Line Height">
                        <input type="number" step={0.1} min={1} max={2} value={p.lineHeight || 1.4} onChange={(e) => onUpdateProps({ lineHeight: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Max Lines">
                        <input type="number" min={1} max={5} value={p.maxLines || 3} onChange={(e) => onUpdateProps({ maxLines: Number(e.target.value) })} />
                    </PropField>
                </>
            );

        case "form":
            return (
                <>
                    <PropField label="Judul Form">
                        <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
                    </PropField>
                    <PropField label="Sub-judul">
                        <input type="text" value={p.subtitle} onChange={(e) => onUpdateProps({ subtitle: e.target.value })} />
                    </PropField>

                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={p.requireLogin !== false}
                                onChange={(e) => onUpdateProps({ requireLogin: e.target.checked })}
                            />
                            Wajib login Google sebelum isi form
                        </label>
                    </div>
                    {p.requireLogin !== false && (
                        <PropField label="Teks Ajakan Login">
                            <input
                                type="text"
                                value={p.loginPrompt || ""}
                                onChange={(e) => onUpdateProps({ loginPrompt: e.target.value })}
                            />
                        </PropField>
                    )}

                    <PropField label="Field Form">
                        <div style={{ maxHeight: "300px", overflow: "auto", border: "1px solid #e5e7eb", borderRadius: "6px" }}>
                            {(p.fields || []).length === 0 ? (
                                <div style={{ padding: "1rem", color: "#9ca3af", textAlign: "center" }}>Belum ada field. Pilih dari katalog di bawah.</div>
                            ) : (
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {normalizeFormFields(p.fields).map((item, idx) => {
                                        const fieldDef = findFieldDef(item.key);
                                        const patchField = (patch) => {
                                            const next = normalizeFormFields(p.fields);
                                            next[idx] = { ...next[idx], ...patch };
                                            onUpdateProps({ fields: next });
                                        };
                                        return (
                                            <li key={item.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                                                <span style={{ fontWeight: 500, fontSize: "13px", flex: 1 }}>{fieldDef?.label || item.key}</span>
                                                <span style={{ fontSize: "11px", color: "#6b7280", background: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>{fieldDef?.category || ''}</span>
                                                <select
                                                    value={item.required ? "wajib" : "opsional"}
                                                    onChange={(e) => patchField({ required: e.target.value === "wajib" })}
                                                    style={{ fontSize: "11px", padding: "2px 4px" }}
                                                    aria-label={`Status pengisian ${fieldDef?.label || item.key}`}
                                                >
                                                    <option value="wajib">Wajib</option>
                                                    <option value="opsional">Opsional</option>
                                                </select>
                                                <button
                                                    className="icon-btn danger small"
                                                    onClick={() => onUpdateProps({ fields: normalizeFormFields(p.fields).filter((_, i) => i !== idx) })}
                                                >×</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </PropField>

                    <PropField label="Tambah Field dari Katalog">
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "300px", overflow: "auto" }}>
                            {FIELD_CATALOG.map((cat) => (
                                <details key={cat.category} style={{ border: "1px solid #e5e7eb", borderRadius: "6px" }}>
                                    <summary style={{ padding: "0.5rem", fontWeight: 600, cursor: "pointer", background: "#f9fafb" }}>{cat.category}</summary>
                                    <div style={{ padding: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                                        {cat.fields.map((field) => (
                                            <button
                                                key={field.key}
                                                type="button"
                                                onClick={() => onUpdateProps({ fields: [...normalizeFormFields(p.fields), { key: field.key, required: true }] })}
                                                disabled={hasFieldKey(p.fields, field.key)}
                                                style={{
                                                    padding: "0.375rem 0.75rem",
                                                    fontSize: "12px",
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: "4px",
                                                    background: hasFieldKey(p.fields, field.key) ? "#eef2ff" : "white",
                                                    color: hasFieldKey(p.fields, field.key) ? "#4f46e5" : "#374151",
                                                    cursor: hasFieldKey(p.fields, field.key) ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                {field.label}
                                            </button>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </PropField>

                    <PropField label="Kuota Peserta (0 = unlimited)">
                        <input type="number" min={0} value={p.quota || 0} onChange={(e) => onUpdateProps({ quota: Number(e.target.value) })} />
                    </PropField>

                    <PropField label="Label Tombol Daftar">
                        <input type="text" value={p.submitLabel} onChange={(e) => onUpdateProps({ submitLabel: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Tombol Daftar">
                        <input type="color" value={p.submitColor} onChange={(e) => onUpdateProps({ submitColor: e.target.value })} />
                    </PropField>

                    <PropField label="Label Tombol Bayar">
                        <input type="text" value={p.payButtonLabel} onChange={(e) => onUpdateProps({ payButtonLabel: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Tombol Bayar">
                        <input type="color" value={p.payButtonColor} onChange={(e) => onUpdateProps({ payButtonColor: e.target.value })} />
                    </PropField>

                    <PropField label="Redirect ke Halaman (setelah submit)">
                        <select value={p.redirectPageId || ""} onChange={(e) => onUpdateProps({ redirectPageId: e.target.value || null })}>
                            <option value="">— Pilih halaman —</option>
                            {pages?.map((pg) => (
                                <option key={pg.id} value={pg.id}>{pg.name}</option>
                            ))}
                        </select>
                    </PropField>
                </>
            );

        case "participant-list":
            return (
                <>
                    <PropField label="Judul">
                        <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
                    </PropField>
                    <PropField label="Kolom yang Ditampilkan">
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {PARTICIPANT_COLUMNS.map((col) => {
                                const active = (p.columns || PARTICIPANT_COLUMNS.map((c) => c.key)).includes(col.key);
                                return (
                                    <label key={col.key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                                        <input
                                            type="checkbox"
                                            checked={active}
                                            onChange={(e) => {
                                                const current = p.columns || PARTICIPANT_COLUMNS.map((c) => c.key);
                                                const next = e.target.checked
                                                    ? PARTICIPANT_COLUMNS.map((c) => c.key).filter((k) => current.includes(k) || k === col.key)
                                                    : current.filter((k) => k !== col.key);
                                                onUpdateProps({ columns: next.length ? next : [col.key] });
                                            }}
                                        />
                                        {col.label}
                                    </label>
                                );
                            })}
                        </div>
                    </PropField>
                    <p className="prop-hint" style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px" }}>
                        Isi tabel diambil otomatis dari pendaftar event ini — tidak bisa diedit manual.
                    </p>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={p.showSearch}
                                onChange={(e) => onUpdateProps({ showSearch: e.target.checked })}
                            />
                            Tampilkan pencarian
                        </label>
                    </div>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={p.showStatusFilter}
                                onChange={(e) => onUpdateProps({ showStatusFilter: e.target.checked })}
                            />
                            Tampilkan filter status
                        </label>
                    </div>
                </>
            );

        case "date-time":
            return (
                <>
                    <PropField label="Label">
                        <input type="text" value={p.label} onChange={(e) => onUpdateProps({ label: e.target.value })} />
                    </PropField>
                    <PropField label="Tanggal">
                        <input type="date" value={p.date} onChange={(e) => onUpdateProps({ date: e.target.value })} />
                    </PropField>
                    <PropField label="Tanggal Selesai (opsional)">
                        <input type="date" value={p.endDate ?? ""} onChange={(e) => onUpdateProps({ endDate: e.target.value })} />
                    </PropField>
                    <PropField label="Waktu">
                        <input type="time" value={p.time} onChange={(e) => onUpdateProps({ time: e.target.value })} />
                    </PropField>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input type="checkbox" checked={p.showDate} onChange={(e) => onUpdateProps({ showDate: e.target.checked })} />
                            Tampilkan tanggal
                        </label>
                    </div>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input type="checkbox" checked={p.showTime} onChange={(e) => onUpdateProps({ showTime: e.target.checked })} />
                            Tampilkan waktu
                        </label>
                    </div>
                    <PropField label="Format Tanggal">
                        <select value={p.dateFormat} onChange={(e) => onUpdateProps({ dateFormat: e.target.value })}>
                            <option value="DD MMMM YYYY">1 Januari 2025</option>
                            <option value="DD/MM/YYYY">01/01/2025</option>
                            <option value="YYYY-MM-DD">2025-01-01</option>
                        </select>
                    </PropField>
                    <PropField label="Format Waktu">
                        <select value={p.timeFormat} onChange={(e) => onUpdateProps({ timeFormat: e.target.value })}>
                            <option value="HH:mm">19:30</option>
                            <option value="HH:mm:ss">19:30:00</option>
                            <option value="h:mm A">7:30 PM</option>
                        </select>
                    </PropField>
                    <PropField label="Warna">
                        <input type="color" value={p.color} onChange={(e) => onUpdateProps({ color: e.target.value })} />
                    </PropField>
                    <PropField label="Ukuran Font">
                        <input type="number" min={12} max={48} value={p.fontSize} onChange={(e) => onUpdateProps({ fontSize: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Ketebalan">
                        <select value={p.fontWeight} onChange={(e) => onUpdateProps({ fontWeight: e.target.value })}>
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                            <option value="700">Bold</option>
                        </select>
                    </PropField>
                </>
            );

        case "location-map":
            return (
                <>
                    <PropField label="Judul">
                        <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
                    </PropField>
                    <PropField label="Alamat">
                        <textarea rows={2} value={p.address} onChange={(e) => onUpdateProps({ address: e.target.value })} />
                    </PropField>
                    <PropField label="Link Google Maps">
                        <input
                            type="url"
                            value={p.mapsUrl ?? ""}
                            onChange={(e) => onUpdateProps({ mapsUrl: e.target.value })}
                            placeholder="https://maps.app.goo.gl/..."
                        />
                    </PropField>
                    <PropField label="Mode Tampilan">
                        <select
                            value={locationDisplayMode(p)}
                            onChange={(e) => {
                                const mode = e.target.value;
                                // showMap/showAddress ikut diturunkan supaya renderer
                                // lama dan data lama tetap konsisten.
                                onUpdateProps({
                                    displayMode: mode,
                                    showMap: mode !== "text",
                                    showAddress: mode !== "map",
                                });
                            }}
                        >
                            <option value="map">Map saja</option>
                            <option value="both">Map + teks lokasi</option>
                            <option value="text">Teks lokasi saja</option>
                        </select>
                    </PropField>
                    <PropField label="Penyedia Peta">
                        <select value={p.mapProvider || 'google'} onChange={(e) => onUpdateProps({ mapProvider: e.target.value })}>
                            <option value="google">Google Maps</option>
                            <option value="openstreetmap">OpenStreetMap</option>
                        </select>
                    </PropField>
                    <PropField label="Zoom Level">
                        <input type="number" min={1} max={20} value={p.zoom || 15} onChange={(e) => onUpdateProps({ zoom: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Tinggi Peta (px)">
                        <input type="number" min={200} max={600} value={p.height || 300} onChange={(e) => onUpdateProps({ height: Number(e.target.value) })} />
                    </PropField>
                </>
            );

        case "participant-counter":
            return (
                <>
                    <PropField label="Label">
                        <input type="text" value={p.label} onChange={(e) => onUpdateProps({ label: e.target.value })} />
                    </PropField>
                    <PropField label="Template Teks">
                        <input
                            type="text"
                            value={p.template ?? ""}
                            onChange={(e) => onUpdateProps({ template: e.target.value })}
                            placeholder="{jumlah} peserta terdaftar"
                        />
                    </PropField>
                    <p className="prop-hint" style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px" }}>
                        Angka diambil otomatis dari jumlah pendaftar event ini — tidak bisa diisi manual.
                        Gunakan <code>{"{jumlah}"}</code> sebagai penanda posisi angka.
                    </p>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input type="checkbox" checked={p.showIcon} onChange={(e) => onUpdateProps({ showIcon: e.target.checked })} />
                            Tampilkan ikon
                        </label>
                    </div>
                    <PropField label="Warna">
                        <input type="color" value={p.color} onChange={(e) => onUpdateProps({ color: e.target.value })} />
                    </PropField>
                    <PropField label="Ukuran Font Angka">
                        <input type="number" min={18} max={64} value={p.fontSize} onChange={(e) => onUpdateProps({ fontSize: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Ketebalan">
                        <select value={p.fontWeight} onChange={(e) => onUpdateProps({ fontWeight: e.target.value })}>
                            <option value="600">Semi Bold</option>
                            <option value="700">Bold</option>
                            <option value="800">Extra Bold</option>
                        </select>
                    </PropField>
                </>
            );

        case "gallery":
            return (
                <>
                    <PropField label="Mode">
                        <select
                            value={p.mode || "gallery"}
                            onChange={(e) => {
                                const mode = e.target.value;
                                // Banner cuma satu gambar, jadi sisanya dipangkas.
                                onUpdateProps(
                                    mode === "banner"
                                        ? { mode, layout: "full-width", images: (p.images || []).slice(0, 1) }
                                        : { mode, layout: p.layout === "full-width" ? "grid" : p.layout }
                                );
                            }}
                        >
                            <option value="gallery">Galeri (banyak gambar)</option>
                            <option value="banner">Banner (satu gambar)</option>
                        </select>
                    </PropField>
                    <PropField label="Judul">
                        <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
                    </PropField>
                    {(p.mode || "gallery") === "gallery" && (
                        <PropField label="Tata Letak">
                            <select value={p.layout} onChange={(e) => onUpdateProps({ layout: e.target.value })}>
                                <option value="grid">Grid</option>
                                <option value="slider">Slider/Carousel</option>
                            </select>
                        </PropField>
                    )}
                    <div className="prop-group checkbox-group">
                        <label>
                            <input type="checkbox" checked={p.showTitle} onChange={(e) => onUpdateProps({ showTitle: e.target.checked })} />
                            Tampilkan judul
                        </label>
                    </div>
                    <PropField label="Jumlah Kolom (Grid)">
                        <input type="number" min={1} max={6} value={p.columns || 3} onChange={(e) => onUpdateProps({ columns: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Gap (px)">
                        <input type="number" min={0} max={50} value={p.gap || 12} onChange={(e) => onUpdateProps({ gap: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Aspect Ratio">
                        <select value={p.aspectRatio || '4/3'} onChange={(e) => onUpdateProps({ aspectRatio: e.target.value })}>
                            <option value="1/1">1:1 (Persegi)</option>
                            <option value="4/3">4:3</option>
                            <option value="16/9">16:9</option>
                            <option value="3/2">3:2</option>
                        </select>
                    </PropField>
                    <PropField label="Gambar-gambar">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflow: 'auto' }}>
                            {(p.images || []).length === 0 ? (
                                <div style={{ padding: '1rem', color: '#9ca3af', textAlign: 'center' }}>Belum ada gambar</div>
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {p.images.map((img, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                                            <img src={img.url || img} alt={img.alt || `Gambar ${idx + 1}`} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                                            <span style={{ flex: 1, fontSize: 13 }}>{img.alt || img.url || `Gambar ${idx + 1}`}</span>
                                            <button className="icon-btn danger small" onClick={() => onUpdateProps({ images: p.images.filter((_, i) => i !== idx) })}>×</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button className="btn-add-row" onClick={() => {
                                const fileInput = document.createElement('input');
                                fileInput.type = 'file';
                                fileInput.accept = 'image/*';
                                fileInput.multiple = true;
                                fileInput.onchange = (e) => {
                                    const files = Array.from(e.target.files);
                                    const newImages = files.map(f => {
                                        const url = URL.createObjectURL(f);
                                        return { url, alt: f.name };
                                    });
                                    onUpdateProps({ images: [...(p.images || []), ...newImages] });
                                };
                                fileInput.click();
                            }}>
                                + Tambah Gambar
                            </button>
                        </div>
                    </PropField>
                </>
            );

        case "event-sidebar":
            return (
                <>
                    <PropField label="Judul Sidebar">
                        <input type="text" value={p.title} onChange={(e) => onUpdateProps({ title: e.target.value })} />
                    </PropField>
                    <PropField label="Posisi">
                        <select value={p.position || "left"} onChange={(e) => onUpdateProps({ position: e.target.value })}>
                            <option value="left">Kiri</option>
                            <option value="right">Kanan</option>
                        </select>
                    </PropField>
                    <PropField label="Warna Latar">
                        <input type="color" value={p.bgColor} onChange={(e) => onUpdateProps({ bgColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input type="color" value={p.textColor} onChange={(e) => onUpdateProps({ textColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Aktif">
                        <input type="color" value={p.activeColor} onChange={(e) => onUpdateProps({ activeColor: e.target.value })} />
                    </PropField>
                    <PropField label="Menu Items">
                        <div>
                            {(p.items || []).map((item, idx) => (
                                <div key={idx} className="schedule-edit-row" style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                                    <input type="text" placeholder="Label" value={item.label} onChange={(e) => {
                                        const items = [...p.items];
                                        items[idx] = { ...items[idx], label: e.target.value };
                                        onUpdateProps({ items });
                                    }} style={{ flex: 1 }} />
                                    <TargetPicker
                                        value={item}
                                        elements={elements}
                                        pages={pages}
                                        onChange={(patch) => {
                                            const items = [...p.items];
                                            items[idx] = { ...items[idx], ...patch };
                                            onUpdateProps({ items });
                                        }}
                                    />
                                    <button className="icon-btn danger small" onClick={() => onUpdateProps({ items: p.items.filter((_, i) => i !== idx) })}>×</button>
                                </div>
                            ))}
                            <button className="btn-add-row" onClick={() => onUpdateProps({ items: [...(p.items || []), { label: '', targetType: 'section', targetId: '', href: '' }] })}>
                                + Tambah Item
                            </button>
                        </div>
                    </PropField>
                </>
            );

        case "register-button": {
            // Hanya elemen Form yang masuk akal jadi tujuan tombol ini.
            const formElements = elements.filter((el) => el.type === "form");
            return (
                <>
                    <PropField label="Label Tombol">
                        <input type="text" value={p.label} onChange={(e) => onUpdateProps({ label: e.target.value })} />
                    </PropField>
                    <PropField label="Form Tujuan">
                        <select
                            value={p.targetFormId || ""}
                            onChange={(e) => onUpdateProps({ targetFormId: e.target.value })}
                        >
                            <option value="">Form pertama di halaman ini</option>
                            {formElements.map((el, i) => (
                                <option key={el.id} value={el.id}>
                                    {describeElementTarget(el, i)}
                                </option>
                            ))}
                        </select>
                    </PropField>
                    {formElements.length === 0 && (
                        <p className="prop-hint" style={{ fontSize: 12, color: "#b45309", margin: "0 0 8px" }}>
                            Belum ada Form Pendaftaran di halaman ini. Tambahkan dulu supaya tombol punya tujuan.
                        </p>
                    )}
                    <PropField label="Warna Latar">
                        <input type="color" value={p.bgColor} onChange={(e) => onUpdateProps({ bgColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input type="color" value={p.textColor} onChange={(e) => onUpdateProps({ textColor: e.target.value })} />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input type="number" min={0} max={20} value={p.radius} onChange={(e) => onUpdateProps({ radius: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Ukuran Font">
                        <input type="number" min={10} max={24} value={p.fontSize} onChange={(e) => onUpdateProps({ fontSize: Number(e.target.value) })} />
                    </PropField>
                </>
            );
        }

        case "pay-button":
            return (
                <>
                    <PropField label="Label Tombol">
                        <input type="text" value={p.label} onChange={(e) => onUpdateProps({ label: e.target.value })} />
                    </PropField>
                    <PropField label="Nominal Harga">
                        <input
                            type="number"
                            min={0}
                            step={1000}
                            value={p.amount ?? 0}
                            onChange={(e) => onUpdateProps({ amount: Number(e.target.value) })}
                        />
                    </PropField>
                    <PropField label="Mata Uang">
                        <input
                            type="text"
                            value={p.currency ?? "Rp"}
                            onChange={(e) => onUpdateProps({ currency: e.target.value })}
                        />
                    </PropField>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={p.showAmount !== false}
                                onChange={(e) => onUpdateProps({ showAmount: e.target.checked })}
                            />
                            Tampilkan nominal di halaman publik
                        </label>
                    </div>
                    <PropField label="Instruksi di Atas Tombol">
                        <textarea
                            rows={2}
                            value={p.instruction || ""}
                            onChange={(e) => onUpdateProps({ instruction: e.target.value })}
                            placeholder="Mis. nomor rekening & nominal transfer"
                        />
                    </PropField>
                    <PropField label="Teks Saat Menunggu Konfirmasi">
                        <input type="text" value={p.pendingLabel} onChange={(e) => onUpdateProps({ pendingLabel: e.target.value })} />
                    </PropField>
                    <PropField label="Teks Saat Sudah Diterima">
                        <input type="text" value={p.confirmedLabel} onChange={(e) => onUpdateProps({ confirmedLabel: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Latar">
                        <input type="color" value={p.bgColor} onChange={(e) => onUpdateProps({ bgColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input type="color" value={p.textColor} onChange={(e) => onUpdateProps({ textColor: e.target.value })} />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input type="number" min={0} max={20} value={p.radius} onChange={(e) => onUpdateProps({ radius: Number(e.target.value) })} />
                    </PropField>
                </>
            );

        case "link-button":
            return (
                <>
                    <PropField label="Label Tombol">
                        <input type="text" value={p.label} onChange={(e) => onUpdateProps({ label: e.target.value })} />
                    </PropField>
                    <PropField label="URL Tujuan">
                        <input type="url" value={p.href} onChange={(e) => onUpdateProps({ href: e.target.value })} placeholder="https://example.com" />
                    </PropField>
                    <PropField label="Warna Latar">
                        <input type="color" value={p.bgColor} onChange={(e) => onUpdateProps({ bgColor: e.target.value })} />
                    </PropField>
                    <PropField label="Warna Teks">
                        <input type="color" value={p.textColor} onChange={(e) => onUpdateProps({ textColor: e.target.value })} />
                    </PropField>
                    <PropField label="Radius Sudut">
                        <input type="number" min={0} max={20} value={p.radius} onChange={(e) => onUpdateProps({ radius: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Ukuran Font">
                        <input type="number" min={10} max={24} value={p.fontSize} onChange={(e) => onUpdateProps({ fontSize: Number(e.target.value) })} />
                    </PropField>
                    <PropField label="Ketebalan">
                        <select value={p.fontWeight} onChange={(e) => onUpdateProps({ fontWeight: e.target.value })}>
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                            <option value="700">Bold</option>
                        </select>
                    </PropField>
                    <div className="prop-group checkbox-group">
                        <label>
                            <input type="checkbox" checked={p.openInNewTab} onChange={(e) => onUpdateProps({ openInNewTab: e.target.checked })} />
                            Buka di tab baru
                        </label>
                    </div>
                </>
            );

        default:
            return null;
        }
    })();

    if (!body) return null;
    return (
        <>
            {widthPresetControl}
            {body}
            {universalLinkSection}
        </>
    );
}

// ===================== HELPER =====================
export function getEventMeta(type) {
    return EVENT_COMPONENTS.find((c) => c.type === type);
}
