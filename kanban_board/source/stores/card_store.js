import AppDispatcher from '../app_dispatcher';
import constants from '../constants';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';

class CardStore extends ReduceStore {
  getInitialState() {
    return [];
  }
  
  getCard(id) {
    return this._state.find((card) => card.id == id);
  }

  getCardIndex(id) {
    return this._state.findIndex((card) => card.id == id);
  }

  reduce(state, action) {
    let cardIndex;
    switch(action.type) {
      case constants.FETCH_CARDS_SUCCESS:
        return action.payload.response;

      case constants.CREATE_CARD:
        return update(this.getState(), {$push: [action.payload.card]});
      case constants.CREATE_CARD_SUCCESS:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: {id: {$set: action.payload.response.id}}
        });
      case constants.CREATE_CARD_FAILURE:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {$splice: [[cardIndex, 1]]});

      case constants.UPDATE_CARD:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {[cardIndex]: {$set: action.payload.draftCard}});
      case constants.UPDATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {[cardIndex]: {$set: action.payload.card}});

      default:
        return state;
    }
  }
}

export default new CardStore(AppDispatcher);

