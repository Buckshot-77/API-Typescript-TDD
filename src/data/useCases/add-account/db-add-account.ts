import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IEncrypter,
  IAddAccountRepository,
} from './protocols';

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;

  private readonly addAccountRepository: IAddAccountRepository;

  constructor(encrypter: IEncrypter, addAccountRepository: IAddAccountRepository) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const accountDataWithHashedPassword = { ...accountData, password: hashedPassword };
    await this.addAccountRepository.add(accountDataWithHashedPassword);
    return new Promise(resolve => {
      resolve(null);
    });
  }
}
