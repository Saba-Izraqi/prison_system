import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from './base.entity';
import {Prison} from './prison.entity';
import {Cell} from './cell.entity';
import { Officer } from './officer.entity';

@Entity('prisoners')
export class Prisoner extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({type: 'varchar', length: 255})
    name!: string;
    
    @Column({type: 'varchar', length: 255})
    crime!: string;
    
    @Column({type: 'date'})
    entryDate!: Date;

    @Column({type: 'int'})
    duration!: number;

    @Column({ default: false })
    isReleased?: boolean;

    @Column( {type: 'date', nullable: true})
    releaseDate?: Date;
     
    @ManyToOne(() => Prison, prison => prison.prisoners)
    @JoinColumn({ name: 'prison_id' })
    prison!: Prison;
    
    @ManyToOne(() => Cell, cell => cell.prisoners)
    @JoinColumn({ name: 'cell_id' })
    cell!: Cell;

    @ManyToOne(() => Officer, officer => officer.createdPrisoners)
    @JoinColumn({ name: 'created_by_officer_id' })
    createdByOfficer!: Officer;

    @ManyToOne(() => Officer)
    @JoinColumn({ name: 'updated_by_officer_id' })
    updatedByOfficer?: Officer;

    @ManyToOne(() => Officer)
    @JoinColumn({ name: 'deleted_by_officer_id' })
    deletedByOfficer?: Officer;
}