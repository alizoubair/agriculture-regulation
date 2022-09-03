mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

/* Launch mapbox map */
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-7, 31], // starting position [lng, lat]
    zoom: 5, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

map.on('mousemove', (e) => {
    // `e.lngLat` is the longitude, latitude geographical position of the event.
    var [longitude, latitude] = e.lngLat.toArray();

    localStorage.setItem("Longitude", longitude);
    localStorage.setItem("Latitude", latitude);
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

function zoomLevel() {
    var currentZoom = map.getZoom();

    localStorage.setItem("Zoom", currentZoom);
}

map.on('zoom', zoomLevel);

map.on('zoom', function (e) {
    localStorage.setItem('bounds', map.getBounds());
});

map.on('drag', function (e) {
    localStorage.setItem('bounds', map.getBounds());
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

map.on('render', function () {
    map.resize();
});

/* Toggle between farms and greenhouses */
const btnFarms = document.getElementById('farms');
const btnGreenhouses = document.getElementById('greenhouses');

function displayFarms() {
    btnFarms.setAttribute('style', 'background: #78B044');
    btnGreenhouses.setAttribute('style', 'background: #EEF5EC');
    document.getElementById('dropdown-farms').setAttribute('style', 'display:block; display: flex');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:none');
}

function displayGreenhouses() {
    btnFarms.setAttribute('style', 'background: #EEF5EC; color: #ACB4AB');
    btnGreenhouses.setAttribute('style', 'background: #78B044; color: #FFFFFF;');
    document.getElementById('dropdown-farms').setAttribute('style', 'display:none');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:block; display: flex');
}

btnFarms.addEventListener('click', displayFarms);
btnGreenhouses.addEventListener('click', displayGreenhouses);

/* Outline a geometry */
function outline(id, coordinates) {
    map.on('load', () => {
        // Add a data source containing GeoJSON data.
        map.addSource(`farm${id}`, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    // These coordinates outline Maine.
                    'coordinates': [coordinates]
                }
            }
        });

        // Add a new layer to visualize the polygon.
        map.addLayer({
            'id': `farm${id}`,
            'type': 'fill',
            'source': `farm${id}`, // reference the data source
            'layout': {},
            'paint': {
                'fill-color': '#fbb03b', // blue color fill
                'fill-opacity': 0.3
            }
        });

        // Add a black outline around the polygon.
        map.addLayer({
            'id': `outline${id}`,
            'type': 'line',
            'source': `farm${id}`,
            'layout': {},
            'paint': {
                'line-color': '#FFD704',
                'line-width': 3,
            }
        });
    });
}

/* Fly to a geometry */
function flyToGeometry(center, zoom) {
    const end = {
        center: [center[0], center[1]],
        zoom: zoom,
    };

    map.flyTo({
        ...end,
        duration: 10000,
        essential: true
    });
}

/* Outline each farm */
const farms = document.getElementById('idFarm');
var markers = [];

for (let i = 0; i < farms.children.length; i++) {
    var arr = farms.children[i].children[0].children[9].value.split(',');
    const coordinates = [];

    for (let i = 0; i < arr.length; i++) {
        coordinates.push([arr[i], arr[i + 1]]);
        i++;
    }

    outline(i, coordinates);

    // Attach a popup to a marker instance
    const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setText(
        `${farms.children[i].children[0].children[3].innerHTML}
         ${farms.children[i].children[0].children[4].innerHTML}`
    );

    // Add farms' position on map with markers.
    var center = farms.children[i].children[0].children[8].value.split(',');

    const marker = new mapboxgl.Marker({
        draggable: false
    })
        .setLngLat([center[0], center[1]])
        .addTo(map);

    const element = marker.getElement();
    element.id = "marker"

    element.addEventListener('mouseenter', () => popup.addTo(map));
    element.addEventListener('mouseleave', () => popup.remove());
    
    marker.setPopup(popup);
    
    markers.push(marker);
}

/* Add zoom in to inspect a farm */
var selectedMarker;

function showFarm(event) {
    const { target } = event;

    if (target.tagName !== 'A') {
        return;
    }

    var center, zoom;                                      // Add later, handle error for no center

    for (let i = 0; i < farms.children.length; i++) {
        if (farms.children[i].children[0].children[0].id === target.attributes.id.value) {
            center = farms.children[i].children[0].children[8].value.split(',');
            zoom = farms.children[i].children[0].children[7].value;
            selectedMarker = markers[i];
        }
    }

    flyToGeometry(center, zoom);

    // Remove marker when we're close enough
    map.on('moveend', () => {
        if (map.getZoom() == zoom) {
            selectedMarker.remove();
        }
    })    
}

window.onload = function () {
    if (document.addEventListener)
        document.addEventListener('click', showFarm, false);
}

/* Inspect each greenhouse */
const greenhouses = document.getElementById('idGreenhouse');

function showGreenhouse(event) {
    const { target } = event;

    if (target.tagName !== 'A') {
        return;
    }

    var center, zoom;                                      // Add later, handle error for no center

    for (let i = 0; i < greenhouses.children.length; i++) {
        if (greenhouses.children[i].children[0].children[0].id === target.attributes.id.value) {
            center = greenhouses.children[i].children[0].children[2].value.split(',');
            zoom = greenhouses.children[i].children[0].children[1].value;
        }
    }

    flyToGeometry(center, zoom);
    
    // Remove farm markers when we're fetching greenhouses
    map.on('moveend', () => {
        if (map.getZoom() == zoom) {
            selectedMarker.remove();
        }
    })
}

window.onload = function () {
    if (document.addEventListener)
        document.addEventListener('click', showGreenhouse, false);
}