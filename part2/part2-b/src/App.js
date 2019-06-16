import React, {useState} from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0987654', id: 1}
  ]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const check = persons.some(per => per.name === newPerson);
    if (!check) {
      const person = {
        name: newPerson,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(person));
      setNewPerson(''); 
      setNewNumber('');
    }
    else {
      alert(`${newPerson} is already added to phonebook`)
    }
  }
  const handleNewPerson = (event) => {
    setNewPerson(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }
  const phoneBook = () => persons.map(per => <p key={per.id}>{per.name} {per.number} </p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNewPerson} required/> </div>
        <div>number: <input onChange={handleNewNumber} required/></div>
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
