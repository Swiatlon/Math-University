import { transformToDecIfNeeded } from './Helpers';
const TriangleFunctions = {
  getSideFromCircuit: function (secondSide, thirdSide, circuit) {
    if (!secondSide || !thirdSide || !circuit) return false;
    return circuit - (secondSide + thirdSide);
  },

  getSideFromField: function (
    field,
    sideHeight,
    sideAngle,
    secondSide,
    secondSideAngle,
    thirdSide,
    thirdSideAngle,
    r,
    R
  ) {
    // a => h(a) => alfa  || b => h(b) => beta || c => h(c) => gamma
    if (!field) return false;

    if (sideHeight) return (2 * field) / sideHeight;

    if (sideAngle && secondSideAngle && thirdSideAngle)
      return Math.sqrt((2 * field * Math.sin(sideAngle)) / (Math.sin(secondSideAngle) * Math.sin(thirdSideAngle)));

    if (!secondSide && !thirdSide) return false;

    if (r) return (2 * field) / r - thirdSide - secondSide;

    if (R) return (field * (4 * R)) / (secondSide * thirdSide);

    if (thirdSideAngle || secondSideAngle)
      return (2 * field) / secondSide / Math.sin(thirdSideAngle) || (2 * field) / thirdSide / Math.sin(secondSideAngle);
  },

  sinusLaw: function (sideWeLookingForAngle, secondSide, secondSideAngle, thirdSide, thirdSideAngle, radius) {
    if (!sideWeLookingForAngle) return false;

    if (radius) return 2 * radius * Math.sin(sideWeLookingForAngle);

    if (secondSide && secondSideAngle)
      return (secondSide / Math.sin(secondSideAngle)) * Math.sin(sideWeLookingForAngle);

    if (thirdSide && thirdSideAngle) return (thirdSide / Math.sin(thirdSideAngle)) * Math.sin(sideWeLookingForAngle);
    else return false;
  },

  getAngleFromSinusLaw: function (firstSide, secondSide, secondSideAngle, thirdSide, thirdSideAngle, R) {
    if (!firstSide) return false;

    if (R) return Math.asin(firstSide / (2 * R));

    if (secondSide && secondSideAngle) return Math.asin((firstSide * Math.sin(secondSideAngle)) / secondSide);

    if (thirdSide && thirdSideAngle) return Math.asin((firstSide * Math.sin(thirdSideAngle)) / thirdSide);
    else return false;
  },

  cosineLaw: function (secondSide, thirdSide, angleBettwen) {
    if (!secondSide || !thirdSide || !angleBettwen) return false;
    return Math.sqrt(
      Math.pow(secondSide, 2) + Math.pow(thirdSide, 2) - 2 * secondSide * thirdSide * Math.cos(angleBettwen)
    );
  },

  getAngleFromCosinusLaw: function (firstSide, secondSide, thirdSide) {
    if (!firstSide || !secondSide || !thirdSide) return false;
    return Math.acos((firstSide ** 2 - secondSide ** 2 - thirdSide ** 2) / (-2 * secondSide * thirdSide));
  },

  getAngleFromTwoAngles: function (firstAngle, secondAngle) {
    if (!firstAngle || !secondAngle || firstAngle + secondAngle > Math.PI) return false;
    return Math.PI - firstAngle - secondAngle;
  },

  getHeight: function (field, side) {
    if (!field && !side) return false;
    return (2 * field) / side;
  },

  getCircumscribedRadius: function (
    side,
    firstSideAngle,
    secondSide,
    secondSideAngle,
    thirdSide,
    thirdSideAngle,
    field
  ) {
    if (field) {
      if (side && secondSide && thirdSide) return (side * secondSide * thirdSide) / (field * 4);

      if (firstSideAngle && secondSideAngle && thirdSideAngle)
        return Math.sqrt(field / 2 / (firstSideAngle * secondSideAngle * thirdSideAngle));
    }

    if (side && firstSideAngle) {
      return side / Math.sin(firstSideAngle) / 2;
    }

    if (secondSide && secondSideAngle) {
      return secondSide / (Math.sin(secondSideAngle) * 2);
    }

    if (thirdSide && thirdSideAngle) {
      return thirdSide / (Math.sin(thirdSideAngle) * 2);
    } else return false;
  },

  getInscribedRadius: function (field, firstSide, secondSide, thirdSide) {
    if (!field || !firstSide || !secondSide || !thirdSide) return false;
    return field / ((firstSide + secondSide + thirdSide) / 2);
  },

  getCircuit: function (firstSide, secondSide, thirdSide) {
    if (!firstSide || !secondSide || !thirdSide) return false;
    return firstSide + secondSide + thirdSide;
  },

  getField: function (
    firstSide,
    firstSideHeight,
    firstSideAngle,
    secondSide,
    secondSideHeight,
    secondSideAngle,
    thirdSide,
    thirdSideHeight,
    thirdSideAngle,
    r,
    R
  ) {
    if (firstSide && secondSide && thirdSide) {
      let p = (firstSide + secondSide + thirdSide) / 2;
      return Math.sqrt(p * (p - firstSide) * (p - secondSide) * (p - thirdSide));
    }

    if (firstSideAngle && secondSideAngle && thirdSideAngle) {
      if (firstSide) return ((firstSide ** 2 / 2) * (secondSideAngle * thirdSideAngle)) / firstSideAngle;

      if (secondSide) return ((secondSide ** 2 / 2) * (firstSideAngle * thirdSideAngle)) / secondSideAngle;

      if (thirdSide) return ((thirdSide ** 2 / 2) * (secondSideAngle * firstSideAngle)) / thirdSideAngle;

      if (R) return 2 * R ** 2 * firstSideAngle * secondSideAngle * thirdSideAngle;
    }

    if (firstSide) {
      if (firstSideHeight) return (firstSide * firstSideHeight) / 2;
      if (secondSide && thirdSideAngle) return (firstSide * secondSide * thirdSideAngle) / 2;
    }

    if (secondSide) {
      if (secondSideHeight) return (secondSide * secondSideHeight) / 2;
      if (thirdSide && firstSideAngle) return (thirdSide * secondSide * firstSideAngle) / 2;
    }

    if (thirdSide) {
      if (thirdSideHeight) return (thirdSide * thirdSideHeight) / 2;
      if (firstSide && secondSideAngle) return (thirdSide * firstSide * secondSideAngle) / 2;
    } else return false;
  },

  gettingSideWithAllFunctions: function (
    firstSideAngle,
    firstSideHeight,
    secondSide,
    secondSideAngle,
    thirdSide,
    thirdSideAngle,
    circuit,
    field,
    r,
    R
  ) {
    const result =
      this.getSideFromCircuit(secondSide, thirdSide, circuit) ||
      this.cosineLaw(secondSide, thirdSide, firstSideAngle) ||
      this.sinusLaw(firstSideAngle, secondSide, secondSideAngle, thirdSide, thirdSideAngle, R) ||
      this.getSideFromField(
        field,
        firstSideHeight,
        firstSideAngle,
        secondSide,
        secondSideAngle,
        thirdSide,
        thirdSideAngle,
        r,
        R
      );
    return transformToDecIfNeeded(result, 3);
  },

  gettingAngleAllFunctions: function (firstSide, secondSide, thirdSide, secondSideAngle, thirdSideAngle, R) {
    const result =
      this.getAngleFromTwoAngles(secondSideAngle, thirdSideAngle) ||
      this.getAngleFromSinusLaw(firstSide, secondSide, secondSideAngle, thirdSide, thirdSideAngle, R) ||
      this.getAngleFromCosinusLaw(firstSide, secondSide, thirdSide);
    return result;
  },
};

export default TriangleFunctions;
