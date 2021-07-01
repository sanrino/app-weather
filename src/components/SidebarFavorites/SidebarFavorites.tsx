import { WeatherType } from "../../interfaces/interfaces";
import { Sidebar } from "../Sidebar/Sidebar";

interface ComponentProps {
  visible: boolean;
  onHide: () => void;
  state: WeatherType[];
}
export const SidebarFavorites: React.FC<ComponentProps> = ({
  state,
  visible,
  onHide,
}) => {
  return (
    <Sidebar visible={visible} onHide={onHide}>
      <h2>Избранные города</h2>
      <div className="favorites-locations-wrapper">
        {state.map(
          ({
            temp,
            city,
            country,
            weatherDescription,
            weatherIcon,
            humidity,
          }) => {
            const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
            return (
              <div className="favorites-locations">
                <div className="location-panel">
                  <div className="location__name">
                    {city}, {country}
                  </div>
                </div>

                <div className="temp-panel">
                  <div className="temp">{temp} °C</div>
                </div>

                <div className="weather-panel">
                  <div className="weather-status">{weatherDescription}</div>
                  <div className="weather-icon">
                    <img src={iconUrl} alt="" />
                  </div>
                  <div className="humidity-panel">Влажность {humidity}%</div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </Sidebar>
  );
};
