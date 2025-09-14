import { Item ,ItemWithId} from "../models/item.model";
import { IOrder,IdentifiableOrderItem } from "./Iorder.model";




export class Order implements IOrder {


    constructor(private item: Item /* here is the bridge also */, private price: number, private quantity: number, public id : string) {}

    getItem(): Item {
        return this.item;
    }
    getPrice(): number {
    return this.price;
        
    }
    getQuantity(): number {
        return this.quantity;
    }
    getId(): string {
        return this.id;
    }   
}


export class IdentifiableOrder  implements IdentifiableOrderItem  {
    constructor(private iditem :ItemWithId ,private price :number , private quantity:number, private id:string) {
        
    }
    getItem(): ItemWithId {
        return this.iditem;
    }
    getPrice(): number {
        return this.price
    }
    getQuantity(): number {
        return this.quantity
    }
    getId(): string {
        return this.id;
    }
    }



