import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { AuthenticateUserDTO } from '@/DTOs/users/authenticate-user-dto';
import { Email } from '@/value-objects/email';

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<AuthenticateUseCaseResponse> {
    const emailValueObject = new Email(email)

    const user = await this.usersRepository.findByEmail(emailValueObject.value);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
