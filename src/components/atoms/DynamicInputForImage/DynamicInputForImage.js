import React, { forwardRef } from 'react';
import { DynamicInputBox } from './DynamicInputForImage.style';

const DynamicInputForImage = forwardRef(({ x, y, value, placeholder }, ref) => {
  function handleInputChanges(event) {
    const inputValue = event.target.value;
    if (/^[0-9]{0,3}$/.test(inputValue)) {
      ref.current.value = inputValue;
    } else {
      ref.current.value = ref.current.value.replace(/[^0-9]{0,3}/g, '');
    }
  }
  return (
    <DynamicInputBox>
      <input placeholder={placeholder} type="text" ref={ref} onChange={handleInputChanges} x={x} y={y} maxLength={3} />
    </DynamicInputBox>
  );
});
export default DynamicInputForImage;
