import React, { Component } from 'react';
// import logo from './logo.svg';
// use like: <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import { Clock } from './clock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main">
          <Clock />
        </div>
      </div>
    );
  }
}

export default App;
