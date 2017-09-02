import React, { Component } from 'react';
import './clock.css';

 function Goal(props) {
   if (!props.goal) {
    return (
      <form
        id="setGoal"
        name="goalForm"
        onSubmit={ (event) => props.onSubmit(event)
      }>
        <input id="goalInput" name="goalInput" type="text" />
        <label htmlFor="goalInput">What is your goal?</label>
      </form>
    );
  }
  else {
    return (
      <div className="displayGoal">
        <input id="goalComplete" name="goalComplete" type="checkbox"
                value="complete" onChange={ (event) => props.onCheck(event) }
        />
        <span id="goalLine" className={ props.strike }>{ props.goal }</span>
        <input id="xGoal" name="xGoal" type="button" value="&times;"
                onClick={ (event) => props.onClickX(event) }
        />
      </div>
    );
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

  render() {
    return (
      <div className="timer">
        <p className="countdown">{ this.props.countdown }</p>
        <form className="timer-form"
              onSubmit={ (event) => this.props.onSubmit(event) }>
          <input type="datetime-local"
                  defaultValue={ this.htmlFormatDate(this.props.initTime) }
                  onChange={ (event) => this.props.onChange(event) } />
          <input id="start-timer" name="start" type="submit" value="start" />
          <input id="stop-timer" name="stop" type="button" value="stop"
                  onClick={ (event) => this.props.onClick(event) } />
          <input id="reset-timer" name="reset" type="button" value="reset"
                  onClick={ (event) => this.props.onClick(event) } />
        </form>
      </div>
    )
  }
}

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
        <Timer
          initTime={ new Date() }
          onChange={ (event) => this.calendarChange(event) }
          onClick={ (event) => this.timerClick(event) }
          onSubmit={ (event) => this.timerSubmit(event) }
          countdown={ this.renderCountdown(this.state.countdown) }
        />
        <Goal
          onSubmit={ (event) => this.goalSubmit(event) }
          onCheck={ (event) => this.goalCheck(event) }
          onClickX={ (event) => this.goalClickX(event) }
          goal={ this.state.goal }
          strike={ this.state.strikeGoal }
        />
      </div>
    )
  }
}

export default Clock;
