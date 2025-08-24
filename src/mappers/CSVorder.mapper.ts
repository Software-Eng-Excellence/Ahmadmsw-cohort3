import {IMapper} from "./Imapper"
import {Order} from "../models/order.model"
import { OrderBuilder } from "../models/builder/order.builder"
import { Item } from "../models/item.model";


export class  CSVOrderMapper implements IMapper <string[],Order>{
    constructor(private itemMapper: IMapper<string[],Item>){}//menhot item b tene wehde ya3ne IMapper can be string or Item
    
    map(data:string[]):Order{
        const item :Item = this.itemMapper.map(data) // so i can use it here
        const orderBuild = new OrderBuilder;
         return orderBuild.setItem(item)
                .setPrice(parseInt(data[data.length-2]))
                .setQuantity(parseInt(data[data.length-1]))
                .build()
                   
    
                        
    }
}
export class JSONOrderMapper implements IMapper<{ [key: string]: string }, Order> {
    constructor(private itemMapper: IMapper<{ [key: string]: string }, Item>) {}

    map(data: { [key: string]: string }): Order {
                const orderBuild = new OrderBuilder();
        const item: Item = this.itemMapper.map(data);
        return orderBuild
            .setQuantity(parseInt(data["Quantity"]))
            .setPrice(parseFloat(data["Price"]))
            .setItem(item)

            .build();
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
}