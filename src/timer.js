import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countdown: null,
      endTime: new Date(),
    };

    //this.handleChange = this.handleChange.bind(this);
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

  runTimer() {
    //const count = Math.round(this.state.countdown - 1);
    this.setState((prevState) => {
      const count = Math.round(prevState.countdown - 1) > 0 ?
        Math.round(prevState.countdown - 1) : 0;
      return { countdown: count };
    });
  }

  renderCountdown(count) {
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

  handleSubmit(event) {
    event.preventDefault();
    if(!this.intervalID) {
      if(!this.state.countdown) {
        if(this.props.currentTime > this.state.endTime) {
          return;
        }
        else this.setState({
          countdown: Math.round((this.state.endTime - this.props.currentTime)/1000)
        });
      }
      return this.intervalID = setInterval(() => this.runTimer(), 1000);
    }
    else return;
  }

  handleChange(event) {
    this.setState({ endTime: this.jsFormatDate(event.target.value) });
  }

  handleClick(event) {
    clearInterval(this.intervalID);
    this.intervalID = null;
    if(event.target.name === 'reset-timer') {
      this.setState({ countdown: null });
    }
  }


  render() {
    return (
      <div className="timer">
        <form className="timer-form" onSubmit={ (event) => this.handleSubmit(event) }>
          { this.state.countdown ?
            <span className="countdown">
              { this.renderCountdown(this.state.countdown) }
            </span> :
            <input type="datetime-local"
                defaultValue={ this.htmlFormatDate(this.state.endTime) }
                onChange={ (event) => this.handleChange(event) }
            />
          }
          <input id="start-timer"
                name="start-timer"
                type="submit"
                value="start"
                />
          <input id="stop-timer"
                name="stop-timer"
                type="button"
                value="stop"
                onClick={ (event) => this.handleClick(event) }
          />
          <input id="reset-timer"
                name="reset-timer"
                type="button"
                value="reset"
                onClick={ (event) => this.handleClick(event) }
          />
        </form>
      </div>
    )
  }
}
