
import path from "path";
import {readCsvFile} from "./util/parser"
import {CSVCakeMapper} from "./mappers/Cake.mapper"
import {CSVOrderMapper} from "./mappers/CSVorder.mapper"
// import {JSONOrderMapper} from "./mappers/CSVorder.mapper";
// import {XMLOrderMapper} from "./mappers/CSVorder.mapper";
import {CakeRepository} from "./Repositoy/file/Cake.model.repository"
import {OrderBuilder}from "./models/builder/order.builder";
import { CakeBuilder } from "./models/builder/cake.builder";  



import {readXmlFile} from './util/XMLParser'
// import {XMLToyMapper} from "./mappers/Toy.mapper"
// import {readXMLRows} from "./util/XMLParser"


import {readJsonFile} from "./util/JsonParser";
import {JSONBookMapper} from "./mappers/Book.mapper";




import logger from './util/logger';


async function main(){
    

    const path = "./src/data/cake orders.csv";
    const repository = new CakeRepository(path);
    const build = new OrderBuilder();
    const cakeBuild = new CakeBuilder();
    const cake = cakeBuild
        .setType("Party")
        .setFlavor("Marble")
        .setFilling("Marble Mousse")
        .setSize(10)
        .setLayers(3)
        .setFrostingType("Lemon")
        .setFrostingFlavor("Marble")
        .setDecorationType("Buttercream")
        .setDecorationColor("fuchsia")
        .setCustomMessage("Happy Birthday!")
        .setShape("Round")
        .setAllergies("Yes")
        .setSpecialIngredients("Hazelnuts")
        .setPackagingType("Box")
        .build();
        
        const od = build
        .setId("300")
        .setItem(cake)
        .setPrice(50)
        .setQuantity(2)
        .build();

     const orders = await repository.create(od);
    logger.info("list of cakes %o",orders);

}

async function main2(){
    const path = "./src/data/cake orders.csv";
    const repository = new CakeRepository(path);
    const build = new OrderBuilder();
    const cakeBuild = new CakeBuilder();

      const cake = cakeBuild
        .setType("Ahmad")
        .setFlavor("Ahmad")
        .setFilling("Ahmad")
        .setSize(10)
        .setLayers(3)
        .setFrostingType("BB")
        .setFrostingFlavor("Marble")
        .setDecorationType("Buttercream")
        .setDecorationColor("fuchsia")
        .setCustomMessage("Happy Birthday!")
        .setShape("Round")
        .setAllergies("Yes")
        .setSpecialIngredients("Hazelnuts")
        .setPackagingType("Box")
        .build();
        
        const od = build
        .setId("300")
        .setItem(cake)
        .setPrice(50)
        .setQuantity(2)
        .build();
    await repository.update(od);




}
// main2();


async function main3(){
    const path = "./src/data/cake orders.csv";
    const repository = new CakeRepository(path);
    repository.delete("300");

}
main3();
//  async function main2(){
    
//   const toydata = await readXmlFile<{ data: { row: { [key: string]: string }[] } }>("src/data/toy orders.xml");
//   const rows = toydata.data.row;
 
   
//    const toyMapper = new XMLToyMapper();
//        const orderMapper = new XMLOrderMapper(toyMapper);

//   const xmlOrders = rows.map(row => orderMapper.map(row));
//   logger.info("XML orders mapped successfully:\n %o", xmlOrders);
 

   
// }
// //main2();

// async function main3(){
//     const jsonData = await readJsonFile<{ [key: string]: string }[]>("./src/data/book orders.json");
    
//     const bookMapper = new JSONBookMapper();
//     const orderMapper = new JSONOrderMapper(bookMapper);

//     const rows = jsonData.map(row => orderMapper.map(row));
    
    
// console.log(rows);
// }

 //main3();