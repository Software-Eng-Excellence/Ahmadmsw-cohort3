import {IMapper} from "./Imapper"
import {IdentifiableOrder, Order} from "../models/order.model"
import {IOrder,IdentifiableOrderItem} from "../models/Iorder.model"
import { OrderBuilder ,IdentifiableOrderBuilder } from "../models/builder/order.builder"
import { Item ,ItemWithId } from "../models/item.model";



export class  CSVOrderMapper implements IMapper <string[],Order>{
    constructor(private itemMapper: IMapper<string[],Item>){}//menhot item b tene wehde ya3ne IMapper can be string or Item
    
    map(data:string[]):Order{
        const item :Item = this.itemMapper.map(data) // so i can use it here
        const orderBuild = new OrderBuilder();
        return orderBuild.setItem(item)
            .setPrice(parseInt(data[data.length - 2]))
            .setQuantity(parseInt(data[data.length - 1]))
            .setId((data[0]))
            .build();

                        
    }
    reverseMap(data: IOrder): string[] {
        const item  = this.itemMapper.reverseMap(data.getItem());
        return [
            data.getId().toString(),
            ...item,
            data.getPrice().toString(),
            data.getQuantity().toString(),
            

        ];
    }
}
export interface ISQLITEOrder {
    
    id:string,
    quantity:number,
    price:number,
    item_category: string,
    item_id:string,
    
}
export class SQLiteOrderMapper implements IMapper<{data:ISQLITEOrder, item: ItemWithId}, IdentifiableOrderItem> {
    
    map({data, item}: {data:ISQLITEOrder, item: ItemWithId}): IdentifiableOrderItem {
     
    

        const idOrder = new IdentifiableOrderBuilder()
        return idOrder.setPrice(data.price).setQuantity(data.quantity).setId(data.id).setItem(item).build();
    }
    reverseMap(data: IdentifiableOrderItem): {data:ISQLITEOrder, item: ItemWithId} {
        return {
            data: {
                id: data.getId(),
                price: data.getPrice(),
                quantity: data.getQuantity(),
                item_category: data.getItem().getCategory(),
                item_id: data.getItem().getId()
            },
            item: data.getItem()
        }
    }

}


export class JSONOrderMapper implements IMapper<{ [key: string]: string }, Order> {
    constructor(private itemMapper: IMapper<{ [key: string]: string }, Item>) {}

    map(data: { [key: string]: string }): Order {
        const orderBuild = new OrderBuilder();
        const item: Item = this.itemMapper.map(data);
        return orderBuild
        .setId((data["Order ID"]) )
            .setQuantity(parseInt(data["Quantity"]))
            .setPrice(parseFloat(data["Price"]))
            .setItem(item)

            .build();
    }
    reverseMap(data: IOrder): { [key: string]: string; } {
        const item = this.itemMapper.reverseMap(data.getItem());
        return {
            "Order ID": data.getId(),
            ...item,
            "Quantity": data.getQuantity().toString(),
            "Price": data.getPrice().toString()
        };
    }
    
}


export class XMLOrderMapper implements IMapper<{ [key: string]: string }, Order> {
    constructor(private itemMapper: IMapper<{ [key: string]: string }, Item>) {}

    map(data: { [key: string]: string }): Order {
        const item: Item = this.itemMapper.map(data);
        const orderBuild = new OrderBuilder();
        return orderBuild
            .setId((data["OrderID"]) )
            .setQuantity(parseInt(data["Quantity"]))
            .setPrice(parseFloat(data["Price"]))
            .setItem(item)
            .build();
    }
    reverseMap(data: Order): { [key: string]: string; } {
        const item = this.itemMapper.reverseMap(data.getItem());
        return {
            
            "OrderID": data.getId(),
            ...item,
            "Quantity": data.getQuantity().toString(),
            "Price": data.getPrice().toString() 
    }
}
}

export class JsonRequestMapper implements IMapper<any,IdentifiableOrder>{
    constructor(private itemMapper:IMapper<any , ItemWithId>){}
    map(data:any):IdentifiableOrder {
        const item = this.itemMapper.map(data.iditem);

        return new IdentifiableOrderBuilder().setId(data.id).setItem(item).setPrice(data.price).setQuantity(data.quantity).build();
    }
    reverseMap(data: IdentifiableOrder) {
        return {
            
            ...data
        }
    }
}