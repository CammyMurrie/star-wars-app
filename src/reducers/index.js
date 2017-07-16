import { combineReducers } from 'redux';
import pageReducer from './reducer_pages';

const rootReducer = combineReducers({
  page: pageReducer
});

export default rootReducer;
