export default function Persons({personsToShow}) {
  return (
    <>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
}
