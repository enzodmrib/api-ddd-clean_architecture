import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { RegisterUserDTO } from '@/DTOs/users/register-user-dto';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    /**
     * dependency inversion principle *
     * An external instantiation of the dependency
     * (in this case, the database connection) is created
     * and the code logic is dealt in the same way for every
     * type of db
     */
    const registerUseCase = makeRegisterUseCase(); // register use case factory

    const registerUserDTO = new RegisterUserDTO(name, email, password);

    await registerUseCase.execute(registerUserDTO);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
