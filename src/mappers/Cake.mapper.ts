import { IMapper } from "./Imapper";
import {cake} from "../models/cake.model"
import { CakeBuilder } from "../models/builder/cake.builder";


export class CSVCakeMapper implements IMapper<string[],cake> {
    map(data:string[]):cake {
        const build = new CakeBuilder();
                    return build.setType(data[1]??"")
                                .setFlavor(data[2]??"")
                                .setFilling(data[3]??"")
                                .setSize(parseInt(data[4])??0)
                                .setLayers(parseInt(data[5])??0)
                                .setFrostingType(data[6]??"")
                                .setFrostingFlavor(data[7]??"")
                                .setDecorationType(data[8]??"")
                                .setDecorationColor(data[9]??"")
                                .setCustomMessage(data[10]??"")
                                .setShape(data[11]??"")
                                .setAllergies(data[12]??"")
                                .setSpecialIngredients(data[13]??"")
                                .setPackagingType(data[14]??"")

                                .build()     // return the cake inside build

    }
}