import { ICellRepo } from "../../domain/IRepos/ICellRepo";
import {Cell} from "../../domain/entities/cell.entity"
export class CellService {
  constructor(private cellRepo: ICellRepo) {}
  
  async create(cellData:Partial<Cell>){
    return await this.cellRepo.create(cellData);
  }
  async update(cellData:Partial<Cell>){
    return await this.cellRepo.update(cellData);
  }
  async delete(id:string){
    return await this.cellRepo.delete(id);
  }
  async getAll(){
    return await this.cellRepo.getAll();
  }
  async getCellById(id:string){
    return await this.cellRepo.getById(id);
  }
}
