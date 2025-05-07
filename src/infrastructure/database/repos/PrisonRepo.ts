import { Prison } from "../../../domain/entities/prison.entity";
import { IPrisonRepo } from "../../../domain/IRepos/IPrisonRepo";
import { AppDataSource } from "../data-source";
import { ILike } from 'typeorm';
export class PrisonRepo implements IPrisonRepo {
  private repo = AppDataSource.getRepository(Prison);

  async create(prisonData: Partial<Prison>): Promise<Prison> {
    const prison = this.repo.create(prisonData);
    return this.repo.save(prison);
  }
  async getByName(key: string): Promise<Prison[]> {
    return this.repo.find({
        where: { name: ILike(`%${key}%`) }
    });
}
}