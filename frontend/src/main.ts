import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";

import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const app = createApp(App);
app.component("infinite-loading", InfiniteLoading);
app.use(router);
app.mount("#app");
