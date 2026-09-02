# Creastar — Event Page Builder

Creastar adalah aplikasi web yang memudahkan seseorang mengubah desain menjadi halaman web acara (event) siap pakai, tanpa perlu menulis kode. Pengguna (desainer/panitia acara) membuat tampilan halaman event lewat builder drag-and-drop, lalu mempublikasikannya dengan satu klik menjadi halaman publik yang bisa diakses dan didaftari oleh peserta acara.

## Fitur Utama

- **Builder halaman event** — menyusun tata letak halaman event secara visual (drag & drop) tanpa koding, bisa terdiri dari beberapa halaman sekaligus (mis. halaman peserta dan halaman admin/daftar peserta).
- **Publikasi instan** — halaman event yang sudah dibuat bisa dipublikasikan/dibatalkan publikasinya dengan satu klik, dan langsung tersedia di URL publik `/e/{slug}` (atau subdomain khusus per event, jika diaktifkan).
- **Manajemen peserta & kuota** — pengunjung mendaftar lewat formulir yang field-nya bisa disesuaikan (teks, angka, tanggal, pilihan, file, dll.); panitia melihat daftar peserta beserta sisa kuota pendaftaran.
- **Klaim & konfirmasi pembayaran** — peserta bisa menandai "sudah bayar", lalu panitia mengonfirmasi/menolaknya lewat panel Daftar Peserta.
- **Login fleksibel** — daftar/masuk dengan email (verifikasi kode OTP) atau dengan akun Google.
- **Panel admin per event** — halaman admin (`/e/{slug}/admin`) dan log aktivitas untuk memantau perubahan pada event yang dibuat.
- **Tampilan responsif** — otomatis menyesuaikan di HP, tablet, maupun komputer.

## Teknologi yang Dipakai

- **Backend:** Laravel 13 (PHP 8.3+), PostgreSQL sebagai database.
- **Frontend:** React 19 + Vite, Tailwind CSS, dikemas lewat Laravel Vite Plugin.
- **Autentikasi:** Laravel Breeze + Laravel Socialite (login Google).

## Prasyarat (harus terpasang di komputer juri sebelum menjalankan aplikasi)

1. **PHP 8.3 atau lebih baru** — https://www.php.net/downloads.php
2. **Composer** — https://getcomposer.org/download/
3. **Node.js (versi LTS terbaru)** beserta npm — https://nodejs.org/
4. **PostgreSQL** (server database) — https://www.postgresql.org/download/

## Kenapa Ada File yang Tidak Ikut di GitHub (`.gitignore`)

Repo ini punya file `.gitignore` yang sengaja mengecualikan sejumlah file/folder dari upload ke GitHub. Ini bukan bagian yang hilang atau rusak — ini adalah praktik standar, karena isinya berupa kredensial rahasia, folder dependency yang berat, atau file sementara yang selalu bisa dibuat ulang. Supaya juri tidak bingung saat men-download repo ini, berikut penjelasannya:

| File / folder yang di-ignore | Kenapa dikecualikan | Yang perlu dilakukan |
|---|---|---|
| `.env`, `.env.backup`, `.env.production` | Berisi kredensial rahasia: password database, key enkripsi, API key | Salin dari `.env.example` menjadi `.env`, lalu isi sendiri (lihat langkah instalasi di bawah) |
| `/vendor` | Folder hasil `composer install` (semua library PHP) — berat & bisa digenerate ulang | Jalankan `composer install` |
| `/node_modules` | Folder hasil `npm install` (semua library JS/React) — berat & bisa digenerate ulang | Jalankan `npm install` |
| `/public/build`, `/public/hot`, `/public/fonts-manifest.dev.json` | Hasil build aset frontend (JS/CSS) oleh Vite | Jalankan `npm run build`, atau pakai `npm run dev` / `composer run dev` untuk mode development |
| `/public/storage` | Symlink ke folder `storage/app/public`, tempat file yang diunggah pengguna disimpan | Jalankan `php artisan storage:link` — dibutuhkan kalau formulir event punya field bertipe upload file |
| `*.log`, `.phpunit.result.cache`, `/.phpunit.cache`, `/storage/pail` | Log dan cache sementara dari menjalankan/menguji aplikasi | Dibuat otomatis saat aplikasi jalan, tidak perlu disiapkan manual |
| `/storage/*.key` | File kunci internal untuk driver cache/session tertentu | Dibuat otomatis, tidak perlu disiapkan manual |
| `/.idea`, `/.vscode`, `/.nova`, `/.zed`, `/.cursor/`, `/.codex`, `.phpactor.json` | Pengaturan editor/IDE pribadi tiap developer | Tidak berpengaruh ke jalannya aplikasi, boleh diabaikan |
| `_ide_helper.php` | File bantuan autocomplete IDE, hasil generate otomatis | Opsional, tidak wajib |
| `Homestead.json`, `Homestead.yaml`, `Thumbs.db`, `.DS_Store` | Sisa file environment lokal (Windows/Mac/Homestead) yang tidak portable | Boleh diabaikan |
| `/auth.json` | Kredensial akses Composer ke package privat berbayar | Tidak dipakai di proyek ini — semua package yang dipakai bersifat publik |

## Cara Instalasi & Menjalankan

Buka terminal, arahkan ke folder proyek ini, lalu ikuti salah satu opsi berikut.

### Opsi A — Cara tercepat (direkomendasikan untuk menguji aplikasi)

1. Buat database PostgreSQL kosong bernama `event_builder` (atau nama lain, asal disesuaikan di langkah berikut).
2. Salin `.env.example` menjadi `.env`:
   ```
   copy .env.example .env
   ```
   (di Linux/Mac: `cp .env.example .env`)
3. Buka file `.env`, sesuaikan bagian database dengan kredensial PostgreSQL di komputer juri:
   ```
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=event_builder
   DB_USERNAME=<username_postgres_anda>
   DB_PASSWORD=<password_postgres_anda>
   ```
4. Jalankan setup otomatis (install dependency PHP & JS, generate key, migrasi database, build asset frontend):
   ```
   composer run setup
   ```
5. (Opsional, tapi disarankan) Buat symlink storage supaya file yang diunggah peserta bisa diakses lewat browser:
   ```
   php artisan storage:link
   ```
6. Jalankan servernya:
   ```
   php artisan serve
   ```
7. Buka **http://127.0.0.1:8000** di browser.

### Opsi B — Mode development (dengan hot-reload, kalau ingin melihat kode frontend berubah langsung)

```
copy .env.example .env
composer install
npm install
php artisan key:generate
php artisan migrate
php artisan storage:link
composer run dev
```

`composer run dev` menjalankan server Laravel, queue worker, dan Vite sekaligus. Buka **http://127.0.0.1:8000**.

## Panduan Mencoba Aplikasi (untuk Juri)

1. **Daftar akun** di halaman `/register` menggunakan email, atau langsung **Login with Google** (fitur Google hanya aktif kalau `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` di `.env` sudah diisi — kalau tidak diisi, gunakan cara daftar email).
2. Jika mendaftar dengan email, aplikasi akan mengirim **kode OTP**. Karena `.env.example` men-setel `MAIL_MAILER=log` (email tidak benar-benar terkirim, hanya dicatat), kode OTP bisa dilihat di file log:
   ```
   storage/logs/laravel.log
   ```
   Buka file itu setelah klik "kirim OTP", lalu cari kode terbaru di dalamnya.
3. Setelah login, klik **"Buat event baru"** di dashboard.
4. Desain halaman event menggunakan builder yang tersedia (bisa tambah lebih dari satu halaman, termasuk halaman formulir pendaftaran), lalu klik **Publish**.
5. Buka URL publik event tersebut (`/e/{slug-event}`) untuk melihat hasilnya sebagai pengunjung, coba isi formulir pendaftaran, dan coba fitur klaim pembayaran (kalau formulirnya dirancang berbayar).
6. Kembali ke dashboard/panel admin event (`/e/{slug-event}/admin`) untuk melihat daftar peserta, sisa kuota, mengonfirmasi status pembayaran, dan log aktivitas event.

## Catatan Tambahan

- Fitur subdomain per event (`<slug>.namadomain`) bersifat opsional dan nonaktif secara default (variabel `EVENT_SUBDOMAIN_HOST` di `.env` dikosongkan) — tidak perlu diaktifkan untuk mencoba aplikasi ini secara lokal.
- Kalau ada perubahan tampilan yang tidak muncul, jalankan `npm run build` (Opsi A) atau pastikan `composer run dev` masih berjalan (Opsi B).
- Kalau file yang diunggah lewat formulir event tidak bisa dibuka dari browser (404), pastikan `php artisan storage:link` sudah dijalankan.
