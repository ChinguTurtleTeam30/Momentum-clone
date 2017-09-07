import React, { Component } from 'react';
import './todo.css';
import './font-awesome/css/font-awesome.min.css';

function TodoPanel() {
  return (
    <div className="panel todoPanel">
      <input id="todoTextInput" name="todoTextInput" type="text" />
      <ul id="todoList" className="todoList"></ul>
    </div>
  );
}

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoPanelOpen: false,
    }
  }
  render() {
    return (
      <div className="todo">
        { this.state.todoPanelOpen ?
        <TodoPanel /> : null }
        <i className="fa fa-list-ul toggleTodoPanelOpen" tabIndex="0"></i>
      </div>
    );
  }
}
