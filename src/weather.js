import React, { Component } from 'react';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temperature: null,
      location: null,
      weatherType: null,
    }
  }

  render() {
    return (
      <div className="weather">
        <p className="temperature">{ this.state.temperature }</p>
        <p className="location"> { this.state.location }</p>
      </div>
    )
  }
}

export default Weather;
