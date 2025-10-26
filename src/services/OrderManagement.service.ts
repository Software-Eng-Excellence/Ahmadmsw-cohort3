
import {IdentifiableOrderItem} from "../models/Iorder.model"
import { ServiceException } from "../util/Exceptions/Service.Exception";
import {DBType} from "../models/DBtypes.model"
import {ItemCategoty} from "../models/item.model"
import {IRepository} from "../Repositoy/IRepository"
import {RepositoryFactory} from "../Repositoy/Repository.Factory"
import {BadRequestException} from "../util/httpException/BadRequestException"
import {NotFoundException} from "../util/httpException/notFoundException"



    export class OrderManagementService { 

        //create order
        public async createOrder(Order:IdentifiableOrderItem): Promise<string> {
            //Validate Order
            this.validateOrder(Order)


            //persist order
            const repo = await this.getRepository(Order.getItem().getCategory());
            const createdOrder = await repo.create(Order);
            return createdOrder;
        }

        //get order by id
        public async getOrderById(id:string): Promise<IdentifiableOrderItem> {
           console.log("Service: Fetching order with id:", id);
                const categories = Object.values(ItemCategoty);
                for (const category of categories) {
                    const repo = await this.getRepository(category);
                    const order = await repo.getById(id);
                    console.log(order);
                    if (order) {
                        return order;
                    }
                    
                }
            throw new NotFoundException(`Order not found Get By Id: ${id}`);
  
        }
        //update order
        public async updateOrder(Order:IdentifiableOrderItem): Promise<void> {
            //Validate Order
            this.validateOrder(Order)

            //persist order
            const repo = await this.getRepository(Order.getItem().getCategory());
            await repo.update(Order);
        }
        //delete order
        public async deleteOrder(id:string): Promise<void> {
            const categories = Object.values(ItemCategoty);
            for (const category of categories) {
                const repo = await this.getRepository(category);
                await repo.delete(id);
                return;
            }
            throw new NotFoundException(`Order not found Delete By Id: ${id}`);
        }

        public async getAllOrders(): Promise<IdentifiableOrderItem[]> { 
            try {
            let allOrders: IdentifiableOrderItem[] = [];
            const categories = Object.values(ItemCategoty);
            for (const category of categories) {
                const repo = await this.getRepository(category);
                const orders = await repo.getAll();
                allOrders = allOrders.concat(orders);
                
            }
            
            return allOrders;
        }catch(error : unknown)
        {
            throw new NotFoundException("Failed to get all orders");
        }
    }
    public async getTotalRevenue(): Promise<number> { 
        try {
        let totalRevenue = 0;
        const orders = await this.getAllOrders();
        for (const order of orders) {
            totalRevenue += order.getPrice() * order.getQuantity();
        }
        return totalRevenue;
    }catch(error : unknown)
    {
        throw new ServiceException("Failed to calculate total revenue", error as Error);
    }
}
public async getTotalOrdersCount(): Promise<number> { 
    try {
    const orders = await this.getAllOrders();
    return orders.length;
    }catch(error : unknown)
    {
        throw new ServiceException("Failed to get total orders count", error as Error);
    }
}

public async getOrdersByCategory(category: ItemCategoty): Promise<IdentifiableOrderItem[]> { 
    try {
    const repo = await this.getRepository(category);
    const orders = await repo.getAll();
    return orders;
    }catch(error : unknown)
    {
        throw new ServiceException(`Failed to get orders by category: ${category}`, error as Error);
    }
}
public async getTotalRevenueByCategory(category: ItemCategoty): Promise<number> { 
    try {
    let totalRevenue = 0;
    const orders = await this.getOrdersByCategory(category);
    for (const order of orders) {
        totalRevenue += order.getPrice() * order.getQuantity();
    }
    return totalRevenue;
    }catch(error : unknown)
    {
        throw new ServiceException(`Failed to get total revenue by category: ${category}`, error as Error);
    }
}

        //validate order
        private validateOrder(Order:IdentifiableOrderItem): boolean { 
           if(!Order.getItem()||Order.getPrice()<=0|| Order.getQuantity()<=0) {
            const detials = {
                ItemNotFound : !Order.getItem(),
                Price : Order.getPrice() < 0,
                Quantity : Order.getQuantity() < 0
            }
            throw new BadRequestException("Invalid Order",detials);
               
           }
           


        return true;
    }


    //get repo :
    private async getRepository(category : ItemCategoty):Promise<IRepository<IdentifiableOrderItem>> {
        return RepositoryFactory.create(DBType.POSTGRESQL, category);
}

}