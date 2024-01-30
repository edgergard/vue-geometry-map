<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map, NavigationControl, Marker, SourceSpecification, LayerSpecification } from 'maplibre-gl';
import { onMounted, ref, defineProps, defineEmits, watch } from 'vue';
import { MapLayer } from '../types';

const mapLayers = ref<Array<MapLayer>>([]);
const linesCoords = ref<Array<Array<number[]>>>([]);
const polygonsCoords = ref<Array<Array<number[]>>>([]);

const props = defineProps({
  geometryType: String,
});

const emit = defineEmits([
  'setGeometryType', 
  'getMapLayers',
]);

watch(() => props.geometryType, (newGeometryType) => {
  if (newGeometryType === 'Line') {
    const lastLineCoords = linesCoords.value[linesCoords.value.length - 1];

    if (!lastLineCoords || (lastLineCoords.length > 0)) {
      linesCoords.value.push([]);
    }
  }

  if (newGeometryType === 'Polygon') {
    const lastPolygonCoords = polygonsCoords.value[polygonsCoords.value.length - 1];

    if (!lastPolygonCoords || (lastPolygonCoords.length > 0)) {
      polygonsCoords.value.push([]);
    }
  }
});

onMounted(() => {
  const apiKey = 'ojE3qjhytNY1Upz18Qr1';
  const initialState = { lng: 31.8268194584739, lat: 49.35393019697908, zoom: 6 };

  const map = new Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  });

  map.addControl(
    new NavigationControl({
      visualizePitch: true
    })
  );
  
  map.on('click', (e) => {
    switch (props.geometryType) {
      case 'Marker': {
        const marker = new Marker({ color: 'red' })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(map);

        const markerCoordinates = marker.getLngLat();

        const markerGeoJSON = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [markerCoordinates.lng, markerCoordinates.lat]
          },
          properties: {
            id: mapLayers.value.length + 1,
            type: 'Marker',
            color: 'red'
          }
        };

        mapLayers.value.push(markerGeoJSON);
        getMapLayers();
        emit('setGeometryType', '');
        break;
      }

      case 'Line': {
        const currentLineCoords = linesCoords.value[linesCoords.value.length - 1];
        const linePoint = [e.lngLat.lng, e.lngLat.lat];

        currentLineCoords.push(linePoint);
        updateLines();
        break;
      }

      case 'Polygon': {
        const currentPolygonsCoords = polygonsCoords.value[polygonsCoords.value.length - 1];
        const polygonPoint = [e.lngLat.lng, e.lngLat.lat];
  
        currentPolygonsCoords.push(polygonPoint);
        updatePolygons();
        break;
      }

      default: {
        return;
      }
    }
  });

  function getMapLayers() {
    emit('getMapLayers', mapLayers);
  };

  function updateLines() {
    linesCoords.value.forEach((lineCoords, index) => {
      const layerId = `line-${index + 1}`;

      const features = [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: lineCoords
        }
      }];

      if (!map.getLayer(layerId)) {
        const source = {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': features
          }
        };

        const layer = {
          'id': layerId,
          'type': 'line',
          'source': layerId,
          'layout': {
            'line-join': 'round',
            'line-cap': 'round',
          },
          'paint': {
            'line-color': 'red',
            'line-width': 8,
            'line-opacity': 0.6
          }
        };

        const lineGeoJSON = {
          type: 'Feature',
          geometry: {
            type: 'Line',
            coordinates: lineCoords[lineCoords.length - 1]
          },
          properties: {
            id: mapLayers.value.length + 1,
            type: 'Line',
            color: 'red'
          }
        };

        map.addSource(layerId, source as SourceSpecification);
        map.addLayer(layer as LayerSpecification);
        mapLayers.value.push(lineGeoJSON);
        getMapLayers();
      } else {
        mapLayers.value[mapLayers.value.length - 1].geometry.coordinates = lineCoords;
        const source = map.getSource(layerId) as maplibregl.GeoJSONSource;

        if (source) {
          source.setData({
            'type': 'FeatureCollection',
            'features': features as any,
          });
        };
      }
    });
  }

  function updatePolygons() {
    polygonsCoords.value.forEach((polygonCoords, index) => {
      const layerId = `polygon-${index + 1}`;
      
      const features = [{
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'Polygon',
          'coordinates': [polygonCoords]
        }
      }];

      if (!map.getLayer(layerId)) {
        const source = {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': features
          }
        };

        const layer = {
          'id': layerId,
          'type': 'fill',
          'source': layerId,
          'layout': {},
          'paint': {
            'fill-color': '#ff0000',
            'fill-opacity': 0.6
          }
        };

        const polygonGeoJSON = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: polygonCoords[polygonCoords.length - 1]
          },
          properties: {
            id: mapLayers.value.length + 1,
            type: 'Polygon',
            color: 'red'
          }
        };

        map.addSource(layerId, source as SourceSpecification);
        map.addLayer(layer as LayerSpecification);
        mapLayers.value.push(polygonGeoJSON);
        getMapLayers();
      } else {
        mapLayers.value[mapLayers.value.length - 1].geometry.coordinates = polygonCoords;
        const source = map.getSource(layerId) as maplibregl.GeoJSONSource;

        if (source) {
          source.setData({
            'type': 'FeatureCollection',
            'features': features as any,
          });
        };
      }
  });
}
});
</script>

<template>
  <div id="map" class="h-screen" />
</template>