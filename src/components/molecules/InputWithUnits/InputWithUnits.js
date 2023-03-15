import React from 'react';
import { InputNumberStyled } from './InputWithUnits.style';
import { UnitsBox } from './InputWithUnits.style';
import Units from '../../atoms/Units/Units';
function InputWithUnits({ value, onChange, placeholder, hasNegativeNumbers, onClick, maxLength, unitRef, noUnits }) {
  return (
    <UnitsBox>
      {!noUnits && <Units unitRef={unitRef}></Units>}
      <InputNumberStyled
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onClick={onClick}
        maxLength={maxLength}
      />
    </UnitsBox>
  );
}

export default InputWithUnits;
