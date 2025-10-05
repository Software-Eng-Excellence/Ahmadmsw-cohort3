



import { InitialzableRepository } from "../IRepository";
import { DatabaseException, ItemNotFoundException }from "../../util/Exceptions/RepositoryExceptions"
import { ConnectionManager } from "./connectionManager.repository";
import {Item,ItemWithId} from "../../models/item.model"

import {IdentifiableOrderItem, IOrder} from "../../models/Iorder.model"
import {SQLiteOrderMapper,ISQLITEOrder}from "../../mappers/CSVorder.mapper"
import { PoolClient } from "pg";



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

const SELECT_BY_ID = `SELECT * FROM "order" WHERE id = $1`;

    const DELETE_BY_ID = `DELETE  FROM "order" WHERE id = $1`;
    const UPDATE_BY_ID = `
             UPDATE "order"
            SET quantity = $1,
            price = $2,
            Item_Categoty = $3,
            item_id = $4
            WHERE id = $5`;

    

export class OrderRepository implements InitialzableRepository<IdentifiableOrderItem> {

    constructor(private readonly itemRepository: InitialzableRepository<ItemWithId>) { }

    async init(): Promise<void> {
        let conn!: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            await conn.query(CREATE_TABLE);
            await this.itemRepository.init();
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }

    async getAll(): Promise<IdentifiableOrderItem[]> {
        let conn!: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            const items = await this.itemRepository.getAll();
            if (items.length === 0) {
                throw new ItemNotFoundException("No items At All");
            }

            const orders = await conn.query(SELECT_ALL, [items[0].getCategory()]);
            const Porders: ISQLITEOrder[] = orders.rows;

            const bindOrders = Porders.map((order) => {
                const item = items.find((item) => item.getId() === order.item_id);
                if (!item) {
                    throw new DatabaseException("Item Not found with respect to order getAll");
                }
                return { order, item };
            });

            return bindOrders.map(({ order, item }) =>
                new SQLiteOrderMapper().map({ data: order, item })
            );

        } catch (error) {
            throw new DatabaseException("Error get Orders ALL" + error);
        } finally {
             conn.release();
        }
    }

    async getById(id: string): Promise<IdentifiableOrderItem> {
        let conn!: PoolClient;
        let result :any ;
        try {
            conn = await ConnectionManager.getConnection();
            const x = await conn.query(SELECT_BY_ID, [id]);
            
            if (!x) {
                throw new ItemNotFoundException("Order not found of id " + id);
                
            }
            
            const row: ISQLITEOrder = x.rows[0];
            const item = await this.itemRepository.getById(row.item_id);
            if(item){
             result = new SQLiteOrderMapper().map({ data: row, item });
            }
            return result;

        } catch (error: unknown) {
            throw new DatabaseException("Failed to get order of Id " + id);
        } finally {
             conn.release();
        }
    }

    async create(order: IdentifiableOrderItem): Promise<string> {
        let conn !: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            await conn.query("BEGIN TRANSACTION");
            const item_id = await this.itemRepository.create(order.getItem());
            await conn.query(CREATE_ITEM_TABLE, [
                order.getId(),
                order.getQuantity(),
                order.getPrice(),
                order.getItem().getCategory(),
                item_id
            ]);
            await conn.query("COMMIT");
            return order.getId();
        } catch (error: unknown) {
            if (conn) await conn.query("ROLLBACK");
            throw new DatabaseException('Creating order failed');
        } finally {
             conn.release();
        }
    }

    async update(order: IdentifiableOrderItem): Promise<void> {
        let conn !: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            await conn.query("BEGIN TRANSACTION");
            await this.itemRepository.update(order.getItem());
            await conn.query(UPDATE_BY_ID, [
                order.getQuantity(),
                order.getPrice(),
                order.getItem().getCategory(),
                order.getItem().getId(),
                order.getId()
            ]);
            await conn.query("COMMIT");
        } catch (error: unknown) {
            throw new DatabaseException("Failed to UPDATE Order of Id " + order.getId());
        } finally {
             conn.release();
        }
    }

    async delete(id: string): Promise<void> {
        let conn !: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            const order = await this.getById(id);
            await conn.query("BEGIN TRANSACTION");
            await this.itemRepository.delete(order.getItem().getId());
            await conn.query(DELETE_BY_ID, [id]);
            await conn.query("COMMIT");
        } catch (error: unknown) {
            throw new DatabaseException("Failed to Delete Order of Id " + id);
        } finally {
            conn.release();
        }
    }
   

}
