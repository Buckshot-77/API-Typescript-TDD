import { IAccountModel } from '../../../../domain/models/account';

export const mapAccount = (account: any): IAccountModel => {
  const { _id } = account;

  const accountObject = {
    id: _id.toString(),
    name: account.name,
    email: account.email,
  };

  return accountObject;
};
