import { useEffect, useState } from 'react';
import countriesService from './services/countries';
import Country from './components/Country';
import Countries from './components/Countries';
import SearchCountries from './components/SearchCountries';

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const countriesList = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCountrySearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleShow = (country) => {
    setFilter(country);
  };

  return (
    <div>
      <SearchCountries
        value={filter}
        handleCountrySearchChange={handleCountrySearchChange}
      />
      <Countries data={countriesList} handleShow={handleShow} />
      {countriesList.length === 1 && <Country country={countriesList[0]} />}
    </div>
  );
}

export default App;
