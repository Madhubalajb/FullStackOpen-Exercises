import React, {useState, useEffect} from 'react'
import { Card, Alert, Row, Col } from 'react-bootstrap'
import logo from '../Images/phone-book.png'
import About from './About'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Notification from './Notification'
import personServices from '../services/phoneService'

const Home = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('logged_PhoneApp_User')
    if(loggedUser) {
      personServices.getData()
      .then(persons => setPersons(persons.filter(person => person.user.id === JSON.parse(loggedUser).id)))
    }
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
        setNewPerson('')
        setNewNumber('')
      })
    }
    else {
      let check = window.confirm(`${newPerson} is already exists, do you want to replace the number?`)
      if(check) {
        const update = persons.find(p => p.name === newPerson)
        const updateObject = { ...update, number: newNumber}
        personServices
        .updateData(updateObject.id, updateObject)
        .then(updated => {
          setPersons(persons.map(pp => pp.id !== updateObject.id ? pp : updated))
          showMessage(<Alert variant="success">Updated contact {updateObject.name}</Alert>)
          setNewNumber('')
          setNewPerson('')
        })
        .catch(error => {
          showMessage(<Alert variant="warning">Person ${newPerson} has already been deleted</Alert>)
          setNewPerson('')
          setNewNumber('')
        })
      }
    }
  }

  const removePerson = (person) => {
    let check = window.confirm(`Wanna delete ${person.name}?`)
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

  return (
    <center className = "container">
    <Notification msg = {message} />

    <div>
        <img src={logo} alt="Logo" />
        <h2>Phonebook App</h2>
        <Filter filters = {handleFilter} />
    </div>

    <div className = "row main-row">
        <Card className = "col-sm-6">
        <h2>Add a contact</h2>
        <PersonForm add = {addPerson} person = {handleNewPerson} number = {handleNewNumber} newNumber={newNumber} newPerson={newPerson}/>
        </Card>

        <Card className = "col-sm-6">
        <Row>
            <Col className="col-sm-10"><h2>Contacts</h2></Col>
            <Col className="col-sm-1"><i className="material-icons">contact_phone</i></Col>
        </Row>
        <Persons filteredItems={filteredItems} remove={removePerson()} />
        </Card>
    </div>
    </center>
  )
}

export default Home;
