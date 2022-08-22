<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Draw a polygon and calculate its area</title>
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
</head>
<body>
  <aside class="sidebar">
    <ul class="sidebar-nav">
      <li class="nav-item">
        <a class="nav-link">
          <i class="bi bi-house"></i>
          <span>Acceuil</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="bi bi-house"></i>
          <span>Fermes</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="bi bi-house"></i>
          <span>Alerte</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="bi bi-house"></i>
          <span>Clients</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="bi bi-house"></i>
          <span>Abonnement</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="bi bi-house"></i>
          <span>Role</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link">
          <i class="bi bi-house"></i>
          <span>Utilisateur</span>
        </a>
      </li>
    </ul>
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