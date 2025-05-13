import {
  IsString,
  IsNumber,
  IsOptional,
} from "class-validator";
import { Officer } from "../entities/officer.entity";

export class PostPrisonDTO {
  @IsString()
  name!: string;

  @IsString()
  location!: string;

  @IsNumber()
  capacity!: number;
}

export class UpdatePrisonDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsNumber()
  currentOccupancy?: number;
}
//@optional() decorator to support partial updates

export class GetPrisonDTO {
  id!: string;

  name!: string;

  location!: string;

  capacity!: number;

  currentOccupancy!: number;

  warden?: Officer;
}
