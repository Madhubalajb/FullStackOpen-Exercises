import React, {useState} from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
  ]);
  const [newPerson, setNewPerson] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const check = persons.some(per => per.name === newPerson);
    if (!check) {
      const person = {
        name: newPerson,
        id: persons.length + 1
      }
      setPersons(persons.concat(person));
      setNewPerson(''); 
    }
    else {
      alert(`${newPerson} is already added to phonebook`)
    }
  }

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value)
  }

  const phoneBook = () => persons.map(per => <p key={per.id}>{per.name}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div> 
          name: <input onChange={handleNewPerson} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { phoneBook() }
    </div>
  )
}

export default App;
