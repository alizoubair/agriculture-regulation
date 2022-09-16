import {map, draw } from './draw_polygon.js';

// Center the polygon
const center = document.getElementById('center').value.split(',');
const zoom = document.getElementById('zoom').value;

// Add created polygon to map
const arr = document.getElementById('coordinates').value.split(',');
const coordinates = [];

for (let i = 0; i < arr.length; i++) {
    coordinates.push([parseFloat(arr[i]), parseFloat(arr[i + 1])]);
    i++;
}

draw.add({
    'id': 'polygon',
    'type': 'Feature',
    'properties': {},
    'geometry': {
        'type': 'Polygon',
        'coordinates': [coordinates],
    }
});

map.setCenter(center);
map.setZoom(zoom);

draw.changeMode('direct_select', { featureId: 'polygon' })

map.on('click', () => {
    draw.changeMode('direct_select', { featureId: 'polygon' });
})