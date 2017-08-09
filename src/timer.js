import React, { Component }, from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countdown: 0,
      endTime: new Date(),
    };
  }
  
  render() {
    <div className="timer">
      <p className="countdown-display"></p>
      <form className="timer-form">
        <input id="select-end-time" name="select-end-time" type="datetime-local" defaultValue={ this.state.endTime }/>
        <input id="start-timer" name="start-timer" type="submit"/>
        <input id="stop-timer" name="stop-timer" type="button"/>
        <input id="reset-timer" name="reset-timer" type="button"/>
      </form>
    </div>
  }
}

export default Timer;
