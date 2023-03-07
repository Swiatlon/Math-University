export default class TriangleFunctions {
  static gettingThirdSide({ firstSide, secondSide, angleBettwen, circuit }) {
    if (firstSide && secondSide) {
      if (circuit) return this.sideFromCircuit(firstSide, secondSide, circuit);
      else return this.cosineLaw(firstSide, secondSide, angleBettwen);
    }
  }

  static sideFromCircuit(secondSide, thirdSide, circuit) {
    return circuit - (secondSide + thirdSide);
  }

  static sideFromField(field, sideHeight, sideAngle, secondSide, secondSideAngle, thirdSide, thirdSideAngle, r, R) {
    // a => h(a) => alfa  || b => h(b) => beta || c => h(c) => gamma
    if (field) {
      if (sideHeight) return (2 * field) / sideHeight;
      else if (sideAngle && secondSideAngle && thirdSideAngle)
        return Math.sqrt((2 * field * Math.sin(sideAngle)) / (Math.sin(secondSideAngle) * Math.sin(thirdSideAngle)));
      else if (secondSide && thirdSide) {
        if (r) return (2 * field) / r - thirdSide - secondSide;
        else if (R) return (field * (4 * R)) / (secondSide * thirdSide);
        else if (thirdSideAngle || secondSideAngle)
          return (
            (2 * field) / secondSide / Math.sin(thirdSideAngle) || (2 * field) / thirdSide / Math.sin(secondSideAngle)
          );
      }
    }
  }

  static sinusLaw(sideWeLookingForAngle, secondSide, secondSideAngle, thirdSide, thirdSideAngle, radius) {
    // side a => angle  alfa  || side b =>  angle beta || side c => angle gamma
    if (sideWeLookingForAngle) {
      if (radius) return 2 * radius * Math.sin(sideWeLookingForAngle);
      else {
        if (secondSide && secondSideAngle)
          return (secondSide / Math.sin(secondSideAngle)) * Math.sin(sideWeLookingForAngle);
        else if (thirdSide && thirdSideAngle)
          return (thirdSide / Math.sin(thirdSideAngle)) * Math.sin(sideWeLookingForAngle);
      }
    }
  }

  static cosineLaw(secondSide, thirdSide, angleBettwen) {
    return Math.sqrt(
      Math.pow(secondSide, 2) + Math.pow(thirdSide, 2) - 2 * secondSide * thirdSide * Math.cos(angleBettwen)
    );
  }

  static angleFromTwoAngles(firstAngle, secondAngle) {
    // 3.14... => 180 degree
    if (firstAngle && secondAngle && firstAngle + secondAngle < 3.14159265359) {
      return 3.14159265359 - firstAngle - secondAngle;
    }
  }

  static angleFromSinusLaw(firstSide, secondSide, secondSideAngle, thirdSide, thirdSideAngle) {
    if (firstSide && secondSide && secondSideAngle) {
      return (firstSide * secondSideAngle) / secondSide;
    } else if (firstSide && thirdSide && thirdSideAngle) {
      return (firstSide * thirdSideAngle) / thirdSide;
    }
  }

  static angleFromCosinusLaw(firstSide, secondSide, thirdSide) {
    if (firstSide && secondSide && thirdSide) {
      return (firstSide ** 2 - secondSide ** 2 - thirdSide ** 2) / (-2 * secondSide * thirdSide);
    }
  }

  static getHeight(field, side) {
    if (field && side) {
      return (2 * field) / side;
    }
  }

  static gettingSideWithAllFunctions(
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
      TriangleFunctions.sideFromCircuit(secondSide, thirdSide, circuit) ||
      TriangleFunctions.cosineLaw(secondSide, thirdSide, firstSideAngle) ||
      TriangleFunctions.sinusLaw(firstSideAngle, secondSide, secondSideAngle, thirdSide, thirdSideAngle, R) ||
      TriangleFunctions.sideFromField(
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
    return result;
  }

  static gettingAngleAllFunctions(firstSide, secondSide, thirdSide, secondSideAngle, thirdSideAngle) {
    const result =
      this.angleFromTwoAngles(secondSideAngle, thirdSideAngle) ||
      this.angleFromSinusLaw(firstSide, secondSide, secondSideAngle, thirdSide, thirdSideAngle) ||
      this.angleFromCosinusLaw(firstSide, secondSide, thirdSide);
    return result;
  }

  static gettingCircumscribedRadius(
    side,
    firstSideAngle,
    secondSide,
    secondSideAngle,
    thirdSide,
    thirdSideAngle,
    field
  ) {
    if (field) {
      if (side && secondSide && thirdSide) return (side * secondSide * thirdSide) / field / 4;
      else if (firstSideAngle && secondSideAngle && thirdSideAngle) {
        return Math.sqrt(field / 2 / (firstSideAngle * secondSideAngle * thirdSideAngle));
      }
    } else if (side && firstSideAngle) {
      return side / firstSideAngle / 2;
    }
  }

  static gettingInscribedRadius(field, firstSide, secondSide, thirdSide) {
    if (field && firstSide && secondSide && thirdSide) {
      return field / ((firstSide + secondSide + thirdSide) / 2);
    }
  }

  static gettingCircuit(firstSide, secondSide, thirdSide) {
    return firstSide + secondSide + thirdSide;
  }

  static gettingField(
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
    if ((firstSide, secondSide, thirdSide)) {
      let p = (firstSide + secondSide + thirdSide) / 2;
      return Math.sqrt(p * (p - firstSide) * (p - secondSide) * (p - thirdSide));
    } else if (firstSideAngle && secondSideAngle && thirdSideAngle) {
      if (firstSide) return ((firstSide ** 2 / 2) * (secondSideAngle * thirdSideAngle)) / firstSideAngle;
      else if (secondSide) return ((secondSide ** 2 / 2) * (firstSideAngle * thirdSideAngle)) / secondSideAngle;
      else if (thirdSide) return ((thirdSide ** 2 / 2) * (secondSideAngle * firstSideAngle)) / thirdSideAngle;
      else if (R) return 2 * R ** 2 * firstSideAngle * secondSideAngle * thirdSideAngle;
    } else if (firstSide) {
      if (firstSideHeight) return (firstSide * firstSideHeight) / 2;
      else if (secondSide && thirdSideAngle) return (firstSide * secondSide * thirdSideAngle) / 2;
    } else if (secondSide) {
      if (secondSideHeight) return (secondSide * secondSideHeight) / 2;
      else if (thirdSide && firstSideAngle) return (thirdSide * secondSide * firstSideAngle) / 2;
    } else if (thirdSide) {
      if (thirdSideHeight) return (thirdSide * thirdSideHeight) / 2;
      else if (firstSide && secondSideAngle) return (thirdSide * firstSide * secondSideAngle) / 2;
    }
  }
}
