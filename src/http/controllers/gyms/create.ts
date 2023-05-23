import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { CreateGymDTO } from '@/DTOs/gyms/create-gym-dto';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  });

  const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body);

  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const createGymUseCase = makeCreateGymUseCase(); // register use case factory

  const createGymDTO = new CreateGymDTO(title, description, phone, latitude, longitude);

  await createGymUseCase.execute(createGymDTO);

  return reply.status(201).send();
}
