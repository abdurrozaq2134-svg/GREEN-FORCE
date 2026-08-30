<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk ke Akun</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Figtree:400,500,600,700,800&display=swap" rel="stylesheet" />

    <style>
        :root {
            --leaf-dark: #4a6b1f;
            --leaf: #6f9a35;
            --leaf-light: #8ab34e;
            --leaf-pale: #a9c97a;
            --bg: #f3f4ef;
            --card: #f3f4ef;
            --text-primary: #2f3b21;
            --text-secondary: #7c8a6a;
            --field-bg: #ffffff;
            --error: #d9534f;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--bg);
            min-height: 100vh;
            background-image: linear-gradient(135deg, #f8fcb6 0.000%, #69e56d 50.000%, #00a930 100.000%);
        }

        .login-page {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .login-container {
            position: relative;
            width: 100%;
            max-width: 420px;
            min-height: 100vh;
            background: var(--card);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 520px) {
            .login-container {
                min-height: 720px;
                margin: 24px 0;
                border-radius: 28px;
                box-shadow: 0 30px 60px -20px rgba(47, 59, 33, 0.35);
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: none; }
        }

        /* ---------- Decorative leaf clusters ---------- */
        .leaf-deco {
            position: absolute;
            z-index: 0;
            pointer-events: none;
        }
        .leaf-deco svg { display: block; }

        .leaf-top-left      { top: 0; left: 0; width: 150px; height: 150px; }
        .leaf-bottom-left   { bottom: 0; left: 0; width: 150px; height: 150px; }
        .leaf-bottom-right  { bottom: 0; right: 0; width: 150px; height: 150px; }

        /* ---------- Brand / powered-by ---------- */
        .brand-row {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 3;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .brand-row .brand-logo-img {
            height: 42px;
            width: auto;
            display: block;
        }

        /* ---------- Sprout mark (sejajar dengan judul) ---------- */
        .sprout-mark {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            padding: 0;
        }
        .sprout-mark svg {
            width: 96px;
            height: auto;
        }

        /* ---------- Title row (judul + tanaman sejajar) ---------- */
        .title-row {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 12px;
            margin-top: 56px;
            margin-bottom: 24px;
            padding-left: 4px;
        }

        .title-row h1 {
            font-size: 34px;
            font-weight: 800;
            color: var(--leaf);
            letter-spacing: -0.5px;
            text-align: left;
            margin: 0;
        }

        /* ---------- Content ---------- */
        .content-section {
            position: relative;
            z-index: 2;
            padding: 8px 32px 32px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .content-section .subtitle {
            font-size: 14px;
            color: var(--text-secondary);
            text-align: center;
            margin-bottom: 28px;
        }

        .status-alert {
            background: #eef6e2;
            color: var(--leaf-dark);
            padding: 10px 14px;
            border-radius: 14px;
            margin-bottom: 18px;
            border: 1px solid var(--leaf-pale);
            font-size: 13px;
        }

        .field {
            margin-bottom: 16px;
        }

        .field-wrap {
            position: relative;
            display: flex;
            align-items: center;
        }

        .field-wrap .field-icon {
            position: absolute;
            left: 20px;
            width: 18px;
            height: 18px;
            color: var(--leaf);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        }

        .field input {
            width: 100%;
            padding: 15px 20px 15px 50px;
            border: none;
            border-radius: 999px;
            background: var(--field-bg);
            font-size: 14px;
            font-family: inherit;
            color: var(--text-primary);
            box-shadow: 0 1px 2px rgba(47, 59, 33, 0.06);
            transition: box-shadow 0.15s ease;
        }

        .field input::placeholder {
            color: #c3cabc;
            letter-spacing: 0.5px;
        }

        .field input:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(111, 154, 53, 0.25);
        }

        .field small.error-text {
            color: var(--error);
            font-size: 12px;
            margin: 6px 0 0 20px;
            display: block;
        }

        .remember-forgot-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 4px 4px 10px;
            font-size: 13px;
        }

        .remember-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
        }

        .remember-row input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: var(--leaf);
            border-radius: 4px;
        }

        .forgot-link {
            font-size: 13px;
            color: var(--leaf);
            font-weight: 600;
            text-decoration: none;
            white-space: nowrap;
        }

        .forgot-link:hover {
            color: var(--leaf-dark);
            text-decoration: underline;
        }

        .login-actions {
            margin-top: 18px;
        }

        .btn-primary {
            width: 100%;
            padding: 16px 16px;
            background: linear-gradient(180deg, var(--leaf) 0%, var(--leaf-dark) 100%);
            color: #fff;
            border: none;
            border-radius: 999px;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.3px;
            cursor: pointer;
            box-shadow: 0 10px 20px -8px rgba(74, 107, 31, 0.55);
            transition: all 0.15s ease;
        }

        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 14px 24px -8px rgba(74, 107, 31, 0.65);
        }

        .btn-primary:focus-visible {
            outline: 2px solid var(--leaf-dark);
            outline-offset: 2px;
        }

        .divider-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 22px 0 18px;
        }
        .divider-row .line {
            flex: 1;
            height: 1px;
            background: var(--leaf-pale);
        }
        .divider-row span {
            font-size: 12px;
            color: var(--text-secondary);
            white-space: nowrap;
        }

        .btn-google {
            width: 100%;
            padding: 14px 16px;
            background: #fff;
            border: none;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(47, 59, 33, 0.08);
            transition: all 0.15s ease;
        }

        .btn-google:hover {
            box-shadow: 0 4px 10px rgba(47, 59, 33, 0.12);
        }

        .btn-google:focus-visible {
            outline: 2px solid var(--leaf);
            outline-offset: 2px;
        }

        .footer-link {
            position: relative;
            z-index: 2;
            text-align: center;
            padding-top: 22px;
            padding-bottom: 34px;
            font-size: 13px;
            color: var(--text-primary);
        }

        .footer-link a {
            color: var(--leaf);
            text-decoration: none;
            font-weight: 700;
        }

        .footer-link a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<!-- Forest theme: highlight moss di sudut cahaya, meredup ke hijau tua gelap -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a7c3f" />
            <stop offset="30%" stop-color="#2f6d33" />
            <stop offset="60%" stop-color="#1b4d24" />
            <stop offset="100%" stop-color="#0d2b14" />
        </linearGradient>
    </defs>
</svg>

<div class="login-page">
    <div class="login-container">

        <!-- Decorative leaf clusters -->
        <div class="leaf-deco leaf-top-left">
            <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0 L140 0 C140 40 110 50 100 70 C90 90 60 80 50 100 C40 120 20 110 0 140 Z" fill="url(#grassGradient)"/>
                <path d="M0 0 L90 0 C90 26 71 32 64 45 C58 58 39 51 32 64 C26 77 13 71 0 90 Z" fill="url(#grassGradient)"/>
            </svg>
        </div>

        <div class="leaf-deco leaf-bottom-left">
            <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 140 L140 140 C140 100 110 90 100 70 C90 50 60 60 50 40 C40 20 20 30 0 0 Z" fill="url(#grassGradient)"/>
            </svg>
        </div>

        <div class="leaf-deco leaf-bottom-right">
            <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M140 140 L0 140 C0 100 30 90 40 70 C50 50 80 60 90 40 C100 20 120 30 140 0 Z" fill="url(#grassGradient)"/>
            </svg>
        </div>

        <!-- Powered by (logo) -->
        <div class="brand-row">
            <img src="{{ asset('images/logo.png') }}" alt="Logo" class="brand-logo-img">
        </div>

        <div class="content-section">

            <div class="title-row">
                <h1>Login</h1>

                <!-- Sprout / plant mark -->
                <div class="sprout-mark">
                    <svg viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 46C36 46 18 42 14 24C14 24 34 20 36 46Z" fill="url(#grassGradient)"/>
                        <path d="M36 46C36 46 54 42 58 24C58 24 38 20 36 46Z" fill="url(#grassGradient)"/>
                        <path d="M36 46C36 46 30 24 36 6C42 24 36 46 36 46Z" fill="url(#grassGradient)"/>
                        <path d="M18 60C18 48 26 44 36 44C46 44 54 48 54 60V80H18V60Z" fill="#ffffff"/>
                        <path d="M18 60C18 51 26 62 36 62C46 62 54 51 54 60V64H18V60Z" fill="#4a6b1f"/>
                    </svg>
                </div>
            </div>

            @if (session('status'))
                <div class="status-alert">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <!-- Email Address -->
                <div class="field">
                    <div class="field-wrap">
                        <span class="field-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 6l8 7 8-7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                        </span>
                        <input id="email" type="email" name="email" placeholder="Email"
                               value="{{ old('email') }}" required autofocus autocomplete="username">
                    </div>
                    @error('email')
                        <small class="error-text">{{ $message }}</small>
                    @enderror
                </div>

                <!-- Password -->
                <div class="field">
                    <div class="field-wrap">
                        <span class="field-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" stroke-width="2"/></svg>
                        </span>
                        <input id="password" type="password" name="password" placeholder="Password"
                        required autocomplete="current-password">
                    </div>
                    @error('password')
                        <small class="error-text">{{ $message }}</small>
                    @enderror
                </div>

                <div class="remember-forgot-row">
                    <div class="remember-row">
                        <input id="remember_me" type="checkbox" name="remember">
                        <label for="remember_me">Ingat saya</label>
                    </div>

                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" class="forgot-link">Lupa password?</a>
                    @endif
                </div>

                <div class="login-actions">
                    <button type="submit" class="btn-primary">Masuk</button>
                </div>
            </form>

            <div class="divider-row">
                <div class="line"></div>
                <span>atau masuk dengan</span>
                <div class="line"></div>
            </div>

            <x-google-login-button label="Masuk dengan Google" />
            <p class="footer-link">
                Belum punya akun? <a href="{{ route('register') }}">Daftar</a>
            </p>
        </div>
    </div>
</div>

<script>
    // Form validation enhancement
    document.addEventListener('DOMContentLoaded', function() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const emailInput = form.querySelector('input[type="email"]');
                const passwordInput = form.querySelector('input[type="password"]');

                let valid = true;

                if (emailInput) {
                    if (!emailInput.value.includes('@')) {
                        emailInput.style.boxShadow = '0 0 0 3px rgba(217, 83, 79, 0.25)';
                        valid = false;
                    }
                }

                if (passwordInput) {
                    if (passwordInput.value.length < 6) {
                        passwordInput.style.boxShadow = '0 0 0 3px rgba(217, 83, 79, 0.25)';
                        valid = false;
                    }
                }

                if (!valid) {
                    e.preventDefault();
                }
            });
        });

        // Input box-shadow reset on focus
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.boxShadow = '0 0 0 3px rgba(111, 154, 53, 0.25)';
            });
            input.addEventListener('blur', function() {
                this.style.boxShadow = '';
            });
        });
    });
</script>

</body>
</html>
