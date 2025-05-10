import { Request, Response } from "express";
import { OfficerRepository } from "../../infrastructure/database/repos/officerRepository";
import { OfficerRole, Shift } from "../../domain/enums";
import bcrypt from "bcrypt";
import { UserError, ServerError } from "../../app/utils/CustomErrors";
import { OfficerService } from "../../app/services/officer.service";

export class OfficerController {
  private service: OfficerService;

  constructor() {
    const repo = new OfficerRepository();
    this.service = new OfficerService(repo);
  }

  public createOfficer = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { name, username, password, role, shift, assignedPrisonId } =
        req.body;

      const requiredFields = [
        name,
        username,
        password,
        role,
        shift,
        assignedPrisonId,
      ];
      for (const feild of requiredFields) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (!Object.values(OfficerRole).includes(role)) {
        return res.status(400).json({ message: "Invalid officer role" });
      }

      if (!Object.values(Shift).includes(shift)) {
        return res.status(400).json({ message: "Invalid shift" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const officerData = {
        name,
        username,
        password: hashedPassword,
        role,
        shift,
        assignedPrisonId,
      };

      const createdOfficer = await this.service.create(officerData);

      return res.status(201).json({
        message: "Officer created successfully",
        data: createdOfficer,
      });
    } catch (error) {
      if (error instanceof UserError || error instanceof ServerError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }
      console.error("unexpected error:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
