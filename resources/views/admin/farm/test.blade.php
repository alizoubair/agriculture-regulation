< !DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <title>Measure distances</title>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css" rel="stylesheet">
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js"></script>
        <style>
            body {
                margin: 0;
                padding: 0;
            }

            #map {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 100%;
            }
        </style>
    </head>

    <body>
        <style>
            .distance-container {
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 1;
            }

            .distance-container>* {
                background - color: rgba(0, 0, 0, 0.5);
                color: #fff;
                font-size: 11px;
                line-height: 18px;
                display: block;
                margin: 0;
                padding: 5px 10px;
                border-radius: 3px;
            }
        </style>

        <div id="map"></div>
        <div id="distance" class="distance-container"></div>

        <script src="https://unpkg.com/@turf/turf@6/turf.min.js"></script>
        <script>
            // TO MAKE THE MAP APPEAR YOU MUST
            // ADD YOUR ACCESS TOKEN FROM
            // https://account.mapbox.com
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpem91YmFpciIsImEiOiJjbDZ3NG50N3AwY3k3M2VtZW82dWxtZXg1In0.yezx5Y9hGle2i6b_Rx46Rw';

            const map = new mapboxgl.Map({
                container: 'map',
                // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [2.3399, 48.8555],
                zoom: 12
            });

            const distanceContainer = document.getElementById('distance');

            // GeoJSON object to hold our measurement features
            const geojson = {
                'type': 'FeatureCollection',
                'features': []
            };

            // Used to draw a line between points
            const polygon = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': []
                }
            };

            map.on('load', () => {
                map.addSource('geojson', {
                    'type': 'geojson',
                    'data': geojson
                });

                // Add styles to the map
                map.addLayer({
                    id: 'measure-points',
                    type: 'circle',
                    source: 'geojson',
                    paint: {
                        'circle-radius': 5,
                        'circle-color': '#000'
                    },
                    filter: ['in', '$type', 'Point']
                });
                map.addLayer({
                    id: 'measure-lines',
                    type: 'line',
                    source: 'geojson',
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    },
                    paint: {
                        'line-color': '#000',
                        'line-width': 2.5
                    },
                    filter: ['in', '$type', 'LineString']
                });

                map.on('click', (e) => {
                    const features = map.queryRenderedFeatures(e.point, {
                        layers: ['measure-points']
                    });
                    console.log(features)
                    // Remove the linestring from the group



                    const point = {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [e.lngLat.lng, e.lngLat.lat]
                        },
                        'properties': {
                            'id': String(new Date().getTime())
                        }
                    };

                    geojson.features.push(point);

                    if (geojson.features.length > 1) {
                        polygon.geometry.coordinates = geojson.features.map(
                            (point) => point.geometry.coordinates
                        );

                        geojson.features.push(polygon);
                    }

                    
                    console.log(polygon);
                    map.getSource('geojson').setData(geojson);
                });
            });


            map.on('mousemove', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['measure-points']
                });
                // Change the cursor to a pointer when hovering over a point on the map.
                // Otherwise cursor is a crosshair.
                map.getCanvas().style.cursor = features.length
                    ? 'pointer'
                    : 'crosshair';
            });
        </script>

    </body>

    </html>