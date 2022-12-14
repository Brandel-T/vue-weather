<template>
  <div class="daily">
    <table class="daily-table">
      <tr>
        <th class="today-date">Heute</th>
        <th></th>
        <th class="today-temperature">
          {{ dailyForecasts[0].tempMin }}°/ {{ dailyForecasts[0].tempMax }}°
        </th>
      </tr>
      <tr
        class="daily-items"
        v-for="(item, index) in dailyForecasts.slice(1)"
        :key="index"
      >
        <td class="daily-items__date">{{ orderedDays[index] }}</td>
        <td class="daily-items__middle">
          <span class="daily-items__humidity">{{ item.humidity }} %</span>
          <span class="daily-items__icon">
            <img
              :src="`http://openweathermap.org/img/wn/${item.icon}@2x.png`"
              :alt="`daily weather icon ${item.icon}`"
            />
          </span>
        </td>
        <td class="daily-items__temperature">
          {{ item.tempMin }}°/ {{ item.tempMax }}°
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import type { PropType } from "vue";

import type { DailyForecast } from "@/models/models";

export default defineComponent({
  name: "DailyForecast",
  props: {
    dailyForecasts: {
      type: Object as PropType<DailyForecast[]>,
      required: true,
    },
  },
  setup() {
    const days = ref([
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
      "Sonntag",
    ]);
    const day = new Date().getDay();
    const orderedDays = computed(() =>
      days.value.slice(day).concat(days.value.slice(0, day))
    );

    return {
      orderedDays,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.daily {
  height: auto;
  width: 100%;
  margin-top: 1rem;

  &-table {
    width: 100%;
    padding: 1rem 2rem;
    color: #fffa;
    // background: #fffa;
    background-color: #c4c2c25d;
    border-radius: 0.4rem;
    font-family: Arial, Helvetica, sans-serif;

    .daily-items {
      width: 100%;
      height: 2.5rem;
      font-size: 0.9rem;

      &__icon img {
        height: 2em;
        width: 2rem;
        border-radius: 50%;
        box-shadow: $shadow;
        background-color: $color-terciary;
      }

      &__date,
      &__temperature {
        width: 25%;
      }
      &__temperature {
        text-align: end;
      }

      &__middle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
    }
  }

  .today-date {
    text-align: start;
    font-weight: 600;
  }
  .today-temperature {
    text-align: end;
    font-weight: 600;
  }
}
</style>
