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
        <Weather src='http://api.openweathermap.org/data/2.5/weather?' />
      </div>
    );
  }
}

export default App;
