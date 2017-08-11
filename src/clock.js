import React, { Component } from 'react';

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      curTime: new Date(),
      endTime: new Date(),
      countDown: '',
    };
  }

  renderTime() {
    const now = this.state.curTime.toLocaleTimeString();
    return now.match(/^\d{1,2}:\d{2}/)[0];
    /*function renderHours(time) {
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
    );*/
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ curTime: new Date()})
    }, 1000);
  }

  handleChange(event) {
    this.setState({ endTime: new Date(this.jsFormatDate(event.target.value)) });
  }

  handleClick(event) {
    event.preventDefault();
    if (!this.state.countDown) {
      setInterval(() => this.runTimer(), 1000)
    }
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

  runTimer() {
    this.setState({
      countDown: Math.round((this.state.endTime - this.state.curTime)/1000)
    });
  }

  render() {
    return (
      <div className="clock">
        <p className="time">
          { this.renderTime() }
        </p>
        <Timer initTime={ new Date() } onChange={ (event) => this.handleChange(event) } onClick={ (event) => this.handleClick(event) } countDown={ this.state.countDown } />
      </div>
    )
  }
}

class Timer extends Component {
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
        <p className="countdown">{ this.props.countDown }</p>
        <form className="timer-form">
          <input type="datetime-local" defaultValue={ this.htmlFormatDate(this.props.initTime) } onChange={ (event) => this.props.onChange(event) } />
          <input id="start-timer" name="start-timer" type="submit" onClick={ (event) => this.props.onClick(event) } />
          <input id="stop-timer" name="stop-timer" type="button" />
          <input id="reset-timer" name="reset-timer" type="button" />
        </form>
      </div>
    )
  }
}

export default Clock;
export { Timer };
