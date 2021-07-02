import { WeatherType } from "../../interfaces/interfaces";

interface ComponentProps {
  value: string;
  onChange: (value: string) => void;
  handlerSearchWeather: () => void;
  isVisibleFavorites: () => void;
  favorites: WeatherType[];
  validate: any;
}
export const SearchPanel: React.FC<ComponentProps> = ({
  value,
  onChange,
  validate,
  handlerSearchWeather,
  isVisibleFavorites,
  favorites,
}) => {
  return (
    <>
      <div className="search-panel">
        <input
          type="text"
          placeholder="Название страны или региона"
          className="search-field"
          value={value}
          onChange={(e) => {
            const { value } = e.target as HTMLInputElement;
            onChange(value);
          }}
        />
        <button className="search-button" onClick={handlerSearchWeather}>
          Search
        </button>
        {favorites.length > 0 && (
          <button className="bookmark-button" onClick={isVisibleFavorites}>
            <i className="material-icons">bookmark</i>
          </button>
        )}
      </div>
      {validate.error404 && (
        <div className="error-search-message">
          Погоды по этому пункту, к сожалению, на сайте нет.
        </div>
      )}
      {validate.emptyField && (
        <div className="error-search-message">Введите название города</div>
      )}
    </>
  );
};
