import {
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class CreateResDto {
  @IsString()
  @IsUUID()
  id!: string;

  @IsNumber()
  number!: number;

  @IsString()
  @Length(255)
  floor!: string;

  @IsNumber()
  capacity!: number;

  @IsNumber()
  currentOccupancy?: number;

  @IsDateString()
  createdAt!: Date;
  @IsDateString()
  updatedAt!: Date;

  deletedAt?: Date | null;
}
