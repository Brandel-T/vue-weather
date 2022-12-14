import type { DailyForecast } from "@/models/models";
import { store } from "@/store/index";

import { computed, reactive, watch } from "vue";

const useDailyForecastVM = () => {
  const daily = computed(() => store.dailyForecast);

  const state = reactive({
    dailyForecasts: [] as DailyForecast[],
  });

  /**
   * important dans la mesure ou seulement une partie du
   * modele doit etre changé lorsque le state change
   * - raison pour laquelle on doit observer (watch) cette (ces)
   * modification(s) et lancer l'operation qui convient - dans
   * notre cas getDailyForecast() - au lieu d'utiliser les
   * promesses avec asnc/await
   * -- c'est la maniere de VueJS de gerer les changements d'etats
   * liées aux promesses ou operations asynchrones
   */
  watch(
    () => store.dailyForecast,
    () => {
      getDailyForecasts();
    }
  );

  function getDailyForecasts() {
    const tab = daily.value.slice(0, 7);
    console.log(tab);

    for (let i = 0; i < tab.length; ++i) {
      const { temp, humidity, weather } = tab[i];
      const df: DailyForecast = {
        humidity: humidity,
        temperature: Math.round(temp.day - 273.15),
        tempMax: Math.round(temp.max - 273.15),
        tempMin: Math.round(temp.min - 273.15),
        description: weather[0].description,
        icon: weather[0].icon,
        main: weather[0].main,
      };
      state.dailyForecasts = [...state.dailyForecasts, ...[df]];
    }
  }

  return { state, getDailyForecasts };
};

export default useDailyForecastVM;
