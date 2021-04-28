import * as C from "./constants";
import * as V from "./vector";

export interface Body {
  mass: C.Mass;
}

export interface Orbit {
  body: Body;
  semimajorAxis: C.Length;
  eccentricity: C.Dimensionless;
  inclination: C.Angle;
  ascending: C.Angle;
  periapsis: C.Angle;
  /*
  trueAnomaly: C.Angle;
  meanAnomaly: number;
  eccentricAnomaly: number;
  */
  period: number;
  position(t: C.Time): V.Position;
}

function period(semimajorAxis: number, body: Body) {
  const a = semimajorAxis;
  const mu = body.mass * C.G;
  return C.TAU * Math.sqrt(a ** 3 / mu);
}

export class PlanetaryOrbit implements Orbit {
  get body() {
    return this.params.body;
  }
  get semimajorAxis() {
    return this.params.semimajorAxis;
  }
  get eccentricity() {
    return this.params.eccentricity;
  }
  get inclination() {
    return this.params.inclination;
  }
  get ascending() {
    return this.params.ascending;
  }
  get perihelion() {
    return this.params.perihelion;
  }
  get meanLongitude() {
    return this.params.meanLongitude;
  }

  readonly periapsis: number;
  readonly period: number;

  constructor(readonly params: PlanetaryOrbitParams) {
    params.corrections = params.corrections ?? { s: 0, b: 0, c: 0, f: 0 };
    this.periapsis = this.perihelion - this.ascending;
    this.period = period(this.semimajorAxis * C.AU, this.body);
  }

  position(t: C.Time): V.Position {
    // https://ssd.jpl.nasa.gov/txt/aprx_pos_planets.pdf
    t = t / C.CENTURY;
    // t is in centuries past 2000
    const a = this.semimajorAxis + this.params.deltas.semimajorAxis * t;
    const e = this.eccentricity + this.params.deltas.eccentricity * t;
    const l = this.meanLongitude + this.params.deltas.meanLongitude * t;
    const p = this.perihelion + this.params.deltas.perihelion * t;

    const { b, c, s, f } = this.params.corrections!;

    const M = l - p + b * t ** 2 + c * Math.cos(f * t) + s * Math.sin(f * t);
    const E = EccentricAnomaly(M, e);

    const xp = a * (Math.cos(E) - e);
    const yp = a * (Math.sqrt(1 - e ** 2) * Math.sin(E));

    // 3D
    /*
    const i = this.inclination + this.params.deltas.inclination * t;
    const o = this.ascending + this.params.deltas.ascending * t;
    const w = p - o;
    const cos = Math.cos;
    const sin = Math.sin;
    const x = (cos(w)*cos(o)-sin(w)*sin(o)*cos(i)) * xp + (- sin(w)*cos(o) - cos(w)*sin(o)*cos(i)) * yp;
    const y = (cos(w)*sin(o)+sin(w)*cos(o)*cos(i)) * xp + (- sin(w)*sin(o) - cos(w)*cos(o)*cos(i)) * yp;
    const z = sin(w)* sin(i) * xp + cos(w) * sin(i) * yp;
    */

    return { x: xp * C.AU, y: yp * C.AU };
  }
}

function EccentricAnomaly(meanAnomaly: number, eccentricity: number) {
  const M = meanAnomaly % 180;
  const ed = eccentricity;
  const er = ed / C.RADIAN;
  let E = M + eccentricity * Math.sin(M / C.RADIAN);
  let dE = Infinity;
  do {
    const dM = M - (E - ed * Math.sin(E));
    dE = dM / (1 - er * Math.cos(E));
    E = E + dE;
  } while (Math.abs(dE) > 1e-6);
  return E;
}

export interface PlanetaryOrbitCorrections {
  s: number;
  b: number;
  c: number;
  f: number;
}

export interface PlanetaryOrbitParams {
  body: Body;
  semimajorAxis: C.Length;
  eccentricity: C.Dimensionless;
  inclination: C.Angle;
  meanLongitude: C.Angle;
  perihelion: C.Angle;
  ascending: C.Angle;
  deltas: Omit<
    Omit<Omit<PlanetaryOrbitParams, "deltas">, "corrections">,
    "body"
  >;
  corrections?: PlanetaryOrbitCorrections;
}

export interface StateVector {
  position: V.Position;
  velocity: V.Velocity;
}

export interface Ellipse {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
}

export const toEllipse = (orbit: Orbit): Ellipse => {
  const e = orbit.eccentricity;
  const a = orbit.semimajorAxis * C.AU;
  const b = Math.sqrt((1 - e ** 2) * a ** 2);
  const radiusX = 2 * a;
  const radiusY = 2 * b;
  const c = Math.sqrt(a ** 2 + b ** 2);

  // For now, the rotation is the longitude of perihelion
  const rotation = orbit.periapsis / C.RADIAN;
  // center is at (-c, 0). Rotate it through rotation degrees.
  const { x, y } = V.asXY({ r: -c, t: rotation });
  return { x, y, radiusX, radiusY, rotation };
};
