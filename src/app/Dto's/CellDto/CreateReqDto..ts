import { IsNumber, IsString, Length } from "class-validator";

export class CreateReqDto {
  @IsNumber()
  number!: number;
  @IsString()
  @Length(255)
  floor!: string;
  @IsNumber()
  capacity!: number;
  @IsNumber()
  currentOccupancy?: number;
}
