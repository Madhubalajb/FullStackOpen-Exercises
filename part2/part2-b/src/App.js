import React, {useState} from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0987654', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    { name: 'Madhu', number: '67890456', id: 5}
  ]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState(''); 

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
      alert(`${newPerson} is already added to phonebook`);
    }
  }
  const handleNewPerson = (event) => setNewPerson(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);
  let filteredItems = persons.filter(
    (contact) => contact.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );
  const phoneBook = () => filteredItems.map(per => <p key={per.id}>{per.name} {per.number} </p>);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filters={handleFilter} />
      <h2>add a new</h2>
      <PersonForm add={addPerson} person={handleNewPerson} number={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons func={phoneBook()} />
    </div>
  )
}

export default App;
