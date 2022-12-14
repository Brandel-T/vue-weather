import { reactive } from "vue";
import axios from "axios";

// https://openweathermap.org/
const API_KEY = "c9842f587841ab3d8440bdae432a3299";

type GeoCoords = {
  lat: number;
  lon: number;
};

const store = reactive({
  apiKey: API_KEY,
  location: {} as GeoCoords,
  city: "Berlin",
  lang: "de",
  getLocation() {
    return new Promise((resolve, rejected) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.location.lat = pos.coords.latitude;
            this.location.lon = pos.coords.longitude;
            resolve(this.location);
          },
          () => rejected("Failed to get the user location")
        );
      } else {
        rejected("Geolocation unavalaible on this browser");
      }
    });
  },
  currentForecast: {} as any,
  hourlyForecast: [] as any[],
  dailyForecast: [] as any[],
});

const useOneCallWeather = async () => {
  // await store.getLocation(); // ! important
  store
    .getLocation()
    .then((location) => {
      const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";
      const exclude = "minutely";
      axios
        .get(
          `${BASE_URL}?lat=${location.lat}&lon=${location.lon}&exclude=${exclude}&appid=${store.apiKey}`
        )
        .then((response) => {
          const { current, hourly, daily } = response.data;

          store.currentForecast = current;
          store.hourlyForecast = hourly;
          store.dailyForecast = daily;
        })
        .catch((reason) =>
          console.log("FAILED TO LOAD ONE CALL WEATHER: ", reason)
        );
    })
    .catch((reason) => console.log(reason));
};

export { store, useOneCallWeather };
