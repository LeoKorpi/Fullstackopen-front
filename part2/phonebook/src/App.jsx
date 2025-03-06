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
  const [notification, setNotification] = useState({ message: null, type: "" });

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
              showNotification(`Changed ${updatedPerson.name}'s number`);
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => {
              showNotification(
                `Error: Information of ${updatedPerson.name} has already been removed from server`,
                "error"
              );
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
      setNewName("");
      setNewNumber("");
      showNotification(`${returnedPerson.name} was added successfully!`);
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

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: "" });
    }, 5000);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        type={notification.type}
      />
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
