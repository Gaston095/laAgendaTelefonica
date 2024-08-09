export default function Persons({personsToShow, removePersons}) {
  return (
    <>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={()=> {removePersons(person.id, person.name)}}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
