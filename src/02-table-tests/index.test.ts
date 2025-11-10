// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

type TestCase = {
  a: unknown;
  b: unknown;
  action: unknown;
  expected: unknown;
  description: string;
};
type TestCaseTuple = [
  TestCase['description'],
  TestCase['a'],
  TestCase['b'],
  TestCase['action'],
  TestCase['expected'],
];
type TestCaseArray = TestCaseTuple[];
const testCases: TestCase[] = [
  {
    a: 20,
    b: 30,
    action: Action.Add,
    expected: 50,
    description: 'should add two numbers',
  },
  {
    a: 150,
    b: 20,
    action: Action.Subtract,
    expected: 130,
    description: 'should subtract two numbers',
  },
  {
    a: 20,
    b: 30,
    action: Action.Multiply,
    expected: 600,
    description: 'should multiply two numbers',
  },
  {
    a: 150,
    b: 50,
    action: Action.Divide,
    expected: 3,
    description: 'should divide two numbers',
  },
  {
    a: 20,
    b: 2,
    action: Action.Exponentiate,
    expected: 400,
    description: 'should exponentiate two numbers',
  },
  {
    a: 20,
    b: 2,
    action: '**',
    expected: null,
    description: 'should return null for invalid action',
  },
  {
    a: null,
    b: undefined,
    action: false,
    expected: null,
    description: 'should return null for invalid arguments',
  },
];
describe('simpleCalculator', () => {
  const data: TestCaseArray = testCases.map((testCase: TestCase) => [
    testCase.description,
    testCase.a,
    testCase.b,
    testCase.action,
    testCase.expected,
  ]);
  test.each(data)(
    'Case: %s | Inputs: (a: %p, b: %p, Action: %p) | Expected: %j',
    (description, a, b, action, expected) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      if (description?.includes('null')) {
        expect(result).toBeNull();
      } else {
        expect(result).toBe(expected);
      }
    },
  );
});
