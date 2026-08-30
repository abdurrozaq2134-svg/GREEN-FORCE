<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Periksa Email Anda</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Figtree:400,500,600,700,800&display=swap" rel="stylesheet" />

    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
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
        }

*   {
    box-sizing: border-box;
    }

        body {
            font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--bg);
            background-image: linear-gradient(135deg, #f8fcb6 0.000%, #69e56d 50.000%, #00a930 100.000%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }

        .card {
            position: relative;
            width: 100%;
            max-width: 420px;
            background: var(--card);
            border-radius: 28px;
            padding: 40px 32px;
            text-align: center;
            box-shadow: 0 30px 60px -20px rgba(47, 59, 33, 0.35);
            overflow: hidden;
        }

        .leaf-deco {
            position: absolute;
            z-index: 0;
            pointer-events: none;
        }
        .leaf-deco svg { display: block; }

        .leaf-top-left      { top: 0; left: 0; width: 150px; height: 150px; }
        .leaf-bottom-left   { bottom: 0; left: 0; width: 150px; height: 150px; }
        .leaf-bottom-right  { bottom: 0; right: 0; width: 150px; height: 150px; }

        .card h1 {
            font-size: 30px;
            font-weight: 800;
            color: var(--leaf);
            letter-spacing: -0.5px;
            margin: 0 0 10px;
        }

        .card p {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.5;
            margin: 0 0 20px;
        }

        .email-box {
            background: var(--field-bg);
            border: 1px solid var(--leaf-pale);
            border-radius: 999px;
            padding: 14px 20px;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 20px;
            box-shadow: 0 1px 2px rgba(47, 59, 33, 0.06);
            word-break: break-all;
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

        .btn-resend {
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

        .btn-resend:hover {
            transform: translateY(-1px);
            box-shadow: 0 14px 24px -8px rgba(74, 107, 31, 0.65);
        }

        .back-link {
            display: inline-block;
            margin-top: 18px;
            font-size: 13px;
            color: var(--leaf);
            font-weight: 700;
            text-decoration: none;
        }

        .back-link:hover {
            color: var(--leaf-dark);
            text-decoration: underline;
        }

    </style>
</head>
<body>
    <div class="card">
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

        <h1>Periksa Email Anda</h1>
        <p>Kami telah mengirim tautan reset password ke email di bawah ini.</p>

        <div class="email-box">{{ $email }}</div>

        @if (session('status'))
            <div class="status-alert">{{ session('status') }}</div>
        @endif

        <form method="POST" action="{{ route('password.email') }}">
            @csrf
            <input type="hidden" name="email" value="{{ $email }}">
            <button type="submit" class="btn-resend">Kirim Ulang</button>
        </form>

        <p>
        Kembali ke halaman <a href="{{ route('login') }}" class="back-link">login</a>
        </p>
    </div>
</body>
</html>
