import { map } from "./mapbox.js";
import * as utils from './utils.js';

var vertex = 0, last_vertex = 0;
var coordinates, removePopup, renderPopup, areaPopup;
const area_field = document.getElementById('calculated-area');
const perimeter_field = document.getElementById('calculated-perimeter');
const coordinates_field = document.getElementById('coordinates');
const center_field = document.getElementById('center');
const zoom_field = document.getElementById('zoom');
var cancelPop = "<button id='cancelPopup'>Annuler</button>";
var renderPop = "<button id='renderPopup'>Terminer</button>";

utils.fitView();

/* Overriding polygon features */
MapboxDraw.modes.draw_polygon.onTrash = function (state) {
    if (state.currentVertexPosition <= 1) {
        this.deleteFeature([state.polygon.id], { silent: true });
        this.changeMode(Constants.modes.SIMPLE_SELECT);
    } else {
        const coordinates = state.polygon.coordinates[0];
        if (coordinates) {
            state.polygon.changed();
            state.currentVertexPosition -= 1;
            coordinates.splice(state.currentVertexPosition, 1);
        }
    }
}

export const draw = new MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
        polygon: true,
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
            "id": "gl-draw-line",
            "type": "line",
            "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#FFD704",
                "line-dasharray": [1, 2],
                "line-width": 3
            }
        },
        // polygon fill
        {
            "id": "gl-draw-polygon-fill",
            "type": "fill",
            "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            "paint": {
                "fill-color": "#FFD704",
                "fill-outline-color": "#FFD704",
                "fill-opacity": 0.3
            }
        },
        // polygon mid points
        {
            'id': 'gl-draw-polygon-midpoint',
            'type': 'circle',
            'filter': ['all',
                ['==', '$type', 'Point'],
                ['==', 'meta', 'midpoint']],
            'paint': {
                'circle-radius': 4,
                'circle-color': '#FFD704'
            }
        },
        // polygon outline stroke
        {
            "id": "gl-draw-polygon-stroke-active",
            "type": "line",
            "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#FFD704",
                "line-dasharray": [1, 2],
                "line-width": 3
            }
        },
        // vertex point halos
        {
            "id": "gl-draw-polygon-and-line-vertex-halo-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
                "circle-radius": 5,
                "circle-color": "#FFD704"
            }
        },
        // vertex points
        {
            "id": "gl-draw-polygon-and-line-vertex-active",
            "type": "circle",
            "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
            "paint": {
                "circle-radius": 6,
                "circle-color": "#FFD704"
            }
        },
        // INACTIVE (static, already drawn)
        // line stroke
        {
            "id": "gl-draw-line-static",
            "type": "line",
            "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#FFD704",
                "line-dasharray": [1, 0],
                "line-width": 3
            }
        },
        // polygon fill
        {
            "id": "gl-draw-polygon-fill-static",
            "type": "fill",
            "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
            "paint": {
                "fill-color": "#FFD704",
                "fill-outline-color": "#FFD704",
                "fill-opacity": 0.1
            }
        },
        // polygon outline
        {
            "id": "gl-draw-polygon-stroke-static",
            "type": "line",
            "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "paint": {
                "line-color": "#FFD704",
                "line-dasharray": [1, 0],
                "line-width": 3
            }
        }
    ],
    defaultMode: 'draw_polygon',
});

map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

/* Delete last vertex drawn of polygon */
function removePop(last_vertex) {
    var list = draw.getAll().features[0].geometry.coordinates[0];
    coordinates = Object.values(list.reduce((p, c) => (p[JSON.stringify(c)] = c, p), {}));

    if (last_vertex == 0) {
        return;
    }

    if (coordinates.length <= 3) {
        renderPopup.remove();
        areaPopup.remove();
    }

    removePopup = new mapboxgl.Popup({ closeButton: false, className: "cancelPopup" })
        .setLngLat(coordinates[last_vertex])
        .setHTML(cancelPop)
        .on('open', e => {
            if (document.getElementById('cancelPopup')) {
                document.getElementById('cancelPopup')
                    .addEventListener('click', e => {
                        draw.trash();
                        removePopup.remove();
                        last_vertex = vertex - 2;

                        removePop(last_vertex);

                        vertex--;
                    });
            }
        })
        .addTo(map);
}

map.on('click', () => {
    if (draw.getMode() === "draw_polygon") {
        var list = draw.getAll().features[0].geometry.coordinates[0];
        coordinates = Object.values(list.reduce((p, c) => (p[JSON.stringify(c)] = c, p), {}));

        if (vertex) {
            removePopup = new mapboxgl.Popup({ closeButton: false, className: "cancelPopup" })
                .setLngLat(coordinates[vertex])
                .setHTML(cancelPop)
                .on('open', e => {
                    if (document.getElementById('cancelPopup')) {
                        document.getElementById('cancelPopup')
                            .addEventListener('click', e => {
                                draw.trash();
                                removePopup.remove();
                                last_vertex = vertex - 2;

                                removePop(last_vertex);

                                vertex--;
                            });
                    }
                })
                .addTo(map);
        }

        vertex++;
    }

});

map.on('click', () => {
    if (draw.getMode() === "draw_polygon") {
        const data = draw.getAll();
        const Id = draw.getAll().features[0].id;
        var list = draw.getAll().features[0].geometry.coordinates[0];
        var coordinates = Object.values(list.reduce((p, c) => (p[JSON.stringify(c)] = c, p), {}));
        const center = turf.center(data.features[data.features.length - 1]).geometry.coordinates;

        if (coordinates.length > 2) {
            var dimensions = utils.getDimensions(data, data.features[data.features.length - 1].geometry.coordinates);
            const updated_area = (dimensions[0] < 1000000) ? `${dimensions[0].toFixed(2)} m²`
                : `${(dimensions[0] / 1000000).toFixed(2)} km²`;

            // Add a popup to display area
            areaPopup = new mapboxgl.Popup({ closeButton: false, className: 'areaPopup' })
                .setLngLat(center)
                .setHTML(`surface: ${updated_area}`)
                .addTo(map)

            // Add a popup to render geometry
            renderPopup = new mapboxgl.Popup({ closeButton: false, className: "renderPopup" })
                .setLngLat(coordinates[0])
                .setHTML(renderPop)
                .on('open', e => {
                    if (document.getElementById('renderPopup')) {
                        document.getElementById('renderPopup')
                            .addEventListener('click', e => {
                                draw.changeMode('direct_select', { featureId: `${Id}` });
                                renderPopup.remove();
                                removePopup.remove();
                                areaPopup.remove();
                            })
                    }
                })
                .addTo(map)
        }
    }
});

function updateArea(e) {
    const data = draw.getAll();
    const coordinates = data.features[data.features.length - 1].geometry.coordinates;

    const center = turf.center(data.features[data.features.length - 1]).geometry.coordinates;

    if (data.features.length > 0) {
        var dimensions = utils.getDimensions(data, coordinates);

        var updated_area = (dimensions[0] < 1000000) ? `${dimensions[0].toFixed(2)} m²`
            : `${(dimensions[0] / 1000000).toFixed(2)} km²`;
        area_field.setAttribute('value', updated_area);

        var updated_perimeter = (dimensions[1] > 1) ? `${dimensions[1].toFixed(2)} km`
            : `${(dimensions[1] * 1000).toFixed(2)} m`;
        perimeter_field.setAttribute('value', updated_perimeter);

        coordinates_field.setAttribute('value', coordinates);

        center_field.setAttribute('value', center);
    }
}

map.on('mousemove', () => {
    var zoom = map.getZoom();
    zoom_field.setAttribute('value', zoom);
})

export { map };