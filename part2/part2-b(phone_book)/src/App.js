import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Navigation from './components/Navigation'

const App = () => {

  return (
    <Router>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
    </Router>
  )
}

export default App;
