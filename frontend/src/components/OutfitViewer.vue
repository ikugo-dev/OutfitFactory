<template>
  <div v-if="garments.length != 0" class="grid-wrapper">
    <div class="outfit-flex">
      <OutfitSlot v-for="(item, i) in garments" :key="i" :item="item" :editable="false" />
    </div>
  </div>
  <div v-else>Loading outfit...</div>
</template>

<script setup lang="ts">
import OutfitSlot from "./OutfitSlot.vue";
import { ref, onMounted } from "vue";
import type { OutfitType, GarmentType } from "@/types";
import { fetchGarment } from "@/api/postApi.ts";

const props = defineProps<{ outfit: OutfitType }>();
const garments = ref<GarmentType[]>([]);

onMounted(async () => {
  // garments.value = await Promise.all(
  //   props.outfit.garments((id: string) => fetchGarment(id))
  // );
  garments.value = await Promise.all(
    props.outfit.garments.map(async (garment) => {
      return await fetchGarment(garment.toString());
    })
  );
});
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

.outfit-flex>* {
  flex: 0 0 calc(50% - 0.5rem);
  /* 2 columns */
  max-width: calc(50% - 0.5rem);
  aspect-ratio: 1 / 1;
}
</style>
