import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator';

jest.mock('validator', () => {
  return {
    isEmail(): boolean {
      return true;
    },
  };
});

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe('EmailValidator Adapter', () => {
  test('Should return "false" if validator returns "false"', () => {
    const systemUnderTest = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = systemUnderTest.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });

  test('Should return "true" if validator returns "true"', () => {
    const systemUnderTest = makeSut();
    const isValid = systemUnderTest.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });

  test('Should call validator with correct email', () => {
    const systemUnderTest = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    systemUnderTest.isValid('any_email@mail.com');
    expect(isEmailSpy).toBeCalledWith('any_email@mail.com');
  });
});
