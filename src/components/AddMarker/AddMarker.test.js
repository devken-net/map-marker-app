import React from 'react';
import ReactDOM from 'react-dom';
import { AddMarker } from './AddMarker';
jest.mock('../../store');
import store from "../../store";
import { shallow } from 'enzyme';
import { async } from 'q';

describe('AddMarker.js', () => {
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
      return [
        { markers },
        { addMarker: jest.fn() }
      ]
    });
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddMarker />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('calls addMarker on submit', async (done) => {
    // Currently, spying addMarker didn't work
    // So I just put `done()` on mocked addMarker method
    // TODO: apply expect(store()[1].addMarker).toHaveBeenCalled
    store.mockImplementation(() => {
      return [
        { markers },
        { addMarker: jest.fn().mockImplementation((address) => {
          expect(address).toEqual('Berlin')
          done();
        })}
      ]
    });

    const wrapper = shallow(<AddMarker/>);
    const addressInput = wrapper.find('#addressInput');
    const [mockState, mockActions] = store();
    addressInput.value = 'Berlin';
    expect(addressInput.value).toEqual('Berlin');
    await wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        address: addressInput,
      }
    });
  });
});
