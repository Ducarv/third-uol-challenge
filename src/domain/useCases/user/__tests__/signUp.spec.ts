import { SignUpError } from '../../../../providers/errors';
import { UserRepository } from '../../../../respository/user';
import { IUser } from '../../../entities/User';
import { SignUpUserUseCase } from '../signUp';

describe('SignUp.ts', () => {
  const mockUser: IUser = {
    firstName: 'User',
    lastName: 'Mock',
    birthDate: new Date(),
    city: 'Toronto',
    country: 'Canada',
    email: 'user@mail.com',
    password: '123',
    confirmPassword: '123',
    events: [],
  };
  const mockRepository: Pick<UserRepository, 'signUp'> = {
    signUp: async (data: IUser) => ({ id: '1', ...data }),
  };
  const signUp = new SignUpUserUseCase(mockRepository as UserRepository);

  it('should sign a user up successfully', async () => {
    const sut = await signUp.execute(mockUser);
    if (sut) {
      expect(sut.id).toBeDefined();
      expect(sut.firstName).toEqual('User');
      expect(sut.email).toEqual('user@mail.com');
    }
  });

  it('should handle errors correctly', async () => {
    const error = new SignUpError('Error to sign user up');
    jest.spyOn(signUp, 'execute').mockRejectedValueOnce(error);

    try {
      //@ts-ignore
      await signUp.execute();
      fail('Throw Error');
    } catch (caughtError: unknown) {
      if (caughtError instanceof SignUpError) {
        expect(caughtError.message).toEqual(error.message);
      }
    }
  });
});
