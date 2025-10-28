<template>
  <div class="panel">
    <div class="panel-header">
      <h4>Choose a garment</h4>
      <button class="btn-close" @click="$emit('close')">✕</button>
    </div>

    <form class="filters" @submit.prevent>
      <div class="filter-row">
        <label>Category</label>
        <select v-model="localFilters.category">
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
          <label><input type="radio" value="m" v-model="localFilters.gender" /> Male</label>
          <label><input type="radio" value="f" v-model="localFilters.gender" /> Female</label>
        </div>
      </div>

      <div class="filter-row">
        <label>Brand</label>
        <select v-model="localFilters.brand">
          <option value="">Any</option>
          <option value="Sinsay">Sinsay</option>
        </select>
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
        <button type="button" @click="applyFilters">Apply filter</button>
        <button type="button" @click="resetFilters">Reset</button>
      </div>
    </form>

    <div class="results">
      <div v-if="loading">Loading…</div>
      <div v-else-if="filteredGarments.length === 0">No items match.</div>

      <ul v-else class="items">
        <li v-for="a in filteredGarments" :key="a._id" class="item" @click="$emit('selectGarment', a);
        ">
          <div class="image">
            <img :src="a.image_url" alt="item image" />
          </div>
          <div class="info">
            <div class="name">{{ a.name }}</div>
            <div class="meta">
              {{ a.brand }} • {{ a.price }} RSD • {{ a.material }}
            </div>
            <div class="desc">
              <span>Color: {{ a.color }}</span>
              <span>Category: {{ a.category }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { GarmentType } from "@/types";
import { fetchAllGarments } from "@/api/postApi";
const { resultSize } = defineProps<{
  resultSize: number
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "selectGarment", article: GarmentType): void;
}>();

const localFilters = reactive({
  category: "",
  brand: "Sinsay",
  gender: "both",
  colorSubstr: "",
  materialSubstr: "",
  priceFrom: null as number | null,
  priceTo: null as number | null,
});

const availableCategories = ref<string[]>([
  "cipele",
  "dukserice",
  "dzemperi",
  "farmerke",
  "haljine-i-suknje",
  "jakne",
  "kacketi",
  "košulje",
  "majice",
  "naocare",
  "novcanici",
  "pantalone",
  "rukavice",
  "salovi",
  "sesiri",
  "šorc"
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
  const cat = localFilters.category.toLowerCase();
  const br = localFilters.brand.toLowerCase();
  const gender = localFilters.gender;

  filteredGarments.value = allGarments.value.filter((a) => {
    if (br && a.brand.toLowerCase() !== br) return false;
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
  localFilters.category = "";
  localFilters.brand = "Sinsay";
  filteredGarments.value = allGarments.value;
}


onMounted(() => {
  loadGarments();
});

</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34rem;
  border: 0.2rem solid black;
  padding: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.panel-header button {
  position: relative;
  left: 10rem;
}

form {
  width: 90%;
}

.filter-row {
  margin-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.results {
  background-color: white;
  width: v-bind(resultSize*32+"rem");
  overflow-y: auto;
}

.items {
  border: 0.2rem solid black;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(v-bind(resultSize), 1fr);
}

.item {
  display: flex;
  border: 1px solid #eee;
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

.gender-options>* {
  margin-right: 0.6rem;
}
</style>
