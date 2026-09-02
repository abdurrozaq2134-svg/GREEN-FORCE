import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/komando.css', 'resources/css/app.css', 'resources/css/dashboard.css', 'resources/js/app.js', 'resources/js/builder.jsx', 'resources/js/green-landing.jsx', 'resources/js/dashboard.js', 'resources/css/showcase.css', 'resources/js/showcase.js'],
            refresh: true,
        }),
        react(),
    ],
});
