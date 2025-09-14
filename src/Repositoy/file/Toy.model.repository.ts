import { IOrder } from "../../models/Iorder.model";
import {Order} from "../../models/order.model"
import {OrderRepository} from "./order.repository"
import {readXmlFile} from "../../util/XMLParser";
import {writeXmlFile} from "../../util/XMLParser";
import { JSONOrderMapper } from "../../mappers/CSVorder.mapper";
import { JSONBookMapper } from "../../mappers/Book.mapper";

import { XMLToyMapper } from "../../mappers/Toy.mapper";
import {XMLOrderMapper}from "../../mappers/CSVorder.mapper"
import { DatabaseException } from "../../util/Exceptions/RepositoryExceptions";

export class ToyRepository extends OrderRepository{

        constructor(private readonly filePath: string){
            super()
        }
 async load(): Promise<Order[]> {
    try {
   let data =   await readXmlFile<{ data: { row: { [key: string]: string }[] } }>(this.filePath); 
    const rows = data.data.row ;

   const mapper = new XMLOrderMapper(new XMLToyMapper());

   const orders = rows.map(r => mapper.map(r));

   return orders;
    }
    catch (error) {
        throw new DatabaseException(`Failed to load data from XML file: ${error}`);
    }
}
async save(orders: Order[]): Promise<void> {
try {
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
}catch (error) {
    throw new DatabaseException(`Failed to save data to XML file: ${error}`);   

     
}
}
}
