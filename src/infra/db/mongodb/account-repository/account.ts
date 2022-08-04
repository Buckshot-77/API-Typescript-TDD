import { IAddAccountRepository } from '../../../../data/protocols/IAddAccountRepository';
import { IAccountModel } from '../../../../domain/models/account';
import { IAddAccountModel } from '../../../../domain/useCases/protocols/IAddAccount';

import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');

    const { insertedId: id } = await accountCollection.insertOne(accountData);

    const convertedId = id.toString();

    const account = await accountCollection.findOne({ _id: id });

    if (account) {
      const accountObject = {
        id: convertedId,
        name: account.name,
        email: account.email,
      };

      return accountObject;
    }

    throw new Error('There was an error creating the account');
  }
}
