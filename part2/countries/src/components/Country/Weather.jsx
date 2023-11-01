import { useEffect, useState } from 'react';

import weatherService from '../../services/weather';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(country.capital)
      .then((response) => {
        setWeather(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.capital]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>temperature {weather.main.temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
};

export default Weather;
