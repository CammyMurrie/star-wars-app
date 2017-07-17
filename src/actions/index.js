export const FETCH_PAGE = 'fetch_page';
export const FETCH_SEARCH_RESULTS = 'fetch_search_results';
export const FETCH_FILMS = 'fetch_films';
import axios from 'axios';

export function fetchPage(id, endPoint) {
  let request;
  if (id === null) {
    request = axios.get(endPoint);
  } else {
    request = axios.get(`http://swapi.co/api/planets?page=${id}`);
  }

  return {
    type: FETCH_PAGE,
    payload: request
  };
}

export function fetchSearchResults(searchTerm) {
  const request = axios.get(`http://swapi.co/api/planets?search=${searchTerm}`);

  return {
    type: FETCH_SEARCH_RESULTS,
    payload: request
  }
}

export function fetchFilms() {
  const request = axios.get('http://swapi.co/api/films');

  return {
    type: FETCH_FILMS,
    payload: request
  }
}
