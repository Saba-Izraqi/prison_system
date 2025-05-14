import {
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from "class-validator";
import { CreateResDto } from "./CreateResDto";
import { Expose } from "class-transformer";

export class GetResDto {
  @IsUUID()
  @Expose()
  id!: string;

  @IsNumber()
  @Expose()
  number!: number;

  @IsString()
  @Length(1, 255)
  @Expose()
  floor!: string;

  @IsNumber()
  @Expose()
  capacity!: number;

  @IsNumber()
  @Expose()
  currentOccupancy!: number;

  @IsDateString()
  @Expose()
  createdAt!: Date;

  @IsDateString()
  @Expose()
  updatedAt!: Date;

  
}
