import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';  
import {BaseEntity} from './base.entity';
import {Prisoner} from './prisoner.entity';
import {Cell} from './cell.entity';
import {Officer} from './officer.entity';

@Entity('prisons')
export class Prison extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({type: 'varchar', length: 255})
    name!: string;
    
    @Column({type: 'varchar', length: 255})
    location!: string;
    
    @Column({type: 'int'})
    capacity!: number;

    @Column({type: 'int', default: 0})
    currentOccupancy!: number;
    
    @OneToMany(() => Prisoner, prisoner => prisoner.prison)
    prisoners!: Prisoner[];
    
    @OneToMany(() => Cell, cell => cell.prison)
    cells!: Cell[];
    
    @OneToMany(() => Officer, officer => officer.prison)
    officers!: Officer[];
}

