import { CellService } from "../../app/services/cell.service";
import { CellController } from "../controllers/cell.controller";
import { BaseRoute } from "./base.route";
import { CellRepo } from "../../infrastructure/database/repos/CellRepo";

export class CellRoute extends BaseRoute {
  public path = "/cells";
  private cellController!: CellController;

  protected initializeController(): void {
    const cellRepo = new CellRepo();
    const cellService = new CellService(cellRepo);
    this.cellController = new CellController(cellService);
  }

  protected initializeRoutes(): void {
    this.router.post("/", this.cellController.create.bind(this.cellController));
    this.router.put("/", this.cellController.update.bind(this.cellController));
    this.router.delete(
      "/:id",
      this.cellController.delete.bind(this.cellController)
    );
    this.router.get("/", this.cellController.getAll.bind(this.cellController));
    this.router.get(
      "/:id",
      this.cellController.getById.bind(this.cellController)
    );
  }
}
