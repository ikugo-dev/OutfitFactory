<template>
  <div v-if="loaded" class="grid-wrapper">
    <div class="outfit-flex">
      <OutfitSlot
        v-for="(item, i) in garments"
        :key="i"
        :item="item"
        :editable="false"
      />
    </div>
  </div>
  <div v-else>Loading outfit...</div>
</template>

<script setup lang="ts">
import OutfitSlot from "./OutfitSlot.vue";
import { ref, onMounted, watch } from "vue";
import type { OutfitType, GarmentType } from "@/types";
import { fetchGarment } from "@/api.ts";

const props = defineProps<{ outfit: OutfitType }>();
const garments = ref<GarmentType[]>([]);
const loaded = ref(false);

onMounted(async () => {
  if (!props.outfit || !props.outfit.garments) return;

  // Fetch each garment object by ID
  garments.value = await Promise.all(
    props.outfit.garments.map((id: string) => fetchGarment(id))
  );

  loaded.value = true;
});

// Optional: if outfit can change after mount
watch(
  () => props.outfit,
  async (newOutfit) => {
    if (!newOutfit || !newOutfit.garments) return;
    loaded.value = false;
    garments.value = await Promise.all(
      newOutfit.garments.map((id: string) => fetchGarment(id))
    );
    loaded.value = true;
  },
  { deep: true }
);
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
