import React from 'react';
import CheckList from './checklist.js';

class Card extends React.Component {
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
    let cardDetails;
    if(this.state.showDetails) {
      cardDetails = (
        <div className='card__details'>
          {this.props.description}
          <CheckList card_id={this.props.id} tasks={this.props.tasks} />
        </div>
      )
    }

    return (
      <div className='card'>
        <div className={this.state.showDetails ? 'card__title--is-open' : 'card__title'} onClick={this.toggleState.bind(this)}>
          {this.props.title}
        </div>
        {cardDetails}
      </div>
    );
  }
}

export default Card;
