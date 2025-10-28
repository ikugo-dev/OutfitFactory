<template>
  <div class="outfit-slot" :class="{ clickable: editable }" @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false" @mousemove="updateTooltipPosition" @click="() =>
      handleClick(item!.url || '')">
    <img v-if="item?.image_url" :src="item.image_url" alt="clothing" />
    <div v-else class="empty-slot">
      <span v-if="editable">+</span>
    </div>

    <div v-if="!editable">
      <teleport to="body">
        <div v-if="showTooltip && item" class="hover-panel" :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }">
          <div class="info-row">- {{ item.name }} -</div>
          <div class="info-row">Category: {{ item.category }}</div>
          <div class="info-row">Gender: {{ item.gender }}</div>
          <div class="info-row">Brand: {{ item.brand }}</div>
          <div class="info-row">Color: {{ item.color }}</div>
          <div class="info-row">Material: {{ item.material }}</div>
          <div class="info-row">Price: {{ item.price }} RSD</div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { GarmentType } from "@/types";

const props = defineProps<{
  item?: GarmentType | null;
  editable?: boolean;
}>();

const emit = defineEmits<{
  (e: "select"): void;
}>();

const showTooltip = ref(false);
const tooltipX = ref(0);
const tooltipY = ref(0);

function handleClick(url: string) {
  props.editable
    ? emit("select")
    : url == ""
      ? window.open("https://sinsay.com", "_blank")
      : window.open(url, "_blank");
}

function updateTooltipPosition(e: MouseEvent) {
  tooltipX.value = e.clientX + 12;
  tooltipY.value = e.clientY + 12;
}
</script>

<style scoped>
.outfit-slot {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 0.2em solid black;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.outfit-slot.clickable:hover {
  transform: scale(1.05);
  filter: brightness(0.5);
  cursor: pointer;
}

.empty-slot {
  font-size: 2em;
  color: #999;
}

.hover-panel {
  position: fixed;
  border: 0.2rem solid black;
  background: var(--background);
  padding: 8px;
  z-index: 50;
  pointer-events: none;
}

.info-row {
  margin-bottom: 4px;
}
</style>
