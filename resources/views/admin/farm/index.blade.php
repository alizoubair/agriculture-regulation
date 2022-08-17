@extends('layouts.admin')
@section('content')
<script src="https://unpkg.com/@turf/turf@6/turf.min.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.2/mapbox-gl-draw.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.2/mapbox-gl-draw.css" type="text/css">
<!-- Load the `mapbox-gl-geocoder` plugin. -->
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
<div class="pagetitle">
    <h1>Liste des fermes</h1>
</div>
<div class="page-content">
    <div id="list">
        <div class="dropdown">
          <button id="dropFermes" class="dropbtn">Fermes</button>
          <div id="dropdown-fermes" class="dropdown-content">
            <a href="#">Ferme 1</a>
            <a href="#">Ferme 2</a>
            <a href="#">Ferme 3</a>
          </div>
        </div>

        <button id="dropSerres" class="dropbtn">Serres</button>
        <div id="dropdown-serres" class="dropdown-content">
            <a href="#">Serre 1</a>
            <a href="#">Serre 2</a>
            <a href="#">Serre 3</a>
          </div>
        </div>

      <button id="new-item">Create a new farm</button>  
    </div>
    
    <div id="calculation-box" style="display: none;">
        <button id="cancel">Cancel</button>

        <form method="POST" action="{{ route('admin.farm.create') }}">
            @csrf
            <label>Name:</label>
            <input id="name" type="text" name="name" value="{{ old('name') }}" class="form-control">
            <label>Area:</label>
            <input id="calculated-area" type="text" name="area" value="{{ old('area') }}" class="form-control">
            <label>Perimeter:</label>
            <input id="calculated-perimeter" type="text" name="perimeter" value="{{ old('perimeter') }}" class="form-control">
            
            <button type="submit">Save</button>
        </form>
    </div>
    <div id="map"></div>
</div>

<script>
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/satellite-v9', // style URL
        center: [-91.874, 42.76], // starting position [lng, lat]
        zoom: 12 // starting zoom
    });

    const draw = new MapboxDraw({
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
            polygon: true,
            trash: true
        },
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: 'draw_polygon'
    });

    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );

    map.addControl(draw);

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);


    const addBtn = document.getElementById('new-item');
    const box = document.getElementById('calculation-box');

    function createItem() {
        document.getElementById('list').style.display = 'none';
        document.getElementById('calculation-box').style.display = 'block';
    }

    addBtn.addEventListener("click", createItem);


    const btnCancel = document.getElementById("cancel");

    function cancel() {
        document.getElementById('list').style.display = 'block';
        document.getElementById('calculation-box').style.display = 'none';    
    }

    btnCancel.addEventListener("click", cancel);

    function updateArea(e) {
        const data = draw.getAll();
        const area_field = document.getElementById('calculated-area');
        const perimeter_field = document.getElementById('calculated-perimeter');

        const coordinates = data.features[data.features.length - 1].geometry.coordinates;

        if (data.features.length > 0) {
            const area = turf.area(data);

            const line = turf.lineString(coordinates[0]);
            const perimeter = turf.length(line);


            // Restrict the area and perimeter to 2 decimal points.
            const rounded_area = Math.round(area * 100) / 100;

            area_field.placeholder = `${rounded_area} square meters`;
            area_field.setAttribute('value', rounded_area);
            perimeter_field.placeholder = `${perimeter} kilometers`;
            perimeter_field.setAttribute('value', perimeter);
        } else {
            answer.innerHTML = '';
            if (e.type !== 'draw.delete')
                alert('Click the map to draw a polygon.');
        }
    }

    /* Clickable dropdowns */
    const btnFermes = document.getElementById('dropFermes');
    const btnSerres = document.getElementById('dropSerres');

    function dropdownFermes() {
        document.getElementById('dropdown-fermes').classList.toggle("show");
        document.getElementById('new-item').textContent = 'Create Ferme';
    }

    function dropdownSerres() {
        document.getElementById('dropdown-serres').classList.toggle("show");
        document.getElementById('new-item').textContent = 'Create Serre';
    }

    btnFermes.addEventListener('click', dropdownFermes);
    btnSerres.addEventListener('click', dropdownSerres);

    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
</script>
@endsection