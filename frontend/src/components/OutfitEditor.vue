<template>
  <div class="outfit-editor">
    <div class="grid-and-preview">
      <div class="outfit-grid">
        <OutfitSlot
          v-for="slot in slots"
          :key="slot.key"
          :label="slot.label"
          :article="outfitSlots[slot.key]"
          @clickSlot="openSelection(slot.key, slot.category)"
        />
      </div>
    </div>

    <SelectionPanel
      v-if="isPanelOpen"
      :category="activeCategory"
      :brand="brand"
      :availableColors="availableColors"
      :initialFilters="filters"
      @close="closePanel"
      @selectArticle="handleSelectArticle"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { ArticleType } from '../types';
import OutfitSlot from './OutfitSlot.vue';
import SelectionPanel from './SelectionPanel.vue';

const slots = [
  { key: 'top', label: 'Top', category: 'top' },
  { key: 'bottom', label: 'Bottom', category: 'bottom' },
  { key: 'shoes', label: 'Shoes', category: 'shoes' },
  { key: 'jacket', label: 'Jacket', category: 'jacket' },
  { key: 'accessory1', label: 'Accessory 1', category: 'accessory' },
  { key: 'accessory2', label: 'Accessory 2', category: 'accessory' },
] as const;

type SlotKey = typeof slots[number]['key'];

const outfitSlots = reactive<Record<string, ArticleType | null>>({
  top: null,
  bottom: null,
  shoes: null,
  jacket: null,
  accessory1: null,
  accessory2: null,
});

const isPanelOpen = ref(false);
const activeSlot = ref<SlotKey | null>(null);
const activeCategory = ref<string | null>(null);

// simple shared filters initial values
const filters = reactive({
  genders: ['male', 'female'], // both checked by default
  materialSubstr: '',
  priceFrom: null as number | null,
  priceTo: null as number | null,
  colors: [] as string[],
});

// brand is locked to BrandA (per your instruction)
const brand = 'BrandA';

// expected color list
const availableColors = ['red','green','blue','black','white','brown','yellow'];

function openSelection(slotKey: SlotKey, category: string) {
  activeSlot.value = slotKey;
  activeCategory.value = category;
  isPanelOpen.value = true;
}

function closePanel() {
  isPanelOpen.value = false;
  activeSlot.value = null;
  activeCategory.value = null;
}

function handleSelectArticle(article: ArticleType) {
  if (!activeSlot.value) return;
  outfitSlots[activeSlot.value] = article;
  closePanel();
}

// expose for debugging (dev)
(window as any).__outfitSlots = outfitSlots;
</script>

<style scoped>
.outfit-editor {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

/* grid area (left) */
.outfit-grid {
  display: grid;
  grid-template-columns: repeat(2, 180px);
  grid-template-rows: repeat(3, 140px);
  gap: 12px;
  padding: 8px;
}

/* let SelectionPanel be to the right; it has its own styles */
</style>
