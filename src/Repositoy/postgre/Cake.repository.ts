import {Database} from 'sqlite3';
import { open } from 'sqlite';
import config from "../../config/index";
import logger from "../../util/logger";
import { Initialzable } from "../IRepository";
import { InitialzableRepository } from "../IRepository";
import {IdentifiableCake} from "../../models/cake.model"
import {ConnectionManager} from "./connectionManager.repository"
import {ItemWithId} from "../../models/item.model"
import {DatabaseException, ItemNotFoundException} from "../../util/Exceptions/RepositoryExceptions"
import {ItemCategoty } from "../../models/item.model"
import {SQLITECakeMapper,SQLiteCake} from "../../mappers/Cake.mapper"

const table_name = ItemCategoty.CAKE ;
const CREATE_TABLE = `
        CREATE TABLE IF NOT EXISTS ${table_name} (
            id TEXT PRIMARY KEY,
            type TEXT NOT NULL,
            flavor TEXT NOT NULL,
            filling TEXT NOT NULL,
            size INTEGER NOT NULL,
            layers INTEGER NOT NULL,
            frostingType TEXT NOT NULL,
            frostingFlavor TEXT NOT NULL,
            decorationType TEXT NOT NULL,
            decorationColor TEXT NOT NULL,
            customMessage TEXT NOT NULL,
            shape TEXT NOT NULL,
            allergies TEXT NOT NULL,
            specialIngredients TEXT NOT NULL,
            packagingType TEXT NOT NULL
        )`
const INSERT_CAKE = `insert into ${table_name} (
        id, type, flavor, filling, size, layers, frostingType, frostingFlavor, decorationType, decorationColor, customMessage, shape, allergies, specialIngredients, packagingType
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`;
   const SELECT_BY_ID = `SELECT * FROM ${table_name} WHERE id = $1`

const SELECT_ALL = `SELECT * FROM ${table_name}`

    const DELETE_ID = `DELETE  FROM ${table_name} WHERE id = $1`

const UPDATE_CAKE = `update ${table_name} set type = $1, flavor = $2, filling = $3, size = $4, layers = $5, frostingType = $6, frostingFlavor = $7, decorationType = $8, decorationColor = $9, customMessage = $10, shape = $11, allergies = $12, specialIngredients = $13, packagingType = $14 where id = $15`;





export class CakeRepository implements InitialzableRepository<IdentifiableCake> {

   
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

    async getAll(): Promise<IdentifiableCake[]> {
        try {
        const conn = await ConnectionManager.getConnection();
        const result = await conn.query(SELECT_ALL);
        
        if(!result){
            throw new DatabaseException("no Cakes")
        }
        const rows : SQLiteCake[] = result.rows;
        const mapper = new SQLITECakeMapper()  ;

        return rows.map((item)=> mapper.map(item))
        }catch(error : unknown)
        {
            logger.error("Fail to get Cake of id : %s error : %o ",error as Error);
            throw new DatabaseException("Failed to get Cakes");
        }
    }
    async getById(id: string): Promise<IdentifiableCake> {
        try {
        const conn = await ConnectionManager.getConnection();
        const x = await conn.query(SELECT_BY_ID,[id]);
        if(!x){
            throw new ItemNotFoundException("cake not found of id "+ id);
        }
        const row : SQLiteCake = x.rows[0];
        const result = new SQLITECakeMapper().map(row);
        return result
        }catch(error : unknown)
        {
            logger.error("Fail to get Cake of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to get Cake of Id "+id)
        }
    }
    async create(item: IdentifiableCake): Promise<string> { //create cake order
        try {
                    const conn = await ConnectionManager.getConnection()
        
            await conn.query(
            INSERT_CAKE,
            [
                item.getId(),
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType()
            ],
    
            );

       logger.info("success Create From Cake")
        return item.getId();
            
        } catch (error) {
            logger.error("Create Cake error happens here %o", error as Error);
            throw new DatabaseException("Cake create : Error happens here " );
        }

    }
    async update(item: IdentifiableCake): Promise<void> {
        try {
        const conn = await ConnectionManager.getConnection();
             await conn.query(UPDATE_CAKE, [
                item.getType(),
                item.getFlavor(),
                item.getFilling(),
                item.getSize(),
                item.getLayers(),
                item.getFrostingType(),
                item.getFrostingFlavor(),
                item.getDecorationType(),
                item.getDecorationColor(),
                item.getCustomMessage(),
                item.getShape(),
                item.getAllergies(),
                item.getSpecialIngredients(),
                item.getPackagingType(),
                item.getId()
            ]);

        logger.info("Cake Updated");
        
       
       
        }catch(error : unknown)
        {
            logger.error("Fail to Update Cake of id : %s error : %o ", item.getId(),error as Error);
            throw new DatabaseException("Failed to Update Cake of Id "+item.getId())
        }
    }
    async delete(id: string): Promise<void> {
              try {
        const conn = await ConnectionManager.getConnection();
         await conn.query(DELETE_ID,[id]);
        logger.info("Cake Deleted")
       
       
        }catch(error : unknown)
        {
            logger.error("Fail to Delete Cake of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to Delete Cake of Id "+id)
        }
    }

}