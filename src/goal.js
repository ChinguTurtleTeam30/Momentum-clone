import React, { Component } from 'react';
import './goal.css';

export default class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: window.localStorage.getItem('goal'),
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const val = event.target['goalInput'].value;
    if (val) {
      this.setState({ goal: val });
      if (this.props.localStorageAvailable) {
        window.localStorage.setItem('goal', val);
      }
      event.target['goalInput'].value = '';
    }
    else return;
  }

  handleClick(event) {
    this.setState({ goal: null });
    this.props.unstore('goal');
  }

  handleCheck(event) {
    if (event.target.checked) {
      this.setState({ strikeGoal: true });
    }
    else this.setState({ strikeGoal: false });
  }

  render() {
   return (
     <div className="goal">
       { !this.state.goal ?
         <form
           id="setGoal"
           name="goalForm"
           onSubmit={ (event) => this.handleSubmit(event) }
         >
           <input id="goalInput" name="goalInput" type="text" />
           <label htmlFor="goalInput">What is your goal?</label>
         </form> :
         <div className="displayGoal">
           <input id="goalComplete" name="goalComplete" type="checkbox"
                 value="complete" onChange={ (event) => this.handleCheck(event) }
           />
           <span id="goalLine"
                 className={ this.state.strikeGoal ? "strikeGoal" : "" }
           >{ this.state.goal }</span>
           <input id="xGoal" name="xGoal" type="button" value="&times;"
                   onClick={ (event) => this.handleClick(event) }
           />
         </div>
       }
     </div>
   );
 }
}
