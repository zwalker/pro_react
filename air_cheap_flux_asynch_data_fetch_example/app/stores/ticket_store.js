import AppDispatcher from '../app_dispatcher';
import AirportActions from '../actions/airport_action_creators';
import constants from '../constants';
import { ReduceStore } from 'flux/utils';

class TicketStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.FETCH_TICKETS:
        return [];
      case constants.FETCH_TICKETS_SUCCESS:
        return action.payload.response;
      case constants.FETCH_TICKETS_ERROR:
        return state;
      default:
        return state;
    }
  }
}

export default new TicketStore(AppDispatcher);
