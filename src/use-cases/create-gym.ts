import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';
import { CreateGymDTO } from '@/DTOs/gyms/create-gym-dto';



interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymDTO): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
