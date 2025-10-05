<template>

  <div class="outfit-editor">
    <div class="post-card" :style="{ backgroundColor: color }">
      <div class="current-outfit-editor">
        <div class="outfit-flex">
          <div v-for="(item, i) in outfit.clothes" :key="i" class="outfit-slot-wrapper" >
            <OutfitSlot :item="item" editable @select="removeItem(i)" />
            <button class="remove-btn" @click="removeItem(i)">✕</button>
          </div>

          <div class="outfit-slot-wrapper add-slot" @click="openSelector">+</div>
        </div>
      </div>
      <textarea v-model="caption" placeholder="Describe your outfit..." class="caption-input" />
      <div>
        <button class="submit-btn" @click="submitPost">Post Outfit</button>
        <button class="submit-btn" @click="submitPost">Post Outfit</button>
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

const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");

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

.add-slot {
  border: 2px dashed #666;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
}

.caption {
  margin: 0.5rem;
  width: 20rem;
  font-size: 0.9rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.outfit-editor {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  box-sizing: border-box;
}

.post-card {
  flex: 1;
  max-width: 45%; /* prevent it from being too wide */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  border: 0.2rem solid black;
  background-color: var(--background);
  box-sizing: border-box;
}

/* Outfit grid area inside postcard */
.current-outfit-editor {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  border: 0.2rem solid black;
  background-color: white;
  overflow: hidden;
}

</style>
