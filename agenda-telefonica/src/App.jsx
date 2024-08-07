import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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

  return (
    <div>
      <h2>Phonebook</h2>
      <label>filter shown with</label><input type='text' value={filterName} onChange={handleFilterNameChange}/>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App