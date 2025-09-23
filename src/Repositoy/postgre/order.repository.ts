import {IRepository} from "../IRepository"
import {Order} from "../../models/order.model"

import logger from "../../util/logger";
import { Initialzable } from "../IRepository";
import { InitialzableRepository } from "../IRepository";
import { DatabaseException, ItemNotFoundException }from "../../util/Exceptions/RepositoryExceptions"
import { ConnectionManager } from "./connectionManager.repository";
import {Item,ItemWithId} from "../../models/item.model"

import {IdentifiableOrderItem, IOrder} from "../../models/Iorder.model"
import {SQLiteOrderMapper,ISQLITEOrder}from "../../mappers/CSVorder.mapper"
import {SQLITECakeMapper}from "../../mappers/Cake.mapper"
import { table } from "console";


    const CREATE_TABLE = `
            CREATE TABLE IF NOT EXISTS "order" (
                id TEXT PRIMARY KEY,
                quantity INTEGER NOT NULL,
                price INTEGER NOT NULL,
                Item_Categoty TEXT NOT NULL,
                item_id TEXT NOT NULL
            )`
  const CREATE_ITEM_TABLE = `insert into "order" (
    id, quantity, price, Item_Categoty, item_id
) values ($1, $2, $3, $4, $5)`;

    const SELECT_ALL = `SELECT * FROM "order" WHERE Item_Categoty = $1`

    const SELECT_BY_ID = `SELECT * FROM "order" WHERE id = $1`
    const DELETE_BY_ID = `DELETE  FROM "order" WHERE id = $1`;
    const UPDATE_BY_ID = `
             UPDATE "order"
            SET quantity = $1,
            price = $2,
            Item_Categoty = $3,
            item_id = $4
            WHERE id = $5`;


export class OrderRepository implements InitialzableRepository<IdentifiableOrderItem> {

    
    constructor(private readonly itemRepository: InitialzableRepository<ItemWithId>) { 
             
          

        }

    async init(): Promise<void> {

            try {
                const conn = await ConnectionManager.getConnection();

                await  conn.query(CREATE_TABLE);
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
            const orders = await conn.query(SELECT_ALL,[items[0].getCategory()]);
            //bind ORDERS TO ITEMS :
            const Porders : ISQLITEOrder[] = orders.rows;
            const bindOrders = Porders.map((order) =>{
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
            throw new DatabaseException("Error get Orders ALL" + error);
        }

       

    }

    async getById(id: string): Promise<IdentifiableOrderItem> {
        // Replace with actual SQLite query logic
        // const row = await db.get('SELECT * FROM orders WHERE id = ?', [id]);
        // return row as Order;
        try {
        const conn = await ConnectionManager.getConnection();
        
        const x = await conn.query(SELECT_BY_ID,[id]);

       
        if(!x){

            throw new ItemNotFoundException("Order not found of id "+id)
        }
        else {
        const row : ISQLITEOrder = x.rows[0];     
        const cake = await this.itemRepository.getById(row.item_id)
        const result = new SQLiteOrderMapper().map({data:row , item:cake});
        
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
            await conn.query("BEGIN TRANSACTION");
            const item_id  = await this.itemRepository.create(order.getItem()); // that for the spesific item like cake for example
            //here we use D from SOLID
            await conn.query(CREATE_ITEM_TABLE, [order.getId(), order.getQuantity(), order.getPrice(), order.getItem().getCategory(), item_id]);

            await conn.query("COMMIT");
            
            return order.getId();
            
        }
        catch (error:unknown) {

            logger.error(`Order Creating : Creating order failed: ${error}`);
            conn && await conn.query("ROLLBACK");
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
        
        await conn.query("BEGIN TRANSACTION");
        await this.itemRepository.update(order.getItem())
await conn.query(UPDATE_BY_ID, [
  order.getQuantity(),
  order.getPrice(),
  order.getItem().getCategory(),
  order.getItem().getId(),
  order.getId()
]);

        await conn.query("COMMIT");

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
        await conn.query("BEGIN TRANSACTION");
        await this.itemRepository.delete(order.getItem().getId())
         await conn.query(DELETE_BY_ID,[id]);
        await conn.query("COMMIT");

        }catch(error : unknown)
        {
            logger.error("Fail to DELTE Order of id : %s error : %o ", id,error as Error);
            throw new DatabaseException("Failed to Delete Order of Id "+id)
        }
    }

}