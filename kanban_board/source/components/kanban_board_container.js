import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';
import { throttle } from '../util';

import { Container } from 'flux/utils';
import CardActionCreators from '../actions/card_action_creators';
import CardStore from '../stores/card_store';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'mewford'
};

class KanbanBoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards: []
    };

    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this));
  }
  
  componentDidMount(){
    CardActionCreators.fetchCards();
  } 

  updateCardStatus(cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex];
    if (card.status !== listId) {
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      }));
    }
  }

  updateCardPosition(cardId, afterId) {
    if(cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
      let card = this.state.cards[cardIndex];
      let afterIndex = this.state.cards.findIndex((card) => card.id == afterId);

      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }

  persistCardDrag(cardId, status) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex];

    fetch(`${API_URL}/cards/${cardId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({status: card.status, row_order_position: cardIndex})
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error("Server response wasn't OK");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: status }
            }
          }
        })
      );
    });
  }

  render() {
    let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
      cards: this.state.cards,
      cardCallbacks: {
        updateStatus: this.updateCardStatus.bind(this),
        updatePosition: this.updateCardPosition.bind(this),
        persistCardDrag: this.persistCardDrag.bind(this)
      }
    });

    return kanbanBoard;
  }
}

KanbanBoardContainer.getStores = () => ([CardStore]);
KanbanBoardContainer.calculateState = (prevState) => ({
  cards: CardStore.getState()
});

export default Container.create(KanbanBoardContainer);
