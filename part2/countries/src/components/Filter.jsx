const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries{" "}
      <input
        value={filter}
        onChange={handleFilterChange}
        placeholder="search for a country..."
      />
    </div>
  );
};

export default Filter;
