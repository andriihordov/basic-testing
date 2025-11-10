jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  let config: { baseURL: string };
  const fakePost = {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: ' possimus qui neque nisi nulla',
  };
  const mockGet = jest.fn();
  const relativePath = 'posts/2';

  beforeEach(() => {
    jest.clearAllMocks();
    config = { baseURL: 'https://jsonplaceholder.typicode.com' };
    mockGet.mockResolvedValue({ data: fakePost });
    const mockCreate = jest.fn((options) => ({
      defaults: { baseURL: options.baseURL },
      get: mockGet,
    }));
    (axios.create as jest.Mock).mockImplementation(mockCreate);
  });

  test('should create axios instance with baseURL', () => {
    const instance = axios.create(config);
    expect(axios.create).toHaveBeenCalledWith(config);
    expect(instance.defaults).toEqual(config);
  });

  test('should call axios.get with correct url and return data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(mockGet).toHaveBeenCalledWith(relativePath);
    expect(result).not.toBeUndefined();
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi(relativePath)).resolves.toEqual(
      fakePost,
    );
  });
});
