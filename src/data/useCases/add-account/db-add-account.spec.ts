import { IEncrypter } from './protocols';
import { DbAddAccount } from './db-add-account';

interface ISutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    // eslint-disable-next-line no-unused-vars
    async encrypt(password: string): Promise<string> {
      return new Promise(resolve => {
        resolve('hashed_password');
      });
    }
  }

  return new EncrypterStub();
};

const makeSut = (): ISutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });

  test('Should throw an error if Encrypter throws an error', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error());
      }),
    );
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });
});
