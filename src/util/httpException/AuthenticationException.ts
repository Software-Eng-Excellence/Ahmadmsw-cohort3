import {Response} from "express"
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
    export class AuthenticationTokenFailed extends Error{
        constructor(){
            super("Authentication Token Error");
        }

    }