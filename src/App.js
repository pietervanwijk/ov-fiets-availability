import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import {stations} from './stations.js'
import Confetti from 'react-dom-confetti';

class App extends Component {
  constructor () {
    super()
    this.state = {
      selection:'',
      openOvResponse: '',
      suggestions: [],
      availability: '',
      suggestionList: [],
      confetti: ""
    };
  }

  search = (e) => {
    let query = e.target.value.toLowerCase();
    let suggestions = stations.filter(v => v.name.toLowerCase().includes(query));
    let suggestionList = suggestions.map(r => (
      <li className="suggestion" key={r.code}>
        {r.name} <span className="availability">{parseInt(this.state.openOvResponse.data.locaties[r.code].extra.rentalBikes)}</span>
      </li>
    ))
    this.setState({
      suggestions: suggestions,
      suggestionList : suggestionList
    });
  }

  setValue = (selection) => {
    document.getElementById("searchbox").value = selection.name;
    document.getElementById("searchbox").focus();
    this.setState({
      suggestionList : [],
      suggestions: [selection]
    });
  }

  handleSubmit = (e) => {
    let availability = parseInt(this.state.openOvResponse.data.locaties[this.state.suggestions[0].code].extra.rentalBikes)
    if (this.state.suggestions.length > 0 ) {
      let station = this.state.suggestions[0];
      this.setState({
        suggestionList : [],
        selection: station,
        availability: availability
      });
      document.getElementById("error").style.display = "none";
      document.getElementById("availability").style.display = "block";
      if (availability > 10) {
        this.setState({
          confetti: true
        })
      }
    } else {
      document.getElementById("availability").style.display = "none";
      document.getElementById("error").style.display = "block";
    }
  }

  componentDidMount () {
    axios.get('http://fiets.openov.nl/locaties.json').then(response => {
      this.setState({
        openOvResponse: response
      });
    let suggestionList = stations.map(r => (
      <li className="suggestion" key={r.code}>
        {r.name} <span className="availability">{parseInt(this.state.openOvResponse.data.locaties[r.code].extra.rentalBikes)}</span>
      </li>
    ))
    this.setState({
      suggestionList : suggestionList
    });
    });
  }

  render() {

    const confettiConfig = {
      angle: 90,
      spread: 129,
      startVelocity: 39,
      elementCount: 200,
      decay: 0.9
    };

    return (
      <div>
        <div className="background">
          <div className="container">
            <div className="search">
              <input placeholder="Filter stations.." className="searchbox" id="searchbox" onChange={this.search} autoComplete="off" />
            </div>
            <div id="availability" className="result-box">
              <ul className="suggestions-list" id="suggestions-list">{this.state.suggestionList}</ul>
            </div>
            <div id="error" className="error-box">
              <p>Sorry!</p>
              <p>Dit station hebben we niet gevonden.</p>
            </div>
          </div>
        </div>
        <div className="credits">
          <p><a href="mailto:hello@pietervanwijk.com?subject=I%20have%20an%20idea%20to%20make%20your%20OV-fiets%20app%20better!">Feedback?</a></p>
          <p>Gebouwd door <a href="http://pietervanwijk.com">Pieter van Wijk</a></p>
          <p>Data afkomstig van <a href="http://openov.nl/">openOV</a></p>
        </div>
      </div>

    );
  }

}

export default App
