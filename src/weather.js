import React, { Component } from 'react';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temperature: null,
      location: null,
      lat: null,
      lon: null,
      weatherType: null,
      apiKey: 'APPID=79aef489883f75aff91f8900796eb1ea',
    }
  }

  qryParams = []

  getLoc = (obj) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          console.log('001', pos.coords);
          return (
            obj.push(pos.coords.latitude.toFixed(2),
              pos.coords.longitude.toFixed(2)),
            console.log('002', pos.coords.latitude, pos.coords.longitude)
          );
        },
        function(err) {
          return (
            console.error(err),
            alert(err)
          );
        }
      );
      console.log('003', obj);
      this.setState({ lat: 1, lon: 2 });
    }
    else {
      let noGeo = new Error(Error('navigator.geolocation unavailable'));
      return (
        console.error(noGeo),
        alert(noGeo)
      );
    }
  }

  componentWillMount() {
    this.getLoc(this.qryParams);
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
