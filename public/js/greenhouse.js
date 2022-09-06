mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

const greenhouses = document.getElementById('idGreenhouse');
const nbrGreenhouses = greenhouses.children.length;

const longitude = localStorage.getItem('Longitude');
const latitude = localStorage.getItem('Latitude');
const zoomLevel = localStorage.getItem('Zoom');

export const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: zoomLevel, // starting zoom
    projection: 'mercator' // display the map as a 3D globe
});

// Fit the map to the last view
if (localStorage.getItem('bounds') != null) {
    let bounds = localStorage.getItem('bounds');
    var araBounds = bounds.toString().split(',');
    var swX = parseFloat(araBounds[0].replace('LngLatBounds(LngLat(',''));
    var swY = parseFloat(araBounds[1].replace(')',''));
    var neX = parseFloat(araBounds[2].replace('LngLat(',''));
    var neY = parseFloat(araBounds[3].replace('))', ''));

    var ne = new mapboxgl.LngLat(neX, neY);
    var sw = new mapboxgl.LngLat(swX, swY);

    var box = new mapboxgl.LngLatBounds(sw, ne);
    map.fitBounds(box);
};

/* Inspect each greenhouse */
function showGreenhouse(event) {
    const { target } = event;
    if (target.tagName !== 'A') {
        return;
    }

    var center, zoom;                                      // Add later, handle error for no center

    for (let i = 0; i < greenhouses.children.length; i++) {
        if (greenhouses.children[i].children[0].children[0].id === target.attributes.id.value) {
            center = document.getElementById('center').value.split(',');
            zoom = document.getElementById('zoom').value;
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

window.onload = function () {
    if (document.addEventListener)
        document.addEventListener('click', showGreenhouse, false);
}

map.on('load', () => {
    for (let i = 0; i < nbrGreenhouses; i++) {
        var arr = document.getElementById('coordinates').value.split(',');
        const coordinates = [];

        for (let i = 0; i < arr.length; i++) {
            coordinates.push([arr[i], arr[i + 1]]);
            i++;
        }
        
        // Add a data source containing GeoJSON data.
        map.addSource(`greenhouse${i}`, {
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
            'id': `greenhouse${i}`,
            'type': 'fill',
            'source': `greenhouse${i}`, // reference the data source
            'layout': {},
            'paint': {
                'fill-color': '#FE813B',
                'fill-opacity': 0.3
            }
        });

        // Add an outline around the polygon.
        map.addLayer({
            'id': `outlineGreenhouse${i}`,
            'type': 'line',
            'source': `greenhouse${i}`,
            'layout': {},
            'paint': {
                'line-color': '#FE813B',
                'line-width': 3,
            },
        });
    }
});