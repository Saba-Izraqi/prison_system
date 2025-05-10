import { BaseRoute } from "./base.route";
import { PrisonController } from "../controllers/prison.controller";
import { PrisonService } from "../../app/services/prison.service";
import { PrisonRepo } from "../../infrastructure/database/repos/PrisonRepo";

export class PrisonRoute extends BaseRoute {
  public path = "/prisons";
  private prisonController!: PrisonController;

  protected initializeController(): void {
    const prisonRepo = new PrisonRepo();
    const prisonService = new PrisonService(prisonRepo);
    this.prisonController = new PrisonController(prisonService);
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/",
      this.prisonController.create.bind(this.prisonController)
    );
    this.router.get(
      "/:key",
      this.prisonController.getByName.bind(this.prisonController)
    );
  }
}
