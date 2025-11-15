// From: src/services/Authentication.service.ts
import jwt from 'jsonwebtoken';
import config from '../config';
import { TokenPayload } from 'config/types';
import {InvalidToeknExceptin,TokenExpiration,AuthenticationException} from "../util/httpException/AuthenticationException"
import {ServiceException} from "../util/Exceptions/Service.Exception"
import {Response} from 'express';



// ... inside AuthenticationService class ...
export class AuthenticationService {
    private secretKey : string 
     private tokenExpiration : number
    constructor(){
        this.secretKey = config.auth.secretKey;
        this.tokenExpiration = config.auth.TokenExpiration;

    }
 generateToken(user_id: string): string {
        return jwt.sign(
                { user_id },           // Payload: Contains the user's ID
                this.secretKey,       // Secret Key: Used for signing
                { expiresIn: 20000000} // Options: Sets expiration time
        );
}
 verifyToken(token : string):TokenPayload{
    try {
        return jwt.verify(token, this.secretKey) as TokenPayload

    } catch (error:any) {
        if(error instanceof jwt.TokenExpiredError){
            throw new TokenExpiration("Token Expired");
        }
        if(error instanceof jwt.JsonWebTokenError){
            throw new InvalidToeknExceptin("Invalid Token")
        }
        throw new ServiceException("Invalid Token",error)
    }
 }
 setTokenIntoCookie(token:string, res:Response):void{
    res.cookie  ('token', token, {
        httpOnly: false,
        secure: config.isProduction,
        maxAge: 0.5 * 60 * 60 * 1000, // 0.5 hours
    })
}
clear(res:Response):void{
    res.clearCookie('token');       
}
}