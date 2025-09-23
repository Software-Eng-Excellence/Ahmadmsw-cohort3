import logger from "./util/logger"


import {CakeRepository} from "./Repositoy/postgre/Cake.repository"
import { CakeBuilder,IdentifiableCakeBuilder } from "./models/builder/cake.builder";
import {IdentifiableOrderBuilder, OrderBuilder} from "./models/builder/order.builder"
import { BookRepository } from "./Repositoy/postgre/Book.repository";
import {BookBuilder,IdentifiableBookBuilder} from "./models/builder/book.builder"
import { IdentifiableToyBuilder,ToyBuilder } from "./models/builder/toy.builder";
import { ToyRepository } from "./Repositoy/postgre/Toy.Repository";

import { OrderRepository } from "./Repositoy/postgre/order.repository";
import { Toy } from "models/toy.model";





async function DBSandBox() {
    //create table if not exist
    const dbOrder = new OrderRepository(new ToyRepository());
    await dbOrder.init();
    // create  toy : 
    const idtoyBuild = new IdentifiableToyBuilder();
    const toyBuild = new ToyBuilder();
    const toy = toyBuild
    
      .setType("Action Figure")
      .setAgeGroup("6-12")
      .setBrand("Hasbro")
      .setMaterial("Plastic")
      .setBatteryRequired("No")
      .setEducational("No")
      .build();


     const bb = idtoyBuild.setToy(toy).setId("33").build();

                            




const idorderBuilder = new IdentifiableOrderBuilder()
const idorder = idorderBuilder.setItem(bb).setPrice(14).setItem(bb).setQuantity(14).setId("55").build();

 const l = await dbOrder.create(idorder);
  logger.info(l);

}
          // DBSandBox()

async function as(){
    const dbcake = new CakeRepository();
    const dbOrder = new OrderRepository(new CakeRepository());
    

    const s = await dbOrder.getById("5");
    
    logger.info("%o",s);

}
    // as();

    async function get(){
       const dbOrder = new OrderRepository(new ToyRepository());
        const dbcake = new BookRepository();
       const s = await dbOrder.getAll();
       logger.info("%o",s);
    }
    get();

    async function dd(){
        const dbOrder = new OrderRepository(new BookRepository());
        dbOrder.delete("5");
               const s = await dbOrder.getAll();
               logger.info("%o",s)

    }
    // dd();

    async function uu(){
            const cakeBuild = new CakeBuilder();
    const cake = cakeBuild
    
  .setType("Birthday")
  .setFlavor("Chocolate")
  .setFilling("Vanilla Cream")
  .setSize(12) 
  .setLayers(3)
  .setFrostingType("Buttercream")
  .setFrostingFlavor("Strawberry")
  .setDecorationType("Flowers")
  .setDecorationColor("Red")
  .setCustomMessage("Happy Birthday Ahmad!")
  .setShape("Round")
  .setAllergies("vv")
  .setSpecialIngredients("ff")
  .setPackagingType("Box")
  .build();

  //create identifiable cake :
  const idcakeBuild = new IdentifiableCakeBuilder();

  const  idcake = idcakeBuild.setCake(cake)
                             .setId("4")
                             .build()

                             
const idorderBuilder = new IdentifiableOrderBuilder()
const idorder = idorderBuilder.setItem(idcake).setPrice(14).setItem(idcake).setQuantity(14).setId("5").build();
        const dbOrder = new OrderRepository(new CakeRepository());
        dbOrder.update(idorder)
    }
    //   uu();