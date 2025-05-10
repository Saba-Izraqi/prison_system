import { IOfficerRepo } from "../../../domain/IRepos/IOfficerRepo";
import { Officer } from "../../../domain/entities/officer.entity";
import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import { getCustomError } from "../../database/utils/handleDBError";

export class OfficerRepository implements IOfficerRepo {
  private repo: Repository<Officer>;

  constructor() {
    this.repo = AppDataSource.getRepository(Officer);
  }

  async create(officer: Partial<Officer>): Promise<Officer> {
    try {
      const newOfficer = this.repo.create(officer);
      return await this.repo.save(newOfficer);
    } catch (error: Error | any) {
      throw getCustomError(error);
    }
  }
}
