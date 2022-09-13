<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Fermes</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="{{ asset('css/admin.css') }}">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
<script src="https://unpkg.com/@turf/turf@6/turf.min.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.2/mapbox-gl-draw.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.2/mapbox-gl-draw.css" type="text/css">
<!-- Load the `mapbox-gl-geocoder` plugin. -->
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
<!-- Bootstrap Font Icon CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
</head>
<body>
    <aside class="sidebar">
        <div class="logo">
            <a>
                <span>TrackTom</span>
            </a>
        </div>    

        <ul class="sidebar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="bi bi-house-fill"></i>
                    <span>Tableau de bord</span>
                </a>
            </li>
            <li class="{{ (Request::is('admin/farms') || Request::is('admin/farms/create') 
                || Request::is('admin/farms/edit') || Request::is('admin/greenhouses')
                || Request::is('admin/greenhouses/create') || Request::is('admin/greenhouses/edit')) ? 'nav-item active' : 'nav-item' }}">
                <a class="nav-link" href="/admin/farms">
                    <i class="bi bi-map-fill"></i>
                    <span>Cartes des fermes</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="bi bi-bell-fill"></i>
                    <span>Alertes</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="bi bi-house-fill"></i>
                    <span>Abonnement</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="bi bi-house-fill"></i>
                    <span>Role</span>
                </a>
            </li>
            <li class="nav-item" class="{{ (Request::is('user')) ? 'nav-item active' : 'nav-item' }}">
                <a class="nav-link" href="/user">
                    <i class="bi bi-person-fill"></i>
                    <span>Utilisateur</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="bi bi-gear-fill"></i>
                    <span>Paramètres</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="bi bi-question-circle-fill"></i>
                    <span>Aider</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Se déconnecter</span>
                </a>
            </li>
        </ul>
        <div class="sidebar-footer">
            <img src="{{ asset('images/logoitinfo(2).png') }}">
            <div>
                <p class="company">ITINFODEV</p>
                <a>Editer le profile</a>
            </div>
        </div>
    </aside>
    <main>
        <header id="header">
            @yield('header')
        </header>
        <div id="content">
            @yield('index')
            
            @yield('Farm')

            @yield('Greenhouse')

            @yield('user')
        </div>
    </main>
    @yield('javascripts')
</body>
</html>