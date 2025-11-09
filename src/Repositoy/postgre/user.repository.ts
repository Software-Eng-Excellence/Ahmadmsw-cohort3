


import {IuserData , userMapper} from "../../mappers/user.mapper"
import { InitialzableRepository } from "../IRepository";
import { DatabaseException, ItemNotFoundException }from "../../util/Exceptions/RepositoryExceptions"
import { ConnectionManager } from "./connectionManager.repository";



import {User} from "../../models/user.model"

import { PoolClient } from "pg";



const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
`
            
            
const CREATE_USER_TABLE = `
    INSERT INTO "user" (id, name, email, password)
    VALUES ($1, $2, $3, $4)
`


   const SELECT_ALL = `SELECT * FROM "user"`


const SELECT_BY_ID = `SELECT * FROM "user" WHERE id = $1`


    const DELETE_BY_ID = `DELETE FROM "user" WHERE id = $1`

const UPDATE_BY_ID = `
    UPDATE "user"
    SET name = $1,
        email = $2,
        password = $3
    WHERE id = $4
`

    const SELECT_BY_EMAIL = `SELECT * FROM "user" WHERE email = $1`        
            


export class UserRpository implements InitialzableRepository<User> {

    

    async init(): Promise<void> {
        let conn!: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            await conn.query(CREATE_TABLE);
            
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }

     async getAll(): Promise<User[]> {
        let conn!: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            const users = await conn.query(SELECT_ALL);
            const PUsers: IuserData[] = users.rows;

            if (!PUsers) {
                throw new ItemNotFoundException("NO ITEM IS FOUND");
            }

            return PUsers.map((Puser) =>
                new userMapper().map(Puser)
            );

        } catch (error) {
            throw new DatabaseException("Error get Users ALL " + error);
        } finally {
            conn.release();
        }
    }

    async getById(id: string): Promise<User> {
        let conn!: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            const x = await conn.query(SELECT_BY_ID, [id]);

            if (!x || x.rows.length === 0) {
                throw new ItemNotFoundException("User not found with id " + id);
            }

            const row: IuserData = x.rows[0];
            console.log("hello i am " + row);
            return new userMapper().map(row);

        } catch (error: unknown) {
            throw new DatabaseException("Failed to get User of Id " + id);
        } finally {
            conn.release();
        }
    }

    async create(user: User): Promise<string> {
        let conn!: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            await conn.query("BEGIN TRANSACTION");

            await conn.query(CREATE_USER_TABLE, [
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword()
            ]);

            await conn.query("COMMIT");
            return user.getId();
        } catch (error: unknown) {
            if (conn) await conn.query("ROLLBACK");
            throw new DatabaseException("Creating user failed");
        } finally {
            conn.release();
        }
    }

    async update(user: User): Promise<void> {
        let conn!: PoolClient;
        try {
            conn = await ConnectionManager.getConnection();
            await conn.query("BEGIN TRANSACTION");

            await conn.query(UPDATE_BY_ID, [
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getId()
            ]);

            await conn.query("COMMIT");
        } catch (error: unknown) {
            throw new DatabaseException("Failed to UPDATE User of Id " + user.getId());
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<void> {
        let conn!: PoolClient;
        try {
            console.log(id);
            conn = await ConnectionManager.getConnection();
            const user = await this.getById(id);

            await conn.query("BEGIN TRANSACTION");
            await conn.query(DELETE_BY_ID, [user.getId()]);
            await conn.query("COMMIT");
        } catch (error: unknown) {
            throw new DatabaseException("Failed to Delete User of Id " + id);
        } finally {
            conn.release();
        }
    }
    async getUserByEmail(email:string):Promise<User>{
        let mapping = new userMapper();
        let conn!:PoolClient;
        try{
            conn = await ConnectionManager.getConnection();
            const data = await conn.query(SELECT_BY_EMAIL,[email]);
            
            const user : IuserData = data.rows[0];
            
            const Puser = mapping.map(user);
            return Puser
        }catch(error){
            throw new DatabaseException("Failed to get User of Email " + email);
        }
    }


}
