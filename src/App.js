import React, { Component } from 'react';
import './App.css';
import Clock from './clock';
import Weather from './weather';

class App extends Component {
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

  componentWillMount() {
    this.setState({ locStorAvail: this.storageAvailable('localStorage'),
                    sessStorAvail: this.storageAvailable('sessionStorage')
                  });
  }

  render() {
    return (
      <div className="App">
        <div className="main">
          <Clock localStorageAvailable={ this.state.locStorAvail }/>
        </div>
        <Weather src='http://api.openweathermap.org/data/2.5/weather?' />
      </div>
    );
  }
}

export default App;
