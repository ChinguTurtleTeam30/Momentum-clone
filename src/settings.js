import React, { Component } from 'react';
//general
  /*
  USER NAME
  SHOW:
    links
    bookmarks
    weather
    todo
    quotes
    greeting
    clock
    timer
    goal
    static background image
  */

//links
  /*
  show links
  show bookmarks
  show most visited
  show recently visited
  */

//weather
  /*
  show weather
  weather units
  weather location
  set this location as default
  */


//quotes

//clock & timer
  /*
  clock format
  show am/pm
  clock timezone
  set this timezone as default
  TIMER:
    show timer
    timer format
    input format ... calendar ... hh:mm:ss
    save countdown b/w sessions
  */

//background
  /*
  art tags:
    blah blah blah I don't know what these will be
  */
function SettingsButton(props) {
  return (
    <i className="fa fa-cog" onClick={ () => props.handleClick() }></i>
  );
}

function SettingsCategory(props) {
  return (
    <li
      onClick={ (event) => props.onClick(event) }
      name={ props.name }
    >
      { props.name }
    </li>
  );
}

class SettingsPanel extends Component {
  renderSetCat(name) {
    return (
      <SettingsCategory
        name={ name }
        onClick={ (event) => this.props.handleClickCat(event)}
      />
    );
  }

  render() {
    return (
      <div className="settingsPanel">
        <ul className="settingsPanelNav">
          { this.renderSetCat('general') }
          { this.renderSetCat('clock & timer') }
          { this.renderSetCat('weather') }
        </ul>
      </div>
    );
  }
}

class Settings extends Component {
  constructor(props) {
    super();
    this.state = {
      panelOpen: false,
    }
  }
  settings = {
    username: '' ,
    show: {
      links: {
        links: true,
        bookmarks: false,
        mostVisited: false,
        recentlyVisited: false,
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
    }
  };

  selectSettingsCategory(event) {
    const target = event.target.name + 'isSelected';
    console.log(event);
    if (!this.state[target]) {
      return this.setState({ [target]: true });
    }
    else return this.setState({ [target]: ![target] });
  }

  toggleSettingsPanel() {
    return this.setState({ panelOpen: !this.state.panelOpen });
  }

  render() {
    if (this.state.panelOpen) {
      return (
        <div className="settings bottom left corner">
          <SettingsPanel handleClickCat={ (event) => this.selectSettingsCategory(event) }/>
          <SettingsButton handleClick={ () => this.toggleSettingsPanel() }/>
        </div>
      );
    }
    else return (
      <div className="settings bottom left corner">
        <SettingsButton handleClick={ () => this.toggleSettingsPanel() }/>
      </div>
    )
  }
}

export default Settings;
