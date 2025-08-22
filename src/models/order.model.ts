import { Item } from "../models/item.model";
import { IOrder } from "./Iorder.model";

export class Order implements IOrder {

    constructor(private item: Item /* here is the bridge also */, private price: number, private quantity: number) {}

    getItem(): Item {
        return this.item;
    }
    getPrice(): number {
        return this.price;
        
    }
    getQuantity(): number {
        return this.quantity;
    }

}