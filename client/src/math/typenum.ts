export type TUnit = 0;
export type TNumber = TUnit[];

export type WLen<T extends TNumber> = T extends { length: infer N } ? N : TUnit;

// This is cons for positive numbers
export type W<L extends number, T extends TNumber = []> = T extends {
  length: L;
}
  ? T
  : W<L, [...T, TUnit]>;

export type WInc<T extends TNumber> = [...T, TUnit];
export type WDec<T extends TNumber> = T extends [infer U, ...infer V] ? V : [];

export type WAdd<A extends TNumber, B extends TNumber> = A extends []
  ? B
  : WAdd<WDec<A>, WInc<B>>;

export type WSub<A extends TNumber, B extends TNumber> = A extends []
  ? B
  : WSub<WDec<A>, WDec<B>>;

export type Number = [TNumber, []] | [[], TNumber];
export type Zero = [[], []];
export type IsZero<T extends Number> = T extends Zero ? true : false;
export type IsPositive<T extends Number> = T extends [TNumber, []]
  ? IsZero<T> extends true
    ? false
    : true
  : false;
export type IsNegative<T extends Number> = T extends [[], TNumber]
  ? IsZero<T> extends true
    ? false
    : true
  : false;

export type Len<T extends Number> = [WLen<T[0]>, WLen<T[1]>];
export type Inc<T extends Number> = IsZero<T> extends true
  ? [WInc<T[0]>, []]
  : IsPositive<T> extends true
  ? [WInc<T[0]>, []]
  : [[], WDec<T[1]>];

export type Dec<T extends Number> = IsZero<T> extends true
  ? [[], WInc<T[1]>]
  : IsPositive<T> extends true
  ? [WDec<T[0]>, []]
  : [[], WInc<T[1]>];

export type Add<A extends Number, B extends Number> = IsZero<A> extends true
  ? B
  : IsPositive<A> extends true
  ? Add<Dec<A>, Inc<B>>
  : Add<Inc<A>, Dec<B>>;

export type Sub<A extends Number, B extends Number> = IsZero<B> extends true
  ? A
  : IsPositive<B> extends true
  ? Sub<Dec<A>, Dec<B>>
  : Sub<Inc<A>, Inc<B>>;

let wone: W<1>;
let wtwo: WInc<typeof wone>;
let wthree: WAdd<typeof wone, typeof wtwo>;
let wzero: WSub<typeof wone, typeof wone>;
let five: WLen<W<5>>; // = 4; // 4 is not assignable to 5
let four: WLen<WDec<W<typeof five>>> = 4;
let two_one: [W<2>, W<1>] = [[0, 0] as [never, never], [0] as [never]];
// let num: Number = two_one; // Cannot asssign [never] to []
let positive_four: Len<[W<4>, []]> = [4, 0];
let positive_three: Len<Dec<[W<4>, []]>> = [3, 0];
let positive_two: Len<Dec<[W<3>, []]>> = [2, 0];
let positive_one: Len<Dec<[W<2>, []]>> = [1, 0];
let positive_zero: Len<Dec<[W<1>, []]>> = [0, 0];
let zero: Len<Zero> = [0, 0];
let negative_one: Len<Dec<Zero>> = [0, 1];
let zero_again: Len<Inc<Dec<Zero>>> = [0, 0];
let one_again: Len<Inc<Inc<[[], W<1>]>>>;

let one: Inc<Zero>;
let two: Inc<typeof one>;
let three: Add<typeof one, typeof two>;
let neg_one: Sub<typeof two, typeof three>;
let pos_one: Add<[[], [0]], [[0, 0], []]>;
let pos_one_b: Add<[[0, 0], []], [[], [0]]>;
