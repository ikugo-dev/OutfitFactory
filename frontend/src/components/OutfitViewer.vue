<template>
  <div class="grid-wrapper">
    <div class="outfit-grid">
      <OutfitSlot
        v-for="(item, i) in filledSlots"
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

const props = defineProps<{ outfit: OutfitType }>();

const filledSlots = Array.from({ length: 6 }, (_, i) => props.outfit.clothes[i] || null);
</script>

<style scoped>
.grid-wrapper {
  width: 100%;
  overflow: hidden;
  margin: 0.5rem;
}

.outfit-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr; /* force equal rows */
  width: 100%;
  height: 100%;
  gap: 0.5rem;
}
</style>
