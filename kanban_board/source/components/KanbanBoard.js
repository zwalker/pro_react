import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import { Link } from 'react-router';

class KanbanBoard extends Component {
  render() {
    let cardModal = this.props.children && React.cloneElement(this.props.children, {
      cards: this.props.cards,
    });
    return (
      <div className="app">
        <Link to='/new' className="float-button">+</Link>
        <List id='todo' title='To Do' cards={
          this.props.cards.filter((card) => card.status === "todo")} 
        />

        <List id='in-progress' title='In Progress' cards={
          this.props.cards.filter((card) => card.status === "in-progress")}
        />

        <List id='done' title='Done' cards={
          this.props.cards.filter((card) => card.status === "done")}
        />
        {cardModal}
      </div>
    );
  }
}

KanbanBoard.propTypes= {
  cards: PropTypes.arrayOf(PropTypes.object),
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
