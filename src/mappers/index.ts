import { ItemCategoty as ItemCategory } from "../models/item.model";
import { JsonRequestMapper } from "./CSVorder.mapper";
import { JsonRequestCakeMapper } from "./Cake.mapper";
import { JsonRequestToyMapper } from "./Toy.mapper";

export class JsonRequestFactory {
    static createMapper(type: ItemCategory): JsonRequestMapper {
        switch (type) {
            case ItemCategory.CAKE:
                return new JsonRequestMapper(new JsonRequestCakeMapper());
                case ItemCategory.TOY:
                return new JsonRequestMapper(new JsonRequestToyMapper());
            default:
                throw new Error(`No mapper found for category: ${type}`);
        }
    }
}
