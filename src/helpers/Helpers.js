export function transformToDecIfNeeded(number, decimals) {
  if (!number) return undefined;
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
