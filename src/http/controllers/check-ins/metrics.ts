import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts';
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const getUserMetricsUseCase = makeGetUserMetricsUseCase(); // register use case factory

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub
  });

  return reply.status(200).send({
    checkInsCount
  });
}
