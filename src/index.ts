
import path from "path";
import {readCsvFile} from "./util/parser"
import {CSVCakeMapper} from "./mappers/Cake.mapper"
import {CSVOrderMapper} from "./mappers/CSVorder.mapper"
 import {JSONOrderMapper} from "./mappers/CSVorder.mapper";
// import {XMLOrderMapper} from "./mappers/CSVorder.mapper";
import {CakeRepository} from "./Repositoy/file/Cake.model.repository"
import {OrderBuilder}from "./models/builder/order.builder";
import { CakeBuilder } from "./models/builder/cake.builder"; 
import {BookRepository} from "./Repositoy/file/Book.model.repository"


import {BookBuilder} from "./models/builder/book.builder"



import {readXmlFile} from './util/XMLParser'
 import {XMLToyMapper} from "./mappers/Toy.mapper"
 import {writeXmlFile} from "./util/XMLParser"
// import {readXMLRows} from "./util/XMLParser"


import {readJsonFile} from "./util/JsonParser";
import {JSONBookMapper} from "./mappers/Book.mapper";

import {ToyRepository} from "./Repositoy/file/Toy.model.repository"
import {ToyBuilder} from "./models/builder/toy.builder"





import logger from './util/logger';
import { on } from "events";
import { Toy } from "models/toy.model";
import { read } from "fs";



async function main(){

    const Repository = new BookRepository("./src/data/book orders.json");
    const data = await Repository.getById("2100");
    console.log(data);

}
// main();

async function main1(){
    const Repository = new BookRepository("./src/data/book orders.json");
    const Bookdata = new BookBuilder().setAuthor("Ahmad").setTitle("Learn TypeScript").setGenre("Programming").setFormat("Ebook").setLanguage("English").setPublisher("Self-Published").setSpecialEdition("No").setPackaging("Digital").build();
    const data = new OrderBuilder().setItem(Bookdata).setPrice(29.99).setQuantity(1).setId("30002").build();
     const ss = await Repository.create(data);
     console.log(ss);


}
// main1();

async function main11(){
    const Repository = new BookRepository("./src/data/book orders.json");
    const data = await Repository.delete("30002");
    console
}
// main11();


async function main22(){
    const Repository = new ToyRepository("./src/data/toy orders.xml");


    const data = new ToyBuilder()
        
        
        .setType("Educational")
        .setAgeGroup("3-5 years")
        .setBrand("LeapFrog")
        .setMaterial("Plastic")
        .setBatteryRequired("No")
        .setEducational("Alphabet Learning")
        
        .build();

        const order = new OrderBuilder()
        .setId("4001")
        .setItem(data)
        .setPrice(24.99)
        .setQuantity(1)
        .build();
    const s =  await Repository.create(order);

    console.log(s);

}
main22();
//  async function main2(){
    
//   const toydata = await readXmlFile<{ data: { row: { [key: string]: string }[] } }>("src/data/toy orders.xml");
//   const rows = toydata.data.row;
 
   
//    const toyMapper = new XMLToyMapper();
//        const orderMapper = new XMLOrderMapper(toyMapper);

//   const xmlOrders = rows.map(row => orderMapper.map(row));
//   logger.info("XML orders mapped successfully:\n %o", xmlOrders);
 

   
// }
// // main2();

// async function main3(){
//     const jsonData = await readJsonFile<{ [key: string]: string }[]>("./src/data/book orders.json");
    
//     const bookMapper = new JSONBookMapper();
//     const orderMapper = new JSONOrderMapper(bookMapper);

//     const rows = jsonData.map(row => orderMapper.map(row));
    
    
// console.log(rows);
// }

 //main3();