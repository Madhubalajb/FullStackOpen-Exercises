import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'

const App = () => {

  return (
    <Router>
        <Navigation />
        <Route exact path="/" component={Home} />
    </Router>
  )
}

export default App;
