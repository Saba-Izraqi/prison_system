import { IPrisonRepo } from "../../domain/IRepos/IPrisonRepo";
import { Prison } from "../../domain/entities/prison.entity";

export class PrisonService {
  constructor(private prisonRepo: IPrisonRepo) {}

  async create(prisonData: Partial<Prison>): Promise<Prison> {
    return this.prisonRepo.create(prisonData);
  }

  async getByName(key: string): Promise<Prison[]> {
    const prisons = await this.prisonRepo.getByName(key);
    return prisons;
  }
}
