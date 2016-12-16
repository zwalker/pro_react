import appDispatcher from './app_dispatcher';
import { ReduceStore } from 'flux/utils';
import bankConstants from './bank_constants';

class BankBalanceStore extends ReduceStore {

  getInitialState() {
    return 0;
  }

  reduce(state, action) {
    switch (action.type) {
      case bankConstants.CREATED_ACCOUNT:
        return 0;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        return state + action.amount;
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        return state - action.amount;
      default:
        return state;
    }
  }
}

export default new BankBalanceStore(appDispatcher);

