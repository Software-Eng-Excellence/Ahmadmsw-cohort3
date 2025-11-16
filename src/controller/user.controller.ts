import { NextFunction,Request,Response } from "express";
import { UserSerivce } from "../services/userManagement"
import { ApiException } from "../util/Exceptions/ApiException";
import { AuthReq } from "../config/types";
import  logger  from "../util/logger";
import {User} from "../models/user.model"
import{JsonUserRequestMapper} from "../mappers/user.mapper"


export class UserrController {
    constructor(private readonly userserivce: UserSerivce) {}
    //create order

    //get order by id
    public async getUserById(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.params.id;
            console.log("Fetching User with id:", id);
            const user = await this.userserivce.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(new ApiException(400,"Failed to get user by id", error as Error));
        }
    }
    //get all orders
    public async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userserivce.getAllUsers();
            res.status(200).json(users);
            
        } catch (error) {
            next(new ApiException(400,"Failed to get all users", error as Error));
        }
    }
    public async createUser(req: Request, res: Response) {
   
   try {
    const JsMapper = new JsonUserRequestMapper();
     const user: User = JsMapper.map(req.body  )
    
     
   
    if (!user) {
        throw new Error("user is required to create user");
    }
      
     const newUser = await this.userserivce.createUser(user);
          
    res.status(201).json(newUser);
  }catch(error){
    throw new Error("error in create")
  }
}

    public async deleteuser(req: Request, res: Response,next:NextFunction) {
        try {
            
        
        const id = req.params.id;
       
        await this.userserivce.deleteUser(id);
        res.status(204).send({ message: "User deleted successfully" });
        }catch(error :any){
             next(new ApiException(400,"Failed to get User by id", error as Error));
        }
    }

     public async updateUser(req: Request, res: Response , next : NextFunction) {
        const id = req.params.id;
        if (!id) {
         logger.error("No id in the url" + id);
         throw new ApiException(404,"somthing is wrong",new Error("something is wrong here"));
        }
        const JsMapper = new JsonUserRequestMapper();
        const user: User = JsMapper.map(req.body  )
       
       
        if (!user) {
          logger.warn ("Missing Parameters")
          throw new ApiException(405,"Missing Parameters", new Error("Missing Parameters"))
        }
        if (user.getId() !== id) {
          logger.warn ("No user in the DataBase with id ",user.getId())
          throw new ApiException(405,"No user Found", new Error("no User"))
        }
        await this.userserivce.updateUser(user);
        res.status(200).json(user);
    }

      public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const Auth = req as AuthReq; // we attach user_id in the middleware
      if (!Auth.user.user_id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const user = await this.userserivce.getUserById(Auth.user.user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      next(new ApiException(400, "Failed to fetch current user", error as Error));
    }
  }

}