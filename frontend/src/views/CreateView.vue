<template>
  <div class="create-view">
    <h2>Create a New Outfit</h2>
    <div v-if="user">
      <OutfitEditor v-model="outfit" />
    </div>

    <div v-else class="login-message">
      <p>You must be logged in to create an outfit.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import OutfitEditor from "@/components/OutfitEditor.vue";
import type { OutfitType, PostType, UserType } from "@/types";

// Mock “logged in” user
const user = ref<UserType | null>({
  id: 1,
  username: "alexlynx",
});

// Reactive outfit + caption
const outfit = ref<OutfitType>({
  clothes: [],
});

const caption = ref("");

function submitPost() {
  if (!user.value) return alert("You must be logged in!");

  const newPost: PostType = {
    id: Date.now(),
    user: user.value,
    outfit: outfit.value,
    text: caption.value,
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  console.log("Posted new outfit:", newPost);
  alert("Outfit posted! (Check console for mock data.)");

  outfit.value = { clothes: [] };
  caption.value = "";
}
</script>
