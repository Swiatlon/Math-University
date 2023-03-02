export function transformToDecIfNeeded(number) {
  if (number.toString().includes('.')) return number.toFixed(5);
  else return number;
}
