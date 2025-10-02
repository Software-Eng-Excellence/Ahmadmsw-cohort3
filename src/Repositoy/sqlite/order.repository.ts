
import logger from "../../util/logger";

import { InitialzableRepository } from "../IRepository";
import { DatabaseException, ItemNotFoundException }from "../../util/Exceptions/RepositoryExceptions"
import { ConnectionManager } from "./ConnectionManager.repository";
import {ItemWithId} from "../../models/item.model"

import {IdentifiableOrderItem, IOrder} from "../../models/Iorder.model"
import {SQLiteOrderMapper,ISQLITEOrder}from "../../mappers/CSVorder.mapper"


    const CREATE_TABLE = `
            CREATE TABLE IF NOT EXISTS "order" (
                id TEXT PRIMARY KEY,
                quantity INTEGER NOT NULL,
                price INTEGER NOT NULL,
                Item_Categoty TEXT NOT NULL,
                item_id TEXT NOT NULL
            )`
    const CREATE_ITEM_TABLE = `INSERT INTO "order" (id, quantity, price, Item_Categoty, item_id) VALUES (?, ?, ?, ?, ?)`

    const SELECT_ALL = `SELECT * FROM "order" WHERE Item_Categoty = ?`

    const SELECT_BY_ID = `SELECT * FROM "order" WHERE id = ?`;
    const DELETE_BY_ID = `DELETE  FROM "order" WHERE id = ?`;
    const UPDATE_BY_ID = `
             UPDATE "order"
            SET quantity = ?,
            price = ?,
            Item_Categoty = ?,
            item_id = ?
            WHERE id = ?`;


export class OrderRepository implements InitialzableRepository<IdentifiableOrderItem> {

    
    constructor(private readonly itemRepository: InitialzableRepository<ItemWithId>) { 
             
          

        }

    async init(): Promise<void> {

            try {
                const conn = await ConnectionManager.getConnection();

                await  conn.exec(CREATE_TABLE);
                await this.itemRepository.init();
                logger.info("create table");


            }


         catch (error) {
            logger.error(`Database initialization failed: ${error}`);
            throw error;
        }
    }



    async getAll(): Promise<IdentifiableOrderItem[]> {
        try {
            const conn = await ConnectionManager.getConnection();
            const items = await this.itemRepository.getAll();
            if(items.length ==0){
                throw new ItemNotFoundException("No items At All")
            }
            const orders = await conn.all<ISQLITEOrder[]>(SELECT_ALL,items[0].getCategory());
            //bind ORDERS TO ITEMS :
            const bindOrders = orders.map((order) =>{
                const item = items.find((item)=>item.getId() === order.item_id )
                if(!item){
                    throw new DatabaseException("Item Not found with respect to order getAll")
                }
                return {order,item}
            } )

            //foreach binded order and item return identifiableOrder
            const identifiableOrders = bindOrders.map(({order,item}) =>{
               return new SQLiteOrderMapper().map({data:order,item:item})
            })
            return identifiableOrders ;
            
        } catch (error) {
            throw new DatabaseException("Error get ALL")
        }

       

    }

    async getById(id: string): Promise<IdentifiableOrderItem> {
        // Replace with actual SQLite query logic
        // const row = await db.get('SELECT * FROM orders WHERE id = ?', [id]);
        // return row as Order;
        try {
        const conn = await ConnectionManager.getConnection();
        
        const x = await conn.get<ISQLITEOrder>  (SELECT_BY_ID,id);
        
               
        
        
       
        if(!x){

            throw new ItemNotFoundException("Order not found of id "+id)
        }
        else {
        const cake = await this.itemRepository.getById(x.item_id)
        const result = new SQLiteOrderMapper().map({data:x , item:cake});
        
        return result
        
        
        }
        }catch(error : unknown)
        {
            logger.error("Fail to get order of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to get order of Id "+id)
        }

        
    }

    async create(order : IdentifiableOrderItem): Promise<string> {
        let conn ;

        try {
            
            conn = await ConnectionManager.getConnection();
            conn.exec("BEGIN TRANSACTION");
            const item_id  = await this.itemRepository.create(order.getItem()); // that for the spesific item like cake for example
            //here we use D from SOLID
             await conn.run(CREATE_ITEM_TABLE, [order.getId(), order.getQuantity(), order.getPrice(), order.getItem().getCategory(), item_id]);
            
            conn.exec("COMMIT");
            
            return order.getId();
            
        }
        catch (error:unknown) {

            logger.error(`Order Creating : Creating order failed: ${error}`);
            conn && conn.exec("ROLLBACK")
            throw new DatabaseException('Creating order failed');
        }
        //transcation
             //insert data into order table
            //insert data into item table 
        //commit
        //return id
       
        //throw error if failed

    }

    async update(order: IdentifiableOrderItem): Promise<void> {
             try {
        const conn = await ConnectionManager.getConnection();
        
        conn.exec("BEGIN TRANSACTION");
        await this.itemRepository.update(order.getItem())
await conn.run(UPDATE_BY_ID, [
  order.getQuantity(),
  order.getPrice(),
  order.getItem().getCategory(),
  order.getItem().getId(),
  order.getId()
]);

        conn.exec("COMMIT");
        
 
        }catch(error : unknown)
        {
            logger.error("Fail to UPDATE Order of id : %s error : %o ", order.getId(),error as Error);
            throw new DatabaseException("Failed to UPDATE Order of Id "+order.getId())
        }
    }

    async delete(id: string): Promise<void> {
             try {
        const conn = await ConnectionManager.getConnection();
        const order = await this.getById(id);
        conn.exec("BEGIN TRANSACTION");
        await this.itemRepository.delete(order.getItem().getId())
         await conn.run(DELETE_BY_ID,id);
        conn.exec("COMMIT");
        
 
        }catch(error : unknown)
        {
            logger.error("Fail to DELTE Order of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to Delete Order of Id "+id)
        }
    }

}