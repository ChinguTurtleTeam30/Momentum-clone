import React, { Component } from 'react';
// can we put all the css in one folder and have App import the whole folder?
import './App.css';
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
      weatherUnits: 'imperial',
      weatherLocation: '',
      setLocationAsDefault: false
      clockFormat: '12hr',
      showAM_PM: false,
      timezone: '',
      setTimezoneAsDefault: false,
      timerFormat: '12hr',
      timerInputFormat: 'calendar',
      saveCountdown: true,
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

  /*-------- Refactor Zone ------------
    These event handlers need rewriting to be widely applicable
  -------------------------------------*/
  handleSettingsToggle(event) {
    console.log(event.target);
  }
  /*------------------------------------*/
  // event handlers
  handleClick(event) {
    if (event.target.parentNode.className === 'settingsTab') {
      const setting = event.target.id.match(/[A-Z]{1}[a-z]+/)[0];
      const curState = this.state.show[setting];
      console.log(curState);
      this.setState((prevState) => {
        const prevShow = prevState.show;
        Object.assign(prevShow, { [setting]: !prevShow[setting] })
        return prevShow
      });
    }
  }

  // fcns for Clock
  runClock() {
    this.clockID = setInterval(() => {
      this.setState({ currentTime: new Date() })
    }, 1000);
  }

  componentDidMount() {
    this.runClock();
    if (window.localStorage.getItem('goal')) {
      this.setState({ goal: window.localStorage.getItem('goal') });
    }
  }
  /*<Center localStorageAvailable={ this.state.localStorageAvailable }
          handleClick={ (event) => this.handleClick(event) }
          username={ this.state.username }
          store={ (key, val) => this.store(key,val) }
          unstore={ (key) => this.unstore(key) }
          checkStorage={ (key) => this.checkStorage('localStorage', key) }
  />*/

  render() {
    return (
      <div className="App">
        <div className="main center">
          { this.state.show.Clock ? <Clock
              currentTime={ this.state.currentTime }
            /> : null }
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
        <Settings handleClick={ (event) => this.handleClick(event) }
                  localStorageAvailable={ this.state.localStorageAvailable }
                  sessionStorageAvailable={ this.state.sessionStorageAvailable }
        />
        <Art />
      </div>
    );
  }
}

export default App;
