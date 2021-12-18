import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import authConfig from '../../../config/auth';
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface ITokenResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async exceute({ email, password }: IRequest): Promise<ITokenResponse> {
    const { secret, expiresIn } = authConfig.jwt;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or Password incorrect', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or Password incorrect', 401);
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const tokeRetuned: ITokenResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokeRetuned;
  }
}
