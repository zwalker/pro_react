import appDispatcher from './app_dispatcher';
import { Store } from 'flux/utils';
import bankConstants from './bank_constants';

let __balance = 0;

class BankBalanceStore extends Store {

  getState() {
    return __balance;
  }

  __onDispatch(action) {
    switch (action.type) {
      case bankConstants.CREATED_ACCOUNT:
        __balance = 0;
        this.__emitChange();
        break;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        __balance = __balance + action.amount;
        this.__emitChange();
        break;
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        __balance = __balance - action.amount;
        this.__emitChange();
        break;
    }
  }
}

export default new BankBalanceStore(appDispatcher);

