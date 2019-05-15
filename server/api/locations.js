// TODO: Get geocode adapter into env variable for easier configuration.
// const geocode = require('./mapbox-api-adapter');
const geocode = require('./google-api-adapter');
const store = require('./locations-store-connector');


const addLocation = (address, callback) => {
  geocode(address, (res) => {
    let response;
    if(res.result) {
      response = store.addLocation(res.response);
    } else {
      response = {
        result: false,
        response: 'Unable to find address.'
      };
    }
    
    callback(response);
  });
}
const deleteLocation = (id, callback) => {
  const response = store.deleteLocation(id);
  callback(response);
}
const editLocation = (payload, callback) => {
  const response = store.editLocation(payload);
  callback(response);
}
const getLocations = (callback) => {
  const response = store.getLocations();
  callback(response);
}

module.exports = { 
  addLocation ,
  deleteLocation,
  editLocation,
  getLocations,
};