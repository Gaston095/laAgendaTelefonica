import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    const personOBject = {
      name : newName
    }

    const includesRepeatName = persons.map(person => person.name).includes(newName)

    if (includesRepeatName) {
      alert(`${newName} is already added to phonebook`)
    }else {
      setPersons(persons.concat(personOBject))
    }

    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

/*   const includesDuplicatesNames = () => {
    const arrayNames = persons.map(person => person.name)
    (arrayNames.includes(newName))
  } */

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App