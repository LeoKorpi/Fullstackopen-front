const Statistics = ({ good, neutral, bad, total, average, positivePercetange }) => {
  return (
    <section>
      <h2>Statistics</h2>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercetange}%</p>
    </section>
  );
};

export default Statistics;
