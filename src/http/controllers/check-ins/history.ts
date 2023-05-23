import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts';
import { HistoryDTO } from '@/DTOs/check-ins/history-dto';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase(); // register use case factory

  const historyDTO = new HistoryDTO(request.user.sub, page);

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute(historyDTO);

  return reply.status(200).send({
    checkIns
  });
}
