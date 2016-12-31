import AppDispatcher from '../app_dispatcher';
import constants from '../constants';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';

class RouteStore extends ReduceStore {
  getInitialState() {
    return {
      origin: '',
      destination: ''
    }
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.CHOOSE_AIRPORT:
        let newState = update(state, {[action.target]: {$set: action.code}});
        return newState
      default:
        return state;
    }
  }
}

export default new RouteStore(AppDispatcher);
