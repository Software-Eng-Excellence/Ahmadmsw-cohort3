import express from "express"
import config from "./config"
import logger from "./util/logger"
import helmet from "helmet"
import bodyParser from "body-parser"
import cors from "cors"
import requestLogger from "./middleware/requestLogger"
import routes from "./routes"
import { ApiException } from "./util/Exceptions/ApiException"
import cookieParser from "cookie-parser"






const app= express();
// config helmet :
app.use(helmet());

//config body parser :
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//config cors :


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // <— must allow cookies
}));




app.listen(config.port, config.host, ()=>{
    logger.info(`Server is running on port http://%s:%d`,config.host,config.port);
});
//add middlwares :
app.use(requestLogger);


app.use(cookieParser());


//config routes :
app.use("/",routes);


// config 404 handler :
app.use((req, res, next)=>{
    res.status(404).json({message: "Resource not found"});
});

//config error handler :
app.use((err : Error, req : express.Request, res : express.Response, next : express.NextFunction)=>{
    if(err instanceof ApiException){
       logger.error(`API Exception: ${err.message} ${err.status}`);
       res.status(err.status).json({message: err.message});
    }else {
        logger.error(`Internal Server Error: ${err.message}`);
        res.status(500).json({message: "Internal Server Error"});
    }
});
