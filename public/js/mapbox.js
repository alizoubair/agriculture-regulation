mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

/* Launch mapbox map */
export const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-7, 31], // starting position [lng, lat]
    zoom: 5, // starting zoom
    projection: 'mercator' // display the map as a 3D globe
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

map.on('render', function () {
    map.resize();
});