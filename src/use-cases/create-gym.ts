import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';
import { CreateGymDTO } from '@/DTOs/gyms/create-gym-dto';
import { Phone } from '@/value-objects/phone';



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
    const phoneValueObject = new Phone(phone)

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone: phoneValueObject.value,
      latitude,
      longitude,
    });

    return { gym };
  }
}
