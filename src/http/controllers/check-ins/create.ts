import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';
import { CheckInDTO } from '@/DTOs/check-ins/check-in-dto';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const checkInUseCase = makeCheckInUseCase(); // register use case factory

  const checkInDTO = new CheckInDTO(request.user.sub, gymId, latitude, longitude)

  await checkInUseCase.execute(checkInDTO);

  return reply.status(201).send();
}
