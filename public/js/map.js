const farms = document.getElementById('idFarm');
const nbrFarms = farms.children.length;
const greenhouses = document.getElementById('idGreenhouse');
const nbrGreenhouses = greenhouses.children.length;
const toggleableFarmLayerIds = [];
const toggleableGreenhouseLayerIds = [];

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

/* Launch mapbox map */
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

/* Toggle between farms and greenhouses */
const btnFarms = document.getElementById('farms');
const btnGreenhouses = document.getElementById('greenhouses');

function displayFarms() {
    btnFarms.setAttribute('style', 'background: #78B044');
    btnGreenhouses.setAttribute('style', 'background: #EEF5EC');
    document.getElementById('dropdown-farms').setAttribute('style', 'display:block; display: flex');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:none');
}

function displayGreenhouses() {
    btnFarms.setAttribute('style', 'background: #EEF5EC; color: #ACB4AB');
    btnGreenhouses.setAttribute('style', 'background: #78B044; color: #FFFFFF;');
    document.getElementById('dropdown-farms').setAttribute('style', 'display:none');
    document.getElementById('dropdown-greenhouses').setAttribute('style', 'display:block; display: flex');
}

btnFarms.addEventListener('click', displayFarms);
btnGreenhouses.addEventListener('click', displayGreenhouses);

/* Outline each farm */
map.on('load', () => {
    var markers = [];

    for (let i = 0; i < nbrFarms; i++) {
        var arr = farms.children[i].children[0].children[9].value.split(',');
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
            `${farms.children[i].children[0].children[3].innerHTML}
            ${farms.children[i].children[0].children[4].innerHTML}`
        );

        // Add farms' position on map with markers.
        var center = farms.children[i].children[0].children[8].value.split(',');

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

/* Show and hide layers */
map.on('idle', () => {
    const toggleableBtnIds = ['farms', 'greenhouses'];
    for (const id of toggleableBtnIds) {
        const link = document.getElementById(id);
        link.textContent = id;

        link.onclick = function (e) {
            for (let i = 0; i < nbrFarms; i++) {
                const farmLayers = toggleableFarmLayerIds[i];
                for (let j = 0; j < nbrGreenhouses; j++) {
                    const greenhouseLayers = toggleableGreenhouseLayerIds[j];
                    e.preventDefault();
                    e.stopPropagation();

                    if (this.textContent === 'farms') {
                        hideLayer(greenhouseLayers);
                        showLayer(farmLayers);

                    } else {
                        hideLayer(farmLayers);
                        showLayer(greenhouseLayers);

                    }
                }
            }
        }
    }
});

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
            center = farms.children[i].children[0].children[8].value.split(',');
            zoom = farms.children[i].children[0].children[7].value;
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

/* Inspect each greenhouse */
function showGreenhouse(event) {
    const { target } = event;

    if (target.tagName !== 'A') {
        return;
    }

    var center, zoom;                                      // Add later, handle error for no center

    for (let i = 0; i < greenhouses.children.length; i++) {
        if (greenhouses.children[i].children[0].children[0].id === target.attributes.id.value) {
            center = greenhouses.children[i].children[0].children[2].value.split(',');
            zoom = greenhouses.children[i].children[0].children[1].value;
        }
    }

    const end = {
        center: [center[0], center[1]],
        zoom: zoom,
    };

    map.flyTo({
        ...end,
        duration: 10000,
        essential: true
    });
}

window.onload = function () {
    if (document.addEventListener)
        document.addEventListener('click', showGreenhouse, false);
}

map.on('load', () => {

    for (let i = 0; i < nbrGreenhouses; i++) {
        var arr = greenhouses.children[i].children[0].children[3].value.split(',');
        const coordinates = [];

        for (let i = 0; i < arr.length; i++) {
            coordinates.push([arr[i], arr[i + 1]]);
            i++;
        }

        // Add a data source containing GeoJSON data.
        map.addSource(`greenhouse${i}`, {
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
            'id': `greenhouse${i}`,
            'type': 'fill',
            'source': `greenhouse${i}`, // reference the data source
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'fill-color': '#fbb03b', // blue color fill
                'fill-opacity': 0.3
            }
        });

        // Add a black outline around the polygon.
        map.addLayer({
            'id': `outlineGreenhouse${i}`,
            'type': 'line',
            'source': `greenhouse${i}`,
            'layout': {
                'visibility': 'none'
            },
            'paint': {
                'line-color': '#FFD704',
                'line-width': 3,
            },
        });

        toggleableGreenhouseLayerIds.push([`outlineGreenhouse${i}`, `greenhouse${i}`]);
    }
});