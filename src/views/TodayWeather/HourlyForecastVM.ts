import type { HourlyForecast } from "@/models/models";
import { store } from "@/store/index";

import { computed, reactive, watch } from "vue";

const useHourlyForecastVM = () => {
  const hourly = computed(() => store.hourlyForecast);

  const state = reactive({
    hourlyForecasts: [] as HourlyForecast[],
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
    () => store.hourlyForecast,
    () => {
      getHourlyForecasts();
    }
  );

  function getHourlyForecasts() {
    const tab = hourly.value.slice(0, 5);
    tab.forEach((e) => {
      const { temp, feels_like, humidity, weather } = e;
      const h: HourlyForecast = {
        humidity: humidity,
        feelsLike: Math.round(feels_like - 273.15),
        temperature: Math.round(temp - 273.15),
        description: weather[0].description,
        icon: weather[0].icon,
        main: weather[0].main,
      };
      state.hourlyForecasts = [...state.hourlyForecasts, ...[h]];
    });
  }

  return { state };
};

export default useHourlyForecastVM;
