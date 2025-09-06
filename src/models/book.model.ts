import { Item, ItemCategoty } from "../models/item.model"
export class book implements Item {
    private orderId: string;
    private title: string;
    private author: string;
    private genre: string;
    private format: string;
    private language: string;
    private publisher: string;
    private specialEdition: string;
    private packaging: string;


      constructor(
        orderId: string,
        title: string,
        author: string,
        genre: string,
        format: string,
        language: string,
        publisher: string,
        specialEdition: string,
        packaging: string,

    ) {
        this.orderId = orderId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.format = format;
        this.language = language;
        this.publisher = publisher;
        this.specialEdition = specialEdition;
        this.packaging = packaging;


    }
    getOrderId(): string {
        return this.orderId;
    }
       getCategory(): ItemCategoty {
        return ItemCategoty.BOOK; 
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getGenre(): string {
        return this.genre;
    }

    getFormat(): string {
        return this.format;
    }

    getLanguage(): string {
        return this.language;
    }

    getPublisher(): string {
        return this.publisher;
    }

    getSpecialEdition(): string {
        return this.specialEdition;
    }

    getPackaging(): string {
        return this.packaging;
    }



    
}