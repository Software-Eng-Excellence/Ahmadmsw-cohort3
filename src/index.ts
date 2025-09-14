import logger from "./util/logger"


import {CakeRepository} from "./Repositoy/sqlite/cake.repository"
import { CakeBuilder,IdentifiableCakeBuilder } from "./models/builder/cake.builder";
import {IdentifiableOrderBuilder, OrderBuilder} from "./models/builder/order.builder"

import { OrderRepository } from "./Repositoy/sqlite/order.repository";





async function DBSandBox() {
    //create table if not exist
    const dbOrder = new OrderRepository(new CakeRepository());
    // await dbOrder.init();
    // create  cake : 
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
  .setAllergies("Nuts")
  .setSpecialIngredients("Honey")
  .setPackagingType("Box")
  .build();

  //create identifiable cake :
  const idcakeBuild = new IdentifiableCakeBuilder();

  const  idcake = idcakeBuild.setCake(cake)
                             .setId("2")
                             .build()
                           
  //create identifiable order :                            




const idorderBuilder = new IdentifiableOrderBuilder()
const idorder = idorderBuilder.setItem(idcake).setPrice(14).setItem(idcake).setQuantity(14).setId("20").build();

 const l = await dbOrder.create(idorder);
  logger.info(l);

}
      //  DBSandBox()

async function as(){
    const dbcake = new CakeRepository();
    const dbOrder = new OrderRepository(new CakeRepository());
    

    const s = await dbOrder.getById("20");
    
    logger.info("%o",s);

}
    // as();

    async function get(){
       const dbOrder = new OrderRepository(new CakeRepository());
        const dbcake = new CakeRepository();
       const s = await dbOrder.getAll();
       logger.info("%o",s.length);
    }
    get();