import React, { Component } from 'react'
import './normalmode.css'
import { NormalMode } from './normalMode.js'
import { PowerMode } from './powerMode.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      powerMode: false
    }
  }

  setPowerMode = () => {
    this.setState({
      powerMode: true
    });
  }

  setNormalMode = () => {
    this.setState({
      powerMode: false
    });
  }

  render() {
    let powerMode = this.state.powerMode;
    let module;
    let modeButton

    if (powerMode) {
      module = <PowerMode />;
      modeButton = <p>Terug naar: <a onClick={this.setNormalMode}>Classic Mode</a></p>;
    } else {
      module = <NormalMode />;
      modeButton = <p>Nieuw: <a style={{color: red, textDecoration: underline}} onClick={this.setPowerMode}>Power Mode</a></p>;

    };

    return (
      <div>
        {module}
        <div className="power-mode-switch">
          {modeButton}
        </div>
        <div className="credits">
          <p><a href="mailto:hello@pietervanwijk.com?subject=I%20have%20an%20idea%20to%20make%20your%20OV-fiets%20app%20better!">Feedback?</a></p>
          <p>Gebouwd door <a href="http://pietervanwijk.com">Pieter van Wijk</a></p>
          <p>Data afkomstig van <a href="http://openov.nl/">openOV</a></p>
        </div>
      </div>
    )
  };
}

export default App
