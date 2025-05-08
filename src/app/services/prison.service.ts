import { IPrisonRepo } from "../../domain/IRepos/IPrisonRepo";
import { Prison } from "../../domain/entities/prison.entity";

export class PrisonService {
  constructor(private prisonRepo: IPrisonRepo) {}

  async create(prisonData: Partial<Prison>): Promise<Prison> {
    const prison = this.prisonRepo.create(prisonData);
    return prison;
  }

  async getByName(key: string): Promise<Prison[]> {
    const prisons = await this.prisonRepo.getByName(key);
    return prisons;
  }

  async deleteById(id: string): Promise<void> {
    const prison = await this.prisonRepo.deleteById(id);
    return prison;
  }

  async get(): Promise<Prison[]> {
    const prisons = await this.prisonRepo.get();
    return prisons;
  }
}
