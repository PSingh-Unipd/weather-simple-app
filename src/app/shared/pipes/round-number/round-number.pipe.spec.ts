import { RoundNumberPipe } from './round-number.pipe';

describe('RoundNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundNumberPipe();
    expect(pipe).toBeTruthy();
  });

  it('it should return round up number', () => {
    const pipe = new RoundNumberPipe();
    expect(pipe.transform(2.7)).toBe(3);
  })

  it('it should return round down number', () => {
    const pipe = new RoundNumberPipe();
    expect(pipe.transform(4.2)).toBe(4);
  })
});
