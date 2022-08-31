mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

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

// Toggle between farms and greenhouses
const btnFarms = document.getElementById('farms');
const btnGreenhouses = document.getElementById('greenhouses');

function displayFarms() {
    btnFarms.setAttribute('style', 'background: #78B044');
    btnGreenhouses.setAttribute('style', 'background: #EEF5EC');
    document.getElementById('dropdown-farms').setAttribute('style', 'display:block');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:none');
}

function displayGreenhouses() {
    btnFarms.setAttribute('style', 'background: #EEF5EC');
    btnGreenhouses.setAttribute('style', 'background: #78B044');
    document.getElementById('dropdown-farms').setAttribute('style', 'display:none');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:block');
}

btnFarms.addEventListener('click', displayFarms);
btnGreenhouses.addEventListener('click', displayGreenhouses);


const collection = document.getElementById('idFarm');
var markers = [];

for (let i = 0; i < collection.children.length; i++) {
    // Outline each farm
    var arr = collection.children[i].children[7].value.split(',');
    const coordinates = [];

    for (let i = 0; i < arr.length; i++) {
        coordinates.push([arr[i], arr[i + 1]]);
        i++;
    }

    map.on('load', () => {
        // Add a data source containing GeoJSON data.
        map.addSource(`farm${i}`, {
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
            'id': `farm${i}`,
            'type': 'fill',
            'source': `farm${i}`, // reference the data source
            'layout': {},
            'paint': {
                'fill-color': '#fbb03b', // blue color fill
                'fill-opacity': 0.3
            }
        });

        // Add a black outline around the polygon.
        map.addLayer({
            'id': `outline${i}`,
            'type': 'line',
            'source': `farm${i}`,
            'layout': {},
            'paint': {
                'line-color': '#fbb03b',
                'line-width': 1,
                'line-dasharray': [5, 5]
            }
        });
    });

    // Add farms' position on map with markers.
    var center = collection.children[i].children[6].value.split(',');

    const marker = new mapboxgl.Marker({
        draggable: false
    })
        .setLngLat([center[0], center[1]])
        .addTo(map);

    markers.push(marker);
}

// Add zoom in to inspect a farm
function showFarm(event) {
    const { target } = event;

    if (target.tagName !== 'A') {
        return;
    }

    var items = document.getElementById('idFarm');
    var center, zoom;                                      // Add later, handle error for no center
    var selectedMarker;

    for (let i = 0; i < items.children.length; i++) {
        if (items.children[i].children[0].id === target.attributes.id.value) {
            center = items.children[i].children[6].value.split(',');
            zoom = items.children[i].children[5].value;
            selectedMarker = markers[i];
        }
    }

    const end = {
        center: [center[0], center[1]],
        zoom: zoom,
    };

    map.flyTo({
        ...end,
        duration: 10000,
        essential: true
    });

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

// Add zoom in to inspect a greenhouse
function showGreenhouse(event) {
    const { target } = event;

    if (target.tagName !== 'A') {
        return;
    }

    var greenhouses = document.getElementById('idGreenhouse');
    var center, zoom;

    for (let i = 0; i < greenhouses.children.length; i++) {
        if (greenhouses.children[i].children[0].id == target.attributes.id.value) {
            center = greenhouses.children[i].children[6].value.split(',');
            zoom = greenhouses.children[i].children[5].value;
        }
    }

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