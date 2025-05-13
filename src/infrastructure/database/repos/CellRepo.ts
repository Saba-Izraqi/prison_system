import { Cell } from "../../../domain/entities/cell.entity";
import { ICellRepo } from "../../../domain/IRepos/ICellRepo";
import { AppDataSource } from "../data-source";
import { ILike } from "typeorm";

export class CellRepo implements ICellRepo {
  private repo = AppDataSource.getRepository(Cell);

  async create(cellData: Cell): Promise<Cell> {
    try {
      const cell: Cell = this.repo.create(cellData);
      return await this.repo.save(cell);
    } catch (error) {
      console.error("Error creating cell:", error);
      throw new Error("Failed to create cell");
    }
  }

  async update(cell: Partial<Cell>): Promise<Cell | null> {
    try {
      const existing: Cell | null = await this.repo.findOneBy({ id: cell.id });
      if (!existing) return null;

      const updated: Cell = this.repo.merge(existing, cell);
      return await this.repo.save(updated);
    } catch (error) {
      console.error("Error updating cell:", error);
      throw new Error("Failed to update cell");
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      let result = await this.repo.delete(id);
      return result.affected !== 0;
    } catch (error) {
      console.error("Error deleting cell:", error);
      throw new Error("Failed to delete cell");
    }
  }

  async getAll(): Promise<Cell[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      console.error("Error fetching all cells:", error);
      throw new Error("Failed to fetch cells");
    }
  }

  async getById(id: string): Promise<Cell | null> {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      console.error("Error fetching cell by ID:", error);
      throw new Error("Failed to fetch cell");
    }
  }
}
