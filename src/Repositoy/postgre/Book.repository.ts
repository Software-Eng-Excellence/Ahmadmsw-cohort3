
import logger from "../../util/logger";

import { InitialzableRepository } from "../IRepository";
import {IdentifiableBook} from "../../models/book.model"
import {ConnectionManager} from "./connectionManager.repository"

import {DatabaseException, ItemNotFoundException} from "../../util/Exceptions/RepositoryExceptions"
import {ItemCategoty } from "../../models/item.model"
import {SQLiteBookMapper,ISQLITEBook} from "../../mappers/Book.mapper"

const table_name = ItemCategoty.BOOK ;
const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS ${table_name} (
        id TEXT PRIMARY KEY,
        
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL,
        format TEXT NOT NULL,
        specialEdition TEXT NOT NULL,
        packaging TEXT NOT NULL,
        language TEXT NOT NULL,
        publisher TEXT NOT NULL
    )`;

const INSERT_BOOK = `insert into ${table_name} (
    id, title, author, genre, format, specialEdition, packaging, language, publisher
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;

const SELECT_BY_ID = `SELECT * FROM ${table_name} WHERE id = $1`;

const SELECT_ALL = `SELECT * FROM ${table_name}`;

const DELETE_ID = `DELETE FROM ${table_name} WHERE id = $1`;

const UPDATE_BOOK = `update ${table_name} set 
    , 
    title = $2, 
    author = $3, 
    genre = $4, 
    format = $5, 
    specialEdition = $6, 
    packaging = $7, 
    language = $8, 
    publisher = $9 
    where id = $1`;





export class BookRepository implements InitialzableRepository<IdentifiableBook> {

   
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

    async getAll(): Promise<IdentifiableBook[]> {
        try {
        const conn = await ConnectionManager.getConnection();
        const result = await conn.query(SELECT_ALL);
        
        if(!result){
            throw new DatabaseException("no Books")
        }
        const rows : ISQLITEBook[] = result.rows;
        const mapper = new SQLiteBookMapper()  ;

        return rows.map((item)=> mapper.map(item))
        }catch(error : unknown)
        {
            logger.error("Fail to get Book of id : %s error : %o ",error as Error);
            throw new DatabaseException("Failed to get Cakes");
        }
    }
    async getById(id: string): Promise<IdentifiableBook> {
        try {
        const conn = await ConnectionManager.getConnection();
        const x = await conn.query(SELECT_BY_ID,[id]);
        if(!x){
            throw new ItemNotFoundException("book not found of id "+ id);
        }
        const row : ISQLITEBook = x.rows[0];
        const result = new SQLiteBookMapper().map(row);
        return result
        }catch(error : unknown)
        {
            logger.error("Fail to get Book of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to get Cake of Id "+id)
        }
    }
    async create(item: IdentifiableBook): Promise<string> { //create book order
        try {
                    const conn = await ConnectionManager.getConnection()
        
            await conn.query(
                INSERT_BOOK,
                [
                    item.getId(),
                    
                    item.getTitle(),
                    item.getAuthor(),
                    item.getGenre(),
                    item.getFormat(),
                    item.getSpecialEdition(),
                    item.getPackaging(),
                    item.getLanguage(),
                    item.getPublisher(),
                ]
            );

       logger.info("success Create From Book")
        return item.getId();
            
        } catch (error) {
            logger.error("Create Book error happens here %o", error as Error);
            throw new DatabaseException("Book create : Error happens here " );
        }

    }
    async update(item: IdentifiableBook): Promise<void> {
        try {
        const conn = await ConnectionManager.getConnection();
             await conn.query(UPDATE_BOOK, [
                item.getId(),
                item.getTitle(),
                item.getAuthor(),
                item.getGenre(),
                
                item.getCategory(),
                item.getFormat(),
                item.getSpecialEdition(),
                item.getPackaging(),
                item.getLanguage(),
                item.getPublisher(),
            ]);
        logger.info("Book Updated");
        }catch(error : unknown)
        {
            logger.error("Fail to Update Book of id : %s error : %o ", item.getId(),error as Error);
            throw new DatabaseException("Failed to Update Book of Id "+item.getId())
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