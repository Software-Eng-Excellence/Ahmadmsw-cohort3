import { Item } from "../item.model";
import { Order } from "../order.model";

export class OrderBuilder {
  private item!: Item;
  private price: number =0;
  private quantity: number=0;
  private id!: string;

  setItem(item: Item): OrderBuilder {
    this.item = item;
    return this ;
    
  }

  setPrice(price: number): OrderBuilder {
    this.price = price;
    return this;
  
  }

  setQuantity(quantity: number): OrderBuilder {
    this.quantity = quantity;
    return this;
    
  }
  setId(id: string): OrderBuilder {
    this.id = id;
    return this;
    
  }

  build(): Order {
    return new Order(this.item, this.price, this.quantity,this.id);
  }
}
