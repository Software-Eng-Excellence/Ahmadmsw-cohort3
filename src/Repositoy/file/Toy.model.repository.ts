import { IOrder } from "../../models/Iorder.model";
import {Order} from "../../models/order.model"
import {OrderRepository} from "./order.repository"
import {readXmlFile} from "../../util/XMLParser";
import {writeXmlFile} from "../../util/XMLParser";
import { JSONOrderMapper } from "../../mappers/CSVorder.mapper";
import { JSONBookMapper } from "../../mappers/Book.mapper";

import { XMLToyMapper } from "../../mappers/Toy.mapper";
import {XMLOrderMapper}from "../../mappers/CSVorder.mapper"

export class ToyRepository extends OrderRepository{

        constructor(private readonly filePath: string){
            super()
        }
 async load(): Promise<Order[]> {
   let ff =   await readXmlFile<{ data: { row: { [key: string]: string }[] } }>(this.filePath); 
    const rows = ff.data.row ;

   const mapper = new XMLOrderMapper(new XMLToyMapper());

   const orders = rows.map(r => mapper.map(r));

   return orders;
}
async save(orders: Order[]): Promise<void> {

    const rows = orders.map(o => new XMLOrderMapper(new XMLToyMapper() ).reverseMap(o));
const xmlData = {
    data: {
        row: rows.map(r => ({
            "@_OrderID": r.OrderID,
            "@_Type": r.Type,
            "@_AgeGroup": r.AgeGroup,
            "@_Brand": r.Brand,
            "@_Material": r.Material,
            "@_BatteryRequired": r.BatteryRequired,
            "@_Educational": r.Educational,
            "@_Quantity": r.Quantity,
            "@_Price": r.Price
        }))
    }
};
    await writeXmlFile(this.filePath, xmlData);

     
}
}
