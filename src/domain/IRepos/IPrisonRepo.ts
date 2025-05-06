import {Prison} from '../entities/prison.entity';
export interface IPrisonRepo {
    create(prison: Prison): any;
    update(prisonId: string, wardenId: string): any;

}