import { IMapper } from "./Imapper";
import {Cake , IdentifiableCake} from "../models/cake.model"
import { CakeBuilder ,IdentifiableCakeBuilder } from "../models/builder/cake.builder";


export class CSVCakeMapper implements IMapper<string[],Cake> {
    map(data:string[]):Cake {
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
    reverseMap(data:Cake):string[]{ 
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
export interface SQLiteCake {
  id: string;
  type: string;
  flavor: string;
  filling: string;
  size: number;
  layers: number;
  frostingType: string;
  frostingFlavor: string;
  decorationType: string;
  decorationColor: string;
  customMessage: string;
  shape: string;
  allergies: string;
  specialIngredients: string;
  packagingType: string;
}
export class SQLITECakeMapper implements IMapper<SQLiteCake,IdentifiableCake> {
    map(data:SQLiteCake):IdentifiableCake {
        const build = new IdentifiableCakeBuilder();
        const cakeBuild = new CakeBuilder();
                    // Ensure all expected fields are present, set default if missing

         
                
                    return build
                        
                        .setCake(cakeBuild.
                        setType(data.type).
                         setFlavor(data.flavor)
                        .setFilling(data.filling)
                        .setSize(data.size)
                        .setLayers(data.layers)
                        .setFrostingType(data.frostingType)
                        .setFrostingFlavor(data.frostingFlavor)
                        .setDecorationType(data.decorationType)
                        .setDecorationColor(data.decorationColor)
                        .setCustomMessage(data.customMessage)
                       .setShape(data.shape)
                       .setAllergies(data.allergies)
                       .setSpecialIngredients(data.specialIngredients)
                        .setPackagingType(data.packagingType).build())
                        .setId(data.id)
                        .build()

                        

    }
    reverseMap(data:IdentifiableCake):SQLiteCake{ 
        return {
               id: data.getId(),
              type: data.getType(),
              flavor: data.getFlavor(),
              filling: data.getFilling(),
              size: data.getSize(),
              layers: data.getLayers(),
              frostingType: data.getFrostingType(),
             frostingFlavor: data.getFrostingFlavor(),
             decorationType: data.getDecorationType(),
             decorationColor: data.getDecorationColor(),
             customMessage: data.getCustomMessage(),
            shape: data.getShape(),
           allergies: data.getAllergies(),
           specialIngredients: data.getSpecialIngredients(),
           packagingType: data.getPackagingType(),


        }

    }
}



