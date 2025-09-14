import logger from "../../util/logger";
import { open } from "sqlite";
import { Database, Statement } from "sqlite3";
import sqlite from "sqlite"
import {DatabaseException} from "../../util/Exceptions/RepositoryExceptions"

import config from "../../config/index";

export class ConnectionManager { 
    
    private static db: sqlite.Database<Database,Statement> | null = null;
    
    private constructor() {}
    public static async getConnection(): Promise<sqlite.Database<Database,Statement>> {
        if (this.db === null) {
            try {
                this.db = await open({
                    filename: config.storagePath.sqlite,
                    driver: Database
            
            })
        }catch (error) {
            logger.error(`Database connection failed: ${error}`);
            throw new DatabaseException(`Database connection failed: ${error}`);
        }
    }
    return this.db;

    }
}

