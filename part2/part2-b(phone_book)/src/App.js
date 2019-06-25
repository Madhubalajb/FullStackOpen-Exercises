import React, {useState, useEffect} from 'react';
import personServices from './services/phonebook';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState(''); 

  useEffect(() => {
     personServices.getData().then(persons => {setPersons(persons)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const check = persons.some(per => per.name === newPerson)
    if (!check) {
      const person = {
        name: newPerson,
        number: newNumber,
        id: persons.length + 1
      }
      personServices.addData(person).then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewPerson('')
        setNewNumber('')
      })
    }
    else {
      window.confirm(`${newPerson} is already added to phonebook, replace the old number with the new one?`)
      const update = persons.find(p => p.name === newPerson)
      const updateObject = { ...update, number: newNumber}
      personServices.updateData(updateObject.id, updateObject).then(updated => {
        setPersons(persons.map(pp => pp.id !== updateObject.id ? pp : updated))
      })
    }
  }
  const removePerson = (person) => {
    window.confirm(`Delete ${person.name} ?`)
    personServices.deleteData(person.id)
    .then(deleted => {
      setPersons(persons.filter(per => per.id !== person.id))
    })
    .catch(error => {
      console.log("fail")
    })
  }
  const handleNewPerson = (event) => setNewPerson(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)
  let filteredItems = persons.filter(contact => contact.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  const phoneBook = () => filteredItems.map(per => 
      <p key={per.id}>
        {per.name}: {per.number} <button onClick={() => {removePerson(per)}}>Delete</button>
      </p>);

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
