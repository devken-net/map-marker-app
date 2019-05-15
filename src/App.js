import React, { 
useEffect,
useRef,
useState
} from 'react';

import { AddMarker } from './components/AddMarker';
import { Map } from './components/GoogleMap';
import { Markers } from './components/Markers';
import { MarkerForm } from './components/MarkerForm';
import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min.js';

import './App.css';

function App() {
  const [markers, setMarkers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const markerFormRef = useRef();

  useEffect(() => {
    // Fetch all locations. This could be assign in separate method.
    fetch('./api/locations').then((response) => response.json())
      .then(({ response }) => {
        if(response) {
          setMarkers(response);
        }
      });
  }, []);

  // TODO: Move all api calls into separate file for cleaner code.
  const addMarker = (address) => {
    fetch(`./api/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address}),
      }).then((response) => response.json())
      .then((res) => {
        if(res.result) {
          setMarkers(res.response);
          setErrorMsg('');
        } else {
          setErrorMsg(res.response);
        }
      })
      .catch((error) => {
        alert('Unable to find location.');
        console.error(error);
      });
  }

  const deleteMarker = (id) => {
    const queryParam = encodeURI(id.trim());
    fetch(`./api/location?id=${queryParam}`, {
        method: 'DELETE',
      }).then((response) => response.json())
      .then(({ response }) => {
        if(response) {
          setMarkers(response);
        }
      })
      .catch((error) => {
        alert('Something went wrong.');
        console.error(error);
      });
  }

  const updateMarker = (payload) => {
    fetch(`./api/location`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((response) => response.json())
      .then(({ response }) => {
        if(response) {
          setMarkers(response);
        }
      })
      .catch((error) => {
        alert('Something went wrong.');
        console.error(error);
      });
  }

  return (
    <div className="container">
      <section className="map-container">
        <Map markers={markers} />
      </section>
      <section className="marker-container">
        <AddMarker error={errorMsg} onAddMarker={addMarker} />
        <hr />
        <Markers markers={markers} 
          onDeleteMark={deleteMarker} 
          onUpdateMarker={updateMarker} />
      </section>
      <MarkerForm ref={markerFormRef}/>
    </div>
  );
}

export { App };
