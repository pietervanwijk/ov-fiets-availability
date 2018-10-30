import React, { Component } from 'react'
import './normalmode.css'
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
