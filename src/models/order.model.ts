import { Item } from "../models/item.model";

export interface IOrder {
    getItem(): Item;
    getPrice(): number;
    getQuantity(): number;
   
}

export class Order implements IOrder {

    constructor(private item: Item, private price: number, private quantity: number) {}

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