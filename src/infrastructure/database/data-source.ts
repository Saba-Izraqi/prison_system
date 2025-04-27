import "dotenv/config"; 
import { DataSource } from "typeorm";
import { Prison } from "../../domain/entities/prison.entity";           
import { Prisoner } from "../../domain/entities/prisoner.entity";
import { Officer } from "../../domain/entities/officer.entity"; 
import { Cell } from "../../domain/entities/cell.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "prison_system",
    synchronize: process.env.TYPEORM_SYNC === "true",         //true for development, false for production
    logging: ['error', 'warn'], //logging: true, // true for production
    entities: [
        Prison, 
        Prisoner, 
        Officer, 
        Cell
    ],
});

