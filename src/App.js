import React, { Component } from 'react';
import './App.css';
import Clock from './clock';
import Weather from './weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main">
          <Clock />
        </div>
        <Weather />
      </div>
    );
  }
}

export default App;
