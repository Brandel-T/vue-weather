<template>
  <div class="today">
    <header>
      <h1>WEATHER</h1>
    </header>
    <Card>
      <template #header>
        <main class="main-weather">
          <div class="weather">
            <img
              :src="`http://openweathermap.org/img/wn/${currentState.currentWeather.icon}@2x.png`"
              alt="current weather icon"
            />
            <span>{{ currentState.currentWeather.temperature }} °C</span>
          </div>
          <div class="weather-detail">
            <div class="description">
              {{ currentState.currentWeather.description }}
            </div>
            <div class="feelslike">
              Gefühlt wie {{ currentState.currentWeather.feelsLike }}°
            </div>
          </div>
        </main>
      </template>
      <template #title> Stadt </template>
      <template #subtitle> {{ new Date().toLocaleDateString() }} </template>
      <template #content>
        <div class="hourly">
          <HourlyForecast
            v-for="(item, index) in hourlyState.hourlyForecasts"
            :key="index"
            :humidity="item.humidity"
            :icon="item.icon"
            :temperature="item.temperature"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";
import Card from "primevue/card";
import useCurrentWeatherVM from "./CurrentWeatherVM";
import useHourlyForecastVM from "./HourlyForecastVM";
import useDailyForecastVM from "./DailyForecastVM";
import HourlyForecast from "../../components/HourlyForecast.vue";

export default defineComponent({
  name: "TodayWeather",
  components: {
    Card,
    HourlyForecast,
  },
  setup() {
    const { state: currentState } = useCurrentWeatherVM();
    const { state: hourlyState } = useHourlyForecastVM();
    const { state: dailyState } = useDailyForecastVM();

    return {
      store,
      currentState,
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
  padding: 1rem;
}

.today header {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
}

:deep(.p-card) {
  padding: 1rem;
  & .p-card-header {
    .main-weather {
      @include flex-center;
      gap: 2rem;
      padding: 0;
      margin-bottom: 0;

      .weather {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        img {
          height: $icon-size-primary;
          width: $icon-size-primary;
          height: 6em;
          width: 6em;
          border-radius: 50%;
          background-color: #e3faff7e;
        }
        span {
          font-size: 2rem;
          font-weight: 500;
        }
      }

      .weather-detail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 0.7rem;
        font-weight: 300;
        color: $color-secondary;
      }
    }
  }

  .p-card-body {
    margin: 0;

    .p-card-title {
      margin: 0;
    }
    .p-card-subtitle {
      font-size: 0.7rem;
      padding: 0 0 0.5rem 0;
    }

    .p-card-content {
      padding: 0;
      .hourly {
        height: fit-content;
        width: 100%;
        @include flex-center;
        justify-content: space-between;
      }
    }
  }
}
</style>
