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

@Entity("cells")
@Unique(["number", "prison"])
export class Cell extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // TODO: Remove the comment below
  @Column({ type: "int" /*, unique: true */ })
  number!: number;

  @Column({ type: "varchar", length: 255 })
  floor!: string;

  @Column({ type: "int" })
  capacity!: number;

  @Column({ type: "int", default: 0 })
  currentOccupancy!: number;

  @ManyToOne(() => Prison, (prison) => prison.cells)
  @JoinColumn({ name: "prison_id" })
  prison!: Prison;

  @OneToMany(() => Prisoner, (prisoner) => prisoner.cell)
  prisoners!: Prisoner[];

  @ManyToOne(() => Officer, (officer) => officer.cells)
  @JoinColumn({ name: "officer_id" })
  officer!: Officer;
}
