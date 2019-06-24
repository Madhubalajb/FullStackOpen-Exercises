import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [countryToShow, setCountryToShow] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])
  
  const showCountries = () => { 
    return (
    <div>
        <h2>{countryToShow[0].name}</h2> 
        <p>capital: {countryToShow[0].capital}</p>
        <p>population: {countryToShow[0].population}</p>
        <h2>languages</h2>
        <ul>{countryToShow[0].languages.map(lang => <li key = {countryToShow[0].languages.lang}>{lang.name}</li>)}</ul>
        <img src={countryToShow[0].flag} alt = 'Flag' width = '100' height = '100' />
    </div>
  )}
  
  const handleFilter = (event) =>  {
    setFilter(event.target.value);
    const filtered = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    setCountryToShow(filtered);
    console.log(countryToShow);
  } 

  const filterCountries = () => {
    if(countryToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    else if (countryToShow.length === 1) {
      return <div>{}</div>
    }
    else { 
      return (<div>{countryToShow.map(item => 
                <p key = {item.name}>{item.name} 
                <button>show</button></p>
            )}</div>)
    }
  }

  return (
    <div>
        <div>find countries <input onChange = {handleFilter} /></div>
        {filterCountries()}
    </div>
  )
}

export default App;
