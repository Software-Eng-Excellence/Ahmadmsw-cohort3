import {User} from "../user.model"
import { v4 as uuidv4 } from "uuid";
import { Role } from "../../config/Permessions";
export class UserBuilder {
 

  private id!: string;
  private name!:string;
  private email!:string;
  private password!:string;
  private Role!:Role;

  setId(id?: string): UserBuilder {
    this.id = id || uuidv4(); // generate new UUID only if id not provided
    return this;
  }
  setName(name: string): UserBuilder {
    this.name = name;
    return this;
  
  }

  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
    
  }
  setPasswrod(password: string): UserBuilder {
    this.password = password;
    return this;
    
  }
  setRole(role?: Role): UserBuilder {
    this.Role = role ?? Role.USER;
    return this;
  }

  build(): User {
    return new User(this.id, this.name, this.email,this.password,this.Role);
  }
}


