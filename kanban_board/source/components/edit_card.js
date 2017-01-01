import React, { Component, PropTypes } from 'react'
import CardForm from './card_form';
import CardActionCreators from '../actions/card_action_creators';
import CardStore from '../stores/card_store';

class EditCard extends Component {
  
  componentWillMount() {
    let card = CardStore.getCard(parseInt(this.props.params.card_id));
    this.setState(Object.assign({}, card));
  }

  handleChange(field, value) {
    this.setState({[field]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let card = CardStore.getCard(parseInt(this.props.params.card_id));
    CardActionCreators.updateCard(card, this.state);
    this.props.history.pushState(null, '/');
  }

  handleClose(e) {
    this.props.history.pushState(null, '/');
  }

  render() {
    return (
      <CardForm draftCard={this.state}
                buttonLabel="Edit Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
    );
  }
}

export default EditCard;
