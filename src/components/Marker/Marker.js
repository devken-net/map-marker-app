import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useGlobal from "../../store";
import './Marker.css';

const Marker = ({ data }) => {
  const globalActions = useGlobal()[1];
  const [isEdit, setEdit] = useState(false);
  const [tempName, setName] = useState('');

  useEffect(() => {
    setName(data.name);

    // TODO: Fix cleanup
    return () => { console.log("componentWillUnmount"); }
  }, [data]);

  const _handleButtonClick = () => {
    // istanbul ignore else
    if(isEdit) {
      globalActions.updateMarker({ ...data, name: tempName });
    }
    setEdit(!isEdit);
  }

  // Display non if data is empty
  if (!data.id) {
    return null;
  }

  return (
    <div className="card">
      <div className="mdl-card mdl-shadow--2dp">
        <div className="card__title mdl-card__title">
          { isEdit ? (
            <div className="card__title-edit-input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" 
                type="text"
                value={ tempName }
                onChange={ (e) => setName(e.target.value) }
                required
                placeholder='Location Name' />
            </div>
          ) : (
            <h2 className="card__title-text mdl-card__title-text">
              {data.name}
            </h2>
          )}
          <div className="card__sub-title">
            {data.fullName}
          </div>
        </div>
        <div className="card__body mdl-card__supporting-text">
          <div className="card__body-row">
            <div className="card__body-col col-left">Latitude</div>
            <div className="card__body-col col-right">{data.location.lat}</div>
          </div>
          <div className="card__body-row">
            <div className="card__body-col col-left">Longtitude</div>
            <div className="card__body-col col-right">{data.location.lng}</div>
          </div>
        </div>
        <div className="card__actions mdl-card__actions mdl-card--border">
          <button id="deleteButton"
            className="card__actions-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onClick={() => globalActions.deleteMarker(data.id)}>
            DELETE
          </button>
          <button id="editButton" 
            className="card__actions-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
            onClick={_handleButtonClick}>
            { isEdit ? 'SAVE' : 'EDIT' }
          </button>
        </div>
      </div>

    </div>
  );
}
Marker.defaultProps = {
  data: {},
};
Marker.propTypes = {
  data: PropTypes.object.isRequired,
};

export { Marker };
