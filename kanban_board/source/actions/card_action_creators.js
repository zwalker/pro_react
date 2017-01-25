import AppDispatcher from '../app_dispatcher';
import constants from '../constants';
import KanbanApi from '../api/kanban_api';
import CardStore from '../stores/card_store';
import { throttle } from  '../util';

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
  },

  addTask(cardId, task) {
    AppDispatcher.dispatchAsync(KanbanApi.addTask(cardId, task), {
      request: constants.ADD_TASK,
      success: constants.ADD_TASK_SUCCESS,
      failure: constants.ADD_TASK_ERROR
    }, {cardId, task});
  },

  deleteTask(cardId, task) {
    AppDispatcher.dispatchAsync(KanbanApi.deleteTask(cardId, task), {
      request: constants.DELETE_TASK,
      success: constants.DELETE_TASK_SUCCESS,
      failure: constants.DELETE_TASK_ERROR
    }, {cardId, task});
  },

  toggleTask(cardId, taskId, done) {
    AppDispatcher.dispatchAsync(KanbanApi.toggleTask(cardId, taskId, done), {
      request: constants.TOGGLE_TASK,
      success: constants.TOGGLE_TASK_SUCCESS,
      failure: constants.TOGGLE_TASK_ERROR
    }, {cardId, taskId, done});
  },

  updateCardStatus: throttle((cardId, status) => {
    AppDispatcher.dispatch(constants.UPDATE_CARD_STATUS, {cardId, status});
  }),

  updateCardPosition: throttle((cardId, afterCardId) => {
    AppDispatcher.dispatch(constants.UPDATE_CARD_POSITION, {cardId, afterCardId});
  }),

  persistCardDrag(cardId, status) {
    let card = CardStore.getCard(cardId);
    let cardIndex = CardStore.getCardIndex(cardId);
    AppDispatcher.dispatchAsync(KanbanApi.persistCardDrag(cardId, card.status, cardIndex), {
      requeset: constants.PERSIST_CARD_DRAG,
      success: constants.PERSIST_CARD_DRAG_SUCCESS,
      failure: constants.PERSIST_CARD_DRAG_ERROR
    }, {cardId, status});
  }
};

export default CardActionCreators;
