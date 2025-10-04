<template>
  <div class="create-view">
    <h2>Create a New Outfit</h2>

    <div v-if="user">
      <OutfitEditor v-model="outfit" />

      <textarea
        v-model="caption"
        placeholder="Describe your outfit..."
        class="caption-input"
      />

      <button class="submit-btn" @click="submitPost">Post Outfit</button>
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

// Mock submit function (in reality you’d send this to your backend)
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

  // reset
  outfit.value = { clothes: [] };
  caption.value = "";
}
</script>

<style scoped>
.create-view {
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.caption-input {
  width: 100%;
  min-height: 80px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}
.submit-btn {
  padding: 0.6rem 1.2rem;
  background: black;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
}
.submit-btn:hover {
  background: #333;
}
.login-message {
  text-align: center;
  color: #777;
}
</style>
