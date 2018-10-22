import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import {SearchBar} from './searchbar.js'



class App extends Component {
  constructor () {
    super()
    this.state = {
      openOv: '',
      station:''
    }  }

  // componentDidMount() {
  //   axios.get('http://fiets.openov.nl/locaties.json')
  //  .then(response => this.setState({openOv: response}))
  // }

  render () {
    return (
      <div>
        <SearchBar />
        <button>Go</button>
      </div>
    )
  }
}

export default App
