import { Request, Response } from "express";
import {AuthenticationService} from "../services/Authentication.service"

import {UserSerivce} from "../services/userManagement"
import { UserPayload } from "../config/types";


export class AuthenticationController {
    constructor(private authService : AuthenticationService,private userService : UserSerivce ){
        
    }
    async login(req:Request, rep:Response){
        
        const{email,password} = req.body;
        if(!email ||!password){
            
        }
        const User = await this.userService.ValidateUserExist(email,password);
        const userPayload : UserPayload = {user_id:User.getId(), Role : User.getRole()}
        this.authService.persistAuth(rep,userPayload)
    return rep.status(200).json({
    message: "Login Successfully!",
});



    }
     logout(req:Request, rep:Response){// i use AuthReq to make sure user is authenticated and take the user id from there and logout

        this.authService.clear(rep);
        rep.status(200).json({
            message: "Logout Successfully !"
        })
    }

}