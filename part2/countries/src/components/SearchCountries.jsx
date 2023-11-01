const SearchCountries = ({ value, handleCountrySearchChange }) => {
  return (
    <div>
      find countries{' '}
      <input value={value} onChange={handleCountrySearchChange} />
    </div>
  );
};

export default SearchCountries;
