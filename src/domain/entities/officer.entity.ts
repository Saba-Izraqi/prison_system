import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { Prison } from "./prison.entity";
import { Cell } from "./cell.entity";
import { Shift, OfficerRole } from "../enums";
import { IsString, MaxLength, MinLength, validate } from "class-validator";

@Entity('officers')
export class Officer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "enum", enum: Shift })
  shift!: Shift;

  @Column({ type: "enum", enum: OfficerRole })
  role!: OfficerRole;

  @ManyToOne(() => Prison, (prison) => prison.officers)
  @JoinColumn({ name: "assignedPrisonId" })
  prison?: Prison;

  @OneToMany(() => Cell, (cell) => cell.officer)
  cells!: Cell[];
}
