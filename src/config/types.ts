import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { Role } from "./Permessions";


export interface UserPayload {
    user_id:string;
    Role : Role
}

export interface TokenPayload extends JwtPayload {
    user : UserPayload ;
}




export interface AuthReq extends Request {
   user : UserPayload ;

}