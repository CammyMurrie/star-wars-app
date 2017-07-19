import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Header from '../src/components/header';

describe('<Header/>', function () {
  it('should have an image to display admiral ackbar', function () {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have an h1 for the title', function () {
    const wrapper = shallow(<Header/>);
    //console.log(wrapper.debug());
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should have an h3 for the description', function () {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('h3')).to.have.length(1);
  });
});
