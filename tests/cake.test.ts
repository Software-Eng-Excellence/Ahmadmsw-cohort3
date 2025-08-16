import { cake } from "../src/models/cake.model";
import { CakeBuilder } from "../src/models/builder/cake.builder";

describe("CakeBuilder", () => {

  it("should set quantity correctly", () => {
    
    const myCake = new CakeBuilder()
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

    expect(myCake.getQuantity()).toEqual(1);
  });

//   it("should throw an error if a required property is missing", () => {
//     const builder = new CakeBuilder()
//       .setType("Birthday Cake")
//       .setFlavor("Chocolate")
//       .setFilling("Strawberry Jam")
//       .setSize(12)
//       .setLayers(3)
//       .setFrostingType("Buttercream")
//       .setFrostingFlavor("Vanilla")
//       .setDecorationType("Sprinkles")
//       .setDecorationColor("Rainbow")
//       .setCustomMessage("Happy Birthday!")
//       .setShape("Round")
//       .setAllergies("None")
//       .setSpecialIngredients("Belgian Chocolate")
//       .setPackagingType("Box")
//       .setPrice(45.99);
//       // Missing quantity intentionally

//     expect(() => builder.build()).toThrow("error happening");
//   });

  it("should build a cake object correctly", () => {
    const myCake = new CakeBuilder()
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

    const fakeCake = new cake(
      "Birthday Cake",
      "Chocolate",
      "Strawberry Jam",
      12,
      3,
      "Buttercream",
      "Vanilla",
      "Sprinkles",
      "Rainbow",
      "Happy Birthday!",
      "Round",
      "None",
      "Belgian Chocolate",
      "Box",
      45.99,
      1
    );

    expect(myCake).toEqual(fakeCake);
  });
});
