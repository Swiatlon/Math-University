export const CircleAndSector = {
  getSectorRadius: function (field, alfa, diameter) {
    if (field && alfa) return Math.sqrt((360 * field) / alfa);

    if (diameter) return diameter / 2;
    else return false;
  },

  getSectorAlfaAngle: function (radius, beta, diameter, field) {
    if (beta) return 360 - beta;

    if (!radius) return false;

    if (field) return (360 * field) / radius ** 2;

    if (diameter) return (diameter * 360) / (2 * radius);
    else return false;
  },

  getSectorField: function (alfa, radius, diameter) {
    if (!alfa) return false;

    if (radius) return (alfa / 360) * radius ** 2;

    if (diameter) return (360 * diameter) / alfa / 2;
  },

  getDiamenter: function (radius, alfa) {
    if (!radius || !alfa) return false;

    return (alfa / 360) * 2 * radius;
  },
};
