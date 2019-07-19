import { Brand, Flavor, Unbrand, Dict } from './index';

type PlayerId = Brand<number, 'PlayerId'>;
const PlayerId = (x: number) => x as PlayerId;

// @dts-jest:group (Brand)
{
  // @dts-jest:fail strings are assignable to branded numbers
  const _badId1: PlayerId = 'foobar';

  // @dts-jest:fail:snap internal type isn't assignable to branded type
  const _badId2: PlayerId = 1000;

  // @dts-jest:pass branded type is assignable to it's internal type
  const _goodId: number = PlayerId(1000);

  // @dts-jest:pass internal type prototype methods are accessible
  const _localeString = PlayerId(10000).toLocaleString(); //=> string
}

// @dts-jest:pass
const myId: PlayerId = PlayerId(1337);

type PlayerScores = Record<PlayerId, number>;

const scores: PlayerScores = { [myId]: 9001 };

// @dts-jest:fail:snap we can't index with branded type
const _1 = scores[myId];

type BetterPlayerScores = Partial<Dict<PlayerId, 9001 | 42 | 500>>;

const rf: BetterPlayerScores = {
  [1000]: 9001,
  [2000]: 42,
  [3000]: 500,
};

const id = PlayerId(1337);

// @dts-jest:pass we can extract internal type from Brand
const a = rf[Unbrand(id)]; //=> 9001 | 42 | 500 | undefined

type K = 'a' | 'b' | 'c';
type BK = Brand<K, 'BK'>;

// @dts-jest:pass
type DBK = Dict<BK, 1 | 2 | 3>;

const dbk: DBK = { a: 1, b: 2, c: 3 };

const bk = 'a' as BK;

// @dts-jest:pass
const _2 = dbk[Unbrand(bk)]; //=> 1 | 2 | 3

// @dts-jest:group (Flavor)
{
  type Flavored1 = Flavor<number, '1'>;
  const Flavored1 = (x: number) => x as Flavored1;

  type Flavored2 = Flavor<number, '2'>;

  // @dts-jest:pass internal type is assignable to flavor
  const _g1: Flavored1 = 1000;

  // @dts-jest:fail:snap one flavored type is not assignable to the other
  const _g2: Flavored2 = Flavored1(1000);

  // @dts-jest:pass internal type prototype methods are accessible
  const _fixed = Flavored1(10000).toFixed(); //=> string
}
