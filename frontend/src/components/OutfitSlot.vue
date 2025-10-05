<template>
  <div
    class="outfit-slot"
    :class="{ clickable: editable }"
    @click="handleClick"
  >
    <img v-if="item?.imageUrl" :src="item.imageUrl" alt="clothing"/>
    <div v-else class="empty-slot">
      <span v-if="editable">+</span>
    </div>

    <!-- Hover info panel -->
    <div v-if="item" class="hover-panel">
      <div class="info-row"><strong>{{ item.name }}</strong></div>
      <div class="info-row">Brand: {{ item.brand }}</div>
      <div class="info-row">Price: €{{ item.price }}</div>
      <div class="info-row">Material: {{ item.material }}</div>
      <div class="info-row">
        Colors:
        <span v-for="c in item.color" :key="c" class="chip">{{ c }}</span>
      </div>
      <div class="info-row">Gender: {{ item.gender }}</div>
      <div class="info-row">Category: {{ item.category }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { ArticleType } from "@/types";

const props = defineProps<{
  item?: ArticleType | null;
  editable?: boolean;
}>();

const emit = defineEmits<{
  (e: "select"): void;
}>();

function handleClick() {
  if (props.editable) emit("select");
}
</script>

<style scoped>
.outfit-slot {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 2px solid blue;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.outfit-slot.clickable:hover {
  transform: scale(1.03);
  cursor: pointer;
  background: #f0f0f0;
}

/* Hover info panel */
.hover-panel {
  position: absolute;
  top: 0;
  left: 110%;
  border: 0.2rem solid black;
  width: 200px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  z-index: 50;
  display: none;
}

.outfit-slot:hover .hover-panel {
  display: block;
}

.info-row {
  margin-bottom: 4px;
}

.chip {
  display: inline-block;
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 999px;
  margin-right: 4px;
  font-size: 10px;
}
</style>
