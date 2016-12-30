import React, { Component } from 'react';
import {render} from 'react-dom';
import AirportStore from './stores/airport_store';
import AirportActionCreators from './actions/airport_action_creators';

class App extends Component {

  componentDidMount() {
    AirportActionCreators.fetchAirports();
  }

  render(){
    return (
      <h1>Hello World</h1>
    );
  }
}

App.getStores = () => ([AirportStore]);
render(<App />, document.getElementById('root'));
