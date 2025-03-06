import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

  // Fetches all county names locally, used for filtering
  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then((response) => {
        console.log(response.data);
        setAllCountries(response.data);
      })
      .catch((error) => console.error("Error fetching country list: ", error));
  }, []);

  // Fetches results from filter, but also fetches country if filter matches exactly
  useEffect(() => {
    if (filter) {
      const matches = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      );

      console.log(matches);
      setFilteredCountries(matches);
      setSelectedCountry(null);

      if (matches.length === 1) {
        axios
          .get(`${baseUrl}/name/${matches[0].name.common}`)
          .then((response) => setSelectedCountry(response.data))
          .catch((error) => console.error("Error fetching country details:", error));
      }
    } else {
      setFilteredCountries([]);
      setSelectedCountry(null);
    }
  }, [filter, allCountries]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const renderResults = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter.</p>;
    }

    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
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

  return (
    <main>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {renderResults()}
    </main>
  );
}

export default App;
