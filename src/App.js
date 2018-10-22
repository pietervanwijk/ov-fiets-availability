import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Autosuggest from 'react-autosuggest';
import {stations} from './stations.js'

// Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : stations.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class App extends Component {
  constructor () {
    super()
    this.state = {
      selection:'',
      value: '',
      suggestions: [],
      availability: '',
      fetchTime: ''
    };
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  shouldRenderSuggestions = (value) => {
  return value.trim().length > 1;
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  //update state of App class
  onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
    this.setState({ selection: suggestion });
    axios.get('http://fiets.openov.nl/locaties.json').then(response => {
      this.setState({ availability: response.data.locaties[suggestion.code].extra.rentalBikes, fetchTime: response.data.locaties[suggestion.code].extra.fetchTime });
    });
  }

  clearSearchBox = () => {
    document.getElementsByClassName("react-autosuggest__input")[0].value = '';
    this.setState({ value: '' });
    document.getElementsByClassName("availability")[0].style.display = "block";
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Zoek station',
      value,
      onChange: this.onChange
    };

    const station = this.state.selection.name;

    // Finally, render it!
    return (
      <div className="container">
      <div className="search">
        <h1>Hoeveel OV-fietsen zijn er nog?</h1>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
          />
        <button onClick={this.clearSearchBox}>Toon</button>
        </div>
        <div className="availability">
          <p>Op station {station} zijn</p>
          <p className="result">{this.state.availability}</p>
          <p>OV-fietsen beschikbaar</p>
        </div>
      </div>

    );
  }

}

export default App
