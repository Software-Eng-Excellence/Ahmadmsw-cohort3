
import { ID } from "../Repositoy/IRepository";  
export enum ItemCategoty {
    TOY = 'toy',
    CAKE = "cake",
    BOOK = 'book',
    
    
    
    
}

export interface Item  {
    getCategory() : ItemCategoty ;
    
}

export interface ItemWithId extends Item, ID {
   
}
