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
      qryUnits: 'imperial',
      location: null,
      weatherType: null,
      iconSrc: 'http://openweathermap.org/img/w/',
    }
  }

  weatherQryData = {
    apiURL: 'http://api.openweathermap.org/data/2.5/',
    qryType: 'weather',
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
      '&lat=' + reqObj.coords.lat +
      '&lon=' + reqObj.coords.lon + '&' + reqObj.apiKey;
    console.log(qryUrl);
    fetch(qryUrl)
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return callback(res);
    })
  }

  getLoc = (reqObj, callback) => {
    let key = '';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          key = 'nav.geo';
          console.log(key, pos);
          return callback(key, pos)
        },
        function(err) {
          key = 'err';
          console.log(key, err);
          return callback(key, err);
        }
      );
    }
    else {
      fetch(reqObj.fallbackURL)
      .then((res) => {
        key = 'ip-api';
        console.log(key, res);
        return callback(key, res);
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
    }, (key, res) => {
      this.getWeather({
        apiURL: this.weatherQryData.apiURL,
        qryType: this.weatherQryData.qryType,
        qryUnits: this.state.qryUnits,
        apiKey: this.weatherQryData.apiKey,
        coords: 'coords' in res ?
                { lat: res.coords.latitude.toFixed(2),
                  lon: res.coords.longitude.toFixed(2) } :
                'lat' in res && 'lon' in res ?
                  { lat: res.lat.toFixed(2),
                    lon: res.lon.toFixed(2) } :
                  { lat: 0, lon: 0 }
        }, (data) => {
          //only because open-weather-icon's 50-series icons are wrong:
          const icon = /^50/.test(data.weather[0].icon) ? '50d' :
                        data.weather[0].icon,
                units = !this.state.qryUnits ? 'K' :
                          this.state.qryUnits === 'imperial' ? 'F' :
                            this.state.qryUnits === 'metric' ? 'C' : 'K',
                degrees = units === 'C' || units === 'F' ? '\xb0' : '';

          this.setState({
            location: data.name,
            temperature: data.main.temp.toFixed(0),
            units: units,
            degrees: degrees,
            weatherType: data.weather[0].main,
            icon: 'owi owi-' + icon
          });
          //console.log(data)
      })
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
            { this.state.temperature }
          </span>
          <span className="tempUnits">
            { this.state.degrees + this.state.units }
          </span>
        </p>
        <p className="location">{ this.state.location }</p>
      </div>
    )
  }
}

export default Weather;
