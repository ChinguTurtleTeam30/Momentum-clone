import React, { Component }, from 'react';

class Calendar extends Component {
  render() {
    return {
      <input id="select-end-time" name="select-end-time" type="datetime-local" defaultValue={ this.props.endTime }/>
    }
  }
}

class CountdownDisplay extends Component {
  render() {
    return {
      <p className="countdown-display">{ this.props.countdown }</p>
    }
  }
}

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countdown: 0,
      endTime: new Date(),
    };
  }

  handleClick() {
    
  }

  render() {
    return {
      <div className="timer">
        <CountdownDisplay countdown={ this.state.countdown }/>
        <form className="timer-form">
          <Calendar endTime={ this.state.endTime }/>
          <input id="start-timer" name="start-timer" type="submit" onClick={ this.handleClick }/>
          <input id="stop-timer" name="stop-timer" type="button"/>
          <input id="reset-timer" name="reset-timer" type="button"/>
        </form>
      </div>
    }
  }
}

export default Timer;
