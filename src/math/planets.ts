import * as C from "./constants";
import * as O from "./orbit";

export const Sun: O.Body = {
  mass: 1.989e30 * C.KILOGRAM,
};

export const Mercury = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 0.38709843,
  eccentricity: 0.20563661,
  inclination: 7.00559432,
  meanLongitude: 252.25166724,
  perihelion: 77.45771895,
  ascending: 48.33961819,
  deltas: {
    semimajorAxis: 0,
    eccentricity: 0.00002123,
    inclination: -0.00590158,
    meanLongitude: 149472.67486623,
    perihelion: 0.15940013,
    ascending: -0.12214182,
  },
});
export const Venus = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 0.72332102,
  eccentricity: 0.00676399,
  inclination: 3.39777545,
  meanLongitude: 181.9797085,
  perihelion: 131.76755713,
  ascending: 76.67261496,
  deltas: {
    semimajorAxis: -0.00000026,
    eccentricity: -0.00005107,
    inclination: 0.00043494,
    meanLongitude: 58517.8156026,
    perihelion: 0.05679648,
    ascending: -0.27274174,
  },
});
export const Earth = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 1.00000018,
  eccentricity: 0.01673163,
  inclination: -0.00054346,
  meanLongitude: 100.46691572,
  perihelion: 102.93005885,
  ascending: -5.11260389,
  deltas: {
    semimajorAxis: -0.00000003,
    eccentricity: -0.00003661,
    inclination: -0.01337178,
    meanLongitude: 35999.37306329,
    perihelion: 0.3179526,
    ascending: -0.24123856,
  },
});
export const Mars = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 1.52371243,
  eccentricity: 0.09336511,
  inclination: 1.85181869,
  meanLongitude: -4.56813164,
  perihelion: -23.91744784,
  ascending: 49.71320984,
  deltas: {
    semimajorAxis: 0.00000097,
    eccentricity: 0.00009149,
    inclination: -0.00724757,
    meanLongitude: 19140.29934243,
    perihelion: 0.45223625,
    ascending: -0.26852431,
  },
});
export const Jupiter = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 5.20248019,
  eccentricity: 0.0485359,
  inclination: 1.29861416,
  meanLongitude: 34.33479152,
  perihelion: 14.27495244,
  ascending: 100.29282654,
  deltas: {
    semimajorAxis: -0.00002864,
    eccentricity: 0.00018026,
    inclination: -0.00322699,
    meanLongitude: 3034.90371757,
    perihelion: 0.18199196,
    ascending: 0.13024619,
  },
  corrections: { s: -0.00012452, b: 0.0606406, c: -0.35635438, f: 38.35125 },
});
export const Saturn = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 9.54149883,
  eccentricity: 0.05550825,
  inclination: 2.49424102,
  meanLongitude: 50.07571329,
  perihelion: 92.86136063,
  ascending: 113.63998702,
  deltas: {
    semimajorAxis: -0.00003065,
    eccentricity: -0.00032044,
    inclination: 0.00451969,
    meanLongitude: 1222.11494724,
    perihelion: 0.54179478,
    ascending: -0.25015002,
  },
  corrections: { s: 0.00025899, b: -0.13434469, c: 0.87320147, f: 38.35125 },
});
export const Uranus = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 19.18797948,
  eccentricity: 0.0468574,
  inclination: 0.77298127,
  meanLongitude: 314.20276625,
  perihelion: 172.43404441,
  ascending: 73.96250215,
  deltas: {
    semimajorAxis: -0.00020455,
    eccentricity: -0.0000155,
    inclination: -0.00180155,
    meanLongitude: 428.49512595,
    perihelion: 0.09266985,
    ascending: 0.05739699,
  },
  corrections: { s: 0.00058331, b: -0.97731848, c: 0.17689245, f: 7.67025 },
});
export const Neptune = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 30.06952752,
  eccentricity: 0.00895439,
  inclination: 1.7700552,
  meanLongitude: 304.22289287,
  perihelion: 46.68158724,
  ascending: 131.78635853,
  deltas: {
    semimajorAxis: 0.00006447,
    eccentricity: 0.00000818,
    inclination: 0.000224,
    meanLongitude: 218.46515314,
    perihelion: 0.01009938,
    ascending: -0.00606302,
  },
  corrections: { s: -0.00041348, b: 0.68346318, c: -0.10162547, f: 7.67025 },
});
export const Pluto = new O.PlanetaryOrbit({
  body: Sun,
  semimajorAxis: 39.48686035,
  eccentricity: 0.24885238,
  inclination: 17.1410426,
  meanLongitude: 238.96535011,
  perihelion: 224.09702598,
  ascending: 110.30167986,
  deltas: {
    semimajorAxis: 0.00449751,
    eccentricity: 0.00006016,
    inclination: 0.00000501,
    meanLongitude: 145.18042903,
    perihelion: -0.00968827,
    ascending: -0.00809981,
  },
  corrections: { s: -0.01262724, b: 0, c: 0, f: 0 },
});
