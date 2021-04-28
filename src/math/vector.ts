import { Angle, Length, Speed, Dimensionless } from "./constants";

const cos = Math.cos;
const sin = Math.sin;

export interface XYZ<T extends number = Dimensionless> {
  x: T;
  y: T;
  z: T;
}

export interface RTP<T extends number = Dimensionless> {
  r: T;
  t: Angle;
  p: Angle;
}

export type Vector<T extends number = Dimensionless> =
  | Readonly<XYZ<T>>
  | Readonly<RTP<T>>;
export type Position = Vector<Length>;
export type Velocity = Vector<Speed>;

export const Origin = { x: 0, y: 0, z: 0 } as const;
export const XAxis = { x: 1, y: 0, z: 0 } as const;
export const YAxis = { x: 0, y: 1, z: 0 } as const;
export const ZAxis = { x: 0, y: 0, z: 1 } as const;
export const VelocityZero = { x: 0, y: 0, z: 0 } as const;

export function isXYZ<T extends number>(v: Vector<T>): v is XYZ<T> {
  return "x" in v && "y" in v && "z" in v;
}

export function isRTP<T extends number>(v: Vector): v is RTP<T> {
  return "r" in v && "t" in v && "p" in v;
}

export function asRTP<T extends number>(v: Vector<T>): Readonly<RTP<T>> {
  if (isRTP(v)) return v;
  const r = Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
  const t = Math.atan(v.y / v.x);
  const p = Math.acos(v.z / r);
  return ({ r, t, p } as const) as RTP<T>;
}

export function asXYZ<T extends number>(v: Vector<T>): Readonly<XYZ<T>> {
  if (isXYZ(v)) return v;
  const { r, p, t } = v;
  const x = r * sin(p) * cos(t);
  const y = r * sin(p) * sin(t);
  const z = r * cos(p);
  return { x, y, z } as XYZ<T>;
}

export function scale<T extends number>(
  a: Vector<T>,
  b: Dimensionless
): Vector<T> {
  if (isXYZ(a)) {
    return { x: a.x * b, y: a.y * b, z: a.z * b } as Vector<T>;
  } else {
    return { r: a.r * b, t: a.t, p: a.p } as Vector<T>;
  }
}

export function sub<T extends number>(a: Vector<T>, b: Vector<T>): Vector<T> {
  const { x: x1, y: y1, z: z1 } = asXYZ(a);
  const { x: x2, y: y2, z: z2 } = asXYZ(b);
  const dx = (x2 - x1) as T;
  const dy = (y2 - y1) as T;
  const dz = (z2 - z1) as T;
  return { x: dx, y: dy, z: dz };
}

export function add<T extends number>(a: Vector<T>, b: Vector<T>): Vector<T> {
  const { x: x1, y: y1, z: z1 } = asXYZ(a);
  const { x: x2, y: y2, z: z2 } = asXYZ(b);
  const dx = (x2 + x1) as T;
  const dy = (y2 + y1) as T;
  const dz = (z2 + z1) as T;
  return { x: dx, y: dy, z: dz };
}

export function dot<T extends number>(a: Vector<T>, b: Vector<T>): T {
  a = asXYZ(a);
  b = asXYZ(b);
  return (a.x * b.x + a.y * b.y + a.z * b.z) as T;
}

export function cross<T extends number>(a: Vector<T>, b: Vector<T>): Vector<T> {
  // New variables to match wikipedia
  const { x: a1, y: a2, z: a3 } = asXYZ(a);
  const { x: b1, y: b2, z: b3 } = asXYZ(b);
  const dx = a2 * b3 - a3 * b2;
  const dy = a3 * b1 - a1 * b3;
  const dz = a1 * b2 - a2 * b1;
  return { x: dx, y: dy, z: dz } as Vector<T>;
}

export function len<T extends number>(a: Vector<T>): T {
  return asRTP(a).r;
}

export function delta<T extends number>(a: Vector<T>, b: Vector<T>): T {
  return len(sub(a, b));
}
