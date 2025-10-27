<template>
  <div class="garments-view">
    <h2>Search for garments</h2>
    <OutfitSelectionPanel :resultSize="2" @selectGarment="handleClick" />
  </div>
</template>

<script setup lang="ts">
import OutfitSelectionPanel from '@/components/OutfitSelectionPanel.vue'
import type { GarmentType } from '@/types';

const handleClick = (garment: GarmentType) => {
  garment.url == undefined
    ? window.open("https://sinsay.com", "_blank")
    : window.open(garment.url, "_blank");
}
</script>
