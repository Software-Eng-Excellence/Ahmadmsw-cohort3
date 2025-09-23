import {BookBuilder , IdentifiableBookBuilder} from "../models/builder/book.builder"
import { IMapper } from "./Imapper";
import {book, IdentifiableBook} from "../models/book.model"


export class JSONBookMapper implements IMapper<{[key: string]: string}, book> {
    
    map(data: {[key: string]: string}): book {
        return new BookBuilder()
            
            .setTitle(data["Book Title"]??"")
            .setAuthor(data["Author"]??"")
            .setGenre(data["Genre"]??"")
            .setFormat(data["Format"]??"")
            .setLanguage(data["Language"]??"")
            .setPublisher(data["Publisher"]??"")
            .setSpecialEdition(data["Special Edition"]??"")
            .setPackaging(data["Packaging"]??"")

            .build();
    }
    reverseMap(data: book): { [key: string]: string; } {
        return {
            
            "Book Title": data.getTitle(),
            "Author": data.getAuthor(),
            "Genre": data.getGenre(),
            "Format": data.getFormat(),
            "Language": data.getLanguage(),
            "Publisher": data.getPublisher(),
            "Special Edition": data.getSpecialEdition(),
            "Packaging": data.getPackaging()
        };
}
}

export interface ISQLITEBook {
    id: string,
    title: string,
    author: string,
    genre: string,
    format: string,
    language: string,
    publisher: string,
    special_edition: string,
    packaging: string
}

export class SQLiteBookMapper implements IMapper<ISQLITEBook, book> {
   
    map(data: ISQLITEBook): IdentifiableBook {
         let BuildBook = new BookBuilder();
         return new IdentifiableBookBuilder()
         .setId(data.id)
         .setBook(BuildBook.setTitle(data.title)
         .setAuthor(data.author)
         .setGenre(data.genre)
            .setFormat(data.format)
            .setLanguage(data.language)
            .setPublisher(data.publisher)
            .setSpecialEdition(data.special_edition)
            .setPackaging(data.packaging)
            .build())
         .build();
        
        
            
            
          
    }
    reverseMap(data: IdentifiableBook): ISQLITEBook {
        return {
            id: data.getId(),
            title: data.getTitle(),
            author: data.getAuthor(),
            genre: data.getGenre(),
            format: data.getFormat(),
            language: data.getLanguage(),
            publisher: data.getPublisher(),
            special_edition: data.getSpecialEdition(),
            packaging: data.getPackaging()
        };
    }
}
