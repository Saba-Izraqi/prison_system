import { Client } from "pg";

const DEFAULT_DB = "postgres";

interface IDBConfig {
    dbName: string;
    user: string;
    password: string;
    host?: string;
    port?: number;
}


export const ensureDatabaseExists = async ({
    dbName,
    user,
    password,
    host = "localhost",
    port = 5432,
}: IDBConfig) => {
    const client = new Client({
        user,
        password,
        host,
        port,
        database: DEFAULT_DB,
    });

    try {
        await client.connect();
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`, //sql injection safe
            [dbName]
        );
        if (res.rowCount === 0) {
          console.warn(`📦 Database "${dbName}" not found. Creating...`);
          await client.query(`CREATE DATABASE "${dbName}"`);
          console.log(`✅ Database ${dbName} created successfully.`);
        } else {
          console.info(`✅ Database ${dbName} already exists.`);
        }
    } catch (error) {
        console.error(`❌ Failed to check/create database "${dbName}"`, error);
        throw error; 
    } finally {
        await client.end();
        }
    };