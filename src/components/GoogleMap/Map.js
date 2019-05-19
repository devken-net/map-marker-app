import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useGlobal from "../../store";
import './Map.css';

function Map() {
  const [globalState] = useGlobal();
  const { markers } = globalState;
  const initMap = (google) => {
    // The location of Germany
    const center = {
      lat: 51.107791,
      lng: 10.05524,
    };
    // The map, centered at Germany
    const map = new google.maps.Map(
      document.getElementById('map'), { zoom: 6.5, center },
    );
    return map;
  };

  /**
   * Add marker to the map.
   * @param {Object} location contains { lat, lng }
   * @param {Object} map initiated map
   * @param {Object} google google global variable
   */
  const addMarker = (location, map, google) => {
    const marker = new google.maps.Marker({
      position: location,
      map,
    });
    return marker;
  };

  // Create markers every time markers state changed.
  useEffect(() => {
    const { google } = window;
    // istanbul ignore else
    if (google) {
      const map = initMap(google);
      if (markers.length) {
        markers.map(({location}) => addMarker(location, map, google));
      }
    }
  }, [markers]);

  return (
    <div id="map" className="map">
      <h1>Your map will be display here.</h1>
    </div>
  );
}
Map.defaultProps = {
  markers: [],
};
Map.propTypes = {
  markers: PropTypes.array.isRequired,
};

export { Map };
