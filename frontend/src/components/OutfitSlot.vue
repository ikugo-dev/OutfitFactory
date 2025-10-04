<template>
  <div class="slot" @click="$emit('clickSlot')">
    <div class="slot-label">{{ label }}</div>
    <div v-if="article" class="article">
      <div class="thumb" :title="article.name">{{ article.name }}</div>
      <div class="meta">{{ article.brand }} • €{{ article.price }}</div>
    </div>
    <div v-else class="empty">Click to choose</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { ArticleType } from '../types';
defineProps({
  label: { type: String as PropType<string>, required: true },
  article: { type: Object as PropType<ArticleType | null>, default: null },
});
</script>

<style scoped>
.slot {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 8px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #fafafa;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}
.slot-label {
  position: absolute;
  margin-top: -20px;
  font-size: 12px;
  color: #666;
}
.empty {
  color: #777;
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
</style>
