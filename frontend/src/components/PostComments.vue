<template>
  <div class="comments-overlay">
    <div class="comments-container">
      <h3>Comments</h3>
      <div v-if="loading">Loading comments...</div>
      <div v-else>
        <div v-for="comment in comments" :key="comment._id" class="comment">
          <ProfileWithText :user="comment.user as UserType" :avatarSize="2" :text="comment.text" />
        </div>
      </div>

      <div class="add-comment">
        <textarea v-model="newComment" placeholder="Write a comment..."></textarea>
        <button class="close-overlay" @click="$emit('close')">Close</button>
        <button :disabled="loading" @click="postComment">Post</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentType, PostType, UserType } from "@/types";
import { ref, onMounted } from "vue";
import { addCommentToPost, createComment, fetchPostComments } from "@/api/postInteractionsApi.ts";
import { authCheck } from "@/stores/authCheck.ts";
const { requireLogin } = authCheck();
import ProfileWithText from "./ProfileWithText.vue";

const props = defineProps<{
  post: PostType
  color: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const comments = ref<CommentType[]>([]);
const newComment = ref("");
const loading = ref(false);

onMounted(async () => {
  loadComments();
})

const loadComments = async () => {
  loading.value = true;
  comments.value = await fetchPostComments(props.post._id);
  loading.value = false;
}

const postComment = async () => {
  if (loading.value) return;
  loading.value = true;

  requireLogin();
  if (!newComment.value.trim()) {
    loading.value = false;
    return;
  }
  const comment = await createComment(newComment.value);
  await addCommentToPost(comment._id, props.post._id);
  newComment.value = ""
  loadComments();

  loading.value = false;
}
</script>

<style scoped>
.comments-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: v-bind(color);
  filter: opacity(95%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 1rem;
  z-index: 10;
}

.comments-container {
  overflow-y: auto;
  width: 90%;
  height: 90%;
  padding: 1rem;
  background-color: white;
  border: 0.2rem solid black;
}

.add-comment {
  display: flex;
  margin-top: 1rem;
}

.add-comment>* {
  margin-right: 0.5rem;
}

.add-comment textarea {
  flex: 1;
}
</style>
