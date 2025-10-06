import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import ExploreView from "../views/ExploreView.vue";
import CreateView from "../views/CreateView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    name: "home",
    component: HomeView,
  }, {
    path: "/explore/new",
    name: "explore new",
    component: ExploreView,
  }, {
    path: "/explore/following",
    name: "explore following",
    component: ExploreView,
  }, {
    path: "/create",
    name: "outfit creator",
    component: CreateView,
  }, {
    path: "/profile",
    name: "my profile",
    // beforeEnter: (_to, _from, next) => {
    //   const loggedIn = !!localStorage.getItem('user') // auth check
    //   if (!loggedIn) next({ name: 'Login'})
    //   else next()
    // },
    component: ProfileView,
  }, {
    path: "/profile/:username",
    name: "user profile",
    component: ProfileView,
    props: true,
  }, {
    path: "/*",
    redirect: "/explore?algo=new",
  }, {
    path: "/login",
    name: "login page",
    component: LoginView,
  }],
});

export default router;
