import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import App from '../src/components/App';
import Header from '../src/components/header';
import Detail from '../src/components/detail';

describe('<App/>', function () {
  it('should render', function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('should contain 1 <Header /> component', function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('should contain 1 <Detail /> component', function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Detail)).to.have.length(1);
  });

});
