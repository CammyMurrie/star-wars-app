import { combineReducers } from 'redux';
import pageReducer from './reducer_pages';
import filmsReducer from './reducer_films';

const rootReducer = combineReducers({
  page: pageReducer,
  films: filmsReducer
});

export default rootReducer;
