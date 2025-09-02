import { IMapper } from "./Imapper";
import {Toy} from "../models/toy.model"
import { ToyBuilder } from "../models/builder/toy.builder";





export class XMLToyMapper implements IMapper<{ [key: string]: string }, Toy> {
    map(data: { [key: string]: string }): Toy {
        const NewBuild = new ToyBuilder();
        return NewBuild
            
            .setType(data["Type"]??"")
            .setAgeGroup(data["AgeGroup"]??"")
            .setBrand(data["Brand"]??"")
            .setMaterial(data["Material"]??"")
            .setBatteryRequired(data["BatteryRequired"]??"")
            .setEducational(data["Educational"]??"")
            

            .build();
    }
    reverseMap(data: Toy): ({ [key: string]: string; }) {
        return {
            
            "Type": data.getType(),
            "AgeGroup": data.getAgeGroup(),
            "Brand": data.getBrand(),
            "Material": data.getMaterial(),
            "BatteryRequired": data.getBatteryRequired(),
            "Educational": data.getEducational()
        };
}
}