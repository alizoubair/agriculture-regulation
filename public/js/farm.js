import { map } from './mapbox.js';
import * as utils from './utils.js';

var toggleableFarmLayerIds = [];
var markers = [];
var name;

/* Outline each farm */
map.on('load', () => {
    $('#idFarm').each(function () {
        $(this).find('td').each(function (i) {
            var arr;
            var coordinates = [];

            if ($(this)[0].id === "coordinates") {
                arr = $(this)[0].innerText.split(',').map(i => parseFloat(i));

                for (let i = 0; i < arr.length; i++) {
                    coordinates.push([arr[i], arr[i + 1]]);
                    i++;
                }
            }

            if ($(this)[0].id === "name") {
                name = $(this)[0].innerText;
            }

            // Add a data source containing GeoJSON data.
            map.addSource(`farm${i}`, {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {
                        'name': `${name}`
                    },
                    'geometry': {
                        'type': 'Polygon',
                        // These coordinates outline Maine.
                        'coordinates': [coordinates]
                    }
                }
            });

            // Add a new layer to visualize the polygon.
            map.addLayer({
                'id': `farm${i}`,
                'type': 'fill',
                'source': `farm${i}`, // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': '#fbb03b', // blue color fill
                    'fill-opacity': 0.3
                }
            });

            // Add a black outline around the polygon.
            map.addLayer({
                'id': `outlineFarm${i}`,
                'type': 'line',
                'source': `farm${i}`,
                'layout': {},
                'paint': {
                    'line-color': '#FFD704',
                    'line-width': 3,
                }
            });

            toggleableFarmLayerIds.push([`outlineFarm${i}`, `farm${i}`]);

            // Attach a popup to a marker instance
            const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, className: "popup" }).setText(
                `${document.getElementById('area').innerText}  ${document.getElementById('perimeter').innerText}`
            );
            // Add farms' position on map with markers.
            if ($(this)[0].id === "center") {
                var center = $(this)[0].innerText.split(',').map(i => parseFloat(i));

                const marker = new mapboxgl.Marker({
                    draggable: false
                })
                    .setLngLat([center[0], center[1]])
                    .addTo(map);

                const element = marker.getElement();
                element.id = `${name}`;

                element.addEventListener('mouseenter', () => popup.addTo(map));
                element.addEventListener('mouseleave', () => popup.remove());

                marker.setPopup(popup);

                markers.push(marker);
            }
        });
    });
});

/* Add zoom in to inspect a farm */
function showFarm(event) {
    const { target } = event;
    if (target.tagName !== 'A') {
        return;
    }

    var center, zoom;                                      // Add later, handle error for no center
    var selectedMarker;

    $('#idFarm').each(function () {
        $(this).find('tr').each(function (i) {
            if ($(this)[0].firstChild.innerText === target.attributes.id.value) {
                $(this).find('td').each(function () {
                    center = ($(this)[0].id === 'center') ? $(this)[0].innerText.split((',')).map(i => parseFloat(i))
                        : center;

                    zoom = ($(this)[0].id === 'zoom') ? $(this)[0].innerText : zoom;
                    for (const marker of markers) {
                        if (marker._element.attributes.id.value === target.attributes.id.value) {
                            selectedMarker = marker;
                        }
                    }
                });

                if (center && selectedMarker) {
                    const end = {
                        center: [parseFloat(center[0]), parseFloat(center[1])],
                        zoom: zoom,
                    };

                    map.flyTo({
                        ...end,
                        duration: 10000,
                        essential: true
                    });

                    // Remove marker when we're close enough
                    map.on('moveend', () => {
                        if (parseFloat(map.getZoom()) === parseFloat(zoom)) {
                            selectedMarker.remove();
                        }
                    })
                }
            }
        })
    });
}

window.onload = function () {
    if (document.addEventListener)
        document.addEventListener('click', showFarm, false);
}

/* Filter farm features */
map.on('load', () => {
    const filterEl = document.getElementById('inputSearch');
    var features, uniqueFeatures;

    map.on('mousemove', () => {
        features = map.queryRenderedFeatures();
        if (features) {
            uniqueFeatures = utils.getUniqueFeatures(features);
        }
    });

    filterEl.addEventListener('keyup', (e) => {
        utils.filterFeatures(e, uniqueFeatures, markers);
    });
});