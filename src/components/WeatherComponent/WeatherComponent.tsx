import { useState, useEffect } from "react";
import { WeatherType } from "../../interfaces/interfaces";
import { SearchPanel } from "../SearchPanel/SearchPanel";
import { Weather } from "../Weather/Weather";
import uniqid from "uniqid";
import { DateBuilder } from "../DateBuilder/DateBuilder";
import { SidebarFavorites } from "../SidebarFavorites/SidebarFavorites";

export const WeatherComponent: React.FC = () => {
  const api = {
    key: "65f41f34e9ee9d38d577e176ecceff8a",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const emptyCurrentWeather = {
    id: "",
    temp: "",
    city: "",
    country: "",
    weatherDescription: "",
    weatherIcon: "",
    humidity: "",
  };

  const [validate, setValidate] = useState({
    error404: false,
    emptyField: false,
  });

  const [query, setQuery] = useState("");

  const [weatherCurrent, setWeatherCurrent] =
    useState<WeatherType>(emptyCurrentWeather);

  const [favoritesLocations, setFavoritesLocations] = useState<WeatherType[]>(
    []
  );

  const [visibleFavorites, setVisibleFavorites] = useState(false);

  const saveLocations = () => {
    if (weatherCurrent.city) {
      if (!favoritesLocations.some((val) => val.city === weatherCurrent.city)) {
        setFavoritesLocations([...favoritesLocations, weatherCurrent]);
      } else {
        let newFavoritesLocations = favoritesLocations.filter(
          (item) => item.city !== weatherCurrent.city
        );
        setFavoritesLocations(newFavoritesLocations);
      }
    }
  };

  const removeLocations = (id: string) => {
    let newFavoritesLocations = favoritesLocations.filter(
      (item) => item.id !== id
    );
    setFavoritesLocations(newFavoritesLocations);
  };

  useEffect(() => {
    if (localStorage.getItem("favoritesLocations")) {
      const raw = JSON.parse(
        localStorage.getItem("favoritesLocations") as string
      );
      setFavoritesLocations(raw);
    } else {
      setFavoritesLocations([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoritesLocations",
      JSON.stringify(favoritesLocations)
    );
  }, [favoritesLocations]);

  const searchWeather = async () => {
    if (query !== "") {
      await fetch(
        `${api.base}weather?q=${query}&units=metric&lang=ru&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.message) {
            setWeatherCurrent({
              id: uniqid(),
              temp: Math.round(data.main.temp),
              city: data.name,
              country: data.sys.country,
              weatherDescription: data.weather[0].description,
              weatherIcon: data.weather[0].icon,
              humidity: data.main.humidity,
              error404: false,
              emptyQuery: false,
            });
            setQuery("");
            setValidate({
              error404: false,
              emptyField: false,
            });
          } else {
            setQuery("");
            setValidate({
              error404: true,
              emptyField: false,
            });
            setWeatherCurrent(emptyCurrentWeather);
          }
        });
    } else {
      setQuery("");
      setWeatherCurrent(emptyCurrentWeather);
      setValidate({
        error404: false,
        emptyField: true,
      });
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-wrapper">
        <SearchPanel
          value={query}
          onChange={(value) => setQuery(value)}
          handlerSearchWeather={() => searchWeather()}
          validate={validate}
          isVisibleFavorites={() => setVisibleFavorites(true)}
          favorites={favoritesLocations}
        />

        {weatherCurrent.city && (
          <Weather
            state={weatherCurrent}
            favorites={favoritesLocations}
            handlerAddBookmark={saveLocations}
          />
        )}
        <DateBuilder />

        <SidebarFavorites
          visible={visibleFavorites}
          onHide={() => setVisibleFavorites(false)}
          state={favoritesLocations}
          handlerRemoveBookmark={(id) => removeLocations(id)}
        />
      </div>
    </div>
  );
};
