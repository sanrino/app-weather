import { WeatherType } from "../../interfaces/interfaces";

interface ComponentProps {
  state: WeatherType;
  favorites: WeatherType[];
  handlerAddBookmark: () => void;
}
export const Weather: React.FC<ComponentProps> = ({
  state,
  favorites,
  handlerAddBookmark,
}) => {
  const { temp, city, country, weatherDescription, weatherIcon, humidity } =
    state;

  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

  const isBookmark = () => {
    if (!favorites.some((val) => val.city === city)) {
      return true;
    }
    return false;
  };

  return (
    <div className="shell">
      <div className="location-panel">
        <div className="location__name">
          {city}, {country}
          <button className="location__bookmark" onClick={handlerAddBookmark}>
            {isBookmark() ? (
              <i className="material-icons">bookmark_border</i>
            ) : (
              <i className="material-icons">bookmark</i>
            )}
          </button>
        </div>
      </div>

      <div className="temp-panel">
        <div className="temp">{temp} °C</div>
      </div>

      <div className="weather-panel">
        <div className="weather-status">
          <span>{weatherDescription}</span>
          <div className="weather-icon">
            <img src={iconUrl} alt="" />
          </div>
        </div>
        <div className="humidity-panel">Влажность {humidity}%</div>
      </div>
    </div>
  );
};
