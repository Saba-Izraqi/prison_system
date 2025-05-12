import { Request, Response, NextFunction } from "express";
import { CellService } from "../../app/services/cell.service";
import { Cell } from "../../domain/entities/cell.entity";

export class CellController {
  constructor(private cellService: CellService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const cellData: Partial<Cell> = req.body;
      const cell = await this.cellService.create(cellData);
      if (!cell) throw new Error("Failed to create cell");
      res.status(201).json(cell);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error: Cell was not created" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const cellToUpdate: Partial<Cell> = req.body;

      if (!cellToUpdate || !cellToUpdate.id) {
        res
          .status(400)
          .json({ error: "Please provide a valid Cell with an ID to update." });
        return;
      }

      const updatedCell = await this.cellService.update(cellToUpdate);

      if (!updatedCell) {
        res.status(404).json({ error: "Cell not found or update failed." });
        return;
      }

      res.status(200).json(updatedCell);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error while updating Cell" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "Cell ID is required." });
        return;
      }

      const isDeleted = await this.cellService.delete(id);

      if (!isDeleted) {
        res.status(404).json({ error: `Cell with ID ${id} not found.` });
        return;
      }

      res
        .status(200)
        .json({ message: `Cell with ID ${id} has been deleted successfully.` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error during deletion" });
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cells = await this.cellService.getAll();

      if (!cells || cells.length === 0) {
        res.status(404).json({ error: "No cells found." });
        return;
      }

      res.status(200).json(cells);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error while fetching cells" });
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: "Cell ID is required." });
        return;
      }

      const cell = await this.cellService.getCellById(id);

      if (!cell) {
        res.status(404).json({ error: `Cell with ID ${id} not found.` });
        return;
      }

      res.status(200).json(cell);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error while fetching cell" });
    }
  }
}
