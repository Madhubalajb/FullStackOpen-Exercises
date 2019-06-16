import React, {useState} from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0987654', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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
  const handleNewPerson = (event) => setNewPerson(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  
  const phoneBook = () => persons.map(per => <p key={per.id}>{per.name} {per.number} </p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter add={addPerson} person={handleNewPerson} number={handleNewNumber} />
      <h2>add a new</h2>
      <PersonForm />
      <h2>Numbers</h2>
      <Persons func={phoneBook()} />
    </div>
  )
}

export default App;
