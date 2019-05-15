const request = require('request');


// Mapbox API
const MAPBOX_API = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
// TODO: Store this in a vault. No API Key should be committed.
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

/**
 * Generate query string parameter
 * @param {Object} params
 */
const generateQueryParams = (params) => {
  if (!params) return ''; // if no parameter return empty string.

  return Object.entries(params) // convert object to array
    .map((param) => param.map(encodeURIComponent).join('=')) // construct params
    .join('&');
};

/**
 * Generate Google API request URL.
 * @param {String} url
 * @param {Object} params
 */
const generateURL = ({ url, address, params }) =>
  `${url}/${address}.json?${generateQueryParams(params)}`;

/**
 * Get GeoLocation via Google API
 * @param {String} address 
 * @param {Function} callback 
 */
const getGeoLocation = (address, callback) => {
  const params = {
    access_token: MAPBOX_API_KEY,
    limit: 1,
  };
  const url = generateURL({ url: MAPBOX_API, address, params });

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback({
        result: false,
        response: 'Unable to connect to location services!'
      });
    } else if (body.features.length === 0) {
      callback({
        result: false,
        response: 'Unable to find location. Try another search.',
      });
    } else {
      let result = body.features[0];
      const location = {
        lat: result.center[1],
        lng: result.center[0],
      };
      const locationName = result.text;
      const locationFullName = result.place_name;
      const response = {
        name: locationName,
        fullName: locationFullName,
        location,
      }

      callback({
        result: true,
        response,
      });
    }
  });
};

module.exports = getGeoLocation;
