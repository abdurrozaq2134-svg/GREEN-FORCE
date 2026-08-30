<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class EventPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'elements',
        'pages',
        'is_published',
        'quota',
        'redirect_page_id',
        'mode',
    ];

    protected $casts = [
        'elements' => 'array',
        'pages' => 'array',
        'is_published' => 'boolean',
        'quota' => 'integer',
        'mode' => 'string',
    ];

    // Normalisasi daftar halaman: fallback ke satu halaman dari `elements`
    // untuk event lama yang belum punya `pages`.
    public function pagesList(): array
    {
        if (! empty($this->pages) && is_array($this->pages)) {
            return $this->pages;
        }

        return [
            [
                'id' => 'page_1',
                'name' => 'Halaman 1',
                'elements' => $this->elements ?? [],
            ],
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // EO pemilik event
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function formFields()
    {
        return $this->hasMany(FormField::class)->orderBy('sort_order');
    }

    public function formSubmissions()
    {
        return $this->hasMany(FormSubmission::class)->latest();
    }

    public function redirectPage()
    {
        return $this->belongsTo(EventPage::class, 'redirect_page_id');
    }

    public function isQuotaFull(): bool
    {
        if (! $this->quota) {
            return false;
        }

        return $this->formSubmissions()->count() >= $this->quota;
    }

    public function remainingQuota(): int
    {
        if (! $this->quota) {
            return PHP_INT_MAX;
        }

        return max(0, $this->quota - $this->formSubmissions()->count());
    }

    /**
     * Nama yang tidak boleh jadi slug event karena bertabrakan dengan
     * subdomain sistem (mis. api.racikevent.com, www.racikevent.com) atau
     * kata yang membingungkan di URL publik.
     *
     * @var list<string>
     */
    private const RESERVED_SLUGS = [
        'www', 'api', 'app', 'admin', 'mail', 'ftp', 'cdn', 'assets',
        'static', 'dashboard', 'login', 'register', 'auth', 'builder',
        'staging', 'test', 'dev', 'demo', 'support', 'help', 'blog',
        'docs', 'status', 'ns1', 'ns2', 'smtp', 'imap', 'pop',
    ];

    /**
     * Batas label DNS (RFC 1035): 63 karakter. Disisakan ruang untuk suffix
     * "-123" yang ditambahkan generateUniqueSlug() kalau ada tabrakan.
     */
    private const MAX_SLUG_LENGTH = 63 - 5;

    /**
     * Generate slug unik dari title, aman dipakai sebagai label subdomain
     * (mis. <slug>.racikevent.com) maupun path (/e/<slug>).
     */
    public static function generateUniqueSlug(string $title): string
    {
        $base = Str::slug($title);
        $base = mb_substr($base, 0, self::MAX_SLUG_LENGTH);
        $base = trim($base, '-');

        // Judul yang seluruhnya simbol/non-latin (mis. cuma emoji) bisa
        // menghasilkan slug kosong dari Str::slug().
        if ($base === '') {
            $base = 'event';
        }

        if (in_array($base, self::RESERVED_SLUGS, true)) {
            $base .= '-event';
        }

        $slug = $base;
        $i = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i;
            $i++;
        }

        return $slug;
    }

    /**
     * URL path (selalu tersedia) dan URL subdomain (hanya kalau
     * EVENT_SUBDOMAIN_HOST diisi) untuk halaman publik event ini.
     *
     * @return array{path: string, subdomain: string|null}
     */
    public function publicUrls(): array
    {
        $path = route('builder.public', $this->slug);

        $host = config('events.subdomain_host');
        $subdomain = null;
        if ($host) {
            $app = parse_url(config('app.url'));
            $scheme = ($app['scheme'] ?? 'http') === 'https' ? 'https' : 'http';

            // Port APP_URL (mis. :8000 di lokal) harus ikut disertakan —
            // Laravel mencocokkan Route::domain() dengan host TANPA port
            // (Symfony Request::getHost() memangkasnya secara internal),
            // jadi ini aman untuk routing. Tapi link yang dibuka pengguna
            // butuh port eksplisit, kalau tidak browser mengarah ke :80
            // yang tidak ada apa-apa di server dev lokal.
            $port = $app['port'] ?? null;
            $isDefaultPort = $port === null || ($scheme === 'https' && $port === 443) || ($scheme === 'http' && $port === 80);
            $portSuffix = $isDefaultPort ? '' : ":{$port}";

            $subdomain = "{$scheme}://{$this->slug}.{$host}{$portSuffix}";
        }

        return ['path' => $path, 'subdomain' => $subdomain];
    }
}
