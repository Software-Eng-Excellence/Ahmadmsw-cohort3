import { IOrder } from "../../models/Iorder.model";
import {Order} from "../../models/order.model"
import {OrderRepository} from "./order.repository"
import {readCsvFile} from "../../util/parser";
import {writeCsvFile} from "../../util/parser";
import { CSVOrderMapper } from "../../mappers/CSVorder.mapper";
import { CSVCakeMapper } from "../../mappers/Cake.mapper";
import { DatabaseException } from "util/Exceptions/RepositoryExceptions";

export class CakeRepository extends OrderRepository{

        constructor(private readonly filePath: string){
            super()
        }
 async load(): Promise<Order[]> {
    try {
   const csv =   await readCsvFile(this.filePath); 

   const mapper = new CSVOrderMapper(new CSVCakeMapper());//order mapper not cake mapper so i can get the id 

   const order = csv.map(row => mapper.map(row));
   return order;
    } catch (error) {
        throw new DatabaseException(`Failed to load data from CSV file: ${error}`);
    }
}
async save(orders: Order[]): Promise<void> {
    try {
            const header = [
        "id", "Type", "Flavor", "Filling", "Size", "Layers",
        "Frosting Type", "Frosting Flavor", "Decoration Type",
        "Decoration Color", "Custom Message", "Shape", "Allergies",
        "Special Ingredients", "Packaging Type", "Price", "Quantity"
    ];
    const rows = orders.map(o => new CSVOrderMapper(new CSVCakeMapper() ).reverseMap(o));

     await writeCsvFile(this.filePath, [header, ...rows]);
    }catch (error) {
        throw new DatabaseException(`Failed to save data to CSV file: ${error}`);
    }

}
}
