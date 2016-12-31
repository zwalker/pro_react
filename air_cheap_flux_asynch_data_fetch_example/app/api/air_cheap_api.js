import 'whatwg-fetch';
import AirportActionCreators from '../actions/airport_action_creators';

let AirCheapAPI = {
  fetchAirports() {
    return fetch('airports.json')
    .then((response) => response.json());
  },

  fetchTickets(origin, destination) {
    return fetch('flights.json')
    .then((response) => response.json())
  }
};

export default AirCheapAPI;
