import logger from "../util/logger"
import {NextFunction , Request , Response} from "express"


const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    res.on('finish', ()=>{
        const responseTime = Date.now() - startTime;
        const status = res.statusCode;
        const {method, url} = req;  
        let level : string = "info";
        if (status >= 400 && status < 500) {
             level = 'warn';
        }
        if (status >= 500) {
             level = 'error';
        }

     logger.log(level, `Request Completed: ${method} ${url} Status: ${status} Response Time: ${responseTime}ms`);
    });
   next();


}
export default requestLogger;