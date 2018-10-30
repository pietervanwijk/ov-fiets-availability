import React, { Component } from 'react'
import './App.css'
import { NormalMode } from './normalMode.js'
import { PowerMode } from './powerMode.js'

class App extends Component {

  render() {
    return (
      <NormalMode />
    );
  }

}

export default App
