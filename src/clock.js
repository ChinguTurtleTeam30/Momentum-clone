import React, { Component } from 'react';

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      now: new Date(),
    };
  }

  renderTime() {
    const date = this.state.now;
    function renderHours(time) {
      return (
        time.getHours() > 12 ? (time.getHours() - 12).toString() : time.getHours() !== 0 ? time.getHours().toString() : '12'
      );
    }
    function renderMins(time) {
      return (
        time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes().toString()
      );
    }
    function renderSign(time) {
      return (
        time.getHours() >= 12 ? 'pm' : 'am'
      );
    }
    return (
      renderHours(date) + ':' + renderMins(date) + ' ' + renderSign(date)
    );
  }

//this updates every second
//but it doesn't need to
//the clock only displays minutes
//try updating every 2, 3, 20, or 30 secs
//and see how it works
  componentDidMount() {
    setInterval(() => {
      this.setState({ now: new Date()})
    }, 1000);
  }

  render() {
    return (
      <div className="clock">
        <p className="time">
          { this.renderTime() }
        </p>
      </div>
    )
  }
}

export default Clock;
