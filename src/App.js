import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Autosuggest from 'react-autosuggest';

class App extends Component {
  constructor () {
    super() 
    this.state = {
      goals: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (playerName) {
     console.log('function triggered') 
     axios.get('http://fiets.openov.nl/locaties.json')
    .then(response => this.setState({goals: response.data.result[0].player_goals}))
  }

  render () {
    return (
      <div>
        <div>
          <h1>Goals {this.state.goals}</h1>
        </div>
        <div className='button__container'>
          <button className='button' onClick={() => this.handleClick('van persie robin')}>Robin van Persie</button>
        </div>
        <div className='button__container'>
          <button className='button' onClick={() => this.handleClick('toornstra jens')}>Jens Toornstra</button>
        </div>
      </div>
    )
  }
}
export default App