import React, { Component } from 'react';
// can we put all the css in one folder and have App import the whole folder?
import './open-weather-icons/dist/css/open-weather-icons.css'
import './font-awesome/css/font-awesome.min.css'
import Art from './art';
import Clock from './clock';
import Goal from './goal';
import Links from './links';
import Timer from './timer';
import Todo from './todo';
import Settings from './settings';
import Weather from './weather';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        username: '' ,
        show: {
          Links: true,
          Bookmarks: false,
          MostVisited: false,
          RecentlyVisited: false,
          Weather: true,
          Todo: true,
          Quote: false,
          Greeting: false,
          Clock: true,
          Timer: true,
          Goal: true,
          staticBG: false,
        },
        weatherUnits: 'imperial',
        weatherLocation: '',
        setLocationAsDefault: false,
        clockFormat: '12hr',
        showAM_PM: false,
        timezone: '',
        setTimezoneAsDefault: false,
        timerFormat: '12hr',
        timerInputType: 'calendar',
        saveCountdown: true,
      },
      currentTime: new Date(),
      endTime: null,
      countdown: 0,
      timeIsUp: false,
      localStorageAvailable: this.storageAvailable(localStorage),
      sessionStorageAvailable: this.storageAvailable(sessionStorage),
    };
  }

  //test for availability of Storage
  storageAvailable(type) {
    const storage = window[type];
    try {
      let x = '___storageTest___';
      storage.setItem(x, x);
      x = storage.getItem(x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return e instanceof DOMException && (
        e.code === 22 ||
        e.code === 4012 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ) &&
        storage.length !== 0;
    }
  }

  // storage functions
  store(prop, val, which) {
    const type = which || 'localStorage',
          storage = window[type];
    if (this.state.localStorageAvailable) {
      if (typeof prop === 'object') {
        for (var key in prop) {
          if (prop.hasOwnProperty(key)) {
            storage.setItem(key, prop[key])
          }
        }
      }
      else {
        storage.setItem(prop, val ?
                          val :
                          this.state[prop] ?
                          this.state[prop] :
                          prop
                        )
      }
    }
    else return console.warn(type + ' unavailable');
  }

  unstore(prop, which) {
    if (this.state.localStorageAvailable) {
      const storage = window.localStorage;
      return storage.removeItem(prop);
    }
    else return;
  }

  // checking for availability of storage only seems to work with compWillMt()
  // not within the constructor
  componentWillMount() {
    this.setState({ localStorageAvailable: this.storageAvailable('localStorage'),
                    sessionStorageAvailable: this.storageAvailable('sessionStorage')
                  });
  }

  componentDidMount() {
    this.runClock();
    if (window.localStorage.getItem('goal')) {
      this.setState({ goal: window.localStorage.getItem('goal') });
    }
  }

  // event handlers
  handleClick(event) {
    // currently uses the parentEl, which seems clumsy and fraught
    // find a way to make click target desired element
    if (event.target.dataset.settingsrole === 'toggle' ||
        event.target.parentElement.dataset.settingsrole === 'toggle') {
      const target = event.target.dataset.togglefor ? event.target :
                    event.target.parentElement,
            setting = target.dataset.togglefor;
      //console.log(setting);
      this.setState((prevState) => {
        const prevSettings = setting in prevState.settings ?
          prevState.settings : prevState.settings.show;
        Object.assign(prevSettings, { [setting]: !prevSettings[setting] });
        return prevSettings;
      });
    }
  }

  // fcns for Clock
  runClock() {
    this.clockID = setInterval(() => {
      this.setState({ currentTime: new Date() })
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <div className="main center">
          { this.state.settings.show.Clock ?
            <Clock
              currentTime={ this.state.currentTime }
            /> : null }
          { this.state.settings.show.Timer ?
            <Timer
              currentTime={ this.state.currentTime }
            /> : null }
          { this.state.settings.show.Goal ? <Goal
              localStorageAvailable={ this.state.localStorageAvailable }
              store={ (key, val) => this.store(key,val) }
              unstore={ (key, val) => this.unstore(key) }
            /> :
            null }
        </div>
        <div className="top left corner">
          { this.state.settings.show.Links ? <Links /> : null }
        </div>
        <div className="top right corner">
          { this.state.settings.show.Weather ? <Weather /> : null }
        </div>
        <div className="bottom right corner">
          { this.state.settings.show.Todo ?
            <Todo localStorageAvailable={ this.state.localStorageAvailable }
                store={ (key, val) => this.store(key, val) }
                unstore={ (key) => this.unstore(key) }
            /> :
            null
          }
        </div>
        <div className="bottom left corner">
          <Settings handleClick={ (event) => this.handleClick(event) }
                    localStorageAvailable={ this.state.localStorageAvailable }
                    sessionStorageAvailable={ this.state.sessionStorageAvailable }
                    settingsState={ this.state.settings }
          />
        </div>
        <Art store={ (key, val) => this.store(key, val) }/>
      </div>
    );
  }
}

export default App;
