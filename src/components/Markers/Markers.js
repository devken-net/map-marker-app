import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from '../Marker';

import './Markers.css';

function Markers({ markers, onDeleteMark, onUpdateMarker }) {
  return (
    <div className="markers">
    {markers.map((mark) => (
      <Marker key={mark.id} data={mark}
        onDelete={onDeleteMark}
        onSave={onUpdateMarker} />
    ))}
    </div>
  );
}
Markers.defaultProps = {
  markers: [],
};
Markers.propTypes = {
  markers: PropTypes.array.isRequired,
};

export { Markers };