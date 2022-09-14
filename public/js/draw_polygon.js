import { map } from "./mapbox.js";
import * as utils from './utils.js';

var cancelPop = "<button id='cancelPopup'>Annuler</button>";
var renderPop = "<button id='renderPopup'>Terminer</button>";
var vertex = 0, last_vertex = 0;
var coordinates, removePopup, renderPopup, areaPopup;

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
    defaultMode: 'draw_polygon'
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
});

map.on('click', () => {
    const data = draw.getAll();
    const Id = draw.getAll().features[0].id;
    var list = draw.getAll().features[0].geometry.coordinates[0];
    var coordinates = Object.values(list.reduce((p, c) => (p[JSON.stringify(c)] = c, p), {}));
    const center = turf.center(data.features[data.features.length - 1]).geometry.coordinates;

    if (coordinates.length > 2) {
        var dimensions = utils.getDimensions(data, data.features[data.features.length - 1].geometry.coordinates);
        const updated_area = (dimensions[0] < 1000) ? `${dimensions[0]} m²`
            : `${dimensions[0] / 1000000} km²`;

        // Add a popup to display surface
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

        const updated_area = (dimensions[0] < 1000) ? `${dimensions[0].toFixed(2)} m²`
            : `${(dimensions[0] / 1000000).toFixed(2)} km²`;
        area_field.setAttribute('value', updated_area);

        const updated_perimeter = (dimensions[1] > 1) ? `${dimensions[1].toFixed(2)} km`
            : `${(dimensions[1] * 1000).toFixed(2)} m`;
        perimeter_field.setAttribute('value', updated_perimeter);
    }
}

document.getElementById('zoom').value = localStorage.getItem('zoom');

export { map };