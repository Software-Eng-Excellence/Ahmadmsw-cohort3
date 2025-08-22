import {CSVCakeMapper} from "../src/mappers/Cake.mapper";

describe("CSVCakeMapper", () => {
    it("should map CSV data to Cake model", () => {
        const csvData:string[] = 
                         ["asdasd","Chocolate Cake", "Chocolate", "Medium", "20", "5"]; // here i need set it as array because the mapper expects an array in the parameter

        const mapper = new CSVCakeMapper();
        const cake = mapper.map(csvData);

        expect(cake.getType()).toBe("Chocolate");
        expect(cake.getFlavor()).toBe("Chocolate");
        expect(cake.getFilling()).toBe("Medium");
        expect(cake.getSize()).toBe(20);
        expect(cake.getLayers()).toBe(5);
    });
 

    it("should handle missing fields", () => {
        const csvData:string[] = 
            ["Chocolate Cake", "Chocolate","Chocolate"];

        const mapper = new CSVCakeMapper();
        const cake = mapper.map(csvData);

        expect(cake.getType()).toBe("Chocolate");
        expect(cake.getFlavor()).toBe("Chocolate");
        expect(cake.getSize()).toBe(0);
        expect(cake.getPrice()).toBe(0);
        expect(cake.getLayers()).toBe(0);
    });

    it("should handle empty data", () => {
        const csvData:string[] = [];

        const mapper = new CSVCakeMapper();
        const cake = mapper.map(csvData);

        expect(cake.getType()).toBe("");
        expect(cake.getFlavor()).toBe("");
        expect(cake.getSize()).toBe(0);
        expect(cake.getPrice()).toBe(0);
        expect(cake.getLayers()).toBe(0);
    });
});
