import { EventEmitter } from 'fbemitter';
import appDispatcher from './app_dispatcher';
import bankConstants from './bank_constants';

const CHANGE_EVENT = 'change';
let __emitter = new EventEmitter();
let balance = 0;

let BankBalanceStore = {

  getState() {
    return balance;
  },

  addListener(callback) {
    return __emitter.addListener(CHANGE_EVENT, callback);
  }
};

BankBalanceStore.dispatchToken = appDispatcher.register((action) => {
  switch (action.type) {
    case bankConstants.CREATED_ACCOUNT:
      balance = 0;
      __emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.DEPOSITED_INTO_ACCOUNT:
      balance = balance + action.amount;
      __emitter.emit(CHANGE_EVENT);
      break;
    case bankConstants.WITHDREW_FROM_ACCOUNT:
      balance = balance - action.amount;
      __emitter.emit(CHANGE_EVENT);
      break;
  }
});

export default BankBalanceStore;

