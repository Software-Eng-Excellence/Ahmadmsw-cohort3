import { Item } from "../models/item.model";
import {ItemWithId} from "../models/item.model"




export interface IOrder  {
    
    getItem(): Item;//here is the bridge between item and order 
    getPrice(): number;
    getQuantity(): number;
    getId(): string;

   
}
export interface IdentifiableOrderItem extends IOrder   { 
getItem():ItemWithId ;
}