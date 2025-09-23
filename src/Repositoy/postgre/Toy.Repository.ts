import {Database} from 'sqlite3';
import { open } from 'sqlite';
import config from "../../config/index";
import logger from "../../util/logger";
import { Initialzable } from "../IRepository";
import { InitialzableRepository } from "../IRepository";
import {IdentifiableToy} from "../../models/toy.model"
import {ConnectionManager} from "./connectionManager.repository"
import {ItemWithId} from "../../models/item.model"
import {DatabaseException, ItemNotFoundException} from "../../util/Exceptions/RepositoryExceptions"
import {ItemCategoty } from "../../models/item.model"
import {SQLITEToyMapper,ISQLITEToy} from "../../mappers/Toy.mapper"

const table_name = ItemCategoty.TOY ;
const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS ${table_name} (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        ageGroup TEXT NOT NULL,
        brand TEXT NOT NULL,
        material TEXT NOT NULL,
        batteryRequired TEXT NOT NULL,
        educational TEXT NOT NULL
    )`;

const INSERT_TOY = `insert into ${table_name} (
    id, type, ageGroup, brand, material, batteryRequired, educational
    ) values ($1,$2,$3,$4,$5,$6,$7)`;

const SELECT_BY_ID = `SELECT * FROM ${table_name} WHERE id = $1`;

const SELECT_ALL = `SELECT * FROM ${table_name}`;

const DELETE_ID = `DELETE FROM ${table_name} WHERE id = $1`;

const UPDATE_TOY = `UPDATE ${table_name} SET
    type = $2,
    ageGroup = $3,
    brand = $4,
    material = $5,
    batteryRequired = $6,
    educational = $7
    WHERE id = $1`;





export class ToyRepository implements InitialzableRepository<IdentifiableToy> {

   
       async init(): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.query(CREATE_TABLE);
            logger.info('Database initialized and table created if not exists cake');
        }catch (error) {
            logger.error(`Database initialization failed: ${error}`);
            throw error;
        }
    }

    async getAll(): Promise<IdentifiableToy[]> {
        try {
        const conn = await ConnectionManager.getConnection();
        const result = await conn.query(SELECT_ALL);
        
        if(!result){
            throw new DatabaseException("no Toys")
        }
        const rows : ISQLITEToy[] = result.rows;
        const mapper = new SQLITEToyMapper()  ;

        return rows.map((item)=> mapper.map(item))
        }catch(error : unknown)
        {
            logger.error("Fail to get Toy of id : %s error : %o ",error as Error);
            throw new DatabaseException("Failed to get Toys");
        }
    }
    async getById(id: string): Promise<IdentifiableToy> {
        try {
        const conn = await ConnectionManager.getConnection();
        const x = await conn.query(SELECT_BY_ID,[id]);
        if(!x){
            throw new ItemNotFoundException("toy not found of id "+ id);
        }
        const row : ISQLITEToy = x.rows[0];
        const result = new SQLITEToyMapper().map(row);
        return result
        }catch(error : unknown)
        {
            logger.error("Fail to get Toy of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to get Toy of Id "+id)
        }
    }
    async create(item: IdentifiableToy): Promise<string> { //create toy order
        try {
                    const conn = await ConnectionManager.getConnection()
        
            await conn.query(
                INSERT_TOY,
                [
                    item.getId(),
                    item.getType(),
                    item.getAgeGroup(),
                    item.getBrand(),
                    item.getMaterial(),
                    item.getBatteryRequired(),
                    item.getEducational(),
                    
                    

                ]
            );

       logger.info("success Create From Toy")
        return item.getId();
            
        } catch (error) {
            logger.error("Create Toy error happens here %o", error as Error);
            throw new DatabaseException("Toy create : Error happens here " );
        }

    }
    async update(item: IdentifiableToy): Promise<void> {
        try {
        const conn = await ConnectionManager.getConnection();
             await conn.query(UPDATE_TOY, [
                    item.getId(),
                    item.getType(),
                    item.getAgeGroup(),
                    item.getBrand(),
                    item.getMaterial(),
                    item.getBatteryRequired(),
                    item.getEducational(),
            ]);
        logger.info("Toy Updated");
        }catch(error : unknown)
        {
            logger.error("Fail to Update Toy of id : %s error : %o ", item.getId(),error as Error);
            throw new DatabaseException("Failed to Update Toy of Id "+item.getId())
        }
    }




    async delete(id: string): Promise<void> {
              try {
        const conn = await ConnectionManager.getConnection();
         await conn.query(DELETE_ID,[id]);
        logger.info("Book Deleted")
       
       
        }catch(error : unknown)
        {
            logger.error("Fail to Delete Book of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to Delete Book of Id "+id)
        }
    }

}