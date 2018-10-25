import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import {stations} from './stations.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      selection:'',
      value: '',
      suggestions: [],
      availability: '',
      suggestionList: []
    };
  }

  search = (e) => {
    let query = e.target.value.toLowerCase();
    let suggestions = stations.filter(v => v.name.toLowerCase().includes(query));
    let suggestionList = suggestions.map(r => (
      <li className="react-autosuggest__suggestion" key={r.code} onClick={() => { this.setValue(r)}}>
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
    let station = this.state.suggestions[0];
    this.setState({
      selection: station
    });
    axios.get('http://fiets.openov.nl/locaties.json').then(response => {
      this.setState({ availability: response.data.locaties[this.state.suggestions[0].code].extra.rentalBikes });
    });
    document.getElementById("availability").style.display = "block";

  }

  render() {
    return (
      <div className="container">
        <div className="search">
          <h1>Hoeveel OV-fietsen zijn er nog?</h1>
          <form action="#" onSubmit={this.handleSubmit}>
          <input placeholder="Zoek station.." className="react-autosuggest__input" id="searchbox" onChange={this.search}/>
          <ul className="react-autosuggest__suggestions-list" id="suggestions-list">{this.state.suggestionList}</ul>
          <input type="submit" value="Toon"/>
          </form>
        </div>
        <div id="availability" className="availability">
          <p>Op station {this.state.selection.name} zijn</p>
          <p className="result">{this.state.availability}</p>
          <p>OV-fietsen beschikbaar</p>
        </div>
      </div>

    );
  }

}

export default App
