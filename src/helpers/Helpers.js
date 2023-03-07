export function transformToDecIfNeeded(number) {
  if (number.toString().includes('.')) return number.toFixed(5);
  else return number;
}

export function countUndefined(array) {
  return array.reduce((count, element) => {
    if (typeof element === 'undefined') {
      count++;
    }
    return count;
  }, 0);
}