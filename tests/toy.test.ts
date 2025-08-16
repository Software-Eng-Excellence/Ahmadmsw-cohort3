import {Toy} from "../src/models/toy.model";
import {ToyBuilder} from "../src/models/builder/toy.builder"


describe("toy tests", ()=> {

    it("should set quantity",()=>{
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
    expect(Toy.getQuantity()).toEqual(2);
    })
        it("should return error missing parameters",()=>{
             const Toy = new ToyBuilder()
    .setOrderID(101)
    .setType("Plush Toy")
    .setAgeGroup("3+")
    .setBrand("FunTime")
    .setMaterial("Fabric")
    .setBatteryRequired("No")
    .setEducational("Yes")
    .setPrice(25.99)
    .build()
    
    
    
   expect(Toy).toEqual("error happening");
    })


    it("should build a object",()=>{

         const Toysbuilder = new ToyBuilder()
    .setOrderID(101)
    .setType("Plush Toy")
    .setAgeGroup("3+")
    .setBrand("FunTime")
    .setMaterial("Fabric")
    .setBatteryRequired("No")
    .setEducational("Yes")
    .setPrice(25.99)
    .setQuantity(2)
    .build()

  const fakeToy = new Toy (101,"Plush Toy", "3+","FunTime","Fabric","No","Yes",25.99,2); 
  expect(ToyBuilder).toEqual(fakeToy);

    
    })
})

