import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, total, average, positivePercetange }) => {
  if (total == 0) {
    return (
      <section>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Statistics</h2>
      <StatisticLine
        text="good"
        value={good}
      />
      <StatisticLine
        text="neutral"
        value={neutral}
      />
      <StatisticLine
        text="bad"
        value={bad}
      />
      <StatisticLine
        text="all"
        value={total}
      />
      <StatisticLine
        text="average"
        value={average}
      />
      <StatisticLine
        text="positive"
        value={positivePercetange}
      />
    </section>
  );
};

export default Statistics;
