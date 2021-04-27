import * as C from "./constants";
import * as O from "./orbit";

export const Saturn: [O.Orbit, O.Orbit, O.Correction] = [
  {
    semimajorAxis: 9.537507032 * C.AU,
    eccentricity: 0.0541,
    inclination: 2.48466 * C.DEGREE,
    ascendingLongitude: 113.7154 * C.DEGREE,
    perihelion: 92.86136 * C.DEGREE,
    meanLongitude: 50.07571329,
  },
  {
    semimajorAxis: -0.00003065,
    eccentricity: -0.00032044,
    inclination: 0.00451969,
    ascendingLongitude: -0.25015002,
    perihelion: 0.54179478,
    meanLongitude: 1222.11494724,
  },
  [0.00025899, -0.13434469, 0.87320147, 38.35125],
];

export const Earth: O.Orbit = {
  // https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
  semimajorAxis: 1.00000011 * C.AU,
  eccentricity: 0.01671022,
  inclination: 0.00005 * C.DEGREE,
  ascendingLongitude: -11.26064 * C.DEGREE,
  perihelion: (102.94719 - -11.26064) * C.DEGREE,
  meanLongitude: 0,
};
