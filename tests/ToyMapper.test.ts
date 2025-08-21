

import {XMLToyMapper} from "../src/mappers/Toy.mapper";


describe("XMLToyMapper", () => {
    it("should map JSON data to Toy model", () => {
        const jsonData = { // i can data as Json bcz after
            Type: "Lego Set",
            AgeGroup: "LEGO",
            Price: "50",
            Quantity: "10"
        };

        const mapper = new XMLToyMapper();
        const toy = mapper.map(jsonData);

        expect(toy.getType()).toBe("Lego Set");
        expect(toy.getAgeGroup()).toBe("LEGO");
        expect(toy.getPrice()).toBe(50);
        expect(toy.getQuantity()).toBe(10);
    });

    it("should handle missing fields", () => {
        const jsonData = {
            "Type": "Lego Set",
            "AgeGroup": "LEGO"
        };

        const mapper = new XMLToyMapper();
        const toy = mapper.map(jsonData);

        expect(toy.getType()).toBe("Lego Set");
        expect(toy.getAgeGroup()).toBe("LEGO");
        expect(toy.getPrice()).toBe(0);
        expect(toy.getQuantity()).toBe(0);
    });

    it("should handle empty data", () => {
        const jsonData = {};

        const mapper = new XMLToyMapper();
        const toy = mapper.map(jsonData);

        // expect(toy.getType()).toBe("");
        expect(toy.getAgeGroup()).toBe("");
        expect(toy.getPrice()).toBe(0);
        expect(toy.getQuantity()).toBe(0);
    });
});
