import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilter = (event) => setFilter(event.target.value);
  let filteredItems = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  const showCountry = () => {
    if(filteredItems.length > 10) {
      return (<p>Too many matches, specify another filter</p>)
    }
    else if (filteredItems.length === 1) {
      return (<div>{filteredItems.map(item => 
        <div>
          <h2>{item.name}</h2> 
          <p>capital: {item.capital}</p>
          <p>population: {item.population}</p>
          <h2>languages</h2>
          <ul>{item.languages.map(lang => <li>{lang.name}</li>)}</ul>
          <img src={item.flag} alt='Flag' width='100' height='100' />
        </div>
      )}</div>) 
    }
    else {
      return (<div>{filteredItems.map(item => <p>{item.name}</p>)}</div>)
    }
  }

  return (
    <div>
        <div>find countries <input onChange={handleFilter} /></div>
        {showCountry()}
    </div>
  )
}

export default App;
