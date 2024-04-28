import { createApp } from "vue";
import App from "./App.vue";
import "./css/main.css";
import router from "./routers";
import { createPinia } from "pinia";
import {useMainStore} from "@/stores/main.js";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");

const mainStore = useMainStore(pinia);
// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Default title tag
const defaultDocumentTitle = "Admin One Vue 3 Tailwind";

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
