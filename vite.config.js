import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            // One entry point: app.jsx imports the CSS itself (recommended for Inertia apps).
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
