import React, {useState, useEffect} from 'react'
import personServices from './services/phonebook'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm'
import Filter from './components/Filter';
import Notification from './components/Notification'
import { Button, Card, Alert, Badge} from 'react-bootstrap'
import logo from './Images/phone-book.png'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState(''); 
  const [message, setMessage] = useState('')

  useEffect(() => {
     personServices.getData().then(persons => {setPersons(persons)})
  }, [])

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const check = persons.some(per => per.name === newPerson)
    if (!check) {
      const person = {
        name: newPerson,
        number: newNumber,
        id: persons.length + 1
      }
      personServices
      .addData(person)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        showMessage(<Alert variant="success">Added contact {newPerson}</Alert>)
        setNewPerson('')
        setNewNumber('')
      })
      .catch(error => {
        showMessage(<Alert variant="warning">Person validation failed: Name & Number should be a length of minimum 3, 8 respectively. </Alert>)
      })
    }
    else {
      let check = window.confirm(`${newPerson} is already added to phonebook, replace the old number with the new one?`)
      if(check) {
        const update = persons.find(p => p.name === newPerson)
        const updateObject = { ...update, number: newNumber}
        personServices
        .updateData(updateObject.id, updateObject)
        .then(updated => {
          setPersons(persons.map(pp => pp.id !== updateObject.id ? pp : updated))
          showMessage(<Alert variant="success">Updated contact {updateObject.name}</Alert>)
        })
        .catch(error => {
          showMessage(<Alert variant="warning">Person ${newPerson} has already been deleted</Alert>)
        })
      }
    }
  }

  const removePerson = (person) => {
    let check = window.confirm(`Delete ${person.name} ?`)
    if(check) {
      personServices
      .deleteData(person.id)
      .then(deleted => {
        setPersons(persons.filter(per => per.id !== person.id))
        showMessage(<Alert variant="success">Deleted contact {person.name}</Alert>)
      })
      .catch(error => {
        showMessage(<Alert variant="warning">Person ${newPerson} has already been deleted</Alert>)
      })
    }
  }

  const handleNewPerson = (event) => setNewPerson(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)

  let filteredItems = persons.filter(contact => contact.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

  const phoneBook = () => filteredItems.map(per => 
      <p key={per.id}>
        {per.name}: {per.number} <Button className = "btn btn-sm" onClick={() => {removePerson(per)}}>Delete</Button>
      </p>);

  return (
    <center className = "container">
      <Notification msg = {message} />
      <div>
        <div>
          <img src={logo} alt="Logo" />
          <h2>Phonebook App</h2>
        </div>
        <p>made for fun to experiment some React knowledge :)</p>
        <p><Badge>React</Badge> + <Badge>Express</Badge> + <Badge>MongoDB</Badge> + <Badge>SASS</Badge> + <Badge>Bootstrap</Badge></p>
        <Filter filters = {handleFilter} />
      </div>
      <div className = "row main-row">
        <Card className = "col-sm-6">
          <h2>Add a contact</h2>
          <PersonForm add = {addPerson} person = {handleNewPerson} number = {handleNewNumber} />
        </Card>
        <Card className = "col-sm-6">
          <h2>Numbers ...</h2>
          <Persons func = {phoneBook()} />
        </Card>
      </div>
      <p className="footer">designed & developed by <a href="https://madhubalajb.github.io/" rel="noopener noreferrer" target="_blank">Madhubala Jayakumaran</a> 
        <br/> On live since 28th June 2019</p>
    </center>
  )
}

export default App;