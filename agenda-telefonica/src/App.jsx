import { useEffect, useState } from "react";
import axios from "axios";
import personService from "./services/persons";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false)

  const addPerson = (event) => {
    event.preventDefault();

    const personOBject = {
      name: newName,
      number: newNumber,
    };

    const includesRepeatName = persons
      .map((person) => person.name.toLowerCase())
      .includes(newName.toLowerCase());

    const findRepeatPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLocaleLowerCase()
    );

    if (includesRepeatName) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      )
        ? (updatePersons(findRepeatPerson.id),
          setIsError(false),
          setErrorMessage(`Updated ${findRepeatPerson.name}`),
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000))
        : console.log("no confirmo");
    } else {
      personService.create(personOBject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setIsError(false);
        setErrorMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(`Must be at least 3 characters long`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      })
    }

    setNewName("");
    setNewNumber("");
  };

  const updatePersons = (id) => {
    const person = persons.find((p) => p.id === id);
    const newObjectPerson = { ...person, number: newNumber };
    personService.update(id, newObjectPerson).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
    })
    .catch((error) => {
      setIsError(true)
      setErrorMessage(`the person ${person.name} was already deleted from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    });
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
          setIsError(false)
          setErrorMessage(`Deleted ${returnedPerson.name}`)
        setTimeout(()=> {
          setErrorMessage(null)
        },4000)
        })
        .catch((error) => {
          setIsError(true)
          setErrorMessage(`the person ${name} was already deleted from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
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
      <Notification message={errorMessage} isError={isError}/>
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
