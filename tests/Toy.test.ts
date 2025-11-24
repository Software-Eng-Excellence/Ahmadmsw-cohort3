import path from "path";
import { ToyRepository } from "../src/Repositoy/file/Toy.model.repository";
import { ToyBuilder } from "../src/models/builder/toy.builder";
import { OrderBuilder } from "../src/models/builder/order.builder";

describe("Toy Repository create", () => {
    it("should create toys from XML file", async () => {
        const p = path.resolve(__dirname, "../src/data/toy orders.xml");
        const toys = new ToyRepository(p);
        const toy = new ToyBuilder()
            .setType("Action Figure")
            .setAgeGroup("3-5")
            .setBrand("ToyCo")
            .setMaterial("Plastic")
            .setBatteryRequired("No")
            .setEducational("Yes")
            .build();
        const order = new OrderBuilder()
            .setId("6001")
            .setItem(toy)
            .setPrice(19.99)
            .setQuantity(2)
            .build();
        const s = await toys.create(order);

        expect(s).toBe("6001");
    });

    it("should load data from XML file", async () => {
        const p = path.resolve(__dirname, "../src/data/Toy orders.xml");
        const toys = new ToyRepository(p);
        const s = await toys.getById("6001");
        expect(s).toBe(s);
    });
});