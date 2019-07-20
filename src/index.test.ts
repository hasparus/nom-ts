import { Unbrand, Brand } from './index';

describe('nom', () => {
  type Branded = Brand<object, '👽'>;

  it('Unbrand is identity at runtime', () => {
    const x = { x: 'x' } as Branded;

    expect(Unbrand(x)).toBe(x);
  });
});
