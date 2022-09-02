
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

const longitude = document.getElementById("lng").value;
const latitude = document.getElementById('lat').value;
const zoomLevel = document.getElementById('zoom').value;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: zoomLevel, // starting zoom
    projection: 'globe' // display the map as a 3D globe
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

const draw = new MapboxDraw({
  displayControlsDefault: false,
  // Select which mapbox-gl-draw control buttons to add to the map.
  controls: {
      polygon: false,
      trash: true
  },
  // Set mapbox-gl-draw to draw by default.
  // The user does not have to click the polygon control button first.
  defaultMode: 'simple_select'
});

map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

// Add created polygon to map
const arr = document.getElementById('coordinates').value.split(',');
const coordinates = [];

for (let i = 0; i < arr.length; i++)
{
    coordinates.push([parseFloat(arr[i]), parseFloat(arr[i+1])]);
    i++;
}
console.log(coordinates);
draw.add({
    'id': 'polygon',
    'type': 'Feature',
    'properties': {},
    'geometry': {
        'type': 'Polygon',
        'coordinates': [coordinates]
    }
});

function updateArea(e) {
    const data = draw.getAll();
    const area_field = document.getElementById('calculated-area');
    const perimeter_field = document.getElementById('calculated-perimeter');

    const coordinates = data.features[data.features.length - 1].geometry.coordinates;

    localStorage.setItem('coordinates', coordinates);

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