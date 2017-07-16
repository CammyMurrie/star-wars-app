import {FETCH_PAGE, FETCH_SEARCH_RESULTS} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_SEARCH_RESULTS:
        return action.payload.data;
      case FETCH_PAGE:
        return action.payload.data;
      default:
        return state;
    }
}
