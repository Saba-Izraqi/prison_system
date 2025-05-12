import {Router} from 'express';

export abstract class BaseRoute {
    public router: Router;
    public abstract path: string;

    constructor() {
        this.router = Router();
        this.initializeController();
        this.initializeRoutes();
    }

    protected abstract initializeController(): void;
    protected abstract initializeRoutes(): void;
}