<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lupa Password</title>

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
            max-width: 650px;
            min-height: 320px;
            background: var(--card);
            overflow: hidden;
            display: flex;
            flex-direction: row;
            animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 400px) {
            .login-container {
                min-height: 420px;
                margin: 24px auto;
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
        .brand-logo-img {
            height: 64px;
            width: auto;
            display: block;
        }


        /* ---------- Content ---------- */
        .content-section {
            position: relative;
            z-index: 2;
            padding:  32px 48px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .content-section h1 {
            font-size: 34px;
            font-weight: 800;
            color: var(--leaf);
            margin-bottom: 6px;
            letter-spacing: -0.5px;
            text-align: center;
        }

        .content-section .subtitle {
            font-size: 14px;
            color: var(--text-secondary);
            text-align: center;
            margin-bottom: 28px;
        }

        .content-section .otp-info {
            font-size: 13px;
            color: var(--text-secondary);
            text-align: center;
            margin-bottom: 18px;
            line-height: 1.5;
        }

        .content-section .otp-info strong {
            color: var(--text-primary);
        }

        .email-hint {
            font-size: 12px;
            color: var(--text-secondary);
            margin: -10px 0 20px 20px;
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

        .field input.otp-input {
            text-align: center;
            font-size: 22px;
            letter-spacing: 10px;
            font-weight: 600;
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

        .btn-primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
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

        <!-- Brand / powered-by -->
        <div class="brand-row">
            <img src="data:image/png;base64,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" alt="Logo" class="brand-logo-img">
        </div>

        <!-- Sprout mark di atas kotak email -->
        <div class="sprout-mark">
            <svg viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36 46C36 46 18 42 14 24C14 24 34 20 36 46Z" fill="url(#grassGradient)"/>
                <path d="M36 46C36 46 54 42 58 24C58 24 38 20 36 46Z" fill="url(#grassGradient)"/>
                <path d="M36 46C36 46 30 24 36 6C42 24 36 46 36 46Z" fill="url(#grassGradient)"/>
                <path d="M18 60C18 48 26 44 36 44C46 44 54 48 54 60V80H18V60Z" fill="#ffffff"/>
                <path d="M18 60C18 51 26 62 36 62C46 62 54 51 54 60V64H18V60Z" fill="#4a6b1f"/>
            </svg>
        </div>

        <div class="content-section">
            <h1>Forgot Password</h1>
            <p class="subtitle">Masukkan email Anda, kami akan kirim link untuk reset password</p>

            <!-- Session Status -->
            <x-auth-session-status class="mb-4" :status="session('status')" />

            <form method="POST" action="{{ route('password.email') }}">
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
                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>

                <p class="email-hint">Format email: Example@gmail.com</p>

                <div class="login-actions">
                    <button type="submit" class="btn-primary">Email Password Reset Link</button>
                </div>
                <p class="footer-link">
                kembali ke halaman <a href="{{ route('login') }}">Login</a>
                </p>
            </form>
        </div>
    </div>

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
</div>
</body>
