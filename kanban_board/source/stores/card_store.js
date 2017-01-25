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

  getTaskIndex(cardIndex, taskId) {
    return this._state[cardIndex].tasks.findIndex((task) => task.id == taskId);
  }

  reduce(state, action) {
    let cardIndex;
    let taskIndex;
    let card;
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

      case constants.ADD_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {[cardIndex]: {tasks: {$push: [action.payload.task]}}});
      case constants.ADD_TASK_SUCCESS:
        cardIndex = this.getCardIndex(action.payload.cardId);
        taskIndex = this.getTaskIndex(cardIndex, action.payload.task.id);
        return update(this.getState(), {[cardIndex]: {tasks: {[taskIndex]: {$set: action.payload.response}}}})
      case constants.ADD_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId);
        taskIndex = this.getTaskIndex(cardIndex, action.payload.task.id);
        return update(this.getState(), {[cardIndex]: {tasks: {$splice: [[taskIndex, 1]]}}});

      case constants.TOGGLE_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId);
        taskIndex = this.getTaskIndex(cardIndex, action.payload.taskId);
        return update(this.getState(), {[cardIndex]: {tasks: {[taskIndex]: {done: {$set: action.payload.done}}}}});
      case constants.TOGGLE_TASK_SUCCESS:
        return this.getState();
      case constants.TOGGLE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId);
        taskIndex = this.getTaskIndex(cardIndex, action.payload.task.id);
        return update(this.getState(), {[cardIndex]: {tasks: {[taskIndex]: {$set: {done: !action.payload.done}}}}});

      case constants.DELETE_TASK:
        cardIndex = this.getCardIndex(action.payload.cardId);
        taskIndex = this.getTaskIndex(cardIndex, action.payload.task.id);
        return update(this.getState(), {[cardIndex]: {tasks: {$splice: [[taskIndex, 1]]}}});
      case constants.DELETE_TASK_SUCCESS:
        return this.getState();
      case constants.DELETE_TASK_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId);
        taskIndex = this.getTaskIndex(cardIndex, action.payload.taskId);
        return update(this.getState(), {[cardIndex]: {tasks: {$push: [action.payload.task]}}});

      case constants.UPDATE_CARD_STATUS:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {[cardIndex]: {status: {$set: action.payload.status}}});

      case constants.UPDATE_CARD_POSITION:
        cardIndex = this.getCardIndex(action.payload.cardId);
        let afterIndex = this.getCardIndex(action.payload.afterCardId);
        card = this.getCard(action.payload.cardId);
        return update(this.getState(), {$splice: [[cardIndex, 1], [afterIndex, 0, card]]}); 

      case constants.PERSIST_CARD_DRAG:
        card = this.getCard(action.payload.cardId);
        return update(this.getState(), {[cardIndex]: {$set: action.payload.draftCard}});
      case constants.PERSIST_CARD_DRAG_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {[cardIndex]: {state: {$set: action.payload.status}}}); 

      default:
        return state;
    }
  }
}

export default new CardStore(AppDispatcher);

