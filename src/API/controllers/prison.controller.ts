import { Request, Response, NextFunction } from "express";
import { PrisonService } from "../../app/services/prison.service";

export class PrisonController {
  constructor(private prisonService: PrisonService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const prisonData = { ...req.body };
      const prison = await this.prisonService.create(prisonData);
      res.status(201).json(prison);
    } catch (error) {
      // next(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params.key;
      const prisons = await this.prisonService.getByName(key);
      res.status(200).json(prisons);
      return;
    } catch (error) {
      // next(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
