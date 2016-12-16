import appDispatcher from './app_dispatcher';
import bankConstants from './bank_constants';

let BankActions = {
  createAccount() {
    appDispatcher.dispatch({
      type: bankConstants.CREATED_ACCOUNT,
      amount: 0
    });
  },

  depositIntoAccount(amount) {
    appDispatcher.dispatch({
      type: bankConstants.DEPOSITED_INTO_ACCOUNT,
      amount: amount
    });
  },

  withdrawFromAccount(amount) {
    appDispatcher.dispatch({
      type: bankConstants.WITHDREW_FROM_ACCOUNT,
      amount: amount
    });
  }
}

export default BankActions;
