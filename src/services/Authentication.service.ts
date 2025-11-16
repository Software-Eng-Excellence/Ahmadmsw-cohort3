// From: src/services/Authentication.service.ts
import jwt from 'jsonwebtoken';
import config from '../config';
import { TokenPayload } from 'config/types';
import {InvalidToeknExceptin,TokenExpiration,AuthenticationException} from "../util/httpException/AuthenticationException"
import {ServiceException} from "../util/Exceptions/Service.Exception"
import {Response} from 'express';
import { ApiException } from '../util/Exceptions/ApiException';
import {UserPayload} from "../config/types"



// ... inside AuthenticationService class ...
export class AuthenticationService {
    private secretKey : string 
    private tokenExpiration : number
    private refreshTokenExpiration : number
    constructor(){
        this.secretKey = config.auth.secretKey;
        this.tokenExpiration = config.auth.TokenExpiration;
        this.refreshTokenExpiration = config.auth.refreshTokenExpiration
    }
 generateToken(payload:UserPayload): string {
        return jwt.sign(
                payload,           // Payload: Contains the user's ID
                this.secretKey,       // Secret Key: Used for signing
                { expiresIn: 20000000} // Options: Sets expiration time
        );
}
generaterefreshToken(payload:UserPayload):string {
    return jwt.sign (
        payload,
        this.secretKey,
        {expiresIn : this.refreshTokenExpiration}
    )
}
 
 verifyToken(token : string):UserPayload{
    try {
        return jwt.verify(token, this.secretKey) as UserPayload

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
 setRefrshTokenIntoCookie(refresh_token : string,res : Response){
        res.cookie  ('refreshtoken', refresh_token, {
        httpOnly: false,
        secure: config.isProduction,
        maxAge: this.refreshTokenExpiration // 0.5 hours
    })
 }



 RefreshToken(refreshtoken : string){
    const payload = this.verifyToken(refreshtoken);
    if(!payload){
        throw new ApiException(405,"Token end", new Error("Token Refresh Expired"))
    }
    return this.generateToken(payload)
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
    res.clearCookie('refreshtoken')
}

async persistAuth(res : Response,payload:UserPayload){
        
    
     const token = this.generateToken(payload);
     const refresh_token = this.generaterefreshToken(payload);
     this.setTokenIntoCookie(token,res);
     this.setRefrshTokenIntoCookie(refresh_token,res)

        
    }
}