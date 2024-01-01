import { SignInUserUseCase } from '../signIn'; // Nome do arquivo do caso de uso SignIn
import { IUser } from '../../../entities/User';
import { CannotSignIn, SignInError } from '../../../../providers/errors';
import { UserRepository } from '../../../../respository/user';

describe('SignIn.ts', () => {
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

  let mockRepository: UserRepository;
  let signIn: SignInUserUseCase;

  beforeEach(() => {
    mockRepository = {
      signIn: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;
    signIn = new SignInUserUseCase(mockRepository as UserRepository);
  });

  it('should sign a user in successfully', async () => {
    const { password, confirmPassword, ...expectedUser } =
      mockUser as Partial<IUser>;

    jest.spyOn(mockRepository, 'signIn').mockResolvedValueOnce(expectedUser);

    const sut = await signIn.execute(mockUser.email, mockUser.password);
    expect(sut).toEqual(expectedUser);
  });

  it('should handle incorrect email or password correctly', async () => {
    jest.spyOn(mockRepository, 'signIn').mockResolvedValueOnce({});

    const sut = await signIn.execute('wrongemail@mail.com', 'wrongpassword');
    expect(sut).toEqual({});
  });

  it('should handle SignInError correctly', async () => {
    const error = new SignInError('Error to sign user in.');
    jest.spyOn(mockRepository, 'signIn').mockRejectedValueOnce(error);

    try {
      await signIn.execute(mockUser.email, mockUser.password);
      fail('Should throw SignInError');
    } catch (caughtError: unknown) {
      expect(caughtError).toBeInstanceOf(SignInError);
      expect(caughtError).toEqual(error);
    }
  });

  it('should throw CannotSignIn error', async () => {
    const expectEmail = 'test@mail.com';
    const expectPassword = '';

    jest
      .spyOn(mockRepository, 'signIn')
      .mockRejectedValueOnce(
        new CannotSignIn('Email or/and Password cannot be empty'),
      );

    await expect(signIn.execute(expectEmail, expectPassword)).rejects.toThrow(
      CannotSignIn,
    );

    expect(mockRepository.signIn).not.toHaveBeenCalled();
  });
});
