import { 
  addMarker,
  deleteMarker,
  fetchAllMarkers,
  updateMarker,
} from './markers';

describe('markers.js', () => {
  let store, mockSuccessResponse;
  beforeEach(() => {
    store = {
      setState: jest.fn().mockReturnThis(),
    };
    mockSuccessResponse = {
      "result": true,
      "response": [{
          "id": "e4ae2a63-44d3-4bbb-8168-c6741932a08a",
          "name": "Work",
          "fullName": "Berlin, Germany",
          "location": {
              "lat": 52.52000659999999,
              "lng": 13.404954
          }
      }]
    };
  }); 
  afterEach(() => {
    global.fetch.mockClear();
  });
  describe('ADD', () => {

    let mockPostRequest;
    beforeEach(() => {
      mockPostRequest = {
        body: JSON.stringify({ address: 'Berlin' }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      };
    });
    it('POST request to server', async (done) => {
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await addMarker(store, 'Berlin');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch.mock.calls[0][0]).toBe('./api/locations');
      expect(global.fetch.mock.calls[0][1]).toStrictEqual(mockPostRequest);
      process.nextTick(() => {
        done();
      });
    });
    it('catch response.result false from server', async (done) => {
      const mockFailedResponse = {
        result: false,
        response: `Unable to find location.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);
      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await addMarker(store, 'Berlin');
      const fetch = global.fetch.mock.calls[0];
      expect(fetch[0]).toBe('./api/locations');
      expect(fetch[1]).toStrictEqual(mockPostRequest);

      process.nextTick((res) => {
        expect(store.setState).toHaveBeenCalledWith({
          error: `Unable to find location.`,
        });
        done();
      });
    });
    it('catch failed API calls', async (done) => {
      const mockFailedResponse = {
        result: false,
        response: `Unable to find location.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);

      const mockPromise = Promise.reject(mockJsonPromise); 
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
      jest.spyOn(global, 'alert').mockImplementation(() => {});

      await addMarker(store, 'Berlin');
      const fetch = global.fetch.mock.calls[0];
      expect(fetch[0]).toBe('./api/locations');
      expect(fetch[1]).toStrictEqual(mockPostRequest);

      process.nextTick(() => {
        expect(global.alert).toHaveBeenCalledWith(`Unable to find location.`);
        global.alert.mockClear();
        done();
      });
    });
  });
  describe('DELETE', () => {
    it('DELETE marker from server', async (done) => {
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await deleteMarker(store, '123');

      const fetch = global.fetch.mock.calls[0];
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(fetch[0]).toBe('./api/locations?id=123');
      expect(fetch[1]).toStrictEqual({"method": "DELETE"});

      process.nextTick(() => {
        expect(store.setState).toHaveBeenCalledTimes(1);
        expect(store.setState).toHaveBeenCalledWith({ 
          markers: mockSuccessResponse.response
        });
        done();
      });
    });
    it('catch response.result false from server', async (done) => {
      mockSuccessResponse.result = false;
      const mockFailedResponse = {
        result: false,
        response: `Something went wrong.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);
      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await deleteMarker(store, 123);

      const fetch = global.fetch.mock.calls[0];
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(fetch[0]).toBe('./api/locations?id=123');
      expect(fetch[1]).toStrictEqual({"method": "DELETE"});

      process.nextTick(() => {
        expect(store.setState).toHaveBeenCalledTimes(1);
        expect(store.setState).toHaveBeenCalledWith({
          error: `Something went wrong.`,
        });
        done();
      });
    });
    it('catch failed API calls', async (done) => {
      mockSuccessResponse.result = false;
      const mockFailedResponse = {
        result: false,
        response: `Something went wrong.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);
      const mockPromise = Promise.reject(mockJsonPromise); 
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
      jest.spyOn(global, 'alert').mockImplementation(() => {});

      await deleteMarker(store, 123);

      const fetch = global.fetch.mock.calls[0];
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(fetch[0]).toBe('./api/locations?id=123');
      expect(fetch[1]).toStrictEqual({"method": "DELETE"});

      process.nextTick(() => {
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith(`Something went wrong.`);
        global.alert.mockClear();
        done();
      });
    });
  });
  describe('FETCH', () => {
    it('fetches all markers from server', async (done) => {
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await fetchAllMarkers(store);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('./api/locations');

      process.nextTick(() => {
        done();
      });
    });
    it('catch response.result false from server', async (done) => {
      mockSuccessResponse.result = false;
      const mockFailedResponse = {
        result: false,
        response: `Something went wrong.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);

      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await fetchAllMarkers(store);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('./api/locations');

      process.nextTick((res) => {
        expect(store.setState).toHaveBeenCalledTimes(1);
        expect(store.setState).toHaveBeenCalledWith({
          error: `Something went wrong.`,
        });
        done();
      });
    });
    it('catch failed API calls', async (done) => {
      mockSuccessResponse.result = false;
      const mockFailedResponse = {
        result: false,
        response: `Something went wrong.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);

      const mockPromise = Promise.reject(mockJsonPromise); 
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
      jest.spyOn(global, 'alert').mockImplementation(() => {});


      await fetchAllMarkers(store);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('./api/locations');

      process.nextTick(() => {
        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith(`Something went wrong.`);
        global.alert.mockClear();
        done();
      });
    });
  });
  describe('UPDATE', () => {
    let mockUpdateRequest, mockUpdatePayload;
    beforeEach(() => {
      mockUpdatePayload = {
        "id": "e4ae2a63-44d3-4bbb-8168-c6741932a08a",
        "name": "Work",
        "fullName": "Berlin, Germany",
        "location": {
          "lat": 52.52000659999999,
          "lng": 13.404954
        }
      };
      mockUpdateRequest = {
        body: JSON.stringify(mockUpdatePayload),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT'
      };
    });
    it('UPDATE request to server', async (done) => {
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await updateMarker(store, mockUpdatePayload);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch.mock.calls[0][0]).toBe('./api/locations');
      expect(global.fetch.mock.calls[0][1]).toStrictEqual(mockUpdateRequest);
      process.nextTick(() => {
        done();
      });
    });
    it('catch response.result false from server', async (done) => {
      const mockFailedResponse = {
        result: false,
        response: `Unable to find location.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);
      const mockPromise = Promise.resolve({
        json: () => mockJsonPromise
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await updateMarker(store, mockUpdatePayload);
      const fetch = global.fetch.mock.calls[0];
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(fetch[0]).toBe('./api/locations');
      expect(fetch[1]).toStrictEqual(mockUpdateRequest);

      process.nextTick((res) => {
        expect(store.setState).toHaveBeenCalledWith({
          error: `Unable to find location.`,
        });
        done();
      });
    });
    it('catch failed API calls', async (done) => {
      const mockFailedResponse = {
        result: false,
        response: `Something went wrong.`,
      };
      const mockJsonPromise = Promise.resolve(mockFailedResponse);

      const mockPromise = Promise.reject(mockJsonPromise); 
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
      jest.spyOn(global, 'alert').mockImplementation(() => {});

      await updateMarker(store, mockUpdatePayload);
      const fetch = global.fetch.mock.calls[0];
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(fetch[0]).toBe('./api/locations');
      expect(fetch[1]).toStrictEqual(mockUpdateRequest);

      process.nextTick(() => {
        expect(global.alert).toHaveBeenCalledWith(`Something went wrong.`);
        global.alert.mockClear();
        done();
      });
    });
  });

});