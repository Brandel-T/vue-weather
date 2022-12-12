import { createRouter, createWebHistory } from "vue-router";
import TodayWeather from "@/views/TodayWeather/TodayWeather.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "TodayWeather",
      component: TodayWeather,
    },
  ],
});

export default router;
