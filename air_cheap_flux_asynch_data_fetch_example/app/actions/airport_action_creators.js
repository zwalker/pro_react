import appDispatcher from '../app_dispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/air_cheap_api';

let AirportActionCreators = {

  fetchAirports() {
    appDispatcher.dispatchAsync(
      AirCheapAPI.fetchAirports(),
      {
        request: constants.FETCH_AIRPORTS,
        success: constants.FETCH_AIRPORTS_SUCCESS,
        failure: constants.FETCH_AIRPORTS_ERROR
      }
    );
  },

  chooseAirport(target, code) {
    appDispatcher.dispatch({
      type: constants.CHOOSE_AIRPORT,
      target,
      code
    });
  },

  fetchTickets(origin, destination) {
    appDispatcher.dispatchAsync(
      AirCheapAPI.fetchTickets(origin, destination),
      {
        request: constants.FETCH_TICKETS,
        success: constants.FETCH_TICKETS_SUCCESS,
        failure: constants.FETCH_TICKETS_ERROR
      }
    );
  }
}

export default AirportActionCreators;
