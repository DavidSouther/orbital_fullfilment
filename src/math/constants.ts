// MKS Unit System
export type Dimensionless = number;
export type Normal = Dimensionless; // 0 <= Normal <= 1;
export type Positive = number; // 0 <= Positive
export type Angle = number;
export type Length = number;
export type Mass = Positive;
export type Time = number;
export type Speed = number; // Meters / Second
export type Acceleration = number; // Velocity / Second, Meters / Second ** 2
export type Newton = number; // Mass * Acceleration
export const KILOMETER: Length = 1;
export const TONNE: Mass = 1;
export const SECOND: Time = 1;
export const METER: Length = KILOMETER / 1000;
export const MINUTE: Time = SECOND * 60;
export const HOUR: Time = MINUTE * 60;
export const DAY: Time = MINUTE * 24;
export const YEAR: Time = DAY * 365.265;
export const CENTURY: Time = YEAR * 100;
export const AU: Length = 1.495_978_707e8 * KILOMETER;
export const PI: Angle = Math.PI;
export const TAU: Angle = PI * 2;
export const RADIAN: Angle = 180 / PI;
export const DEGREE: Angle = 1;
export const g: Acceleration = 9.8 * METER; // m / ss

export type Some<T> = T;
export const None = null;
export type Option<T> = Some<T> | typeof None;

export function isNone<T>(o: Option<T>): o is null {
  return o === None;
}

export function isSome<T>(o: Option<T>): o is Some<T> {
  return o !== None;
}

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
export function entries<T>(t: T): Entries<T> {
  return (Object.entries(t) as unknown) as Entries<T>;
}

export function clone<T extends object>(t: T): T {
  return entries(t).reduce((t, [k, v]) => {
    t[k] = v;
    return t;
  }, {} as Partial<T>) as T;
}
