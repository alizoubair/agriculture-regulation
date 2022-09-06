import { map } from './mapbox.js'
import * as utils from './utils.js';

const greenhouses = document.getElementById('idGreenhouse');
const nbrGreenhouses = greenhouses.children.length;

utils.fitView();

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