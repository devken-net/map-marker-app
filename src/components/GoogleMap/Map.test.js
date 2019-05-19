import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from './Map';
jest.mock('../../store');
import store from "../../store";
import { shallow } from 'enzyme';

describe('Map.js', () => {
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
    store.mockImplementation(() => {
      return [{ markers }]
    });
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Map />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders without markers', () => {
    store.mockImplementation(() => {
      return [{ markers: [] }]
    });

    const div = document.createElement('div');
    ReactDOM.render(<Map />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
