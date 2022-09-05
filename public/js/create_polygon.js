import {draw, map} from './draw_polygon.js'

// Add created polygon to map
const arr = document.getElementById('coordinates').value.split(',');
const coordinates = [];

for (let i = 0; i < arr.length; i++)
{
    coordinates.push([parseFloat(arr[i]), parseFloat(arr[i+1])]);
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