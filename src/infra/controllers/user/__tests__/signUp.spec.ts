import { SignUpUserUseCase } from '../../../../domain/useCases/user/signUp';
import { InternalServerError, SignUpError } from '../../../../providers/errors';
import { SignUpUserController } from '../signUp';

describe('POST users/sign-up', () => {
  it('should sign up new user', async () => {
    const request = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000',
        city: 'Toronto',
        country: 'Canada',
        email: 'john@mail.com',
        password: 'john12345',
        confirmPassword: 'john12345',
      },
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const useCase = {
      execute: jest.fn().mockResolvedValue({
        ...request.body,
      }),
    };
    const controller = new SignUpUserController(
      useCase as unknown as SignUpUserUseCase,
    );

    // @ts-ignore
    await controller.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      data: {
        birthDate: '01/01/2000',
        city: 'Toronto',
        country: 'Canada',
        email: 'john@mail.com',
        firstName: 'John',
        lastName: 'Doe',
      },
    });
  });

  it('should handle invalid input with status 400', async () => {
    const request = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '10/10/2000',
        city: 'Toronto',
        country: 'Canada',
        email: 'wrongEmail.com',
        password: 'john123457',
        confirmPassword: 'john123457',
      },
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const useCase = {
      execute: jest.fn().mockResolvedValue({
        ...request.body,
      }),
    };
    const controller = new SignUpUserController(
      useCase as unknown as SignUpUserUseCase,
    );

    //@ts-ignore
    await controller.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Invalid input',
      errors: [
        {
          code: 'invalid_string',
          message: 'Invalid email format',
          path: ['email'],
          validation: 'email',
        },
      ],
    });
  });

  it('should handle compare passwords status 400', async () => {
    const request = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '10/10/2000',
        city: 'Toronto',
        country: 'Canada',
        email: 'john@mail.com',
        password: 'john123457',
        confirmPassword: 'johnWrong',
      },
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const useCase = {
      execute: jest.fn().mockResolvedValue({
        ...request.body,
      }),
    };
    const controller = new SignUpUserController(
      useCase as unknown as SignUpUserUseCase,
    );

    //@ts-ignore
    await controller.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Password and Confirmation should be strict equal.',
    });
  });

  it('should handle SignUpError', async () => {
    const request = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000',
        city: 'Toronto',
        country: 'Canada',
        email: 'john@mail.com',
        password: 'john12345',
        confirmPassword: 'john12345',
      },
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const useCase = {
      execute: jest
        .fn()
        .mockRejectedValue(new SignUpError('Email already in use')),
    } as unknown as SignUpUserUseCase;

    const controller = new SignUpUserController(
      useCase as unknown as SignUpUserUseCase,
    );

    // @ts-ignore
    await controller.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Email already in use',
    });
  });

  it('should handle Internal Server Error', async () => {
    const request = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000',
        city: 'Toronto',
        country: 'Canada',
        email: 'john@mail.com',
        password: 'john12345',
        confirmPassword: 'john12345',
      },
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const useCase = {
      execute: jest
        .fn()
        .mockRejectedValue(new InternalServerError('Internal Server Error')),
    } as unknown as SignUpUserUseCase;

    const controller = new SignUpUserController(useCase);

    // @ts-ignore
    await controller.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
