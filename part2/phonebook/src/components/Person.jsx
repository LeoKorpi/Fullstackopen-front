const Person = ({ person, remove }) => (
  <p>
    {person.name} {person.number}{" "}
    <button onClick={() => remove(person.id, person.name)}>Delete</button>
  </p>
);

export default Person;
