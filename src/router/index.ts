import { createRouter, createWebHistory } from "vue-router";
import TodayWeather from "@/views/TodayWeather/TodayWeather.vue";
import MenuOverview from "@/views/MenuOverview/MenuOverview.vue";
import WeatherOverview from "@/views/WeatherOverview.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/weather",
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuOverview,
    },
    {
      path: "/weather",
      name: "weather",
      component: WeatherOverview
    }
  ],
});

export default router;
