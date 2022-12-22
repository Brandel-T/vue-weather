<template>
  <TodayWeather />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodayWeather from "./TodayWeather/TodayWeather.vue";

export default defineComponent({
  name: "WeatherOverview",
  components: { TodayWeather },
  setup() {
    return {};
  },
});
</script>

<style></style>
