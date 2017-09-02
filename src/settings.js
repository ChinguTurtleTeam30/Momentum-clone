import React, { Component } from 'react';
import './settings.css';

function SettingsButton(props) {
  if (props.isActive) {
    return (
      <i
        tabIndex="0"
        className="fa fa-cog active"
        onClick={ (event) => props.handleClick(event) }
      ></i>
    )
  }
  return (
    <ul id="general" className="settingsTab">
      <li id="showClock"
          onClick={ (event) => props.handleClick(event) }
          className="fa fa-toggle-on">toggle Clock
      </li>
      <li id="showTimer"
          onClick={ (event) => props.handleClick(event) }
          className="fa fa-toggle-on">toggle Timer
      </li>
      <li id="showGoal"
          onClick={ (event) => props.handleClick(event) }
          className="fa fa-toggle-off">toggle Goal
      </li>
    </ul>
  );
}

function SettingsHeading(props) {
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

function SettingsTab(props) {
  return (
    <ul className="settingsTab">
      <li className="fa fa-toggle-on">toggle something
      </li>
      <li className="fa fa-toggle-on">toggle something else
      </li>
      <li className="fa fa-toggle-off">make another choice
      </li>
    </ul>
  );
}

class SettingsPanel extends Component {
  renderSettingsHeading(name) {
    if (this.props.tabOpen === name) {
      return (
        <SettingsHeading
          name={ name }
          tabOpen
          onClick={ (event) => this.props.handleClickTab(event)}
        />
      );
    }
    else {
      return (
        <SettingsHeading
          name={ name }
          onClick={ (event) => this.props.handleClickTab(event)}
        />
      );
    }
  }

  render() {
    return (
      <div className="settingsPanel">
        <ul className="settingsNav">
          { this.renderSettingsHeading('general') }
          { this.renderSettingsHeading('clock & timer') }
          { this.renderSettingsHeading('weather') }
        </ul>
        <SettingsTab
          handleClick={ (event) => this.props.handleClick(event) }
        />
      </div>
    );
  }
}

function SettingsButton(props) {
  if (props.isActive) {
    return (
      <i
        tabIndex="0"
        className="settingsButton fa fa-cog active"
        onClick={ (event) => props.handleClick(event) }
      ></i>
    )
  }
  else return (
    <i
      tabIndex="0"
      className="settingsButton fa fa-cog"
      onClick={ (event) => props.handleClick(event) }
    ></i>
  );
}

class Settings extends Component {
  constructor(props) {
    super();
    this.state = {
      panelOpen: false,
    }
  }

  selectSettingsHeading(event) {
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
          <SettingsPanel
            tabOpen={ this.state.tabOpen }
            handleClickTab={ (event) => this.selectSettingsCategory(event) }
            handleClick={ (event) => this.props.handleClick(event) }
          />
          <SettingsButton
            handleClick={ (event) => this.toggleSettingsPanel(event) }
            isActive={ this.state.panelOpen }
          />
        </div>
      );
    }
    else return (
      <div className="settings bottom left corner">
        <SettingsButton
          handleClick={ (event) => this.toggleSettingsPanel(event) }
        />
      </div>
    )
  }
}

export default Settings;
