<?php

namespace App\Support;

/**
 * Cerminan sisi-server dari FIELD_CATALOG di
 * resources/js/components/Builder/EventElements.jsx.
 *
 * Builder hanya menyimpan daftar { key, required } di JSON elemen. Definisi
 * lengkapnya (tipe data, format, pilihan enum) sengaja tidak diambil dari
 * kiriman browser — aturan validasi tidak boleh ditentukan oleh klien.
 */
class FormFieldCatalog
{
    /** @var array<string, array{label: string, data_type: string, is_long_text: bool, format: string|null, options: array<int, string>|null}> */
    private const FIELDS = [
        'nama_lengkap' => ['label' => 'Nama Lengkap', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'nama_panggilan' => ['label' => 'Nama Panggilan', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'email' => ['label' => 'Email', 'data_type' => 'string', 'is_long_text' => false, 'format' => 'email', 'options' => null],
        'telepon' => ['label' => 'Nomor Telepon', 'data_type' => 'string', 'is_long_text' => false, 'format' => 'phone', 'options' => null],
        'whatsapp' => ['label' => 'Nomor WhatsApp', 'data_type' => 'string', 'is_long_text' => false, 'format' => 'phone', 'options' => null],
        'tanggal_lahir' => ['label' => 'Tanggal Lahir', 'data_type' => 'date', 'is_long_text' => false, 'format' => null, 'options' => null],
        'jenis_kelamin' => ['label' => 'Jenis Kelamin', 'data_type' => 'enum', 'is_long_text' => false, 'format' => null, 'options' => ['Laki-laki', 'Perempuan', 'Lainnya']],
        'foto_profil' => ['label' => 'Foto Profil', 'data_type' => 'file', 'is_long_text' => false, 'format' => null, 'options' => null],
        'nik' => ['label' => 'NIK', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'nip' => ['label' => 'NIP/NIM', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'institusi' => ['label' => 'Institusi/Perusahaan', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'jabatan' => ['label' => 'Jabatan', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'jurusan' => ['label' => 'Jurusan/Prodi', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'angkatan' => ['label' => 'Angkatan', 'data_type' => 'integer', 'is_long_text' => false, 'format' => null, 'options' => null],
        'no_anggota' => ['label' => 'Nomor Anggota', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'alamat_lengkap' => ['label' => 'Alamat Lengkap', 'data_type' => 'string', 'is_long_text' => true, 'format' => null, 'options' => null],
        'provinsi' => ['label' => 'Provinsi', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'kota' => ['label' => 'Kota/Kabupaten', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'kecamatan' => ['label' => 'Kecamatan', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'kelurahan' => ['label' => 'Kelurahan/Desa', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'kode_pos' => ['label' => 'Kode Pos', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'negara' => ['label' => 'Negara', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'tipe_tiket' => ['label' => 'Tipe Tiket', 'data_type' => 'enum', 'is_long_text' => false, 'format' => null, 'options' => ['Reguler', 'VIP', 'Early Bird', 'Student', 'Gratis']],
        'kode_undangan' => ['label' => 'Kode Undangan', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'kuota_tiket' => ['label' => 'Jumlah Tiket', 'data_type' => 'integer', 'is_long_text' => false, 'format' => null, 'options' => null],
        'tanggal_registrasi' => ['label' => 'Tanggal Registrasi', 'data_type' => 'datetime', 'is_long_text' => false, 'format' => null, 'options' => null],
        'sumber_registrasi' => ['label' => 'Sumber Registrasi', 'data_type' => 'enum', 'is_long_text' => false, 'format' => null, 'options' => ['Website', 'Offline', 'Referral', 'Sosial Media']],
        'metode_bayar' => ['label' => 'Metode Pembayaran', 'data_type' => 'enum', 'is_long_text' => false, 'format' => null, 'options' => ['Transfer Bank', 'Virtual Account', 'E-Wallet', 'Kartu Kredit', 'Cash', 'Lainnya']],
        'bank_pengirim' => ['label' => 'Bank Pengirim', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'nama_rekening' => ['label' => 'Nama Rekening', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'nomor_rekening' => ['label' => 'Nomor Rekening', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
        'jumlah_bayar' => ['label' => 'Jumlah Bayar', 'data_type' => 'float', 'is_long_text' => false, 'format' => null, 'options' => null],
        'bukti_bayar' => ['label' => 'Bukti Pembayaran', 'data_type' => 'file', 'is_long_text' => false, 'format' => null, 'options' => null],
        'tanggal_bayar' => ['label' => 'Tanggal Bayar', 'data_type' => 'datetime', 'is_long_text' => false, 'format' => null, 'options' => null],
        'kebutuhan_khusus' => ['label' => 'Kebutuhan Khusus', 'data_type' => 'string', 'is_long_text' => true, 'format' => null, 'options' => null],
        'preferensi_makanan' => ['label' => 'Preferensi Makanan', 'data_type' => 'enum', 'is_long_text' => false, 'format' => null, 'options' => ['Reguler', 'Vegetarian', 'Vegan', 'Halal', 'No Seafood', 'Lainnya']],
        'ukuran_kaos' => ['label' => 'Ukuran Kaos', 'data_type' => 'enum', 'is_long_text' => false, 'format' => null, 'options' => ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']],
        'pesan_khusus' => ['label' => 'Pesan Khusus', 'data_type' => 'string', 'is_long_text' => true, 'format' => null, 'options' => null],
        'cara_tahu_event' => ['label' => 'Cara Mengetahui Event', 'data_type' => 'enum', 'is_long_text' => false, 'format' => null, 'options' => ['Teman', 'Instagram', 'LinkedIn', 'Website', 'Email', 'Lainnya']],
        'setuju_syarat' => ['label' => 'Setuju Syarat & Ketentuan', 'data_type' => 'boolean', 'is_long_text' => false, 'format' => null, 'options' => null],
        'setuju_privasi' => ['label' => 'Setuju Kebijakan Privasi', 'data_type' => 'boolean', 'is_long_text' => false, 'format' => null, 'options' => null],
        'setuju_foto' => ['label' => 'Setuju Foto/Video Diambil', 'data_type' => 'boolean', 'is_long_text' => false, 'format' => null, 'options' => null],
        'setuju_promo' => ['label' => 'Setuju Menerima Info Promo', 'data_type' => 'boolean', 'is_long_text' => false, 'format' => null, 'options' => null],
        'tanda_tangan_digital' => ['label' => 'Tanda Tangan Digital', 'data_type' => 'string', 'is_long_text' => false, 'format' => null, 'options' => null],
    ];

    /**
     * @return array{label: string, data_type: string, is_long_text: bool, format: string|null, options: array<int, string>|null}|null
     */
    public static function find(string $key): ?array
    {
        return self::FIELDS[$key] ?? null;
    }

    public static function has(string $key): bool
    {
        return isset(self::FIELDS[$key]);
    }

    /** @return array<int, string> */
    public static function keys(): array
    {
        return array_keys(self::FIELDS);
    }
}
