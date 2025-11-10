// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 20, b: 30, action: Action.Add };
    expect(simpleCalculator(input)).toBe(50);
  });

  test('should subtract two numbers', () => {
    const input = { a: 150, b: 20, action: Action.Subtract };
    expect(simpleCalculator(input)).toBe(130);
  });

  test('should multiply two numbers', () => {
    const input = { a: 20, b: 30, action: Action.Multiply };
    expect(simpleCalculator(input)).toBe(600);
  });

  test('should divide two numbers', () => {
    const input = { a: 150, b: 50, action: Action.Divide };
    expect(simpleCalculator(input)).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 20, b: 2, action: Action.Exponentiate };
    expect(simpleCalculator(input)).toBe(400);
  });

  test('should return null for invalid action', () => {
    const input = { a: 2, b: 3, action: '**' };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: null, b: undefined, action: false };
    expect(simpleCalculator(input)).toBeNull();
  });
});
