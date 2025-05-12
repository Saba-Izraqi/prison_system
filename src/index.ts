import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./infrastructure/database/data-source";
import { ensureDatabaseExists } from "./infrastructure/database/init-db";
import { AppServer } from "./API";

(async () => {
  await ensureDatabaseExists({
    dbName: process.env.DB_NAME || "prison_system",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "localhost",
  });
  await AppDataSource.initialize();
  console.log("📦 Database connected and schema synced");
})();

const API = new AppServer();
API.listen(4000);
