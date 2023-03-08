import React, { forwardRef } from 'react';
import { DynamicInputBox } from './DynamicInputForImage.style';

const DynamicInputForImage = forwardRef(({ x, y, value, placeholder }, ref) => {
  function handleInputChanges(event) {
    const regexp = /^\d{0,3}(\.\d{0,6})?$/;
    const inputValue = event.target.value;
    if (regexp.test(inputValue)) {
      ref.current.value = inputValue;
    } else {
      ref.current.value = ref.current.value.replace(regexp, '');
    }
  }
  return (
    <DynamicInputBox>
      <input placeholder={placeholder} type="text" ref={ref} onChange={handleInputChanges} x={x} y={y} maxLength={9} />
    </DynamicInputBox>
  );
});
export default DynamicInputForImage;
