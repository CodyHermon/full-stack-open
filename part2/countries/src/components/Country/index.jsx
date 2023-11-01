import Weather from './Weather';

const Country = ({ country }) => {
  const languageKeys = Object.keys(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <div>
        <h3>languages:</h3>
        <ul>
          {languageKeys.map((key) => (
            <li key={key}>{country.languages[key]}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country={country} />
    </div>
  );
};

export default Country;
