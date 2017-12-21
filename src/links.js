import React, { Component} from 'react';
import './links.css';
import './font-awesome/css/font-awesome.min.css';

function Bookmark(props) {
  return (
    <li key={ props.id } href={ props.url } className="bookmark">
      { props.title }
    </li>
  )
}

function LinksFolder(props) {
  //the bookmarks instance of a LinksFolder should run the traverseaBMs fcn
  return (
    <li className="linksFolderLabel"
        onClick={ props.handleClick }
    >
      { props.isActive ?
        <ul key={ props.id } className="linksFolder"></ul>
        : null
      }
    </li>
  )
}

//LinksPanel should handle the state for what is open|closed
function LinksPanel(props) {
  const apps = 'chrome://apps';
  //       extensions = 'chrome://extensions',
  const chrome = window.chrome;
  //       bookmarks = chrome.bookmarks;

//I ought to traverseTree on load and not on each render
//this should run on compDidMt
  // const traverseBookmarkTree = (id) => {
  //   //will return a var containing a tree of ul & li
  //   let tree = [];
  //   bookmarks.getTree((nodeTree) => {
  //     tree = nodeTree;
  //   });
  //
  //   //is this thing gonna be recursive?
  //   bookmarks.getChildren(i, (childNodes) => {
  //     if (!childNodes) {
  //       return tree.push(<Bookmark />);
  //     }
  //     else {
  //       //no, this needs to be recursive, too
  //       tree.push(<LinksFolder />);
  //       //how do I pass different index nums to this fcn?
  //       traverseBookmarkTree(childNodes[0].id);
  //     }
  //   });
  // }

//LinksPanel should own the traverseBMs fcn, to be run by one LinksFolder
  return (
    <div className="panel linksPanel">
      <ul className="linksCategories">
        <li>Open new blank tab</li>
        <li>
          <ul className="chromeLinks">
            <li><a href={ apps } target="_blank">Apps</a></li>
          </ul>
        </li>
        <li>
          <ul className="bookmarks">
            <li>bookmarks</li>
          </ul>
        </li>
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
    if (event.target.className.includes('linksFolderLabel')) {
      const folder = event.target;
      this.setState((prevState) => {
        return { isActive: !prevState.isActive }
      });
    }
    else return;
  }

  // traverseBookmarkTree(bookmarkNodeID) {
  //   const tree = this.renderBookmarksList(0);
  //   // get, getTree, getChildren
  //   // title, url
  //   // because chrome.bookmarks methods have no return value
  //   // it would be easiest if I wrap them in a fcn that does return sthing
  //   chrome.bookmarks.getChildren(id, (children) => {
  //     if (children) {
  //     }
  //     // because getChildren has no return value
  //     // I need to feed this var to a function that returns sthing
  //     else {
  //       (id) => chrome.bookmarks.get(id, (bookmark) => {
  //         // the return value of this render fcn will not get returned
  //         // I need to pass the return value into an existing outside var
  //         tree.appendChild(this.renderBookmark(bookmark));
  //       })
  //     }
  //   });
  // }

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
