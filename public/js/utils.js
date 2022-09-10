import { map } from './mapbox.js';

/* Fit the map to the last view */
function fitView() {
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

function getDimensions(data, coordinates) {
    const area = turf.area(data);

    const line = turf.lineString(coordinates[0]);
    const perimeter = turf.length(line);

    // Restrict the area and perimeter to 2 decimal points.
    var rounded_area = Math.round(area * 100) / 100;
    var rounded_perimeter = Math.round(perimeter * 100) / 100;
    
    return [rounded_area, rounded_perimeter];
}

export { fitView, getDimensions };