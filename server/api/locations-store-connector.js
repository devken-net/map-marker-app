const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const uuidv4 = require('uuid/v4');
/**
 * For now we will store our data a json file.
 * TODO: Save location data to a DB.
 */
const STORE = path.join(__dirname, '../store', 'locations.json');

const addLocation = (payload) => {
  const locations = loadLocations();
  const duplicateLocation = locations.find((location) => 
    location.name === payload.name);
  let result = false;

  if (!duplicateLocation) {
    locations.push({
        id: uuidv4(),
        ...payload
    })
    saveLocation(locations);
    console.log(chalk.green.inverse(`${payload.name} has been added!`));
    result = true;
  } else {
    console.log(chalk.red.inverse(`${payload.name} is already added!`));
  }

  return generateResponse(result, loadLocations());
}

const deleteLocation = (id) => {
  const locations = loadLocations();
  const locationsToKeep = locations.filter((location) => location.id !== id);
  let result = false;

  if (locations.length > locationsToKeep.length) {
    console.log(chalk.green.inverse(`Location ${id} removed!`))
    saveLocation(locationsToKeep);
    result = true;
  } else {
    console.log(chalk.red.inverse(`No location ${id} found!`))
  }

  return generateResponse(result, loadLocations())
}

const editLocation = (payload) => {
  const locations = loadLocations();
  const locationIndex = locations.findIndex((location) => location.id === payload.id);
  let result = false;

  if (locationIndex > -1) {
    locations[locationIndex].name = payload.name;
    console.log(chalk.green.inverse(`Location ${locations} updated!`))
    saveLocation(locations);
    result = true;
  } else {
    console.log(chalk.red.inverse(`No location ${payload.id} found!`))
  }

  return generateResponse(result, loadLocations())
}

const getLocations = () => {
  return generateResponse(true, loadLocations())
}

const loadLocations = () => {
  try {
    const dataBuffer = fs.readFileSync(STORE);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

const saveLocation = (locations) => {
  const dataJSON = JSON.stringify(locations);
  fs.writeFileSync(STORE, dataJSON);
  
}

/**
 * Response Formatter
 * @param {Boolean} result 
 * @param {Object/Array} payload 
 */
const generateResponse = (result, payload) => {
  return {
      result,
      response: payload
  }
};

module.exports = {
  addLocation,
  deleteLocation,
  editLocation,
  getLocations,
}