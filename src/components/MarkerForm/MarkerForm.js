import React, {
  forwardRef,
  useEffect,
  useImperativeHandle, 
  useState,
} from 'react';
import dialogPolyfill from 'dialog-polyfill'

const MarkerForm = forwardRef((props, ref) => {
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    if(!dialog) {
      setDialog(document.querySelector('#Dialog'));
    } else {
      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
    }
  },[dialog]);

  useImperativeHandle(ref, () => ({
    getAlert() {
      alert("getAlert from Child");
    },
    open() {
      dialog.showModal();
    }
  }));


  return(
    <dialog id="Dialog" className="mdl-dialog">
      <div className="mdl-dialog__content">
        <p>
          Allow this site to collect usage data to improve your experience?
        </p>
      </div>
      <div className="mdl-dialog__actions mdl-dialog__actions--full-width">
        <button type="button" className="mdl-button">Agree</button>
        <button type="button" className="mdl-button close">Disagree</button>
      </div>
    </dialog>
  );

});

export { MarkerForm };