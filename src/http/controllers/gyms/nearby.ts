import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';
import { FetchNearbyGymsDTO } from '@/DTOs/gyms/fetch-nearby-gyms-dto';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 190
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase(); // register use case factory

  const fetchNearbyGymsDTO = new FetchNearbyGymsDTO(latitude, longitude)

  const { gyms } = await fetchNearbyGymsUseCase.execute(fetchNearbyGymsDTO);

  return reply.status(200).send({
    gyms
  });
}
