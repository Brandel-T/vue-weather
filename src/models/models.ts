interface Weather {
  main: string;
  description: string;
  icon: string;
}

interface MainWeather {
  temperature: number;
  feelsLike?: number;
  tempMin?: number;
  tempMax?: number;
  humidity: number;
}

interface HourlyForecast extends Weather {
  temperature: number;
  feelsLike: number;
  humidity: number;
}

interface DailyForecast extends MainWeather {
  main: string;
  description: string;
  icon: string;
}

interface CurrentForecast extends MainWeather {
  main: string;
  description: string;
  icon: string;
}

interface Forecast extends Weather, MainWeather {}

export type {
  Weather,
  MainWeather,
  HourlyForecast,
  DailyForecast,
  Forecast,
  CurrentForecast,
};
