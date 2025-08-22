
import { CakeBuilder } from "./models/builder/cake.builder";
import { BookBuilder} from "../src/models/builder/book.builder";
import { ToyBuilder} from "./models/builder/toy.builder";

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

  

   const book = new BookBuilder()
    .setOrderId("B101")
    .setTitle("The Great Gatsby")
    .setAuthor("F. Scott Fitzgerald")
    .setGenre("Classic")
    .setFormat("Hardcover")
    .setLanguage("English")
    .setPublisher("Scribner")
    .setSpecialEdition("Anniversary Edition")
    .setPackaging("Boxed")
    .setPrice(25.99)
    .setQuantity(2)
    .build();

    const Toy = new ToyBuilder()
    .setOrderID(101)
    .setType("Plush Toy")
    .setAgeGroup("3+")
    .setBrand("FunTime")
    .setMaterial("Fabric")
    .setBatteryRequired("No")
    .setEducational("Yes")
    .setPrice(25.99)
    .setQuantity(2)
    .build();
    console.log(Toy);
}

main();



