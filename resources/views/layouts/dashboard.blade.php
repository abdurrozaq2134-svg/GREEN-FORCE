<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Dashboard') — Sistem Komando</title>

    @vite(['resources/css/komando.css', 'resources/css/dashboard.css', 'resources/js/dashboard.js'])
</head>
<body>

    {{-- Sidebar --}}
    @include('components.sidebar')

    {{-- Main --}}
    <main class="main" role="main">
        @yield('content')
    </main>

    {{-- Toast stack --}}
    <div class="toast-stack" id="toast-stack" aria-live="polite"></div>
</body>
</html>