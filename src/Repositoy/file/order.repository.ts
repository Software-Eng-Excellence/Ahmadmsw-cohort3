import { IOrder } from "../../models/Iorder.model";
import { ID,IRepository } from "../IRepository";
import logger from "../../util/logger";
import {InvalidItemException,ItemNotFoundException} from "../../util/Exceptions/RepositoryExceptions"

//abstact class i use it in the concrete classes and use load nad save methods with what and how i need to save and load
export abstract class OrderRepository implements IRepository<IOrder >{

    abstract save(item: IOrder[]): Promise<void> 

    abstract load(): Promise<IOrder[]> ;


     async getAll(): Promise<IOrder[]> {
        return this.load();
        logger.info(`All orders retrieved successfully`);
        
        throw new Error("Method not implemented.");
    }


   async getById(id: ID): Promise<IOrder> {
        const orders = await this.load();
        const order = orders.find(order => order.getId() === id.getId());
        if (!order) {
            logger.error(`Order with id ${id.getId()} not found`);  
            throw new Error("Order not found");
        }
        logger.info(`Order with id ${id.getId()} retrieved successfully`);
        return order ;
    }   



   async create(item: IOrder): Promise<ID> {
        //validate :
        if(!item){
            throw new InvalidItemException("Invalid order");
        }
        //load data
        const orders = await this.load();
        //add new item
        const id = orders.push(item);
        //save data
        await this.save(orders);
        //return id
        return {getId:()=>String(id)}; // return the id of the created order
        logger.info(`Order with id ${id} created successfully`);
    }




   async update(item: IOrder): Promise<void> {
    if(!item){
        logger.error(`Updating Failed : Order cannot be null`);
        throw new InvalidItemException("Invalid order");
    }
    const orders = await this.load();
    const index = orders.findIndex(o => o.getId() === item.getId());
    if(index === -1){
        logger.error(`Order with id ${item.getId()} not found`);
        throw new ItemNotFoundException(`Item not found`);
    }
    orders[index] = item;
    await this.save(orders);

    logger.info(`Order with id ${item.getId()} updated successfully`);
    
}
    async delete(id: ID): Promise<void> {
    const orders = await this.load();
    const index = orders.findIndex(o => o.getId() === id.getId());
    if(index === -1){
        logger.error(`Order with id ${id.getId()} not found`);
        throw new ItemNotFoundException(`Item not found`);
    }
    orders.splice(index,1);
    await this.save(orders);
    logger.info(`Order with id ${id.getId()} deleted successfully`);
}
}