mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

/* Launch mapbox map */
export const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-7, 31], // starting position [lng, lat]
    zoom: 5, // starting zoom
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load',  () => {
    localStorage.setItem("zoom", map.getZoom());
    localStorage.setItem("bounds", map.getBounds());
})

map.on('zoom',  () => {
    localStorage.setItem("zoom", map.getZoom());
    localStorage.setItem('bounds', map.getBounds());
});

map.on('drag', () => {
    localStorage.setItem('bounds', map.getBounds());
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

map.on('render', function () {
    map.resize();
});