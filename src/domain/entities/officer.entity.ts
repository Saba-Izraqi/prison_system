import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from './base.entity';       
import {Prison} from './prison.entity';

export enum OfficerRole {
    PRISON_WARDEN = 'prison_warden',
    SECURITY_OFFICER = 'security_officer',
    ADDMINISTRATIVE_OFFICER = 'administrative_officer',
}

export enum Shift {
    MORNING = 'morning',
    EVENING = 'evening',
    NIGHT = 'night',
  }
  

@Entity('officers')
export class Officer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({type: 'varchar', length: 255})
    name!: string;
    
    @Column({ type: 'varchar', length: 255, unique: true })
    username!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'enum', enum: Shift})
    shift!: Shift;

    @Column({type: 'enum',enum: OfficerRole})
    role!: OfficerRole;

    @ManyToOne(() => Prison, prison => prison.officers)
    @JoinColumn({ name: 'prison_id' })
    prison!: Prison;
}