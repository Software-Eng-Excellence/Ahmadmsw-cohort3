import { Permession, RolePermession } from "../config/Permessions";
import { AuthReq } from "../config/types";
import {Response ,Request , NextFunction} from "express"
import { InvalidRoleException, InsuffientPermissionException } from "../util/httpException/AuthorizationException";
import { ApiException } from "../util/Exceptions/ApiException";
import logger from "../util/logger";
import {Role} from "../config/Permessions"


export function hasPermession(permession : Permession) {
    return (req : Request , res : Response , next : NextFunction) => {
        const authReq = req as AuthReq ;
        if(!authReq.user){
            throw new ApiException(403 , "Not Authenticated" , new Error("Not Authenticated"));
        }
        const UserRole = authReq.user.Role;
        
        
        if(!RolePermession[UserRole]){
            logger.error("invalid Role")
            throw new InvalidRoleException(new Error("No role Appears here "),UserRole)
        }
        if (!RolePermession[UserRole].includes(permession)){
            logger.error(`User with role ${UserRole} does not have permession ${permession} `)
            throw new InsuffientPermissionException(new Error("Unothorized") ,"Unothorized" );
        }
        next()
    }
    
}
export function hasRole(Role : Role[]){
    return (req: Request, res: Response, next: NextFunction) => {
        const authReq = req as AuthReq;
        if (!authReq.user) {
            throw new ApiException(403, "Not Authenticated", new Error("Not Authenticated"));
        }
        const userRole = authReq.user.Role;
   
        if (!RolePermession[userRole]) {
            logger.error("Invalid Role");
            throw new InvalidRoleException(new Error("No role appears here"), userRole);
        }
        if (!Role.some(role => role === userRole)) {
            logger.error(`User with role ${userRole} does not have the required role`);
            throw new InsuffientPermissionException(new Error("Unauthorized"), "Unauthorized");
        }
        next();
    }
}