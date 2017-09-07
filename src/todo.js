import React, { Component } from 'react';
import './todo.css';
import './font-awesome/css/font-awesome.min.css';

function TodoPanel(props) {
  const todoItems = window.localStorage.getItem('todoList') ?
    JSON.parse(window.localStorage.getItem('todoList')) :
    props.todoItems;
  console.log('render(Panel): todoItems:', typeof todoItems, ':', todoItems);
  return (
    <div className="panel todoPanel">
      <form id="todoForm" name="todoForm" onSubmit={ (event) => props.handleSubmit(event) }>
        <input id="todoTextInput"
              name="todoTextInput"
              type="text"
              className="todoTextInput"
        />
        <input id="clearTodoList"
              name="clearTodoList"
              className="clearTodoList"
              type="button"
              value="clear"
              onClick={ (event) => props.handleClick(event) }
        />
      </form>
      <ul id="todoList" className="todoList">
        { todoItems.map(function(item, i, arr) {
            if (i === arr.length-1) {
              console.log('<todoList />', arr)
            }
            return <li className="todoItem"
                      key={ "todoItem" + i }
                      data-todoitem={ i }
                      onClick={ (event) => props.handleClick(event) }
                  >{ item }</li>
          }) }
      </ul>
    </div>
  );
}

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoPanelOpen: false,
      todo: [],
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.name === 'todoForm') {
      const todoItem = event.target['todoTextInput'].value;
      //console.log('handleSubmit: todoItem:', todoItem)
      this.setState((prevState) => {
        prevState.todo.push(todoItem);
        console.log('handleSubmit: prevState after push:', prevState.todo);
        this.props.store('todoList', JSON.stringify(prevState.todo));
        return prevState.todo;
      });
      return event.target['todoTextInput'].value = null;
    }
  }

  handleClick(event) {
    if (event.target.id.includes('togglePanel')) {
      this.setState({ todoPanelOpen: !this.state.todoPanelOpen });
    }
    else if (event.target.id === 'clearTodoList') {
      this.setState({ todo: [] });
      this.props.unstore('todoList');
    }
    else if (event.target.dataset.todoitem) {
      const item = event.target.dataset.todoitem;
      this.setState((prevState) => {
        prevState.todo.splice(+item, 1);
        console.log('handleClick: prevState after splice', prevState.todo);
        this.props.store('todoList', JSON.stringify(prevState.todo));
        return prevState.todo;
      });
    }
  }

  render() {
    return (
      <div className="todo">
        { this.state.todoPanelOpen ?
          <TodoPanel handleSubmit={ (event) => this.handleSubmit(event) }
                    handleClick={ (event) => this.handleClick(event) }
                    todoItems={ this.state.todo }
          /> :
          null
        }
        <i className="fa fa-list-ul togglePanelTodo"
          id="togglePanelTodo"
          tabIndex="0"
          onClick={ (event) => this.handleClick(event) }
        ></i>
      </div>
    );
  }
}
