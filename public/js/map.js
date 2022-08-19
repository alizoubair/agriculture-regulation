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

const marker = new mapboxgl.Marker({
  draggable: true
})
.setLngLat([-7, 31])
.addTo(map);
 
function onDragEnd() {
  const lngLat = marker.getLngLat();    

  coordinates.style.display = 'block';
  coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;

  localStorage.setItem("Longitude", lngLat.lng);
  localStorage.setItem("Latitude", lngLat.lat);
}
 
function zoomLevel()
{
  var currentZoom = map.getZoom();

  localStorage.setItem("Zoom", currentZoom);
}

marker.on('dragend', onDragEnd);

map.on('zoom', zoomLevel);

map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});

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