
import dotenv from "dotenv"
import path from "path"
 
export default {

   
   storagePath : {
   sqlite : "./src/data/orders.db"
   },
   postgreSQL : {
      connectionString : 'postgresql://neondb_owner:npg_oSgBn6UVv8tR@ep-wandering-cherry-aday2d6t-pooler.c-2.us-east-1.aws.neon.tech/Orders?sslmode=require&channel_binding=require'
   }
        
   

}