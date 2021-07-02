import { WeatherType } from "../../interfaces/interfaces";
import { Sidebar } from "../Sidebar/Sidebar";

interface ComponentProps {
  visible: boolean;
  onHide: () => void;
  state: WeatherType[];
  handlerRemoveBookmark: (id: string) => void;
}
export const SidebarFavorites: React.FC<ComponentProps> = ({
  state,
  visible,
  onHide,
  handlerRemoveBookmark,
}) => {
  return (
    <Sidebar visible={visible} onHide={onHide} title="Избранные локации">
      {state.length > 0 ? (
        <div className="favorites-locations-wrapper">
          {state.map(
            (
              {
                id,
                temp,
                city,
                country,
                weatherDescription,
                weatherIcon,
                humidity,
              },
              index
            ) => {
              const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
              const isBookmark = () => {
                if (!state.some((val) => val.city === city)) {
                  return true;
                }
                return false;
              };
              return (
                <div className="favorites-locations" key={index}>
                  <div className="location-panel">
                    <div className="location__name">
                      {city}, {country}
                      <button
                        className="location__bookmark"
                        onClick={() => handlerRemoveBookmark(id)}
                      >
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
                      <span className="weather-icon">
                        <img src={iconUrl} alt="" />
                      </span>
                    </div>

                    <div className="humidity-panel">Влажность {humidity}%</div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        "Избранные локации не найдены"
      )}
    </Sidebar>
  );
};
