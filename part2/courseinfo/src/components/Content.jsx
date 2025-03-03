import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <main>
      {parts.map((part) => (
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
    </main>
  );
};

export default Content;
