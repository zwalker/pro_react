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
  }
}

export default AirportActionCreators;
