import React, { Component, PropTypes } from 'react';
import CardActionCreators from '../actions/card_action_creators'

class CheckList extends Component {
  checkInputKeyPress(evt) {
    if(evt.key === 'Enter'){
      let task = {id: Date.now(), name: evt.target.value, done: false}
      CardActionCreators.addTask(this.props.cardId, task);
    }
  }

  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className='checklist__task'>
        <input type='checkbox' defaultChecked={task.done} onChange={
          CardActionCreators.toggleTask.bind(null, this.props.cardId, task.id, !task.done)
        } />
        {task.name}
        <a href='#' className='checklist__task--remove' onClick={
          CardActionCreators.deleteTask.bind(null, this.props.cardId, task)
        } />
      </li>
    ));

    return (
      <div className='checklist'>
        <ul>{tasks}</ul>
        <input type='text' className='checklist--add-task' placeholder='Type then hit Enter to add a task' 
          onKeyPress={this.checkInputKeyPress.bind(this)} />
      </div>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

export default CheckList;
