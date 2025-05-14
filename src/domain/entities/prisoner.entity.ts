import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { Prison } from "./prison.entity";
import { Cell } from "./cell.entity";

@Entity("prisoners")
@Unique(["number", "prison"])
export class Prisoner extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  number!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  crime!: string;

  @Column({ type: "date" })
  entryDate!: Date;

  @Column({ type: "int" })
  duration!: number;

  @Column({ default: false })
  isReleased?: boolean;

  @Column({ type: "date", nullable: true })
  releaseDate?: Date;

  @ManyToOne(() => Prison, (prison) => prison.prisoners)
  @JoinColumn({ name: "prison_id" })
  prison!: Prison;

  @ManyToOne(() => Cell, (cell) => cell.prisoners)
  @JoinColumn({ name: "cell_id" })
  cell!: Cell;
}
