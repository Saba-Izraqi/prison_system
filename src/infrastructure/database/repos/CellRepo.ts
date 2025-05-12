import { Cell } from "../../../domain/entities/cell.entity";
import { ICellRepo } from "../../../domain/IRepos/ICellRepo";
import { AppDataSource } from "../data-source";
import { ILike } from "typeorm";

export class CellRepo implements ICellRepo {
  private repo = AppDataSource.getRepository(Cell);

  async create(cellData: Partial<Cell>): Promise<Cell> {
    const cell:Cell = this.repo.create(cellData);
    return await this.repo.save(cell);
  }

  async update(cell: Partial<Cell>): Promise<Cell | null> {
    if (!cell.id) return null;

    const existing = await this.repo.findOneBy({ id: cell.id });
    if (!existing) return null;

    const updated = this.repo.merge(existing, cell);
    return await this.repo.save(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }

  async getAll(): Promise<Cell[]> {
    return await this.repo.find();
  }

  async getById(id: string): Promise<Cell | null> {
    return await this.repo.findOneBy({ id });
  }
}
