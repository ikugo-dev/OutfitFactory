import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";

import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faComment,
  faShirt,
  faThumbsDown,
  faThumbsUp,
  faThumbtack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// add icons to library
library.add(
  faComment,
  faShirt,
  faThumbsDown,
  faThumbsUp,
  faThumbtack,
  faTrash,
);
const app = createApp(App);
app.component("infinite-loading", InfiniteLoading);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
