import React, {useState, useEffect} from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import logo from '../Images/phone-book.png'
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
  const [user, setUser] = useState('')
  
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('logged_PhoneApp_User')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      personServices.getData().then(persons => setPersons(persons.filter(person => person.user.id === JSON.parse(loggedUser).id)))
    }
    else {
      setUser('')
    }
  }, [])

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const makeNull = () => {
    setNewPerson('')
    setNewNumber('')
  }

  const validateNumber = (num) => {
    if(!isNaN(Number(num))) {
      const number = String(num)
      let count = 0
      for (let i = 0; i < number.length; i++) {
        if(number[i] === '0') 
          count += 1
      }
      return (count === number.length) ? false : true
    }
    else {
      return false
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(user === '') {
      showMessage(<div id="snackbar">Please Login / Signup before adding contacts</div>)
      makeNull()
    }
    else if(validateNumber(newNumber)) {
      const check = persons.some(per => per.name === newPerson)
      if (!check) {
        const person = {
          name: newPerson,
          number: newNumber,
          id: persons.length + 1
        }
        personServices.addData(person)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          showMessage(<div id="snackbar">Added contact {newPerson}</div>)
          makeNull()
        })
        .catch(error => {
          showMessage(<div id="snackbar">Person validation failed: Name & Number should be a length of minimum 3, 8 respectively. </div>)
          makeNull()
        })
      }
      else {
        let check = window.confirm(`${newPerson} is already exists, do you want to replace the number?`)
        if(check) {
          const update = persons.find(p => p.name === newPerson)
          const updateObject = { ...update, number: newNumber}
          personServices.updateData(updateObject.id, updateObject)
          .then(updated => {
            setPersons(persons.map(pp => pp.id !== updateObject.id ? pp : updated))
            showMessage(<div id="snackbar">Updated contact {updateObject.name}</div>)
            makeNull()
          })
          .catch(error => {
            showMessage(<div id="snackbar">{newPerson} has already been deleted</div>)
            makeNull()
          })
        }
      }
    }
    else {
      showMessage(<div id="snackbar">Please enter valid Number</div>)
      makeNull()
    }
  }

  const removePerson = (person) => {
    let check = window.confirm(`Wanna delete ${person.name}?`)
    if(check) {
      personServices.deleteData(person.id)
      .then(deleted => {
        setPersons(persons.filter(per => per.id !== person.id))
        showMessage(<div id="snackbar">Deleted contact {person.name}</div>)
      })
      .catch(error => {
        showMessage(<div id="snackbar">Person {newPerson} has already been deleted</div>)
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
        <img className="phonebook_logo" src={logo} alt="Phonebook Logo" />
        <h2>Phonebook</h2>
        <Filter filters = {handleFilter} />
    </div>

    <div className = "row main-row">
        <Card className = "col-sm-6">
        <h2>Add a contact</h2>
        <PersonForm add = {addPerson} person = {handleNewPerson} number = {handleNewNumber} newNumber={newNumber} newPerson={newPerson}/>
        </Card>

        <Card className = "col-sm-6">
        <Row>
            <Col><h2>Contacts</h2></Col>
        </Row>
        <Persons filteredItems={filteredItems} remove={removePerson} />
        </Card>
    </div>
    </center>
  )
}

export default Home;
