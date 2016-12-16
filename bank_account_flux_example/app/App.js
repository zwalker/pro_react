import React, { Component } from 'react';
import {render} from 'react-dom';
import BankBalanceStore from './bank_balance_store';
import BankActions from './bank_actions';

class App extends Component {
  constructor() {
    super(...arguments);
    BankActions.createAccount();
    this.state = {
      balance: BankBalanceStore.getState()
    }
  }

  componentDidMount() {
    this.storeSubscription = BankBalanceStore.addListener((data) => {
      this.handleStoreChange(data);
    });
  }

  componentWillUnmount() {
    this.storeSubscription.remove();
  }

  handleStoreChange() {
    this.setState({balance: BankBalanceStore.getState()});
  }

  render(){
    return (
      <h1>Hello World</h1>
    );
  }
}

render(<App />, document.getElementById('root'));
