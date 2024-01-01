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

  it('should sign a user up successfully', async () => {
    const signUp = new SignUpUserUseCase(mockRepository as UserRepository);

    const sut = await signUp.execute(mockUser);

    if (sut) {
      expect(sut.id).toBeDefined();
      expect(sut.firstName).toEqual('User');
      expect(sut.email).toEqual('user@mail.com');
    }
  });

  it('should handle SignUpError correctly', async () => {
    const error = new SignUpError('Error to sign user up');
    const mockRepositoryWithError: Pick<UserRepository, 'signUp'> = {
      signUp: async (data: IUser) => {
        throw error;
      },
    };
    const signUp = new SignUpUserUseCase(
      mockRepositoryWithError as UserRepository,
    );

    try {
      await signUp.execute(mockUser);
    } catch (caughtError: unknown) {
      expect(caughtError).toBeInstanceOf(SignUpError);
      if (caughtError instanceof SignUpError) {
        expect(caughtError.message).toEqual('Error to sign user up');
      }
    }
  });

  it('should handle other errors correctly', async () => {
    const otherError = new Error('Other error');
    const mockRepositoryWithOtherError: Pick<UserRepository, 'signUp'> = {
      signUp: async (data: IUser) => {
        throw otherError;
      },
    };
    const signUp = new SignUpUserUseCase(
      mockRepositoryWithOtherError as UserRepository,
    );

    try {
      await signUp.execute(mockUser);
    } catch (caughtError: unknown) {
      expect(caughtError).toEqual(otherError);
    }
  });
});
