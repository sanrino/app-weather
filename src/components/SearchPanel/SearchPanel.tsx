interface ComponentProps {
  value: string;
  onChange: (value: string) => void;
  handlerSearchWeather: () => void;
  validate: any;
}
export const SearchPanel: React.FC<ComponentProps> = ({
  value,
  onChange,
  validate,
  handlerSearchWeather,
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
      </div>
      {validate.error404 && (
        <p>Погоды по этому пункту, к сожалению, на сайте нет.</p>
      )}
      {validate.emptyField && <p>Введите название города</p>}
    </>
  );
};
