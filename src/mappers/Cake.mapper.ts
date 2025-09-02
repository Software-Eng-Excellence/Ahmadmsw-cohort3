import { IMapper } from "./Imapper";
import {cake} from "../models/cake.model"
import { CakeBuilder } from "../models/builder/cake.builder";


export class CSVCakeMapper implements IMapper<string[],cake> {
    map(data:string[]):cake {
        const build = new CakeBuilder();
                    // Ensure all expected fields are present, set default if missing
                    const [
                        type = "",
                        flavor = "",
                        filling = "",
                        size = "0",
                        layers = "0",
                        frostingType = "",
                        frostingFlavor = "",
                        decorationType = "",
                        decorationColor = "",
                        customMessage = "",
                        shape = "",
                        allergies = "",
                        specialIngredients = "",
                        packagingType = ""
                    ] = data.slice(1, 15);

                    return build
                        .setType(type)
                        .setFlavor(flavor)
                        .setFilling(filling)
                        .setSize(parseInt(size) || 0)
                        .setLayers(parseInt(layers) || 0)
                        .setFrostingType(frostingType)
                        .setFrostingFlavor(frostingFlavor)
                        .setDecorationType(decorationType)
                        .setDecorationColor(decorationColor)
                        .setCustomMessage(customMessage)
                        .setShape(shape)
                        .setAllergies(allergies)
                        .setSpecialIngredients(specialIngredients)
                        .setPackagingType(packagingType)
                        .build();

    }
    reverseMap(data:cake):string[]{ 
        return [
           
            data["type"],
            data["flavor"],
            data["filling"],
            data["size"].toString(),
            data["layers"].toString(),
            data["frostingType"],
            data["frostingFlavor"],
            data["decorationType"],
            data["decorationColor"],
            data["customMessage"],
            data["shape"],
            data["allergies"],
            data["specialIngredients"],
            data["packagingType"],

        ]

    }
}

