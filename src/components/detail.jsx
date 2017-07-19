import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPage, fetchSearchResults, fetchFilms} from '../actions';
import axios from 'axios';

import Planet from './planet';
//exporting for testing purpses as well as connected component for default.
export class Detail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      searchTerm: '',
      activeColumn: '',
      nameAsc: false,
      popAsc: false,
      diameterAsc: false,
      rotAsc: false,
      orbAsc: false
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
    const {nameAsc, diameterAsc, popAsc, orbAsc, rotAsc, activeColumn} = this.state;
    const numberColumns = ['DIAMETER', 'ROTATION_PERIOD', 'ORBITAL_PERIOD', 'POPULATION'];
    const sortableColumns = {
      'DIAMETER': diameterAsc,
      'ROTATION_PERIOD': rotAsc,
      'ORBITAL_PERIOD': orbAsc,
      'NAME': nameAsc,
      'POPULATION': popAsc
    };

    if (!planets || Object.keys(films).length === 0) {
      return <tr></tr>
    }
    if (numberColumns.includes(activeColumn)) {
      planets.sort(compareNumberAttr(activeColumn.toLowerCase()));
      if (!sortableColumns[activeColumn]) {
        planets.reverse();
      }
    }

    if (activeColumn === 'NAME') {
      planets.sort(compareName);
      if (!sortableColumns[activeColumn]) {
        planets.reverse();
      }
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

  showColumnLabel(column) {
    const {nameAsc, diameterAsc, popAsc, orbAsc, rotAsc, activeColumn} = this.state;
    const sortableColumns = {
      'DIAMETER': diameterAsc,
      'ROTATION_PERIOD': rotAsc,
      'ORBITAL_PERIOD': orbAsc,
      'NAME': nameAsc,
      'POPULATION': popAsc
    };
    const label = sortableColumns[column] ? <span className='glyphicon glyphicon-arrow-up'></span> : <span className='glyphicon glyphicon-arrow-down'></span>;

    if (column === activeColumn) {
      return label;
    }
  }

  render () {
    const {page, films} = this.props;
    const {nameAsc, diameterAsc, popAsc, orbAsc, rotAsc, activeColumn, searchTerm} = this.state;

    if (!page && !films) {
      return <div></div>
    }

    return (
      <div>
        <div className='search-region'>
          <form className='form-group' onSubmit={event => this.onSubmitHandler(event)}>
            <input
              className='search-bar form-control'
              onChange={event => this.onChangeHandler(event)}
              value={searchTerm}
               />
            <input type='submit' value='Search' className='btn search-button'/>
          </form>
        </div>
        <div className='table-container'>
          <table className='table table-striped table-bordered table-hover table-condensed'>
            <thead>
              <tr>
                <th
                  className='sortable'
                  onClick={() => {
                    this.setState({
                      activeColumn: 'NAME',
                      nameAsc: !nameAsc,
                      popAsc: false,
                      diameterAsc: false,
                      rotAsc: false,
                      orbAsc: false
                    })
                  }}>
                  NAME {this.showColumnLabel('NAME')}
                </th>
                <th
                  className='sortable'
                  onClick={() => {
                    this.setState({
                      activeColumn: 'POPULATION',
                      popAsc: !popAsc,
                      nameAsc: false,
                      diameterAsc: false,
                      rotAsc: false,
                      orbAsc: false
                    })
                  }}>
                  POPULATION {this.showColumnLabel('POPULATION')}
                </th>
                <th
                  className='sortable'
                  onClick={() => {
                    this.setState({
                      activeColumn: 'DIAMETER',
                      diameterAsc: !diameterAsc,
                      popAsc: false,
                      nameAsc: false,
                      rotAsc: false,
                      orbAsc: false
                    })
                  }}>
                  DIAMETER {this.showColumnLabel('DIAMETER')}
                </th>
                <th
                  className='sortable'
                  onClick={() => {
                    this.setState({
                      activeColumn: 'ROTATION_PERIOD',
                      rotAsc: !rotAsc,
                      diameterAsc: false,
                      popAsc: false,
                      nameAsc: false,
                      orbAsc: false
                    })
                  }}>
                  ROTATION PERIOD {this.showColumnLabel('ROTATION_PERIOD')}
                </th>
                <th
                  className='sortable'
                  onClick={() => {
                    this.setState({
                      activeColumn: 'ORBITAL_PERIOD',
                      orbAsc: !orbAsc,
                      rotAsc: false,
                      diameterAsc: false,
                      popAsc: false,
                      nameAsc: false
                    })
                  }}>
                  ORBITAL PERIOD {this.showColumnLabel('ORBITAL_PERIOD')}
                </th>
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

function compareNumberAttr(attr) {
  return function(a, b) {
    if (Number(a[attr]) > Number(b[attr])) {
      return 1;
    }
    if (Number(a[attr]) < Number(b[attr])) {
      return -1;
    }
    if (isNaN(a[attr]) ) {
      return 1;
    }
    return 0;
  }
}

function compareName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function mapStateToProps(state) {
    return {
      page: state.page,
      films: state.films
    };
}

export default connect(mapStateToProps, {fetchPage, fetchSearchResults, fetchFilms})(Detail);
