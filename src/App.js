import React, { Component } from 'react'
import './normalmode.css'
import { NormalMode } from './normalMode.js'
import { PowerMode } from './powerMode.js'
import { withCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" render={() => (<NormalMode cookies={this.props.cookies}/>)}/>
            <Route path="/power-mode" component={PowerMode}/>
          </div>
        </Router>
        <div className="credits">
          <p><a href="mailto:hello@pietervanwijk.com?subject=I%20have%20an%20idea%20to%20make%20your%20OV-fiets%20app%20better!">Feedback?</a></p>
          <p>Gebouwd door <a href="http://pietervanwijk.com">Pieter van Wijk</a></p>
          <p>Data afkomstig van <a href="http://openov.nl/">openOV</a></p>
        </div>
      </div>
    )
  };
}

export default withCookies(App);
