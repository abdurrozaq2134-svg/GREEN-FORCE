<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Green Force — Lets Create Our Design Into Websites</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

    <style>
        /* =========================================================
           ROOT
        ========================================================= */

        :root {
            /* Sama persis dengan --bg-gradient di resources/css/komando.css */
            --bg-gradient: radial-gradient(ellipse 80% 50% at 0% 0%, #3F4A34 0%, #0A0E0A 100%);
            --bg-deep: #0a0f08;
            --bg-mid: #141e0f;
            --bg-surface: #0e160a;

            --green-bright: #8fd42e;
            --green-mid: #6ab01f;
            --green-dark: #3d6b12;

            --cream: #f5f6ef;
            --cream-dim: #c8cbb8;

            --border-green: rgba(143, 212, 46, 0.22);
        }


        /* =========================================================
           RESET
        ========================================================= */

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }


        html {
            width: 100%;
            min-height: 100%;

            scroll-behavior: smooth;

            /*
             * Membuat tiap section terasa seperti
             * halaman berbeda tetapi tetap satu halaman.
             */
            scroll-snap-type: y mandatory;

            scroll-padding-top: 72px;
        }


        body {
            width: 100%;
            min-height: 100%;

            font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

            background: var(--bg-gradient);
            background-attachment: fixed;
            color: var(--cream);

            overflow-x: hidden;
            overflow-y: auto;
        }


        a {
            text-decoration: none;
        }


        button {
            font-family: inherit;
        }


        /* =========================================================
           GLOBAL SECTION
        ========================================================= */

        .snap-section {
            width: 100%;
            min-height: 100vh;

            position: relative;

            display: flex;
            align-items: center;
            justify-content: center;

            scroll-snap-align: start;
            scroll-snap-stop: always;
        }


        /* =========================================================
           NAVBAR
        ========================================================= */

        .navbar {
            position: fixed;

            top: 0;
            left: 0;

            width: 100%;

            z-index: 9999;

            background: rgba(10, 15, 8, 0.88);

            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);

            border-bottom: 1px solid var(--border-green);

            box-shadow:
                0 8px 30px rgba(0, 0, 0, 0.18);

            /* Efek transisi untuk animasi muncul/hilang */
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        }

        /* Class untuk menyembunyikan navbar di atas layar */
        .navbar--hidden {
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
        }


        .navbar__inner {
            width: 100%;
            max-width: 1200px;

            height: 72px;

            margin: 0 auto;

            padding: 0 28px;

            display: flex;
            align-items: center;
            justify-content: space-between;
        }


        /* Navbar logo */

        .navbar__brand {
            display: flex;
            flex-direction: column;

            line-height: 0.9;

            font-size: 20px;
            font-weight: 900;

            color: var(--cream);
        }


        .navbar__brand span:first-child {
            color: var(--green-bright);
        }


        .navbar__brand span:last-child {
            color: var(--cream);
        }


        /* Navbar menu */

        .navbar__menu {
            display: flex;
            align-items: center;

            gap: 38px;
        }


        .navbar__link {
            position: relative;

            color: var(--cream-dim);

            font-size: 14px;
            font-weight: 600;

            transition:
                color 0.25s ease;
        }


        .navbar__link:hover {
            color: var(--green-bright);
        }


        .navbar__link::after {
            content: "";

            position: absolute;

            left: 0;
            bottom: -8px;

            width: 0;
            height: 2px;

            background: var(--green-bright);

            border-radius: 99px;

            transition:
                width 0.25s ease;
        }


        .navbar__link:hover::after {
            width: 100%;
        }


        /* Mobile button */

        .navbar__toggle {
            display: none;

            width: 42px;
            height: 42px;

            align-items: center;
            justify-content: center;
            flex-direction: column;

            gap: 5px;

            border: 1px solid var(--border-green);

            border-radius: 10px;

            background: rgba(143, 212, 46, 0.06);

            cursor: pointer;
        }


        .navbar__toggle span {
            display: block;

            width: 21px;
            height: 2px;

            border-radius: 99px;

            background: var(--green-bright);
        }


        /* Mobile dropdown */

        .navbar__mobile {
            display: none;

            flex-direction: column;

            padding: 10px 20px 18px;

            border-top: 1px solid rgba(143, 212, 46, 0.12);

            background: rgba(10, 15, 8, 0.98);
        }


        .navbar__mobile.open {
            display: flex;
        }


        .navbar__mobile a {
            padding: 13px 10px;

            color: var(--cream-dim);

            border-bottom: 1px solid rgba(143, 212, 46, 0.08);
        }


        .navbar__mobile a:hover {
            color: var(--green-bright);
        }


        /* =========================================================
           HERO / BERANDA
        ========================================================= */

        .hero {
            position: relative;

            width: 100%;
            height: 100vh;

            min-height: 100vh;
            max-height: 100vh;

            overflow: hidden;

            scroll-snap-align: start;
            scroll-snap-stop: always;
        }


        .hero {
            position: relative;

            width: 100%;
            height: 100vh;

            min-height: 100vh;
            max-height: 100vh;

            overflow: hidden;

            scroll-snap-align: start;
            scroll-snap-stop: always;
        }


        .hero::before {
            content: "";

            position: absolute;

            inset: 0;

            z-index: 0;

            background:
                linear-gradient(165deg,
                    var(--bg-mid) 0%,
                    var(--bg-surface) 45%,
                    var(--bg-deep) 100%);

            pointer-events: none;
        }


        .hero__inner {
            position: relative;

            z-index: 2;

            display: grid;

            grid-template-columns: 1fr 1fr;

            grid-template-rows: auto 1fr auto;

            height: 100%;

            padding:
                clamp(16px, 2.5vh, 28px) clamp(24px, 4vw, 56px);

            gap:
                clamp(12px, 1.5vh, 24px);

            align-content: start;
        }


        /* =========================================================
           HERO LOGO
        ========================================================= */

        .site-header {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
        }


        .brand-logo {
            display: block;

            width:
                clamp(120px, 15vw, 200px);
            /* Ukuran logo diperbesar */

            height: auto;

            max-width: 100%;

            object-fit: contain;

            filter:
                drop-shadow(0 4px 16px rgba(0, 0, 0, 0.4));
        }


        /* =========================================================
           HERO CONTENT
        ========================================================= */

        .hero__content {
            grid-column: 1;
            grid-row: 2;

            align-self: center;
            justify-self: center;
            /* Diubah ke center agar tulisan lebih nengah */

            max-width:
                clamp(350px, 52vw, 720px);
            /* Diperbesar lebarnya agar lebih dekat dengan maskot */

            text-align: center;
        }


        .hero__title {
            font-weight: 900;
            /* Tebal font ditingkatkan */

            font-size:
                clamp(35px, 5.2vw, 64px);
            /* Ukuran font diperbesar */

            line-height: 1.1;

            letter-spacing: -0.015em;

            /* Menggunakan background gradient dan opacity yang diminta */
            background: linear-gradient(90deg,
                    rgba(132, 204, 22, 0.12) 0%,
                    /* stop 1: #84CC16 @ 12% opacity, posisi 0% */
                    rgba(163, 198, 57, 0.57) 89%
                    /* stop 2: #A3C639 @ 57% opacity, posisi 89% */
                );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            opacity: 100%;

            text-transform: uppercase;

            margin: 0;

            text-align: center;

            /* Bayangan teks ditingkatkan untuk kejelasan teks gradien */
            text-shadow:
                0 4px 30px rgba(163, 198, 57, 0.35);
        }


        .hero__title-line {
            display: block;

            margin-top:
                clamp(2px, 0.4vh, 6px);
        }


        .hero__actions {
            margin-top:
                clamp(14px, 2vh, 24px);

            text-align: center;
        }


        /* =========================================================
           BUTTON PRIMARY
        ========================================================= */

        .btn-primary {
            display: inline-flex;

            align-items: center;
            justify-content: center;

            gap:
                clamp(5px, 0.7vw, 10px);

            border: none;

            cursor: pointer;

            text-decoration: none;

            font-family: inherit;

            font-weight: 600;

            font-size:
                clamp(12px, 1.3vw, 16px);

            color: var(--bg-deep);

            padding:
                clamp(9px, 1.2vh, 12px) clamp(22px, 3.2vw, 36px);

            border-radius: 999px;

            background:
                linear-gradient(100deg,
                    var(--green-bright) 0%,
                    var(--green-mid) 50%,
                    var(--green-dark) 100%);

            box-shadow:
                0 4px 20px -4px rgba(106, 176, 31, 0.45),

                inset 0 1px 0 rgba(255, 255, 255, 0.2);

            transition:
                transform 0.18s ease,
                box-shadow 0.18s ease,
                filter 0.18s ease;
        }


        .btn-primary:hover {
            transform: scale(1.05);

            box-shadow:
                0 8px 32px -6px rgba(143, 212, 46, 0.55),

                0 0 16px 4px rgba(143, 212, 46, 0.35),

                inset 0 1px 0 rgba(255, 255, 255, 0.25);

            filter: brightness(1.05);
        }


        .btn-primary:focus-visible {
            outline:
                3px solid var(--green-bright);

            outline-offset: 4px;
        }


        .btn-primary:active {
            transform:
                translateY(0) scale(0.98);
        }


        /* =========================================================
           HERO DECORATION
        ========================================================= */

        .decor-leaf {
            position: absolute;

            z-index: 0;

            pointer-events: none;

            filter:
                drop-shadow(0 12px 32px rgba(0, 0, 0, 0.45));

            opacity: 0.75;

            transform-origin: center center;
        }


        .decor-top {
            top:
                clamp(0vw, 0vh, 20px);

            left:
                clamp(-1vw, -4vh, -20px);

            width:
                clamp(140px, 13vw, 150px);

            height: auto;

        }


        .decor-bottom {
            bottom:
                clamp(0vw, -4vh, -20px);

            left:
                clamp(0vw, -4vh, -20px);

            width:
                clamp(140px, 11vw, 150px);

            height: auto;
        }


        /* =========================================================
           MASCOT
        ========================================================= */

        /* Wadah untuk menata posisi maskot di tengah layar (opsional) */
        .mascot-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f4f8;
        }

        /* Elemen Maskot (Kelas Umum) */
        .mascot {
            width: 200px;
            /* Atur ukuran lebar maskot sesuai kebutuhan */
            height: auto;
            /* Memanggil animasi bernama 'float', durasi 3 detik, transisi halus, berulang selamanya */
            animation: float 3s ease-in-out infinite;
        }

        @keyframes mascot-enter {

            0% {
                opacity: 0;

                transform:
                    translateX(120px) scale(0.8);
            }

            100% {
                opacity: 1;

                transform:
                    translateX(0) scale(1);
            }
        }


        .hero__mascot {
            position: absolute;

            bottom:
                clamp(-8vw, -6vh, -24px);

            right:
                clamp(2vw, 2vh, 12px);

            width:
                clamp(700px, 42vw, 800px);

            max-height: 150vh;

            height: auto;

            z-index: 3;

            filter:
                drop-shadow(0 36px 60px rgba(0, 0, 0, 0.7));

            /* Menggunakan animasi float yang baru */
            animation: float 3s ease-in-out infinite;
        }


        /* Aturan gerakan animasi floating */
        @keyframes float {
            0% {
                transform: translateY(0px);
            }

            50% {
                transform: translateY(-20px);
                /* Maskot bergerak naik ke atas sejauh 20 piksel */
            }

            100% {
                transform: translateY(0px);
                /* Maskot kembali ke posisi semula */
            }
        }


        /* =========================================================
           FITUR
        ========================================================= */

        #fitur {
            background: linear-gradient(180deg,
                    rgba(63, 74, 52, 0.67) 0%,
                    rgba(10, 14, 10, 1) 100%);

            padding:
                110px 30px 70px;
        }


        .section-content {
            width: 100%;
            max-width: 1100px;

            margin: 0 auto;

            text-align: center;
        }

        .section-logo {
            width: 80px;
            margin-bottom: 20px;
        }


        .section-badge {
            display: inline-flex;

            align-items: center;

            padding:
                8px 16px;

            margin-bottom: 18px;

            border-radius: 999px;

            background:
                rgba(143, 212, 46, 0.10);

            border:
                1px solid rgba(143, 212, 46, 0.16);

            color: var(--green-bright);

            font-size: 13px;
            font-weight: 600;
        }




        .section-title {
            color: var(--cream);

            font-size:
                clamp(30px, 5vw, 48px);

            line-height: 1.1;

            font-weight: 800;
        }


        .section-description {
            max-width: 650px;

            margin:
                16px auto 42px;

            color: var(--cream-dim);

            font-size: 15px;

            line-height: 1.75;
        }


        .feature-grid {
            display: grid;

            grid-template-columns:
                repeat(3, minmax(0, 1fr));

            gap: 22px;
        }


        .feature-card {
            padding: 30px 24px;

            border-radius: 22px;

            background: #0a0f08;
            /* Hijau gelap */

            border:
                1px solid rgba(143, 212, 46, 0.18);

            box-shadow:
                0 15px 40px rgba(0, 0, 0, 0.15);

            transition:
                transform 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease;
        }


        .feature-card:hover {
            transform: translateY(-8px);

            border-color:
                rgba(143, 212, 46, 0.48);

            box-shadow:
                0 20px 45px rgba(0, 0, 0, 0.24);
        }


        .feature-icon {
            width: 66px;
            height: 66px;

            margin:
                0 auto 18px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 18px;

            background:
                rgba(143, 212, 46, 0.09);

            border:
                1px solid rgba(143, 212, 46, 0.13);

            font-size: 29px;
        }


        .feature-card h3 {
            margin-bottom: 10px;

            color: #d6f3a8;

            font-size: 19px;
            font-weight: 700;
        }


        .feature-card p {
            color: #a9b49a;

            font-size: 14px;

            line-height: 1.7;
        }


        /* =========================================================
           KONTAK
        ========================================================= */

        #kontak {
            background: linear-gradient(180deg,
                    rgba(63, 74, 52, 0.67) 0%,
                    rgba(10, 14, 10, 1) 100%);

            padding:
                110px 30px 90px;
        }


        .contact-content {
            max-width: 850px;
        }


        .contact-buttons {
            margin-top: 25px;

            display: flex;

            align-items: center;
            justify-content: center;

            gap: 14px;

            flex-wrap: wrap;
        }


        .btn-secondary {
            display: inline-flex;

            align-items: center;
            justify-content: center;

            padding:
                12px 24px;

            border-radius: 999px;

            border:
                1px solid rgba(143, 212, 46, 0.32);

            color: var(--cream);

            font-size: 14px;
            font-weight: 600;

            transition:
                background 0.25s ease,
                transform 0.25s ease,
                border-color 0.25s ease;
        }


        .btn-secondary:hover {
            background:
                rgba(143, 212, 46, 0.08);

            border-color:
                rgba(143, 212, 46, 0.55);

            transform:
                translateY(-2px);
        }


        .contact-info {
            display: flex;

            align-items: center;
            justify-content: center;

            gap: 60px;

            margin-top: 45px;

            flex-wrap: wrap;
        }


        .contact-box {
            min-width: 180px;
        }


        .contact-box strong {
            display: block;

            margin-bottom: 6px;

            color: var(--green-bright);

            font-size: 14px;
        }


        .contact-box span {
            color: var(--cream-dim);

            font-size: 14px;
        }


        .footer {
            position: relative;
            z-index: 1;

            width: 100%;

            padding:
                18px 20px;

            text-align: center;

            color: #78856f;

            font-size: 12px;
        }


        /* =========================================================
           ANIMATION
        ========================================================= */
        @keyframes slide-in-up {
            0% {
                transform: translateY(100px);
                opacity: 0;
            }

            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .slide-in-up {
            animation: slide-in-up 0.8s ease-out both;
        }

        .slide-in-left {
            -webkit-animation:
                slide-in-left 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

            animation:
                slide-in-left 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }


        @-webkit-keyframes slide-in-left {

            0% {
                -webkit-transform:
                    translateX(-1000px);

                transform:
                    translateX(-1000px);

                opacity: 0;
            }

            100% {
                -webkit-transform:
                    translateX(0);

                transform:
                    translateX(0);

                opacity: 1;
            }
        }


        @keyframes slide-in-left {

            0% {
                transform:
                    translateX(-1000px);

                opacity: 0;
            }

            100% {
                transform:
                    translateX(0);

                opacity: 1;
            }
        }


        /* =========================================================
           TABLET
        ========================================================= */

        @media (max-width: 1024px) and (min-width: 769px) {

            .hero__mascot {
                width:
                    clamp(260px, 44vw, 460px);

                max-height: 70vh;
            }

            .hero__content {
                max-width: 48vw;
            }

            .feature-grid {
                gap: 18px;
            }
        }


        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 768px) {

            html {
                scroll-snap-type: y mandatory;

                scroll-padding-top: 64px;
            }


            /* Navbar */

            .navbar__inner {
                height: 64px;

                padding:
                    0 18px;
            }


            .navbar__menu {
                display: none;
            }


            .navbar__toggle {
                display: flex;
            }


            /* Hero */

            .hero {
                height: 100dvh;
                min-height: 100dvh;
                max-height: 100dvh;
            }


            .hero__inner {
                grid-template-columns: 1fr;

                grid-template-rows:
                    auto auto 1fr;

                align-content: start;

                text-align: center;

                padding:
                    16px 14px 28px;
            }


            .site-header {
                grid-column: 1;
                grid-row: 1;

                justify-self: end;

                padding-top: 65px;
            }


            .hero__content {
                grid-column: 1;
                grid-row: 2;

                justify-self: center;

                max-width: 88vw;

                text-align: center;

                margin-top:
                    clamp(20px, 5vh, 40px);
            }


            .hero__title {
                font-size:
                    clamp(24px, 6vw, 42px);

                text-align: center;
            }


            .hero__mascot {
                position: absolute;

                bottom:
                    clamp(-6vw, -3vh, -12px);

                right:
                    clamp(2vw, 2vh, 12px);

                width:
                    clamp(230px, 56vw, 380px);

                max-height: 52vh;
            }


            /* Sections */

            .snap-section {
                min-height: 100dvh;
            }


            #fitur,
            #kontak {
                padding:
                    100px 20px 65px;
            }


            .feature-grid {
                grid-template-columns: 1fr;

                gap: 16px;
            }


            .feature-card {
                padding:
                    24px 20px;
            }


            .section-description {
                margin-bottom: 32px;
            }


            .contact-info {
                flex-direction: column;

                gap: 24px;
            }


            .footer {
                font-size: 10px;
            }
        }


        /* =========================================================
           SMALL MOBILE
        ========================================================= */

        @media (max-width: 420px) {

            .navbar__brand {
                font-size: 17px;
            }


            .hero__title {
                font-size:
                    clamp(22px, 7vw, 34px);

                line-height: 1.12;
            }


            .btn-primary {
                font-size:
                    clamp(12px, 3.5vw, 14px);

                padding:
                    9px 20px;
            }


            .brand-logo {
                width:
                    clamp(60px, 14vw, 90px);
            }


            .hero__mascot {
                width:
                    clamp(200px, 66vw, 310px);

                max-height: 46vh;
            }
        }


        /* =========================================================
           LANDSCAPE MOBILE
        ========================================================= */

        @media (max-height: 500px) and (orientation: landscape) {

            .hero {
                height: 100vh;
            }


            .hero__inner {
                grid-template-columns: 1fr 1fr;

                grid-template-rows:
                    auto 1fr;

                align-content: start;

                padding:
                    10px 14px 18px;
            }


            .site-header {
                grid-column: 2;

                grid-row: 1;

                padding-top: 60px;
            }


            .hero__content {
                grid-column: 1;

                grid-row: 1 / span 2;

                align-self: center;

                justify-self: start;

                max-width: 48vw;
            }


            .hero__mascot {
                max-height: 60vh;
            }


            .hero__title {
                font-size:
                    clamp(20px, 4vw, 34px);
            }
        }


        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {

            html {
                scroll-behavior: auto;

                scroll-snap-type: none;
            }


            *,
            *::before,
            *::after {
                animation: none !important;

                transition: none !important;
            }
        }


        @keyframes slide-in-up {
            0% {
                transform: translateY(100px);
                opacity: 0;
            }

            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .feature-card-item {
            opacity: 0;
            transform: translateY(100px);
        }

        .feature-card-item.visible {
            animation: slide-in-up 0.8s ease-out forwards;
        }

        @keyframes fade-in {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        .fade-in-text {
            animation: fade-in 2s ease-in-out forwards;
        }

        .fade-in-item {
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }

        .fade-in-item.visible {
            opacity: 1;
        }
    </style>
</head>


<body>

    <!-- =========================================================
         NAVBAR
    ========================================================== -->

    <nav class="navbar navbar--hidden">

        <div class="navbar__inner">

            <a href="#beranda" class="navbar__brand">
                <span>Creastar</span>
                <span>Project</span>
            </a>


            <div class="navbar__menu">

                <!-- Beranda hanya mengarah ke hero yang sudah ada -->
                <a href="#beranda" class="navbar__link">
                    Beranda
                </a>

                <a href="#fitur" class="navbar__link">
                    Fitur
                </a>

                <a href="#kontak" class="navbar__link">
                    Kontak
                </a>

            </div>


            <button type="button" class="navbar__toggle" id="navbarToggle" aria-label="Buka menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>

        </div>


        <!-- Mobile menu -->

        <div class="navbar__mobile" id="navbarMobile">

            <a href="#beranda">
                Beranda
            </a>

            <a href="#fitur">
                Fitur
            </a>

            <a href="#kontak">
                Kontak
            </a>

        </div>

    </nav>


    <!-- =========================================================
         BERANDA / HERO
         INI ADALAH BERANDA YANG SUDAH ADA
    ========================================================== -->

    <section class="hero" id="beranda" aria-labelledby="hero-title">

        <div class="hero__inner">


            <!-- Leaf decoration top-left -->

            <img class="decor-leaf decor-top" src="{{ asset('images/daun.png') }}" alt="" loading="eager">


            <!-- Leaf decoration bottom-left -->

            <img class="decor-leaf decor-bottom" src="{{ asset('images/daun 2.png') }}" alt="" loading="eager">


            <!-- Logo top-right -->

            <header class="site-header" style="position: absolute; top: 20px; right: 20px; z-index: 10;" role="banner">

                <img src="{{ asset('images/logo.png') }}" alt="Green Force" class="brand-logo"
                    loading="eager">

            </header>


            <!-- Hero content -->

            <div class="hero__content">

                <h1 id="hero-title" class="hero__title slide-in-left" data-delay="0.2s">
                    LETS CREATE

                    <span class="hero__title-line">
                        OUR DESIGN
                    </span>

                    <span class="hero__title-line">
                        INTO
                    </span>

                    <span class="hero__title-line">
                        WEBSITES
                    </span>

                </h1>


                <div class="hero__actions">

                    <a href="{{ route('register') }}" class="btn-primary slide-in-left" style="animation-delay: 0.5s">
                        Create New Website
                    </a>

                </div>

            </div>


            <!-- Mascot -->

            <img class="hero__mascot" src="{{ asset('images/maskot.png') }}" alt="Green Force mascot character"
                loading="eager">

        </div>

    </section>


    <!-- =========================================================
        FITUR
    ========================================================== -->

    <section id="fitur" class="snap-section">

        <div class="section-content">

            <span class="section-badge">
                Fitur Unggulan
            </span>


            <h2 class="section-title fade-in-text" style="color: #5E8229;">
                Rancang event, biarkan tumbuh
            </h2>


            <p class="section-description fade-in-text">
                Event builder adalah platform pembuat halaman event drag-and-drop dan dapat Bangun halaman admin dan
                halaman peserta sekaligus, lalu publikasikan dalam sekali klik.
            </p>


            <div class="feature-grid">


                <!-- Feature 1 -->

                <div class="feature-card feature-card-item" data-delay="0.2s">

                    <div class="feature-icon">
                        <img src="{{ asset('images/brush.png') }}" alt="brush icon">
                    </div>
                    <h3>
                        Buat Event yang Tumbuh, Bukan Sekadar Terpasang
                    </h3>

                    <p>
                        Desain halaman event secantik alam, secepat kamu berpikir. Drag, drop, publish — selesai.
                    </p>

                </div>


                <!-- Feature 2 -->

                <div class="feature-card feature-card-item" data-delay="0.4s">

                    <div class="feature-icon">
                        <img src="{{ asset('images/zap.png') }}" alt="brush icon">
                    </div>

                    <h3>
                        Dari Ide ke Event dalam Hitungan Menit
                    </h3>

                    <p>
                        Rancang, sesuaikan, dan publikasikan halaman event profesional — secepat menanam benih, secepat
                        itu pula ia tumbuh.
                    </p>

                </div>


                <!-- Feature 3 -->

                <div class="feature-card feature-card-item" data-delay="0.6s">

                    <div class="feature-icon">
                        <img src="{{ asset('images/trees.png') }}" alt="brush icon">
                        </h3>
                    </div>

                    <h3>
                        Segar, hidup, dan siap dibagikan.
                    </h3>

                    <p>
                        Publikasikan event dengan cepat
                        dan bagikan link kepada para
                        peserta dengan mudah.
                    </p>

                </div>


            </div>

        </div>

    </section>


    <section id="kontak" class="snap-section"
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 20px; background: linear-gradient(180deg, rgba(63, 74, 52, 0.67) 0%, rgba(10, 14, 10, 1) 100%); position: relative; overflow: hidden;">

        <div style="z-index: 1;">
            <span class="section-badge">Hubungi Kami</span>
            <h2 class="section-title fade-in-text" style="color: #5E8229; margin-top: 10px;">Siap Memulai?</h2>
            <p class="section-description fade-in-text" style="margin-top: 10px;">
                Mulai buat event impianmu dan wujudkan<br>
                website event yang menarik dan profesional.
            </p>

            <div class="social-icons" style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
                <a href="#beranda"><img src="{{ asset('images/instagram.png') }}" alt="Instagram"
                        style="width: 30px; height: 30px;"></a>
                <a href="#beranda"><img src="{{ asset('images/twitter.png') }}" alt="Twitter"
                        style="width: 30px; height: 30px;"></a>
                <a href="#beranda"><img src="{{ asset('images/mail.png') }}" alt="Mail"
                        style="width: 30px; height: 30px;"></a>
            </div>
        </div>

        <img src="{{ asset('images/pohon.png') }}" alt="Decorative Tree"
            style="position: absolute; bottom: 0; left: 0; width: 800px; height: auto; z-index: 0; pointer-events: none;">

        <footer class="footer" style="position: relative; margin-top: 20px;">
            &copy; {{ date('Y') }} Green Force. Hak Cipta Dilindungi.
        </footer>
    </section>

    <script>

        const navbarToggle =
            document.getElementById('navbarToggle');

        const navbarMobile =
            document.getElementById('navbarMobile');


        navbarToggle.addEventListener(
            'click',
            function () {

                const isOpen =
                    navbarMobile.classList.toggle('open');


                navbarToggle.setAttribute(
                    'aria-expanded',
                    isOpen ? 'true' : 'false'
                );

            }
        );

        document
            .querySelectorAll('.navbar__mobile a')
            .forEach(function (link) {

                link.addEventListener(
                    'click',
                    function () {

                        navbarMobile.classList.remove('open');

                        navbarToggle.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                    }
                );

            });

        document
            .querySelectorAll('a[href^="#"]')
            .forEach(function (link) {

                link.addEventListener(
                    'click',
                    function (event) {

                        const selector =
                            this.getAttribute('href');

                        const target =
                            document.querySelector(selector);


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                    }
                );

            });

        let lastScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');

        // Status awal saat dimuat: sembunyikan jika berada paling atas
        if (window.scrollY === 0) {
            navbar.classList.add('navbar--hidden');
        }

        window.addEventListener('scroll', function () {
            const currentScrollY = window.scrollY;

            // Scroll ke bawah -> Tampilkan navbar
            if (currentScrollY > lastScrollY) {
                navbar.classList.remove('navbar--hidden');
            }
            // Scroll ke atas -> Sembunyikan navbar
            else if (currentScrollY < lastScrollY) {
                navbar.classList.add('navbar--hidden');
            }

            // Selalu sembunyikan navbar saat kembali berada paling atas
            if (currentScrollY <= 0) {
                navbar.classList.add('navbar--hidden');
            }

            lastScrollY = currentScrollY;
        });


        const observerOptions = { threshold: 0.2 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const cardId = el.dataset.delay; // Menggunakan data-delay sebagai ID unik

                    // Cek apakah animasi sudah pernah jalan di sesi ini
                    if (!sessionStorage.getItem('animated_' + cardId)) {
                        el.style.animationDelay = el.getAttribute('data-delay');
                        el.classList.add('visible');

                        // Tandai sebagai sudah dianimasikan
                        sessionStorage.setItem('animated_' + cardId, 'true');
                    } else {
                        // Jika sudah pernah, langsung tampilkan tanpa animasi
                        el.classList.add('visible');
                    }

                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card-item, .fade-in-item').forEach(card => {
            observer.observe(card);
        });

        // Force scroll to top on page reload
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };

    </script>

</body>

</html>
