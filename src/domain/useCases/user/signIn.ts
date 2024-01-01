import { CannotSignIn, SignInError } from '../../../providers/errors';
import { UserRepository } from '../../../respository/user';

export class SignInUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(email: string, password: string) {
    try {
      if (email === '' || password === '') {
        throw new CannotSignIn('Email or/and Password cannot be empty');
      }

      const user = await this.repository.signIn(email);
      return user;
    } catch (error: unknown) {
      if (error instanceof SignInError) {
        throw new SignInError('Error to sign user in.');
      }
      if (error instanceof CannotSignIn) {
        throw new CannotSignIn('Email or/and Password cannot be empty');
      }
    }
  }
}
