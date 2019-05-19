import React from 'react';
import useGlobal from "../../store";
import './AddMarker.css';

function AddMarker() {
  const [globalState, globalActions] = useGlobal();
  const { error } = globalState;

  const _handleOnSave = (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    
    globalActions.addMarker(address);
    e.target.address.value = '';
  }

  return(
    <form onSubmit={_handleOnSave}>
      <div className="add-marker__input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input id="addressInput"
          className="mdl-textfield__input" 
          type="text"
          name="address"
          placeholder='Enter your address here.' />
          <span className="add-marker__input-error">{error}</span>
      </div>
      <button
        className="map-button mdl-button mdl-js-button
        mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
        type="submit">
        Add Map
      </button>
    </form>
  );
}

export { AddMarker };