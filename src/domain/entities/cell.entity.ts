import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';  
import {BaseEntity} from './base.entity';
import {Prison} from './prison.entity';
import {Prisoner} from './prisoner.entity';

@Entity('cells')
export class Cell extends BaseEntity {  
    @PrimaryGeneratedColumn('uuid')
    id!: string;  
    

    @Column({type: 'int'})
    capacity!: number;
    
    @Column({ type: 'boolean', default: false })
    isIsolated!: boolean; 

    @Column({type: 'int', default: 0})
    currentOccupancy!: number;

     
    @ManyToOne(() => Prison, prison => prison.cells)
    @JoinColumn({ name: 'prison_id' })
    prison!: Prison;
    
    @OneToMany(() => Prisoner, prisoner => prisoner.cell)
    
    prisoners!: Prisoner[];
}