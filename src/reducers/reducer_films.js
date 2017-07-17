import {FETCH_FILMS} from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_FILMS:
        return _.mapKeys(action.payload.data.results, 'episode_id');
      default:
        return state;
    }
}
