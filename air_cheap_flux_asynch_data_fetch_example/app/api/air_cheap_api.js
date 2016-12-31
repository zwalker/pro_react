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
  },

  fetchTickets(origin, destination) {
    fetch('flights.json')
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      AirportActionCreators.fetchTicketsSuccess(responseData);
    })
    .catch((error) => {
      AirportActionCreators.fetchTicketsError(error);
    })
  }
};

export default AirCheapAPI;
