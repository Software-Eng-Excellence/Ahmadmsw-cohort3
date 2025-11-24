import { IOrder } from "../../models/Iorder.model";
import {Order} from "../../models/order.model"
import {OrderRepository} from "./order.repository"
import {readJsonFile} from "../../util/JsonParser";
import {writeJsonFile} from "../../util/JsonParser";
import { JSONOrderMapper } from "../../mappers/CSVorder.mapper";
import { JSONBookMapper } from "../../mappers/Book.mapper";

export class BookRepository extends OrderRepository{

        constructor(private readonly filePath: string){
            super()
        }
 async load(): Promise<Order[]> {
   const json =   await readJsonFile<{ [key: string]: string }[]>(this.filePath); 

   const mapper = new JSONOrderMapper(new JSONBookMapper());

   const order = json.map(row => mapper.map(row));
   return order;
}
async save(orders: Order[]): Promise<void> {

    const rows = orders.map(o => new JSONOrderMapper(new JSONBookMapper() ).reverseMap(o));
        await writeJsonFile(this.filePath, rows);


}
}