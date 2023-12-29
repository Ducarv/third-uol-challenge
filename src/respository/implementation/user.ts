import { IUser } from '../../domain/entities/User';
import { prisma } from '../../infra/database';
import { SignUpError } from '../../providers/errors';
import { UserRepository } from '../user';

export class UserPrismaRepository implements UserRepository {
  constructor() {}

  async signUp(data: IUser) {
    const existUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      throw new SignUpError('Email already in use');
    }

    const newUser = await prisma.user.create({
      data: {
        ...(data as Omit<IUser, 'events'>),
      },
    });

    return newUser as Partial<IUser>;
  }

  async signIn(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    const result = user as Pick<IUser, 'firstName' | 'lastName' | 'email'>;
    return result;
  }
}
