import dotenv from "dotenv"
import stringValue from "ms"


export default {
   logDir: "./logs",
   isProduction: process.env.NODE_ENV === "production",
   storagePath: {
      sqlite: "./src/data/orders.db"
   },
   postgre: {
      connectionString:
        "postgresql://neondb_owner:npg_oSgBn6UVv8tR@ep-wandering-cherry-aday2d6t-pooler.c-2.us-east-1.aws.neon.tech/Orders?sslmode=require&channel_binding=require",
   },
   port : process.env.PORT ? parseInt(process.env.PORT) : 5000,
   host: process.env.HOST || "localhost",
   auth : {
      secretKey : "secret123456",
      TokenExpiration: 15, // Set to 15 minutes
      refreshTokenExpiration : 10080 // Set to 7 days in minutes (7 days * 24 hours * 60 minutes)
   }
}
