import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './checklist.js';
import marked from 'marked';
import { DragSource } from 'react-dnd';
import constants from './constants';

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
      id: props.id
    };
  }
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
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
    const { connectDragSource } = this.props;

    let cardDetails;
    if(this.state.showDetails) {
      cardDetails = (
        <div className='card__details'>
          <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}} />
          <CheckList cardId={this.props.id} taskCallbacks={this.props.taskCallbacks} tasks={this.props.tasks} />
        </div>
      )
    }

    return connectDragSource(
      <div className='card'>
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
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: titlePropType,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
