import { book } from "../src/models/book.model";
import { BookBuilder } from "../src/models/builder/book.builder";

describe("BookBuilder", () => {

  it("should set quantity correctly", () => {
    const myBook = new BookBuilder()
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

    expect(myBook.getQuantity()).toEqual(2);
  });

//   it("should throw an error if a required property is missing", () => {
//     const builder = new BookBuilder()
//       .setOrderId("B101")
//       //.setTitle("The Great Gatsby") // intentionally missing
//       .setAuthor("F. Scott Fitzgerald")
//       .setGenre("Classic")
//       .setFormat("Hardcover")
//       .setLanguage("English")
//       .setPublisher("Scribner")
//       .setSpecialEdition("Anniversary Edition")
//       .setPackaging("Boxed")
//       .setPrice(25.99)
//       .setQuantity(2);

//     expect(() => builder.build()).toThrow("Missing required property. Failed to build a book.");
//   });

  it("should build a book object correctly", () => {
    const myBook = new BookBuilder()
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

    const fakeBook = new book(
      "B101",
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      "Classic",
      "Hardcover",
      "English",
      "Scribner",
      "Anniversary Edition",
      "Boxed",
      25.99,
      2
    );

    expect(myBook).toEqual(fakeBook);
  });
});
