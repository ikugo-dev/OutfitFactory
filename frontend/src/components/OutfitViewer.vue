<template>
  <div class="grid-wrapper">
    <div class="outfit-flex">
      <OutfitSlot
        v-for="(item, i) in outfit.clothes"
        :key="i"
        :item="item"
        :editable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OutfitType } from "@/types";
import OutfitSlot from "@/components/OutfitSlot.vue";
defineProps<{
  outfit: OutfitType
}>();
</script>

<style scoped>
.outfit-viewer {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0.5rem;
  overflow: hidden;
}

.outfit-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.outfit-flex > * {
  flex: 0 0 calc(50% - 0.5rem); /* 2 columns */
  max-width: calc(50% - 0.5rem);
  aspect-ratio: 1 / 1;
}
</style>
