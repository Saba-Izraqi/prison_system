import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  Unique,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { Prisoner } from "./prisoner.entity";
import { Cell } from "./cell.entity";
import { Officer } from "./officer.entity";

@Entity("prisons")
@Unique(["name", "deletedAt"])
export class Prison extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  location!: string;

  @Column({ type: "int" })
  capacity!: number;

  @OneToMany(() => Prisoner, (prisoner) => prisoner.prison)
  prisoners!: Prisoner[];

  @OneToMany(() => Cell, (cell) => cell.prison)
  cells!: Cell[];

  @OneToMany(() => Officer, (officer) => officer.prison)
  officers!: Officer[];

  //TODO: Make it nullable. add a column and join it with this
  @ManyToOne(() => Officer, (officer) => officer.id)
  warden!: Officer;
}
