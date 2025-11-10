// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(['apple', 'banana', 'coconut'])).toStrictEqual({
      value: 'apple',
      next: {
        value: 'banana',
        next: {
          value: 'coconut',
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(
      generateLinkedList(['apple', 'banana', 'coconut']),
    ).toMatchSnapshot();
  });
});
