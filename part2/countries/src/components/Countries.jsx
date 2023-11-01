const Countries = ({ data, handleShow }) => {
  return (
    <div>
      {data.length < 10 ? (
        <div>
          {data.length > 1 &&
            data.map((country) => (
              <div key={country.name.common}>
                {country.name.common}{' '}
                <button onClick={() => handleShow(country.name.common)}>
                  show
                </button>
              </div>
            ))}
        </div>
      ) : (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
};

export default Countries;
