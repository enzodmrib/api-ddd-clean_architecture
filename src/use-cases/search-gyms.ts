import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gyms-repository';
import { SearchGymsDTO } from '@/DTOs/gyms/search-gyms-dto';

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsDTO): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
