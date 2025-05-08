import { Officer } from "../entities/officer.entity";

export interface IOfficerRepo {
  create(officer: Partial<Officer>): Promise<Officer>;
}
