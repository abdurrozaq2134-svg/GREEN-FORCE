<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    @viteReactRefresh
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $page->title ?? 'Event Baru' }} — Builder</title>
    @vite(['resources/js/builder.jsx'])
</head>
<body style="margin:0;">

    <div
        id="event-builder-app"
        data-page-id="{{ $page->id ?? '' }}"
        data-title="{{ $page->title ?? 'Event Baru' }}"
        data-elements="{{ $page->elements ?? '[]' }}"
        data-pages="{{ $page->pages ?? '[]' }}"
        data-user-pages="{{ json_encode($pages ?? []) }}"
        data-save-url="{{ route('builder.save') }}"
        data-slug="{{ $page->slug ?? '' }}"
        data-is-published="{{ ($page->is_published ?? false) ? '1' : '0' }}"
        data-public-urls="{{ json_encode($page->urls ?? null) }}"
    ></div>

</body>
</html>
