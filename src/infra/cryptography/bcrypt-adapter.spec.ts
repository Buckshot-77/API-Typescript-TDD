import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => {
      resolve('hash');
    });
  },
}));

interface IMakeSutReturn {
  sut: BcryptAdapter;
  salt: Number;
}

const makeSut = (): IMakeSutReturn => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);

  return { sut, salt };
};

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct params', async () => {
    const { sut, salt } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on success', async () => {
    const { sut } = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });

  test('Should throw if Bcrypt throws', async () => {
    const { sut } = makeSut();

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      return new Promise(() => {
        throw new Error();
      });
    });

    const promise = sut.encrypt('any_value');

    await expect(promise).rejects.toThrow();
  });
});
