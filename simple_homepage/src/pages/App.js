import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SearchBox from './SearchBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header page="home"/>
        <SearchBox className="searchBox"/>
      </div>
    );
  }
}

export default App;
