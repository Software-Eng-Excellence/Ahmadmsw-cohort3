
import { ID } from "../Repositoy/IRepository";  
export enum ItemCategoty {
    CAKE = "cake",
    BOOK = 'book',
    TOY = 'toy',
    
}

export interface Item  {
    getCategory() : ItemCategoty ;
    
}

export interface ItemWithId extends Item, ID {
   
}
