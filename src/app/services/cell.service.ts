import { instanceToPlain, plainToInstance } from "class-transformer";
import { ICellRepo } from "../../domain/IRepos/ICellRepo";
import { Cell } from "../../domain/entities/cell.entity";
import { CreateReqDto } from "../Dto's/CellDto/CreateReqDto.";
import { CreateResDto } from "../Dto's/CellDto/CreateResDto";
import { validate } from "class-validator";
import { UpdateReqDto } from "../Dto's/CellDto/UpdateReqDto";
import { UpdateResDto } from "../Dto's/CellDto/UpdateResDto";
import { GetResDto } from "../Dto's/CellDto/GetResDto";

export class CellService {
  constructor(private cellRepo: ICellRepo) {}

  async create(cellData: CreateReqDto): Promise<CreateResDto> {
    const errors = await validate(cellData);
    if (errors.length > 0) throw new Error("Validation failed");

    const cell = await this.cellRepo.create(plainToInstance(Cell, cellData));
    if (!cell) throw new Error("Failed to create cell");

    return plainToInstance(CreateResDto, cell);
  }
  async update(cellData: UpdateReqDto): Promise<UpdateResDto | null> {
    const errors = await validate(cellData);
    if (errors.length > 0) throw new Error("Validation failed");

    const existingCell = await this.cellRepo.getById(cellData.id);
    if (existingCell) return null;

    const cell = await this.cellRepo.update(plainToInstance(Cell, cellData));
    if (!cell) throw new Error("Failed to update cell");

    return plainToInstance(UpdateResDto, cell);
  }
  async delete(id: string): Promise<boolean> {
    const cell = await this.cellRepo.getById(id);
    if (!cell) return false;

    const isDeleted = await this.cellRepo.delete(id);
    if (!isDeleted) throw new Error("Failed to delete cell");

    return true;
  }
  async getAll(): Promise<GetResDto[]> {
    const cells = await this.cellRepo.getAll();

    if (!cells) throw new Error("Failed to fetch cells");

    const cellDtos = plainToInstance(GetResDto, cells, {
      excludeExtraneousValues: true,
    });

    return cellDtos;
  }
  async getCellById(id: string): Promise<GetResDto> {
    const cell = await this.cellRepo.getById(id);
    if (!cell) throw new Error("Cell not found");

    const cellDto = plainToInstance(GetResDto, cell);
    return cellDto;
  }
}
