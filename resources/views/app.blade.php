<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="color-scheme:dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="description" content="Portfolio of John Paul M. Moises, a BSIT student building skills and projects for a future in IT.">

    {{-- Same Google Fonts your original index.html loaded --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite('resources/js/app.jsx')

    {{-- Pages can override this with <Head title="..."> from @inertiajs/react --}}
    <x-inertia::head>
        <title>John Paul M. Moises | BSIT Student Portfolio</title>
    </x-inertia::head>
</head>
<body>
    {{-- Renders <div id="app">; Inertia/React mounts the page here --}}
    <x-inertia::app />
</body>
</html>
