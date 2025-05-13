import { PostPrisonDTO } from '../DTOs/prisonDTO';
import {Prison} from '../entities/prison.entity';
export interface IPrisonRepo {
 create(prisonData: PostPrisonDTO):Promise<Prison>;
 getByName(key: string): Promise<Prison[]>;
}