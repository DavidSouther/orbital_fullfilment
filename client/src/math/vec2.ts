import * as U from "./unit";

export interface XY<T extends string> {
  x: U.Unit<T>;
  y: U.Unit<T>;
}

export type Vector2<T extends string> = XY<T>;

export function add2<T extends string>(
  a: Vector2<T>,
  b: Vector2<T>
): Vector2<T> {
  return {
    x: { unit: a.x.unit, value: a.x.value + b.x.value },
    y: { unit: a.x.unit, value: a.y.value + b.y.value },
  };
}
