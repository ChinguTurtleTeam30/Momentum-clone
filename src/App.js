import React, { Component } from 'react';
// can we put all the css in one folder and have App import the whole folder?
import './App.css';
import './clock.css';
import './settings.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import Clock from './clock';
import Links from './links';
import Todo from './todo';
import Settings from './settings';
import Weather from './weather';
import { Art } from './art';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '' ,
      general: {
        showLinks: true,
        showBookmarks: false,
        showMostVisited: false,
        showRecentlyVisited: false,
        showWeather: true,
        showTodo: true,
        showQuotes: true,
        showGreeting: true,
        showClock: true,
        showTimer: true,
        showGoal: true,
        showStaticBG: false,
      },
      weather: true,
      todo: true,
      quotes: true,
      greeting: true,
      clock: true,
      timer: true,
      goal: true,
      staticBG: false,
    },
    weather: {
      weatherUnits: 'imperial',
      weatherLocation: '',
      setLocationAsDefault: false
    },
    clock_timer: {
      clockFormat: '12hr',
      showAM_PM: false,
      timezone: '',
      setTimezoneAsDefault: false,
      timer: {
        timerFormat: '12hr',
        timerInputFormat: 'calendar',
        saveCountdown: true
      }
    },
    localStorageAvailable: this.storageAvailable(localStorage),
    sessionStorageAvailable: this.storageAvailable(sessionStorage)
  };
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
  store(prop, val) {
    if (this.state.localStorageAvailable) {
      const storage = window.localStorage;
      return storage.setItem(prop, val ? val : this.state[prop]);
    }
    else return;
  }

  unstore(prop) {
    if (this.state.localStorageAvailable) {
      const storage = window.localStorage;
      return storage.removeItem(prop);
    }
    else return;
  }

  checkStorage(type, key) {
    const storage = window[type];
    // this is problematic because key: val might be 0, null, etc.
    return Boolean(storage.getItem(key));
  }

  // checking for availability of storage only seems to work with compWillMt()
  // not within the constructor
  componentWillMount() {
    this.setState({ localStorageAvailable: this.storageAvailable('localStorage'),
                    sessionStorageAvailable: this.storageAvailable('sessionStorage')
                  });
  }

  render() {
    return (
      <div className="App">
        <div className="container main center">
          { this.state.show.Clock ? <Clock /> : null }
          { this.state.show.Timer ? <Timer /> : null }
          { this.state.show.Goal ? <Goal
              localStorageAvailable={ this.state.localStorageAvailable }
              store={ (key, val) => this.store(key,val) }
              unstore={ (key, val) => this.unstore(key) }
            /> :
            null }
        </div>
        <div className="top left corner">
          <Links />
        </div>
        <Weather />
        <div className="bottom right corner">
          <Todo localStorageAvailable={ this.state.localStorageAvailable }
                store={ (key, val) => this.store(key, val) }
                unstore={ (key) => this.unstore(key) }
          />
        </div>
        <Settings />
        <Art />
      </div>
    );
  }
}

export default App;
