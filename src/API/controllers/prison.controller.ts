import { Request, Response, NextFunction } from "express";
import { PrisonService } from "../../app/services/prison.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
  PostPrisonDTO,
  UpdatePrisonDTO,
  GetPrisonDTO,
} from "../../domain/DTOs/prisonDTO";

export class PrisonController {
  constructor(private prisonService: PrisonService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const postDTO = plainToInstance(PostPrisonDTO, req.body);
      const errors = await validate(postDTO);
      if (errors.length) {
        // TODO: 1. update custom error to contains errors array || generate an error message from this array
        // TODO: 2. throw new UserError() with the message to handle that from error middleware
        return res.status(400).json({ errors: errors });
      }
      const prisonData = {
        name: postDTO.name,
        location: postDTO.location,
        capacity: postDTO.capacity,
      };
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
