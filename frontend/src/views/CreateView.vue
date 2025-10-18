<template>
  <div class="create-view">
    <h2>Create a New Outfit</h2>
    <div class="outfit-editor">
      <div class="post-card" :style="{ backgroundColor: color }">
        <div class="current-outfit-editor">
          <div class="outfit-flex">
            <div v-for="(item, i) in garments" :key="i" class="outfit-slot-wrapper">
              <OutfitSlot :item="item" editable @select="removeItem(i)" />
            </div>

            <div class="outfit-slot-wrapper add-slot" @click="openSelector">+</div>
          </div>
        </div>
        <textarea v-model="caption" placeholder="Describe your outfit..." class="caption-input" />
        <div>
          <button class="submit-btn" @click="submitPost">Post Outfit</button>
          <!-- <button class="submit-btn" @click="submitPost">Post Outfit</button> -->
        </div>
      </div>
      <OutfitSelectionPanel v-if="isSelecting" @close="isSelecting = false" @selectGarment="addItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OutfitSlot from '@/components/OutfitSlot.vue'
import OutfitSelectionPanel from '@/components/OutfitSelectionPanel.vue'
import router from "@/router";
import { ref } from "vue";
import { createOutfit, addGarmentToOutfit, createPost } from "@/api/postApi.ts";
import { type GarmentType } from "@/types.ts";
const caption = ref("");
const garments = ref<GarmentType[]>([]);

const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");

const isSelecting = ref(false);
function openSelector() {
  isSelecting.value = true;
}

function addItem(garment: GarmentType) {
  garments.value.push(garment);
  isSelecting.value = false;
}

function removeItem(index: number) {
  garments.value.splice(index, 1);
}
async function submitPost() {
  if (garments.value.length <= 1) {
    alert("You must add at least two garments!");
    return;
  }

  try {
    const createdOutfit = await createOutfit();
    const outfitId = createdOutfit._id;
    for (const g of garments.value) {
      await addGarmentToOutfit(outfitId, g._id);
    }
    await createPost(caption.value, outfitId);

    console.log("Post created successfully!");
    router.push("/profile");
  } catch (err) {
    console.error(err);
    alert("Error creating post!");
  }
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
  max-width: 45%;
  /* prevent it from being too wide */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  border: 0.2rem solid black;
  box-sizing: border-box;
}

.current-outfit-editor {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  border: 0.2rem solid black;
  background-color: var(--background);
  overflow: hidden;
}
</style>
