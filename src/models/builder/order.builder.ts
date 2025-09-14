import { Item ,ItemWithId} from "../item.model";
import { Order ,IdentifiableOrder} from "../order.model";

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


export class IdentifiableOrderBuilder {
  private item! : ItemWithId ;
  private price!:number ;
  private quantity!:number;
  private id!:string;

  setItem(item:ItemWithId):IdentifiableOrderBuilder{
    this.item = item ;
    return this
  }
  setPrice(price: number): IdentifiableOrderBuilder {
    this.price = price;
    return this;
  
  }

  setQuantity(quantity: number): IdentifiableOrderBuilder {
    this.quantity = quantity;
    return this;
    
  }
  setId(id: string): IdentifiableOrderBuilder {
    this.id = id;
    return this;
    
  }

  build():IdentifiableOrder  {
    return new IdentifiableOrder(this.item,this.price,this.quantity,this.id);
  }
}