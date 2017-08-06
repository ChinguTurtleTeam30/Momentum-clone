import React, { Component } from 'react';

class Clock extends React.Component {
  renderTime() {
    const date = new Date();
    function renderHours(time) {
      return (
        time.getHours() > 12 ? (time.getHours() - 12).toString() : time.getHours() !== 0 ? time.getHours().toString() : '12';
      );
    }
    function renderMins(time) {
      return (
        time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes().toString();
      );
    }
    function renderSign(time) {
      return (
        time.getHours() >= 12 ? 'pm' : 'am';
      );
    }
    return (
      renderHours(date) + renderMins(date) + renderSign(date);
    );
  }
  render() {
    return (
      <div className="clock">
        <p className="time">
          { this.renderHours(); }
        </p>
      </div>
    )
  }
}

class Timer extends React.Component {
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
