import { Role } from "../config/Permessions";
    export interface Iuser {
        getId():string
        getName(): string ;
        getEmail():string ;
        getPassword():string;
        getRole():string ;


    }
    export class User implements Iuser {

        constructor( private id : string,  private Name : string,private Email: string, private password: string,private Role: Role ){}
       
        

        getId():string {
            return this.id ;
        }
        getEmail(): string {
            return this.Email;
        }
        getName(): string {
            return this.Name
        }
        getPassword(): string {
            return this.password
        }
        getRole(): Role {
            return this.Role;
        }

    }