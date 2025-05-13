import { GetPrisonDTO, PostPrisonDTO } from "../../domain/DTOs/prisonDTO";
import { IPrisonRepo } from "../../domain/IRepos/IPrisonRepo";
import { Prison } from "../../domain/entities/prison.entity";

export class PrisonService {
  constructor(private prisonRepo: IPrisonRepo) {}

  async create(prisonData: PostPrisonDTO): Promise<GetPrisonDTO> {
    return this.prisonRepo.create(prisonData); // TODO: map this to GetPrisonDTO
  }

  async getByName(key: string): Promise<Prison[]> {
    const prisons = await this.prisonRepo.getByName(key);
    return prisons; 
}
}
