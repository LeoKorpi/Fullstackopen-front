import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      if (personExists.number !== newNumber) {
        if (
          window.confirm(
            `${newName} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          const updatedPerson = { ...personExists, number: newNumber };

          personService
            .update(personExists.id, updatedPerson)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) => (person.id !== personExists.id ? person : returnedPerson))
              );
              setNotification(`Changed ${updatedPerson.name}'s number`);
              setTimeout(() => {
                setNotification(null);
              }, 5000);
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => {
              alert(`Error: ${newName} was already removed from the server\n`, error);
              setPersons(persons.filter((person) => person.id !== personExists.id));
            });
        }
      } else {
        alert(`${newName} is already added to the phonebook!`);
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNotification(`Added ${personObject.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handlePersonNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonNameChange={handlePersonNameChange}
        newNumber={newNumber}
        handlePersonNumberChange={handlePersonNumberChange}
      />
      <h2>Contacts</h2>
      <Persons
        personsToShow={personsToShow}
        remove={removePerson}
      />
    </>
  );
};

export default App;
