<template>
  <div class="login-view">
    <div class="panel">
      <h2 class="title">{{ isRegister ? "Create Account" : "Login" }}</h2>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" v-model="username" placeholder="Enter your username" required />
        </div>

        <div v-if="isRegister" class="form-group">
          <label>Email:</label>
          <input type="email" v-model="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" class="btn primary">
          {{ isRegister ? "Sign Up" : "Login" }}
        </button>
      </form>

      <p class="switch-mode">
        <span>
          {{ isRegister ? "Already have an account? " : "Don’t have an account? " }}
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
import { useRouter } from "vue-router";
import { registerUser, loginUser } from "@/api/userApi.ts";

const router = useRouter();
const isRegister = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

async function handleSubmit() {
  error.value = "";
  try {
    if (isRegister.value) {
      registerUser(username.value, email.value, password.value);
    } else {
      loginUser(username.value, email.value, password.value);
      router.push("/");
    }
  } catch (err: any) {
    console.error(err);
    error.value = err.response?.data?.error || "Something went wrong.";
  }
}
</script>

<style>
.login-view {
  display: flex;
  justify-content: center;
}

.panel {
  width: 24rem;
  border: 0.2rem solid black;
  padding: 12px;
  margin-bottom: 1rem;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.panel>* {
  margin-bottom: 1rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr
}

.form-group>label {
  text-align: right;
  margin-right: 1rem;
}
</style>
