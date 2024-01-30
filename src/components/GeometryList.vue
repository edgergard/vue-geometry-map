<script setup lang="ts">
import { defineProps } from 'vue';
import { MapLayer } from '../types';

const props = defineProps({
  mapLayers: Array as () => MapLayer[],
});

const downloadGeoJSON = (layer: MapLayer) => {
  const blob = new Blob([JSON.stringify(layer, null, 2)], { type: 'application/json' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `layer_${layer.properties.id}.geojson`;
  link.click();
  URL.revokeObjectURL(link.href);
};

</script>

<template>
  <ul class="flex flex-col gap-y-4 h-[580px] overflow-y-auto no-scrollbar">
    <li v-for="layer in mapLayers?.value || []" :key="layer.properties.id">
      <div class="
        flex flex-col items-start gap-y-2 w-full py-2 px-4 
      bg-gray-100 rounded-xl border-2 border-sky-400">
        <p class="font-bold text-xl">
          Type: {{ layer.properties.type }}
        </p>

        <button 
          @click="downloadGeoJSON(layer)"
          class="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded transition-all"
        >
          Download .GEOJSON
        </button>
      </div>
    </li>
  </ul>
</template>
