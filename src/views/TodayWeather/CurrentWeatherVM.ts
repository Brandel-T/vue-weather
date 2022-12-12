import type { CurrentForecast } from "@/models/models";
import { store } from "@/store/index";
import { computed, reactive, watch } from "vue";

const useCurrentWeatherVM = () => {
  const state = reactive({
    currentWeather: {} as CurrentForecast,
  });

  const current = computed(() => store.currentForecast);

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
    () => store.currentForecast,
    () => {
      getCurrentWeather();
    }
  );

  function getCurrentWeather() {
    const { feels_like, humidity, temp, weather } = current.value;

    state.currentWeather = {
      feelsLike: Math.round(feels_like - 173.15),
      humidity: humidity,
      temperature: Math.round(temp - 273.15),
      description: weather[0].description,
      icon: weather[0].icon,
      main: weather[0].main,
    };
  }

  return {
    state,
    getCurrentWeather,
  };
};

export default useCurrentWeatherVM;
