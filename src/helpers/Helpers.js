import React from 'react';
// OVERALL

export function transformToDecIfNeeded(number, decimals) {
  if (typeof number != 'number') return number;
  if (number.toString().includes('.')) return Number(number.toFixed(decimals ?? 0));
  else return number;
}

export function countUndefined(array) {
  return array.reduce((count, element) => {
    if (typeof element === 'undefined' || element === false) {
      count++;
    }
    return count;
  }, 0);
}

// DEG + RADIANS
export function degToRad(degrees) {
  if (typeof degrees !== 'number' || Number.isNaN(degrees)) return false;
  var radians = degrees * (Math.PI / 180);
  return radians;
}

export function radToDeg(radians) {
  if (typeof radians !== 'number' || Number.isNaN(radians)) return false;
  var degrees = radians * (180 / Math.PI);
  return Math.round(degrees);
}

// INPUTS + IMAGES

export const creatingInputsOnText = (event, arrayWithItems, arrayWithReferences, setter) => {
  if (event.target.localName === 'tspan') {
    const { offsetX, offsetY } = event.nativeEvent;
    const x = offsetX - 15;
    const y = offsetY - 15;
    const text = { value: event.target.innerHTML, x, y, placeholder: event.target.innerHTML };
    const arrayContainThisItem = arrayWithItems.some((item) => {
      return text.value === item.value;
    });
    if (!arrayContainThisItem) {
      const newInputRef = React.createRef();
      arrayWithReferences.current.push(newInputRef);
      setter([...arrayWithItems, text]);
    }
  }
};
