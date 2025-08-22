import { book } from "../book.model";
import logger from "../../util/logger";

export class BookBuilder {
  private orderId!: string;
  private title!: string;
  private author!: string;
  private genre!: string;
  private format!: string;
  private language!: string;
  private publisher!: string;
  private specialEdition!: string;
  private packaging!: string;
  private price!: number;
  private quantity!: number;

  setOrderId(orderId: string): BookBuilder {
    this.orderId = orderId;
    return this;
  }

  setTitle(title: string): BookBuilder {
    this.title = title;
    return this;
  }

  setAuthor(author: string): BookBuilder {
    this.author = author;
    return this;
  }

  setGenre(genre: string): BookBuilder {
    this.genre = genre;
    return this;
  }

  setFormat(format: string): BookBuilder {
    this.format = format;
    return this;
  }

  setLanguage(language: string): BookBuilder {
    this.language = language;
    return this;
  }

  setPublisher(publisher: string): BookBuilder {
    this.publisher = publisher;
    return this;
  }

  setSpecialEdition(specialEdition: string): BookBuilder {
    this.specialEdition = specialEdition;
    return this;
  }

  setPackaging(packaging: string): BookBuilder {
    this.packaging = packaging;
    return this;
  }

  setPrice(price: number): BookBuilder {
    this.price = price;
    return this;
  }

  setQuantity(quantity: number): BookBuilder {
    this.quantity = quantity;
    return this;
  }

  build(): book {
    const requiredProperties = [
      this.orderId,
      this.title,
      this.author,
      this.genre,
      this.format,
      this.language,
      this.publisher,
      this.specialEdition,
      this.packaging,
      this.price,
      this.quantity,
    ];

    for (const prop of requiredProperties) {
      if (prop === undefined || prop === null) {
        throw new Error("Missing required property. Failed to build a book.");
      }
    }

    return new book(
      this.orderId,
      this.title,
      this.author,
      this.genre,
      this.format,
      this.language,
      this.publisher,
      this.specialEdition,
      this.packaging,
      this.price,
      this.quantity
    );
  }
}