<template>
  <aside class="panel">
    <div class="panel-header">
      <h4>Choose item ({{ category || 'any' }})</h4>
      <button class="btn-close" @click="$emit('close')">✕</button>
    </div>

    <form class="filters" @submit.prevent>
      <div class="filter-row">
        <label>Gender</label>
        <div>
          <label><input type="checkbox" value="male" v-model="localFilters.genders" /> Male</label>
          <label><input type="checkbox" value="female" v-model="localFilters.genders" /> Female</label>
        </div>
      </div>

      <div class="filter-row">
        <label>Brand</label>
        <div><input type="text" :value="brand" disabled class="brand-input"/></div>
      </div>

      <div class="filter-row">
        <label>Material</label>
        <input v-model="localFilters.materialSubstr" placeholder="type material..." />
      </div>

      <div class="filter-row">
        <label>Price</label>
        <div class="price-row">
          <input type="number" v-model.number="localFilters.priceFrom" placeholder="from" />
          <input type="number" v-model.number="localFilters.priceTo" placeholder="to" />
        </div>
      </div>

      <div class="filter-row">
        <label>Colors</label>
        <div class="colors">
          <label v-for="c in availableColors" :key="c">
            <input type="checkbox" :value="c" v-model="localFilters.colors" /> {{ c }}
          </label>
        </div>
      </div>

      <div class="filter-row actions">
        <button type="button" @click="applyFilters">Apply</button>
        <button type="button" @click="resetFilters">Reset</button>
      </div>
    </form>

    <div class="results">
      <div v-if="loading">Loading…</div>
      <div v-if="!loading && filteredArticles.length === 0">No items match.</div>

      <ul class="items">
        <li v-for="a in filteredArticles" :key="a.id" class="item" @click="select(a)">
          <div class="image-placeholder">{{ a.category }}</div>
          <div class="info">
            <div class="name">{{ a.name }}</div>
            <div class="meta">{{ a.brand }} • €{{ a.price }} • {{ a.material }}</div>
            <div class="colors-list">
              <span v-for="col in a.color" :key="col" class="chip">{{ col }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, reactive, toRefs, onMounted } from 'vue';
import type { ArticleType } from '../types';
import { fetchAllArticles } from '../fakeData.ts';

const props = defineProps<{
  category?: string | null;
  brand?: string | null;
  availableColors: string[];
  initialFilters?: {
    genders?: string[];
    materialSubstr?: string;
    priceFrom?: number | null;
    priceTo?: number | null;
    colors?: string[];
  }
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'selectArticle', article: ArticleType): void;
}>();

const brand = props.brand ?? '';

const localFilters = reactive({
  genders: props.initialFilters?.genders ? [...props.initialFilters.genders] : ['male', 'female'],
  materialSubstr: props.initialFilters?.materialSubstr ?? '',
  priceFrom: props.initialFilters?.priceFrom ?? null,
  priceTo: props.initialFilters?.priceTo ?? null,
  colors: props.initialFilters?.colors ? [...props.initialFilters.colors] : [],
});

const availableColors = props.availableColors;

const allArticles = ref<ArticleType[]>([]);
const filteredArticles = ref<ArticleType[]>([]);
const loading = ref(false);

async function loadArticles() {
  loading.value = true;
  // For demo we load all, then filter client-side. In production you may call server with filters.
  allArticles.value = await fetchAllArticles();
  applyFilters();
  loading.value = false;
}

function applyFilters() {
  loading.value = true;
  // client-side filtering; optionally call fetchArticlesWithFilters to simulate server filter
  setTimeout(() => {
    const gf = localFilters.genders;
    const mf = localFilters.materialSubstr?.trim().toLowerCase();
    const pf = localFilters.priceFrom;
    const pt = localFilters.priceTo;
    const cols = localFilters.colors;

    filteredArticles.value = allArticles.value.filter(a => {
      if (props.category && a.category !== props.category) return false;
      if (brand && a.brand !== brand) return false;
      // gender filter: if neither male nor female checked, still show unisex; treat 'unisex' as both
      if (gf.length > 0) {
        // if a.gender is 'unisex', allow it; else require it's in gf
        if (a.gender !== 'unisex' && !gf.includes(a.gender)) return false;
      }
      if (mf && !a.material.toLowerCase().includes(mf)) return false;
      if (pf != null && a.price < pf) return false;
      if (pt != null && a.price > pt) return false;
      if (cols.length > 0) {
        const intersects = a.color.some(c => cols.includes(c));
        if (!intersects) return false;
      }
      return true;
    });
    loading.value = false;
  }, 150); // small debounce to mimic processing
}

function resetFilters() {
  localFilters.genders = ['male','female'];
  localFilters.materialSubstr = '';
  localFilters.priceFrom = null;
  localFilters.priceTo = null;
  localFilters.colors = [];
  applyFilters();
}

function select(article: ArticleType) {
  emit('selectArticle', article);
}

onMounted(() => {
  loadArticles();
});

// watch category — reload/apply to restrict by category
watch(() => props.category, () => {
  applyFilters();
});
</script>

<style scoped>
.panel {
  width: 420px;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}
.panel-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.btn-close {
  border: 0;
  background: transparent;
  font-size: 18px;
  cursor:pointer;
}

.filters { margin-top: 8px; }
.filter-row { margin-bottom: 8px; }
.brand-input { background:#f3f3f3; border:1px solid #ddd; padding:4px; }

.price-row input { width: 48%; margin-right: 4%; }
.colors { display:flex; gap:8px; flex-wrap:wrap; }

.actions { display:flex; gap:8px; }
.actions button { padding:6px 10px; }

.results { margin-top:12px; max-height:480px; overflow:auto; }
.items { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
.item { display:flex; gap:10px; padding:8px; border-radius:6px; cursor:pointer; border:1px solid #eee; }
.image-placeholder {
  width:72px; height:72px; border-radius:6px; display:flex; align-items:center; justify-content:center; background:#fafafa; border:1px solid #ddd; font-size:12px;
}
.info .name { font-weight:600; }
.meta { font-size:12px; color:#666; }
.chip { display:inline-block; margin-right:6px; margin-top:6px; padding:2px 6px; border-radius:999px; background:#f0f0f0; font-size:11px; }
</style>
