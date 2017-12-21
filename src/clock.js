import React, { Component } from 'react';

class Clock extends Component {
  renderTime() {
    const now = this.props.currentTime.toLocaleTimeString();
    //return only hrs & mins
    return now.match(/^\d{1,2}:\d{2}/)[0];
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
