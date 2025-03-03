import Button from "./Button";

const Buttons = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  return (
    <section>
      <h1>Give feedback</h1>
      <Button
        onClick={() => setGood(good + 1)}
        text="good"
      />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text="neutral"
      />
      <Button
        onClick={() => setBad(bad + 1)}
        text="bad"
      />
    </section>
  );
};

export default Buttons;
