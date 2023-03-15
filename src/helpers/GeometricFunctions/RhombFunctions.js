import { radToDeg } from 'helpers/Helpers';
export const RhombFunctions = {
  getCircuit: function (side) {
    if (!side) return false;
    return 4 * side;
  },

  getField: function (d1, d2, side, height, alfa) {
    if (d1 && d2) return (d1 * d2) / 2;

    if (!side) return false;

    if (height) return side * height;

    if (alfa) return side ** 2 * Math.sin(alfa);
    else return false;
  },

  getSide: function (field, height, alfa, d1, d2, circuit) {
    if (d1 && d2) return Math.sqrt(Math.pow(d1 / 2) + Math.pow(d2 / 2));

    if (circuit) return circuit / 4;

    if (!field) return false;

    if (height) return field / height;

    if (alfa) return Math.sqrt(field / Math.sin(alfa));
    else return false;
  },

  getDiagonal(field, secondDiagonal, side) {
    if (!secondDiagonal) return false;

    if (field) return (2 * field) / secondDiagonal;

    if (side) return Math.sqrt(Math.pow(side) - Math.pow(secondDiagonal));
    else return false;
  },

  getHeight: function (side, field, alfa) {
    if (!side) return false;

    if (field) return field / side;

    if (alfa) return Math.sin(alfa) * alfa;
    else return false;
  },

  getAngle: function (side, field, height) {
    if (!side) return false;

    if (field) return radToDeg(Math.asin(field / side ** 2));

    if (height) return radToDeg(Math.asin(height / side));
    else return false;
  },
};
