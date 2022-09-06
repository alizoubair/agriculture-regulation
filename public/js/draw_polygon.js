import {map} from "./mapbox.js";
import * as utils from './utils.js';

utils.fitView();

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

function updateArea(e) {
    const data = draw.getAll();
    const area_field = document.getElementById('calculated-area');
    const perimeter_field = document.getElementById('calculated-perimeter');

    const coordinates = data.features[data.features.length - 1].geometry.coordinates;
    console.log(coordinates);
    // Set center of the polygon
    const center = turf.center(data.features[data.features.length - 1]).geometry.coordinates;

    const inputCenter = document.getElementById('center');
    inputCenter.value = center;

    const Inputcoordinates = document.getElementById('coordinates');
    Inputcoordinates.value = coordinates;
    
    if (data.features.length > 0) {
        const area = turf.area(data);

        const line = turf.lineString(coordinates[0]);
        const perimeter = turf.length(line);


        // Restrict the area and perimeter to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        const rounded_perimeter = Math.round(perimeter * 100) / 100;

        area_field.placeholder = `${rounded_area} m`;
        area_field.setAttribute('value', rounded_area);
        perimeter_field.placeholder = `${rounded_perimeter} m`;
        perimeter_field.setAttribute('value', rounded_perimeter);
    } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
            alert('Click the map to draw a polygon.');
    }
}

document.getElementById('zoom').value = localStorage.getItem('zoom');

export {map};