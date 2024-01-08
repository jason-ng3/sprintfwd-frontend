<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <title>@yield('title', 'Member Management System')</title>
</head>
<body>
    <main>
        @yield('content')
    </main>

    <script src="{{ asset('js/global.js') }}"></script>
    <script type="module" src="{{ asset('js/form_scripts.js') }}"></script>
</body>
</html>
