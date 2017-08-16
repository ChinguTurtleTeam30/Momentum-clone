import React, { Component } from 'react';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temperature: null,
      location: null,
      weatherType: null,
      apiSrc: 'http://api.openweathermap.org/data/2.5/',
      qryType: 'weather',
      apiKey: 'APPID=79aef489883f75aff91f8900796eb1ea',
    }
  }

  getWeather(obj, callback) {
    const src = obj.state;
    let qryUrl = src.apiSrc + src.qryType + '?lat=' + src.coords[0] +
      '&lon=' + src.coords[1] + '&' + src.apiKey;
    fetch(qryUrl)
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return callback(res);
    })
  }

  getLoc = (obj, callback) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          return (
            obj.setState({ coords: [pos.coords.latitude.toFixed(2),
              pos.coords.longitude.toFixed(2)] }),
            callback(obj)
          );
        },
        function(err) {
          return (
            console.error(err),
            alert(err)
          );
        }
      );
    }
    else {
      let noGeo = new Error(Error('navigator.geolocation unavailable'));
      return (
        console.error(noGeo),
        alert(noGeo)
      );
    }
  }

  convertTemp(tempIn, tempOut, num) {
    const rat = 5/9;
    const adj = {
      k: 273.15,
      f: 32,
    }
    let [input, output] = [{},{}];
    input[tempIn.toLowerCase()] = true;
    output[tempOut.toLowerCase()] = true;
    return (
      input.k ?
        output.f ?
          (num - adj.k) / rat + adj.f :
          output.c ? num - adj.k : num :
        input.f ?
          output.k ?
            (num - adj.f) * rat + adj.k :
            output.c ? (num - adj.f) * rat : num :
          input.c ?
            output.k ?
              num + adj.k :
              output.f ? num / rat + adj.f : num :
            num
    );
  }

  componentWillMount() {
    this.getLoc(this, function(comp) {
      return comp.getWeather(comp, function(json) {
        return (
          comp.setState({
            location: json.name,
            temperature: comp
              .convertTemp('k', 'f', json.main.temp)
              .toFixed(0) + '\xb0 F',
            weatherType: json.weather[0].main,
          })
        );
      });
    });
  }

  render() {
    return (
      <div className="weather">
        <p className="temperature">{ this.state.temperature }</p>
        <p className="location">{ this.state.location }</p>
      </div>
    )
  }
}

export default Weather;
