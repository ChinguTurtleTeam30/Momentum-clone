import React, { Component } from 'react';
import './weather.css';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temperature: '',
      degrees: '',
      units: '',
      // fallback locs: Bermuda Triangle or null island
      location: null,
      weatherType: null,
      apiURL: 'http://api.openweathermap.org/data/2.5/',
      qryType: 'weather',
      qryUnits: 'imperial',
      apiKey: 'APPID=79aef489883f75aff91f8900796eb1ea',
      iconSrc: 'http://openweathermap.org/img/w/',
    }
  }

  weatherQryData = {
    apiURL: 'http://api.openweathermap.org/data/2.5/',
    qryType: 'weather',
    qryUnits: 'imperial',
    apiKey: 'APPID=79aef489883f75aff91f8900796eb1ea',
    iconSrc: 'http://openweathermap.org/img/w/',
  }

  locQryData = {
    apiURL: 'http://ip-api.com/',
    format: 'json',
  }

  getWeather = (reqObj, callback) => {
    // call getLoc in here
    const qryUrl = reqObj.apiURL + reqObj.qryType + '?units=' + reqObj.qryUnits +
      '&lat=' + reqObj.coords[0] +
      '&lon=' + reqObj.coords[1] + '&' + reqObj.apiKey;
    fetch(qryUrl)
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return callback(res);
    })
  }

  getLoc = (reqObj, callback) => {
    if ('geolocation' in navigator) { //should have ip-sniffer fallback
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          return (
            callback(pos)
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
      fetch(reqObj.fallbackURL)
      .then((res) => {
        return callback(res);
      });
    }
  }

//I think this has become unnecessary
/*  convertTemp(tempIn, tempOut, num) {
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
  */

  componentWillMount() {
    this.getLoc({
      fallbackURL: this.locQryData.apiURL + this.locQryData.format
    }, (data) => {
      if ('coords' in data) {
        return {
          lat: data.coords.latitutde,
          lon: data.coords.longitude
        }
      }
      else if ('lat' in data && 'lon' in data) {
        return {
          lat: data.lat,
          lon: data.lon
        }
      }
      else {
        console.warn('browser geolocation unavailable');
        return {
          lat: 0,
          lon: 0
        }
      }
    });
    /*this.getWeather({
      apiURL: weatherQryData.apiURL,
      qryType: weatherQryData.qryType,
      qryUnits: weatherQryData.qryUnits,
      coords: getLoc({
        fallbackURL: locQryData.apiURL + locQryData.format
      }, (res) => {
        return console.log(res):
      })
    }, (data) => {
      const icon = /^50/.test(json.weather[0].icon) ? '50d' :
                  json.weather[0].icon;
      this.setState({
        location: data.name,
        temperature: data.main.temp.toFixed(0),
        units: json.main.units,
        degrees: json.main.degrees,
        weatherType: json.weather[0].main,
        icon: 'owi owi-' + icon,
      })
    }
      return comp.getWeather(comp, function(json) {
        //only because open-weather-icon's 50-series icons are wrong:
        const icon = /^50/.test(json.weather[0].icon) ? '50d' :
                      json.weather[0].icon,
              units = !comp.state.qryUnits ? 'K' :
                        comp.state.qryUnits === 'imperial' ? 'F' :
                          comp.state.qryUnits === 'metric' ? 'C' : 'K',
              degrees = units === 'C' || units === 'F' ? '\xb0' : '';
        return (
          comp.setState({
            location: json.name,
            temperature: json.main.temp.toFixed(0),
            units: units,
            degrees: degrees,
            weatherType: json.weather[0].main,
            icon: 'owi owi-' + icon,
          })
        );
      });
    });*/
  }

  render() {
    return (
      <div className="weather">
        <p className="weatherData">
          <i className={ "weather-icon " + this.state.icon }></i>
          <span className="temperature">
            { this.state.temperature + this.state.degrees }
          </span>
          <span className="tempUnits">{ this.state.units }</span>
        </p>
        <p className="location">{ this.state.location }</p>
      </div>
    )
  }
}

export default Weather;
