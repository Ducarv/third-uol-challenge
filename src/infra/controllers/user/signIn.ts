import { Request, Response } from 'express';
import { SignInUserUseCase } from '../../../domain/useCases/user/signIn';
import { CannotSignIn, InternalServerError } from '../../../providers/errors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class SingInUserController {
  constructor(private signInUserUseCase: SignInUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      if (!email || !password) {
        throw new CannotSignIn('Email or Password cannot be empty');
      }

      const user = await this.signInUserUseCase.execute(email, password);

      if (!user) {
        throw new CannotSignIn('Invalid email or password');
      }

      const passwordMatch = bcrypt.compare(password, user.password as string);

      if (!passwordMatch) {
        throw new CannotSignIn('Invalid email or password');
      }

      const secret = process.env.SECRET_KEY as jwt.Secret;

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        secret,
        {
          expiresIn: '2h',
        },
      );

      response.status(200).json({
        auth: true,
        token: token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error: unknown) {
      if (error instanceof InternalServerError) {
        response.status(401).json({ auth: false, message: error.message });
      }
    }
  }
}
