import { Request, Response, NextFunction } from "express";
import { CellService } from "../../app/services/cell.service";
import { Cell } from "../../domain/entities/cell.entity";
import { CreateReqDto } from "../../app/Dto's/CellDto/CreateReqDto.";
import { CreateResDto } from "../../app/Dto's/CellDto/CreateResDto";
import { UpdateReqDto } from "../../app/Dto's/CellDto/UpdateReqDto";
import { UpdateResDto } from "../../app/Dto's/CellDto/UpdateResDto";
import { GetResDto } from "../../app/Dto's/CellDto/GetResDto";

export class CellController {
  constructor(private cellService: CellService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cellData: CreateReqDto = req.body;
      const cell: CreateResDto = await this.cellService.create(cellData);

      res.status(201).json(cell);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error: Cell was not created" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cellToUpdate: UpdateReqDto = req.body;

      const updatedCell: UpdateResDto | null = await this.cellService.update(
        cellToUpdate
      );
      if (!updatedCell) {
        res.status(400).json({ error: "Cell not found or update failed." });
        return;
      }

      res.status(200).json(updatedCell);
    } catch (error) {
      console.error("Update Cell Error:", error); // Optional: log for debugging
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
      const cells: GetResDto[] = await this.cellService.getAll();

      if (cells.length === 0) {
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
      const id: string | null = req.params.id;
      if (!id) {
        res.status(400).json({ error: "Cell ID is required." });
        return;
      }

      const cell: GetResDto = await this.cellService.getCellById(id);
      res.status(200).json(cell);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error while fetching cell" });
    }
  }
}
