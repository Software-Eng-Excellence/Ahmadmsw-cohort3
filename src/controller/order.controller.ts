import { NextFunction,Request,Response } from "express";
import { OrderManagementService } from "../services/OrderManagement.service"
import { ApiException } from "../util/Exceptions/ApiException";
import { IdentifiableOrder } from "../models/order.model";
import {JsonRequestFactory} from "../mappers/index"
import {ItemCategoty} from "../models/item.model"

export class OrderController {
    constructor(private readonly orderService: OrderManagementService) {}
    //create order

    //get order by id
    public async getOrderById(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id;
            console.log("Fetching order with id:", id);
            const order = await this.orderService.getOrderById(id);
            res.status(200).json(order);
        } catch (error) {
            next(new ApiException(400,"Failed to get order by id", error as Error));
        }
    }
    //get all orders
    public async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderService.getAllOrders();
            res.status(200).json(orders);
            
        } catch (error) {
            next(new ApiException(400,"Failed to get all orders", error as Error));
        }
    }
    public async createOrder(req: Request, res: Response) {
        console.log("begin");
        
     const order: IdentifiableOrder = JsonRequestFactory.createMapper(ItemCategoty.CAKE).map(req.body);
    console.log(order)
    if (!order) {
        throw new Error("Order is required to create order");
    }
     const newOrder = await this.orderService.createOrder(order);
    res.status(201).json(newOrder);
}

    public async deleteOrder(req: Request, res: Response,next:NextFunction) {
        try {
            
        
        const id = req.params.id;
       
        await this.orderService.deleteOrder(id);
        res.status(204).send({ message: "Order deleted successfully" });
        }catch(error :any){
             next(new ApiException(400,"Failed to get order by id", error as Error));
        }
    }

     public async updateOrder(req: Request, res: Response , next : NextFunction) {
        const id = req.params.id;
        if (!id) {
         console.log("Item not found to handle it in Update ")
        }
        const order: IdentifiableOrder = JsonRequestFactory.createMapper(req.body.category).map(req.body);
        if (!order) {
                      console.log("Something is error")
        }
        if (order.getId() !== id) {
             console.log("error")
        }
        await this.orderService.updateOrder(order);
        res.status(200).json(order);
    }


}