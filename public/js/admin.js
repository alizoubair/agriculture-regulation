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
const btnFarms = document.getElementById('farms');
const btnGreenhouses = document.getElementById('greenhouses');

function displayFarms() {
    document.getElementById('dropdown-farms').setAttribute('style', 'display:block');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:none');
}

function displayGreenhouses() {
    document.getElementById('dropdown-farms').setAttribute('style', 'display:none');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:block');
}

btnFarms.addEventListener('click', displayFarms);
btnGreenhouses.addEventListener('click', displayGreenhouses);

const createFarm = document.getElementById('new-farm');
const createGreenhouse = document.getElementById('new-greenhouse');

function setAttributeValue(collection, attr)
{
    Array.from(collection).forEach(function(current) { 
        current.setAttribute("style",`display: ${attr}`);

    })

    console.log(Array.from(collection));
}

function createFarmBox()
{
    setAttributeValue(document.getElementsByClassName('farms-box'), 'block');
    setAttributeValue(document.getElementById('content'), 'none');
}

function createGreenhouseBox()
{
    setAttributeValue(document.getElementsByClassName('greenhouses-box'), 'block');
    setAttributeValue(document.getElementById('dropdown-greenhouses'), 'none');
}

createFarm.addEventListener('click', createFarmBox);
createGreenhouse.addEventListener('click', createGreenhouseBox);