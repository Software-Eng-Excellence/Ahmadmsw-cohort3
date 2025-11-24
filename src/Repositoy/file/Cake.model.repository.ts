import { IOrder } from "../../models/Iorder.model";
import {Order} from "../../models/order.model"
import {OrderRepository} from "./order.repository"
import {readCsvFile} from "../../util/parser";
import {writeCsvFile} from "../../util/parser";
import { CSVOrderMapper } from "../../mappers/CSVorder.mapper";
import { CSVCakeMapper } from "../../mappers/Cake.mapper";

export class CakeRepository extends OrderRepository{

        constructor(private readonly filePath: string){
            super()
        }
 async load(): Promise<Order[]> {
   const csv =   await readCsvFile(this.filePath); 

   const mapper = new CSVOrderMapper(new CSVCakeMapper());

   const order = csv.map(row => mapper.map(row));
   return order;
}
async save(orders: Order[]): Promise<void> {
    const header = [
        "id", "Type", "Flavor", "Filling", "Size", "Layers",
        "Frosting Type", "Frosting Flavor", "Decoration Type",
        "Decoration Color", "Custom Message", "Shape", "Allergies",
        "Special Ingredients", "Packaging Type", "Price", "Quantity"
    ];
    const rows = orders.map(o => new CSVOrderMapper(new CSVCakeMapper() ).reverseMap(o));

     await writeCsvFile(this.filePath, [header, ...rows]);
}
}
