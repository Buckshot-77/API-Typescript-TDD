import { IAddAccountModel } from '../../domain/useCases/protocols/IAddAccount';
import { IAccountModel } from '../../domain/models/account';

export interface IAddAccountRepository {
  add(accountData: IAddAccountModel): Promise<IAccountModel>;
}
