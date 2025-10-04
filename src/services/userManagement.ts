
import {User} from "../models/user.model"
import { ServiceException } from "../util/Exceptions/Service.Exception";

import {IRepository} from "../Repositoy/IRepository"
import {RepositoryFactory} from "../Repositoy/Repository.Factory"

    export class UserSerivce { 

        //create order
        public async createUser(user: User): Promise<string> {
            //Validate Order
            console.log(user);
            if (!this.validateOrder(user)) {
                throw new ServiceException("Missing Parameters", new Error("Missing Parameters"));
            }

            //persist order
            const repo = await this.getRepository();
            
            const createUser = await repo.create(user);
            return createUser;
        }

        //get order by id
        public async getUserById(id:string): Promise<User> {
           console.log("Service: Fetching User with id:", id);
           const repo = await this.getRepository();
           const getUser = await repo.getById(id);
           return getUser ;

        
  
        }
        //update order
        public async updateUser(user:User): Promise<void> {
            //Validate Order
            if (!this.validateOrder(user)) {
                throw new ServiceException("Misiign Parameters", new Error("Order must have a valid item, price and quantity"));
            }

            //persist order
            try {
            const repo = await this.getRepository();
            await repo.update(user);
            }catch(error :unknown){
                throw new Error ("User Not Found");
            }
        }
        //delete order
        public async deleteUser(id:string): Promise<void> {
            
            const repo = await this.getRepository();
             return await repo.delete(id);
            
        }

        public async getAllUsers(): Promise<User[]> { 
            try {
                 const repo = await this.getRepository();
                const users = await repo.getAll();
            
            return users;
        }catch(error : unknown)
        {
            throw new ServiceException("Failed to get all orders", error as Error);
        }
    }





        //validate order
        private validateOrder(user:User): boolean { 
           if(!user.getName || !user.getEmail || !user.getPassword) {
            throw new ServiceException("Missung Parameters", new Error("Missing Parameteres"));
               
           }
           
        
        return true; 
    }


    //get repo :
    private async getRepository():Promise<IRepository<User>> {
        return RepositoryFactory.createUser();
}

}