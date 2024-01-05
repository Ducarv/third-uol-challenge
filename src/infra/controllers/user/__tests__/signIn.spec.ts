import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignInUserUseCase } from '../../../../domain/useCases/user/signIn';
import { SignInUserController } from '../signIn';
import {
  CannotSignIn,
  InternalServerError,
} from '../../../../providers/errors';
import { UserRepository } from '../../../../respository/user';

describe('POST users/sign-in', () => {
  it('should handle Email or Password cannot be empty', async () => {
    const mockSignInUserUseCase = {
      execute: jest
        .fn()
        .mockRejectedValue(
          new CannotSignIn('Email or Password cannot be empty'),
        ),
    } as unknown as SignInUserUseCase;

    const signInUserController = new SignInUserController(
      mockSignInUserUseCase,
    );

    const request = {
      body: {
        email: '',
        password: '',
      },
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // @ts-ignore
    await signInUserController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Email or Password cannot be empty',
    });
  });

  it('should handle InternalServerError', async () => {
    const mockSignInUserUseCase = {
      execute: jest
        .fn()
        .mockRejectedValue(new InternalServerError('Internal Server Error')),
    } as unknown as SignInUserUseCase;

    const signInUserController = new SignInUserController(
      mockSignInUserUseCase,
    );

    const request = {
      body: {
        email: 'validEmail@example.com',
        password: 'validPassword',
      },
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signInUserController.handle(request as any, response as any);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Internal Server Error',
    });
  });

  it('should handle invalid user', async () => {
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'invalidpassword123';

    const request = {
      body: {
        email: invalidEmail,
        password: invalidPassword,
      },
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const useCase = {
      execute: jest.fn().mockImplementation(async () => null),
    } as unknown as SignInUserUseCase;

    const controller = new SignInUserController(useCase);

    // @ts-ignore
    await controller.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Invalid user.',
    });
  });

  it('should handle password mismatch', async () => {
    const email = 'valid@example.com';
    const password = 'incorrectPassword';
    const mockSignInUserUseCase = {
      execute: jest
        .fn()
        .mockRejectedValue(new CannotSignIn('Password NOT matching.')),
    } as unknown as SignInUserUseCase;
    const controller = new SignInUserController(mockSignInUserUseCase);
    const request = {
      body: {
        email: email,
        password: password,
      },
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // @ts-ignore
    await controller.handle(request, response);

    await expect(mockSignInUserUseCase.execute).rejects.toEqual(
      new CannotSignIn('Password NOT matching.'),
    );
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Password NOT matching.',
    });
  });
});
