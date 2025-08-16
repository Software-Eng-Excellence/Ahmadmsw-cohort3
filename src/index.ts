
import { CakeBuilder } from "./models/builder/cake.builder";


import logger from './util/logger';

async function main(){
  const cakebuiler = new CakeBuilder()
  const cake = cakebuiler
    .setType("Birthday Cake")
    .setFlavor("Chocolate")
    .setFilling("Strawberry Jam")
    .setSize(12)
    .setLayers(3)
    .setFrostingType("Buttercream")
    .setFrostingFlavor("Vanilla")
    .setDecorationType("Sprinkles")
    .setDecorationColor("Rainbow")
    .setCustomMessage("Happy Birthday!")
    .setShape("Round")
    .setAllergies("None")
    .setSpecialIngredients("Belgian Chocolate")
    .setPackagingType("Box")
    .setPrice(45.99)
    .setQuantity(1)
    .build();

console.log(cake);    
}

main();



