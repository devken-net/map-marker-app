const express = require('express');
const bodyParser = require('body-parser');
const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');
const { 
  addLocation,
  deleteLocation,
  editLocation,
  getLocations,
} = require('./api/locations');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.disable('etag'); // To temporary disable 304 return.

app.get('/api/locations*', (req, res) => {
  getLocations((response) => {
    res.send(response);
  });
});

app.delete('/api/location*', [
  check('id').isUUID(4),
  sanitize('id').toString().trim().escape(),
], (req, res) => {
  const { id } = req.query;

  deleteLocation(id, (response) => {
    res.send(response);
  });
});

app.post('/api/location*', [
  check('name').isString(),
  sanitize('name').toString().trim().escape(),
], (req, res) => {
  const { address } = req.body;

  addLocation(address, (response) => {
    res.send(response);
  });
});

app.put('/api/location*', [
  check('id').isUUID(4),
  check('name').isString(),
  check('fullName').isString(),
  check('location.*.lat').isFloat(),
  check('location.*.lng').isFloat(),
  sanitize('id').toString().trim().escape(),
  sanitize('name').toString().trim().escape(),
  sanitize('fullName').toString().trim().escape(),
  sanitize('location.*.lat').toFloat().trim().escape(),
  sanitize('location.*.lat').toFloat().trim().escape(),
], (req, res) => {
  editLocation(req.body, (response) => {
    res.send(response);
  });
});

console.log('Listening at PORT: ', process.env.API_PORT);

app.listen(process.env.API_PORT || 3001);