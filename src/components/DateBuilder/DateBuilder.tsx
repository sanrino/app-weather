import { days, months } from "../../data/data";

export const dateBuilder = (d: Date) => {
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

export const DateBuilder = () => {
  return <div className="weather-date">{dateBuilder(new Date())}</div>;
};
