import React, { Component} from 'react';
import './links.css';
import './font-awesome/css/font-awesome.min.css';

function LinksPanel(props) {
  return (
    <div className="panel linksPanel">
      <p>New blank tab</p>
      <ul className="chromeLinks">
        <li>Apps</li>
      </ul>
      <ul className="bookmarks"></ul>
      <ul className="mostVistied"></ul>
      <ul className="recentlyVisited"></ul>
    </div>
  )
}

export default class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linksPanelOpen: false,
    }
  }

  handleClick(event) {
    if (event.target.id.includes('togglePanelOpen')) {
      const key = event.target.parentElement.id + 'PanelOpen';
      this.setState((prevState) => {
        console.log(key, prevState);
        return { [key]: !prevState[key] };
      });
    }
    else return;
  }

  render() {
    return (
      <div id="links" className="links">
        <i className="fa fa-th togglePanelOpenLinks"
          id="togglePanelOpenLinks"
          tabIndex='0'
          onClick={ (event) => this.handleClick(event) }
        ></i>
        { this.state.linksPanelOpen ?
          <LinksPanel /> :
          null
        }
      </div>
    );
  }
}
