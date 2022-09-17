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

function getUniqueFeatures(features) {
    const uniqueIds = new Set();
    const uniqueFeatures = [];
    for (const feature of features) {
        const id = feature.layer.id;
        if (!uniqueIds.has(id)) {
            uniqueIds.add(id);
            uniqueFeatures.push(feature);
        }
    }
    return uniqueFeatures;
}

var filteredMarkers = [];

function filterFeatures(event, uniqueFeatures, markers) {
    const value = event.target.value;

    if (uniqueFeatures) {
        for (const uniqueFeature of uniqueFeatures) {
            map.setLayoutProperty(
                uniqueFeature.layer.id,
                'visibility',
                // Filter visible features that match the input value.
                (uniqueFeature.properties.name.includes(value)) ? 'visible' : 'none'
            );
        }

        // Filter visible marker
        if (filteredMarkers && markers) {
            for (const filteredMarker of filteredMarkers) {
                if (filteredMarker._element.id.includes(value)) {
                    filteredMarker.addTo(map);
                    filteredMarkers = filteredMarkers.filter((marker) => {
                        return (marker !==  filteredMarker);
                    });
                }
            }
        }

        for (const marker of markers) {
            if (!marker._element.id.includes(value)) {
                marker.remove();
                if (!filteredMarkers.find(element => element === marker)) {
                    filteredMarkers.push(marker);
                }
            }
        }
    }
}

export { fitView, getDimensions, getUniqueFeatures, filterFeatures };