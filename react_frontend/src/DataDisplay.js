// DataDisplay.js
import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <div className="data-display">
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplay;
