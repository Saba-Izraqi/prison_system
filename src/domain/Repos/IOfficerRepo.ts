import { Officer } from "../entities/officer.entity";

export interface IOfficerRepo {
  create(officer: Officer): any;
  findByUsername(username: string): any;
  update(officerId: string, updateData: Partial<Officer>): any;
  delete(id: string): any;
}
