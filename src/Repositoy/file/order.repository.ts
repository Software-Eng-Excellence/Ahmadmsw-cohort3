import { Order } from "../../models/order.model";
import { ID,IRepository } from "../IRepository";
import logger from "../../util/logger";
import {InvalidItemException,ItemNotFoundException} from "../../util/Exceptions/RepositoryExceptions"

//abstact class i use it in the concrete classes and use load nad save methods with what and how i need to save and load
export abstract class OrderRepository implements IRepository<Order >{

    abstract save(item: Order[]): Promise<void> 

    abstract load(): Promise<Order[]> ;


     async getAll(): Promise<Order[]> {
        return this.load();
        logger.info(`All orders retrieved successfully`);
        
        throw new Error("Method not implemented.");
    }


   async getById(id: string): Promise<Order> {
        const orders = await this.load();
        const order = orders.find(order => order.getId() === id);
        if (!order) {
            logger.error(`Order with id ${id} not found`);  
            throw new ItemNotFoundException(`Order with id ${id} not found`);
        }
        logger.info(`Order with id ${id} retrieved successfully`);
        return order ;
    }   



   async create(item: Order): Promise<string> {
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
        return String(item.getId()); // return the id of the created order
        logger.info(`Order with id ${id} created successfully`);
    }




   async update(item: Order): Promise<void> {
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
    async delete(id: string): Promise<void> {
    const orders = await this.load();
    const index = orders.findIndex(o => o.getId() === id);
    if(index === -1){
        logger.error(`Order with id ${id} not found`);
        throw new ItemNotFoundException(`Item not found`);
    }
    orders.splice(index,1);
    await this.save(orders);
    logger.info(`Order with id ${id} deleted successfully`);
}
}