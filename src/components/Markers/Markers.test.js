import React from 'react';
import ReactDOM from 'react-dom';
import { Markers } from './Markers';
jest.mock('../../store');
import store from "../../store";
import { shallow } from 'enzyme';

describe('Markers.js', () => {
  const markers = [{
      "id": "e4ae2a63-44d3-4bbb-8168-c6741932a08a",
      "name": "Home",
      "fullName": "Berlin, Germany",
      "location": {
          "lat": 52.52000659999999,
          "lng": 13.404954
      }
  },{
      "id": "f4ae2a63-33d3-4aaa-9176-b5841932a09c",
      "name": "Work",
      "fullName": "Munich, Germany",
      "location": {
          "lat": 53.42000658888888,
          "lng": 14.504964
      }
  }];
  beforeEach(() => {
    store.mockImplementation(() => [{
      markers,
    }]);
  });
  afterEach(() => {
    store.mockClear();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Markers />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('get markers from store', () => {
    const wrapper = shallow(<Markers/>);
    expect(wrapper.find('.markers').children()).toHaveLength(markers.length);
  });
});
