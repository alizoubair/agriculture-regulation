<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Fermes</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="{{ asset('css/admin.css') }}">
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
    <header id="header">
    </header>
    <aside class="sidebar">
        <div class="logo">
            <a>
                <span>TrackTom</span>
            </a>
        </div>    

        <ul class="sidebar-nav main">
            <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="bi bi-house-fill"></i>
                <span>Tableau de bord</span>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="bi bi-map-fill"></i>
                <span>Fermes</span>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="bi bi-bell-fill"></i>
                <span>Alerte</span>
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
            <li class="nav-item">
            <a class="nav-link" href="#">
                <i class="bi bi-person-fill"></i>
                <span>Utilisateur</span>
            </a>
            </li>
        </ul>

        <div class="settings">
            <ul class="sidebar-nav">
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
        </div>

        <div class="sidebar-footer">
            <img src="{{ asset('images/logoitinfo.png') }}">
        </div>
    </aside>
    <main>
    <div class="page-content">
        @yield('index')
        
        @yield('Farm')

        @yield('Greenhouse')
    </div>
    </main>
</body>
</html>