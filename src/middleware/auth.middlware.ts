import {AuthenticationService} from "../services/Authentication.service"
import {Request , Response , NextFunction} from "express"
import {AuthReq} from "../config/types"
import {AuthenticationTokenFailed} from "../util/httpException/AuthenticationException"
const authService = new AuthenticationService();


export function authenticate(req: Request, res: Response, next: NextFunction) {
    //get Token From Header :
       
        let token = req.cookies?.token; // token is stored directly in the cookie
        const refresh_token = req.cookies.refreshtoken

        //if no Token Throw Auth Error : 
        if (!token) {
            if(!refresh_token){
                throw new AuthenticationTokenFailed()
            }
            
            const newToken = authService.RefreshToken(refresh_token);
            authService.setTokenIntoCookie(newToken,res)
            token = newToken;
            
        }
      
        

        //Validate Token : 
        
                
                const payload = authService.verifyToken(token);
               
                (req as AuthReq).user = payload // Attach userId to request
                next(); // Proceed to the next middleware or route handler
       
}