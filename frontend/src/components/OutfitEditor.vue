<template>
  <div class="outfit-editor">
    <div class="outfit-flex">
      <div
        v-for="(item, i) in outfit.clothes"
        :key="i"
        class="outfit-slot-wrapper"
      >
        <OutfitSlot :item="item" editable @select="removeItem(i)" />
        <button class="remove-btn" @click="removeItem(i)">✕</button>
      </div>

      <!-- Add button slot -->
      <div class="outfit-slot-wrapper add-slot" @click="openSelector">
        <div class="add-btn">+</div>
      </div>
    </div>

    <OutfitSelectionPanel
      v-if="isSelecting"
      @close="isSelecting = false"
      @selectArticle="addItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import OutfitSlot from "./OutfitSlot.vue";
import OutfitSelectionPanel from "./OutfitSelectionPanel.vue";
import type { OutfitType, ArticleType } from "@/types";

const props = defineProps<{ modelValue: OutfitType }>();
const emit = defineEmits(["update:modelValue"]);

const outfit = ref<OutfitType>(props.modelValue);
const isSelecting = ref(false);

function openSelector() {
  isSelecting.value = true;
}

function addItem(article: ArticleType) {
  outfit.value.clothes.push(article);
  emit("update:modelValue", outfit.value);
  isSelecting.value = false;
}

function removeItem(index: number) {
  outfit.value.clothes.splice(index, 1);
  emit("update:modelValue", outfit.value);
}
</script>

<style scoped>
.outfit-editor {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.outfit-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
}

.outfit-slot-wrapper {
  position: relative;
  flex: 1 1 calc(50% - 0.5rem);
  max-width: calc(50% - 0.5rem);
  aspect-ratio: 1 / 1;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.8rem;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-slot {
  border: 2px dashed #666;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.add-btn {
  font-size: 2rem;
  font-weight: bold;
}
</style>
