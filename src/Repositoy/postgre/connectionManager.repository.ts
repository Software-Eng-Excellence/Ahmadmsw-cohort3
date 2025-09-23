import config from "../../config";
import { Pool, PoolClient } from "pg";
import { DatabaseException } from "../../util/Exceptions/RepositoryExceptions";
import logger from "../../util/logger";

export class ConnectionManager {
    private static pool: Pool | null = null;
    private constructor() { }

    public static async getConnection(): Promise<PoolClient> {
        if (this.pool === null) {
            try {
                const connectionString = config.postgreSQL.connectionString;
                this.pool = new Pool({ connectionString });

            }
            catch (error: any) {
                logger.error("Failed to initialize pool %o", error);
                throw new DatabaseException("Failed to initialize pool" +  error);
            }
        }

        try {
            const instance = await this.pool.connect();
            logger.info("Connected to database successfully");
            return instance;
        } catch (error : any) {
            logger.error("Failed to connect to database %o", error);
            throw new DatabaseException("Failed to connect to database " + error);
        }
    }
}