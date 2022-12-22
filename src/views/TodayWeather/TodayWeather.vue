<template>
  <div class="today">
    <header>
      <h1>Wetter</h1>
    </header>

    <CurrentWeather
      :hourlyData="hourlyState.hourlyForecasts"
      :nextHours="hourlyState.nextHours"
    >
      <template #hourly="{ data, hour }">
        <HourlyForecast
          :humidity="data.humidity"
          :icon="data.icon"
          :temperature="data.temperature"
          :hour="hour"
        />
      </template>
    </CurrentWeather>

    <DailyForecast :dailyForecasts="dailyState.dailyForecasts" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";
import useHourlyForecastVM from "../CurrentWeatherOverview/HourlyForecastVM";
import useDailyForecastVM from "../DailyForecastOverview/DailyForecastVM";
import HourlyForecast from "../CurrentWeatherOverview/HourlyForecast.vue";
import CurrentWeather from "../CurrentWeatherOverview/CurrentWeather.vue";
import DailyForecast from "../DailyForecastOverview/DailyForecast.vue";

export default defineComponent({
  name: "TodayWeather",
  components: {
    HourlyForecast,
    CurrentWeather,
    DailyForecast,
  },
  setup() {
    const { state: hourlyState } = useHourlyForecastVM();
    const { state: dailyState } = useDailyForecastVM();

    return {
      store,
      hourlyState,
      dailyState,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.today {
  background: url("../../assets/images/bg-1.jpg") bottom left no-repeat fixed;
  padding: 1rem;
}

.today header {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
}
</style>
