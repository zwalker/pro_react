import AppDispatcher from '../app_dispatcher';
import constants from '../constants';
import KanbanApi from '../api/kanban_api';

let CardActionCreators = {
  fetchCards() {
    AppDispatcher.dispatchAsync(KanbanApi.fetchCards(), {
      request: constants.FETCH_CARDS,
      success: constants.FETCH_CARDS_SUCCESS,
      failure: constants.FETCH_CARDS_ERROR
    });
  },

  createCard(card) {
    AppDispatcher.dispatchAsync(KanbanApi.createCard(card), {
      request: constants.CREATE_CARD,
      success: constants.CREATE_CARD_SUCCESS,
      failure: constants.CREATE_CARD_ERROR
    }, {card});
  },

  updateCard(card, draftCard) {
    AppDispatcher.dispatchAsync(KanbanApi.updateCard(card, draftCard), {
      request: constants.UPDATE_CARD,
      success: constants.UPDATE_CARD_SUCCESS,
      failure: constants.UPDATE_CARD_ERROR
    }, {card, draftCard});
  }
};

export default CardActionCreators;
