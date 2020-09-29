import { add } from './utils';

describe('add', () => {
  test('should add two number', () => {
    expect(add(3, 4)).toBe(7);
  });
});
