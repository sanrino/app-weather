export interface WeatherType {
  id: string;
  temp: number | string;
  city: string;
  country: string;
  weatherDescription: string;
  weatherIcon: string;
  humidity: number | string;
  error404?: boolean;
  emptyQuery?: boolean;
}
