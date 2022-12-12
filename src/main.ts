import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Card from "primevue/card";
import Button from "primevue/button";
import VirtualScroller from "primevue/virtualscroller";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component("cCard", Card);
app.component("cButton", Button);
app.component("VirtualScroller", VirtualScroller);

app.mount("#app");
