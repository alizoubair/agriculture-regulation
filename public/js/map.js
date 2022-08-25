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

function zoomLevel()
{
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

// Zoom in to inspect a farm
const end = {
  center: [document.getElementById('lng').value, document.getElementById('lat').value],
  zoom: document.getElementById('zoom').value
};

function showFarm(event) {
  const { target } = event;
  if (target.tagName !== 'A') {
    return;
  }
  console.log("hh");
  map.flyTo({
    ...end,
    duration: 12000,
    essential: true
  })
}

window.onload = function() {
  if (document.addEventListener)
    document.addEventListener('click', showFarm, false);
}

// Toggle between farms and greenhouses
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


// Add farms' position on map with markers.
const collection = document.getElementById('idFarm');
const lngs = [];
const lats = [];

for (let i = 0; i < collection.children.length; i++)
{
   var lng = collection.children[i].children[1].value;
   lngs.push(lng);
   var lat = collection.children[i].children[2].value;
   lats.push(lat);
}

for (let i = 0, j = 0; i < lngs.length; i++, j++)
{
  const marker = new mapboxgl.Marker({
    draggable: false
  })
  .setLngLat([lngs[i], lats[j]])
  .addTo(map);
}