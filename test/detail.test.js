import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import {fetchPage, fetchSearchResults, fetchFilms} from '../src/actions';
import DetailConnected, {Detail} from '../src/components/detail';

describe('<DetailConnected/>', function () {
  it('should be connected', function () {
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    const wrapper = shallow(<Provider store={createStoreWithMiddleware}><DetailConnected/></Provider>);
    expect(wrapper.text()).to.equal('<Connect(Detail) />');
  });
});

describe('<Detail />', function() {
  const wrapper = shallow(<Detail
    fetchPage={fetchPage}
    fetchSearchResults={fetchSearchResults}
    fetchFilms={fetchFilms}
    films={[]}
    page={{}}/>);

  it('should have a search bar', function () {
    expect(wrapper.find('.search-bar')).to.have.length(1);
  });

  it('should have 1 submit button', function () {
    expect(wrapper.find('[type="submit"]')).to.have.length(1);
  });

  it('should have 1 table', function () {
    expect(wrapper.find('table')).to.have.length(1);
  });

  it('should have 7 table columns', function () {
    expect(wrapper.find('th')).to.have.length(7);
  });

  it('should have 5 sortable table columns', function () {
    expect(wrapper.find('.sortable')).to.have.length(5);
  });

  it('should have 2 table rows', function () {
    //one row is the table header row and the other is the empty row created as shallow
    //cannot render nested components which in this case is <Planet />
    expect(wrapper.find('tr')).to.have.length(2);
  });

  it('should have the paginator', function () {
    expect(wrapper.find('.pagination-buttons')).to.have.length(1);
  });

  it('should set new state on change event which sets value of input', function () {
    wrapper.find('.search-bar').simulate('change', {target: {value: 'random text'}});
    expect(wrapper.state().searchTerm).to.equal('random text');
    expect(wrapper.find('.search-bar').props().value).to.equal('random text');
  });

  it('should set new state on click of a column to sort ascending', function () {
    wrapper.find('.sortable').at(0).simulate('click');
    expect(wrapper.state().activeColumn).to.equal('NAME');
    expect(wrapper.state().nameAsc).to.equal(true);
  });

  it('should set new state on click of same column to sort descending', function () {
    wrapper.find('.sortable').at(0).simulate('click');
    expect(wrapper.state().activeColumn).to.equal('NAME');
    expect(wrapper.state().nameAsc).to.equal(false);
  });
});
