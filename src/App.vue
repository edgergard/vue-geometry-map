<template>
  <div class="text-center">
    <MapComponent 
      :geometryType="geometryType" 
      @setGeometryType="setGeometryType"
      @getMapLayers="getMapLayers"
    />
    <FloatingButton @click="openDrawer" />
    <DrawerComponent
      :isOpen="isDrawerOpen"
      :geometryType="geometryType"
      :mapLayers="mapLayers"
      @closeDrawer="closeDrawer"
      @setGeometryType="setGeometryType"
    />
  </div>
</template>

<script setup lang="ts">
import MapComponent from './components/MapComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';
import FloatingButton from './components/FloatingButton.vue';
import { GeometryType, MapLayer } from './types'; 
import { ref } from 'vue';

const isDrawerOpen = ref(false);
const geometryType = ref<GeometryType>('');
const mapLayers = ref<MapLayer[]>([]);

const setGeometryType = (value: GeometryType) => {
  geometryType.value = value;
};

const openDrawer = () => {
  isDrawerOpen.value = true;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

const getMapLayers = (layers: MapLayer[]) => {
  mapLayers.value = layers;
};
</script>