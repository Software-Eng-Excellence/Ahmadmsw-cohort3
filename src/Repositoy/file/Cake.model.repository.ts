import { IOrder } from "../../models/Iorder.model";
import {Order} from "../../models/order.model"
import {OrderRepository} from "./order.repository"
import {readCsvFile} from "../../util/parser";
import { CSVOrderMapper } from "../../mappers/CSVorder.mapper";
import { CSVCakeMapper } from "../../mappers/Cake.mapper";

export class CakeRepository extends OrderRepository{

        constructor(private readonly filePath: string){
            super()
        }
load(): Promise<IOrder[]> {
   const csv =   await readCsvFile(this.filePath); 

   const mapper = new CSVOrderMapper(new CSVCakeMapper());

   const order = csv.map(row => mapper.map(row));
   return order;
}
save(item: IOrder[]): Promise<void> {
    
}
}