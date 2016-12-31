import appDispatcher from '../app_dispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/air_cheap_api';

let AirportActionCreators = {

  fetchAirports() {
    AirCheapAPI.fetchAirports();
    appDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS,
    });
  },

  fetchAirportSuccess(response) {
    appDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_SUCCESS,
      payload: {response}
    });
  },

  fetchAirportError(error) {
    appDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: {error}
    });
  },

  chooseAirport(target, code) {
    appDispatcher.dispatch({
      type: constants.CHOOSE_AIRPORT,
      target,
      code
    });
  },

  fetchTickets() {
    AirCheapAPI.fetchTickets();
    appDispatcher.dispatch({
      type: constants.FETCH_TICKETS,
    });
  },

  fetchTicketsSuccess(response) {
    appDispatcher.dispatch({
      type: constants.FETCH_TICKETS_SUCCESS,
      payload: {response}
    });
  },

  fetchTicketsError(error) {
    console.log('Error fething tickets', error);
    appDispatcher.dispatch({
      type: constants.FETCH_TICKETS_ERROR,
      payload: {error}
    });
  }
}

export default AirportActionCreators;
