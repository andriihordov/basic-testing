// Uncomment the code below and write your tests
jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => 'mockedOne',
    mockTwo: () => 'mockedTwo',
    mockThree: () => 'mockedThree',
  };
});
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  let spyConsoleLog: jest.SpyInstance;
  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    spyConsoleLog.mockRestore();
  });
  afterAll(() => {
    jest.unmock('./index');
  });
  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(spyConsoleLog).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
  });
});
