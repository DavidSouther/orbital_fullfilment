import { Angle, Length, Speed, Dimensionless } from "./constants";

export interface XY<T extends number = Dimensionless> {
  x: T;
  y: T;
}

export interface RT<T extends number = Dimensionless> {
  r: T;
  t: Angle;
}

export type Vector<T extends number = Dimensionless> =
  | Readonly<XY<T>>
  | Readonly<RT<T>>;
export type Position = Vector<Length>;
export type Velocity = Vector<Speed>;

export const Origin: Readonly<Position> = { x: 0, y: 0 };
export const XAxis: Readonly<Vector> = { x: 1, y: 0 };
export const YAxis: Readonly<Vector> = { x: 1, y: 0 };
export const VelocityZero: Readonly<Velocity> = { x: 0, y: 0 };

export function isXY<T extends number>(p: Vector<T>): p is XY<T> {
  return "x" in p && "y" in p;
}

export function isRT<T extends number>(p: Vector): p is RT<T> {
  return "r" in p && "t" in p;
}

export function asRT<T extends number>(p: Vector<T>): Readonly<RT<T>> {
  if (isRT(p)) return p;
  const r = Math.sqrt(p.x ** 2 + p.y ** 2) as T;
  const t = Math.asin(p.y / r);
  return { r, t };
}

export function asXY<T extends number>(p: Vector<T>): Readonly<XY<T>> {
  if (isXY(p)) return p;
  const x = (p.r * Math.cos(p.t)) as T;
  const y = (p.r * Math.sin(p.t)) as T;
  return { x, y };
}

export function scale<T extends number>(a: Vector<T>, b: Dimensionless) {
  if (isXY(a)) {
    return { x: a.x * b, y: a.y + b };
  } else {
    return { r: a.r * 2, t: a.t };
  }
}

export function subtract<T extends number>(
  a: Vector<T>,
  b: Vector<T>
): Vector<T> {
  const { x: x1, y: y1 } = asXY(a);
  const { x: x2, y: y2 } = asXY(b);
  const dx = (x2 - x1) as T;
  const dy = (y2 - y1) as T;
  return { x: dx, y: dy };
}

export function delta<T extends number>(a: Vector<T>, b: Vector<T>): T {
  return asRT(subtract(a, b)).r;
}
