import {IMapper} from "./Imapper"
import {Iuser, User} from "../models/user.model"
import {UserBuilder} from "../models/builder/user.builder"
import {Role} from "../config/Permessions"


    export interface IuserData {
        id: string ,
        name:string ,
        email:string,
        password:string
        role : Role
    }
    export class userMapper implements IMapper<IuserData,User> {
        map(data: IuserData): User {
        return new UserBuilder().setId(data.id).setName(data.name).setEmail(data.email).setPasswrod(data.password).setRole(data.role).build();
        }
        reverseMap(data: User): IuserData {
            return {
                id : data.getId(),
                name : data.getName(),
                email : data.getEmail(),
                password : data.getPassword(),
                role : data.getRole()

            }
        }
        
        
    }

export class JsonUserRequestMapper implements IMapper<any, User> {

    map(data: any): User {
        
        if (!data) {
            console.error("Mapper error: data is undefined or null");
            return new UserBuilder().build(); // returns empty user safely
        }
        
        console.log(data)
        return new UserBuilder()
            .setId(data?.id)                 // safe
            .setName(data?.Name ?? "")       // safe
            .setEmail(data?.Email ?? "")     // safe
            .setPasswrod(data?.Password ?? "")
            .setRole(data?.Role)
            .build();
    }

    reverseMap(data: User) {
        
        return { ...data };
    }
}