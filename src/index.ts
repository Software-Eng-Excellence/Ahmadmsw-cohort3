
import path from "path";
import {readCsvFile} from "./util/parser"
import {CSVCakeMapper} from "./mappers/Cake.mapper"
import {CSVOrderMapper} from "./mappers/CSVorder.mapper"
import {JSONOrderMapper} from "./mappers/CSVorder.mapper";
import {XMLOrderMapper} from "./mappers/CSVorder.mapper";


import {readXmlFile} from './util/XMLParser'
import {XMLToyMapper} from "./mappers/Toy.mapper"
// import {readXMLRows} from "./util/XMLParser"


import {readJsonFile} from "./util/JsonParser";
import {JSONBookMapper} from "./mappers/Book.mapper";




import logger from './util/logger';


async function main(){
    
    const data = await readCsvFile("./src/data/cake orders.csv");
    const Cakemapper = new CSVCakeMapper();
    const orderMapper = new CSVOrderMapper(Cakemapper);
    const orders = data.map(row =>orderMapper.map(row));
    logger.info("list of cakes %o",orders);
 

   
}
//main();


 async function main2(){
    
  const toydata = await readXmlFile<{ data: { row: { [key: string]: string }[] } }>("src/data/toy orders.xml");
  const rows = toydata.data.row;
 
   
   const toyMapper = new XMLToyMapper();
       const orderMapper = new XMLOrderMapper(toyMapper);

  const xmlOrders = rows.map(row => orderMapper.map(row));
  logger.info("XML orders mapped successfully:\n %o", xmlOrders);
 

   
}
main2();

async function main3(){
    const jsonData = await readJsonFile<{ [key: string]: string }[]>("./src/data/book orders.json");
    
    const bookMapper = new JSONBookMapper();
    const orderMapper = new JSONOrderMapper(bookMapper);

    const rows = jsonData.map(row => orderMapper.map(row));
    
    
console.log(rows);
}

 //main3();