import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    const personOBject = {
      name : newName,
      number: newNumber,
      id : persons.length + 1
    }

    const includesRepeatName = persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())

    if (includesRepeatName) {
      alert(`${newName} is already added to phonebook`)
    }else {
      setPersons(persons.concat(personOBject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }
  
  const personsToShow = (filterName === '')
  ? persons
  : persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())

  useEffect(()=> {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App