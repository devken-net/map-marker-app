import React, { useEffect } from 'react';

// import components
import { AddMarker } from './components/AddMarker';
import { Map } from './components/GoogleMap';
import { Markers } from './components/Markers';
import useGlobal from "./store";

// import styles
import 'material-design-lite/material.min.css';
import 'material-design-lite/material.min.js';
import './App.css';

function App() {
  const globalActions = useGlobal()[1];

  useEffect(() => {
    globalActions.fetchAllMarkers();
  }, [globalActions]);

  return (
    <div className="container">
      <section className="map-container">
        <Map />
      </section>
      <section className="marker-container">
        <AddMarker />
        <hr />
        <Markers />
      </section>
    </div>
  );
}

export { App };
