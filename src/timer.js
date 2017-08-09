import React, { Component } from 'react';

class Calendar extends Component {
  render() {
    return (
      <input id="select-end-time" name="select-end-time" type="datetime-local" defaultValue={ this.props.endTime }/>
    )
  }
}

class CountdownDisplay extends Component {
  render() {
    return (
      <p className="countdown-display">{ this.props.countdown }</p>
    )
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

  jsFormatTime(htmlDateStr) {
    //split up html date string
    //into format [yyyy, mm, dd, hh, mm]
    //and input it into new JS Date obj
    const dateArr = htmlDateStr.match(/^(\d{4})(?:-)(\d{2})(?:-)(\d{2})(?:T)(\d{2})(?::)(\d{2})/),
          jsDate = new Date(dateArr[1], dateArr[2] - 1, dateArr[3], dateArr[4], dateArr[5]);
    return jsDate;
  }

  htmlFormatDate(jsDate) {
    //split up js date string
    //into format [(m)m, (d)d, yyyy, (h)h, mm, ss, "am"/"pm"]
    //and make it a string in the html date format
    const jsDateStr = jsDate.toLocaleString(),
          dateArr = jsDateStr.match(/^(\d{1,2})(?:\/)(\d{1,2})(?:\/)(\d{4})(?:,\s)(\d{1,2})(?::)(\d{2})(?::)(\d{2})(?:\s)([ap]m)/i),
          htmlDateStr = dateArr[3] +
                        '-' +
                        (dateArr[1].length < 2 ? '0' + dateArr[1] : dateArr[1]) +
                        '-' +
                        (dateArr[2].length < 2 ? '0' + dateArr[2] : dateArr[2]) +
                        'T' +
                        to24hr(dateArr[4], dateArr[7]) +
                        ':' +
                        dateArr[5];

    function to24hr(hours, ampm) {
      if (hours !== '12') {
        return ampm === 'am' ? hours : +hours + 12;
      }
      else return ampm === 'am' ? '00' : hours;
    }
  }

  handleClick() {

  }

  render() {
    return (
      <div className="timer">
        <CountdownDisplay countdown={ this.state.countdown } />
        <form className="timer-form">
          <Calendar endTime={ this.state.endTime } />
          <input id="start-timer" name="start-timer" type="submit" onClick={ this.handleClick }/>
          <input id="stop-timer" name="stop-timer" type="button"/>
          <input id="reset-timer" name="reset-timer" type="button"/>
        </form>
      </div>
    )
  }
}

export default Timer
