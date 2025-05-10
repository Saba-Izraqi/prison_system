import {Prison} from '../entities/prison.entity';
export interface IPrisonRepo {
 create(prisonData: Partial<Prison>):Promise<Prison>;
 getByName(key: string): Promise<Prison[]>;
}