
import {User} from "../models/user.model"
import { ServiceException } from "../util/Exceptions/Service.Exception";


import {RepositoryFactory} from "../Repositoy/Repository.Factory"

import { UserRpository } from "Repositoy/postgre/user.repository";
import { ApiException } from "../util/Exceptions/ApiException";
    export class UserSerivce { 

        //create order
        public async createUser(user: User): Promise<string> {
            //Validate Order
            
            if (!this.validateUser(user)) {
                throw new ApiException(423,"Email Or pass missing", new Error("Email or password missing"));
                
            }
            else if( await this.validateAlreadyExist(user.getEmail())){
                throw new ApiException(422,"User Already Exist", new Error("User with this email already exists"));
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
            if (!this.validateUser(user)) {
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
        private validateUser(user:User): boolean { 
           if( !user.getEmail || !user.getPassword) {
            throw new ServiceException("Missung Parameters", new Error("Missing Parameteres"));
               
           }
           
        
        return true; 
    }
    public async validateAlreadyExist(id:string):Promise <boolean>{
        const users = await this.getAllUsers();
        const user = users.find((user) => user.getEmail() === id);
        return user ? true : false;
    }


    public async ValidateUserExist(email:string ,password:string):Promise<string>{
        const user = await (await this.getRepository()).getUserByEmail(email);
        if(!user){
            throw new ApiException(422,"user Note Found",new Error("user not found"));
        }
        if(user.getPassword() !== password){
            throw new Error("Password Invalid");
        }
        return (user.getId());
    }

    //get repo :
    private async getRepository():Promise<UserRpository> {
        return RepositoryFactory.createUser();
}

}