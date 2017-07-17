import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPage, fetchSearchResults, fetchFilms} from '../actions';
import axios from 'axios';

import Planet from './planet';

class Detail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      searchTerm: ''
    }
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentWillMount() {
    const {currentPage} = this.state;
    const {films, fetchFilms, fetchPage} = this.props;

    fetchPage(currentPage);

    if(Object.keys(films).length === 0) {
      fetchFilms();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {next, previous} = nextProps.page;

    if (next === null && previous === null) {
      this.setState({currentPage: 1});
      return;
    }

    if (next === null) {
      let prevPage = Number(previous.slice(previous.length-1, previous.length));
      this.setState({currentPage: prevPage+1});
      return;
    } else {
      let nextPage = Number(next.slice(next.length-1, next.length));
      this.setState({currentPage: nextPage-1});
      return;
    }


  }

  renderTableRows() {
    const planets = this.props.page.results;
    const {films} = this.props;

    if (!planets || Object.keys(films).length === 0) {
      return <tr></tr>
    }

    return planets.map((planet, index) => {
      const filmsLength = planet.films.length;
      const filmTitles = planet.films.map((film, index) => {
        let filmNumber = film.slice(film.length-2, film.length-1);
        return (
          <span
            className='film-list'
            key={filmNumber}>
            {films[filmNumber].title}{filmsLength-1 === index ? '' : ','}
          </span>
        );
      });

      return (
        <Planet
          name={planet.name}
          diameter={planet.diameter}
          population={planet.population}
          orbitalPeriod={planet.orbital_period}
          rotationPeriod={planet.rotation_period}
          films={filmTitles}
          terrain={planet.terrain}
          key={index}
          />
      );
    });
  }

  onChangeHandler(event) {
    this.setState({searchTerm: event.target.value});
  }

  onClickHandler(pageId, endPoint) {
    const {fetchPage} = this.props;
    fetchPage(pageId, endPoint);
  }

  onSubmitHandler(event) {
    const {fetchSearchResults} = this.props;
    const {searchTerm} = this.state;

    event.preventDefault();
    fetchSearchResults(searchTerm);
  }

  renderPaginator() {
    const {count, next, previous} = this.props.page;
    const {currentPage} = this.state;
    const lastPageNumber = Math.ceil(count/10);
    const firstPaginator = <li key={0} className={currentPage === 1 ? 'disabled' : ''} onClick={() => {this.onClickHandler(1)}}><a>First</a></li>;
    const prevPaginator = <li key={-1} className={currentPage === 1 ? 'disabled' : ''} onClick={() => {this.onClickHandler(null, previous)}}><a>{'<<'}</a></li>;
    const nextPaginator = <li key={-2} className={currentPage === lastPageNumber ? 'disabled' : ''} onClick={() => {this.onClickHandler(null, next)}}><a>{'>>'}</a></li>;
    const lastPaginator = <li key={lastPageNumber+1} className={currentPage === lastPageNumber ? 'disabled' : ''} onClick={() => {this.onClickHandler(lastPageNumber)}}><a>Last</a></li>;
    let pageNumbers = [];
    let i = 1;
    while (i <= lastPageNumber) {
      pageNumbers.push(i);
      i++;
    }
    const pagesArray = pageNumbers.map((number) => {

      return (
        <li
          key={number}
          className={number === currentPage ? 'active' : ''}
          onClick={() => {this.onClickHandler(number)}}>
          <a>{number}</a>
        </li>
      );
    });

    pagesArray.unshift(prevPaginator);
    pagesArray.unshift(firstPaginator);
    pagesArray.push(nextPaginator);
    pagesArray.push(lastPaginator);
    return (
      <ul className='pagination pagination-sm'>
        {pagesArray.length > 4 ? pagesArray : ''}
      </ul>
    );
  }

  render () {
    const {page, films} = this.props;

    if (!page && !films) {
      return <div></div>
    }
    console.log(this.state.currentPage);
    return (
      <div>
        <div className='search-region'>
          <form className='form-group' onSubmit={event => this.onSubmitHandler(event)}>
            <input
              className='search-bar form-control'
              onChange={event => this.onChangeHandler(event)}
               />
            <input type='submit' value='Search' className='btn search-button'/>
          </form>
        </div>
        <div className='table-container'>
          <table className='table table-striped table-bordered table-hover table-condensed'>
            <thead>
              <tr>
                <th>NAME</th>
                <th>POPULATION</th>
                <th>DIAMETER</th>
                <th>ROTATION PERIOD</th>
                <th>ORBITAL PERIOD</th>
                <th>TERRAIN</th>
                <th>FILMS</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRows()}
            </tbody>
          </table>
        </div>
        <div className='pagination-buttons'>
            {this.renderPaginator()}
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
    return {
      page: state.page,
      films: state.films
    };
}

export default connect(mapStateToProps, {fetchPage, fetchSearchResults, fetchFilms})(Detail);
