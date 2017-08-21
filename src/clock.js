import React, { Component } from 'react';

function Goal(props) {
  return (
    <form
      id="goalForm"
      name="goalForm"
      onSubmit={ (event) => props.onSubmit(event)
      }>
      <div className="goalBox hide">
        <input id="goalComplete" name="goalComplete" type="checkbox"
                value="complete" onChange={ (event) => props.onCheck(event) }
        />
        <span className="showGoal">{ props.goal }</span>
        <input id="xGoal" name="xGoal" type="button" value="x"
                onClick={ (event) => props.onClickX(event) } />
      </div>
      <input id="setGoal" name="setGoal" type="text" />
      <label htmlFor="setGoal">What is your goal?</label>
    </form>
  );
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
  constructor() {
    super();
    this.state = {
      curTime: new Date(),
      endTime: null,
      countdown: 0,
      timeIsUp: false,
      timerID: null,
    };
  }

  renderTime() {
    const now = this.state.curTime.toLocaleTimeString();
    //return only hrs & mins
    return now.match(/^\d{1,2}:\d{2}/)[0];
  }

  //start clock on load
  componentDidMount() {
    this.clockID = setInterval(() => {
      this.setState({ curTime: new Date()})
    }, 1000);
    if (window.localStorage.getItem('goal')) {
      this.setState({ goal: window.localStorage.getItem('goal') });
      document.querySelector('.goalBox').classList.remove('hide');
    }
  }

  calendarChange(event) {
    this.setState({ endTime: new Date(this.jsFormatDate(event.target.value)) });
  }

  timerClick(event) {
    clearInterval(this.state.timerID);
    this.setState({ timerID: null });
    if (event.target.name === 'reset') {
      this.setState({ countdown: 0, timeIsUp: false });
    }
  }

  timerSubmit(event) {
    event.preventDefault();
    if(!this.state.countdown) {
      this.setState({
        countdown: (this.state.endTime - this.state.curTime)/1000
      });
    }
    if(!this.state.timerID) {
      this.setState({ timerID: setInterval(() => this.runTimer(), 1000) });
      if(window.localStorage.getItem('endTime') !== this.state.endTime) {
        this.store('endTime');
      }
    }
  }

  goalSubmit(event) {
    const val = event.target['setGoal'].value,
          goalBox = document.querySelector('.goalBox');
    event.preventDefault();
    if (val) {
      this.setState({ goal: val });
      goalBox.classList.remove('hide');
      this.store('goal', val);
    }
  }

  goalCheck(event) {
    const showGoal = document.querySelector('.showGoal');
    if (event.target.checked) {
      showGoal.classList.add('strike');
    }
    else showGoal.classList.remove('strike');
  }

  goalClickX(event) {
    const goalBox = document.querySelector('.goalBox');
    goalBox.classList.add('hide');
    this.setState({ goal: null });
    this.unstore('goal');
  }

  runTimer() {
    const count = Math.round(this.state.countdown - 1) > 0 ?
                  Math.round(this.state.countdown - 1) : 0 ;
    this.setState({ countdown: count });
    if (!count) {
      clearInterval(this.state.timerID);
      this.setState({ timeIsUp: true, timerID: null });
    }
  }

  renderCountdown(count) {
    if (!count && this.state.timeIsUp) { return "Time's up!" }
    const s = count%60;
    count = (count - s)/60;
    const m = count%60;
    count = (count - m)/60;
    const h = count%24,
          d = (count - h) / 24,
          displayCount = [d, h, m, Math.round(s)].map(function(val, i, arr) {
            if(val) {
              if(arr[i - 1]) {
                return val < 10 ? '0' + val : val;
              }
              else return val;
            }
            else if(arr[i - 1]) {
              return '00';
            }
            else return null;
          }).filter(function(val) {
            return val && val >= 0;
          });

    return displayCount.join(':');
  }

  store(prop, val) {
    if (this.props.localStorageAvailable) {
      const storage = window.localStorage;
      return storage.setItem(prop, val ? val : this.state[prop]);
    }
    else return;
  }

  unstore(prop) {
    if (this.props.localStorageAvailable) {
      const storage = window.localStorage;
      return storage.removeItem(prop);
    }
    else return;
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
        />
      </div>
    )
  }
}

export default Clock;
export { Timer };
