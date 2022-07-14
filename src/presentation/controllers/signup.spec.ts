/* eslint-disable max-classes-per-file */
import SignUpController from './signup';
import { MissingParamError, InvalidParamError, ServerError } from '../errors';
import { IEmailValidator } from '../protocols';

interface ISutTypes {
  sut: SignUpController;
  emailValidatorStub: IEmailValidator;
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    // eslint-disable-next-line no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut: systemUnderTest } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no email is provided', () => {
    const { sut: systemUnderTest } = makeSut();
    const httpRequest = {
      body: {
        name: 'any name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    const { sut: systemUnderTest } = makeSut();
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any_mail@mail.com',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no password confirmation is provided', () => {
    const { sut: systemUnderTest } = makeSut();
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any_mail@mail.com',
        password: 'any_password',
      },
    };
    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  test('Should return 400 if the email format is invalid', () => {
    const { sut: systemUnderTest, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'invalid_email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with the correct email', () => {
    const { sut: systemUnderTest, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    systemUnderTest.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  test('Should return 500 if EmailValidator throws an error', () => {
    const { sut: systemUnderTest, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = systemUnderTest.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
