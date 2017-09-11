import React, { Component } from 'react';
import './settings.css';

function SettingsToggle(props) {
  const toggleIsOn = props.togglefor in props.settingsState ?
      props.settingsState[props.togglefor] :
      props.settingsState.show[props.togglefor];
  return (
    <li className={ (props.inactive ? "futureFeature " : null) + "settingsToggle" }
        data-settingsrole="toggle"
        data-togglefor={ props.togglefor }
        onClick={ (event) => props.handleClick(event) }
    >
      <span className="settingsToggleLabel">{ props.label }</span>
        <i className={ "toggleIcon fa" + ( toggleIsOn ?
                        " fa-toggle-on boolToggleOn" :
                        " fa-toggle-off boolToggleOff" )
                        }
        ></i>
    </li>
  );
}

function SettingsRadio(props) {
  const options = props.options || ['itemA', 'itemB'],
        active = props.togglefor in props.settingsState ? props.settingsState[props.togglefor] :
                  props.togglefor in props.settingState.show ? props.settingState.show[props.togglefor] :
                  null;
  return (
    <li className={ (props.inactive ? "futureFeature " : null) + "settingsToggle" } //subject to change
        data-settingsrole="toggle" //subject to change
        data-togglefor={ props.togglefor } //that prop name is bad
        onClick={ (event) => props.handleClick(event) }
    >
      <span className="settingsToggleLabel">{ props.label }</span>
      { options.map(function(item, i) {
        return (
          item === active ?
            <span className="settingsListOption settingActive"
                  key={ props.togglefor + "option" + i }
            >{ item }</span> :
            <span className="settingsListOption"
                  key={ props.togglefor + "option" + i }
            >{ item }</span>
        )
      }) }
    </li>
  );
}

function SettingsSearchable(props) {
  return(
    <li className={ (props.inactive ? "futureFeature " : null) + "settingsToggle" } //should be changed
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
  function renderSettingChooser(type, setting, text, options, inactive) {
    return (
      type === 'search' ?
        <SettingsSearchable settingsState={ props.settingsState }
                            togglefor={ setting }
                            label={ text && typeof text !== 'object' ? text : setting }
                            handleClick={ (event) => props.handleClick(event) }
                            inactive={ inactive }
        /> :
        type === 'list' ?
          <SettingsRadio settingsState={ props.settingsState }
                        togglefor={ setting }
                        label={ text && typeof text !== 'object' ? text : setting }
                        options={ options }
                        handleClick={ (event) => props.handleClick(event) }
                        inactive={ inactive }
          /> :
          type === 'bool' ?
            <SettingsToggle settingsState={ props.settingsState }
                            togglefor={ setting }
                            label={ text && typeof text !== 'object' ? text : setting }
                            handleClick={ (event) => props.handleClick(event) }
                            inactive={ inactive }
            /> : null
    );
  }
  // different returns for the different tabOpen values
  if (props.tabOpen === 'clock & timer') {
    return (
      <ul id="clock & timer" className="settingsTab">
        { renderSettingChooser('list', 'clockFormat', 'clock format', ['12hr', '24hr'], 'inactive') }
        { renderSettingChooser('bool', 'showAM_PM', 'show am/pm', null, 'inactive') }
        { renderSettingChooser('search', 'timezone', 'time zone', null, 'inactive') }
        { renderSettingChooser('bool', 'setTimezoneAsDefault', 'set time zone as default', null, 'inactive') }
        { renderSettingChooser('list', 'timerFormat', 'timer format', ['12hr', '24hr'], 'inactive') }
        { renderSettingChooser('list', 'timerInputType', 'timer input type', ['calendar', 'drop-down', 'text field'], 'inactive') }
        { renderSettingChooser('bool', 'saveCountdown', 'save timer countdown', null, 'inactive') }
      </ul>
    );
  }
  else if (props.tabOpen === 'weather') {
    return (
      <ul id="weather" className="settingsTab">
        { renderSettingChooser('list', 'weatherUnits', 'temperature units', ['\xb0F', '\xb0C'], 'inactive') }
        { renderSettingChooser('search', 'weatherLocation', 'weather location', null, 'inactive') }
        { renderSettingChooser('bool', 'setLocationAsDefault', 'set this location as default', null, 'inactive') }
      </ul>
    );
  }
  else return (
    <ul id="general" className="settingsTab">
      { renderSettingChooser('bool', 'Clock', 'show clock') }
      { renderSettingChooser('bool', 'Timer', 'show timer') }
      { renderSettingChooser('bool', 'Greeting', 'show greeting', null, 'inactive') }
      { renderSettingChooser('bool', 'Goal', 'show goal') }
      { renderSettingChooser('bool', 'Links', 'show links') }
      { renderSettingChooser('bool', 'Bookmarks', 'show bookmarks', null, 'inactive') }
      { renderSettingChooser('bool', 'RecentlyVisited', 'show recently visited', null, 'inactive') }
      { renderSettingChooser('bool', 'MostVisited', 'show most visited', null, 'inactive') }
      { renderSettingChooser('bool', 'Weather', 'show weather') }
      { renderSettingChooser('bool', 'Todo', 'show todo') }
      { renderSettingChooser('bool', 'Quote', 'show quote', null, 'inactive') }
    </ul>
  );
}

function SettingsCategory(props) {
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
        <SettingsCategory
          name={ name }
          tabOpen
          handleClick={ (event) => this.handleClick(event) }
        />
      );
    }
    else {
      return (
        <SettingsCategory
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
          { this.renderSettingsCategory('general') }
          { this.renderSettingsCategory('clock & timer') }
          { this.renderSettingsCategory('weather') }
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
    super(props);
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
        <div className="settings">
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
      <div className="settings">
        <SettingsButton
          handleClick={ (event) => this.toggleSettingsPanel(event) }
        />
      </div>
    )
  }
}

export default Settings;
