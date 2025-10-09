<template>
  <aside class="panel">
    <div class="panel-header">
      <h4>Choose a garment</h4>
      <button class="btn-close" @click="$emit('close')">✕</button>
    </div>

    <form class="filters" @submit.prevent>
      <div class="filter-row">
        <label>Category</label>
        <select v-model="selectedCategory">
          <option value="">Any</option>
          <option v-for="cat in availableCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="filter-row">
        <label>Gender</label>
        <div class="gender-options">
          <label><input type="radio" value="both" v-model="localFilters.gender" /> Both</label>
          <label><input type="radio" value="male" v-model="localFilters.gender" /> Male</label>
          <label><input type="radio" value="female" v-model="localFilters.gender" /> Female</label>
        </div>
      </div>

      <div class="filter-row">
        <label>Brand</label>
        <div class="brand-label">{{ brand || '—' }}</div>
      </div>

      <div class="filter-row">
        <label>Color</label>
        <input v-model="localFilters.colorSubstr" placeholder="type the color..." />
      </div>

      <div class="filter-row">
        <label>Material</label>
        <input v-model="localFilters.materialSubstr" placeholder="type the material..." />
      </div>

      <div class="filter-row price-row">
        <label>Price</label>
        <div>
          <input type="number" v-model.number="localFilters.priceFrom" placeholder="from" />
          <input type="number" v-model.number="localFilters.priceTo" placeholder="to" />
        </div>
      </div>

      <div class="filter-row actions">
        <button type="button" @click="applyFilters">Apply</button>
        <button type="button" @click="resetFilters">Reset</button>
      </div>
    </form>

    <div class="results">
      <div v-if="loading">Loading…</div>
      <div v-else-if="filteredGarments.length === 0">No items match.</div>

      <ul v-else class="items">
        <li v-for="a in filteredGarments" :key="a.id" class="item" @click="select(a)">
          <div class="image">
            <img :src="a.image_url" alt="item image" />
          </div>
          <div class="info">
            <div class="name">{{ a.name }}</div>
            <div class="meta">
              {{ a.brand }} • €{{ a.price }} • {{ a.material }}
            </div>
            <div class="desc">
              <span>Color: {{ a.color }}</span>
              <span>Category: {{ a.category }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import type { GarmentType } from "@/types";
import { fetchAllGarments } from "@/api";

const props = defineProps<{
  brand?: string | null;
  category?: string | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "selectGarment", article: GarmentType): void;
}>();

const brand = props.brand ?? "";

const localFilters = reactive({
  gender: "both",
  colorSubstr: "",
  materialSubstr: "",
  priceFrom: null as number | null,
  priceTo: null as number | null,
});

const selectedCategory = ref(props.category ?? "");
const availableCategories = ref<string[]>([
  "top",
  "bottom",
  "shoes",
  "outerwear",
  "accessories",
]);

const allGarments = ref<GarmentType[]>([]);
const filteredGarments = ref<GarmentType[]>([]);
const loading = ref(false);

async function loadGarments() {
  loading.value = true;
  allGarments.value = await fetchAllGarments();
  filteredGarments.value = allGarments.value;
  loading.value = false;
}


function applyFilters() {
  loading.value = true;

  const material = localFilters.materialSubstr.trim().toLowerCase();
  const color = localFilters.colorSubstr.trim().toLowerCase();
  const from = localFilters.priceFrom;
  const to = localFilters.priceTo;
  const cat = selectedCategory.value.toLowerCase();
  const br = brand;
  const gender = localFilters.gender;

  filteredGarments.value = allGarments.value.filter((a) => {
    if (br && a.brand !== br) return false;
    if (cat && a.category.toLowerCase() !== cat) return false;
    if (gender !== "both" && a.gender.toLowerCase() !== gender) return false;
    if (material && !a.material.toLowerCase().includes(material)) return false;
    if (color && !a.color.toLowerCase().includes(color)) return false;
    if (from != null && a.price < from) return false;
    if (to != null && a.price > to) return false;
    return true;
  });

  loading.value = false;
}

function resetFilters() {
  localFilters.materialSubstr = "";
  localFilters.colorSubstr = "";
  localFilters.priceFrom = null;
  localFilters.priceTo = null;
  selectedCategory.value = "";
  filteredGarments.value = allGarments.value;
}

function select(article: GarmentType) {
  emit("selectGarment", article);
}

onMounted(() => {
  loadGarments();
});

watch(
  () => props.category,
  (val) => {
    if (val !== undefined && val !== null) {
      selectedCategory.value = val;
      applyFilters();
    }
  }
);
</script>

<style scoped>
.panel {
  width: 34rem;
  border: 0.2rem solid black;
  padding: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  border: 0;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.filters {
  margin-top: 8px;
}

.filter-row {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.brand-label {
  color: #777;
  font-size: 14px;
  background: #f7f7f7;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 6px;
}

.price-row input {
  width: 48%;
  margin-right: 4%;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.actions button {
  padding: 6px 10px;
  cursor: pointer;
}

.results {
  margin-top: 12px;
  max-height: 480px;
  overflow-y: auto;
}

.items {
  border: 0.2rem solid black;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  display: flex;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: background 0.2s;
}

.item:hover {
  background: #fafafa;
}

.image {
  width: 50%;
  aspect-ratio: 1 / 1;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* keeps full image visible, no cropping */
}

.info {
  width: 50%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info .name {
  font-weight: 600;
  margin-bottom: 4px;
}

.meta {
  font-size: 12px;
  color: #666;
}

.desc {
  margin-top: 6px;
  font-size: 12px;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
