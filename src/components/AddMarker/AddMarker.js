import React, { useState } from 'react';
import './AddMarker.css';

function AddMarker({ error, onAddMarker }) {
  const [locationName, setLocationName] = useState('');
  const _handleOnSave = () => {
    onAddMarker(locationName);
    setLocationName('');
  }

  return(
    <div>
      <div className="add-marker__input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input className="mdl-textfield__input" 
          type="text"
          value={ locationName }
          onChange={ (e) => setLocationName(e.target.value) }
          placeholder='Enter your address here.' />
          <span className="add-marker__input-error">{error}</span>
      </div>
      <button onClick={_handleOnSave}
        className="map-button mdl-button mdl-js-button
        mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
        Add Map
      </button>
    </div>
  );
}

export { AddMarker };