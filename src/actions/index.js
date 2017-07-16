export const FETCH_PAGE = 'fetch_page';
export const FETCH_SEARCH_RESULTS = 'fetch_search_results';
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
