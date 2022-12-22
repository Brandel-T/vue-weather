import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Card from "primevue/card";
import Button from "primevue/button";
import Divider from "primevue/divider";

import "./assets/styles/main.css";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.component("cCard", Card);
app.component("cButton", Button);
app.component("cDivider", Divider);

app.use(router);
app.use(PrimeVue);

app.mount("#app");
