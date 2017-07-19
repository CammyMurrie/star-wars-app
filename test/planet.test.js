import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Planet from '../src/components/planet';

describe('<Planet/>', function () {
  it('should have 1 tr element', function () {
    const wrapper = shallow(<Planet/>);
    expect(wrapper.find('tr')).to.have.length(1);
  });

  it('should have 7 td elements', function () {
    const wrapper = shallow(<Planet/>);
    expect(wrapper.find('td')).to.have.length(7);
  });

  it('should have a td with each prop in it', function () {
    const wrapper = shallow(<Planet
      name='planet1'
      population={1000000}
      diameter={100}
      rotationPeriod={300}
      orbitalPeriod={495}
      terrain='grass'
      films={['film1', 'film2']}
      key={1}/>);
    expect(wrapper.find('td').at(0).text()).to.equal('planet1');
    expect(wrapper.find('td').at(1).text()).to.equal('1000000');
    expect(wrapper.find('td').at(2).text()).to.equal('100');
    expect(wrapper.find('td').at(3).text()).to.equal('300');
    expect(wrapper.find('td').at(4).text()).to.equal('495');
    expect(wrapper.find('td').at(5).text()).to.equal('grass');
    expect(wrapper.find('td').at(6).text()).to.include('film1').and.include('film2');

  });
});
