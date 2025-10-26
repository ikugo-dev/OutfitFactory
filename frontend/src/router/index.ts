import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ExploreView from "@/views/ExploreView.vue";
import FollowingView from "@/views/FollowingView.vue";
import CreateView from "@/views/CreateView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LoginView from "@/views/LoginView.vue";
import SettingsView from "@/views/SettingsView.vue";
import { currentUserId } from "@/stores/userStore.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    name: "home",
    component: HomeView,
  }, {
    path: "/explore",
    name: "new global posts",
    component: ExploreView,
  }, {
    path: "/following",
    name: "posts from people the user follows",
    component: FollowingView,
    meta: { requiresAuth: true },
  }, {
    path: "/create",
    name: "outfit creator",
    component: CreateView,
    meta: { requiresAuth: true },
  }, {
    path: "/profile",
    name: "my profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  }, {
    path: "/profile/:username",
    name: "user profile",
    component: ProfileView,
    props: true,
  }, {
    path: "/settings",
    name: "user settings",
    component: SettingsView,
  }, {
    path: "/login",
    name: "login page",
    component: LoginView,
  }],
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !currentUserId.value) {
    next({ name: "login page" });
  } else {
    next();
  }
});

export default router;
