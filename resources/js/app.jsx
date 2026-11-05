import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    // Inertia::render('Projects/Index') in a controller  ->  ./Pages/Projects/Index.jsx
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        return pages[`./Pages/${name}.jsx`]();
    },

    // Mount the React app into <div id="app">
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
