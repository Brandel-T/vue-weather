<template>
  <div>
    <Card>
      <template #header>
        <main class="main-weather">
          <div class="weather">
            <img
              :src="`http://openweathermap.org/img/wn/${state.currentWeather.icon}@2x.png`"
              alt="current weather icon"
            />
            <span>{{ state.currentWeather.temperature }} °C</span>
          </div>
          <div class="weather-detail">
            <div class="description">
              Beschreibung: {{ state.currentWeather.description }}
            </div>
            <div class="feelslike">
              Gefühlt wie {{ state.currentWeather.feelsLike }} °
            </div>
            <div>Feutchigkeit {{ state.currentWeather.humidity }} %</div>
          </div>
        </main>
      </template>
      <template #title>{{ store.city }}</template>
      <template #subtitle>{{ new Date().toLocaleDateString() }}</template>
      <template #content>
        <div class="hourly snap-mandatory snap-x">
          <slot
            name="hourly"
            v-for="(data, index) in hourlyData"
            :key="index"
            :data="data"
            :hour="nextHours[index]"
          >
          </slot>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent, onMounted } from "vue";
import { store } from "@/store";
import type { HourlyForecast } from "../../models/models";
import Card from "primevue/card";
import useCurrentWeatherVM from "./CurrentWeatherVM";

export default defineComponent({
  name: "CurrentWeather",
  components: { Card },
  props: {
    hourlyData: {
      type: Object as PropType<HourlyForecast[]>,
      required: true,
    },
    nextHours: {
      type: Object as PropType<String[]>,
      required: true,
    },
  },
  setup() {
    const { state } = useCurrentWeatherVM();
    // onMounted(() => {
    //     console.log(state);
    // })
    return { state, store };
  },
});
</script>

<style scoped lang="scss">
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.p-card) {
  padding: 1rem;
  box-shadow: $shadow;
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
          box-shadow: $shadow;
          background-color: $color-secondary;
        }
        span {
          font-size: 2rem;
          font-weight: 500;
          color: #fffa;
        }
      }

      .weather-detail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 0.7rem;
        font-weight: 300;
        color: $color-primary;
        color: #fffa;
      }
    }
  }

  .p-card-body {
    margin: 0;

    .p-card-title {
      margin: 0;
      color: #fffa;
    }
    .p-card-subtitle {
      font-size: 0.7rem;
      padding: 0 0 0.5rem 0;
      color: #fffa;
    }

    .p-card-content {
      padding: 0;
      .hourly {
        height: fit-content;
        width: 100%;
        @include flex-center;
        justify-content: space-between;
        gap: 1rem;
        overflow-x: scroll;

        &::-webkit-scrollbar {
          width: 1px;
          height: 1px;
          /* or add it to the track */
        }
      }
    }
  }

  background-color: #c4c2c25d;
}
</style>
