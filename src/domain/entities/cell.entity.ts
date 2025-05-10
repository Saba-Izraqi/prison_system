import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { Prison } from "./prison.entity";
import { Prisoner } from "./prisoner.entity";
import { Officer } from "./officer.entity";

@Entity('cells')
@Unique(['number', 'prison'])
export class Cell extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int", unique: true })
  the_number!: number;

  @Column({ type: "varchar", length: 255 })
  the_floor!: string;

  @Column({ type: "int" })
  the_capacity!: number;

  @Column({ type: "int", default: 0 })
  the_currentOccupancy!: number;

  @ManyToOne(() => Prison, (prison) => prison.cells)
  @JoinColumn({ name: "prison_id" })
  prison!: Prison;

  @OneToMany(() => Prisoner, (prisoner) => prisoner.cell)
  prisoners!: Prisoner[];

  @ManyToOne(() => Officer, (officer) => officer.cells)
  @JoinColumn({ name: "officer_id" })
  officer!: Officer;
}
