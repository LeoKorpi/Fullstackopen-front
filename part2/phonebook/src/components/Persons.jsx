import Person from "./Person";

const Persons = ({ personsToShow, remove }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          remove={remove}
        />
      ))}
    </div>
  );
};

export default Persons;
