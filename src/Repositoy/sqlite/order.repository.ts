import {IRepository} from "../IRepository"
import {Order} from "../../models/order.model"
import {Database} from 'sqlite3';
import { open } from 'sqlite';
import config from "../../config/index";
import logger from "../../util/logger";
import { Initialzable } from "../IRepository";
import { InitialzableRepository } from "../IRepository";
import { DatabaseException }from "../../util/Exceptions/RepositoryExceptions"
import { ConnectionManager } from "./ConnectionManager.repository";
import {Item,ItemWithId} from "../../models/item.model"
import {ID} from "../IRepository"

    const CREATE_TABLE = `
            CREATE TABLE IF NOT EXISTS order (
                id TEXT PRIMARY KEY,
                quantity INTEGER NOT NULL,
                price INTEGER NOT NULL,
                Item_Categoty TEXT NOT NULL,
                item_id TEXT NOT NULL,
            )`
    const CREATE_ITEM_TABLE = `INSERT INTO order (id, quantity, price, Item_Categoty, item_id) VALUES (?, ?, ?, ?, ?)`

export class OrderRepository implements InitialzableRepository<Order> {

    
        constructor(private readonly itemRepository: IRepository<ItemWithId>) { 
             
          

        }

        async init(): Promise<void> {

            try {
            const db = await open({
                filename: config.storagePath.sqlite,
                driver: Database
            })
            await db.exec(CREATE_TABLE);
            logger.info('Database initialized and table created if not exists');
        } catch (error) {
            logger.error(`Database initialization failed: ${error}`);
            throw error;
        }
    }


    async getAll(): Promise<Order[]> {
        // Replace with actual SQLite query logic
        // const rows = await db.all('SELECT * FROM orders');
        // return rows as Order[];
        return [];
    }

    async getById(id: string): Promise<Order> {
        // Replace with actual SQLite query logic
        // const row = await db.get('SELECT * FROM orders WHERE id = ?', [id]);
        // return row as Order;
        throw new Error('Not implemented');
    }

    async create(item: Order): Promise<string> {
        try {
            const conn = await ConnectionManager.getConnection();
        }
        catch (error:unknown) {
            logger.error(`Creating order failed: ${error}`);
            throw new DatabaseException('Creating order failed');
        }
        //transcation
             //insert data into order table
            //insert data into item table 
        //commit
        //return id
       
        //throw error if failed

    }

    async update(item: Order): Promise<void> {
        // Replace with actual SQLite update logic
        // await db.run('UPDATE orders SET ... WHERE id = ?', [..., item.id]);
        throw new Error('Not implemented');
    }

    async delete(id: string): Promise<void> {
        // Replace with actual SQLite delete logic
        // await db.run('DELETE FROM orders WHERE id = ?', [id]);
        throw new Error('Not implemented');
    }

}