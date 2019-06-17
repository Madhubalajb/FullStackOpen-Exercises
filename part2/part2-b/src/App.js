import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState(''); 

  useEffect(() => {
    axios
      .get(' http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

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
  let filteredItems = persons.filter(contact => contact.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
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
