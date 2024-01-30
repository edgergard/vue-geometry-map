<script setup lang="ts"> 
import { defineProps, defineEmits } from 'vue';
import { GeometryType } from '../types';

const props = defineProps({
  geometryType: String as () => GeometryType,
  buttonType: String,
});

const emit = defineEmits(['handleButtonClick']);

const handleButtonClick = () => {
  emit('handleButtonClick', props.buttonType);
};

const handleButtonCancel = () => {
  emit('handleButtonClick', '');
};
</script>

<template>
  <button
    v-if="geometryType !== buttonType"
    @click="handleButtonClick"
    class="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2 rounded transition-all"
  >
    Create {{ buttonType }}
  </button>
  <button
    v-else
    @click="handleButtonCancel"
    class="w-full bg-sky-800 hover:bg-sky-700 text-white font-medium px-4 py-2 rounded transition-all"
  >
    Cancel
  </button>
</template>