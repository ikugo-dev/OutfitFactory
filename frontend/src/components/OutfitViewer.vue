<template>
  <div class="outfit-viewer">
    <div class="outfit-grid">
      <div
        v-for="slot in slots"
        :key="slot.key"
        class="slot"
      >
        <div class="slot-label">{{ slot.label }}</div>

        <div v-if="articleFor(slot.category, slot.index)" class="article">
          <div class="thumb">{{ articleFor(slot.category, slot.index)?.name }}</div>
          <div class="meta">
            {{ articleFor(slot.category, slot.index)?.brand }}
            • €{{ articleFor(slot.category, slot.index)?.price }}
          </div>
        </div>

        <div v-else class="empty">Empty</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OutfitType } from '../types';
defineProps<{
  outfit: OutfitType | undefined;
}>();

// fixed layout
const slots = [
  { key: 'top', label: 'Top', category: 'top' },
  { key: 'jacket', label: 'Jacket', category: 'jacket' },
  { key: 'bottom', label: 'Bottom', category: 'bottom' },
  { key: 'accessory1', label: 'Accessory 1', category: 'accessory', index: 0 },
  { key: 'shoes', label: 'Shoes', category: 'shoes' },
  { key: 'accessory2', label: 'Accessory 2', category: 'accessory', index: 1 },
];

// helper: returns the outfit’s article matching category (+index for accessories)
function articleFor(category: string, index?: number) {
  if (!__props.outfit) return null;
  const articles = __props.outfit.clothes.filter(c => c.category === category);
  if (category === 'accessory' && index != null) return articles[index] ?? null;
  return articles[0] ?? null;
}
</script>

<style scoped>
.outfit-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.outfit-grid {
  display: grid;
  grid-template-columns: repeat(2, 180px);
  grid-template-rows: repeat(3, 140px);
  gap: 12px;
}
.slot {
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background:#fefefe;
}
.slot-label {
  position: absolute;
  margin-top: -20px;
  font-size: 12px;
  color: #666;
}
.article .thumb {
  font-size: 14px;
  padding: 8px;
  border-radius: 6px;
  background: linear-gradient(135deg, #fff, #eee);
  min-width: 120px;
  text-align:center;
}
.meta {
  font-size: 12px;
  color: #444;
  margin-top: 6px;
}
.empty {
  color: #aaa;
  font-size: 13px;
}
</style>
