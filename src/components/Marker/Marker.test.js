import React from 'react';
import ReactDOM from 'react-dom';
import { Marker } from './Marker';
jest.mock('../../store');
import store from "../../store";
import { mount } from 'enzyme';

describe('Marker.js', () => {
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
      return [{ markers },
        jest.fn().mockImplementation(() => {
            return {
              deleteMarker: jest.fn(),
              updateMarker: jest.fn(),
            };
        })()
      ]
    });
  });
  afterEach(() => {
    store.mockClear()
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Marker />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders with data props', () => {
    const wrapper = mount(<Marker data={markers[0]}/>);
    expect(wrapper.find('.card__title-text').text()).toEqual(markers[0].name);
  });
  it('can update marker name', async (done) => {
    // Currently, spying updateMarker didn't work
    // So I just put `done()` on mocked updateMarker method
    // TODO: apply expect(store()[1].updateMarker).toHaveBeenCalled
    store.mockImplementation(() => {
      return [
        { markers },
        { updateMarker: jest.fn().mockImplementation((payload) => {
          expect(payload).toEqual(markers[0])
          done();
        })}
      ]
    });

    const wrapper = mount(<Marker data={markers[0]}/>);
    const editButton = wrapper.find('#editButton');
    expect(editButton.text()).toEqual('EDIT');

    editButton.simulate('click');
    expect(editButton.text()).toEqual('SAVE');

    const editInput = wrapper.find('.mdl-textfield__input');
    expect(editInput.prop('value')).toEqual(markers[0].name);

    editInput.value = 'Work';
    editButton.simulate('click');
    expect(editInput.prop('value')).toEqual(markers[0].name);
  });
  it('can delete marker name', async (done) => {
    // Currently, spying deleteMarker didn't work
    // So I just put `done()` on mocked deleteMarker method
    // TODO: apply expect(store()[1].deleteMarker).toHaveBeenCalled
    store.mockImplementation(() => {
      return [
        { markers },
        { deleteMarker: jest.fn().mockImplementation((id) => {
          expect(id).toEqual(markers[0].id)
          done();
        })}
      ]
    });

    const wrapper = mount(<Marker data={markers[0]}/>);
    const deleteButton = wrapper.find('#deleteButton');
    expect(deleteButton.text()).toEqual('DELETE');

    deleteButton.simulate('click');
  });
});
