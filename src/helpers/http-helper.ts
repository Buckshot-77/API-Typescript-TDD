import { IHttpResponse } from '../presentation/protocols/IHttp';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error,
});
