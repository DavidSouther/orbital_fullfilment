import * as C from "./constants";
import * as V from "./vector";

export interface Orbit {
  semimajorAxis: C.Length;
  eccentricity: C.Dimensionless;
  inclination: C.Angle;
  ascendingLongitude: C.Angle;
  periapsis: C.Angle;
  meanLongitude: C.Angle;
}

export interface StateVector {
  position: V.Position;
  velocity: V.Velocity;
}

export function StateVectorFromOrbit(orbit: Orbit, t: C.Time): StateVector {
  return { position: V.Origin, velocity: V.VelocityZero };
}

export function OrbitFromStateVector(vector: StateVector): Orbit {
  return {
    semimajorAxis: 1,
    eccentricity: 0,
    inclination: 0,
    ascendingLongitude: 0,
    periapsis: 0,
    meanLongitude: 0,
  };
}

export function Perihelion(orbit: Orbit) {
  if (orbit.eccentricity > 5 * C.DEGREE) {
    // Perihelion is useless?
  }
  return orbit.periapsis + orbit.ascendingLongitude;
}

export function MeanAnomaly(orbit: Orbit): C.Angle {
    return (orbit.meanLongitude - Perihelion(orbit);
}

export function EccentricAnomaly(orbit: Orbit) {
    const M = MeanAnomaly(orbit);
    const ed = orbit.eccentricity;
    const er = ed / C.RADIAN;
    let E = M + orbit.eccentricity * Math.sin(M / C.RADIAN);
    let dE = Infinity;
    do {
        const dM = M - (E - ed * Math.sin(E));
        dE = dM / (1 - er * Math.cos(E));
        E = E + dE;
    } while (dE > 1e-6);
}

export function OrbitPeriod(orbit: Orbit): C.Time {
  return 0;
}

export function positionOnOrbit(orbit: Orbit) {
  return (time: C.Time): V.Position => {
    return V.Origin;
  };
}
