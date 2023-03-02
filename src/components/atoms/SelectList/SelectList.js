import React from 'react';
import { SelectListStyled } from './SelectList.style';
function SelectList({ items, onChange, value, ref }) {
  // Controleld Select
  return value !== undefined ? (
    <SelectListStyled onChange={onChange} value={value}>
      {items.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </SelectListStyled>
  ) : (
    // SelSelectListStyled with useRef
    <SelectListStyled ref={ref}>
      {items.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </SelectListStyled>
  );
}

export default SelectList;
