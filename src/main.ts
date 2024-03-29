/**
 * # nom-ts
 * TypeScript helpers for nominal typing
 *
 * ## Problem
 * - 😀 Nominal types are [pretty useful](https://github.com/Microsoft/TypeScript/blob/69abe49930761aea92dc564f9b6a5db74d6e1be9/src/compiler/types.ts#L1183-L1192).
 * - 😞 TypeScript doesn't support nominal types ([yet?](https://github.com/microsoft/TypeScript/wiki/Roadmap/69ede9ef95de7bf8764a2f2fa3c3d4c441cc828d#future)).
 *
 * Great! This is easy to fix right?
 * The simple trick below solves the problem.
 */
{
}

declare const __brand: unique symbol;
declare const __type: unique symbol;

// not needed, but makes `Brand` tooltip prettier.
interface __Brand<T, S extends string> {
  [__brand]: S;
  [__type]: T;
}

export type Brand<T, S extends string> = T & __Brand<T, S>;

/**
 * But then we encounter some more happy little problems.
 *
 * @example
 * // tooltip: type PlayerId = number & nom.Brand<number, "PlayerId">
 * type PlayerId = Brand<number, 'PlayerId'>;
 * type PlayerScores = Record<PlayerId, number>;
 *
 * const myId = 1337 as PlayerId;
 * const scores: PlayerScores = { [myId]: 9001 };
 *
 * // Element implicitly has an 'any' type because expression
 * // of type 'Brand<number, "PlayerId">' can't be used to
 * // index type 'Record<Brand<number, "PlayerId">, number>'.
 * // ts(7053)
 * const myScore = scores[myId];
 *
 * @description
 *
 * __nom-ts aims to address these problems.__
 *
 * ## Goals
 * - 🦅 no dependencies
 * - 🦥 all branded types in nom-ts are assignable to their underlying type
 *   without any additional syntax
 */
{
}

interface __Flavor<T, S extends string> {
  [__brand]?: S;
  /**
   * Intersection is distributive over union, but we don't want to "lose" information about T.
   * `__type?: T` will be useful for Unbrand.
   */
  [__type]?: T;
}

export type Flavor<T, S extends string> = T & __Flavor<T, S>;

export type Unbrand<T> = T extends Flavor<infer X, any> ? X : T;
export const Unbrand = <T extends any>(x: T) => x as Unbrand<T>;

export type Dict<K extends PropertyKey, V> = Record<Unbrand<K>, V>;

/**
 * # Links
 *
 * - https://en.wikipedia.org/wiki/Refinement_type
 * - https://basarat.gitbooks.io/typescript/docs/tips/nominalTyping.html
 * - https://github.com/gcanti/newtype-ts
 * - https://github.com/Microsoft/TypeScript/issues/202
 * - "Brand" name is taken from
 *   https://michalzalecki.com/nominal-typing-in-typescript/
 * - "Flavor" name is taken from
 *   https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
 */
