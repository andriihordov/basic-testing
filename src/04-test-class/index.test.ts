// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  let fetchBalanceSpy: jest.SpyInstance<Promise<number | null>, []>;
  const initialBalance = 100;

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
    fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');
  });

  afterEach(() => fetchBalanceSpy.mockRestore());

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const destination = getBankAccount(initialBalance + 1);
    expect(() => bankAccount.transfer(150, destination)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(100, bankAccount)).toThrow();
  });

  test('should deposit money', () => {
    const depositAmount = 100;
    const currentAmount = bankAccount.getBalance();
    const expected = currentAmount + depositAmount;
    expect(bankAccount.deposit(depositAmount).getBalance()).toBe(expected);
  });

  test('should withdraw money', () => {
    const withdrawalAmount = 50;
    const currentAmount = bankAccount.getBalance();
    const expected = currentAmount - withdrawalAmount;
    expect(bankAccount.withdraw(withdrawalAmount).getBalance()).toBe(expected);
  });

  test('should transfer money', () => {
    const destination = getBankAccount(initialBalance);
    const transferAmount = 50;
    const sourceBalance = bankAccount.getBalance() - transferAmount;
    const destinationBalance = destination.getBalance() + transferAmount;
    bankAccount.transfer(transferAmount, destination);
    expect(bankAccount.getBalance()).toBe(sourceBalance);
    expect(destination.getBalance()).toBe(destinationBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    fetchBalanceSpy.mockResolvedValue(95);
    await expect(bankAccount.fetchBalance()).resolves.toEqual(
      expect.any(Number),
    );
    expect(fetchBalanceSpy).toHaveBeenCalledTimes(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const amount = 86;
    fetchBalanceSpy.mockResolvedValue(amount);
    await bankAccount.synchronizeBalance();
    expect(fetchBalanceSpy).toHaveBeenCalledTimes(1);
    expect(bankAccount.getBalance()).toBe(amount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const amount = null;
    fetchBalanceSpy.mockResolvedValue(amount);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(fetchBalanceSpy).toHaveBeenCalledTimes(1);
  });
});
