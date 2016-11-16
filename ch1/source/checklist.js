import React from 'react';

class CheckList extends React.Component {
  render() {
    console.log(this.props.tasks);
    let tasks = this.props.tasks.map((task) => (
      <li key={task.id} className='checklist__task'>
        <input type='checkbox' defaultChecked={task.done} />
        {task.name}
        <a href='#' className='checklist__task--remove' />
      </li>
    ));

    console.log(tasks);
    return (
      <div className='checklist'>
        <ul>{tasks}</ul>
      </div>
    );
  }
}

export default CheckList;
