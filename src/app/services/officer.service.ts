import { Officer } from "../../domain/entities/officer.entity";
import { IOfficerRepo } from "../../domain/Repos/IOfficerRepo";
import { OfficerRole } from "../../domain/enums";

export class OfficerService {
    constructor(private officerRepo: IOfficerRepo) {}

    
  async execute(officerData: Officer): Promise<Officer> {
    if (officerData.role === OfficerRole.PRISON_WARDEN) {
        throw new Error("Cannot create officer with role 'prison_warden'");
      }  

      const exists = await this.officerRepo.findByUsername(officerData.username);
      if (exists) {
        throw new Error("Username already exists");
      }

      return await this.officerRepo.create(officerData);
    }
  }