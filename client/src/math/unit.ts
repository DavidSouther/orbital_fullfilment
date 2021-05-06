export const enum Dimension {
  None,
  Distance,
  Mass,
  Time,
  Angle,
}

export const Units = {
  None: "None" as const,
  // Distance
  Kilometer: "Kilometer" as const,
  Meter: "Meter" as const,
  AU: "AU" as const,
  // Mass
  Gram: "Gram" as const,
  Kilogram: "Kilogram" as const,
  Tonne: "Tonne" as const,
  // Time
  Second: "Second" as const,
  Hour: "Hour" as const,
  Day: "Day" as const,
  Year: "Year" as const,
  Century: "Century" as const,
  // Angle
  Degree: "Degree" as const,
  Radian: "Radian" as const,
};

const Conversions = {
  AU: 1.495_978_707e8,
  Kilo: 1000,
  Milli: 1 / 1000,
  Radian: 180 / Math.PI,
};

export interface Unit<T extends string> {
  value: number;
  unit: T;
}

export type Dimensionless = Unit<typeof Units.None>;

function ofDimensionless(value: number): Dimensionless {
  return { unit: Units.None, value };
}

function asDimensionless({ value }: Unit<any>): Dimensionless {
  return ofDimensionless(value);
}

export type Kilometer = Unit<"Kilometer">;
export type Meter = Unit<"Meter">;
export type AU = Unit<typeof Units.AU>;
export type Length = Kilometer | Meter | AU;

function ofKm(value: number): Kilometer {
  return { unit: Units.Kilometer, value };
}

function asKm({ unit, value }: Length): Kilometer {
  switch (unit) {
    case Units.Kilometer:
      return ofKm(value);
    case Units.Meter:
      return ofKm(value * Conversions.Kilo);
    case Units.AU:
      return ofKm(value * Conversions.AU);
    default:
      throw new Error(`Cannot convert ${unit} to Length`);
  }
}

function asM(l: Length): Meter {
  const value =
    l.unit === Units.Meter ? l.value : asKm(l).value / Conversions.Kilo;
  return { unit: Units.Meter, value };
}

function asAU(l: Length): AU {
  const value = l.unit === Units.AU ? l.value : asKm(l).value / Conversions.AU;
  return { unit: Units.AU, value };
}

export type Radian = Unit<typeof Units.Radian>;
export type Degree = Unit<typeof Units.Degree>;
export type Angle = Radian | Degree;

function asRadian({ unit, value }: Angle): Radian {
  switch (unit) {
    case Units.Degree:
      return { unit: Units.Radian, value: value * Conversions.Radian };
    case Units.Radian:
      return { unit: Units.Radian, value };
    default:
      throw new Error(`Cannot convert ${unit} to angle`);
  }
}

function asDegree({ unit, value }: Angle): Degree {
  switch (unit) {
    case Units.Degree:
      return { unit: Units.Degree, value: value };
    case Units.Radian:
      return { unit: Units.Degree, value: value / Conversions.Radian };
    default:
      throw new Error(`Cannot convert ${unit} to angle`);
  }
}

export const as = {
  Dimensionless: asDimensionless,
  KM: asKm,
  M: asM,
  AU: asAU,
  Degree: asDegree,
  Radian: asRadian,
};

export const of = {
  Dimensionless: ofDimensionless,
  KM: ofKm,
};

export function add<T extends string, U extends T>(
  { unit, value: a }: Unit<T>,
  { value: b }: Unit<U>
): Unit<T> {
  return { unit, value: a + b };
}

export function sub<T extends string, U extends T>(
  { unit, value: a }: Unit<T>,
  { value: b }: Unit<U>
): Unit<T> {
  return { unit, value: a - b };
}

export type TMul<T extends string, U extends string> = `${T}*${U}`;
function mulT<T extends string, U extends string>(t: T, u: U): TMul<T, U> {
  return (`${t}*${u}` as unknown) as TMul<T, U>;
}

export function mul<
  T extends string,
  U extends string,
  V extends string = TMul<T, U>
>(a: Unit<T>, b: Unit<U>): Unit<V> {
  const unit = mulT(a.unit, b.unit) as V;
  const value = a.value * b.value;
  return { unit, value };
}

export type TDiv<T extends string, U extends string> = `${T}/${U}`;
function divT<T extends string, U extends string>(t: T, u: U): TDiv<T, U> {
  return `${t}/${u}` as TDiv<T, U>;
}

export function div<
  T extends string,
  U extends string,
  V extends string = TDiv<T, U>
>(a: Unit<T>, b: Unit<T>) {
  const unit = divT(a.unit, b.unit) as V;
  const value = a.value / b.value;
  return { unit, value };
}

const one_km = ofKm(1);
const one_km_sq = mul(one_km, one_km);
const one_degree = { unit: Units.Degree, value: 1 } as Unit<
  typeof Units.Degree
>;
// add(one_km, one_degree); // Type '"Degree"' is not assignable to type '"Kilometer"'.ts(2345)
const two_km = div(one_km_sq, one_km); // Type is Unit<`Kilometer*Kilometer/${string}`, couldn't get reduction unit
type km = typeof one_km.unit;
type sq = typeof one_km_sq.unit; // Type is Kilometer*Kilometer
