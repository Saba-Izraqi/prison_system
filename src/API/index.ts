import express, { Application } from "express";
import { PrisonRoute } from "./routes/prison.route";

export class AppServer {
  public app: Application;
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(express.json());
  }

  private setupRoutes() {
    const routes = [new PrisonRoute()];

    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public async listen(port: number) {
    this.app.listen(port, () => {
      console.info(`🚀 Server is running on http://localhost:${port}`);
    });
  }
}
