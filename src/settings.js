import React, { Component } from 'react';
import './settings.css';

function SettingsToggle(props) {
  const bool = props.toggleType === 'bool' ?
    props.togglefor in props.settingsState ?
      props.settingsState[props.togglefor] :
      props.settingsState.show[props.togglefor] :
    null;
  return (
    <li data-settingsrole="toggle"
        data-togglefor={ props.togglefor }
        //data-toggleOn={ props.toggleOn }
        onClick={ (event) => props.handleClick(event) }
        className="settingsToggle">
      <span className="settingsToggleLabel">{ props.label }</span>
      { props.toggleType === 'bool' ?
          <i className={ "toggleIcon fa" + ( bool ?
                        " fa-toggle-on boolToggleOn" :
                        " fa-toggle-off boolToggleOff" )
                        }
          ></i> :
          props.toggleType === 'list' ?
            <span>itemA | itemB</span> :
            props.toggleType === 'search' ?
              <input type="text" /> :
        <span>Where's the option, bub?</span>
      }
    </li>
  );
}

function SettingsRadio(props) {
  const options = props.options || ['itemA', 'itemB'];
  return (
    <li className="settingsToggle" //subject to change
        data-settingsrole="toggle" //subject to change
        data-togglefor={ props.togglefor } //that prop name is bad
        onClick={ (event) => props.handleClick(event) }
    >
      <span className="settingsToggleLabel">{ props.label }</span>
      { props.options.map(function(item) {
        return <span className="settingsListOption">{ item }</span>
      }) }
    </li>
  );
}

function SettingsSearchable(props) {
  return(
    <li className="settingsToggle" //should be changed
        data-settingsrole="toggle" //should be changed
        data-togglefor={ props.togglefor } //that's a bad prop name
        onClick={ (event) => props.handleClick(event) }
    >
      <span className="settingsToggleLabel">{ props.label }</span>
      <input type="text" />
    </li>
  )
}

function SettingsTab(props) {
  function renderSettingChooser(type, setting, text, options) {
    return (
      <SettingsToggle settingsState={ props.settingsState }
                      togglefor={ setting }
                      label={ text && typeof text !== 'object' ? text : setting }
                      toggleType={ type }
      />
    );
  }
  // different returns for the different tabOpen values
  if (props.tabOpen === 'clock & timer') {
    return (
      <ul id="clock & timer" className="settingsTab">
        { renderSettingChooser('list', 'clockFormat', 'clock format') }
        { renderSettingChooser('bool', 'showAM_PM', 'show am/pm') }
        { renderSettingChooser('search', 'timezone', 'timezone') }
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
