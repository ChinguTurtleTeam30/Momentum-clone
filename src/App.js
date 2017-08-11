import React, { Component } from 'react';
import './App.css';
import Clock from './clock';
//import Timer from './timer';

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
