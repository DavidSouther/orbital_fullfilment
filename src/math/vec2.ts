import * as U from "./unit";

export interface XY<T extends string> {
  x: U.Unit<T>;
  y: U.Unit<T>;
}

export type Vector2<T extends string> = XY<T>;

export function add2<T extends string>(
  a: Vector2<T>,
  b: Vector2<T>
): Vector2<T> {}
