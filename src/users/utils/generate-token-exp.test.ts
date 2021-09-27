import { GenerateTokenExpTime } from './generate-token-exp';

describe('UsersController', () => {
  it('should return number', () => {
    const time: number = GenerateTokenExpTime(5);
    expect(typeof time).toBe('number');
  });
});
