import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <main>
      {parts.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
      <Total total={totalExercises} />
    </main>
  );
};

export default Content;
