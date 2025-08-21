

import {JSONBookMapper} from "../src/mappers/Book.mapper";
import {book} from "../src/models/book.model";

describe("JSONBookMapper", () => {
    it("should map JSON data to Book model", () => {
        const jsonData = {
            "Book Title": "The Great Gatsby",
            "Author": "F. Scott Fitzgerald",
            "Price": "10",
            "Quantity": "3"
        };

        const mapper = new JSONBookMapper();
        const book = mapper.map(jsonData);

        
        expect(book.getTitle()).toBe("The Great Gatsby");
        expect(book.getAuthor()).toBe("F. Scott Fitzgerald");
        expect(book.getPrice()).toBe(10);
        expect(book.getQuantity()).toBe(3);
    });
    it("should handle missing fields", () => {
        const jsonData = {
            "Book Title": "The Great Gatsby",
            "Author": "F. Scott Fitzgerald"
        };

        const mapper = new JSONBookMapper();
        const book = mapper.map(jsonData);

        expect(book.getTitle()).toBe("The Great Gatsby");
        expect(book.getAuthor()).toBe("F. Scott Fitzgerald");
        expect(book.getPrice()).toBe(0);
        expect(book.getQuantity()).toBe(0);
    });
    it("should handle empty data", () => {
        const jsonData = {};

        const mapper = new JSONBookMapper();
        const book = mapper.map(jsonData);

        expect(book.getTitle()).toBe("");
        expect(book.getAuthor()).toBe("");
        expect(book.getPrice()).toBe(0);
        expect(book.getQuantity()).toBe(0);
    });
});
