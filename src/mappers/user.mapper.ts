import {IMapper} from "./Imapper"
import {Iuser, User} from "../models/user.model"
import {UserBuilder} from "../models/builder/user.builder"

    export class JsonRequestMapper implements IMapper<any,User>{
       
        map(data:any):User {
            
    
            return new UserBuilder().setId(data.id).setName(data.name).setEmail(data.email).setPasswrod(data.password).build();
        }
        reverseMap(data: User) {
            return {
                
                ...data
            }
        }
    }
    export interface IuserData {
        id: string ,
        name:string ,
        email:string,
        password:string
    }
    export class userMapper implements IMapper<IuserData,User> {
        map(data: IuserData): User {
        return new UserBuilder().setId(data.id).setName(data.name).setEmail(data.email).setPasswrod(data.password).build();
        }
        reverseMap(data: User): IuserData {
            return {
                id : data.getId(),
                name : data.getName(),
                email : data.getEmail(),
                password : data.getPassword()
            }
        }
        
        
    }

    export class JsonUserRequestMapper implements IMapper<any,User>{
    
    map(data:any):User {
        

        return new UserBuilder().setId(data.id).setName(data.Name).setEmail(data.Email).setPasswrod(data.Password).build();
    }
    reverseMap(data: User) {
        return {
            
            ...data
        }
    }
}