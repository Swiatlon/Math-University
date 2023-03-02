import React from 'react';

function Units({ unitRef }) {
  return (
    <select ref={unitRef}>
      <option value="mm">MM</option>
      <option value="cm">CM</option>
      <option value="dm">DM</option>
      <option value="m">M</option>
      <option value="km">KM</option>
    </select>
  );
}

export default Units;
