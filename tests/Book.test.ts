import path from "path";
import { BookRepository } from "../src/Repositoy/file/Book.model.repository";
import { BookBuilder } from "../src/models/builder/book.builder";
import { OrderBuilder } from "../src/models/builder/order.builder";

describe("Book Repository create", () => {
    it("should create books from JSON file", async () => {
        const p = path.resolve(__dirname, "../src/data/book orders.JSON");
        const books = new BookRepository(p);
        const book = new BookBuilder()
            .setOrderId("6001")
            .setTitle("The Great Gatsby")
            .setAuthor("F. Scott Fitzgerald")
            .setGenre("Classic")
            .setFormat("Hardcover")
            .setLanguage("English")
            .setPublisher("Scribner")
            .setSpecialEdition("None")
            .setPackaging("Standard")
            .build();
        const order = new OrderBuilder()
            .setId("6001")
            .setItem(book)
            .setPrice(15.99)
            .setQuantity(1)
            .build();
        const s = await books.create(order);

        expect(s).toBe("6001");
    });

    it("should load data from CSV file", async () => {
        const p = path.resolve(__dirname, "../src/data/book orders.JSON");
        const books = new BookRepository(p);
        const s = await books.getById("6001");
        expect(s).toBe(s);
    });
});