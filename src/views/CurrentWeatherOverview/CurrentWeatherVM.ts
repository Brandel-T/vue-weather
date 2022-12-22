import type { CurrentForecast } from "@/models/models";
import { store } from "@/store/index";
import { computed, reactive, watch } from "vue";

const useCurrentWeatherVM = () => {
  
  const current = computed(() => store.currentForecast);
  
  const state = reactive({
    currentWeather: {} as CurrentForecast,
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
   *
   * *************************************************************
   *
   * dans le store on souhaite acceder la geolocation de l'utilisateur
   * - c'est une operation qui peut prendre un certain temps, donc au
   *   depart les objects currentForecast, hourlyForecast et dailyForecast
   *   sont vide lorsque les coordonnees ne sont pas encore disponibles
   * - en attendant que ca le soit, on observe l'etat de ces objets (raison
   *   pour laquelle ils sont placés dans un objet reactif "store") à l'aide
   *   de la directive "watch"
   * - et une fois que ces données sont accessibles, on appelle les methodes
   *   "getCurrentWeather()"/"getHourlyForecasts()"/"getDailyForecasts"
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
      feelsLike: Math.round(feels_like - 273.15),
      humidity: humidity,
      temperature: Math.round(temp - 273.15),
      description: weather[0].description,
      icon: weather[0].icon,
      main: weather[0].main,
    };
    
    console.log(state.currentWeather);
  }

  return { state };
};

export default useCurrentWeatherVM;
