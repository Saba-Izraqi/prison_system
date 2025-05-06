import { IOfficerRepo } from "../../domain/Repos/IOfficerRepo";
import { Officer } from "../../domain/entities/officer.entity";
import { AppDataSource } from "../database/data-source";
import { Repository } from "typeorm";
import {getCustomError} from "../database/utils/handleDBError"; 
export class OfficerRepository implements IOfficerRepo {
    private repo: Repository<Officer>;

    constructor() {
        this.repo = AppDataSource.getRepository(Officer);
    }

    async create(officer: Officer): Promise<Officer> {
        try {
            console.log("Officer data:", officer);
            const newOfficer = this.repo.create(officer);
            return await this.repo.save(newOfficer);
        } catch (error : Error | any) {
           throw getCustomError(error);
        }
    };
}
    // async findByUsername(username: string): Promise<Officer | null> {
    //     return await this.repo.findOne({ where: { username } });
    // };

    // async update(officerId: string, updateDate: Partial<Officer>): Promise<Officer | null> {
    //     await this.repo.update(officerId, updateDate);
    //     return await this.repo.findOne({ where: { id: officerId } });
    // };

    // async delete(id: string): Promise<boolean> {
    //     const result = await this.repo.delete(id);
    //     return result.affected !== 0;
    // };


/**
 * Ctrl + Shift + P 
 * TypeScript: Restart TS Server
 */