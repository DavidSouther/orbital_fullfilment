import * as C from "./constants";
import * as V from "./vector";

export interface Body {
  mass: C.Mass;
}

export interface KeplerOrbitElements {
  a: typeof C.METER; // Semi-major axis
  e: C.Dimensionless; // Eccentricity
  w: typeof C.RADIAN; // Argument of Periapsis
  l: typeof C.RADIAN; // Longitude of Ascending Node
  i: typeof C.RADIAN; // Inclination
  m: typeof C.RADIAN; // Mean Anomaly
}

export interface Orbital {
  body: Body;
  period: number;
  position(t: C.Time): V.Position;
}

function period(semimajorAxis: number, body: Body) {
  const a = semimajorAxis;
  const mu = body.mass * C.G;
  return C.TAU * Math.sqrt(a ** 3 / mu);
}

export class StateOrbit implements Orbital, KeplerOrbitElements {
  period: number;

  readonly a: typeof C.METER; // Semi-major axis
  readonly e: C.Dimensionless; // Eccentricity
  readonly w: typeof C.RADIAN; // Argument of Periapsis
  readonly l: typeof C.RADIAN; // Longitude of Ascending Node
  readonly i: typeof C.RADIAN; // Inclination
  readonly m: typeof C.RADIAN; // Mean Anomaly
  constructor(readonly body: Body, { position, velocity }: StateVector) {
    const mu = body.mass * C.G;
    const momentum = V.asXYZ(V.cross(position, velocity));
    const eccentricity = V.sub(
      V.scale(V.cross(velocity, momentum), 1 / mu),
      V.scale(position, V.len(position))
    );
    const node = { x: -momentum.y, y: momentum.x, z: 0 };
    const dotER = V.dot(position, velocity);
    let v = Math.acos(dotER / (V.len(eccentricity) * V.len(position)));
    if (dotER < 0) v = C.TAU - v;
    const i = Math.acos(momentum.z / V.len(momentum));
    const e = V.asRTP(eccentricity).r;
    const E = 2 * Math.atan(Math.tan(v / 2) / Math.sqrt((1 + e) / (1 - e)));
    let l = Math.acos(node.x / V.asRTP(node).r);
    if (node.y < 0) l = C.TAU - l;
    const w = Math.acos(
      V.dot(node, eccentricity) / (V.asRTP(node).r * V.len(eccentricity))
    );
    const a = 1 / (2 / V.len(position) - V.len(velocity) ** 2 / mu);
    const m = E - e * Math.sin(E);

    this.a = a;
    this.e = e;
    this.w = w;
    this.l = l;
    this.i = i;
    this.m = m;

    this.period = period(a, body);
  }

  position(t: C.Time): V.Position {
    // t is in centuries past 2000
    t = t / C.CENTURY;
    const { a, e, l, w, i } = this;

    const M = l - w;
    const E = EccentricAnomaly(M, e);

    const xp = a * (Math.cos(E) - e);
    const yp = a * (Math.sqrt(1 - e ** 2) * Math.sin(E));

    // 3D
    const cos = Math.cos;
    const sin = Math.sin;
    const x =
      (cos(w) * cos(l) - sin(w) * sin(l) * cos(i)) * xp +
      (-sin(w) * cos(l) - cos(w) * sin(l) * cos(i)) * yp;
    const y =
      (cos(w) * sin(l) + sin(w) * cos(l) * cos(i)) * xp +
      (-sin(w) * sin(l) - cos(w) * cos(l) * cos(i)) * yp;
    const z = sin(w) * sin(i) * xp + cos(w) * sin(i) * yp;

    return { x: x * C.AU, y: y * C.AU, z: z * C.AU };
  }
}

export class PlanetaryOrbit implements Orbital, KeplerOrbitElements {
  get a() {
    return this.semimajorAxis;
  }
  get e() {
    return this.eccentricity;
  }
  get w() {
    return this.periapsis;
  }
  get l() {
    return this.ascending;
  }
  get i() {
    return this.inclination;
  }
  get m() {
    return this.meanLongitude;
  }
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
    const i = this.inclination + this.params.deltas.inclination * t;
    const o = this.ascending + this.params.deltas.ascending * t;
    const w = p - o;
    const cos = Math.cos;
    const sin = Math.sin;
    const x =
      (cos(w) * cos(o) - sin(w) * sin(o) * cos(i)) * xp +
      (-sin(w) * cos(o) - cos(w) * sin(o) * cos(i)) * yp;
    const y =
      (cos(w) * sin(o) + sin(w) * cos(o) * cos(i)) * xp +
      (-sin(w) * sin(o) - cos(w) * cos(o) * cos(i)) * yp;
    const z = sin(w) * sin(i) * xp + cos(w) * sin(i) * yp;

    return { x: x * C.AU, y: y * C.AU, z: z * C.AU };
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

export const toEllipse = ({
  e: eccentricity,
  a: semimajorAxis,
  w: periapsis,
}: KeplerOrbitElements): Ellipse => {
  const e = eccentricity;
  const a = semimajorAxis * C.AU;
  const b = Math.sqrt((1 - e ** 2) * a ** 2);
  const radiusX = 2 * a;
  const radiusY = 2 * b;
  const c = Math.sqrt(a ** 2 + b ** 2);

  // For now, the rotation is the longitude of perihelion
  const rotation = periapsis / C.RADIAN;
  // center is at (-c, 0). Rotate it through rotation degrees.
  const { x, y } = V.asXYZ({ r: -c, t: rotation, p: Math.PI / 2 });
  return { x, y, radiusX, radiusY, rotation };
};
