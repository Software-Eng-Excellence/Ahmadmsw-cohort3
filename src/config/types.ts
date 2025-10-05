import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
export interface TokenPayload extends JwtPayload {
    user_id : string,

}

export interface AuthReq extends Request {
    user_id:string;
}