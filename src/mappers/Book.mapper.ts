import {BookBuilder} from "../models/builder/book.builder"
import { IMapper } from "./Imapper";
import {book} from "../models/book.model"


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