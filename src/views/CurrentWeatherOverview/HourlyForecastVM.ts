import type { HourlyForecast } from "@/models/models";
import { store } from "@/store/index";

import { computed, reactive, watch } from "vue";

const useHourlyForecastVM = () => {
  const hourly = computed(() => store.hourlyForecast);

  const state = reactive({
    hourlyForecasts: [] as HourlyForecast[],
    nextHours: [] as String[],
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
    () => store.hourlyForecast,
    () => {
      getHourlyForecasts(getNextHours);
    }
  );

  function getHourlyForecasts(getNextHoursCallback: any) {
    const tab = hourly.value.slice(0, 7);

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

    getNextHoursCallback(tab.length);
  }

  function getNextHours(hours: number) {
    const date = new Date();
    const hour = date.getHours();

    for (let i = 0; i < hours; ++i) {
      const tmp = `${hour + i}:00`;
      state.nextHours = [...state.nextHours, tmp];
    }
  }

  return { state };
};

export default useHourlyForecastVM;
