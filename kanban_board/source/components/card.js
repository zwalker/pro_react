import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './checklist.js';
import marked from 'marked';
import { DragSource, DropTarget } from 'react-dnd';
import constants from '../constants';
import { Link } from 'react-router';

let titlePropType = (props, propName, componentName) => {
  if(props[propName]) {
    let value = props[propName];
    if(typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${componentName} is longer than 80 charachters`
      );
    }
  }
}

const cardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id,
      status: props.status
    };
  },

  endDrag(props) {
    props.cardCallbacks.persistCardDrag(props.id, props.status);
  }
}

const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id);
  }
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    };
  }

  toggleState() {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    let cardDetails;
    if(this.state.showDetails) {
      cardDetails = (
        <div className='card__details'>
          <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}} />
          <CheckList cardId={this.props.id} taskCallbacks={this.props.taskCallbacks} tasks={this.props.tasks} />
        </div>
      )
    }

    return connectDropTarget(connectDragSource(
      <div className='card'>
        <div className='card__edit'><Link to={'/edit/' + this.props.id}>&#9998;</Link></div>
        <div className='card__sidebar' style={{backgroundColor: this.props.color}} />
        <div className={this.state.showDetails ? 'card__title--is-open' : 'card__title'} onClick={this.toggleState.bind(this)}>
          {this.props.title}
        </div>
          <ReactCSSTransitionGroup transitionName="toggle"
                                   transitionEnterTimeout={250}
                                   transitionLeaveTimeout={250} >
            {cardDetails}
          </ ReactCSSTransitionGroup>
      </div>
    ));
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  title: titlePropType,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard 
