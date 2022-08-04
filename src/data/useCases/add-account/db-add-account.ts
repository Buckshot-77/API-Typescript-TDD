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
    if (!accountData.password) {
      throw new Error('No password was provided!');
    }
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const accountDataWithHashedPassword = { ...accountData, password: hashedPassword };
    const account = await this.addAccountRepository.add(accountDataWithHashedPassword);

    return account;
  }
}
