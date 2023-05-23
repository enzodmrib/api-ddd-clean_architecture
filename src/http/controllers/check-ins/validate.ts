import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';
import { ValidateCheckInDTO } from '@/DTOs/check-ins/validate-check-in-dto';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  /**
   * dependency inversion principle *
   * An external instantiation of the dependency
   * (in this case, the database connection) is created
   * and the code logic is dealt in the same way for every
   * type of db
   */
  const validateCheckInUseCase = makeValidateCheckInUseCase(); // register use case factory

  const validateCheckInDTO = new ValidateCheckInDTO(checkInId)

  await validateCheckInUseCase.execute(validateCheckInDTO);

  return reply.status(204).send();
}
