import { CellService } from "../../app/services/cell.service";
import { CellController } from "../controllers/cell.controller";
import { BaseRoute } from "./base.route";
import { CellRepo } from "../../infrastructure/database/repos/CellRepo";

export class CellRoute extends BaseRoute {
  public path = "/cells";
  private controller!: CellController;

  protected initializeController(): void {
    const repo = new CellRepo();
    const service= new CellService(repo);
    this.controller= new CellController(service);
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
