import React, { useState, useEffect } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ data, onDelete, onSave }) => {
  const [isEdit, setEdit] = useState(false);
  const [tempName, setName] = useState('');

  useEffect(() => {
    setName(data.name);
  }, [data]);

  const _handleButtonClick = (e) => {
    if(isEdit) {
      onSave({ ...data, name: tempName });
    }
    setEdit(!isEdit);
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
          <button 
            className="card__actions-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onClick={() => onDelete(data.id)}>
            DELETE
          </button>
          <button className="card__actions-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
            onClick={_handleButtonClick}>
            { isEdit ? 'SAVE' : 'EDIT' }
          </button>
        </div>
      </div>

    </div>
  );
}
Card.defaultProps = {
  data: {},
};
Card.propTypes = {
  data: PropTypes.object.isRequired,
};

export { Card };
