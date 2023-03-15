import React from 'react';

function Units({ unitRef }) {
  return (
    <select ref={unitRef}>
      <option value="mm">mm</option>
      <option value="cm">cm</option>
      <option value="dm">dm</option>
      <option value="m">m</option>
      <option value="km">km</option>
    </select>
  );
}

export default Units;
