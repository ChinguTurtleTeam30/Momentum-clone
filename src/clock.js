import React, { Component } from 'react';

class Clock extends Component {
  render() {
    const date = new Date();
    return (
      <div className="clock">
        <p className="time">{ (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() !== 0 ? date.getHours() : 12) } : { (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()), (date.getHours() >=12 ? 'pm' : 'am' ) }
        </p>
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
        <p class="countdown"></p>
      </div>
    );
  }
}

export { Clock, Timer };
