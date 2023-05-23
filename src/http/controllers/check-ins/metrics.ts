import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';
import { GetUserMetricsDTO } from '@/DTOs/check-ins/get-user-metrics-dto';

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const getUserMetricsUseCase = makeGetUserMetricsUseCase(); // register use case factory

  const getUserMetricsDTO = new GetUserMetricsDTO(request.user.sub)

  const { checkInsCount } = await getUserMetricsUseCase.execute(getUserMetricsDTO);

  return reply.status(200).send({
    checkInsCount
  });
}
