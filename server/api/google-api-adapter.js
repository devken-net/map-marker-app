const request = require('request');

// TODO: Store this in a vault. No API Key should be in the code.
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

/**
 * Generate query string parameter
 * TODO: move this method to utils since this is reusable.
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
const generateGoogleURL = ({ url, params }) =>
  `${url}?${generateQueryParams(params)}`;

/**
 * Get GeoLocation via Google API
 * @param {String} address 
 * @param {Function} callback 
 */
const getGeoLocation = (address, callback) => {
  const params = {
    key: GOOGLE_API_KEY,
    address,
  };
  const url = generateGoogleURL({ url: GOOGLE_API, params });
  console.log('GOOGLE_URL:' ,url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback({
        result: false,
        response: 'Unable to connect to location services!'
      });
    } else if (body.status !== 'OK') {
      callback({
        result: false,
        response: 'Unable to find location. Try another search.',
      });
    } else {
      /* eslint-disable camelcase */
      let result = body.results[0];
      const { location } = result.geometry;
      const locationName = result.address_components[0].long_name;
      const locationFullName = result.formatted_address;
      const response = {
        name: locationName,
        fullName: locationFullName,
        location,
      }
      /* eslint-enable camelcase */

      callback({
        result: true,
        response,
      });
    }
  });
};

module.exports = getGeoLocation;
