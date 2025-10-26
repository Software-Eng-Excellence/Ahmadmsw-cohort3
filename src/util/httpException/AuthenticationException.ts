import {Response} from "express"
import { ApiException } from "../Exceptions/ApiException";
    export class AuthenticationException extends Error {
        constructor(message:string){
            super(message);
            this.name = "AuthenticationException"
        }
        
        
    }

    export class TokenExpiration extends AuthenticationException {
        constructor(message:string){
            super(message);
            this.name = "AuthenticationException"
        }
    }
        export class InvalidToeknExceptin extends AuthenticationException {
        constructor(message:string){
            super(message);
            this.name = "InvalidToeknExceptin"
        }
    }
    export class AuthenticationTokenFailed extends ApiException{
        constructor(){
            super(401,"Authentication Token Error",new Error("Authentication Token Error"));
        }

    }