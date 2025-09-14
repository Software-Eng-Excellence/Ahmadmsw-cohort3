import {Database} from 'sqlite3';
import { open } from 'sqlite';
import config from "../../config/index";
import logger from "../../util/logger";
import { Initialzable } from "../IRepository";
import { InitialzableRepository } from "../IRepository";
import {IdentifiableCake} from "../../models/cake.model"
import {ConnectionManager} from "./ConnectionManager.repository"
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
const INSERT_CAKE = `
    INSERT INTO ${table_name} (
        id,
        type,
        flavor,
        filling,
        size,
        layers,
        frostingType,
        frostingFlavor,
        decorationType,
        decorationColor,
        customMessage,
        shape,
        allergies,
        specialIngredients,
        packagingType
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
const SELECT_BY_ID = `SELECT * FROM ${table_name} WHERE id = ?`;

const SELECT_ALL = `SELECT * FROM ${table_name}`




export class CakeRepository implements InitialzableRepository<IdentifiableCake> {

   
       async init(): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            logger.info('Database initialized and table created if not exists cake');
        }catch (error) {
            logger.error(`Database initialization failed: ${error}`);
            throw error;
        }
    }

    async getAll(): Promise<IdentifiableCake[]> {
        try {
        const conn = await ConnectionManager.getConnection();
        const result = await conn.all<SQLiteCake[]>(SELECT_ALL);
        if(!result){
            throw new DatabaseException("no Cakes")
        }
     
        const mapper = new SQLITECakeMapper()  ;
        
        return result.map((item)=> mapper.map(item))
        }catch(error : unknown)
        {
            logger.error("Fail to get Cake of id : %s error : %o ",error as Error);
            throw new DatabaseException("Failed to get Cakes");
        }
    }
    async getById(id: string): Promise<IdentifiableCake> {
        try {
        const conn = await ConnectionManager.getConnection();
        const x = await conn.get<SQLiteCake>(SELECT_BY_ID,id);
        if(!x){
            throw new ItemNotFoundException("cake not found of id "+ id);
        }
        const result = new SQLITECakeMapper().map(x)  ;
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
        
            await conn.run(
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
             
       logger.info("succes From Cake")
        return item.getId();
            
        } catch (error) {
            logger.error("Create Cake error happens here %o", error as Error);
            throw new DatabaseException("Cake create : Error happens here " );
        }

    }
    update(item: ItemWithId): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

}