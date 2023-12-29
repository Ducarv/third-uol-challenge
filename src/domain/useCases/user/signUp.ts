import { SignUpError } from '../../../providers/errors';
import { UserRepository } from '../../../respository/user';
import { IUser } from '../../entities/User';

export class SignUpUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(data: IUser) {
    try {
      const newUser = await this.repository.signUp(data);

      return newUser;
    } catch (error: unknown) {
      if (error instanceof SignUpError) {
        throw new SignUpError('Error to sign user up');
      }
    }
  }
}
