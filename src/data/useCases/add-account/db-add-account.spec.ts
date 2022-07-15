import { IEncrypter } from '../../protocols/IEncrypter';
import { DbAddAccount } from './db-add-account';

interface ISutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
}

const makeSut = (): ISutTypes => {
  class EncrypterStub {
    // eslint-disable-next-line no-unused-vars
    async encrypt(password: string): Promise<string> {
      return new Promise(resolve => {
        resolve('hashed_password');
      });
    }
  }

  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });
});
