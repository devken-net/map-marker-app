const headers = { 'Content-Type': 'application/json' };
const addMarker = (store, address) => {
  fetch(`./api/locations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({address}),
    }).then((response) => response.json())
    .then(({ result, response }) => {
      if(result) {
        store.setState({ 
          markers: response, 
          error: ''
        });
      } else {
        store.setState({ 
          error: response
        });
      }
    })
    .catch((error) => {
      alert('Unable to find location.');
    });
}

const deleteMarker = (store, id) => {
  const queryParam = encodeURI(id.toString().trim());
  fetch(`./api/locations?id=${queryParam}`, {
      method: 'DELETE',
    }).then((response) => response.json())
    .then(({ result, response }) => {
      if(result) {
        store.setState({ 
          markers: response, 
        });
      } else {
        store.setState({ 
          error: response
        });
      }
    })
    .catch((error) => {
      alert('Something went wrong.');
    });
}

const fetchAllMarkers = (store) => {
  fetch('./api/locations').then((response) => response.json())
    .then(({ result, response }) => {
      if(result) {
        store.setState({
          markers: response, 
        });
      } else {
        store.setState({
          error: response
        });
      }
    })
    .catch((error) => {
      alert('Something went wrong.');
    });
}

const updateMarker = (store, payload) => {
  fetch(`./api/locations`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    }).then((response) => response.json())
    .then(({ result, response }) => {
      if(result) {
        store.setState({ 
          markers: response, 
        });
      } else {
        store.setState({ 
          error: response
        });
      }
    })
    .catch((error) => {
      alert('Something went wrong.');
    });
}

export {
  addMarker,
  deleteMarker,
  fetchAllMarkers,
  updateMarker,
}