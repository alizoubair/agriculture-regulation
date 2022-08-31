import { map } from './script.js';

const selectOption = document.getElementById('select');

selectOption.addEventListener('change', () => {
    // Inspect the selected farm.
    var center = selectOption.selectedOptions[0].getAttribute('data-center').split(',');
    var zoom = selectOption.selectedOptions[0].getAttribute('data-zoom');

    const end = {
        center: [center[0], center[1]],
        zoom: zoom,
    };

    map.flyTo({
        ...end,
        duration: 10000,
        essential: true
    });

    // Outline the selected farm.
    const arr = selectOption.selectedOptions[0].getAttribute('data-coordinates').split(',');
    const coordinates = [];

    for (let i = 0; i < arr.length; i++) {
        coordinates.push([arr[i], arr[i + 1]]);
        i++;
    }

    const id = selectOption.value;
    console.log(coordinates);
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
                'line-color': '#fbb03b',
                'line-width': 1,
                'line-dasharray': [5, 5]
            }
        });
    });
})