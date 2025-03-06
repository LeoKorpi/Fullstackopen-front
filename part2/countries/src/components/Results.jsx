const Results = ({ filteredCountries, selectedCountry, handleSelectedCountry }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleSelectedCountry(country.name.common)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }

  if (selectedCountry) {
    return (
      <section>
        <h1>{selectedCountry.name.common}</h1>
        <h2>Area: {selectedCountry.area}</h2>
        <h2>Population: {selectedCountry.population}</h2>
        <h2>Languages:</h2>
        <ul>
          {Object.values(selectedCountry.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={selectedCountry.flags.png}
          alt={selectedCountry.flags.alt}
          width="200"
        />
      </section>
    );
  }
  return <p>No results, sorry.</p>;
};

export default Results;
