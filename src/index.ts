import path from 'path';
import {readCsvFile} from './util/parser'
import logger from './util/logger';
import {readJsonFile} from './util/JsonParser';
import {readXmlFile} from './util/XMLParser'

const filePath = path.resolve(__dirname, './data/Cake orders.csv');
const filePath2 = path.resolve(__dirname, './data/book orders.JSON'); // Ensure the path is correct for your environment
const filePath3 = path.resolve(__dirname, './data/toy orders.XML'); // Ensure the path is correct for your environment

export class CsvParser { 
    async parse() {
        try {
       const products = await readCsvFile(filePath)//why i need to set the file path here ? // because this is the file that you want to read from// and what this function do ? // it reads the csv file and returns a 2D array of strings// so i can use it in my code ? // yes, you can use it to get the data from the csv file
       logger.info(products)
        return products;
        } catch (error) {
            logger.error(error);
            throw new Error("Error reading CSV file");
        }
    }
}





    


export class JsonParser  {
    async parse() {
        try {
            const products = await readJsonFile(filePath2);

           logger.info(products);//here i will get an object
            return products;
        } catch (error) {
            logger.error(error);
            throw new Error("Error reading JSON file");
        }
    }
}



export class xmlparser {

    async parse(){
        try{
        
         const rawRecords = await readXmlFile(filePath3);

      
        // Ensure rawRecords is an array of objects
            logger.info(rawRecords.data.row);
        return rawRecords ;
        
        }
        catch(error){
            throw new Error("Error reading XML file");
        }
    }
}

new xmlparser().parse();
// new JsonParser().parse();
// new CsvParser().parse()



