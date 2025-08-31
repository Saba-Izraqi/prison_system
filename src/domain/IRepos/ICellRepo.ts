import { Cell } from "../entities/cell.entity";
export interface ICellRepo {
  create(Cell: Partial<Cell>): Promise<Cell>;
  update(Cell: Partial<Cell>): Promise<Cell | null>;
  delete(id: string): Promise<boolean>;
  getAll(): Promise<Cell[]>;
  getById(id: string): Promise<Cell | null>;
}
