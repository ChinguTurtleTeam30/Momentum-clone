import React, { Component } from 'react';
// import logo from './logo.svg';
// use like: <img src={logo} className="App-logo" alt="logo" />
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="links component corner">Links</div>
        <div className="weather component corner"><p className="temperature">60&deg;</p><p className="location">San Francisco</p></div>
        <div className="main">
        <div className="clock main-flex-item">
        <p className="time">XX:XX</p>
        </div>
        <div className="timer main-flex-item">
        <form name="set-timer">
        <input id="timer-cal" name="timer-cal" type="datetime-local" value="2017-08-04T17:05" />
        <input id="submit-timer" name="submit-timer" type="submit" />
        </form>
        <p className="countdown"></p>
        </div>
        <div className="goal main-flex-item">
        <form name="goal-form">
        <label><input id="set-goal" name="set-goal" type="text" autocomplete="off" /><br/>What's your goal today?</label>
        </form>
        </div>
        </div>
        <div className="settings component corner"><i className="fa fa-cog"></i></div>
        <div className="quote component"><p>"Twas brillig and the slithy toves"</p></div>
        <div className="todo component corner">Todo</div>
      </div>
    );
  }
}

export default App;
