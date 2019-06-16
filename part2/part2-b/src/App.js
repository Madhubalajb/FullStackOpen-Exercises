import React, {useState} from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newPerson, setNewPerson] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newPerson,
      id: persons.length + 1
    }
    setPersons(persons.concat(person));
    setNewPerson('');
  }

  const handleNewPerson = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const phoneBook = () => persons.map(per => <p>{ per.name }</p>)

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
