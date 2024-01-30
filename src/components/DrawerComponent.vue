<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { defineProps, defineEmits } from 'vue';
import DrawerButton from './DrawerButton.vue';
import GeometryList from './GeometryList.vue';
import { GeometryType, MapLayer } from '../types';

const props = defineProps({
  isOpen: Boolean,
  geometryType: String as () => GeometryType,
  mapLayers: Array as () => MapLayer[],
});

const emit = defineEmits([
  'closeDrawer', 
  'setGeometryType',
]);

const closeDrawer = () => {
  emit('closeDrawer');
  console.log('111');
};

const handleButtonClick = (geometryType: string) => {
  emit('setGeometryType', geometryType);
};

</script>

<template>
  <div
    v-if="isOpen"
    class="
      fixed top-0 right-0 w-[350px] h-full 
      bg-white text-black box-border z-10 pt-5 px-4"
  >
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-3xl font-bold">Menu</h1>
      <button 
        @click="closeDrawer"
        class="w-10 h-10 hover:bg-gray-200 rounded-full transition-all"
      >
        <XMarkIcon />
      </button>
    </div>
    <div class="flex flex-col flex-wrap gap-4 mb-6">
      <DrawerButton 
        :geometryType="geometryType"
        :buttonType="'Marker'"
        @handleButtonClick="handleButtonClick"
      />

      <DrawerButton 
        :geometryType="geometryType"
        :buttonType="'Line'"
        @handleButtonClick="handleButtonClick"
      />

      <DrawerButton 
        :geometryType="geometryType"
        :buttonType="'Polygon'"
        @handleButtonClick="handleButtonClick"
      />
    </div>

    <GeometryList :mapLayers="mapLayers"/>
  </div>
</template>