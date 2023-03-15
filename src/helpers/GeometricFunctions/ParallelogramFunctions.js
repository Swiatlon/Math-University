import { degToRad } from 'helpers/Helpers';
export const ParallelogramFunctions = {
  getCircuit: function (a, b) {
    if (!a || !b) return false;

    return 2 * a + 2 * b;
  },

  getField: function (a, b, alfa, gamma, height, d1, d2) {
    if (a) {
      if (height) return a * height;

      if (!b || !alfa) return false;

      return a * b * Math.sin(degToRad(alfa));
    }

    if (!d1 || !d2 || !gamma) return false;

    return d1 * d2 * Math.sin(degToRad(gamma));
  },

  getD1: function (a, b, alfa) {
    if (!a || !b || !alfa) return false;

    return Math.sqrt(a ** 2 + 2 * a * b * Math.cos(degToRad(alfa) + b ** 2));
  },

  getD2: function (a, b, alfa) {
    if (!a || !b || !alfa) return false;

    return Math.sqrt(a ** 2 - 2 * a * b * Math.cos(degToRad(alfa) + b ** 2));
  },

  getHeight: function (field, a) {
    if (!a || !field) return false;

    return field / a;
  },

  getFirstSide: function (field, b, alfa, circuit, height) {
    if (field) {
      if (height) return field / height;

      if (b && alfa) return field / b / Math.sin(degToRad(alfa));

      return false;
    }

    if (!circuit || !b) return false;

    return (circuit - 2 * b) / 2;
  },

  getSecondSide: function (field, a, alfa, circuit) {
    if (field) {
      if (a && alfa) return field / a / Math.sin(degToRad(alfa));

      return false;
    }

    if (!circuit || !a) return false;

    return (circuit - 2 * a) / 2;
  },

  getAlfa: function (field, a, b) {
    if (!field || !a || !b) return false;

    return Math.asin(field / a / b);
  },

  getGamma: function (field, d1, d2) {
    if (!field || !d1 || !d2) return false;

    return Math.asin((2 * field) / d1 / d2);
  },
};
