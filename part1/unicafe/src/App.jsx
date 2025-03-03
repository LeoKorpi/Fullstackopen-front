import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <main>
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
      <section>
        <h2>Statistics</h2>
        <p>good {good} </p>
        <p>neutral {neutral} </p>
        <p>bad {bad} </p>
      </section>
    </main>
  );
};

export default App;
