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
  if (props.isActive) {
    return (
      <i
        className="fa fa-cog active"
        onClick={ (event) => props.handleClick(event) }
      ></i>
    )
  }
  return (
    <i className="fa fa-cog" onClick={ (event) => props.handleClick(event) }></i>
  );
}

function SettingsTab(props) {
  if (props.tabOpen) {
    return (
      <li
        onClick={ (event) => props.onClick(event) }
        name={ props.name }
        id={ props.name }
        className="tabOpen"
      >
        { props.name }
      </li>
    );
  }
  else {
    return (
      <li
        onClick={ (event) => props.onClick(event) }
        name={ props.name }
        id={ props.name }
      >
        { props.name }
      </li>
    );
  }
}

class SettingsPanel extends Component {
  renderSettingsTab(name) {
    if (this.props.tabOpen === name) {
      return (
        <SettingsTab
          name={ name }
          tabOpen
          onClick={ (event) => this.props.handleClickTab(event)}
        />
      );
    }
    else {
      return (
        <SettingsTab
          name={ name }
          onClick={ (event) => this.props.handleClickTab(event)}
        />
      );
    }
  }

  render() {
    return (
      <div className="settingsPanel">
        <ul className="settingsPanelNav">
          { this.renderSettingsTab('general') }
          { this.renderSettingsTab('clock & timer') }
          { this.renderSettingsTab('weather') }
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

  selectSettingsTab(event) {
    const target = event.target.id;
    if (!this.state.hasOwnProperty('tabOpen')) {
      return this.setState({ tabOpen: target });
    }
    else return this.setState({ tabOpen: target });
  }

  toggleSettingsPanel(event) {
    return this.setState({ panelOpen: !this.state.panelOpen });
  }

  render() {
    if (this.state.panelOpen) {
      return (
        <div className="settings bottom left corner">
          <SettingsPanel tabOpen={ this.state.tabOpen } handleClickTab={ (event) => this.selectSettingsTab(event) } />
          <SettingsButton
            handleClick={ (event) => this.toggleSettingsPanel(event) }
            isActive={ this.state.panelOpen }
          />
        </div>
      );
    }
    else return (
      <div className="settings bottom left corner">
        <SettingsButton handleClick={ (event) => this.toggleSettingsPanel(event) }/>
      </div>
    )
  }
}

export default Settings;
