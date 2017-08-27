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

class Settings extends Component {
  render() {
    return (
      <div className="settings bottom left corner">
        <i className="fa fa-cog"></i>
      </div>
    )
  }
}

export default Settings;
