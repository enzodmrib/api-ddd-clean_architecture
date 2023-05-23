import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { SearchGymsDTO } from '@/DTOs/gyms/search-gyms-dto';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  });

  const { q, page } = searchGymsQuerySchema.parse(request.query);

  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const searchGymsUseCase = makeSearchGymsUseCase(); // register use case factory

  const searchGymsDTO = new SearchGymsDTO(q, page)

  const { gyms } = await searchGymsUseCase.execute(searchGymsDTO);

  return reply.status(200).send({
    gyms
  });
}
