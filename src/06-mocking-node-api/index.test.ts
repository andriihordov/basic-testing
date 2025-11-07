// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
jest.mock('fs', () => ({
  existsSync: (pathToFile: string) => pathToFile.includes('1.txt'),
}));
jest.mock('fs/promises', () => ({
  readFile: async () =>
    Promise.resolve(Buffer.from('This is content of 1.txt')),
}));
jest.mock('path', () => ({
  join: (...pathParts: string[]) =>
    pathParts.join(/\//.test(__dirname) ? '\/' : '\\'),
}));
describe('doStuffByTimeout', () => {
  let callback: () => void;
  let timeout: number;
  let spySetTimeout: jest.SpyInstance;
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    callback = jest.fn();
    timeout = 1000;
    spySetTimeout = jest.spyOn(global, 'setTimeout');
  });
  afterAll(() => {
    jest.unmock('fs');
    jest.useRealTimers();
  });
  afterEach(() => {
    spySetTimeout.mockRestore();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let callback: () => void;
  let delay: number;
  let spySetInterval: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    callback = jest.fn();
    delay = 1000;
    spySetInterval = jest.spyOn(global, 'setInterval');
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  afterEach(() => {
    spySetInterval.mockRestore();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, delay);
    expect(setInterval).toHaveBeenLastCalledWith(callback, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, delay);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(delay * 2);
    expect(callback).toHaveBeenCalledTimes(3);
    jest.advanceTimersByTime(delay * 3.5);
    expect(callback).toHaveBeenCalledTimes(6);
    jest.advanceTimersByTime(delay * 100);
    expect(callback).toHaveBeenCalledTimes(106);
  });
});

describe('readFileAsynchronously', () => {
  const fileName = '1.txt';
  const fileContent = 'This is content of 1.txt';
  afterEach(() => jest.clearAllMocks());
  test('should call join with pathToFile', async () => {
    const joinedString = join(__dirname, fileName);
    expect(join(__dirname, fileName)).toBe(joinedString);
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously('blabla.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    await expect(readFileAsynchronously(fileName)).resolves.toBe(fileContent);
  });
});
