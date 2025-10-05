<template>
  <div class="outfit-grid">
    <OutfitSlot
      v-for="(slot, i) in slots"
      :key="i"
      :item="outfit.clothes[i]"
      editable
      @select="openSelector(i)"
    />
  </div>

  <OutfitSelectionPanel
    v-if="selectedSlotIndex !== null"
    :category="slots[selectedSlotIndex].category"
    :brand="slots[selectedSlotIndex].brand || null"
    :availableColors="availableColors"
    @close="selectedSlotIndex = null"
    @selectArticle="selectItem"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import OutfitSlot from "@/components/OutfitSlot.vue";
import OutfitSelectionPanel from "@/components/OutfitSelectionPanel.vue";
import type { OutfitType, ArticleType } from "@/types";

const props = defineProps<{ modelValue: OutfitType }>();
const emit = defineEmits(["update:modelValue"]);

const outfit = ref<OutfitType>(props.modelValue);

const slots = [
  { label: "Top", category: "top" },
  { label: "Bottom", category: "bottom" },
  { label: "Shoes", category: "shoes" },
  { label: "Jacket", category: "jacket" },
  { label: "Accessory 1", category: "accessory", index: 0 },
  { label: "Accessory 2", category: "accessory", index: 1 },
];

const selectedSlotIndex = ref<number | null>(null);
const availableColors = ["Red","Blue","Green","Black","White","Yellow","Orange","Purple"];

function openSelector(index: number) {
  selectedSlotIndex.value = index;
}

function selectItem(article: ArticleType) {
  if (selectedSlotIndex.value === null) return;

  // Determine slot index and whether it's an accessory
  const slot = slots[selectedSlotIndex.value];

  if (slot.category === "accessory" && slot.index != null) {
    outfit.value.clothes[slot.index] = article;
  } else {
    outfit.value.clothes[selectedSlotIndex.value] = article;
  }

  emit("update:modelValue", outfit.value);
  selectedSlotIndex.value = null;
}
</script>

<style scoped>
.outfit-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
  width: 300px;
}
</style>
