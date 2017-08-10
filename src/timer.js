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

  jsFormatDate(htmlDateFormat) {
    //split up html date string
    //into format [yyyy, mm, dd, hh, mm]
    //and input it into new JS Date obj
    const htmlDateArr =
      htmlDateFormat
        .match(/^(\d{4})(?:-)(\d{2})(?:-)(\d{2})(?:T)(\d{2})(?::)(\d{2})/),
      jsDate = new Date(htmlDateArr[1], htmlDateArr[2] - 1, htmlDateArr[3],
        htmlDateArr[4], htmlDateArr[5]);
    return jsDate;
  }

  htmlFormatDate(jsDateFormat) {
    //split up js date string
    //into format [(m)m, (d)d, yyyy, (h)h, mm, ss, "am"/"pm"]
    //and make it a string in the html date format
    const jsDateArr =
            jsDateFormat
              .toLocaleString()
              .match(/^(\d{1,2})(?:\/)(\d{1,2})(?:\/)(\d{4})(?:,\s)(\d{1,2})(?::)(\d{2})(?::)(\d{2})(?:\s)([ap]m)/i),
          htmlDateStr = jsDateArr[3] + '-' +
            (jsDateArr[1].length < 2 ? '0' + jsDateArr[1] : jsDateArr[1]) +
            '-' +
            (jsDateArr[2].length < 2 ? '0' + jsDateArr[2] : jsDateArr[2]) +
            'T' + to24hr(jsDateArr[4], jsDateArr[7]) + ':' + jsDateArr[5];

    function to24hr(hours, ampm) {
      if (hours !== '12') {
        return ampm === 'am' ? hours : +hours + 12;
      }
      else return ampm === 'am' ? '00' : hours;
    }

    return htmlDateStr
  }

  handleClick() {

  }

  render() {
    return (
      <div className="timer">
        <CountdownDisplay countdown={ this.state.countdown } />
        <form className="timer-form">
          <Calendar endTime={ this.htmlFormatDate(this.state.endTime) } />
          <input id="start-timer" name="start-timer" type="submit" onClick={ this.handleClick }/>
          <input id="stop-timer" name="stop-timer" type="button"/>
          <input id="reset-timer" name="reset-timer" type="button"/>
        </form>
      </div>
    )
  }
}

export default Timer
