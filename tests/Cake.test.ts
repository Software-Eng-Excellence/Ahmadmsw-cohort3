import {readCsvFile} from "../src/util/parser"
import {CSVCakeMapper} from "../src/mappers/Cake.mapper"
import {CSVOrderMapper} from "../src/mappers/CSVorder.mapper"
import path from "path"


import {CakeRepository} from "../src/Repositoy/file/Cake.model.repository"
import {OrderBuilder}from "../src/models/builder/order.builder";
import { CakeBuilder } from "../src/models/builder/cake.builder"; 





describe("Cake Repository create",()=>{
it("should create cakes from CSV file",async()=>{
    const p = path.resolve(__dirname, "../src/data/cake orders.csv");
const cakes = new CakeRepository(p);  
const cake = new CakeBuilder()
            .setType("Birthday")
            .setFlavor("Chocolate")
            .setFilling("Vanilla Cream")
            .setSize(8)
            .setLayers(2)
            .setFrostingType("Buttercream")
            .setFrostingFlavor("Chocolate")
            .setDecorationType("Sprinkles")
            .setDecorationColor("Rainbow")
            .setCustomMessage("Happy Birthday!")
            .setShape("Round")
            .setAllergies("Nuts")
            .setSpecialIngredients("Organic Cocoa")
            .setPackagingType("Box")
            .build();
    const order = new OrderBuilder().setId("5001")
                                    .setItem(cake)
                                    .setPrice(24.99)
                                    .setQuantity(1)
                                    .build();
    const s =  await cakes.create(order);
   
    expect(s).toBe("5001");

});
it("should load data from CSV file",async()=>{
    const p = path.resolve(__dirname, "../src/data/cake orders.csv");
    const cakes = new CakeRepository(p);
    const s = await cakes.getById("5001");
    expect(s).toBe(s);
})
});