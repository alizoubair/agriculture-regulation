import { map } from "./mapbox.js";
import * as utils from './utils.js';

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
        trash: true
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    defaultMode: 'draw_polygon'
});

map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

/* Delete last vertex drawn of polygon */
var cancelPop = "<button id='cancelPopup'>Annuler</button>"
var renderPop = "<button id='renderPopup'>Terminer</button>"
let vertex = 0;
var popup;
var is_same = false;
var last_vertex = 0;

map.on('click', (e) => {
    var list = draw.getAll().features[0].geometry.coordinates[0];
    var coords = Object.values(list.reduce((p, c) => (p[JSON.stringify(c)] = c, p), {}));

    if (vertex) {
        popup = new mapboxgl.Popup({ closeButton: false, className: "cancelPopup" })
            .setLngLat(coords[vertex])
            .setHTML(cancelPop)
            .on('open', e => {
                if (document.getElementById('cancelPopup')) {
                    document.getElementById('cancelPopup')
                        .addEventListener('click', e => {
                            draw.trash();
                            popup.remove();
                            var last_vertex = vertex - 2;

                            popup = new mapboxgl.Popup({ closeButton: false, className: "cancelPopup" })
                                .setLngLat(coords[last_vertex])
                                .setHTML(cancelPop)
                                .on('open', e => {
                                    if (document.getElementById('cancelPopup')) {
                                        document.getElementById('cancelPopup')
                                            .addEventListener('click', e => {
                                                draw.trash();
                                                popup.remove();
                                                last_vertex = vertex - 2;

                                                popup = new mapboxgl.Popup({ closeButton: false, className: "cancelPopup" })
                                                    .setLngLat(coords[last_vertex])
                                                    .setHTML(cancelPop)
                                                    .on('open', e => {
                                                        if (document.getElementById('cancelPopup')) {
                                                            document.getElementById('cancelPopup')
                                                                .addEventListener('click', e => {
                                                                    draw.trash();
                                                                    popup.remove();
                                                                    last_vertex = vertex - 2;

                                                                    vertex--;
                                                                });
                                                        }
                                                    })
                                                    .addTo(map);

                                                vertex--;
                                            });
                                    }
                                })
                                .addTo(map);

                            vertex--;
                        });
                }
            })
            .addTo(map);
    }
    vertex++;
});

map.on('click', () => {
    const data = draw.getAll();
    const Id = draw.getAll().features[0].id;
    var list = draw.getAll().features[0].geometry.coordinates[0];
    var coords = Object.values(list.reduce((p, c) => (p[JSON.stringify(c)] = c, p), {}));
    const center = turf.center(data.features[data.features.length - 1]).geometry.coordinates;

    if (coords.length > 2) {
        var dimensions = utils.getDimensions(data, data.features[data.features.length - 1].geometry.coordinates);
        const updated_area = (dimensions[0] < 1000) ? `${dimensions[0]} m²`
            : `${dimensions[0] / 1000000} km²`;
console.log(dimensions[0])
console.log(updated_area)
        // Add a popup to display surface
        new mapboxgl.Popup({ closeButton: false, className: 'area' })
            .setLngLat(center)
            .setHTML(`surface: ${updated_area}`)
            .addTo(map)

        // Add a popup to render geometry
        new mapboxgl.Popup({ closeButton: false, className: "renderPopup" })
            .setLngLat(coords[0])
            .setHTML(renderPop)
            .on('open', e => {
                if (document.getElementById('renderPopup')) {
                    document.getElementById('renderPopup')
                        .addEventListener('click', e => {
                            draw.changeMode('direct_select', { featureId: `${Id}` });
                        })
                }
            })
            .addTo(map)
    }
});

function updateArea(e) {
    const data = draw.getAll();
    const area_field = document.getElementById('calculated-area');
    const perimeter_field = document.getElementById('calculated-perimeter');
    const coordinates = data.features[data.features.length - 1].geometry.coordinates;

    // Set center of the polygon
    const center = turf.center(data.features[data.features.length - 1]).geometry.coordinates;

    const inputCenter = document.getElementById('center');
    inputCenter.value = center;

    const Inputcoordinates = document.getElementById('coordinates');
    Inputcoordinates.value = coordinates;

    if (data.features.length > 0) {
        const dimensions = utils.getDimensions(data, coordinates);

        const updated_area = (dimensions[0] < 1000) ? `${dimensions[0]} m²`
            : `${dimensions[0] / 1000000} km²`;
        area_field.setAttribute('value', updated_area);

        const updated_perimeter = (dimensions[1] > 1) ? `${dimensions[1]} km`
            : `${dimensions[1] * 1000} m`;
        perimeter_field.setAttribute('value', updated_perimeter);
    }
}

document.getElementById('zoom').value = localStorage.getItem('zoom');

export { map };