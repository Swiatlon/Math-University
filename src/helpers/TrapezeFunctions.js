export const TrapezeFunctions = {
  getSideFromCircuit: function (firstSide, secondSide, thirdSide, circuit) {
    if (!firstSide || !secondSide || !thirdSide || !circuit) return false;
    return circuit - firstSide - secondSide - thirdSide;
  },
};
