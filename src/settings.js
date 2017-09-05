import React, { Component } from 'react';
import './settings.css';

function SettingsToggle(props) {
  const toggleIsOn = props.togglefor in props.settingsState ?
    props.settingsState[props.togglefor] :
    props.settingsState.show[props.togglefor];
  return (
    <li data-settingsrole="toggle"
        data-togglefor={ props.togglefor }
        //data-toggleOn={ props.toggleOn }
        onClick={ (event) => props.handleClick(event) }
        className="settingsToggle">
      <span className="settingsToggleLabel">{ "show " + props.togglefor }</span>
      <i className={ "toggleIcon fa" +
                      (props.settingsState[props.togglefor] ?
                        " fa-toggle-on toggleOn" : " fa-toggle-off toggleOff")
                   }></i>
    </li>
  );
}

function SettingsTab(props) {
  // different returns for the different tabOpen values
  if (props.tabOpen === 'clock & timer') {
    return (
      <ul id="clock & timer" className="settingsTab">
        <SettingsToggle settingsState={ props.settingsState } togglefor="clockFormat" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="showAM_PM" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="timezone" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="setTimezoneAsDefault" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="timerFormat" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="timerInputFormat" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="saveCountdown" />
      </ul>
    );
  }
  else if (props.tabOpen === 'weather') {
    return (
      <ul id="weather" className="settingsTab">
        <SettingsToggle settingsState={ props.settingsState } togglefor="weatherUnits" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="weatherLocation" />
        <SettingsToggle settingsState={ props.settingsState } togglefor="setLocationAsDefault" />
      </ul>
    );
  }
  else return (
    <ul id="general" className="settingsTab">
      <SettingsToggle togglefor="Clock" settingsState={ props.settingsState }
          handleClick={ (event) => props.handleClick(event) }
      />
      <SettingsToggle togglefor="Timer" settingsState={ props.settingsState }
          handleClick={ (event) => props.handleClick(event) }
      />
      <SettingsToggle togglefor="Goal" settingsState={ props.settingsState }
          handleClick={ (event) => props.handleClick(event) }
      />
      <SettingsToggle togglefor="Weather" settingsState={ props.settingsState }
          handleClick={ (event) => props.handleClick(event) }
      />
    </ul>
  );
}

function SettingsHeading(props) {
  if (props.tabOpen) {
    return (
      <li
        onClick={ (event) => props.handleClick(event) }
        data-settingsrole="selectSettingsCategory"
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
        onClick={ (event) => props.handleClick(event) }
        data-settingsrole="selectSettingsCategory"
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
  constructor(props) {
    super(props);
    this.state = {
      tabOpen: 'general',
    }
  }

  handleClick(event) {
    const target = event.target,
          action = target.dataset.settingsrole;
    console.log(target, ':', action);
    if (action === 'selectSettingsCategory') {
      if (this.state.tabOpen !== target.id) { // try [] instead
        return this.setState({ tabOpen: target.id });
      }
      else return;
    }
    else return;
  }

  renderSettingsCategory(name) {
    if (this.state.tabOpen === name) {
      return (
        <SettingsHeading
          name={ name }
          tabOpen
          handleClick={ (event) => this.handleClick(event) }
        />
      );
    }
    else {
      return (
        <SettingsHeading
          name={ name }
          handleClick={ (event) => this.handleClick(event) }
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
          tabOpen={ this.state.tabOpen }
          settingsState={ this.props.settingsState }
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
        className="toggleSettingsPanelOpen active fa fa-cog"
        id="toggleSettingsPanelOpen"
        data-settingsrole="toggleSettingsPanelOpen"
        onClick={ (event) => props.handleClick(event) }
      ></i>
    )
  }
  else return (
    <i
      tabIndex="0"
      className="toggleSettingsPanelOpen fa fa-cog"
      id="toggleSettingsPanelOpen"
      data-settingsrole="toggleSettingsPanelOpen"
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

  handleClick(event) {
    const target = event.target,
          action = target.dataset.settingsrole;
    if (action === 'toggleSettingsPanelOpen') {
      console.log(target);
      return this.setState({ panelOpen: !this.state.panelOpen });
    }
    else return;
  }

/*---------- Refactor Zone -------------
make these functions more generally applicable
--------------------------------------*/
  selectSettingsCategory(event) {
    const target = event.target.id;
    if (!this.state.hasOwnProperty('tabOpen')) {
      return this.setState({ tabOpen: target });
    }
    else return this.setState({ tabOpen: target });
  }

  toggleSettingsPanel(event) {
    //console.log(event.target);
    return this.setState({ panelOpen: !this.state.panelOpen });
  }
/*----------------------------------------*/

  render() {
    if (this.state.panelOpen) {
      return (
        <div className="settings bottom left corner">
          <SettingsPanel
            handleClick={ (event) => this.props.handleClick(event) }
            settingsState={ this.props.settingsState }
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
