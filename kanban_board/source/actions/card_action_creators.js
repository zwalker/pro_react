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
  }
};

export default CardActionCreators;
