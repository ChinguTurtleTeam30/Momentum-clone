import React, { Component } from 'react';

class Clock extends Component {
  render() {
    return (
      <div class="clock">
        <p class="time">--:--</p>
      </div>
    )
  }
}

class Timer extends Component {
  render() {
    return (
      <div class="timer main-flex-item">
        <form name="set-timer">
          <input id="timer-cal" name="timer-cal" type="datetime-local"></input>
          <input id="submit-timer" name="submit-timer" type="submit"></input>
        </form>
      </div>
      <p class="countdown"></p>
    );
  }
}

export { Clock, Timer };
