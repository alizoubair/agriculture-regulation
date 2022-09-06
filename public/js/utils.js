import {map} from './mapbox.js';

/* Fit the map to the last view */
export function fitView() {
    if (localStorage.getItem('bounds') != null) {
        const zoom = localStorage.getItem('zoom');
        let bounds = localStorage.getItem('bounds');
        var araBounds = bounds.toString().split(',');
        var swX = parseFloat(araBounds[0].replace('LngLatBounds(LngLat(', ''));
        var swY = parseFloat(araBounds[1].replace(')', ''));
        var neX = parseFloat(araBounds[2].replace('LngLat(', ''));
        var neY = parseFloat(araBounds[3].replace('))', ''));
        var ne = new mapboxgl.LngLat(neX, neY);
        var sw = new mapboxgl.LngLat(swX, swY);
    
        // calculate center of bounds
        const lng = (swX + neX) / 2;
        const lat = (swY + neY) / 2;
    
        map.setCenter([lng, lat]);
        map.setZoom(zoom);
    
        var box = new mapboxgl.LngLatBounds(sw, ne);
        map.fitBounds(box);
    };
}