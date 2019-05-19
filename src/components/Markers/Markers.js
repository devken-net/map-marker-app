import React from 'react';
import { Marker } from '../Marker';
import useGlobal from "../../store";

import './Markers.css';

function Markers() {
  const [globalState] = useGlobal();
  const { markers } = globalState;

  return (
    <div className="markers">
    {markers.map((mark) => (
      <Marker key={mark.id} data={mark} />
    ))}
    </div>
  );
}

export { Markers };