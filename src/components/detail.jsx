import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPage, fetchSearchResults} from '../actions';
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
  }

  componentWillMount() {
    this.props.fetchPage(this.state.currentPage);
  }

  renderTableRows() {
    const planets = this.props.page.results;

    if (!planets) {
      return <tr></tr>
    }
    return planets.map((planet, index) => {
      return (
        <Planet
          name={planet.name}
          diameter={planet.diameter}
          population={planet.population}
          orbitalPeriod={planet.orbital_period}
          rotationPeriod={planet.rotation_period}
          films={planet.films}
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
    this.props.fetchPage(pageId, endPoint);
    this.setState({currentPage: pageId});
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.fetchSearchResults(this.state.searchTerm);
  }

  render () {
    const {page} = this.props;

    if (!page) {
      return <div></div>
    }

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
          <ul className='pagination pagination-lg'>
            <li><a>First</a></li>
            <li><a>First</a></li>
            <li><a>{First}</a></li>
            <li><a>Last</a></li>
          </ul>
          <span className='pagination-option' onClick={() => {this.onClickHandler(1);}}>First</span>
          <span className='pagination-option' onClick={() => {this.onClickHandler(null, page.previous);}}>{'<'}</span>
          <span className='pagination-option' onClick={() => {this.onClickHandler(null, page.next);}}>{'>'}</span>
          <span className='pagination-option' onClick={() => {this.onClickHandler(7);}}>Last</span>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
    return {page: state.page};
}

export default connect(mapStateToProps, {fetchPage, fetchSearchResults})(Detail);
