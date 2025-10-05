import { Request, Response } from "express";
import {AuthenticationService} from "../services/Authentication.service"

import {UserSerivce} from "../services/userManagement"

export class AuthenticationController {
    constructor(private authService : AuthenticationService,private userService : UserSerivce ){
        
    }
    async login(req:Request, rep:Response){
        
        const{Email,password} = req.body;
        if(!Email ||!password){
            throw new Error("Missing parameters")
        }
        const UserId = await this.userService.ValidateUserExist(Email,password);
        rep.status(200).json({
            message: "Login Succesfully !",
            token : this.authService.generateToken(UserId)
        })

    }
}