import {AuthenticationService} from "../services/Authentication.service"
import {Request , Response , NextFunction} from "express"
import {AuthReq} from "../config/types"
import {AuthenticationTokenFailed} from "../util/httpException/AuthenticationException"
const authService = new AuthenticationService();


export function authenticate(req: Request, res: Response, next: NextFunction) {
    //get Token From Header :
        console.log("sadadsad")
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

        //if no Token Throw Auth Error : 
        if (!token) {
            throw new Error("Stop here no tokens");
                return next(new AuthenticationTokenFailed());
                
        }

        //Validate Token : 
        
                
                const payload = authService.verifyToken(token);
                console.log(payload.user_id);
                (req as AuthReq).user_id = payload.user_id; // Attach userId to request
                next(); // Proceed to the next middleware or route handler
       
}