import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import {stations} from './stations.js'
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

const history = createBrowserHistory();

export class PowerMode extends Component {
  constructor () {
    super()
    this.state = {
      openOvResponse: '',
      suggestions: [],
      suggestionList: []
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
      suggestionList : suggestionList
    });
    history.push('?q=' + query)
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
      const savedQuery = this.props.location.search.split('q=')[1];
      if(savedQuery) {
        document.getElementById('searchbox').value = savedQuery
      }
      if(savedQuery) {
        this.search({target: {value: savedQuery}})
      }
    });
  }

  render() {
    return (
      <div>
        <div className="background">
          <div className="container">
            <center><p>Terug naar <Link className="normal-mode-button" to="/">Classic Mode</Link></p></center>
            <div className="search">
              <input placeholder="Filter stations.." className="searchbox" id="searchbox" onChange={this.search} autoComplete="off" />
            </div>

            <div id="availability">
              <ul className="suggestions-list" id="suggestions-list">{this.state.suggestionList}</ul>
            </div>
            <div id="error" className="error-box">
              <p>Sorry!</p>
              <p>Dit station hebben we niet gevonden.</p>
            </div>
          </div>
        </div>
      </div>

    );
  }

}
