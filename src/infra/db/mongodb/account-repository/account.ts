import { IAddAccountRepository } from '../../../../data/protocols/IAddAccountRepository';
import { IAccountModel } from '../../../../domain/models/account';
import { IAddAccountModel } from '../../../../domain/useCases/protocols/IAddAccount';
import { mapAccount } from './account-mapper';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');

    const { insertedId: id } = await accountCollection.insertOne(accountData);

    const account = await accountCollection.findOne({ _id: id });

    return mapAccount(account);
  }
}
