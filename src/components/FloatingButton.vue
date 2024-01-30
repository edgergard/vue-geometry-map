<script setup lang="ts"> 
import { PlusIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <button 
    class="
      fixed bottom-4 right-0 m-4 bg-white hover:bg-gray-200 transition-all
      text-neutral-900 font-bold px-2 py-2 rounded-full"
  >
    <PlusIcon class="w-10 h-10" />
  </button>
</template>