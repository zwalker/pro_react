import 'whatwg-fetch';
import AirportActionCreators from '../actions/airport_action_creators';

let AirCheapAPI = {
  fetchAirports() {
    fetch('airports.json')
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      AirportActionCreators.fetchAirportSuccess(responseData);
    })
    .catch((error) => {
      AirportActionCreators.fetchAirportError(error);
    });
  }
};

export default AirCheapAPI;
