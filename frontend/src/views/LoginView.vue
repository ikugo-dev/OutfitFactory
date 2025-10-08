<template>
  <div class="login-view">
    <div class="auth-card">
      <h2 class="title">{{ isRegister ? "Create Account" : "Login" }}</h2>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Username -->
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Email (only for register) -->
        <div v-if="isRegister" class="form-group">
          <label>Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn primary">
          {{ isRegister ? "Sign Up" : "Login" }}
        </button>
      </form>

      <p class="switch-mode">
        <span>
          {{ isRegister ? "Already have an account?" : "Don’t have an account?" }}
        </span>
        <a href="#" @click.prevent="isRegister = !isRegister">
          {{ isRegister ? "Log in" : "Sign up" }}
        </a>
      </p>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "@/api.ts";

const router = useRouter();
const route = useRoute();
const isRegister = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

async function handleSubmit() {
  error.value = "";
  try {
    if (!isRegister.value) {
      login(username.value, email.value, password.value);

      const redirectPath = (route.query.redirect as string) || "/";
      router.push(redirectPath);
    }
  } catch (err: never) {
    console.error(err);
    error.value = err.response?.data?.error || "Something went wrong.";
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fafafa;
}

.auth-card {
  background: white;
  padding: 2rem 3rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.btn.primary {
  width: 100%;
  background: #222;
  color: white;
  padding: 0.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  border: none;
  margin-top: 0.5rem;
}

.switch-mode {
  text-align: center;
  margin-top: 1rem;
}

.switch-mode a {
  color: #007bff;
  cursor: pointer;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
