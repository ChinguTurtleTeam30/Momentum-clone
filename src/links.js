import React, { Component} from 'react';
import './links.css';
import './font-awesome/css/font-awesome.min.css';

function LinksPanel(props) {
  return (
    <div className="panel linksPanel">
      <ul className="linksCategories">
        <li>Open new blank tab</li>
        <li>
          <ul className="chromeLinks">
            <li>Apps</li>
          </ul>
        </li>
        <li><ul className="bookmarks"></ul></li>
        <li><ul className="mostVistied"></ul></li>
        <li><ul className="recentlyVisited"></ul></li>
      </ul>
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
        ></i><span className="togglePanelLabel">Links</span>
        { this.state.linksPanelOpen ?
          <LinksPanel /> :
          null
        }
      </div>
    );
  }
}
