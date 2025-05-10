import { Officer } from "../../domain/entities/officer.entity";
import { IOfficerRepo } from "../../domain/IRepos/IOfficerRepo";
import { OfficerRole } from "../../domain/enums";

export class OfficerService {
  constructor(private officerRepo: IOfficerRepo) {}

  async create(officerData: Partial<Officer>): Promise<Officer> {
    if (officerData.role === OfficerRole.PRISON_WARDEN) {
      throw new Error("Cannot create officer with role 'prison_warden'");
    }

    return await this.officerRepo.create(officerData);
  }

  test() {
    console.log('test');
  }

  conflict() {
    console.log('conflict')
  }
}
