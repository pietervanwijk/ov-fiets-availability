import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import {stations} from './stations.js'
import Confetti from 'react-dom-confetti';
import { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export class NormalMode extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);
    const { cookies } = props;
    this.state = {
      selection:'',
      openOvResponse: '',
      suggestions: [],
      availability: '',
      suggestionList: [],
      confetti: "",
      savedStation: cookies.get('station')
    };
  }

  search = (e) => {
    let query = e.target.value.toLowerCase();
    let suggestions = stations.filter(v => v.name.toLowerCase().includes(query));
    let suggestionList = suggestions.map(r => (
      <li className="suggestion" key={r.code} onClick={() => { this.setValue(r)}}>
        {r.name}
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
      document.getElementById("save-button").style.display = "inline-block";
      document.getElementById("save-confirmation").style.display = "none";
      if (availability > 10) {
        this.setState({
          confetti: true
        });
        setTimeout(this.resetConfetti, 200);
      }
    } else {
      document.getElementById("availability").style.display = "none";
      document.getElementById("error").style.display = "block";
    }
  }

  saveStation = () => {
    const { cookies } = this.props;
    let station = this.state.selection;

    cookies.set('station', station, { path: '/' });
    document.getElementById("save-button").style.display = "none";
    document.getElementById("save-confirmation").style.display = "inline-block";
  }

  loadSavedStation = () => {
    let availability = parseInt(this.state.openOvResponse.data.locaties[this.state.savedStation.code].extra.rentalBikes);
    let station = this.state.savedStation;
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
      });
      setTimeout(this.resetConfetti, 200);
    }
  }

  resetConfetti = () => {
    this.setState({
      confetti: false
    });
  }

  componentDidMount () {
    axios.get('http://fiets.openov.nl/locaties.json').then(response => {
      this.setState({
        openOvResponse: response
      });
      if(this.state.savedStation) {
        this.loadSavedStation();
      }
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
              <h1>Hoeveel OV-fietsen zijn er nog?</h1>
              <form action="javascript:void(0);" onSubmit={this.handleSubmit}>
              <input placeholder="Zoek station.." className="searchbox" id="searchbox" onChange={this.search} autoComplete="off"/>
              <ul className="suggestions-list" id="suggestions-list">{this.state.suggestionList}</ul>
              <input type="submit" value="Toon fietsen"/>
              </form>
            </div>
            <div id="availability" className="result-box">
              <p>Op station {this.state.selection.name} zijn</p>
              <p className="result">{this.state.availability}</p>
              <div className="confetti">
                <Confetti active={this.state.confetti} config={ confettiConfig }/>
              </div>
              <p>OV-fietsen beschikbaar</p>
              <button onClick={this.saveStation} id="save-button" className="save-button">Bewaar dit station</button>
              <p id="save-confirmation" className="save-confirmation">Station {this.state.selection.name} is opgeslagen in deze browser.</p>
            </div>
            <div id="error" className="result-box">
              <p>Sorry!</p>
              <p>Dit station hebben we niet gevonden.</p>
            </div>
          </div>
        </div>
        <div className="power-mode-switch">
          <p>Nieuw: <Link className="power-mode-button" to="/power-mode">Power Mode</Link></p>
        </div>
      </div>

    );
  }

}
