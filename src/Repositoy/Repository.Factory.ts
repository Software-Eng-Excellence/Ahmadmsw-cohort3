import { ItemCategoty } from "../models/item.model";
import { InitialzableRepository, IRepository } from "./IRepository";
import { IdentifiableOrderItem, IOrder } from "../models/Iorder.model";

import { OrderRepository } from "./postgre/order.repository";
import { CakeRepository } from "./postgre/Cake.repository";
import { BookRepository } from "./postgre/Book.repository";
import { ToyRepository } from "./postgre/Toy.Repository";
import { DBType } from "../models/DBtypes.model";
import {UserRpository} from "./postgre/user.repository"
import {User} from "../models/user.model"





export class RepositoryFactory {

    public static async create(mode: DBType, category: ItemCategoty): Promise<InitialzableRepository<IdentifiableOrderItem>> {
        switch (mode) {
            /**
             * Deprecated
             * use SQLITE or POSTGRESQL
             */
            case DBType.FILES:
                throw new Error("FILES mode is deprecated, use  POSTGRESQL");


            case DBType.POSTGRESQL:
                let PSrepository: InitialzableRepository<IdentifiableOrderItem>;
                switch (category) {
                    case ItemCategoty.CAKE:
                        PSrepository = new OrderRepository(new CakeRepository());
                        break;
                    case ItemCategoty.BOOK:
                        PSrepository = new OrderRepository(new BookRepository());
                        break;
                    case ItemCategoty.TOY:
                        PSrepository = new OrderRepository(new ToyRepository());
                        break;

                    default:
                        throw new Error("Unknown DB type");
                }
                await PSrepository.init();
                
        return PSrepository;        
        }
        throw new Error("Unknown DB type");
    

    }
    public static async createUser():Promise<InitialzableRepository<User>> {
        let UserRepo : InitialzableRepository<User>;
        UserRepo = new UserRpository();
        UserRepo.init();
        return UserRepo ;


    }
}