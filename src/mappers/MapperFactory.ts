import { ItemCategoty } from "../models/item.model";
import { IMapper } from "./Imapper";
import { CSVCakeMapper,  SQLITECakeMapper } from "./Cake.mapper";
import { DBType } from "../models/DBtypes.model";
import { JSONBookMapper, SQLiteBookMapper } from "./Book.mapper";
import { SQLITEToyMapper, XMLToyMapper } from "./Toy.mapper";



export class MapperFactory {

    public static create(mode: DBType, category: ItemCategoty): IMapper<any, any> {

        switch (category) {
            case ItemCategoty.CAKE:
                switch (mode) {
                    case DBType.FILES:
                        return new CSVCakeMapper()
                    case DBType.SQLITE:
                        return new SQLITECakeMapper()
                    case DBType.POSTGRESQL:
                        return new SQLITECakeMapper()
                }
            case ItemCategoty.BOOK:
                switch (mode) {
                    case DBType.POSTGRESQL:
                        return new SQLiteBookMapper()
                    case DBType.FILES:
                        return new JSONBookMapper()
                }
            case ItemCategoty.TOY:
                switch (mode) {
                    case DBType.POSTGRESQL:
                        return new SQLITEToyMapper()
                    case DBType.FILES:
                        return new XMLToyMapper()
                }
            default:
                throw new Error("Unknown category");
        }
    }
}