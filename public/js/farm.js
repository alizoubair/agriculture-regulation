import {map} from './mapbox.js';

const farms = document.getElementById('idFarm');
const nbrFarms = farms.children.length;
const toggleableFarmLayerIds = [];
var markers = [];

function displayGreenhouses() {
    btnFarms.setAttribute('style', 'background: #EEF5EC; color: #ACB4AB');
    btnGreenhouses.setAttribute('style', 'background: #78B044; color: #FFFFFF;');
    document.getElementById('dropdown-farms').setAttribute('style', 'display:none');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:block; display: flex');
}

/* Outline each farm */
map.on('load', () => {
    for (let i = 0; i < nbrFarms; i++) {
        var arr = document.getElementById('coordinates').value.split(',');
        const coordinates = [];

        for (let i = 0; i < arr.length; i++) {
            coordinates.push([arr[i], arr[i + 1]]);
            i++;
        }

        // Add a data source containing GeoJSON data.
        map.addSource(`farm${i}`, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
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
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setText(
            `${document.getElementsByClassName('dimensions')[0].innerText}`
        );

        // Add farms' position on map with markers.
        var center = document.getElementById('center').value.split(',');

        const marker = new mapboxgl.Marker({
            draggable: false
        })
            .setLngLat([center[0], center[1]])
            .addTo(map);

        const element = marker.getElement();
        element.id = "marker"

        element.addEventListener('mouseenter', () => popup.addTo(map));
        element.addEventListener('mouseleave', () => popup.remove());

        marker.setPopup(popup);

        markers.push(marker);
    }
});

function hideLayer(layers) {
    for (let i = 0; i < layers.length; i++) {
        map.setLayoutProperty(
            layers[i],
            'visibility',
            'none'
        );
    }
}

function showLayer(layers) {
    for (let i = 0; i < layers.length; i++) {
        map.setLayoutProperty(
            layers[i],
            'visibility',
            'visible'
        );
    }
}

/* Add zoom in to inspect a farm */
function showFarm(event) {
    const { target } = event;
    if (target.tagName !== 'A') {
        return;
    }

    var center, zoom;                                      // Add later, handle error for no center
    var selectedMarker;

    for (let i = 0; i < farms.children.length; i++) {
        if (farms.children[i].children[0].children[0].id === target.attributes.id.value) {
            center = document.getElementById('center').value.split(',');
            zoom = document.getElementById('zoom').value;
            selectedMarker = markers[i];
        }
    }

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
        if (map.getZoom() == zoom) {
            selectedMarker.remove();
        }
    })
}

window.onload = function () {
    if (document.addEventListener)
        document.addEventListener('click', showFarm, false);
}