import { createApp, ref, watch } from "vue";

// Mock backend endpoints
async function fetchOptions(category: string) {
  // In reality, call your backend: `/api/items?category=${category}`
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(
        category === "tops"
          ? ["Shirt", "Blouse", "Jacket"]
          : ["Jeans", "Skirt", "Shorts"],
      );
    }, 300);
  });
}

async function saveOutfit(outfit: { top: string; bottom: string }) {
  // Replace with real POST call: fetch('/api/outfits', { method: 'POST', body: JSON.stringify(outfit) })
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Saved outfit to backend:", outfit);
      resolve(true);
    }, 500);
  });
}

const CreatePage = {
  setup() {
    const tops = ref<string[]>([]);
    const bottoms = ref<string[]>([]);
    const selectedTop = ref("");
    const selectedBottom = ref("");
    const isSaving = ref(false);
    const saveMessage = ref("");

    async function initOptions() {
      tops.value = await fetchOptions("tops");
      bottoms.value = await fetchOptions("bottoms");
      selectedTop.value = tops.value[0];
      selectedBottom.value = bottoms.value[0];
    }

    async function handleSave() {
      isSaving.value = true;
      saveMessage.value = "";
      await saveOutfit({
        top: selectedTop.value,
        bottom: selectedBottom.value,
      });
      saveMessage.value = "✅ Outfit saved successfully!";
      isSaving.value = false;
    }

    watch([selectedTop, selectedBottom], ([t, b]) => {
      console.log("Preview outfit:", t, b);
    });

    initOptions();

    return {
      tops,
      bottoms,
      selectedTop,
      selectedBottom,
      handleSave,
      isSaving,
      saveMessage,
    };
  },
  template: `
    <div>
      <h1>Create Outfit</h1>
      <form @submit.prevent="handleSave">
        <label>
          Top:
          <select v-model="selectedTop">
            <option v-for="item in tops" :key="item">{{ item }}</option>
          </select>
        </label>

        <label>
          Bottom:
          <select v-model="selectedBottom">
            <option v-for="item in bottoms" :key="item">{{ item }}</option>
          </select>
        </label>

        <button type="submit" :disabled="isSaving">
          {{ isSaving ? 'Saving...' : 'Save Outfit' }}
        </button>
      </form>

      <div class="preview">
        <h3>Preview</h3>
        <img :src="'https://placekitten.com/200/200?top='+selectedTop+'&bottom='+selectedBottom" />
        <p>{{ selectedTop }} + {{ selectedBottom }}</p>
      </div>

      <p>{{ saveMessage }}</p>
    </div>
  `,
};

createApp(CreatePage).mount("#create-app");
