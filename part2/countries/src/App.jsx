import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Results from "./components/Results";

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

  const handleSelectedCountry = (countryName) => {
    setFilter(countryName);
  };

  return (
    <main>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Results
        filteredCountries={filteredCountries}
        selectedCountry={selectedCountry}
        handleSelectedCountry={handleSelectedCountry}
      />
    </main>
  );
}

export default App;
