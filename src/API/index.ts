import express, { Application } from "express";

export class AppServer {
    public app: Application;
    constructor() {
        this.app = express();
        this.setupMiddleware();
    }

    private setupMiddleware() {
        this.app.use(express.json());
    }
    
    public async listen(port: number) {
        this.app.listen(port, () => {
            console.info(`🚀 Server is running on http://localhost:${port}`);
        });
    }
}