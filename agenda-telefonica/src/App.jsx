import { useEffect, useState } from "react";
import axios from "axios";
import personService from "./services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personOBject = {
      name: newName,
      number: newNumber,
    };

    const includesRepeatName = persons
      .map((person) => person.name.toLowerCase())
      .includes(newName.toLowerCase());

    if (includesRepeatName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.create(personOBject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const removePersons = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((returnedPerson) => {
          console.log(returnedPerson);
        })
        .catch((error) => {
          console.log(`the person ${name} was already deleted from server`);
        });

      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  const personsToShow =
    filterName === ""
      ? persons
      : persons.filter(
          (person) => person.name.toLowerCase() === filterName.toLowerCase()
        );

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} removePersons={removePersons} />
    </div>
  );
};

export default App;
